# CIN EXIM — Ana Sistem Ağacı

Bu belge bilgisayardaki klasör ağacı değil, **bütün sistemin çalışma haritasıdır**. AI'ya "nerede ne var, neyi nasıl kullanacağım" sorusunun cevabını verir. MCP veya bağlantı erişim sağlar; bu ağaç ise neyi nasıl kullanacağını öğretir.

Tablo sayıları, alan sayıları ve ilişkiler `02_DATABASE_SCHEMA/INVENTORY.json` içinden gelir (canlı Baserow şeması, 2026-11-06). Burada elle yazılan her şey **tanımlayıcıdır**; çelişki olursa canlı şema geçerlidir.

```
CIN EXIM
│
├── 01 – İş Veritabanı (Baserow `baserow`, ID 263856)         23 operasyonel tablo + 6 senaryo tablosu
│   ├── İş çekirdeği ........ Firmalar · Projeler · Ekipman Lotları · İmalat ve Tedarik · Makineler
│   │                         · Tahsisler · Sözleşmeler · Hizmet Kayıtları · Bakım ve Yedek Parça · Sigortalar
│   ├── Finansman ........... Krediler · Teminatlar · Geri Ödeme Planı · Kira ve Tahsilat Planı
│   │                         · Gelir Gider Dengesi · Giderler ve Vergiler · Kur Takibi
│   ├── Lojistik / gümrük ... Sevkiyatlar · Gümrük İşlemleri · Muafiyetler ve Teşvikler
│   ├── Belge ve süreç ...... Belgeler · Süreç Adımları · Yazışmalar
│   └── Senaryo motoru ...... Senaryolar · Senaryo Finansman Dilimleri · Senaryo Ödeme Planı
│                             · Senaryo Varsayımları · Senaryo Değerlendirme · Senaryo Gelir Gider Akışı
│
├── 02 – SYS Yönetim Sistemi (Baserow içinde, 11 tablo) + CHAT-001/002/003 (konu ve sohbet hafızası, 3 tablo; 05_AI_PROTOCOLS/CHAT_PROTOCOL.md)
│   ├── SYS-001 Ana indeks          ├── SYS-007 Geri yükleme / klonlama
│   ├── SYS-002 Sürüm kayıtları     ├── SYS-008 Görev ve geliştirme takibi
│   ├── SYS-003 Yedek paketleri     ├── SYS-009 AI işletim protokolü  ← protokolün TEK KAYNAĞI
│   ├── SYS-004 Değişiklik günlüğü  ├── SYS-010 AI oturum ve devir kayıtları
│   ├── SYS-005 Karar kayıtları     └── SYS-011 AI çalışma ve olay günlüğü
│   └── SYS-006 Denetim ve testler
│   (+ eski referans: "Table" — eski AI denetim raporu, SYS-006 ile bağlı, korunur)
│
├── 03 – AI Analiz ve Geliştirme (bu depo + AI)
│   ├── Tablo analizi · veri kontrolü · formül denetimi · geliştirme önerisi · test
│   └── Girdi: bu depo (`02_DATABASE_SCHEMA/`) + canlı Baserow (salt okunur)
│
├── 04 – İş ve Finans Motoru (Baserow içinde, formüllerle)
│   └── Maliyet · vergi · finansman · nakit akışı · karlılık · risk · senaryolar
│       (Projeler, Krediler, Gümrük İşlemleri, Kira ve Tahsilat Planı, Gelir Gider Dengesi, Senaryo * tabloları)
│
└── 05 – Teknik Altyapı
    ├── GitHub (bu depo) ...... şema envanteri, kurallar, protokoller, sürüm geçmişi, devir şablonları
    ├── Baserow API / MCP ..... AI'ların Baserow'a erişim arayüzü
    ├── Yedek ve geri yükleme . HENÜZ DOĞRULANMADI (bkz. KNOWN_ISSUES.md KI-05)
    └── Otomasyon / raporlama . HENÜZ KURULMADI
```

## Bu depo ağacı

```
CIN-EXIM-SYSTEM/
├── README.md                      genel tanıtım
├── AI_START.md                    yeni AI için başlangıç  ← önce bunu oku
├── CLAUDE.md                      Claude Code için kısa talimat
├── 01_SYSTEM_TREE/                bu ağaç + MODULES.md (modül → tablo)
├── 02_DATABASE_SCHEMA/            INVENTORY.json · TABLES.md · RELATION_MAP.md · FORMULAS.md (otomatik)
│                                  XRAY_LEVEL0.md · IMPACT.md · DEPENDENCY_GRAPH.json · SCHEMA_VERSION.json (röntgen, otomatik)
│                                  FIELD_DICTIONARY.md · FIELD_MEANINGS.json (alan sözlüğü) · history/ (şema anlık görüntüleri)
├── 03_BUSINESS_RULES/             iş kuralları
├── 04_CHANGE_HISTORY/             CHANGELOG.md · CHANGE_TEMPLATE.md · SCHEMA_DIFFS.md (otomatik şema farkı)
├── 05_AI_PROTOCOLS/               PROTOCOL_MIRROR · INFO_GAP_PROTOCOL · LOG_ARCHIVE_RULE · GIT_ACCESS · CHAT_PROTOCOL · REQUEST_BOARD (geçersiz) · AI_SETUP · SYS_GIT_LINKING · FEATURE_REQUEST_WORKFLOW · PLATFORM_SETUP
├── 06_TASKS_AND_HANDOVER/         CURRENT_STATE.md · HANDOVER_TEMPLATE.md · BLOCKED_BY_MISSING_INFO.md · LOG_ARCHIVE/
├── 07_TESTS_AND_RELEASES/         KNOWN_ISSUES · TEST_CHECKLISTS · RELEASES
├── 08_INBOX/ · 08_RESEARCH/       yazamayan AI çıktıları · ortak web araştırma havuzu (INDEX.md)
├── 09_CHAT_ARCHIVE/               biten CHAT konularının arşivi (archive_chat.py)
├── tools/                         build_schema_docs · build_xray · schema_diff · build_field_dictionary · handover_check · archive_log · archive_chat
└── .claude/skills/                cin-exim · cin-exim-schema-refresh · cin-exim-handover-check
```

## Kim neyi tutar

| Bilgi | Yer | Not |
|---|---|---|
| Canlı iş verisi (satırlar) | Baserow operasyonel tablolar | Git'e konmaz |
| Görev, karar, denetim, oturum/devir | Baserow SYS-008 / 005 / 006 / 010 | İş ve süreç kaydı |
| Protokol | Baserow SYS-009 (tek kaynak) | Git'te yansıması var |
| Şema yapısı, ilişki haritası, formül metinleri | Git `02_DATABASE_SCHEMA/` | Canlı şemadan üretilir |
| İş kuralları ve gerekçeleri | Git `03_BUSINESS_RULES/` | Karar durumu ayrı işaretlenir |
| Teknik değişiklik geçmişi | Git commit'leri + `04_CHANGE_HISTORY/` | SYS-004 ile çapraz referans |

Bir bilgiyi iki yere kopyalama; birini kaynak yap, diğerinden referans ver.
