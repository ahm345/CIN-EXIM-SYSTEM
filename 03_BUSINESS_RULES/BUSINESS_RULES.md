# İş Kuralları ve Hesap Mantıkları

Bu belge, sistemin **şemasında veya SYS kayıtlarında kanıtı bulunan** kuralları listeler. Her kuralın bir **durumu** vardır:

- **Formülde var** — Baserow formülünde uygulanıyor (metin: `02_DATABASE_SCHEMA/FORMULAS.md`).
- **Kural (SYS)** — SYS-009 / SYS-005 gibi kayıtlarda kullanıcı onaylı kural olarak geçiyor.
- **Karar bekliyor** — kullanıcı kararı gerekiyor; AI bunu uygulamaz.
- **Öneri** — bir AI önerisi; kullanıcı onaylamadı.

Yeni kural eklerken: durumu, kaynağı (tablo/alan/kayıt kodu) ve tarihi yaz. Kaynağı olmayan kural ekleme.

| Kod | Kural | Durum | Kaynak |
|---|---|---|---|
| R-01 | **DEMO / REFERENCE / REAL ayrımı.** `Gerçek Veri` (boolean) alanı sözleşme, tahsis, sigorta, makine, belge ve senaryo tablolarında bulunur. Gerçek ticari veri demo yedeğine alınmaz. | Kural (SYS) | SYS-009 v1.4; SYS-001 Yedekleme Politikası |
| R-02 | **Kontrol formülünün `OK` sonucu hukuki doğrulama değildir.** Makineler `Varlık Yaşam Döngüsü Kontrolü` başarı mesajı "kayıtlı kanıtlar tamam; hukuki doğrulama ayrıca gerekli" der. Sözleşmeler `Hukuki Doğrulama` alanı ayrı tutulur. | Formülde var | Makineler, Sözleşmeler formülleri |
| R-03 | **Tek aktif tahsis.** Bir makinede `Durumu = Aktif` tahsis sayısı 1'i aşarsa `Operasyon Kontrolü` "ÇAKIŞMA" döndürür. Not: kontrol yalnızca durumu sayar; **tarih aralığı çakışmasını yakalamaz** (KI-06). | Formülde var (sınırlı) | Makineler `Operasyon Kontrolü` |
| R-04 | **Operasyon uygunluğu:** hukuki malik, (aktif tahsis varsa) fiili kullanıcı ve geçerli sigorta olmadan makine `OK` olamaz. | Formülde var | Makineler `Operasyon Kontrolü` |
| R-05 | **Belge kanıtı = dosya ekli + durum `Tamam`.** Belgeler `Dosya Kontrolü` dosya yoksa `DOSYA BEKLENİYOR` veya `HATA: Tamam ama dosya yok` döndürür. Bağlantı kaydının varlığı kanıt sayılmaz. Makine/sevkiyat/süreç formülleri bu ilkeye henüz uymuyor (KI-01). | Formülde var (Belgeler); uygulanmıyor (Makineler) | Belgeler `Dosya Kontrolü`, `Gerekli Eksik/Tamam` |
| R-06 | **Alt kiralama izni.** Sözleşme türü `Alt Kiralama` ise ana sözleşmede `Alt Kiralama / Yeniden Satış İzni Var` işaretli olmalıdır; aksi halde uyarı. | Formülde var | Sözleşmeler `Alt Kiralama Kontrolü` |
| R-07 | **Sigorta geçerliliği tarihe bağlıdır** (bitiş geçmişte → süresi doldu; başlangıç gelecekte → henüz başlamadı). Teminat kapsamı ayrıca kontrol edilir. | Formülde var | Sigortalar `Durum`, `Sigorta Kontrolü` |
| R-08 | **Anapara mutabakatı.** Geri ödeme planındaki anapara toplamı kredi tutarıyla eşleşmelidir. | Formülde var | Krediler `Anapara Mutabakatı`, `Planlanan Anapara Toplamı USD` |
| R-09 | **DSCR tanımı.** Kira ve Tahsilat Planı ile Gelir Gider Dengesi DSCR'yi **CFADS ÷ borç servisi** olarak hesaplar. Senaryo Gelir Gider Akışı ise **net nakit akışı ÷ borç servisi** hesaplar. Tek tanım seçilmeli; öneri CFADS tabanlıdır. | **Karar bekliyor** (kullanıcı DSCR yaklaşımını belirleyecek) | KI-03; SYS-010 `CLAUDE-20261106-001` |
| R-10 | **Senaryo = mevcut planı bozmadan alternatif.** 12 ay anapara ertelemesi alternatifleri yeni senaryo olarak kurulur; mevcut 60 satırlık geri ödeme planı silinmez ve değiştirilmez. İki alternatif: (a) 12 ay erteleme + 60 ay amortisman = 72 ay toplam; (b) 12 ay erteleme dahil 60 ay toplam = 48 ay amortisman. Toplam anapara kredi tutarıyla eşleşmelidir. | Kural (SYS) | SYS-008 `TASK-FIN-001` |
| R-11 | **Erteleme döneminde faiz modeli** (aylık ödenir / anaparaya eklenir / vade sonunda ödenir) ve **vade tanımı** kullanıcı kararıdır. Şema her üç seçeneği taşıyabilir (`Erteleme Faizi`). Tarihler gerçek term sheet ile doğrulanana kadar demo sayılır. | **Karar bekliyor** | SYS-008 `TASK-FIN-001`, `TASK-FIN-002` |
| R-12 | **Zaman damgası standardı (öneri):** saat biliniyorsa UTC; saat aracı yoksa tarih+saat alanı boş bırakılır; `00:00:00Z` "saat yok" demektir; geçmiş kayıtlar geriye dönük düzeltilmez. SYS-009'a işlenmedi. | Öneri | SYS-008 `TASK-SYS-007` |
| R-13 | **Hukuk görüşü gerektiren alanlar.** Kazakistan geri alma, zilyetlik, temerrüt, fesih ve yeniden tahsis süreci yerel hukuk danışmanı görüşüyle doğrulanmadan hukuken geçerli kabul edilmez. | Kural (SYS) | SYS-008 `TASK-ASSET-002` (P0) |
| R-14 | **Tarih kararları kullanıcıdadır.** Kullanıcının belirlemediği (ör. 2027) tarihler silinmez, etiketlenmez veya "gerçek" sayılmaz; seçenekler kullanıcıya sunulur. | Karar bekliyor | SYS-010 `CLAUDE-20261106-001` |

## Sonuç değerleri ve anlamları (formül çıktıları)

| Çıktı | Anlam |
|---|---|
| `OK` | Kayıtlı bağlantı/tarih koşulları tamam. **Dosya, hukuki doğrulama veya gerçek veri anlamına gelmez.** |
| `DEMO – HUKUKİ İNCELEME GEREKLİ` | Sözleşme demo; hukuki doğrulama yapılmamış |
| `DOSYA BEKLENİYOR` | Belge kaydı var, dosya ekli değil |
| `HUKUKİ MALİK EKSİK` | Makinede hukuki malik bağlantısı yok |
| `ÇAKIŞMA: birden fazla aktif tahsis` | Aynı makinede 1'den fazla aktif tahsis |
