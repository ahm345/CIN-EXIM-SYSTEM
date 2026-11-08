# Değişiklik Günlüğü (Git tarafı)

Bu dosya **bu deponun** teknik değişikliklerini kronolojik tutar. Baserow yapısal değişiklikleri `SYS-004`'te, kararlar `SYS-005`'te tutulur; buradaki kayıtlar onlara referans verir. Yeni kayıt eklerken `CHANGE_TEMPLATE.md` alanlarını kullan; en yeni kayıt en üstte.

---

## repo-v0.4.5 — 2026-11-08 — PLATFORM_SETUP 2b v2 (canlı ChatGPT testi sonrası)

| Alan | Değer |
|---|---|
| Ne değişti? | `PLATFORM_SETUP.md` 2b: `CHAT_PROTOCOL.md` tam yolu ve raw URL, kısa rapor iskeleti (dosya okunamazsa aynı biçim), eski komut listesini yasaklama; `CHAT_PROTOCOL.md` standart sırasındaki `KOMUTLAR` → `MENÜ`. |
| Neden | Canlı ChatGPT testi (2026-11-08 16:12): AI protokol dosyasını bulamadı, biçim tutmadı (YAPILACAKLAR bölümü yok, eski 5 komut listesi, kendi 📍 başlığı). |
| Etkilenen Baserow | CHAT-001 KONU-001 `Güncel Özet` eski "5 komut" metni düzeltildi; CHAT-002 `NOT-002-5` (test sonucu). |
| Kullanıcı onayı | `main`'e alma: bekliyor. |

---

## repo-v0.4.4 — 2026-11-08 — CHAT menü v0.4 (0-8, konum, yönler, fikir, iş emri)

| Alan | Değer |
|---|---|
| Ne değişti? | `CHAT_PROTOCOL.md` v0.4: menü M1-M5 yerine 0-8; bölüm 1c (konum başlığı, harita, yönler: geri/yukarı/aşağı/yan/sıradaki), 2c (fikir ve dal), 5b (iş emri hattı, VS Code zorunlu değil); konu seçimi harfle; sayaç yasak; onay = kullanıcının "evet"i. `10_STANDARTLAR`: K7, P8. `PLATFORM_SETUP.md` 2b metni güncellendi. |
| Neden | Kullanıcı web sohbetinde konuları karıştırıyor (2026-11-08): harita, kavşak ve yön istedi; VS Code zorunlu olmasın. |
| Etkilenen Baserow | CHAT-001'e `Üst Konu Kodu` (text), `Bölge` (Yapı/Chat/İş); CHAT-002'ye `Fikir Durumu` (Park/Konuya dönüştü/Arşiv) ve Not Türü `Fikir` (SYS-004 `CHG-SYS-017`); karar SYS-005 `DEC-SYS-005`. KONU-001=Yapı, KONU-002=Chat. Şema 44 tablo, **896 alan**, hash `5f2d986ef22c`. |
| Kullanıcı onayı | "sen yapmaya başla" 2026-11-08 15:21; "yap hepsini" 2026-11-08 15:59 (Baserow alanları, DEC-SYS-005, main'e alma). |
| Test | `handover_check` aşağıda. Canlı platform testi yok. |

---

## repo-v0.4.3 — 2026-11-08 — 10_STANDARTLAR (taslak v0.1; dalda, main'e alınmadı)

| Alan | Değer |
|---|---|
| Ne eklendi? | `10_STANDARTLAR/` (README = anayasa ve öncelik sırası; `KALIPLAR.md` K1-K6; `PROMPTLAR.md` P1-P7). Mevcut şablonlara (HANDOVER, CHANGE, INFO_GAP, 08_RESEARCH, CHAT_PROTOCOL) kopyalamadan bağlantı verir. `AI_START.md` ve `README.md` haritasına satır. |
| Etkilenen Baserow | Yok (SYS-009'a işlenmedi). |
| Kullanıcı onayı | İstek: 2026-11-08 09:18. Taslak içeriği ve `main`'e alma: bekliyor. |
| Bilinen eksik | Kalıpların AI'lar tarafından uygulandığı canlı sınanmadı; platform talimatı bu klasörü henüz okutmuyor; teknik zorlama yok. |

---

## repo-v0.4.2 — 2026-11-08 — CHAT menü kodları M1-M5 (dalda, main'e alınmadı)

| Alan | Değer |
|---|---|
| Ne değişti? | `CHAT_PROTOCOL.md`: açılış raporundaki KOMUTLAR bloğu M1-M5 menü kodlarıyla (kod = onaylı 5 komutun kısa adı, yeni komut değil); menü kuralları; Rapor Satırı/Sıradaki Adım "yok" notu düzeltildi (alanlar CHG-SYS-016 ile eklendi). |
| Etkilenen Baserow | Yok. |
| Kullanıcı onayı | Menü isteği: 2026-11-08 09:15. `main`'e alma: bekliyor. |
| Test | `handover_check` aşağıda. Canlı platform testi yapılmadı (TASK-CHAT-002). |

---

## repo-v0.4.0 — 2026-11-07 — CHAT sistemi Git tarafı (TASK-CHAT-001)

| Alan | Değer |
|---|---|
| Ne vardı? | Baserow'da CHAT-001/002/003 (claude.ai'deki Claude kurdu, `CHG-SYS-014`, `DEC-SYS-004`); Git şema envanteri 41 tablo diyordu, CHAT tanımı Git'te yoktu; `REQUEST_BOARD.md` (SYS-012/013 önerisi) CHAT ile çelişiyordu. |
| Ne eklendi? | `05_AI_PROTOCOLS/CHAT_PROTOCOL.md` (**taslak v0.3**: 5 komut, aktif konu/bölüm/kayıt noktası, yeni konu, konu filtresi, yaşam döngüsü ve Git arşivi); `tools/archive_chat.py` + `09_CHAT_ARCHIVE/`; `handover_check.py` CHAT kontrolleri (şema, arşiv tutarlılığı); `tools/inbox_diff.py` (gelen kutusu paketini depodakiyle karşılaştırır, yazmaz); `CHAT_PROTOCOL.md` bölüm 1b (`#chatrapor` sabit çıktı biçimi); `PLATFORM_SETUP.md` bölüm 2b (CHAT için yapıştırılacak metin); `build_schema_docs.py --base` (tüm şemayı yeniden dökmeden tablo ekleme) ve CHAT için `META`/grup 08. |
| Ne değişti? | Şema belgeleri 41 → **44 tablo, 881 alan, 223 ilişki** (`INVENTORY.json`, XRAY, TABLES, RELATION_MAP, FORMULAS, FIELD_DICTIONARY, SCHEMA_VERSION `e5a46f04b5d5`, yeni anlık görüntü, `SCHEMA_DIFFS.md`: 3 tablo eklendi). `REQUEST_BOARD.md` geçersiz işaretlendi. `AI_START`, `PLATFORM_SETUP`, `SYSTEM_TREE`, `README`, `CURRENT_STATE` eşitlendi. |
| Etkilenen Baserow | Git sürümü Baserow'a yazmadı. Ayrıca **kullanıcı** Baserow arayüzünden SYS-010, SYS-011, CHAT-001/002/003 tablolarına sistem zaman alanları ekledi (`created_on`, `last_modified`; sunucu saatiyle dolar, AI yazamaz). Claude canlı şemayı okuyarak doğruladı, şema belgeleri yenilendi (44 tablo, **891 alan**, hash `148555a4be34`); SYS-010'daki alan adları İngilizce (`Created on`, `Last modified`), diğerlerinde Türkçe. SYS-004 `CHG-SYS-015`. |
| Kullanıcı onayı | Evet — 2026-11-07 15:08 "yapman gerekenleri yap, izin veriyorum" (Git tarafı; dalda). `main`'e birleştirme ve SYS-009 v1.6 işleme **onaylanmadı**. |
| Test | `archive_chat.py` ayrı kopyada: açık konu reddi, Bitti konu arşivi, tekrar (aynı içerik), farklı içerikle üzerine yazmayı reddetme, `verify` tam/eksik, TASLAK arşivin `verify` ile reddi denendi. `handover_check`: 0 hata, 0 uyarı. Gerçek CHAT satırı arşivlenmedi, Baserow'dan silme yapılmadı. |
| Bilinen eksikler | Komutlar başka AI platformlarında canlı sınanmadı (TASK-CHAT-002); platform talimatı konmadı; SYS-009'a işlenmedi; "Claude Cevabı" tek kolon (birden çok Claude çakışabilir); 500 satır eşiği öneri. |

---

## repo-v0.4.1 — 2026-11-07 — CHAT-001'e Rapor Satırı ve Sıradaki Adım; main'e birleştirme

| Alan | Değer |
|---|---|
| Ne değişti? | Baserow CHAT-001'e iki alan eklendi: `Rapor Satırı` (text), `Sıradaki Adım` (long_text); KONU-001 için ilk değerler yazıldı ve geri okundu. Şema 44 tablo, **893 alan** (`148555a4be34` → yeni hash, `SCHEMA_DIFFS.md`). `CHAT_PROTOCOL.md` açılış raporu ve YAPILACAK/YARIM KALAN/SENDEN BEKLENEN standardı. |
| Kullanıcı onayı | Evet — 2026-11-07 21:57 "maine al ve ekle" (iki iş: alanları ekleme ve `main`'e birleştirme). |
| Etkilenen Baserow | CHAT-001 şeması (+2 alan, Claude bağlayıcıyla oluşturdu), CHAT-001 ID 1 satırı (Açık Noktalar, Rapor Satırı, Sıradaki Adım, Son Konuşan AI, Son Güncelleme). SYS-004 `CHG-SYS-016`. |
| Yapılmadı | Platform talimatı konmadı (kullanıcı); komutlar başka platformda sınanmadı; SYS-009'a işlenmedi. |

---

## repo-v0.3.0 — 2026-11-07 — Gelen kutusu, araştırma havuzu, istek tahtası taslağı

| Alan | Değer |
|---|---|
| Ne eklendi? | `08_INBOX/`, `08_RESEARCH/` (README, TEMPLATE, INDEX), `05_AI_PROTOCOLS/REQUEST_BOARD.md` (**taslak**), `05_AI_PROTOCOLS/AI_SETUP.md`. `AI_START.md`, `SYSTEM_TREE.md`, `README.md` güncellendi. |
| Etkilenen Baserow | **Yok.** SYS-012 İstekler / SYS-013 İstek Notları tabloları yalnızca taslak; oluşturulmadı (kullanıcı onayı bekliyor). |
| Kullanıcı onayı | Evet — 2026-11-07 07:18 "başlayalım" (yalnızca depo tarafı, adım 1). |
| Yapılmadı | Baserow tabloları; uçtan uca deneme; ChatGPT/Perplexity kurulumları doğrulanmadı. |

---

## repo-v0.2.1 — 2026-11-07 — Git erişim kılavuzu, log arşiv kuralının kabulü, açık oturumların kapatılması

| Alan | Değer |
|---|---|
| Ne eklendi? | `05_AI_PROTOCOLS/GIT_ACCESS.md` (Claude Code'un depoya nasıl girdiği, diğer AI'ların okuma/yazma yolları, public/private önerisi; sır içermez). |
| Ne değişti? | `LOG_ARCHIVE_RULE.md` ve ilgili belgelerde "taslak" ibaresi kaldırıldı (kabul: DEC-SYS-003). `PLATFORM_SETUP.md`: yanlış "özel depo" ifadesi düzeltildi (depo public), eski sürüm örneği kaldırıldı. `AI_START.md`, `README.md`, `SYSTEM_TREE.md`, `CURRENT_STATE.md` eşitlendi. |
| Etkilenen Baserow | SYS-005'e `DEC-SYS-003` eklendi; SYS-010 ID 4–7 `Oturum Durumu` "Kapatıldı – kullanıcı onayıyla; iş TAMAMLANMADI" yapıldı; SYS-010'a bu oturumun kaydı eklendi. Şema değişmedi. |
| Kullanıcı onayı | Evet — 2026-11-07 06:51: "tüm kararlarda senin dediğini yapalım" (eşik rakamları Claude önerisidir, tek tek incelenmedi). |
| Yapılmadı | Depo private yapılmadı (okuyucu AI'ların erişim yolu kurulmadan yapılmamalı); Baserow'dan hiçbir satır silinmedi; gerçek 3.000 satır limiti doğrulanmadı. |

---

## repo-v0.2.0 — 2026-11-07 — Röntgen eklerinin eksiklerini kapatma; şema farkı, devir doğrulama, log arşiv kuralı, alan sözlüğü

| Alan | Değer |
|---|---|
| Ne vardı? | `repo-v0.1.0` üzerine, benden bağımsız oturumlarda "Add files via upload" ile eklenmiş dosyalar (kullanıcı beyanı: 8 commit, 31 dosya; bu oturumda yalnızca HEAD `661e220` ve dosya listesi doğrulandı): `XRAY_LEVEL0.md`, `IMPACT.md`, `DEPENDENCY_GRAPH.json`, `SCHEMA_VERSION.json`, `tools/build_xray.py`, `05_AI_PROTOCOLS/INFO_GAP_PROTOCOL.md`, `06_TASKS_AND_HANDOVER/BLOCKED_BY_MISSING_INFO.md`. Bu eklerin CHANGELOG kaydı yoktu. |
| Ne eklendi? | `tools/schema_diff.py` + `02_DATABASE_SCHEMA/history/` (şema anlık görüntüleri) + `04_CHANGE_HISTORY/SCHEMA_DIFFS.md`; `tools/handover_check.py` + `.claude/skills/cin-exim-handover-check/`; `05_AI_PROTOCOLS/LOG_ARCHIVE_RULE.md` (v0.2.0'da taslak; v0.2.1'de kabul edildi) + `tools/archive_log.py` + `06_TASKS_AND_HANDOVER/LOG_ARCHIVE/`; `tools/build_field_dictionary.py` + `02_DATABASE_SCHEMA/FIELD_DICTIONARY.md` + `FIELD_MEANINGS.json`; `.gitignore`. |
| Ne değişti? | **`XRAY_LEVEL0.md` tablosu bozuktu: 48 satırın 12'sinde sütun sayısı yanlıştı** (SYS tablolarının adı `SYS-001 \| Sistem Ana İndeksi` gibi `\|` içerir; komşu listelerinde de geçer). `tools/build_xray.py` artık tüm hücreleri kaçırır (`esc`), röntgen yeniden üretildi (48/48 satır sağlam; şema özeti değişmedi `a8068f47e2bc`). `build_xray.py --prev` kendi eksik `diff()` kodunu bırakıp `schema_diff.py`'ye devreder. `AI_START.md` yeni belge ve araçlara yol gösterir (bölüm 1, 2, 3, 4, 5, 7), sürüm numarası artık yazılmaz. `cin-exim-schema-refresh` skill'i röntgen, fark ve sözlük aşamalarını anlatır (önceden yalnızca `build_schema_docs.py` vardı; şema yenilenince röntgen dosyaları eski kalıyordu). `CLAUDE.md`, `SYSTEM_TREE.md`, `PROTOCOL_MIRROR.md`, `CURRENT_STATE.md` (SYS-009 sürümü 1.5, SYS-010 kayıt sayısı 8) güncellendi. |
| Ne kaldırıldı? | `build_xray.py` içindeki eski `diff()` fonksiyonu (yalnızca tür/formül farkı görüyor, ilişki hedefi ve seçenek listesi değişikliğini görmüyordu). Başka bir şey yok. |
| Neden? | Kullanıcının, başka bir AI'nın yazdığı kontrol listesini doğrulatıp eksikleri düzelttirmesi (2026-11-06 18:54 "bunların çözümlerini bul düzelt"; 2026-11-07 00:20 "kaldığın yerden devam et"). |
| Etkilenen Baserow tabloları / formülleri / ilişkileri | **Yalnızca SYS-009 ID 1, `Girişte Zorunlu Adımlar` alanı:** "1) SYS-009 v1.4'ü oku." → "1) SYS-009'u oku (güncel sürüm bu kaydın Protokol Sürümü alanındadır)."; diğer 11 alan aynen kaldı (canlı yeniden okunarak doğrulandı). Şema, ilişki, formül, görünüm değişmedi. **SYS-010 ID 4–7 ("Devam ediyor") değiştirilmedi:** kapatma kararı yalnızca kullanıcıdadır. |
| Kim yaptı | Claude (Anthropic, Sonnet 5.5) — Claude Code oturumu |
| Kullanıcı onayı | Evet — yukarıdaki iki mesaj (2026-11-06 18:54, 2026-11-07 00:20 +03:00). SYS-009 alanı düzeltmesi kullanıcının listesindeki madde 5'tir; kullanıcı "düzelt" dedi. |
| Test | `schema_diff.py`: sentetik şema (formül değişti, seçenek eklendi/kaldırıldı, alan adı değişti, alan silindi, tablo eklendi) ayrı bir kopyada çalıştırıldı, 5 değişikliğin hepsi ve olası formül etkisi görüldü; ilk çalıştırma, tekrar çalıştırma ("değişmedi"), eski tarihli envanteri reddetme (çıkış kodu 3) ve `build_xray.py --prev` yönlendirmesi denendi. `archive_log.py`: arşivleme, aynı içerikte tekrar, farklı içerikte reddetme, "Devam ediyor" oturumu reddetme, kapsam dışı tablo reddetme, `verify` tam/eksik denendi (ayrı kopyada, gerçek SYS-011 satırıyla). `handover_check.py` depoya karşı çalıştırıldı. Tablo sütun sayısı XRAY, IMPACT ve FIELD_DICTIONARY'de doğrulandı (0 bozuk). Canlı Baserow ile: SYS-009 yazma sonrası yeniden okundu. **Yapılmadı:** `LOG_ARCHIVE_RULE.md` gerçek Baserow satırı silinerek denenmedi (silme yapılmadı); platform testleri (T-01/T-02) yapılmadı. |
| GitHub commit / PR | Bu sürümün commit'i (dal `ai/claude/repo-v0.2.0`, `main`'e birleştirme kullanıcı onayıyla) |
| Baserow'da uygulandı mı? | Yalnızca SYS-009 ID 1 tek alan düzeltmesi (yukarıda). |
| SYS kaydı | **Yazılmadı** — bu oturum için SYS-010 kaydı açmak üzere SYS yazma izni ayrıca alınmadı (SYS-009). SYS-004'e de yazılmadı (yapısal değişiklik değil, metin düzeltmesi). |
| Bilinen eksikler | `LOG_ARCHIVE_RULE.md` eşikleri öneridir, kullanıcı onayı bekler; KI-16 (3.000 satır limiti) bağımsız doğrulanmadı. `FIELD_DICTIONARY.md`'de 102 ortak alanın yalnızca 1'inin anlamı kaynaklı olarak yazılabildi (kalanı `Bilinmiyor / Doğrulanmadı`; kullanıcıdan tek listede sorulmalı). SYS-009 `Çalışma Sırasında Kayıt Kuralları` alanı "HAFİF KAYIT v1.4." etiketiyle başlıyor (kasten bırakıldı). Etki analizi regex tabanlıdır, kaçırma olabilir. |

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
