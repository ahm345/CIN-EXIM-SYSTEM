# Bilgi Eksikliği Yüzünden Duran / Yarım Kalan İşler

> **Anlık görüntü, kaynak değildir.** Tarih: 2026-11-06. Kaynak: Baserow SYS-008 (15 görev), `07_TESTS_AND_RELEASES/KNOWN_ISSUES.md`, SYS-010 oturum kayıtları. Kayıtların çoğu önceki AI beyanıdır; bağımsız doğrulanmadı. Gruplar: **A** yalnızca kullanıcı bilir · **B** dış kaynaktan araştırılabilir · **C** AI kendi yapabilir (`INFO_GAP_PROTOCOL.md`).

| # | İş / bulgu | Öncelik | Eksik bilgi | Grup |
|---|---|---|---|---|
| 1 | TASK-FIN-001 / KI-04 Seller's Credit 12 ay erteleme + 5 yıl vade | P0 | Kullandırım tarihi; erteleme faizi (ödenir / anaparaya eklenir / vade sonunda); "5 yıl" erteleme dahil mi; komisyon, balloon; şema yetkisi (yeni finansman tabloları) | A |
| 1b | (aynı iş) piyasa uygulaması | P0 | Grace faizi, vade ifadesi, gün sayımı, komisyon yansıması | B |
| 2 | KI-03 DSCR tanımı tutarsız (CFADS÷BS ve net nakit÷BS) | P0 | Hangi tanım geçerli (finansör term sheet'i), vergi/rezerv kapsamı | A |
| 2b | (aynı) finansör DSCR tanımı yaygın pratik | P0 | Pay/payda, erteleme döneminde ölçüm, taahhüt eşiği | B |
| 2c | (aynı) üç tablodaki formül farkının çıkarılması | P0 | – | C |
| 3 | TASK-FIN-002 Kullandırım ve ödeme tarihlerini doğrulama | P1 | Eximbank/SINOMACH/Bridge term sheet ve sözleşmeler | A |
| 4 | TASK-ASSET-002 / KI-14 Kazakistan geri alma, zilyetlik, temerrüt | P0 | Mevzuat ve süreç; sonra yerel avukat teyidi | B (+A: avukat) |
| 5 | TASK-ASSET-001 / KI-01 Varlık yaşam döngüsü formülü | P1 | Kullanıcı doğrulaması | A |
| 6 | TASK-ASSET-003 Varlık olayları kanıt belge kontrolü | P1 | ASSET-001 sonrası; belge dosyaları | A + C |
| 7 | KI-02 Belgeler 52/52 dosyasız; 3 belge "İmzada" (ID 1, 3, 30) | P1 | Gerçek belge dosyaları; imza durumu | A |
| 8 | KI-11 Kullanıcının belirlemediği 2027 tarihleri | P2 | Sil / "demo varsayımı" etiketle / bırak | A |
| 9 | KI-12 Sigorta: 57 makinenin 55'i poliçesiz (beyan) | P1 | Gerçek poliçeler; sayının doğrulanması | A + C |
| 10 | KI-13 Projeler: Fatura Alıcısı, Gümrük Beyan Sahibi bağsız | P2 | Hangi firma | A |
| 11 | KI-06 Tahsis tarih çakışması yakalanmıyor | P1 | İş kuralı: aynı makine aynı dönemde iki aktif tahsis olabilir mi; formül değişikliği onayı | A (+C öneri) |
| 12 | KI-05 / TASK-SYS-001,002,003 Yedek ve geri yükleme | P0/P1 | İkinci çalışma alanı; yedek politikası (yalnızca demo mu, tam mı); Baserow dışı kopya | A + B |
| 13 | KI-16, KI-17 Baserow limitleri ve satır geçmişi süresi | P2 | Güncel plan sınırı ve geçmiş süresi | B (+A: ayarlardan teyit) |
| 14 | KI-07 / TASK-AI-BOOT-001 / TASK-AI-HANDOVER-002 Platform talimatı ve devir testi | P0/P1 | `PLATFORM_SETUP.md` metninin platformlara konması | A |
| 15 | TASK-SYS-005 Çift ilişki alanları (uygulandı) | P1 | Kullanıcı doğrulaması | A |
| 16 | TASK-SYS-006 Seçmeli alanlar + hedef tarihler | P2 | Değer listeleri onayı; hedef tarihler | A |
| 17 | TASK-SYS-007 / KI-10 Zaman damgası standardı | P2 | Önerinin onayı | A |
| 18 | TASK-AI-AUTOLOG-003 / KI-08 Otomatik oturum kaydı | P1 | Platform/API yetenekleri | B (+C tasarım) |
| 19 | KI-18 `Git Referansı` alanı (SYS-002/004) | P3 | Şema değişikliği onayı | A |
| 20 | SYS-010 ID 4–7 "Devam ediyor" (terk edilmiş mi?) | – | Kapatma onayı; başlangıç saati yok | A |
| 21 | Okunmamış satırlar: Makineler 4–57, Geri Ödeme Planı 9–60, Kira Planı 4–60, Kur Takibi, Hizmet Kayıtları, Bakım, Yazışmalar, Muafiyetler, Projeler | – | – | C |
| 22 | TASK-SYS-004 SYS alanları ikinci kontrol | P2 | – | C |

**AI'nın karar beklemeden yapabildikleri (C):** 2c, 6 (testin AI kısmı), 9 (sayım doğrulaması), 18 (tasarım), 21, 22.
