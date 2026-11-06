#!/usr/bin/env python3
"""CIN EXIM - Röntgen haritası üreticisi (salt dosya okur/yazar, Baserow'a bağlanmaz).

Girdi : 02_DATABASE_SCHEMA/INVENTORY.json
Çıktı : 02_DATABASE_SCHEMA/XRAY_LEVEL0.md        tek sayfa harita (AI'nın ilk okuyacağı)
        02_DATABASE_SCHEMA/DEPENDENCY_GRAPH.json formül bağımlılıkları (makine okur)
        02_DATABASE_SCHEMA/IMPACT.md             'bunu değiştirirsem ne etkilenir' özeti
        02_DATABASE_SCHEMA/SCHEMA_VERSION.json   kararlı şema özeti (hash) + tablo bazlı hash
        04_CHANGE_HISTORY/SCHEMA_DIFFS.md        --prev verilirse önceki sürümle fark (eklenir)

Kullanım:
  python3 -I tools/build_xray.py [--prev eski_INVENTORY.json]
"""
import argparse, hashlib, json, os, re
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCH = os.path.join(ROOT, "02_DATABASE_SCHEMA")

def load(p):
    with open(p, encoding="utf-8") as f:
        return json.load(f)

def h(obj):
    return hashlib.sha256(json.dumps(obj, sort_keys=True, ensure_ascii=False).encode()).hexdigest()[:12]

def build_graph(inv):
    tabs = {t["name"]: t for t in inv["tables"]}
    edges, unresolved = [], []
    for t in inv["tables"]:
        links = {f["name"]: f["target"] for f in t["fields"] if f["type"] == "link_row"}
        for f in t["fields"]:
            if f["type"] != "formula":
                continue
            src = f"{t['name']}.{f['name']}"
            txt = f.get("formula", "")
            for m in re.finditer(r"field\('([^']+)'\)", txt):
                edges.append((src, f"{t['name']}.{m.group(1)}", "field"))
            for m in re.finditer(r"lookup\('([^']+)',\s*'([^']+)'\)", txt):
                link, tgt = m.group(1), m.group(2)
                tt = links.get(link) or (link if link in tabs else None)
                if tt:
                    edges.append((src, f"{tt}.{tgt}", "lookup"))
                    edges.append((src, f"{t['name']}.{link}", "link"))
                else:
                    unresolved.append((src, link, tgt))
    return sorted(set(edges)), unresolved

def reverse_reach(edges, node):
    rev = defaultdict(set)
    for a, b, _ in edges:
        rev[b].add(a)
    seen, stack = set(), [node]
    while stack:
        for p in rev[stack.pop()]:
            if p not in seen:
                seen.add(p); stack.append(p)
    return seen

def level0(inv, edges):
    out = ["# Röntgen — Seviye 0 (tek sayfa harita)", "",
           f"> Otomatik üretildi (`tools/build_xray.py`). Şema kaynağı: INVENTORY.json, {inv['meta']['generated_at']}. "
           "Çelişkide canlı Baserow geçerlidir. Satır verisi yoktur.", "",
           f"**{inv['meta']['table_count']} tablo · {inv['meta']['field_count']} alan · "
           f"{inv['meta']['link_field_count']} ilişki alanı · {inv['meta']['formula_count']} formül**", "",
           "Okuma sırası: bu sayfa → `01_SYSTEM_TREE/MODULES.md` (iş → tablo) → `TABLES.md` (tam kart) → "
           "`IMPACT.md` (değişiklik öncesi).", "",
           "Sütunlar: **Bağlı olduğu** = bu tablodan çıkan ilişki alanı sayısıyla komşular; "
           "**Formül girdisi** = bu tablonun formüllerinin okuduğu DİĞER tablolar; "
           "**Okunma** = başka tabloların formülleri bu tabloya kaç kez bakıyor.", ""]
    tid = {t["name"]: t for t in inv["tables"]}
    fin = defaultdict(set); readby = defaultdict(int)
    for a, b, k in edges:
        ta, tb = a.split(".", 1)[0], b.split(".", 1)[0]
        if ta != tb:
            fin[ta].add(tb); readby[tb] += 1
    groups = defaultdict(list)
    for t in inv["tables"]:
        groups[t["group_name"]].append(t)
    for g in sorted(groups):
        out += [f"## {g}", "", "| ID | Tablo | Amaç | Alan/İlişki/Formül | Bağlı olduğu | Formül girdisi | Okunma |", "|---|---|---|---|---|---|---|"]
        for t in sorted(groups[g], key=lambda x: x["id"]):
            cnt = defaultdict(int)
            for f in t["fields"]:
                if f["type"] == "link_row" and f["target"] != t["name"]:
                    cnt[f["target"]] += 1
            nb = ", ".join(f"{k}×{v}" if v > 1 else k for k, v in sorted(cnt.items())) or "—"
            nf = sum(1 for f in t["fields"] if f["type"] == "formula")
            nl = sum(1 for f in t["fields"] if f["type"] == "link_row")
            purpose = (t["purpose"] or "").replace("|", "/")
            if len(purpose) > 110:
                purpose = purpose[:107] + "..."
            fi = ", ".join(sorted(fin[t["name"]])) or "—"
            out.append(f"| {t['id']} | {t['name']} | {purpose} | {t['field_count']}/{nl}/{nf} | {nb} | {fi} | {readby[t['name']]} |")
        out.append("")
    hubs = sorted(inv["tables"], key=lambda t: -readby[t["name"]])[:5]
    out += ["## Merkez tablolar (en çok okunan)", ""] + [f"- **{t['name']}** — {readby[t['name']]} çapraz formül referansı" for t in hubs if readby[t['name']]]
    iso = [t["name"] for t in inv["tables"] if not any(f["type"] == "link_row" for f in t["fields"])]
    out += ["", "## Bağlantısız tablolar", ""] + [f"- {n}" for n in iso]
    return "\n".join(out) + "\n"

def impact_md(inv, edges):
    cnt = {}
    nodes = {b for _, b, _ in edges}
    for n in nodes:
        cnt[n] = len(reverse_reach(edges, n))
    top = sorted(cnt.items(), key=lambda x: -x[1])[:25]
    out = ["# Etki Analizi Özeti", "",
           "> Otomatik üretildi. 'Etkilenen' = bu alanı doğrudan veya zincirleme okuyan formül alanı sayısı. "
           "Formül metninden regex ile çıkarılır; **text-based olduğu için kaçırma/yanlış eşleme olabilir**, "
           "kritik değişiklikte `FORMULAS.md` ile elle doğrula.", "",
           "| Alan | Etkilenen formül sayısı | Örnek etkilenenler |", "|---|---|---|"]
    for n, c in top:
        ex = ", ".join(sorted(reverse_reach(edges, n))[:3])
        out.append(f"| {n} | {c} | {ex} |")
    out += ["", "Tek alan için: `python3 -I tools/build_xray.py --impact \"Tablo.Alan\"`", ""]
    return "\n".join(out)

def diff(old, new):
    def idx(inv):
        return {t["name"]: {f["name"]: f for f in t["fields"]} for t in inv["tables"]}
    o, n = idx(old), idx(new)
    lines = []
    for t in sorted(set(n) - set(o)): lines.append(f"- Tablo eklendi: {t}")
    for t in sorted(set(o) - set(n)): lines.append(f"- Tablo silindi: {t}")
    for t in sorted(set(o) & set(n)):
        for f in sorted(set(n[t]) - set(o[t])): lines.append(f"- {t}: alan eklendi `{f}` ({n[t][f]['type']})")
        for f in sorted(set(o[t]) - set(n[t])): lines.append(f"- {t}: alan silindi `{f}`")
        for f in sorted(set(o[t]) & set(n[t])):
            a, b = o[t][f], n[t][f]
            if a.get("type") != b.get("type"): lines.append(f"- {t}.{f}: tür {a.get('type')} → {b.get('type')}")
            elif a.get("formula") != b.get("formula"): lines.append(f"- {t}.{f}: formül değişti")
    return lines or ["- Yapısal fark yok."]

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--prev"); ap.add_argument("--impact")
    a = ap.parse_args()
    inv = load(os.path.join(SCH, "INVENTORY.json"))
    edges, unres = build_graph(inv)
    if a.impact:
        r = sorted(reverse_reach(edges, a.impact)); print("\n".join(r) or "Etkilenen formül yok."); return
    ver = {"generated_at": inv["meta"]["generated_at"], "schema_hash": h(inv["tables"]),
           "tables": {t["name"]: h(t["fields"]) for t in inv["tables"]},
           "counts": {k: inv["meta"][k] for k in ("table_count", "field_count", "link_field_count", "formula_count")}}
    w = lambda p, s: open(os.path.join(ROOT, p), "w", encoding="utf-8").write(s)
    w("02_DATABASE_SCHEMA/XRAY_LEVEL0.md", level0(inv, edges))
    w("02_DATABASE_SCHEMA/IMPACT.md", impact_md(inv, edges))
    w("02_DATABASE_SCHEMA/DEPENDENCY_GRAPH.json", json.dumps(
        {"edges": [{"from": x, "to": y, "kind": k} for x, y, k in edges],
         "unresolved": [{"from": s, "link": l, "target": t} for s, l, t in unres]}, ensure_ascii=False, indent=1) + "\n")
    w("02_DATABASE_SCHEMA/SCHEMA_VERSION.json", json.dumps(ver, ensure_ascii=False, indent=1, sort_keys=True) + "\n")
    if a.prev:
        old = load(a.prev)
        with open(os.path.join(ROOT, "04_CHANGE_HISTORY/SCHEMA_DIFFS.md"), "a", encoding="utf-8") as f:
            f.write(f"\n## {old['meta']['generated_at']} → {inv['meta']['generated_at']}\n\n" + "\n".join(diff(old, inv)) + "\n")
    print("edges", len(edges), "unresolved", len(unres), "hash", ver["schema_hash"])

if __name__ == "__main__":
    main()
