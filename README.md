# CIN-EXIM-SYSTEM

CIN EXIM – AI-independent business database architecture, Baserow system documentation, version control, multi-agent collaboration, audit and recovery.

Bu depo, CIN EXIM sisteminin **teknik hafızasıdır**. Hangi yapay zekâ ile çalışılırsa çalışılsın, yeni gelen AI burada sistemi tanır, önceki AI'nın kaldığı yerden devam eder ve iş tablolarını mevcut yapıyı bozmadan geliştirir.

> **Bu depo Baserow'un yedeği değildir.** Canlı iş verisi Baserow'da (veritabanı `baserow`, ID 263856) durur. Burada yalnızca yapı, kurallar, protokoller, geçmiş ve devir bilgisi bulunur. Gerçek ticari veri bu depoya konmaz.

## Yeni gelen AI: buradan başla

1. [`AI_START.md`](AI_START.md) — başlangıç sırası, altın kurallar, devir. **İlk okunacak dosya.**
2. [`01_SYSTEM_TREE/SYSTEM_TREE.md`](01_SYSTEM_TREE/SYSTEM_TREE.md) — sistemin ana haritası.
3. [`06_TASKS_AND_HANDOVER/CURRENT_STATE.md`](06_TASKS_AND_HANDOVER/CURRENT_STATE.md) — tarihli durum özeti ve açık işler.
4. [`02_DATABASE_SCHEMA/XRAY_LEVEL0.md`](02_DATABASE_SCHEMA/XRAY_LEVEL0.md) — tek sayfa tablo haritası (röntgen).
5. [`01_SYSTEM_TREE/MODULES.md`](01_SYSTEM_TREE/MODULES.md) — "şu işi yapacağım, hangi tablolara bakmalıyım?"
6. [`02_DATABASE_SCHEMA/IMPACT.md`](02_DATABASE_SCHEMA/IMPACT.md) — "bu alanı değiştirirsem ne bozulur?" (değiştirmeden önce).

Protokolün **tek kaynağı** Baserow'daki `SYS-009` kaydıdır; bu depodaki dosyalar onun yansıması ve tamamlayıcısıdır. Çelişki olursa SYS-009 geçerlidir.

## Klasörler

| Klasör | İçerik |
|---|---|
| [`01_SYSTEM_TREE/`](01_SYSTEM_TREE/) | Ana sistem ağacı, modül → tablo haritası |
| [`02_DATABASE_SCHEMA/`](02_DATABASE_SCHEMA/) | 41 tablonun envanteri, tablo kartları, ilişki haritası (Mermaid), tüm formüller, röntgen, etki analizi, alan sözlüğü, şema anlık görüntüleri (otomatik üretilir) |
| [`03_BUSINESS_RULES/`](03_BUSINESS_RULES/) | İş kuralları ve hesap mantıkları (kanıtlı / karar bekleyen ayrımıyla) |
| [`04_CHANGE_HISTORY/`](04_CHANGE_HISTORY/) | Değişiklik günlüğü, kayıt şablonu ve otomatik şema farkı (`SCHEMA_DIFFS.md`) |
| [`05_AI_PROTOCOLS/`](05_AI_PROTOCOLS/) | SYS-009 yansıması, eksik bilgi protokolü, log arşiv kuralı, SYS ↔ Git bağlantı standardı, Git erişim kılavuzu, geliştirme isteği akışı, platform kurulum metni |
| [`06_TASKS_AND_HANDOVER/`](06_TASKS_AND_HANDOVER/) | Güncel durum özeti, devir şablonu, bilgi yüzünden duran işler, log arşivi |
| [`07_TESTS_AND_RELEASES/`](07_TESTS_AND_RELEASES/) | Bilinen sorunlar, test kontrol listeleri, sürüm politikası |
| [`tools/`](tools/) | Şema belgelerini üreten, şema farkını yazan, devri ve tutarlılığı kontrol eden, log arşivleyen betikler (komut listesi: `AI_START.md` bölüm 7) |
| [`.claude/skills/`](.claude/skills/) | Claude Code için CIN EXIM skill'leri (başlangıç/devir, şema yenileme, devir doğrulama) |

## Üç katman, üç sorumluluk

| Katman | Görev | Tutulan |
|---|---|---|
| **Baserow** | Canlı iş ve SYS kayıtları | Operasyonel tablolar, görev (SYS-008), karar (SYS-005), denetim (SYS-006), oturum/devir (SYS-010) |
| **GitHub (bu depo)** | Teknik hafıza | Şema envanteri, ilişki haritası, kurallar, protokoller, sürüm geçmişi |
| **AI** | Analiz ve geliştirme | Okur, önerir; **onay almadan canlı sisteme yazmaz** |

GitHub commit geçmişi teknik değişikliği, Baserow SYS tabloları iş kararını ve oturum kaydını tutar. İkisi birbirinin yerine geçmez, birbirine referans verir (bkz. [`05_AI_PROTOCOLS/SYS_GIT_LINKING.md`](05_AI_PROTOCOLS/SYS_GIT_LINKING.md)).

## Durum

Sistem **henüz üretim kullanımına hazır değildir**. Bilinen sorunlar: [`07_TESTS_AND_RELEASES/KNOWN_ISSUES.md`](07_TESTS_AND_RELEASES/KNOWN_ISSUES.md).
