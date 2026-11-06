#!/usr/bin/env python3
"""CIN EXIM - Devir / tutarlılık kontrolü (depo tarafı; salt okunur, Baserow'a bağlanmaz).

Devralan AI'nın "önceki AI doğru mu bıraktı?" sorusunun DEPO yarısını makineyle cevaplar:
  - INVENTORY meta sayıları, SCHEMA_VERSION özeti, röntgen tablosu (sütun sayısı, satır sayısı)
  - son şema anlık görüntüsü güncel mi (tools/schema_diff.py çalıştırıldı mı)
  - AI_START.md, depodaki belge/araç/skill'lerin hepsine yol gösteriyor mu
  - belgelerde eski protokol sürümü anması ve CURRENT_STATE sayıları
  - kırık bağlantı / dosya yolu, skill başlıkları, araçların sözdizimi

CANLI Baserow ile karşılaştırma bu betiğin işi değildir; `cin-exim-handover-check` skill'i yapar.

Kullanım:  python3 -I tools/handover_check.py
Çıkış kodu: 0 = HATA yok (UYARI olabilir), 1 = en az bir HATA.
"""
import glob
import importlib.util
import json
import os
import re
import sys

sys.dont_write_bytecode = True
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCH = os.path.join(ROOT, "02_DATABASE_SCHEMA")
RES = []  # (seviye, kontrol, mesaj)


def _xray():
    spec = importlib.util.spec_from_file_location("build_xray", os.path.join(ROOT, "tools", "build_xray.py"))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def rd(rel):
    with open(os.path.join(ROOT, rel), encoding="utf-8") as f:
        return f.read()


def rep(level, check, msg):
    RES.append((level, check, msg))


def cols(line):
    return len(re.split(r"(?<!\\)\|", line.rstrip("\n"))) - 2


def check_inventory(inv, X):
    tabs = inv["tables"]
    got = {"table_count": len(tabs),
           "field_count": sum(len(t["fields"]) for t in tabs),
           "link_field_count": sum(1 for t in tabs for f in t["fields"] if f["type"] == "link_row"),
           "formula_count": sum(1 for t in tabs for f in t["fields"] if f["type"] == "formula")}
    bad = {k: (inv["meta"].get(k), v) for k, v in got.items() if inv["meta"].get(k) != v}
    if bad:
        rep("HATA", "inventory_meta", "meta sayıları içerikle uyuşmuyor (meta, gerçek): " + str(bad))
    else:
        rep("TAMAM", "inventory_meta", f"{got['table_count']} tablo / {got['field_count']} alan / "
            f"{got['link_field_count']} ilişki / {got['formula_count']} formül — meta içerikle uyuşuyor")
    try:
        ver = json.loads(rd("02_DATABASE_SCHEMA/SCHEMA_VERSION.json"))
    except (OSError, ValueError) as e:
        rep("HATA", "schema_version", f"SCHEMA_VERSION.json okunamadı: {e}")
        return got
    h = X.h(tabs)
    if ver.get("schema_hash") != h:
        rep("HATA", "schema_version", f"SCHEMA_VERSION.json özeti {ver.get('schema_hash')} ≠ INVENTORY özeti {h} "
            "(röntgen dosyaları eski: `python3 -I tools/build_xray.py`)")
    elif ver.get("counts") != got:
        rep("HATA", "schema_version", "SCHEMA_VERSION.json sayıları içerikle uyuşmuyor")
    else:
        rep("TAMAM", "schema_version", f"SCHEMA_VERSION özeti {h} güncel")
    hist = sorted(glob.glob(os.path.join(SCH, "history", "INVENTORY_*.json")))
    if not hist:
        rep("UYARI", "history", "şema anlık görüntüsü yok (`python3 -I tools/schema_diff.py` başlangıç noktasını alır)")
    else:
        last = json.load(open(hist[-1], encoding="utf-8"))
        if X.h(last["tables"]) != h:
            rep("UYARI", "history", "güncel INVENTORY, son anlık görüntüden farklı: `python3 -I tools/schema_diff.py` çalıştırılmamış")
        else:
            rep("TAMAM", "history", f"son anlık görüntü güncel ({len(hist)} anlık görüntü)")
    return got


def check_xray(got):
    rows, bad = 0, []
    for i, line in enumerate(rd("02_DATABASE_SCHEMA/XRAY_LEVEL0.md").splitlines(), 1):
        if re.match(r"\|\s*\d+\s*\|", line):
            rows += 1
            if cols(line) != 7:
                bad.append(i)
    if bad:
        rep("HATA", "xray_tablo", f"XRAY_LEVEL0.md'de {len(bad)} satırın sütun sayısı bozuk (satır {bad[:8]}); tablo adındaki '|' kaçırılmalı")
    elif rows != got["table_count"]:
        rep("HATA", "xray_tablo", f"XRAY_LEVEL0.md'de {rows} tablo satırı var, envanterde {got['table_count']}")
    else:
        rep("TAMAM", "xray_tablo", f"röntgen tablosu sağlam ({rows} satır, hepsi 7 sütun)")


def check_md_tables():
    """Her Markdown tablosunun tüm satırları başlıkla aynı sütun sayısında mı? (Hücre içindeki kaçırılmamış '|' tabloyu kırar.)"""
    bad = []
    for p in sorted(glob.glob(os.path.join(ROOT, "**", "*.md"), recursive=True)):
        rel = os.path.relpath(p, ROOT)
        if rel.startswith(".git" + os.sep) or "LOG_ARCHIVE" in rel:
            continue
        in_fence, expected = False, None
        for n, line in enumerate(open(p, encoding="utf-8").read().splitlines(), 1):
            if line.lstrip().startswith("```"):
                in_fence, expected = not in_fence, None
                continue
            if in_fence or not line.startswith("|"):
                expected = None
                continue
            if expected is None:
                expected = cols(line)
            elif cols(line) != expected:
                bad.append(f"{rel}:{n} ({cols(line)} sütun, beklenen {expected})")
    if bad:
        rep("HATA", "md_tablolar", f"{len(bad)} tablo satırı bozuk (hücrede '|' varsa `\\|` yaz): " + "; ".join(bad[:8]))
    else:
        rep("TAMAM", "md_tablolar", "tüm Markdown tablolarında sütun sayıları tutarlı")


def check_reachable():
    start = rd("AI_START.md")
    want = []
    for d in ("02_DATABASE_SCHEMA", "05_AI_PROTOCOLS", "06_TASKS_AND_HANDOVER"):
        want += [os.path.basename(p) for p in glob.glob(os.path.join(ROOT, d, "*")) if os.path.isfile(p)]
    want += [os.path.basename(p) for p in glob.glob(os.path.join(ROOT, "tools", "*.py"))]
    want += [os.path.basename(os.path.dirname(p)) for p in glob.glob(os.path.join(ROOT, ".claude", "skills", "*", "SKILL.md"))]
    missing = sorted(n for n in set(want) if n not in start)
    if missing:
        rep("UYARI", "ai_start_kapsam", "AI_START.md şu dosyalardan/araçlardan hiç söz etmiyor, yeni AI bunları bulamaz: " + ", ".join(missing))
    else:
        rep("TAMAM", "ai_start_kapsam", f"AI_START.md {len(set(want))} belge/araç/skill'in hepsine yol gösteriyor")


def check_versions():
    m = re.search(r"Güncel protokol sürümü \*\*([0-9.]+)\*\*", rd("05_AI_PROTOCOLS/PROTOCOL_MIRROR.md"))
    if not m:
        rep("UYARI", "protokol_surumu", "PROTOCOL_MIRROR.md'de 'Güncel protokol sürümü **X**' ifadesi bulunamadı")
        return
    cur = m.group(1)
    files = ["AI_START.md", "CLAUDE.md", "05_AI_PROTOCOLS/PLATFORM_SETUP.md", "06_TASKS_AND_HANDOVER/CURRENT_STATE.md"]
    files += [os.path.relpath(p, ROOT) for p in glob.glob(os.path.join(ROOT, ".claude", "skills", "*", "SKILL.md"))]
    stale = []
    for rel in files:
        if not os.path.exists(os.path.join(ROOT, rel)):
            continue
        for n, line in enumerate(rd(rel).splitlines(), 1):
            # CURRENT_STATE geçmiş oturum özetlerini de içerir ("o gün v1.3'tü"); yalnızca durum satırına bak
            if rel.endswith("CURRENT_STATE.md") and not line.startswith("| SYS-009"):
                continue
            if "SYS-009" in line or "protokol" in line.lower():
                for v in re.findall(r"\bv(\d+\.\d+)\b", line):
                    if v != cur:
                        stale.append(f"{rel}:{n} (v{v})")
    if stale:
        rep("UYARI", "protokol_surumu", f"güncel protokol v{cur}; eski sürüm anan satırlar: " + "; ".join(stale))
    else:
        rep("TAMAM", "protokol_surumu", f"belgelerde eski protokol sürümü anması yok (güncel v{cur})")


def check_current_state(got):
    txt = rd("06_TASKS_AND_HANDOVER/CURRENT_STATE.md")
    want = f"{got['field_count']} / {got['link_field_count']} / {got['formula_count']}"
    if want not in txt:
        rep("UYARI", "current_state", f"CURRENT_STATE.md'de '{want}' (alan / ilişki / formül) yok; sayılar eski olabilir")
    else:
        rep("TAMAM", "current_state", "CURRENT_STATE.md şema sayılarını içeriyor")


def check_links():
    broken, weak = [], []
    for p in glob.glob(os.path.join(ROOT, "**", "*.md"), recursive=True):
        rel = os.path.relpath(p, ROOT)
        if rel.startswith(".git" + os.sep) or "LOG_ARCHIVE" in rel:
            continue
        txt = open(p, encoding="utf-8").read()
        for tgt in re.findall(r"\]\(([^)\s]+)\)", txt):
            if re.match(r"(https?:|mailto:|#)", tgt):
                continue
            t = tgt.split("#")[0]
            if t and not os.path.exists(os.path.normpath(os.path.join(os.path.dirname(p), t))):
                broken.append(f"{rel} → {tgt}")
        for tgt in set(re.findall(r"`((?:0[1-7]_[A-Z_]+|tools|\.claude)/[A-Za-z0-9_./\-]+)`", txt)):
            if not os.path.exists(os.path.join(ROOT, tgt)):
                weak.append(f"{rel} → {tgt}")
    if broken:
        rep("HATA", "baglantilar", "kırık bağlantı: " + "; ".join(broken[:10]))
    if weak:
        rep("UYARI", "dosya_yollari", "var olmayan dosya yolu anması: " + "; ".join(weak[:10]))
    if not broken and not weak:
        rep("TAMAM", "baglantilar", "Markdown bağlantıları ve dosya yolu atıfları çözülüyor")


def check_skills_and_tools():
    for p in sorted(glob.glob(os.path.join(ROOT, ".claude", "skills", "*", "SKILL.md"))):
        d = os.path.basename(os.path.dirname(p))
        head = open(p, encoding="utf-8").read().split("---")
        fm = head[1] if len(head) > 2 else ""
        if not re.search(r"^name:\s*" + re.escape(d) + r"\s*$", fm, re.M) or not re.search(r"^description:\s*\S", fm, re.M):
            rep("HATA", "skill_baslik", f"{d}/SKILL.md başlığı (name = klasör adı, description) hatalı")
    errs = []
    for p in glob.glob(os.path.join(ROOT, "tools", "*.py")):
        try:
            compile(open(p, encoding="utf-8").read(), p, "exec")
        except SyntaxError as e:
            errs.append(f"{os.path.basename(p)}:{e.lineno}")
    if errs:
        rep("HATA", "arac_sozdizimi", "sözdizimi hatası: " + ", ".join(errs))
    else:
        rep("TAMAM", "arac_sozdizimi", "tools/*.py derleniyor; skill başlıkları geçerli" if not any(r[1] == "skill_baslik" for r in RES) else "tools/*.py derleniyor")


def main():
    X = _xray()
    inv = json.loads(rd("02_DATABASE_SCHEMA/INVENTORY.json"))
    got = check_inventory(inv, X)
    check_xray(got)
    check_md_tables()
    check_reachable()
    check_versions()
    check_current_state(got)
    check_links()
    check_skills_and_tools()
    for lvl, chk, msg in RES:
        print(f"{lvl:<6} [{chk}] {msg}")
    n_err = sum(1 for r in RES if r[0] == "HATA")
    n_warn = sum(1 for r in RES if r[0] == "UYARI")
    print(f"\nÖzet: {n_err} hata, {n_warn} uyarı, {sum(1 for r in RES if r[0] == 'TAMAM')} tamam. "
          "Bu yalnızca DEPO tarafıdır; canlı Baserow karşılaştırması ayrıca yapılmalı.")
    return 1 if n_err else 0


if __name__ == "__main__":
    sys.exit(main())
