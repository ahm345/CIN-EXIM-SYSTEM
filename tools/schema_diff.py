#!/usr/bin/env python3
"""CIN EXIM - Şema fark aracı (salt dosya okur/yazar, Baserow'a bağlanmaz).

Amaç: şemanın iki sürümü arasındaki farkı otomatik yazmak ve her sürümün
anlık görüntüsünü saklamak. Tablo ve alanlar Baserow ID'siyle eşlenir; bu
yüzden yeniden adlandırma, "sil + yeniden oluştur"dan ayırt edilir.

Girdi : 02_DATABASE_SCHEMA/INVENTORY.json   (tools/build_schema_docs.py üretir)
Çıktı : 04_CHANGE_HISTORY/SCHEMA_DIFFS.md            fark kayıtları (en yeni üstte)
        02_DATABASE_SCHEMA/history/INVENTORY_*.json  her sürümün anlık görüntüsü

Kullanım (depo kökünden):
  python3 -I tools/schema_diff.py
      Otomatik: son anlık görüntü ile güncel INVENTORY.json karşılaştırılır.
      Fark varsa SCHEMA_DIFFS.md'ye kayıt yazılır ve yeni anlık görüntü alınır.
      Fark yoksa hiçbir şey yazılmaz (tekrar çalıştırmak güvenlidir).
  python3 -I tools/schema_diff.py diff ESKI.json YENI.json [--write]
  python3 -I tools/schema_diff.py git-diff <git-ref> [--write]
      O commit'teki INVENTORY.json ile güncel olanı karşılaştırır.
  python3 -I tools/schema_diff.py list
      Anlık görüntüleri listeler.

Sınır: Formül etkisi (hangi formüller etkilenir) formül metninden regex ile
çıkarılır; kaçırma olabilir. Fark yalnızca ŞEMAYI gösterir, değişikliğin
nedenini ve onayını göstermez (onlar SYS-004 ve CHANGELOG.md'dedir).
"""
import argparse
import collections
import glob
import importlib.util
import json
import os
import re
import subprocess
import sys

sys.dont_write_bytecode = True  # build_xray'i yüklerken tools/__pycache__ oluşmasın

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCH = os.path.join(ROOT, "02_DATABASE_SCHEMA")
INV = os.path.join(SCH, "INVENTORY.json")
HIST = os.path.join(SCH, "history")
DIFFS = os.path.join(ROOT, "04_CHANGE_HISTORY", "SCHEMA_DIFFS.md")
MARK = "<!-- KAYITLAR (en yeni üstte) -->"
HEADER = """# Şema Değişiklik Günlüğü (otomatik)

> `tools/schema_diff.py` üretir; en yeni kayıt en üstte. Kaynak: `02_DATABASE_SCHEMA/history/` altındaki INVENTORY anlık görüntüleri.
> Burası yalnızca **ne değiştiğini** gösterir. Değişikliğin **nedeni ve onayı** Baserow `SYS-004` ve `CHANGELOG.md` içindedir.
> Tablo ve alanlar Baserow ID'siyle eşlenir (yeniden adlandırma, silip yeniden oluşturmadan ayrılır). Formül etkisi regex ile çıkarılır; kaçırma olabilir.
"""

# Formül bağımlılığını etkileyebilecek değişiklik türleri
IMPACT_KINDS = {"alan_silindi", "tur_degisti", "hedef_degisti", "formul_degisti",
                "formul_tipi_degisti", "alan_adi_degisti"}


def _xray():
    """build_xray.py'yi dosya yolundan yükler (-I kipinde betik klasörü sys.path'te olmaz)."""
    spec = importlib.util.spec_from_file_location("build_xray", os.path.join(ROOT, "tools", "build_xray.py"))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


X = _xray()


def load(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def schema_hash(inv):
    return X.h(inv["tables"])


def _index(inv):
    return {t["id"]: {"name": t["name"], "purpose": t.get("purpose") or "", "group": t.get("group_name") or "",
                      "primary": t.get("primary_field"), "fields": {f["id"]: f for f in t["fields"]}}
            for t in inv["tables"]}


def compare(old, new):
    """İki INVENTORY arasındaki farkı değişiklik sözlükleri listesi olarak döndürür."""
    o, n = _index(old), _index(new)
    ch = []

    def add(kind, table, field=None, text="", **kw):
        ch.append(dict(kind=kind, table=table, field=field, text=text, **kw))

    for tid in sorted(set(n) - set(o), key=lambda i: n[i]["name"]):
        add("tablo_eklendi", n[tid]["name"], text=f"{len(n[tid]['fields'])} alanla eklendi")
    for tid in sorted(set(o) - set(n), key=lambda i: o[i]["name"]):
        add("tablo_silindi", o[tid]["name"], text=f"{len(o[tid]['fields'])} alanıyla silindi")

    for tid in sorted(set(o) & set(n), key=lambda i: n[i]["name"]):
        to, tn = o[tid], n[tid]
        tname = tn["name"]
        if to["name"] != tn["name"]:
            add("tablo_adi_degisti", tname, text=f"`{to['name']}` → `{tn['name']}`")
        if to["primary"] != tn["primary"]:
            add("birincil_alan_degisti", tname, text=f"`{to['primary']}` → `{tn['primary']}`")
        if to["purpose"] != tn["purpose"] or to["group"] != tn["group"]:
            add("aciklama_degisti", tname, text="amaç/grup metni değişti (yapısal değil)")

        fo, fn = to["fields"], tn["fields"]
        for fid in sorted(set(fn) - set(fo), key=lambda i: fn[i]["name"]):
            f = fn[fid]
            extra = f" → `{f['target']}`" if f.get("target") else ""
            add("alan_eklendi", tname, f["name"], f"`{f['type']}`{extra}")
        for fid in sorted(set(fo) - set(fn), key=lambda i: fo[i]["name"]):
            f = fo[fid]
            add("alan_silindi", tname, f["name"], f"`{f['type']}` silindi",
                old_ref=f"{to['name']}.{f['name']}")
        for fid in sorted(set(fo) & set(fn), key=lambda i: fn[i]["name"]):
            a, b = fo[fid], fn[fid]
            old_ref, new_ref = f"{to['name']}.{a['name']}", f"{tname}.{b['name']}"
            refs = dict(old_ref=old_ref, new_ref=new_ref)
            if a["name"] != b["name"]:
                add("alan_adi_degisti", tname, b["name"], f"`{a['name']}` → `{b['name']}`", **refs)
            if a["type"] != b["type"]:
                add("tur_degisti", tname, b["name"], f"`{a['type']}` → `{b['type']}`", **refs)
            if a.get("target_id") != b.get("target_id") or a.get("target") != b.get("target"):
                add("hedef_degisti", tname, b["name"], f"ilişki hedefi `{a.get('target')}` → `{b.get('target')}`", **refs)
            if a.get("formula") != b.get("formula"):
                add("formul_degisti", tname, b["name"], "formül değişti", old_f=a.get("formula"), new_f=b.get("formula"), **refs)
            if a.get("formula_type") != b.get("formula_type"):
                add("formul_tipi_degisti", tname, b["name"], f"formül sonuç türü `{a.get('formula_type')}` → `{b.get('formula_type')}`", **refs)
            oo, ob = a.get("options") or [], b.get("options") or []
            if oo != ob:
                plus, minus = [x for x in ob if x not in oo], [x for x in oo if x not in ob]
                parts = []
                if plus:
                    parts.append("eklenen: " + ", ".join(f"`{x}`" for x in plus))
                if minus:
                    parts.append("kaldırılan: " + ", ".join(f"`{x}`" for x in minus))
                if not parts:
                    parts.append("yalnızca sıra değişti")
                add("secenek_degisti", tname, b["name"], "; ".join(parts))

    # Formül etkisi: hem eski hem yeni bağımlılık grafiğinden
    eo, _ = X.build_graph(old)
    en, _ = X.build_graph(new)
    for c in ch:
        if c["kind"] in IMPACT_KINDS:
            s = set()
            if c.get("old_ref"):
                s |= X.reverse_reach(eo, c["old_ref"])
            if c.get("new_ref"):
                s |= X.reverse_reach(en, c["new_ref"])
            c["impact"] = sorted(s)
    return ch


LABEL = {
    "tablo_eklendi": "tablo eklendi", "tablo_silindi": "tablo silindi", "tablo_adi_degisti": "tablo adı değişti",
    "birincil_alan_degisti": "birincil alan değişti", "aciklama_degisti": "açıklama değişti",
    "alan_eklendi": "alan eklendi", "alan_silindi": "alan silindi", "alan_adi_degisti": "alan adı değişti",
    "tur_degisti": "alan türü değişti", "hedef_degisti": "ilişki hedefi değişti", "formul_degisti": "formül değişti",
    "formul_tipi_degisti": "formül sonuç türü değişti", "secenek_degisti": "seçenek listesi değişti",
}


def _cut(s, n=400):
    s = (s or "").replace("\n", " ")
    return s if len(s) <= n else s[:n - 3] + "..."


def render(old, new, changes):
    om, nm = old["meta"], new["meta"]
    lines = [f"## {om['generated_at']} → {nm['generated_at']}", "",
             f"Şema özeti: `{schema_hash(old)}` → `{schema_hash(new)}`", "",
             "| Sayı | Önce | Sonra |", "|---|---|---|"]
    for k, lab in (("table_count", "Tablo"), ("field_count", "Alan"),
                   ("link_field_count", "İlişki alanı"), ("formula_count", "Formül")):
        lines.append(f"| {lab} | {om[k]} | {nm[k]} |")
    lines.append("")
    if not changes:
        lines += ["Yapısal fark bulunamadı (özet değişmişse yalnızca sayı dışı meta farkı olabilir).", ""]
        return "\n".join(lines) + "\n"

    cnt = collections.Counter(c["kind"] for c in changes)
    lines += ["Özet: " + ", ".join(f"{v} {LABEL[k]}" for k, v in cnt.items()), ""]
    by_table = collections.OrderedDict()
    for c in sorted(changes, key=lambda c: (c["table"], c["field"] or "", c["kind"])):
        by_table.setdefault(c["table"], []).append(c)
    for table, items in by_table.items():
        lines.append(f"### {table}")
        lines.append("")
        for c in items:
            who = f"`{c['field']}`: " if c["field"] else ""
            lines.append(f"- {who}**{LABEL[c['kind']]}** — {c['text']}" if c["kind"] != "formul_degisti"
                         else f"- {who}**{LABEL[c['kind']]}**")
            if c["kind"] == "formul_degisti":
                lines += ["  ```", f"  önce : {_cut(c.get('old_f'))}", f"  sonra: {_cut(c.get('new_f'))}", "  ```"]
            if c.get("impact"):
                shown = ", ".join(c["impact"][:6]) + (f" … (+{len(c['impact']) - 6})" if len(c["impact"]) > 6 else "")
                lines.append(f"  - Olası etki ({len(c['impact'])} formül): {shown}")
        lines.append("")
    return "\n".join(lines) + "\n"


def write_entry(text):
    """Kaydı SCHEMA_DIFFS.md'nin en üstüne (işaretçiden sonra) ekler."""
    body = open(DIFFS, encoding="utf-8").read() if os.path.exists(DIFFS) else HEADER + "\n" + MARK + "\n"
    if MARK not in body:
        body = body.rstrip("\n") + "\n\n" + MARK + "\n"
    head, tail = body.split(MARK, 1)
    with open(DIFFS, "w", encoding="utf-8") as f:
        f.write(head + MARK + "\n\n" + text.rstrip("\n") + "\n\n---\n" + tail)


def snapshot_name(inv):
    ts = re.sub(r"[^0-9T+\-]", "", inv["meta"]["generated_at"])
    return f"INVENTORY_{ts}_{schema_hash(inv)}.json"


def save_snapshot(inv):
    os.makedirs(HIST, exist_ok=True)
    path = os.path.join(HIST, snapshot_name(inv))
    with open(path, "w", encoding="utf-8") as f:
        json.dump(inv, f, ensure_ascii=False, separators=(",", ":"))
        f.write("\n")
    return path


def snapshots():
    return sorted(glob.glob(os.path.join(HIST, "INVENTORY_*.json")))


def cmd_auto():
    inv = load(INV)
    snaps = snapshots()
    if not snaps:
        p = save_snapshot(inv)
        m = inv["meta"]
        write_entry(f"## {m['generated_at']} — başlangıç noktası\n\n"
                    f"İlk anlık görüntü (şema özeti `{schema_hash(inv)}`; {m['table_count']} tablo / {m['field_count']} alan / "
                    f"{m['link_field_count']} ilişki / {m['formula_count']} formül). Bundan önceki sürümler için fark kaydı yoktur; "
                    "sonraki şema değişiklikleri bu noktadan itibaren yazılır.\n")
        print(f"İlk anlık görüntü alındı (başlangıç noktası): {os.path.relpath(p, ROOT)}")
        return 0
    last = load(snaps[-1])
    if schema_hash(last) == schema_hash(inv):
        print(f"Şema değişmedi (özet {schema_hash(inv)}); kayıt yazılmadı.")
        return 0
    if inv["meta"]["generated_at"] < last["meta"]["generated_at"]:
        print("HATA: güncel INVENTORY.json, son anlık görüntüden ESKİ görünüyor "
              f"({inv['meta']['generated_at']} < {last['meta']['generated_at']}). Hiçbir şey yazılmadı.", file=sys.stderr)
        return 3
    changes = compare(last, inv)
    write_entry(render(last, inv, changes))
    p = save_snapshot(inv)
    print(f"{len(changes)} değişiklik yazıldı: {os.path.relpath(DIFFS, ROOT)}")
    print(f"Yeni anlık görüntü: {os.path.relpath(p, ROOT)}")
    return 0


def cmd_diff(old, new, write):
    o, n = load(old), load(new)
    text = render(o, n, compare(o, n))
    if write:
        write_entry(text)
        print(f"Yazıldı: {os.path.relpath(DIFFS, ROOT)}")
    else:
        print(text)
    return 0


def cmd_git_diff(ref, write):
    r = subprocess.run(["git", "-C", ROOT, "show", f"{ref}:02_DATABASE_SCHEMA/INVENTORY.json"],
                       capture_output=True, text=True, encoding="utf-8")
    if r.returncode != 0:
        print(f"HATA: `{ref}` içinde INVENTORY.json okunamadı: {r.stderr.strip()}", file=sys.stderr)
        return 2
    o, n = json.loads(r.stdout), load(INV)
    text = render(o, n, compare(o, n))
    if write:
        write_entry(text)
        print(f"Yazıldı: {os.path.relpath(DIFFS, ROOT)}")
    else:
        print(text)
    return 0


def cmd_list():
    snaps = snapshots()
    if not snaps:
        print("Anlık görüntü yok. `python3 -I tools/schema_diff.py` ilkini alır.")
        return 0
    for p in snaps:
        m = load(p)["meta"]
        print(f"{os.path.basename(p)}  {m['generated_at']}  "
              f"{m['table_count']} tablo / {m['field_count']} alan / {m['formula_count']} formül")
    return 0


def main():
    ap = argparse.ArgumentParser(description="CIN EXIM şema fark aracı")
    sub = ap.add_subparsers(dest="cmd")
    d = sub.add_parser("diff")
    d.add_argument("old")
    d.add_argument("new")
    d.add_argument("--write", action="store_true")
    g = sub.add_parser("git-diff")
    g.add_argument("ref")
    g.add_argument("--write", action="store_true")
    sub.add_parser("list")
    a = ap.parse_args()
    if a.cmd == "diff":
        return cmd_diff(a.old, a.new, a.write)
    if a.cmd == "git-diff":
        return cmd_git_diff(a.ref, a.write)
    if a.cmd == "list":
        return cmd_list()
    return cmd_auto()


if __name__ == "__main__":
    sys.exit(main())
