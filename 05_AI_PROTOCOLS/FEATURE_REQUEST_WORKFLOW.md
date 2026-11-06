# Geliştirme İsteği Akışı

Kullanıcı yeni bir özellik veya düzeltme istediğinde AI bu akışı izler. Hiçbir adım, kullanıcı onayı olmadan canlı Baserow'a yazma yetkisi vermez.

> Örnek istek: *"Finansman tablolarına 12 ay anapara ödemesiz, 5 yıl vadeli, aylık veya yıllık ödeme seçeneği ekle."*

## Adımlar

| # | Adım | Ne yapılır | Nereye bakılır |
|---|---|---|---|
| 1 | **İsteği anla** | İş gereksinimlerini çıkar; belirsizlikleri ve kullanıcı kararı gerektirenleri ayır. | İstek metni, ilgili SYS-005 kararları |
| 2 | **Modülü bul** | İsteğin dokunduğu modül ve tabloları belirle. | `01_SYSTEM_TREE/MODULES.md` |
| 3 | **Mevcut yapıyı oku** | Alanlar, ilişkiler, formüller, seçenek listeleri; gerekirse ilgili satırlar (canlı, salt okunur). | `02_DATABASE_SCHEMA/INVENTORY.json`, `FORMULAS.md`, canlı Baserow |
| 4 | **Etki analizi** | Hangi tablolar, alanlar, formüller, ilişkiler, görünümler, raporlar etkilenir? Hangi mevcut kayıtlar bozulabilir? | `RELATION_MAP.md` bölüm 5; formül metinlerinde alan adı araması |
| 5 | **Öneri hazırla** | Yeni alanlar, hesap kuralları, test senaryoları, geri alma planı. Mevcut kayıtlar korunur. | `03_BUSINESS_RULES/`, `KNOWN_ISSUES.md` |
| 6 | **Onay al** | Öneriyi ve etkileri kullanıcıya sun; açık onay bekle. Onay alınmadıysa uygulama. | – |
| 7 | **Uygula ve test et** | Yalnızca onaylı kapsamda uygula. Her adımdan sonra test et; başarısız testi gizleme. | Canlı Baserow |
| 8 | **Kaydet** | SYS-010 (oturum), SYS-004 (yapısal değişiklik), SYS-005 (kalıcı karar), SYS-008 (yeni açık iş) ve Git (`SYS_GIT_LINKING.md`). | SYS tabloları + bu depo |
| 9 | **Belgeleri yenile** | Şema değiştiyse `02_DATABASE_SCHEMA/` yeniden üret; `CHANGELOG.md` ve `CURRENT_STATE.md` güncelle. | `cin-exim-schema-refresh` |
| 10 | **Devret** | Sonraki AI için ilk adımları yaz. | `HANDOVER_TEMPLATE.md` |

## Etki analizi şablonu (adım 4–5 çıktısı)

```
## İstek
<tek cümle>

## Kapsam (modül ve tablolar)
- Modül: <MODULES.md numarası ve adı>
- Doğrudan etkilenen tablolar: <ad (ID)>
- Dolaylı etkilenenler (ilişki / formül): <ad (ID) — neden>

## Mevcut durum
- Alanlar / formüller / seçenekler: <özet>
- Mevcut satır sayısı (canlı): <tablo: n>
- İlgili bilinen sorunlar: <KI-xx>

## Öneri
- Yeni / değişen alanlar: <ad, tip, açıklama>
- Hesap mantığı: <kural; hangi kural koduna dayanıyor>
- Mevcut kayıtlara etkisi: <hiçbiri | liste>

## Kullanıcı kararı gerektirenler
1. <karar>  (seçenekler: a / b / c)

## Test senaryoları
1. <girdi → beklenen sonuç>

## Geri alma planı
<adımlar>

## Onay
Bekleniyor — onay gelmeden hiçbir şey değiştirilmeyecek.
```

## Sık yapılan hatalar

- **Mevcut kaydı yeniden üretmek.** Önce SYS-010 son kayıt ve SYS-008 ile işin yapılıp yapılmadığına bak.
- **`OK` sonucuna güvenmek.** Kontrol formülleri dosya veya hukuki doğrulamayı garanti etmez (KI-01).
- **Şema onayını SYS yazma izniyle karıştırmak.** Biri diğerini kapsamaz.
- **Demo ve gerçek veriyi karıştırmak.** `Gerçek Veri` alanına bak.
