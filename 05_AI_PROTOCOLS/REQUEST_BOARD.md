# İstek tahtası ve işaretler

> **Durum: TASLAK — Baserow tabloları henüz oluşturulmadı.** Tablo yapısı (bölüm 3) kullanıcı onayına sunulmuştur. Onaya kadar işaretler çalışır ama kayıt yerine **hazır blok** üretilir (bölüm 2).

Amaç: kullanıcının sohbetlerde söylediği istek ve fikirler kaybolmasın, tek yerde toplansın; farklı AI'lar görüşünü ayrı satıra yazsın, sentez yapılsın, onaylananlar mevcut akışa (`FEATURE_REQUEST_WORKFLOW.md`) girsin.

## 1. İşaretler (kullanıcı sohbette yazar)

| İşaret | Anlamı | AI ne yapar |
|---|---|---|
| `#fikir …` | Henüz karar değil, düşünülecek fikir | Kayıt açar, tür=Fikir |
| `#istek …` | Yapılmasını istediği şey | Kayıt açar, tür=İstek |
| `#sorun …` | Bir şey yanlış / eksik | Kayıt açar, tür=Sorun |
| `>>karar …` | Kullanıcı karar verdi | Kayıt açar veya mevcut isteğe bağlar; kalıcı karar ise SYS-005 için ayrı onay ister |
| `#tartış REQ-…` | Bu istek için görüşünü yaz | AI isteği ve diğer görüşleri okur, kendi görüşünü ekler |
| `#sentez REQ-…` | Görüşleri birleştir | AI tüm görüşleri okur, tek öneri yazar; **uygulamaz** |

İşaretin sonrası kullanıcının kendi sözleridir; AI bunu **yeniden yazmadan, çarpıtmadan** `Kullanıcı Metni` alanına koyar, kendi yorumunu ayrı alana yazar.

## 2. AI işareti görünce ne yapar

1. Baserow'a yazabiliyorsa **ve** tablolar onaylı/oluşturulmuşsa: `İstekler` tablosuna satır açar (yalnızca yeni satır; mevcut satırı değiştirmez), kodu ve ID'yi kullanıcıya bildirir.
2. Yazamıyorsa (veya tablo yoksa): aşağıdaki **hazır bloğu** sohbette verir; kullanıcı yapıştırır. Yazmış gibi davranmaz.
3. Onay almadan hiçbir Baserow şeması/operasyonel veri değişmez. İstek kaydı açmak onay yerine geçmez.

Hazır blok:

```
KOD: REQ-<AI kısa adı>-<tarih>-<n>   (saat yazma)
TÜR: Fikir | İstek | Sorun | Karar
BAŞLIK: <en çok 10 kelime>
KULLANICI METNİ: <kullanıcının sözleri, olduğu gibi>
KAYNAK SOHBET: <AI adı / sohbet başlığı>
İLGİLİ TABLOLAR: <bilinen varsa, yoksa Bilinmiyor>
```

AI hiçbir sohbeti **otomatik izlemez**. İşaret yalnızca o an konuşulan AI için geçerlidir; başka sohbetlerdeki işaretleri başka AI'lar görmez. Bir AI açıldığında önce açık istekleri okumalıdır (`#tartış` ile veya başlangıçta).

## 3. Önerilen Baserow tabloları (ONAY BEKLİYOR)

### SYS-012 İstekler

| Alan | Tür | Not |
|---|---|---|
| İstek Kodu | metin (birincil) | `REQ-…` |
| Başlık | metin | |
| Tür | seçmeli | Fikir / İstek / Sorun / Karar |
| Kullanıcı Metni | uzun metin | aynen |
| Kaynak Sohbet | metin | AI ve sohbet |
| Durum | seçmeli | Yeni / Tartışılıyor / Sentez / Onay bekliyor / Uygulanıyor / Bitti / Reddedildi |
| İlgili Tablolar | metin | |
| Sentez | uzun metin | tek öneri; kim yazdı belirtilir |
| Kullanıcı Kararı | metin | onay/ret ve tarih (saat uydurma) |
| İlgili Görev | ilişki → SYS-008 | onaylanınca açılır |
| Görüşler | ters ilişki ← SYS-013 | |

### SYS-013 Görüşler (her AI ayrı satır; kimse başkasının satırını değiştirmez)

| Alan | Tür | Not |
|---|---|---|
| Görüş Kodu | metin (birincil) | `OPN-…` |
| İstek | ilişki → SYS-012 | |
| AI / Model | metin | |
| Görüş | uzun metin | |
| Öneri | uzun metin | |
| Riskler ve Etki | uzun metin | `IMPACT.md` kullanılır |
| Kaynak | metin | `08_RESEARCH/R-…` veya URL |

## 4. Akış

Yeni → (kullanıcı `#tartış` der) Tartışılıyor → her AI kendi `Görüşler` satırını ekler → (`#sentez`) Sentez → kullanıcı onaylar → Uygulanıyor (SYS-008 görevi açılır; `FEATURE_REQUEST_WORKFLOW.md` 4.–10. adımlar) → Bitti.

Tartışma **eşzamansızdır**: AI'lar birbirine kendiliğinden yazmaz; kullanıcı AI'yı açıp "açık istekleri oku" dediğinde görüş eklenir. Zamanlanmış otomasyon şu an yoktur.
