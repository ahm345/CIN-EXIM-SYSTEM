# Fikir / istek tahtası

> **GEÇERSİZ — yerini `CHAT_PROTOCOL.md` ve CHAT-001/002/003 tabloları aldı (DEC-SYS-004). Tarihsel kayıt olarak durur; SYS-012/013 oluşturulmayacak.**
>
> ~~Durum: TASLAK — Baserow tabloları henüz oluşturulmadı.~~ Tablo yapısı (bölüm 4) kullanıcı onayına sunulmuştur. Onaya kadar işaretler çalışır ama kayıt yerine **hazır blok** üretilir (bölüm 3).

Amaç: kullanıcının sohbette aklına gelen fikir ve istekler **çöp sohbetten çıkıp tek yerde** toplanır; her fikrin kendi başlığı altında temiz bir konuşma geçmişi olur; hangi AI ne söyledi görünür; yeni gelen AI kaldığı yerden devam eder.

## 1. İşaretler (kullanıcı sohbette yazar)

| İşaret | AI ne yapar |
|---|---|
| `#fikir …` | **Hemen** tahtaya yeni kayıt açar (tür=Fikir), kullanıcının sözünü aynen saklar, kodu söyler, sonra fikri kullanıcıyla geliştirir |
| `#istek …` / `#sorun …` | Aynı, tür=İstek / Sorun |
| `>>karar …` | Kullanıcının kararını ilgili fikre `Karar` notu olarak ekler (kalıcı karar ise SYS-005 için ayrıca onay ister) |
| `#devam` | Başlıkları listeler (bölüm 2) |
| `#sentez` | Fikrin tüm notlarını okur, `Güncel Özet`i ve `Açık Noktalar`ı yeniden yazar; **uygulamaz** |
| `#yap` | Kullanıcı onayı: fikir `Uygulanıyor` olur → `FEATURE_REQUEST_WORKFLOW.md` → test → `Bitti` |

İşaretten sonraki yazı kullanıcının sözüdür; AI onu **olduğu gibi** `Kullanıcı Sözü` notuna koyar, kendi yorumunu ayrı not olarak yazar.

## 2. İlk açılışta (her AI, her yeni sohbet)

1. Tahtayı okur (yalnızca başlık, tür, durum, son etkinlik).
2. Kullanıcıya **başlık listesi** gösterir, üç grupta: **Açık** (Yeni / Tartışılıyor / Olgunlaştı / Uygulanıyor / Test), **Yarım kaldı**, **Bitti**.
3. Kullanıcı birini seçer. AI o fikrin **tüm notlarını** (kim ne dedi) okur, `Güncel Özet` ve `Açık Noktalar` ile konuşmaya kaldığı yerden devam eder.
4. Konuşma sonunda: yeni görüş/karar/soru notlarını ekler, `Güncel Özet`i günceller, tamamlanmayanı `Açık Noktalar`a yazar. Durum değişikliğini kullanıcıya söyler.

Sohbetin ham metni tahtaya taşınmaz. Tahtada yalnızca **temizlenmiş** kayıt durur: kullanıcının sözü aynen, AI'nın görüşü kısa ve imzalı, özet güncel. Selamlaşma, deneme-yanılma ve tekrar yazılmaz.

## 3. Yazma yoksa (tablolar yok / AI yazamıyor)

AI yazmış gibi davranmaz; hazır blok verir, kullanıcı yapıştırır:

```
KOD: REQ-<AI kısa adı>-<tarih>-<n>   (saat yazma)
TÜR: Fikir | İstek | Sorun
BAŞLIK: <en çok 10 kelime>
KULLANICI SÖZÜ: <aynen>
GÜNCEL ÖZET: <3-5 cümle>
AÇIK NOKTALAR: <varsa>
KAYNAK SOHBET: <AI adı / sohbet başlığı>
```

AI hiçbir sohbeti kendiliğinden izlemez; her AI yalnızca kendisiyle konuşulan sohbette işaret görür. İlk açılış kontrolü için platformun kalıcı talimatına satır eklenir (`PLATFORM_SETUP.md`).

## 4. Önerilen Baserow tabloları (ONAY BEKLİYOR)

### SYS-012 İstekler (her fikir bir satır)

| Alan | Tür | Not |
|---|---|---|
| İstek Kodu | metin (birincil) | `REQ-…` |
| Başlık | metin | |
| Tür | seçmeli | Fikir / İstek / Sorun |
| Durum | seçmeli | Yeni / Tartışılıyor / Olgunlaştı / Uygulanıyor / Test / Bitti / Yarım kaldı / Reddedildi |
| Kullanıcı Sözü | uzun metin | ilk söz, aynen |
| Güncel Özet | uzun metin | temiz özet; kim, ne zaman güncelledi sonuna yazılır |
| Açık Noktalar | uzun metin | tamamlanmayanlar, cevap bekleyen sorular |
| Son Konuşan AI | metin | |
| Son Etkinlik | tarih | saat aracından; yoksa boş |
| Kaynak Sohbet | metin | |
| İlgili Tablolar | metin | |
| Kullanıcı Kararı | metin | |
| İlgili Görev | ilişki → SYS-008 | onaylanınca |
| Notlar | ters ilişki ← SYS-013 | |

### SYS-013 İstek Notları (konuşmanın temiz kaydı; her not ayrı satır, kimse başkasınınkini değiştirmez)

| Alan | Tür | Not |
|---|---|---|
| Not Kodu | metin (birincil) | `NOT-…` |
| İstek | ilişki → SYS-012 | |
| Yazan | metin | Kullanıcı veya AI / model |
| Not Türü | seçmeli | Kullanıcı sözü / Görüş / Soru / Öneri / Sentez / Karar / Test sonucu |
| İçerik | uzun metin | |
| Tarih | tarih | |

## 5. Akış

Yeni → Tartışılıyor (görüş ve sorular birikir) → `#sentez` → Olgunlaştı → kullanıcı `#yap` → Uygulanıyor (SYS-008 görevi; Baserow değişikliği için adım adım onay) → Test → Bitti. Yarıda kalan her fikir `Yarım kaldı` olur ve `Açık Noktalar` dolu kalır; kullanıcı onayı olmadan kapatılmaz.

Tartışma **eşzamansızdır**: AI'lar birbirine kendiliğinden yazmaz; kullanıcı AI'yı açıp bir fikri seçtiğinde o AI tüm notları okur ve kendi notunu ekler. Zamanlanmış otomasyon şu an yoktur.
