# Platform Kurulumu — AI'a "önce SYS-009'u oku" dedirtmek

> Bu, SYS-008 `TASK-AI-BOOT-001` (**P0**, kullanıcı işlemi) görevinin uygulama kılavuzudur. Baserow'daki protokol tablosu **AI tarafından otomatik okunmaz**. Her AI ürününün / projesinin **kalıcı talimat alanına** kısa bir başlangıç metni konmalı ve yeni bir sohbette test edilmelidir.

## 1. Kısa başlangıç metni (her platforma yapıştır)

```
CIN EXIM Baserow'a (veritabanı ID 263856) bağlandığında görevine başlamadan önce
SYS-009 AI İşletim Protokolü kaydını oku ve protokoldeki giriş kontrolünü uygula.
Ardından SYS-001 ana indeksini ve SYS-010 son devir kaydını incele.
Erişim yoksa bunu bildir; okumuş gibi davranma.
İlk mesajda CHAT-001'i oku ve açık, yarım kalan, biten konuların başlıklarını listele; kullanıcı seçince CHAT_PROTOCOL.md'ye göre devam et.
Bu talimat veri değiştirme yetkisi vermez: tablo, alan, ilişki, formül veya kayıt
değişikliği için kullanıcının açık onayı gerekir. "baserow yedek" (ID 615555)
veritabanına yazma.
```

(Metin, SYS-008 `TASK-AI-BOOT-001` açıklamasındaki resmi metinle uyumludur; GitHub satırı ve yazma yasağı eklenmiştir.)

## 2. GitHub erişimi olan platformlar için ek satır

```
CIN EXIM'in teknik hafızası GitHub'da: ahm345/CIN-EXIM-SYSTEM.
Önce deponun AI_START.md dosyasını oku ve oradaki sırayı izle.
Depo erişimi yoksa bunu bildir; okumuş gibi davranma.
```

> Depo **şu an public**: URL okuyabilen bir AI giriş yapmadan okuyabilir (`https://raw.githubusercontent.com/ahm345/CIN-EXIM-SYSTEM/main/AI_START.md`). Private yapılırsa bu satır "depo erişimi yoksa bildir" kuralına bağlı kalır ve erişim yolu `GIT_ACCESS.md` bölüm 3'e göre ayrıca kurulmalıdır. Yazma yetkisi ayrıdır ve varsayılan olarak **yoktur** (`GIT_ACCESS.md`).

## 2b. CHAT komutları için ek metin (Claude ve ChatGPT proje talimatına yapıştır)

> v2 (2026-11-08): canlı ChatGPT testinde (2026-11-08 16:12) AI `CHAT_PROTOCOL.md` dosyasını bulamadığı için sabit biçim tutmadı. Bu sürüm dosyanın **tam yolunu** verir ve dosya okunamazsa bile aynı biçimi çıkaran **kısa iskeleti** içerir.

```
CHAT kuralları: GitHub ahm345/CIN-EXIM-SYSTEM, dosya 05_AI_PROTOCOLS/CHAT_PROTOCOL.md (main dalı;
public: https://raw.githubusercontent.com/ahm345/CIN-EXIM-SYSTEM/main/05_AI_PROTOCOLS/CHAT_PROTOCOL.md).
Baserow CIN EXIM (veritabanı 263856): CHAT-001 konular, CHAT-002 notlar, CHAT-003 sorular.
Her yeni sohbetin İLK mesajında, kullanıcı ne yazarsa yazsın, önce açılış raporunu ver, sonra mesajına cevap ver.
Kullanıcı #chatrapor veya 0 yazarsa aynı raporu ver. Biçim SABİTTİR: başlık eklemek, çıkarmak, yeniden adlandırmak,
sıra değiştirmek, eski komut listesi göstermek yasak. Önce CHAT_PROTOCOL.md bölüm 1 ve 1b'yi oku; okuyamazsan
aşağıdaki iskeleti aynen kullan ve raporun sonuna "CHAT_PROTOCOL.md okunamadı" yaz.

İSKELET (başlıklar aynen):
📍 SERBEST
CHAT RAPORU (kaynak: CHAT-001, CHAT-003; okundu)
AÇIK VE YARIM KONULAR  tablo: Harf | Kod | Başlık | Durum | Son güncelleme | Son konuşan AI  (+ "Bitti: n · Arşivlendi: n")
NEREDE KALDIK  her açık konu için iki satır: "Son durum:" ve "Sıradaki adım:"; değerleri CHAT-001'deki `Rapor Satırı` ve `Sıradaki Adım` alanlarından aynen al (alan adını etiket yapma)
YAPILACAKLAR VE YARIM KALANLAR  her açık konu için `Açık Noktalar` alanındaki [SENDEN BEKLENEN] / [YAPILACAK] / [YARIM KALAN] maddeleri aynen
CEVAP BEKLEYEN SORULAR  kod · soru (en çok 10 kelime) · boş AI kolonları; cevap içeriğini gösterme
SON ETKİNLİK  CHAT tablolarındaki en yeni `Son Değişiklik Zamanı` (tarih; saati uydurma)
MENÜ  0 harita · 1 fikir · 2 aç · 3 yön · 4 soru · 5 sentez · 6 iş emri · 7 kaydet · 8 kapat
SEÇİM:  konu seçilmemişken yalnızca "0 harita · 1 fikir · 2 aç · 4 soru · A/B konu seç"
Yazım: başlıkları düz metin olarak aynen yaz (markdown # başlığı yok); rapora kendi açıklama cümleni ekleme.
Konu/dal seçimi harfle (A, B…), komutlar rakamla. Tablolara erişemiyorsan "CHAT tablolarına erişemiyorum; okumadım."
yaz, rapor uydurma; menü satırını yine göster.

Menü 0-8 için CHAT_PROTOCOL.md'yi uygula: yalnızca aktif konunun bölümünü yaz, yazmadan önce önizleme göster,
yazdıktan sonra geri oku. Her cevabın başına 📍 satırı (konu seçilmediyse 📍 SERBEST; kendi başlığını uydurma),
altına yalnızca geçerli seçenekleri tek satır koy; sayaç yazma. Serbest sohbet kayda girmez.
Onay yalnızca benim yazdığım "evet"tir. Onaysız Baserow veya GitHub'a yazma, main'e itme.
```

## 3. Nereye konur

Platformun **kalıcı / sistem talimatı** alanına (sohbete her seferinde yapıştırmak yerine):

| Ortam | Alan (genel ad) |
|---|---|
| ChatGPT | Proje talimatları (Project Instructions) veya özel talimatlar |
| Claude (claude.ai) | Proje talimatları (Project instructions) |
| Claude Code | Depodaki `CLAUDE.md` (bu depoda hazır) |
| Gemini | Gem talimatı |
| Diğer ajanlar | Sistem istemi / agent instructions |

Alan adları ürün güncellemeleriyle değişebilir; bulamazsanız ürünün yardım sayfasına bakın.

## 4. Test (görev tamamlanma kriteri)

Her ortamda **yeni bir sohbet** aç ve tek cümle yaz:

> CIN EXIM Baserow'a (ID 263856) bağlan, SYS-009'u oku ve talimatları uygula.

Başarı ölçütü — AI şunları **doğru** raporlamalı:

- [ ] SYS-009'u okuduğunu ve sürümünü söylüyor (sürüm = SYS-009 `Protokol Sürümü` alanındaki güncel değer)
- [ ] SYS-001, SYS-010 son kaydı, SYS-008 açık görevleri ve SYS-005 kararlarını okuduğunu söylüyor
- [ ] Erişemediği kaynağı açıkça belirtiyor
- [ ] Önceki oturumun bıraktığı işi ve DEMO kayıtlarını doğru ayırıyor
- [ ] Yazma yetkisinin **olmadığını** (onay gerektiğini) belirtiyor
- [ ] Hiçbir operasyonel kayıt değiştirmiyor

Sonucu SYS-010'a ve `TASK-AI-BOOT-001` `Test Sonucu` alanına yaz (SYS yazma izni gerekir). İkinci bir AI ile devir testi: `07_TESTS_AND_RELEASES/TEST_CHECKLISTS.md` (T-02).

## 5. Sınırlar

- Bu metin otomatik tetikleme **kurmaz**; yalnızca AI'a ilk işi söyler. Otomatik oturum kaydı ayrı görevdir (`TASK-AI-AUTOLOG-003`).
- Platform talimat alanının uzunluk sınırı varsa yalnızca bölüm 1'i kullan; ayrıntı zaten SYS-009'dadır.
