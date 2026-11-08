# Güncel Durum Özeti (anlık görüntü)

> **Bu bir anlık görüntüdür, kaynak değildir.** Görevlerin kaynağı Baserow `SYS-008`, oturumların kaynağı `SYS-010`'dur. Aşağıdaki bilgi **2026-11-06 13:45 (+03:00)** itibarıyla salt okunur okunmuştur. Yeni AI: önce canlı SYS-010 ve SYS-008'i oku; bu dosya bir kısayoldur.

> **Güncelleme notu (2026-11-07 00:27 +03:00, Claude Code oturumu):** yalnızca şu satırlar canlı Baserow'dan yeniden okunarak düzeltildi: SYS-009 sürümü (1.5), SYS-010 kayıt sayısı (8), oturum tablosuna `CLAUDE-20261106-003`. Canlı sayılan satır sayıları: SYS-010 8, SYS-011 17, SYS-004 23, SYS-008 15. **Geri kalan içerik (açık görevler, kararlar, Makineler/Belgeler satır sayıları) 2026-11-06 anlık görüntüsüdür; bu oturumda yeniden doğrulanmadı.**

> **Güncelleme notu 2 (2026-11-07, Claude Code):** SYS-005'e `DEC-SYS-003` (log arşiv kuralı kabulü, kullanıcı devri) yazıldı (SYS-005 3 karar); SYS-010 ID 4–7 kapatıldı; `GIT_ACCESS.md` eklendi; depo public durumda.

> **Güncelleme notu 3 (2026-11-07, Claude Code; şema dökümü 15:09 +03:00):** Baserow'da **CHAT-001/002/003** tabloları (ID 1306063/64/65) claude.ai'deki Claude tarafından kuruldu (SYS-004 `CHG-SYS-014`, SYS-005 `DEC-SYS-004`, SYS-008 `TASK-CHAT-001/002`); canlı okunarak doğrulandı. Git tarafı (şema 44 tablo, `CHAT_PROTOCOL.md` taslağı, `tools/archive_chat.py`, `09_CHAT_ARCHIVE/`, `handover_check` CHAT kontrolleri) dalda `ai/claude/chat-v0.4.0`; **`main`'e alınmadı**. Komut seti kabul edildi (DEC-SYS-004), protokol metni SYS-009'a **işlenmedi**, platform talimatı **konmadı** (TASK-CHAT-002, kullanıcı).
> **Güncelleme notu 4 (2026-11-08, Claude Code):** `main` = CHAT sistemi, `10_STANDARTLAR/` ve menü kodları (kullanıcı onayıyla). Menü 0-8 (DEC-SYS-005) kabul edildi, `CHAT_PROTOCOL.md` v0.4 taslak; SYS-009'a **işlenmedi**; platform talimatı **konmadı**; canlı komut testi **yok**. CHAT-001/002 yeni alanları: CHG-SYS-017. CHAT-002 `NOT-002-4` (ChatGPT önerisi değerlendirmesi).

## Canlı doğrulanan sayılar

| Konu | Değer |
|---|---|
| Veritabanı | `baserow`, ID 263856 |
| Tablo | 44 (23 operasyonel + 6 senaryo + 11 SYS + 3 CHAT + 1 eski `Table`) |
| Alan / ilişki alanı / formül | 896 / 223 / 91 (`02_DATABASE_SCHEMA/INVENTORY.json`, hash `5f2d986ef22c`; 2026-11-08 CHAT-001'e `Üst Konu Kodu`, `Bölge`, CHAT-002'ye `Fikir Durumu` ve Not Türü `Fikir` eklendi, CHG-SYS-017) |
| SYS-009 protokol | v1.5 (canlı doğrulandı 2026-11-07; `Girişte Zorunlu Adımlar` alanı sürüm numarası anmayacak şekilde düzeltildi, bkz. `PROTOCOL_MIRROR.md`) |
| SYS-010 oturum kaydı | 10 (ID 10 = `CLAUDE-20261107-002`, claude.ai, "Devam ediyor"; ID 4–7 2026-11-07 06:51'de kullanıcı onayıyla "Kapatıldı – iş TAMAMLANMADI" yapıldı; ID 9 = `CLAUDE-20261107-001`) |
| SYS-008 görev | 15 |
| Makineler / Belgeler satır | 57 / 52 |
| SYS-007, Senaryolar | 0 satır (boş) |

## Son oturumlar (SYS-010, kısa)

| Kod | AI | Özet | Durum (kayıttaki) |
|---|---|---|---|
| DEMO-AI-HANDOVER-20261105-001 | ChatGPT | Giriş/devir **simülasyonu** (gerçek iş değil) | Tamamlandı – DEMO |
| CLAUDE-20261105-001 | Claude | SYS denetimi, simülasyon, düzeltme | Tamamlandı |
| CLAUDE-20261105-002 | Claude | Çift ilişki alanları sadeleştirildi (9 çift silindi, çöp kutusunda), SYS-009 v1.3 | Tamamlandı – kullanıcı doğrulaması bekliyor |
| CLAUDE-20261105-003 | Claude | Giriş protokolü, salt okunur özet | Kapatıldı – kullanıcı onayıyla; iş tamamlanmadı |
| GPT6-20261105-001 | ChatGPT / GPT-6 | SYS-009 v1.4 onayı ve uygulaması | Kapatıldı – kullanıcı onayıyla; iş tamamlanmadı |
| CLAUDE-20261106-001 | Claude | Aşama 1 canlı denetim, onaylı formül düzeltmeleri | Kapatıldı – kullanıcı onayıyla; iş tamamlanmadı |
| CLAUDE-20261106-002 | Claude | Giriş, yarım işlerin devri, SYS-008 durum alanları pilotu, Belgeler incelemesi | Kapatıldı – kullanıcı onayıyla; iş tamamlanmadı |
| CLAUDE-20261106-003 | Claude (Claude Code) | Git teknik hafızasının kurulması (`repo-v0.1.0`); kaydı claude.ai sohbeti yazdı | Tamamlandı – platform testi, yedek, formül işleri açık |
| CLAUDE-20261107-001 | Claude (Claude Code) | `repo-v0.2.0`/`v0.2.1`: XRAY düzeltmesi, schema_diff, handover_check, log arşiv kuralı, GIT_ACCESS, DEC-SYS-003, ID 4–7 kapatma | Tamamlandı – açık kullanıcı kararları var |

SYS-010 ID 4–7 2026-11-07 06:51'de kullanıcı onayıyla kapatıldı; kayıtlarında işlerin **tamamlanmadığı** yazılıdır. Bu kayıtlar yazan AI'ların beyanıdır; yapılanları SYS-004/005/008 ile doğrulayarak devral (`cin-exim-handover-check`).

## Açık görevler (SYS-008, kısa)

| Kod | Öncelik | Başlık | Durum |
|---|---|---|---|
| TASK-AI-BOOT-001 | **P0** | AI başlangıç yönergesini platformlara yerleştirme | Açık – kullanıcı işlemi (`PLATFORM_SETUP.md`) |
| TASK-ASSET-002 | **P0** | Kazakistan geri alma / zilyetlik hukuk görüşü | Açık – hukuk görüşü bekliyor |
| TASK-FIN-001 | **P0** | Seller's Credit 12 ay erteleme + 5 yıl vade alternatifleri | Açık – vade tanımı ve faiz modeli kararı bekliyor |
| TASK-ASSET-001 | P1 | Varlık yaşam döngüsü formülü | Açık – kullanıcı doğrulaması bekliyor |
| TASK-ASSET-003 | P1 | Varlık olayları için kanıt belge kontrolü | Açık |
| TASK-FIN-002 | P1 | Kullandırım/ödeme tarihlerini term sheet ile doğrulama | Açık – term sheet bekliyor |
| TASK-SYS-001 | P1 | İkinci Baserow çalışma alanı | Bekliyor – kullanıcı işlemi |
| TASK-SYS-002 | P1 | Boş demo mimari yedek paketi | Bekliyor (SYS-001'e bağlı) |
| TASK-SYS-003 | P1 | Klonlama ve geri yükleme testi | Bekliyor (SYS-002'ye bağlı) |
| TASK-SYS-005 | P1 | Çift ilişki alanları | Uygulandı – kullanıcı doğrulaması bekliyor |
| TASK-AI-HANDOVER-002 | P1 | İkinci AI ile devir testi | Bekliyor (BOOT-001'e bağlı) |
| TASK-AI-AUTOLOG-003 | P1 | Oturum kaydı otomasyonu değerlendirmesi | Açık – teknik tasarım |
| TASK-SYS-004 | P2 | SYS alanları ikinci kontrol | Açık (kısmi) |
| TASK-SYS-006 | P2 | Durum/öncelik alanlarını seçmeli yapma, hedef tarihler | Açık – kısmi (SYS-008 pilotu tamam) |
| TASK-SYS-007 | P2 | Zaman damgası standardı | Açık – öneri yazıldı, karar bekliyor |

Hiçbir görevde hedef tarih yoktur; hedef tarihleri kullanıcı belirler. Ayrıntı ve sorunlar: `07_TESTS_AND_RELEASES/KNOWN_ISSUES.md`.

## Kullanıcıdan beklenen kararlar

1. Platformların kalıcı talimatına SYS-009 okuma kuralını ekleme ve yeni sohbette test (TASK-AI-BOOT-001).
2. Seller's Credit: şema yetkisi, 12 aylık erteleme dönemi faiz modeli, vade tanımı, DSCR yaklaşımı (CFADS tabanlı öneri).
3. 2027 tarihleri: sil / "demo varsayımı" etiketle / olduğu gibi bırak.
4. `baserow yedek` (ID 615555) için politika: yalnızca demo mu, tam yedek de mi; Baserow dışı (CSV/export) kopya.
5. İmzada görünen 3 belgenin gerçek durumu.
6. Zaman damgası standardı (`BUSINESS_RULES.md` R-12).
7. SYS-002/004'e `Git Referansı` alanı eklensin mi (`SYS_GIT_LINKING.md`).
8. Görev hedef tarihleri.

## Git deposu durumu

`repo-v0.1.0` ile ilk kurulum yapıldı; ardından ayrı oturumlarda röntgen, etki analizi, şema özeti, eksik bilgi protokolü ve engelli işler listesi eklendi; `repo-v0.2.0` bu eklerin eksiklerini kapattı (bkz. `04_CHANGE_HISTORY/CHANGELOG.md`). Kurulum için SYS-010 kaydı **yazıldı**: `CLAUDE-20261106-003` (SYS-010 ID 8, claude.ai sohbeti, kullanıcı onayıyla). `repo-v0.2.0` çalışması için SYS-010 kaydı yazılmadı (SYS yazma izni ayrıca alınmadı); bu depo değişikliğinin Baserow'a yansımaları CHANGELOG'da listelidir.

## Sonraki en mantıklı adımlar (öneri, karar kullanıcıda)

1. **TASK-AI-BOOT-001:** başlangıç metnini platformlara koy ve T-01 testini yap (düşük maliyet, yüksek etki).
2. **Yedek:** `baserow yedek` politikasını netleştir; Baserow dışı bir export al (KI-05).
3. **Formüller:** KI-01/02/06 için değişiklik önerisini sun (TASK-ASSET-001/003); onaydan sonra uygula.
4. **Finansman:** DSCR tanımını ve erteleme faiz modelini seç (KI-03/04), ardından senaryoları kur.
