#!/usr/bin/env python3
"""CIN EXIM - Baserow şema dokümanlarını üretir.

Girdi : Baserow MCP `get_table_schema` (full_schema=true) çıktıları (JSON dizi dosyaları).
Çıktı : 02_DATABASE_SCHEMA/ altına
          INVENTORY.json   - makine tarafından okunur tam envanter
          TABLES.md        - tablo kartları
          RELATION_MAP.md  - ilişki haritası (Mermaid) + kim kime bağlı
          FORMULAS.md      - tüm formüller ve metinleri

Kullanım:
  python3 -I tools/build_schema_docs.py ham1.json ham2.json ... \
      --out 02_DATABASE_SCHEMA --generated-at 2026-11-06T08:57:59+03:00

Aynı tablo birden fazla ham dosyada geçerse son görülen kullanılır.
Betik Baserow'a bağlanmaz ve hiçbir şey yazmaz; yalnızca dosya okur/üretir.
"""
import argparse
import json
import os
import sys
from collections import defaultdict

# --------------------------------------------------------------------------
# Elle bakımı yapılan meta veri (tablo amacı ve grup). Yeni tablo eklenince
# buraya da eklenmeli; eklenmezse "TANIMSIZ" olarak raporlanır (çıkış kodu 2).
# --------------------------------------------------------------------------
GROUPS = {
    "01": "01 İş Çekirdeği",
    "02": "02 Finansman ve Nakit Akışı",
    "03": "03 Lojistik ve Gümrük",
    "04": "04 Belge ve Süreç",
    "05": "05 Senaryo Motoru",
    "06": "06 SYS Yönetim",
    "07": "07 Eski / Referans",
}

META = {
    1299125: ("01", "Tüm taraflar için ortak firma kaydı (tedarikçi, imalatçı, kreditör, kiracı, sigortacı, taşıyıcı vb.). Mülkiyet zincirindeki roller buradan bağlanır."),
    1299126: ("01", "Ana proje kaydı. Maliyet, kredi, kira, vergi ve süreç ilerleme özetlerini toplayan formüller içerir."),
    1299127: ("01", "Projedeki ekipman lotları (tedarikçi, tutar). Makineleri ve sevkiyatları gruplar."),
    1299128: ("01", "Lot bazlı sipariş ve üretim takibi; FAT raporu belgesi bağlanır."),
    1299813: ("01", "Makine (şasi / seri no) kaydı: hukuki malik, fiili kullanıcı, tahsis, sigorta ve yaşam döngüsü kontrolleri."),
    1301365: ("01", "Makine - sözleşme - kullanan firma tahsisi; tarih ve durum. Çakışma kontrolü için kritik."),
    1301364: ("01", "Sözleşmeler (satış, leasing, kira, alt kiralama, tahsis, teminat, hizmet vb.); ana sözleşme ile kendine bağlanabilir."),
    1299814: ("01", "Makine / sözleşme bazlı hizmet kayıtları."),
    1299136: ("01", "Lot ve makine bazlı bakım ve yedek parça kalemleri."),
    1301366: ("01", "Sigorta poliçeleri (makine veya sevkiyat bazlı); geçerlilik formülü içerir."),
    1299129: ("02", "Finansman kredileri (kreditör, borçlu); teminat, belge ve geri ödeme planı özetleri."),
    1299130: ("02", "Kredi teminatları (veren, lehtar, bildirim yapılan taraf)."),
    1299810: ("02", "Kredi geri ödeme satırları; kira planı ve gelir-gider dengesiyle bağlıdır."),
    1299134: ("02", "Dönemsel kira ve tahsilat planı; stopaj, borç servisi, CFADS ve DSCR."),
    1299815: ("02", "Proje gelir-gider dengesi; DSCR, CFADS ve geri ödeme satırlarıyla bağlıdır."),
    1299135: ("02", "Proje / sevkiyat giderleri ve vergiler; USD karşılığı."),
    1299816: ("02", "Kur kayıtları. Başka tabloyla bağlantısı yoktur (referans tablo)."),
    1299131: ("03", "Sevkiyat kayıtları; taşıyıcı, gümrük, belge ve taşıma sigortası bağlantıları."),
    1299132: ("03", "Beyanname bazlı gümrük vergisi ve KDV hesapları; muafiyet bağlantısı."),
    1299812: ("03", "Proje muafiyet ve teşvik kayıtları; gümrük işlemleriyle bağlıdır."),
    1299133: ("04", "Belge kayıtları ve dosya ekleri. Pek çok tablonun kanıt belgesidir; Dosya Kontrolü formülü burada."),
    1299137: ("04", "Süreç / olay adımları (varlık olayları dahil); kanıt belgesi ve sorumlu firma."),
    1299811: ("04", "Firmalar arası yazışma kayıtları."),
    1303465: ("05", "Senaryo ana kaydı (finansman, mülkiyet, ithalat, çıkış modeli, kur varsayımı); alt senaryo tablolarını bağlar."),
    1303466: ("05", "Senaryonun finansman dilimleri (araç, anapara, faiz, vade, erteleme, balloon, komisyon)."),
    1303467: ("05", "Senaryo ödeme planı satırları; toplam borç servisi formülü."),
    1303468: ("05", "Senaryo varsayımları (parametre, değer, kaynak, doğrulama durumu)."),
    1303469: ("05", "Senaryo değerlendirme metrikleri (IRR, NPV, DSCR, net kâr vb.)."),
    1303470: ("05", "Senaryo gelir-gider akışı; toplam gelir/gider, net nakit akışı, borç servisi ve DSCR formülleri."),
    1301798: ("06", "SYS-001 Sistem Ana İndeksi: aktif sürüm, AI başlangıç talimatı, yedekleme politikası."),
    1301799: ("06", "SYS-002 Sistem Sürüm Kayıtları: sürüm kodu, tablo/alan/ilişki/formül sayıları, eklenen/değişen/kaldırılan."),
    1301800: ("06", "SYS-003 Sistem Yedek Paketleri: yedek türü, konum, bütünlük ve geri yükleme testi."),
    1301801: ("06", "SYS-004 Sistem Değişiklik Günlüğü: yapısal / riskli değişikliklerin önceki-yeni durumu ve geri alma talimatı."),
    1301802: ("06", "SYS-005 Sistem Karar Kayıtları: kullanıcı onaylı kalıcı kararlar."),
    1301803: ("06", "SYS-006 Sistem Denetim ve Testleri: denetim kapsamı, bulgu sayıları (P0-P3), rapor."),
    1301804: ("06", "SYS-007 Geri Yükleme ve Klonlama: yedekten kurulum işlemleri ve doğrulama sonuçları."),
    1301805: ("06", "SYS-008 Görev ve Geliştirme Takibi: öncelik, durum, sorumlu, tamamlanma kriteri."),
    1301819: ("06", "SYS-009 AI İşletim Protokolü: giriş, çalışma, çıkış, yasaklar. Protokolün TEK KAYNAĞI."),
    1301820: ("06", "SYS-010 AI Oturum ve Devir Kayıtları: her oturum için tek kayıt; sonraki AI için talimat."),
    1301821: ("06", "SYS-011 AI Çalışma ve Olay Günlüğü: yalnızca hata, geri alma, beklenmedik durum, kullanıcı talebi."),
    620460: ("07", "Eski AI denetim raporu kaydı (SYS-006 ile bağlı). Korunur, silinmez."),
}

LINK_TYPES = {"link_row"}
SELECT_TYPES = {"single_select", "multiple_select"}
FIRMALAR_ID = 1299125


def load(paths):
    tables = {}
    for p in paths:
        with open(p, encoding="utf-8") as fh:
            raw = fh.read()
        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            data = json.loads(raw[raw.find("[{"):])
        if isinstance(data, dict):
            data = data.get("result", data.get("tables", []))
        for t in data:
            tables[t["id"]] = t
    return tables


def normalize(raw_tables):
    out = []
    for tid, t in sorted(raw_tables.items(), key=lambda kv: kv[0]):
        group, purpose = META.get(tid, ("07", "TANIMSIZ - bu tablo için amaç yazılmamış (tools/build_schema_docs.py META)."))
        fields = []
        for f in t["fields"]:
            nf = {"id": f["id"], "name": f["name"], "type": f["type"]}
            if f.get("primary"):
                nf["primary"] = True
            if f["type"] in LINK_TYPES:
                nf["target_id"] = f.get("link_row_table_id")
                nf["target"] = f.get("link_row_table_name")
            if f["type"] == "formula":
                nf["formula"] = f.get("formula")
                nf["formula_type"] = f.get("formula_type")
            if f["type"] in SELECT_TYPES:
                nf["options"] = [o["value"] for o in f.get("options", [])]
            fields.append(nf)
        out.append({
            "id": tid,
            "name": t["name"],
            "group": group,
            "group_name": GROUPS[group],
            "purpose": purpose,
            "field_count": len(fields),
            "primary_field": next((x["name"] for x in fields if x.get("primary")), None),
            "fields": fields,
        })
    return out


def link_counts(tables):
    """(a,b) sıralı çift -> a'dan b'ye link alanı sayısı."""
    c = defaultdict(int)
    for t in tables:
        for f in t["fields"]:
            if f["type"] == "link_row":
                c[(t["id"], f["target_id"])] += 1
    return c


def pair_edges(tables):
    c = link_counts(tables)
    edges = {}
    for (a, b), n in c.items():
        if a == b:
            continue
        key = tuple(sorted((a, b)))
        edges[key] = max(edges.get(key, 0), n, c.get((b, a), 0))
    return edges


def short(name):
    if name.startswith("SYS-"):
        return name.split("|")[0].strip()
    return name


def esc(text):
    return str(text).replace("|", "\\|").replace("\n", " ")


def write_inventory(tables, out_dir, generated_at):
    meta = {
        "generated_at": generated_at,
        "source": "Baserow veritabanı 263856 (canlı şema, salt okunur)",
        "table_count": len(tables),
        "field_count": sum(t["field_count"] for t in tables),
        "link_field_count": sum(1 for t in tables for f in t["fields"] if f["type"] == "link_row"),
        "formula_count": sum(1 for t in tables for f in t["fields"] if f["type"] == "formula"),
        "note": "Satır sayıları ve satır verisi burada YOKTUR; canlı okunmalıdır.",
    }
    with open(os.path.join(out_dir, "INVENTORY.json"), "w", encoding="utf-8") as fh:
        json.dump({"meta": meta, "tables": tables}, fh, ensure_ascii=False, indent=1)
    return meta


def write_tables_md(tables, out_dir, meta):
    by_id = {t["id"]: t for t in tables}
    L = []
    L.append("# Tablo Kartları\n")
    L.append(f"> Otomatik üretildi (`tools/build_schema_docs.py`). Kaynak: canlı Baserow şeması, {meta['generated_at']}. **Elle düzenlemeyin**; şemayı yeniden okuyup betiği çalıştırın.\n")
    L.append(f"**Özet:** {meta['table_count']} tablo, {meta['field_count']} alan, {meta['link_field_count']} ilişki alanı, {meta['formula_count']} formül. Satır sayıları bu belgede yoktur (canlı okunmalı).\n")
    L.append("## Hızlı dizin\n")
    L.append("| Grup | Tablo | ID | Alan | İlişki | Formül |")
    L.append("|---|---|---|---|---|---|")
    for t in sorted(tables, key=lambda x: (x["group"], x["id"])):
        nl = sum(1 for f in t["fields"] if f["type"] == "link_row")
        nf = sum(1 for f in t["fields"] if f["type"] == "formula")
        L.append(f"| {t['group_name']} | {esc(t['name'])} | {t['id']} | {t['field_count']} | {nl} | {nf} |")
    L.append("")
    cur = None
    for t in sorted(tables, key=lambda x: (x["group"], x["id"])):
        if t["group"] != cur:
            cur = t["group"]
            L.append(f"\n---\n\n## {t['group_name']}\n")
        L.append(f"### {t['name']}  (ID {t['id']})\n")
        L.append(f"{t['purpose']}\n")
        L.append(f"- Birincil alan: `{t['primary_field']}` | Alan sayısı: {t['field_count']}")
        links = [f for f in t["fields"] if f["type"] == "link_row"]
        forms = [f for f in t["fields"] if f["type"] == "formula"]
        if links:
            L.append("- İlişkiler (alan -> hedef tablo):")
            for f in links:
                tgt = by_id.get(f["target_id"])
                tname = tgt["name"] if tgt else f["target"]
                self_mark = " (kendine)" if f["target_id"] == t["id"] else ""
                L.append(f"  - `{f['name']}` -> **{esc(tname)}** ({f['target_id']}){self_mark}")
        else:
            L.append("- İlişki yok.")
        if forms:
            L.append("- Formüller: " + ", ".join(f"`{f['name']}`" for f in forms) + " (metinleri `FORMULAS.md` içinde)")
        L.append("")
        L.append("<details><summary>Tüm alanlar</summary>\n")
        L.append("| Alan | Tip |")
        L.append("|---|---|")
        for f in t["fields"]:
            extra = ""
            if f["type"] in SELECT_TYPES and f.get("options"):
                opts = f["options"]
                extra = " [" + " / ".join(opts[:8]) + (" / ..." if len(opts) > 8 else "") + "]"
            L.append(f"| {esc(f['name'])} | {f['type']}{esc(extra)} |")
        L.append("\n</details>\n")
    with open(os.path.join(out_dir, "TABLES.md"), "w", encoding="utf-8") as fh:
        fh.write("\n".join(L))


def mermaid_nodes(ids, by_id, indent="    "):
    return [f'{indent}T{i}["{short(by_id[i]["name"])}"]' for i in ids]


def write_relation_md(tables, out_dir, meta):
    by_id = {t["id"]: t for t in tables}
    edges = pair_edges(tables)
    L = []
    L.append("# Tablo İlişki Haritası\n")
    L.append(f"> Otomatik üretildi (`tools/build_schema_docs.py`), kaynak: canlı şema {meta['generated_at']}. Kenar etiketi = iki tablo arasındaki ilişki alanı sayısı (çift yönlü alanlar tek sayılır).\n")

    gcount = defaultdict(int)
    for (a, b), n in edges.items():
        ga, gb = by_id[a]["group"], by_id[b]["group"]
        if ga != gb:
            gcount[tuple(sorted((ga, gb)))] += n
    L.append("## 1. Grup düzeyinde harita\n")
    L.append("```mermaid")
    L.append("flowchart LR")
    for g, name in GROUPS.items():
        members = [t for t in tables if t["group"] == g]
        if members:
            L.append(f'    G{g}["{name} ({len(members)} tablo)"]')
    for (ga, gb), n in sorted(gcount.items()):
        L.append(f"    G{ga} ---|{n}| G{gb}")
    L.append("```\n")

    def diagram(title, ids, extra_ids=()):
        ids = list(ids)
        ext = [i for i in extra_ids if i not in ids and i in by_id]
        show = set(ids) | set(ext)
        L.append(f"## {title}\n")
        L.append("```mermaid")
        L.append("flowchart LR")
        L.extend(mermaid_nodes(ids, by_id, "    "))
        for i in ext:
            L.append(f'    T{i}["{short(by_id[i]["name"])}"]:::ext')
        for (a, b), n in sorted(edges.items()):
            if a in show and b in show and (a in ids or b in ids):
                L.append(f"    T{a} ---|{n}| T{b}")
        L.append("    classDef ext stroke-dasharray: 4 3")
        L.append("```\n")

    op = [t["id"] for t in tables if t["group"] in ("01", "02", "03", "04")]
    sc = [t["id"] for t in tables if t["group"] == "05"]
    sy = [t["id"] for t in tables if t["group"] == "06"]
    legacy = [t["id"] for t in tables if t["group"] == "07"]
    diagram("2. Operasyonel tablolar (grup 01-04)", op)
    diagram("3. Senaryo motoru (grup 05) ve bağlandığı tablolar", sc, extra_ids=[FIRMALAR_ID, 1299126])
    diagram("4. SYS yönetim tabloları (grup 06)", sy, extra_ids=legacy)

    L.append("## 5. Tablo -> bağlı olduğu tablolar\n")
    L.append("Parantez içindeki sayı, o tablodan hedefe giden ilişki alanı sayısıdır. Hızlı etki analizi için kullanın: bir tabloyu değiştirmeden önce buradaki komşulara bakın.\n")
    L.append("| Tablo | Bağlantılı tablolar |")
    L.append("|---|---|")
    for t in sorted(tables, key=lambda x: (x["group"], x["id"])):
        tg = defaultdict(int)
        for f in t["fields"]:
            if f["type"] == "link_row":
                tg[f["target_id"]] += 1
        parts = []
        for tid2, n in sorted(tg.items(), key=lambda kv: by_id[kv[0]]["name"]):
            label = esc(short(by_id[tid2]["name"]))
            if tid2 == t["id"]:
                label += " (kendine)"
            parts.append(f"{label} ({n})")
        L.append(f"| {esc(short(t['name']))} | {', '.join(parts) if parts else '-'} |")
    L.append("")

    L.append("## 6. Firmalar rol alanları (mülkiyet ve sorumluluk zinciri)\n")
    L.append("Aşağıdaki alanların hepsi **Firmalar** tablosuna bağlanır; hukuki malik, fiili kullanıcı, ithalatçı, tescil sahibi gibi rolleri ayırır.\n")
    L.append("| Tablo | Alan |")
    L.append("|---|---|")
    for t in sorted(tables, key=lambda x: x["id"]):
        if t["id"] == FIRMALAR_ID:
            continue
        roles = [f["name"] for f in t["fields"] if f["type"] == "link_row" and f["target_id"] == FIRMALAR_ID]
        if roles:
            L.append(f"| {esc(short(t['name']))} | {esc(', '.join(roles))} |")
    L.append("")

    selfs = [(t["name"], f["name"]) for t in tables for f in t["fields"] if f["type"] == "link_row" and f["target_id"] == t["id"]]
    if selfs:
        L.append("## 7. Kendine bağlanan alanlar\n")
        for tn, fn in selfs:
            L.append(f"- {esc(tn)}: `{fn}`")
        L.append("")
    with open(os.path.join(out_dir, "RELATION_MAP.md"), "w", encoding="utf-8") as fh:
        fh.write("\n".join(L))


def write_formulas_md(tables, out_dir, meta):
    L = ["# Formüller\n"]
    L.append(f"> Otomatik üretildi, kaynak: canlı şema {meta['generated_at']}. Toplam {meta['formula_count']} formül. Bir formül değişince bu dosya yeniden üretilmeli ve `04_CHANGE_HISTORY/` altına kayıt düşülmelidir.\n")
    for t in sorted(tables, key=lambda x: (x["group"], x["id"])):
        forms = [f for f in t["fields"] if f["type"] == "formula"]
        if not forms:
            continue
        L.append(f"## {t['name']}  (ID {t['id']})\n")
        for f in forms:
            L.append(f"### `{f['name']}`  (alan ID {f['id']}, sonuç tipi: {f.get('formula_type')})\n")
            L.append("```")
            L.append(str(f.get("formula")))
            L.append("```\n")
    with open(os.path.join(out_dir, "FORMULAS.md"), "w", encoding="utf-8") as fh:
        fh.write("\n".join(L))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("raw", nargs="+", help="get_table_schema ham JSON dosyaları")
    ap.add_argument("--out", default="02_DATABASE_SCHEMA")
    ap.add_argument("--generated-at", required=True, help="ISO zaman damgası (araç saatinden; uydurmayın)")
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    tables = normalize(load(a.raw))
    undefined = [t["name"] for t in tables if t["purpose"].startswith("TANIMSIZ")]
    meta = write_inventory(tables, a.out, a.generated_at)
    write_tables_md(tables, a.out, meta)
    write_relation_md(tables, a.out, meta)
    write_formulas_md(tables, a.out, meta)
    print(json.dumps(meta, ensure_ascii=False))
    if undefined:
        print("UYARI: amacı tanımsız tablolar:", undefined, file=sys.stderr)
        sys.exit(2)


if __name__ == "__main__":
    main()
