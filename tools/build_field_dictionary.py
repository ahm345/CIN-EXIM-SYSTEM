#!/usr/bin/env python3
"""CIN EXIM - Alan sözlüğü üreticisi (salt dosya okur/yazar, Baserow'a bağlanmaz).

Girdi : 02_DATABASE_SCHEMA/INVENTORY.json
        02_DATABASE_SCHEMA/FIELD_MEANINGS.json   (elle bakılan, KAYNAKLI anlamlar; isteğe bağlı)
Çıktı : 02_DATABASE_SCHEMA/FIELD_DICTIONARY.md

Sözlük, tablolar ARASI ortak alanları (aynı ad birden çok tabloda), aynı adı farklı türde kullanan
alanları ve seçmeli alanların geçerli değer listelerini verir. Alan ANLAMI yalnızca FIELD_MEANINGS.json
içinde kaynağı olanlar için yazılır; kalanı 'Bilinmiyor / Doğrulanmadı' kalır (tahmin yazılmaz).

Kullanım:  python3 -I tools/build_field_dictionary.py
"""
import collections
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCH = os.path.join(ROOT, "02_DATABASE_SCHEMA")
UNKNOWN = "Bilinmiyor / Doğrulanmadı"


def esc(s):
    return str(s).replace("\\", "\\\\").replace("|", "\\|").replace("\n", " ")


def names(lst, n=6):
    lst = sorted(set(lst))
    return ", ".join(esc(x) for x in lst[:n]) + (f" (+{len(lst) - n})" if len(lst) > n else "")


def main():
    with open(os.path.join(SCH, "INVENTORY.json"), encoding="utf-8") as f:
        inv = json.load(f)
    meanings = {}
    mp = os.path.join(SCH, "FIELD_MEANINGS.json")
    if os.path.exists(mp):
        with open(mp, encoding="utf-8") as f:
            meanings = {k: v for k, v in json.load(f).items() if not k.startswith("_")}

    by_name = collections.defaultdict(list)  # alan adı -> [(tablo, alan)]
    for t in inv["tables"]:
        for fld in t["fields"]:
            by_name[fld["name"]].append((t["name"], fld))

    stale = sorted(set(meanings) - set(by_name))
    if stale:
        print("UYARI: FIELD_MEANINGS.json'da envanterde olmayan alan adları: " + ", ".join(stale), file=sys.stderr)
    for k, v in meanings.items():
        if not v.get("anlam") or not v.get("kaynak"):
            print(f"UYARI: FIELD_MEANINGS.json '{k}' için 'anlam' ve 'kaynak' birlikte zorunlu.", file=sys.stderr)

    shared = {n: v for n, v in by_name.items() if len({t for t, _ in v}) >= 2}
    mixed = {n: v for n, v in shared.items() if len({f['type'] for _, f in v}) > 1}
    selects = collections.defaultdict(list)  # (ad, değer listesi) -> tablolar
    for n, v in by_name.items():
        for tname, fld in v:
            if fld["type"] in ("single_select", "multiple_select") and fld.get("options"):
                selects[(n, tuple(fld["options"]), fld["type"])].append(tname)

    inv_meta = inv["meta"]
    out = ["# Alan Sözlüğü", "",
           f"> Otomatik üretildi (`tools/build_field_dictionary.py`). Şema kaynağı: INVENTORY.json, {inv_meta['generated_at']}. "
           "Çelişkide canlı Baserow geçerlidir. Satır verisi yoktur.", "",
           f"**{len(by_name)} benzersiz alan adı · {len(shared)} tanesi ≥2 tabloda ortak · "
           f"{len(mixed)} tanesi farklı türlerde kullanılıyor · {len(selects)} seçmeli değer listesi**", "",
           f"**Anlamı kayıtlı alan adı: {len(meanings)}** (bunların {sum(1 for k in meanings if k in shared)} tanesi ortak alan; "
           f"ortak alanların {len(shared) - sum(1 for k in meanings if k in shared)} tanesinin anlamı yok). "
           f"Anlamı belgelerde kanıtlanmayan alan için `{UNKNOWN}` yazılır; anlam uydurulmaz. "
           "Tablo bazında alan listesi: `TABLES.md`; formül metinleri: `FORMULAS.md`.", "",
           "## 1. Ortak alanlar (aynı ad, ≥2 tablo)", "",
           "| Alan | Tür | Tablo | Tablolar | Anlam |", "|---|---|---|---|---|"]
    for n, v in sorted(shared.items(), key=lambda x: (-len({t for t, _ in x[1]}), x[0])):
        types = sorted({f["type"] for _, f in v})
        targets = sorted({f["target"] for _, f in v if f.get("target")})
        tdesc = ", ".join(types) + (f" → {names(targets, 3)}" if targets else "")
        if n in meanings:
            m = meanings[n]
            mean = f"{m['anlam']} _(kaynak: {m['kaynak']})_"
        elif targets:
            mean = f"İlişki alanı → {names(targets, 3)}. Anlam: {UNKNOWN}"
        else:
            mean = UNKNOWN
        out.append(f"| {esc(n)} | {esc(tdesc)} | {len({t for t, _ in v})} | {names([t for t, _ in v])} | {mean.replace('|', '/')} |")

    out += ["", "## 2. Aynı adı farklı türde kullanan alanlar", "",
            "Aynı adlı alanın tablolar arasında farklı türde olması bakım riski taşır (formül, filtre, dışa aktarma). "
            "Bu liste bir **gözlemdir**; farkın kasıtlı olup olmadığı belgelenmemiştir.", "",
            "| Alan | Tür → tablolar |", "|---|---|"]
    for n, v in sorted(mixed.items()):
        g = collections.defaultdict(list)
        for tname, fld in v:
            g[fld["type"]].append(tname)
        out.append(f"| {esc(n)} | " + "; ".join(f"**{ty}** → {names(ts, 4)}" for ty, ts in sorted(g.items())) + " |")

    out += ["", "## 3. Seçmeli alanların geçerli değerleri", "",
            "Aynı ad ve aynı değer listesi birlikte gruplanır. Liste farklıysa aynı alan adı ayrı satırda görünür (tablolar arası tutarsızlık işareti).", "",
            "| Alan | Tür | Tablolar | Değerler |", "|---|---|---|---|"]
    for (n, opts, ty), ts in sorted(selects.items(), key=lambda x: (x[0][0], x[0][1])):
        out.append(f"| {esc(n)} | {ty} | {names(ts)} | " + " · ".join(esc(o) for o in opts) + " |")

    single = {k: v for k, v in meanings.items() if k in by_name and k not in shared}
    if single:
        out += ["", "## 4. Tek tabloda geçen ama anlamı kayıtlı alanlar", "",
                "| Alan | Tablo | Anlam |", "|---|---|---|"]
        for k, m in sorted(single.items()):
            out.append(f"| {esc(k)} | {names([t for t, _ in by_name[k]])} | "
                       f"{m['anlam'].replace('|', '/')} _(kaynak: {m['kaynak']})_ |")

    out += ["", "## Anlam eklemek", "",
            "1. Anlam, belgede/formülde **kanıtlıysa** `FIELD_MEANINGS.json` içine `anlam` + `kaynak` ile yaz. Kullanıcıdan geldiyse `kaynak`: `Kullanıcı beyanı (tarih)`.",
            "2. Kanıtı yoksa yazma; eksik anlamları `INFO_GAP_PROTOCOL.md` ile **tek listede, A grubu (yalnızca kullanıcı bilir)** olarak sor.",
            "3. `python3 -I tools/build_field_dictionary.py` ile yeniden üret.", ""]
    with open(os.path.join(SCH, "FIELD_DICTIONARY.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(out))
    print(f"alan adı {len(by_name)}, ortak {len(shared)}, farklı tür {len(mixed)}, seçmeli liste {len(selects)}, anlamı kayıtlı {len(meanings)}")


if __name__ == "__main__":
    main()
