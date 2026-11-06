# Test Kontrol Listeleri

Her testin sonucunu **gerçek olarak** yaz. Yapılmayan testi "başarılı" işaretleme; başarısız testi gizleme. Sonuçlar SYS-006 (denetim/test) ve ilgili görevin `Test Sonucu` alanına yazılır (SYS yazma izni gerekir).

## T-01 Platform başlangıç testi (TASK-AI-BOOT-001)

Yeni sohbet; tek cümle: *"CIN EXIM Baserow'a (ID 263856) bağlan, SYS-009'u oku ve talimatları uygula."*

- [ ] SYS-009 ve sürümünü okuduğunu söylüyor
- [ ] SYS-001, SYS-010 son kayıt, SYS-008 açık görevler, SYS-005 kararlar okundu
- [ ] Erişemediği kaynağı belirtiyor, okumuş gibi davranmıyor
- [ ] DEMO oturumu (`DEMO-AI-HANDOVER-20261105-001`) ile gerçek oturumu ayırıyor
- [ ] Yazma izni olmadığını / onay gerektiğini söylüyor
- [ ] Hiçbir kaydı değiştirmiyor

## T-02 İkinci AI ile devir testi (TASK-AI-HANDOVER-002)

Önceki AI bir oturum kaydı bıraktıktan sonra **farklı bir AI** devralır.

- [ ] Doğru son oturumu buluyor
- [ ] "Devam ediyor" oturumunu doğrulama gerektiren olarak ele alıyor
- [ ] Önceki AI'nın beyanını canlı veriyle karşılaştırıyor (en az bir iddia)
- [ ] Açık görevleri ve yetki sınırlarını doğru raporluyor
- [ ] İşi tekrar yapmadan kaldığı yerden devam ediyor
- [ ] Kendi oturumunu SYS-010'a **tek kayıt** olarak yazıyor

## T-03 Yedek ve geri yükleme (TASK-SYS-002/003) — KI-05

Yalnızca **boş mimari + açıkça DEMO** kayıtlarla. Gerçek veri yok.

- [ ] Yedek paketi oluştu; manifesti var; gerçek veri içermediği kontrol edildi
- [ ] Bütünlük kontrolü (boyut/hash) kaydedildi
- [ ] Boş bir Baserow veritabanına kuruldu
- [ ] Tablo / alan / ilişki / formül sayıları kaynakla karşılaştırıldı; eksikler listelendi
- [ ] Sonuç SYS-007'ye yazıldı
- [ ] "Geri yüklenebilir" ifadesi **yalnızca bu test başarıyla bittikten sonra** kullanıldı

## T-04 Formül değişikliği

- [ ] Değişiklikten önce formül metni ve sonucu kaydedildi (`FORMULAS.md` + canlı)
- [ ] Bağımlı formüller/alanlar tarandı (formül metninde alan adı arama)
- [ ] **Geçici test satırları** ile en az: başarı dalı, her hata dalı, boş değer, uç değer
- [ ] Test satırları işaretlendi ve test sonunda silindi (yalnızca kendi açtıkların)
- [ ] Gerçek/demo kayıtların sonucu önce–sonra karşılaştırıldı
- [ ] `FORMULAS.md` yeniden üretildi; SYS-004 kaydı yazıldı

## T-05 Belge kanıt kontrolü (KI-01/02)

- [ ] Dosyası olmayan belge "tamamlandı" sayılmıyor
- [ ] Makine/sevkiyat/süreç formülleri belge **durumu ve dosyasını** da kontrol ediyor
- [ ] `OK` mesajı hukuki doğrulama anlamı taşımıyor (metin bunu söylüyor)
- [ ] İmzada görünen belgelerin gerçek durumu kullanıcıdan teyit edildi

## T-06 Tahsis çakışması (KI-06)

- [ ] Aynı makinede kesişen tarih aralıklı iki tahsis uyarı veriyor
- [ ] Ardışık (kesişmeyen) tarih aralıkları uyarı vermiyor
- [ ] `Durum` = `Sona Erdi` olan tahsis çakışma sayılmıyor
- [ ] BUS-001 örneği beklenen sonucu veriyor

## T-07 Finansman senaryoları (KI-03/04)

- [ ] Mevcut 60 satırlık geri ödeme planı **değişmedi**
- [ ] Her alternatifte planlanan anapara toplamı = kredi tutarı
- [ ] Erteleme döneminde anapara ödemesi 0; faiz davranışı kullanıcının seçtiği modele uygun
- [ ] Alternatif (a): 12 ay erteleme + 60 ay amortisman = 72 ay; (b): 12 ay erteleme dahil 60 ay = 48 ay amortisman
- [ ] DSCR tek tanımla hesaplanıyor; tanım belgelendi
- [ ] Tarihler gerçek term sheet ile doğrulanmadıysa DEMO olarak işaretli

## T-08 Şema belgesi yenileme (Git)

- [ ] `INVENTORY.json meta` sayıları canlı Baserow ile eşleşiyor
- [ ] `tools/build_schema_docs.py` hata/uyarı vermeden çalıştı (çıkış kodu 0)
- [ ] `RELATION_MAP.md` Mermaid diyagramları görüntüleniyor
- [ ] `CHANGELOG.md` ve `CURRENT_STATE.md` güncellendi
