# Şema sürüm geçmişi (anlık görüntüler)

Bu klasör, `INVENTORY.json`'un **her şema değişikliğindeki** anlık görüntüsünü tutar. Amaç: iki sürüm arasındaki farkı otomatik yazabilmek (`tools/schema_diff.py`) ve "şema ne zaman, nasıl değişti" sorusunu Git'e bakmadan cevaplamak.

> **Elle düzenleme.** Dosyaları `tools/schema_diff.py` üretir. Dosya adı: `INVENTORY_<şema zamanı>_<şema özeti>.json` (ör. `INVENTORY_2026-11-06T085759+0300_a8068f47e2bc.json`). Şema özeti (`a8068f47e2bc`) `SCHEMA_VERSION.json` içindeki `schema_hash` ile aynı değerdir.

## Ne zaman çalıştırılır

`INVENTORY.json` yeniden üretildikten sonra (`cin-exim-schema-refresh` skill'i, adım 5):

```bash
python3 -I tools/schema_diff.py
```

- İlk çalıştırma başlangıç noktasını kaydeder.
- Şema değişmediyse hiçbir şey yazmaz (tekrar çalıştırmak güvenlidir).
- Şema değiştiyse `04_CHANGE_HISTORY/SCHEMA_DIFFS.md` en üstüne bir fark kaydı ekler ve yeni anlık görüntü alır.
- Güncel `INVENTORY.json`, son anlık görüntüden **eskiyse** hata verir ve hiçbir şey yazmaz.

Diğer komutlar: `list` (anlık görüntüleri göster), `diff ESKI.json YENI.json` (iki dosyayı karşılaştır), `git-diff <commit>` (o commit'teki envanterle güncel olanı karşılaştır).

## Sınırlar

- Anlık görüntü yalnızca **şemadır** (tablo, alan, tür, ilişki hedefi, formül metni, seçenek listesi). Satır verisi yoktur; gerçek ticari veri buraya girmez.
- Fark yalnızca **ne değiştiğini** gösterir. Nedeni ve kullanıcı onayı Baserow `SYS-004` ve `04_CHANGE_HISTORY/CHANGELOG.md` içindedir.
- Anlık görüntü, `INVENTORY.json`'un üretildiği andaki canlı şemadır. Baserow'da araya giren ama `INVENTORY.json` yenilenmeden yapılan değişiklikler görünmez; bu yüzden fark almadan önce şema yenilenmelidir.
- Boyut: her anlık görüntü yaklaşık 100 KB'tır. Eski dosyalar Git geçmişinde de durur; yer sorunu olursa en eskileri silmek güvenlidir (en son anlık görüntüyü silme, fark o noktadan hesaplanır).
