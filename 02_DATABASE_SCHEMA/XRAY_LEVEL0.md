# Röntgen — Seviye 0 (tek sayfa harita)

> Otomatik üretildi (`tools/build_xray.py`). Şema kaynağı: INVENTORY.json, 2026-11-07T15:09:04+03:00. Çelişkide canlı Baserow geçerlidir. Satır verisi yoktur.

**44 tablo · 881 alan · 223 ilişki alanı · 91 formül**

Okuma sırası: bu sayfa → `01_SYSTEM_TREE/MODULES.md` (iş → tablo) → `TABLES.md` (tam kart) → `IMPACT.md` (değişiklik öncesi).

Sütunlar: **Bağlı olduğu** = bu tablodan çıkan ilişki alanı sayısıyla komşular; **Formül girdisi** = bu tablonun formüllerinin okuduğu DİĞER tablolar; **Okunma** = başka tabloların formülleri bu tabloya kaç kez bakıyor.

## 01 İş Çekirdeği

| ID | Tablo | Amaç | Alan/İlişki/Formül | Bağlı olduğu | Formül girdisi | Okunma |
|---|---|---|---|---|---|---|
| 1299125 | Firmalar | Tüm taraflar için ortak firma kaydı (tedarikçi, imalatçı, kreditör, kiracı, sigortacı, taşıyıcı vb.). Mülki... | 44/38/0 | Ekipman Lotları, Giderler ve Vergiler, Gümrük İşlemleri, Hizmet Kayıtları, Kira ve Tahsilat Planı, Krediler×2, Makineler×8, Projeler×6, Senaryo Finansman Dilimleri, Senaryolar×4, Sevkiyatlar, Sigortalar, Sözleşmeler×2, Süreç Adımları, Tahsisler, Teminatlar×3, Yazışmalar×2, İmalat ve Tedarik | — | 0 |
| 1299126 | Projeler | Ana proje kaydı. Maliyet, kredi, kira, vergi ve süreç ilerleme özetlerini toplayan formüller içerir. | 55/20/17 | Bakım ve Yedek Parça, Belgeler, Ekipman Lotları, Firmalar×6, Gelir Gider Dengesi, Giderler ve Vergiler, Hizmet Kayıtları, Kira ve Tahsilat Planı, Krediler, Muafiyetler ve Teşvikler, Senaryolar, Sevkiyatlar, Sözleşmeler, Süreç Adımları, Yazışmalar | Bakım ve Yedek Parça, Belgeler, Ekipman Lotları, Giderler ve Vergiler, Kira ve Tahsilat Planı, Krediler, Sevkiyatlar, Süreç Adımları | 1 |
| 1299127 | Ekipman Lotları | Projedeki ekipman lotları (tedarikçi, tutar). Makineleri ve sevkiyatları gruplar. | 17/7/2 | Bakım ve Yedek Parça, Firmalar, Makineler, Projeler, Sevkiyatlar, Sözleşmeler, İmalat ve Tedarik | — | 3 |
| 1299128 | İmalat ve Tedarik | Lot bazlı sipariş ve üretim takibi; FAT raporu belgesi bağlanır. | 15/3/2 | Belgeler, Ekipman Lotları, Firmalar | — | 0 |
| 1299136 | Bakım ve Yedek Parça | Lot ve makine bazlı bakım ve yedek parça kalemleri. | 12/3/2 | Ekipman Lotları, Makineler, Projeler | — | 1 |
| 1299813 | Makineler | Makine (şasi / seri no) kaydı: hukuki malik, fiili kullanıcı, tahsis, sigorta ve yaşam döngüsü kontrolleri. | 46/16/4 | Bakım ve Yedek Parça, Belgeler×2, Ekipman Lotları, Firmalar×8, Hizmet Kayıtları, Sigortalar, Süreç Adımları, Tahsisler | Sigortalar, Tahsisler | 0 |
| 1299814 | Hizmet Kayıtları | Makine / sözleşme bazlı hizmet kayıtları. | 14/4/1 | Firmalar, Makineler, Projeler, Sözleşmeler | — | 0 |
| 1301364 | Sözleşmeler | Sözleşmeler (satış, leasing, kira, alt kiralama, tahsis, teminat, hizmet vb.); ana sözleşme ile kendine bağ... | 24/9/2 | Belgeler, Ekipman Lotları, Firmalar×2, Hizmet Kayıtları, Projeler, Süreç Adımları, Tahsisler | — | 0 |
| 1301365 | Tahsisler | Makine - sözleşme - kullanan firma tahsisi; tarih ve durum. Çakışma kontrolü için kritik. | 11/4/1 | Firmalar, Makineler, Sözleşmeler, Süreç Adımları | — | 1 |
| 1301366 | Sigortalar | Sigorta poliçeleri (makine veya sevkiyat bazlı); geçerlilik formülü içerir. | 14/3/2 | Firmalar, Makineler, Sevkiyatlar | — | 1 |

## 02 Finansman ve Nakit Akışı

| ID | Tablo | Amaç | Alan/İlişki/Formül | Bağlı olduğu | Formül girdisi | Okunma |
|---|---|---|---|---|---|---|
| 1299129 | Krediler | Finansman kredileri (kreditör, borçlu); teminat, belge ve geri ödeme planı özetleri. | 39/6/10 | Belgeler, Firmalar×2, Geri Ödeme Planı, Projeler, Teminatlar | Belgeler, Geri Ödeme Planı, Teminatlar | 1 |
| 1299130 | Teminatlar | Kredi teminatları (veren, lehtar, bildirim yapılan taraf). | 15/5/1 | Belgeler, Firmalar×3, Krediler | — | 4 |
| 1299134 | Kira ve Tahsilat Planı | Dönemsel kira ve tahsilat planı; stopaj, borç servisi, CFADS ve DSCR. | 18/3/7 | Firmalar, Geri Ödeme Planı, Projeler | Geri Ödeme Planı, Projeler | 1 |
| 1299135 | Giderler ve Vergiler | Proje / sevkiyat giderleri ve vergiler; USD karşılığı. | 12/3/1 | Firmalar, Projeler, Sevkiyatlar | — | 2 |
| 1299810 | Geri Ödeme Planı | Kredi geri ödeme satırları; kira planı ve gelir-gider dengesiyle bağlıdır. | 17/3/1 | Gelir Gider Dengesi, Kira ve Tahsilat Planı, Krediler | — | 5 |
| 1299815 | Gelir Gider Dengesi | Proje gelir-gider dengesi; DSCR, CFADS ve geri ödeme satırlarıyla bağlıdır. | 19/2/8 | Geri Ödeme Planı, Projeler | Geri Ödeme Planı | 0 |
| 1299816 | Kur Takibi | Kur kayıtları. Başka tabloyla bağlantısı yoktur (referans tablo). | 5/0/0 | — | — | 0 |

## 03 Lojistik ve Gümrük

| ID | Tablo | Amaç | Alan/İlişki/Formül | Bağlı olduğu | Formül girdisi | Okunma |
|---|---|---|---|---|---|---|
| 1299131 | Sevkiyatlar | Sevkiyat kayıtları; taşıyıcı, gümrük, belge ve taşıma sigortası bağlantıları. | 27/8/7 | Belgeler×2, Ekipman Lotları, Firmalar, Giderler ve Vergiler, Gümrük İşlemleri, Projeler, Sigortalar | Belgeler, Ekipman Lotları, Giderler ve Vergiler, Gümrük İşlemleri | 1 |
| 1299132 | Gümrük İşlemleri | Beyanname bazlı gümrük vergisi ve KDV hesapları; muafiyet bağlantısı. | 20/3/7 | Firmalar, Muafiyetler ve Teşvikler, Sevkiyatlar | — | 1 |
| 1299812 | Muafiyetler ve Teşvikler | Proje muafiyet ve teşvik kayıtları; gümrük işlemleriyle bağlıdır. | 10/2/0 | Gümrük İşlemleri, Projeler | — | 0 |

## 04 Belge ve Süreç

| ID | Tablo | Amaç | Alan/İlişki/Formül | Bağlı olduğu | Formül girdisi | Okunma |
|---|---|---|---|---|---|---|
| 1299133 | Belgeler | Belge kayıtları ve dosya ekleri. Pek çok tablonun kanıt belgesidir; Dosya Kontrolü formülü burada. | 31/10/5 | Krediler, Makineler×2, Projeler, Sevkiyatlar×2, Sözleşmeler, Süreç Adımları, Teminatlar, İmalat ve Tedarik | — | 4 |
| 1299137 | Süreç Adımları | Süreç / olay adımları (varlık olayları dahil); kanıt belgesi ve sorumlu firma. | 27/6/5 | Belgeler, Firmalar, Makineler, Projeler, Sözleşmeler, Tahsisler | — | 2 |
| 1299811 | Yazışmalar | Firmalar arası yazışma kayıtları. | 12/3/0 | Firmalar×2, Projeler | — | 0 |

## 05 Senaryo Motoru

| ID | Tablo | Amaç | Alan/İlişki/Formül | Bağlı olduğu | Formül girdisi | Okunma |
|---|---|---|---|---|---|---|
| 1303465 | Senaryolar | Senaryo ana kaydı (finansman, mülkiyet, ithalat, çıkış modeli, kur varsayımı); alt senaryo tablolarını bağlar. | 27/10/0 | Firmalar×4, Projeler, Senaryo Değerlendirme, Senaryo Finansman Dilimleri, Senaryo Gelir Gider Akışı, Senaryo Varsayımları, Senaryo Ödeme Planı | — | 0 |
| 1303466 | Senaryo Finansman Dilimleri | Senaryonun finansman dilimleri (araç, anapara, faiz, vade, erteleme, balloon, komisyon). | 31/3/0 | Firmalar, Senaryo Ödeme Planı, Senaryolar | — | 0 |
| 1303467 | Senaryo Ödeme Planı | Senaryo ödeme planı satırları; toplam borç servisi formülü. | 22/3/1 | Senaryo Finansman Dilimleri, Senaryo Gelir Gider Akışı, Senaryolar | — | 1 |
| 1303468 | Senaryo Varsayımları | Senaryo varsayımları (parametre, değer, kaynak, doğrulama durumu). | 12/1/0 | Senaryolar | — | 0 |
| 1303469 | Senaryo Değerlendirme | Senaryo değerlendirme metrikleri (IRR, NPV, DSCR, net kâr vb.). | 10/1/0 | Senaryolar | — | 0 |
| 1303470 | Senaryo Gelir Gider Akışı | Senaryo gelir-gider akışı; toplam gelir/gider, net nakit akışı, borç servisi ve DSCR formülleri. | 25/2/5 | Senaryo Ödeme Planı, Senaryolar | Senaryo Ödeme Planı | 0 |

## 06 SYS Yönetim

| ID | Tablo | Amaç | Alan/İlişki/Formül | Bağlı olduğu | Formül girdisi | Okunma |
|---|---|---|---|---|---|---|
| 1301798 | SYS-001 \| Sistem Ana İndeksi | SYS-001 Sistem Ana İndeksi: aktif sürüm, AI başlangıç talimatı, yedekleme politikası. | 15/2/0 | SYS-002 \| Sistem Sürüm Kayıtları, SYS-006 \| Sistem Denetim ve Testleri | — | 0 |
| 1301799 | SYS-002 \| Sistem Sürüm Kayıtları | SYS-002 Sistem Sürüm Kayıtları: sürüm kodu, tablo/alan/ilişki/formül sayıları, eklenen/değişen/kaldırılan. | 24/8/0 | SYS-001 \| Sistem Ana İndeksi, SYS-003 \| Sistem Yedek Paketleri, SYS-004 \| Sistem Değişiklik Günlüğü, SYS-005 \| Sistem Karar Kayıtları, SYS-006 \| Sistem Denetim ve Testleri, SYS-007 \| Sistem Geri Yükleme ve Klonlama, SYS-008 \| Sistem Görev ve Geliştirme Takibi, SYS-010 \| AI Oturum ve Devir Kayıtları | — | 0 |
| 1301800 | SYS-003 \| Sistem Yedek Paketleri | SYS-003 Sistem Yedek Paketleri: yedek türü, konum, bütünlük ve geri yükleme testi. | 18/2/0 | SYS-002 \| Sistem Sürüm Kayıtları, SYS-007 \| Sistem Geri Yükleme ve Klonlama | — | 0 |
| 1301801 | SYS-004 \| Sistem Değişiklik Günlüğü | SYS-004 Sistem Değişiklik Günlüğü: yapısal / riskli değişikliklerin önceki-yeni durumu ve geri alma talimatı. | 17/3/0 | SYS-002 \| Sistem Sürüm Kayıtları, SYS-005 \| Sistem Karar Kayıtları, SYS-008 \| Sistem Görev ve Geliştirme Takibi | — | 0 |
| 1301802 | SYS-005 \| Sistem Karar Kayıtları | SYS-005 Sistem Karar Kayıtları: kullanıcı onaylı kalıcı kararlar. | 16/4/0 | SYS-002 \| Sistem Sürüm Kayıtları, SYS-004 \| Sistem Değişiklik Günlüğü, SYS-008 \| Sistem Görev ve Geliştirme Takibi, SYS-010 \| AI Oturum ve Devir Kayıtları | — | 0 |
| 1301803 | SYS-006 \| Sistem Denetim ve Testleri | SYS-006 Sistem Denetim ve Testleri: denetim kapsamı, bulgu sayıları (P0-P3), rapor. | 21/5/0 | SYS-001 \| Sistem Ana İndeksi, SYS-002 \| Sistem Sürüm Kayıtları, SYS-008 \| Sistem Görev ve Geliştirme Takibi, SYS-010 \| AI Oturum ve Devir Kayıtları, Table | — | 0 |
| 1301804 | SYS-007 \| Sistem Geri Yükleme ve Klonlama | SYS-007 Geri Yükleme ve Klonlama: yedekten kurulum işlemleri ve doğrulama sonuçları. | 19/2/0 | SYS-002 \| Sistem Sürüm Kayıtları, SYS-003 \| Sistem Yedek Paketleri | — | 0 |
| 1301805 | SYS-008 \| Sistem Görev ve Geliştirme Takibi | SYS-008 Görev ve Geliştirme Takibi: öncelik, durum, sorumlu, tamamlanma kriteri. | 21/5/0 | SYS-002 \| Sistem Sürüm Kayıtları, SYS-004 \| Sistem Değişiklik Günlüğü, SYS-005 \| Sistem Karar Kayıtları, SYS-006 \| Sistem Denetim ve Testleri, SYS-010 \| AI Oturum ve Devir Kayıtları | — | 0 |
| 1301819 | SYS-009 \| AI İşletim Protokolü | SYS-009 AI İşletim Protokolü: giriş, çalışma, çıkış, yasaklar. Protokolün TEK KAYNAĞI. | 13/0/0 | — | — | 0 |
| 1301820 | SYS-010 \| AI Oturum ve Devir Kayıtları | SYS-010 AI Oturum ve Devir Kayıtları: her oturum için tek kayıt; sonraki AI için talimat. | 24/5/0 | SYS-002 \| Sistem Sürüm Kayıtları, SYS-005 \| Sistem Karar Kayıtları, SYS-006 \| Sistem Denetim ve Testleri, SYS-008 \| Sistem Görev ve Geliştirme Takibi, SYS-011 \| AI Çalışma ve Olay Günlüğü | — | 0 |
| 1301821 | SYS-011 \| AI Çalışma ve Olay Günlüğü | SYS-011 AI Çalışma ve Olay Günlüğü: yalnızca hata, geri alma, beklenmedik durum, kullanıcı talebi. | 18/1/0 | SYS-010 \| AI Oturum ve Devir Kayıtları | — | 0 |

## 07 Eski / Referans

| ID | Tablo | Amaç | Alan/İlişki/Formül | Bağlı olduğu | Formül girdisi | Okunma |
|---|---|---|---|---|---|---|
| 620460 | Table | Eski AI denetim raporu kaydı (SYS-006 ile bağlı). Korunur, silinmez. | 8/1/0 | SYS-006 \| Sistem Denetim ve Testleri | — | 0 |

## 08 CHAT (konu ve sohbet hafızası)

| ID | Tablo | Amaç | Alan/İlişki/Formül | Bağlı olduğu | Formül girdisi | Okunma |
|---|---|---|---|---|---|---|
| 1306063 | CHAT-001 \| Konular | CHAT-001 Konular: her konu bir satır (durum, güncel özet, açık noktalar, kararlar, arşiv yolu). Kural: 05_A... | 14/2/0 | CHAT-002 \| Notlar, CHAT-003 \| Sorular | — | 0 |
| 1306064 | CHAT-002 \| Notlar | CHAT-002 Notlar: konunun içindeki temizlenmiş kayıtlar (kullanıcı sözü, AI görüşü, karar adayı, karar); her... | 8/1/0 | CHAT-001 \| Konular | — | 0 |
| 1306065 | CHAT-003 \| Sorular | CHAT-003 Sorular: aynı soruya her AI'nın bağımsız cevabı (ayrı kolon), sentez ve iş emri taslağı, kullanıcı... | 14/1/0 | CHAT-001 \| Konular | — | 0 |

## Merkez tablolar (en çok okunan)

- **Geri Ödeme Planı** — 5 çapraz formül referansı
- **Belgeler** — 4 çapraz formül referansı
- **Teminatlar** — 4 çapraz formül referansı
- **Ekipman Lotları** — 3 çapraz formül referansı
- **Giderler ve Vergiler** — 2 çapraz formül referansı

## Bağlantısız tablolar

- Kur Takibi
- SYS-009 | AI İşletim Protokolü
