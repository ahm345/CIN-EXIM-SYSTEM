---
name: cin-exim-schema-refresh
description: Baserow şeması değiştiğinde (tablo, alan, ilişki, formül) veya depodaki şema belgeleri canlı şemayla uyuşmadığında 02_DATABASE_SCHEMA belgelerini canlı şemadan yeniden üretmek için kullan. Salt okunur çalışır.
---

# CIN EXIM — şema belgelerini yenileme

`02_DATABASE_SCHEMA/` altındaki dosyalar **elle yazılmaz**, canlı Baserow şemasından üretilir. Üç üretim aşaması vardır; **hepsi çalıştırılmazsa belgeler birbiriyle çelişir**:

| Aşama | Araç | Ürettiği |
|---|---|---|
| 1. Envanter | `tools/build_schema_docs.py` | `INVENTORY.json` (makine okunur tam envanter + `meta` sayıları), `TABLES.md`, `RELATION_MAP.md`, `FORMULAS.md` |
| 2. Röntgen | `tools/build_xray.py` | `XRAY_LEVEL0.md`, `IMPACT.md`, `DEPENDENCY_GRAPH.json`, `SCHEMA_VERSION.json` |
| 3. Fark ve sözlük | `tools/schema_diff.py`, `tools/build_field_dictionary.py` | `04_CHANGE_HISTORY/SCHEMA_DIFFS.md` + `02_DATABASE_SCHEMA/history/` anlık görüntüsü; `FIELD_DICTIONARY.md` |

Bu işlem Baserow'a **yazmaz**; yalnızca okur ve depodaki dosyaları üretir. Yine de Git'e commit ve push etmek için normal kuralları izle (dal + onay).

## Adımlar

1. **Şemayı oku (salt okunur).** Baserow `get_table_schema` ile `full_schema=true`, tüm tablo ID'leri için. `list_tables` (database_id 263856) ile ID listesini al. Çıktı büyükse araç sonucu bir dosyaya kaydeder; o dosya yolunu kullan. Büyük sonucu 3–4 çağrıya böl (ör. operasyonel / SYS / senaryo).
2. **Saati al.** Saat aracıyla ISO zaman damgası (örn. `2026-11-06T13:45:04+03:00`). Uydurma.
3. **Betiği çalıştır** (depo kökünde):
   ```bash
   python3 -I tools/build_schema_docs.py <ham1.json> <ham2.json> ... \
       --out 02_DATABASE_SCHEMA --generated-at <ISO zaman>
   ```
   Çıktının son satırı `meta` JSON'udur (tablo/alan/ilişki/formül sayıları).
4. **Yeni tablo uyarısı.** Betik çıkış kodu **2** ve "amacı tanımsız tablolar" uyarısı verirse, `tools/build_schema_docs.py` içindeki `META` sözlüğüne o tablo ID'si için `(grup, amaç)` ekle ve yeniden çalıştır. Yeni grup gerekiyorsa `GROUPS` sözlüğüne ekle.
5. **Röntgen, fark, sözlük** (depo kökünden, bu sırayla):
   ```bash
   python3 -I tools/build_xray.py              # röntgen, etki analizi, bağımlılık grafiği, şema özeti
   python3 -I tools/schema_diff.py             # önceki anlık görüntüyle farkı yazar + yeni anlık görüntü alır
   python3 -I tools/build_field_dictionary.py  # alan sözlüğü
   ```
   `schema_diff.py` farkı `04_CHANGE_HISTORY/SCHEMA_DIFFS.md` en üstüne yazar (tablo/alan Baserow ID'siyle eşlenir; yeniden adlandırma, tür/ilişki/formül/seçenek değişikliği ve **olası formül etkisi** görünür). Şema değişmediyse hiçbir şey yazmaz. Güncel envanter son anlık görüntüden eskiyse hata verir; o zaman dur ve kullanıcıya bildir.
6. **Karşılaştır.** `SCHEMA_DIFFS.md`'deki yeni kaydı oku. Beklenmeyen fark varsa (silinmiş alan, tür değişikliği, yeni ilişki) kullanıcıya bildir; SYS-004 kaydı olup olmadığına bak. `git diff --stat` ile de kontrol et.
7. **Kontrol et.** `python3 -I tools/handover_check.py` (HATA bırakma); `RELATION_MAP.md` Mermaid blokları makul mü; tablo sayısı canlı `list_tables` ile aynı mı.
8. **Güncelle.** `04_CHANGE_HISTORY/CHANGELOG.md` kaydı (**ne değişti + neden + onay**; fark dosyası yalnızca "ne"yi gösterir); `06_TASKS_AND_HANDOVER/CURRENT_STATE.md` sayıları; `01_SYSTEM_TREE/MODULES.md` yeni tablo/formül için; gerekirse `07_TESTS_AND_RELEASES/RELEASES.md`.
9. **Commit.** Dal `ai/<model>/<görev-kodu>`; mesajda `SYS:` ve `Oturum:` satırları. Şema değişikliği Baserow'da bir AI tarafından yapıldıysa SYS-004/SYS-002 kaydının var olduğunu doğrula; yoksa kullanıcıya bildir.

## Sınırlar

- Satır sayıları ve satır verisi bu belgelerde yoktur; gerektiğinde canlı oku.
- Betik, ham dosyalarda yalnızca `get_table_schema` biçimini bekler. Başka biçimde ise önce dönüştür.
- Formül metinleri Baserow'un döndürdüğü haliyle yazılır; Baserow arayüzünde görünenle aynı olmayabilir.
- Gerçek ticari veri bu belgelere girmez (şema yalnızca yapıdır; seçenek listeleri iş adları taşıyabilir, gizli bilgi içermediğini kontrol et).
