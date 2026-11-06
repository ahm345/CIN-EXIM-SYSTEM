# Sürüm Politikası

Üç ayrı sürüm kavramı vardır; karıştırma.

| Sürüm | Ne | Nerede | Şu an |
|---|---|---|---|
| **Sistem (Baserow) sürümü** | Veritabanı yapısı | SYS-001 `Aktif Sürüm`, SYS-002 | `SYS-FOUNDATION-0.1` (kurulum taslağı, doğrulama bekliyor — SYS-001 beyanı) |
| **Protokol sürümü** | AI işletim protokolü | SYS-009 `Protokol Sürümü` | `1.4` (canlı doğrulandı) |
| **Depo (Git) sürümü** | Bu depodaki belgeler ve araçlar | Git etiketi + `04_CHANGE_HISTORY/CHANGELOG.md` | `repo-v0.1.0` |

Git etiketleri **`repo-vX.Y.Z`** biçimindedir; böylece Baserow sistem sürümüyle karışmaz.

## Depo sürümü kuralları

- **MAJOR:** klasör düzeni veya `AI_START.md` akışı değişir.
- **MINOR:** yeni belge türü, yeni modül, şema belgelerinin yeniden üretilmesi (şema değişikliği yansıdı).
- **PATCH:** metin düzeltmesi, kayıt şablonu iyileştirmesi.

## Sürüm çıkarırken

1. `CHANGELOG.md` kaydı (şablon: `CHANGE_TEMPLATE.md`).
2. Şema değiştiyse `02_DATABASE_SCHEMA/` yeniden üretildi (T-08).
3. `PROTOCOL_MIRROR.md` SYS-009 sürümüyle uyumlu mu kontrol edildi.
4. Kullanıcı onayı alındı (Pull Request birleştirme).
5. Git etiketi atıldı; commit SHA'sı SYS-002 sürüm kaydının metin alanına yazıldı (`SYS_GIT_LINKING.md` bölüm 4).
6. Sistem (Baserow) sürümü de değiştiyse SYS-002'de **ayrı** sürüm kaydı açıldı; sayıları (tablo/alan/ilişki/formül) `INVENTORY.json meta` ile aynı.

## Kayıtlı sürümler

| Depo sürümü | Tarih | Özet |
|---|---|---|
| repo-v0.1.0 | 2026-11-06 | İlk kurulum: sistem ağacı, 41 tablonun şema belgeleri, protokol yansıması, devir şablonu, skill'ler |

## SYS-002 ile sayı karşılaştırması

Bu depo kurulurken canlı şemadan: **41 tablo, 845 alan, 219 ilişki alanı, 91 formül** (`INVENTORY.json meta`). SYS-002 aktif sürüm kaydındaki sayılarla karşılaştırma yapılmadı (SYS-002 satırları bu kurulum sırasında okunmadı); bir sonraki denetimde yapılmalı.
