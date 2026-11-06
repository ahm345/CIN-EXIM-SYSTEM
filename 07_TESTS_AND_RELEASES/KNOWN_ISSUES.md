# Bilinen Sorunlar

Her maddenin **kanıt düzeyi** belirtilir:

- **Canlı doğrulandı** — bu depo kurulurken (2026-11-06) Baserow'dan salt okunur okundu.
- **Şemadan** — `02_DATABASE_SCHEMA/` içindeki formül/alan metninden okundu.
- **SYS beyanı** — SYS-010/SYS-008 kaydındaki önceki AI beyanı; bu oturumda bağımsız doğrulanmadı. Doğrulanana kadar "iddia" say.

Öncelikler SYS-006 sınıflamasıyla aynıdır (P0 en kritik). Bu liste bir anlık görüntüdür; çözülen maddeyi silme, "Çözüldü" olarak işaretle ve tarih/kanıt yaz.

| Kod | Öncelik | Sorun | Kanıt | İlgili görev |
|---|---|---|---|---|
| KI-01 | P1 | **Kontrol formülleri dosya varlığını denetlemiyor.** Makineler `Varlık Yaşam Döngüsü Kontrolü`, devir belgesi **bağlantısı** varsa `OK – kayıtlı kanıtlar tamam; hukuki doğrulama ayrıca gerekli` döndürür; belgede dosya olup olmadığına bakmaz. BUS-001 bu mesajı alıyor, ama bağlı `Devir tutanağı` (Belgeler ID 28) durumu `Eksik` ve dosyası yok. | Canlı doğrulandı (BUS-001, Belgeler 28); formül Şemadan | TASK-ASSET-001, TASK-ASSET-003 |
| KI-02 | P1 | **Belgeler tablosunda dosya eki yok.** 52 kaydın 52'sinde `Dosya` boş; `Dosya Kontrolü` = `DOSYA BEKLENİYOR`. Üç belge `İmzada` durumunda ve dosyasız. | Canlı doğrulandı: Belgeler 1 ve 28; geri kalanı SYS beyanı (SYS-010 `CLAUDE-20261106-002`) | TASK-ASSET-003 |
| KI-03 | **P0** | **DSCR tanımı tutarsız.** `Kira ve Tahsilat Planı` ve `Gelir Gider Dengesi` DSCR'yi **CFADS ÷ borç servisi** hesaplar; `Senaryo Gelir Gider Akışı` **net nakit akışı ÷ borç servisi** hesaplar. Tek tanım seçilmeli (öneri: CFADS tabanlı). Karar kullanıcıda. | Şemadan | TASK-FIN-001 (DSCR yaklaşımı kullanıcı kararı) |
| KI-04 | **P0** | **Seller's Credit 12 ay anapara erteleme alternatifleri yok.** Mevcut 60 aylık plan erteleme içermiyor. Altı senaryo tablosu boş (`Senaryolar`: 0 satır). Şema erteleme alanlarını taşıyabilir (`Anapara Erteleme (Ay)`, `Faiz Erteleme (Ay)`, `Erteleme Faizi`). Vade tanımı ve erteleme faizi modeli kullanıcı kararıdır. | Canlı doğrulandı (Senaryolar 0 satır); plan ayrıntısı SYS beyanı | TASK-FIN-001, TASK-FIN-002 |
| KI-05 | **P0** | **Yedek ve geri yükleme doğrulanmadı.** `SYS-007` boş (0 satır). `BKP-SYS-DEMO-V0.1` oluşturulmadı. `baserow yedek` (ID 615555) aynı çalışma alanında bir kopya; içerik/bütünlük doğrulanmadı, gerçek veri içerebilir, satır havuzunu tüketiyor. Baserow dışı (export) kopya kaydı yok. Git bunun yerine geçmez. | Canlı doğrulandı (SYS-007: 0 satır); yedek ayrıntısı SYS-001 ve SYS-010 beyanları | TASK-SYS-001/002/003 |
| KI-06 | P1 | **Tahsis tarih çakışması yakalanmıyor.** BUS-001 iki tahsise bağlı: `BUS-001 → TOO-1` ve `BUS-001 → TOO-2 (çakışma testi)`. `Operasyon Kontrolü` yalnızca `Durum = Aktif` sayısına bakar, tarih aralığı çakışmasına bakmaz. Tahsis durumlarının güncel değeri bu oturumda doğrulanmadı; SYS beyanına göre biri Aktif, diğeri Planlandı. | Tahsis adları canlı doğrulandı; durumlar SYS beyanı; formül Şemadan | – (görev açılmamış) |
| KI-07 | P0 | **SYS-009 hiçbir AI platformunda okuma testinden geçmedi.** Baserow'daki protokol kendiliğinden okunmaz; her platformun kalıcı talimatına başlangıç metni konmalı. İkinci AI ile devir testi yapılmadı. | Canlı doğrulandı (SYS-009 Durum alanı) | TASK-AI-BOOT-001, TASK-AI-HANDOVER-002 |
| KI-08 | P1 | **Otomatik oturum kaydı yok.** Oturum başlangıç/olay/kapanış kayıtları AI'nın disiplinine bağlıdır; tetikleyici kurulu değil. | SYS beyanı | TASK-AI-AUTOLOG-003 |
| KI-09 | P2 | **Görevlerde hedef tarih yok.** SYS-008'de 15 görevin hiçbirinde `Hedef Tarih` dolu değil (örnek okunan satırlarda boş). Hedef tarihleri kullanıcı belirler. | Canlı doğrulandı (örnek: 1 satır); geri kalanı SYS beyanı | TASK-SYS-006 |
| KI-10 | P2 | **Zaman damgaları tutarsız** (SYS-004/010/011'de 09:00Z, 10:22Z, 07:22Z, 00:00Z gibi). Araç saati olmadan yazılmış kayıtlar var. Öneri R-12 (`BUSINESS_RULES.md`) onay bekliyor. | SYS beyanı | TASK-SYS-007 |
| KI-11 | P2 | **Kullanıcının belirlemediği 2027 tarihleri** Tahsisler, Sigortalar, Sevkiyatlar, Hizmet Kayıtları, Giderler ve Vergiler, İmalat ve Tedarik, Teminatlar'da duruyor. Kullanıcı seçecek: sil / "demo varsayımı" etiketle / olduğu gibi bırak. | SYS beyanı (SYS-010 `CLAUDE-20261106-001`) | – |
| KI-12 | P1 | **Sigorta kapsamı.** SYS beyanına göre 57 makinenin 55'inde poliçe yok. (Not: `Operasyon Kontrolü` poliçe yoksa `SİGORTA YOK / SÜRESİ DOLMUŞ` döndürür.) | SYS beyanı | – |
| KI-13 | P2 | **Projeler → `Fatura Alıcısı` ve `Gümrük Beyan Sahibi`** hiçbir firmaya bağlı görünmüyor (ters bağlantılar boş). | SYS beyanı | – |
| KI-14 | P1 | **Hukuk görüşü bekleniyor:** Kazakistan geri alma / zilyetlik / temerrüt / fesih / yeniden tahsis süreci yerel hukuk danışmanıyla doğrulanmadı. Süreç Adımları 41–48 DEMO senaryodur. | Canlı doğrulandı (BUS-001 süreç adı "DEMO SENARYO…"); görev SYS-008 | TASK-ASSET-002 (P0) |
| KI-15 | P3 | **SYS-010 ↔ SYS-011 bağı eksik** bazı kayıtlarda (ör. GPT6 olayları bir oturuma bağlı değil). | SYS beyanı | – |
| KI-16 | P2 | **Baserow satır limiti.** Ücretsiz planda 3.000 satır tüm çalışma alanı için ortak; yedek kopya aynı havuzda. | SYS beyanı (SYS-010 `CLAUDE-20261105-002`) | TASK-SYS-001 |
| KI-17 | P2 | **Satır geçmişi kısa** (ücretsiz plan, yaklaşık 14 gün beyanı); silinen alan/satırların çöp kutusundan geri alınabilirliği denenmedi. | SYS beyanı | TASK-SYS-005 |
| KI-18 | P3 | **SYS ↔ Git bağ alanı yok.** SYS-002/004'te `Git Referansı` alanı yok; geçici yöntem `SYS_GIT_LINKING.md` bölüm 4. Alan eklemek şema değişikliğidir (onay gerekir). | Şemadan | – |

## Genel uyarılar

- **Önceki AI kayıtları, yazan AI'nın beyanıdır**; bağımsız doğrulama için Baserow satır geçmişine bakın (kullanıcı yapabilir).
- Aşağıdaki sayılar bu depo kurulurken canlı okundu: 41 tablo, SYS-010'da 7 oturum, SYS-008'de 15 görev, SYS-009 v1.4, Makineler 57 satır, Belgeler 52 satır, SYS-007 ve Senaryolar boş.
- Sistem **üretim kullanımına hazır değildir**. En kritik üç konu: (1) yedek ve gerçek geri yükleme, (2) varlık/belge güvenilirliği (KI-01/02), (3) finansman senaryoları ve DSCR (KI-03/04).
