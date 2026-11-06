# Değişiklik Günlüğü (Git tarafı)

Bu dosya **bu deponun** teknik değişikliklerini kronolojik tutar. Baserow yapısal değişiklikleri `SYS-004`'te, kararlar `SYS-005`'te tutulur; buradaki kayıtlar onlara referans verir. Yeni kayıt eklerken `CHANGE_TEMPLATE.md` alanlarını kullan; en yeni kayıt en üstte.

---

## repo-v0.1.0 — 2026-11-06 — Git teknik hafızasının ilk kurulumu

| Alan | Değer |
|---|---|
| Ne vardı? | Yalnızca `README.md` (iki satır açıklama). Tek commit: `Initial commit`. |
| Ne eklendi? | `AI_START.md`, `CLAUDE.md`, `01_SYSTEM_TREE/` (ağaç + modül haritası), `02_DATABASE_SCHEMA/` (41 tablo: envanter, kartlar, ilişki haritası, formüller), `03_BUSINESS_RULES/`, `04_CHANGE_HISTORY/`, `05_AI_PROTOCOLS/`, `06_TASKS_AND_HANDOVER/`, `07_TESTS_AND_RELEASES/`, `tools/build_schema_docs.py`, `.claude/skills/cin-exim*` |
| Ne değişti? | `README.md` genişletildi (ilk iki satır korundu). |
| Ne kaldırıldı? | Hiçbir şey. |
| Neden? | AI değiştiğinde sistemin hafızasının, kurallarının ve devir bilgisinin kaybolmaması; yeni AI'nın işi kaldığı yerden sürdürebilmesi (kullanıcı isteği, 2026-11-06). |
| Etkilenen Baserow tabloları / formüller / ilişkiler | **Yok.** Baserow'da hiçbir kayıt, alan, ilişki, formül veya görünüm değiştirilmedi; yalnızca salt okunur okuma yapıldı. |
| Kim yaptı | Claude (Anthropic, Sonnet 5.5) — Claude Code oturumu |
| Kullanıcı onayı | Evet — kullanıcı "sen hazırla yap" dedi (2026-11-06, 08:55 +03:00). Depoya bağlanma ve yazma izni kullanıcı tarafından verildi. |
| Test | `tools/build_schema_docs.py` canlı şema dökümüyle çalıştırıldı: 41 tablo, 845 alan, 219 ilişki alanı, 91 formül üretildi; tüm tablolar için amaç/grup tanımlı. `RELATION_MAP.md` içindeki 4 Mermaid diyagramı `mmdc` ile render edildi (hepsi başarılı). Markdown bağlantıları ve dosya yolu atıfları betikle kontrol edildi (kırık yok). Platform testleri (T-01/T-02) yapılmadı. |
| GitHub commit / PR | Bu sürümün commit'i (ilk kurulum, doğrudan `main`) |
| Baserow'da uygulandı mı? | Uygulanacak bir şey yok (yalnızca Git değişikliği) |
| SYS kaydı | **Yazılmadı** — SYS yazma izni bu oturumda ayrıca alınmadı (SYS-009). Önerilen SYS-010 kaydı için `06_TASKS_AND_HANDOVER/CURRENT_STATE.md` sonuna bak. |
| Bilinen eksikler | Satır sayıları ve satır verisi şema belgelerinde yoktur. İş kuralları yalnızca şema/SYS kanıtı olanlarla sınırlıdır. SYS ↔ Git bağı için SYS-002/004'te `Git Referansı` alanı yoktur (öneri: `SYS_GIT_LINKING.md`). |
