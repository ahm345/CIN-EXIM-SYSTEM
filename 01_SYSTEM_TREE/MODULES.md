# Modül → Tablo Haritası

"Şu işi yapacağım; hangi tablolara bakmalıyım?" sorusunun hızlı cevabı. Tablo ID'leri ve alanlar için `02_DATABASE_SCHEMA/TABLES.md`, komşu tablolar için `RELATION_MAP.md` (bölüm 5), formül metinleri için `FORMULAS.md`.

Her modülde **"Önce bak"** sütunu, bir geliştirme isteğinde okunması gereken en az kümeyi verir. Bunun dışındaki tablolara yalnızca etki analizi gerektirirse git.

| # | Modül | Tablolar (ID) | Başlıca formüller | Önce bak |
|---|---|---|---|---|
| 1 | **Firmalar ve roller** | Firmalar (1299125) | – | `RELATION_MAP.md` bölüm 6 (rol alanları) |
| 2 | **Proje** | Projeler (1299126) | Peşinat USD, Kredi Tutarı USD, Lot Toplamı USD, Toplam Kredi USD, Eksik Belge Sayısı, Süreç İlerleme, Toplam Vergi USD (Gümrük), Toplam Maliyet USD (vergi dahil) | Projeler formülleri neredeyse tüm modüllerden veri toplar; değişiklikte önce `FORMULAS.md` |
| 3 | **Ekipman, imalat, tedarik** | Ekipman Lotları (1299127), İmalat ve Tedarik (1299128) | Toplam USD, Lot Operasyon Kontrolü, Üretim Süresi (Gün), Tedarik Kontrolü | Lot → Makineler / Sevkiyatlar / Sözleşmeler bağları |
| 4 | **Makine ve varlık yaşam döngüsü** | Makineler (1299813), Tahsisler (1301365), Sigortalar (1301366), Süreç Adımları (1299137), Belgeler (1299133) | Operasyon Kontrolü, Varlık Yaşam Döngüsü Kontrolü, Aktif Tahsis Sayısı, Geçerli Sigorta Sayısı, Tahsis Kontrolü, Sigorta Kontrolü, Varlık Olay Kontrolü | **KNOWN_ISSUES KI-01, KI-06**; mülkiyet ve geri alma alanları Makineler'dedir |
| 5 | **Sözleşmeler ve tahsis** | Sözleşmeler (1301364), Tahsisler (1301365), Hizmet Kayıtları (1299814) | Alt Kiralama Kontrolü, Sözleşme Kontrolü | Sözleşmeler kendine bağlanır (`Ana Sözleşme`) |
| 6 | **Lojistik ve gümrük** | Sevkiyatlar (1299131), Gümrük İşlemleri (1299132), Muafiyetler ve Teşvikler (1299812), Giderler ve Vergiler (1299135) | Sevkiyat Kontrolü, Toplam Vergi USD, Net Gümrük Vergisi USD, Net KDV Tahakkuk USD, Net Vergi USD, USD Karşılığı | Gümrük hesapları beyanname bazlıdır |
| 7 | **Finansman** | Krediler (1299129), Teminatlar (1299130), Geri Ödeme Planı (1299810) | Planlanan Anapara/Faiz/Toplam Borç Servisi USD, Anapara Mutabakatı, Teminat Kontrolü, Taksit USD | Geri ödeme satırları kira planı ve gelir-gider dengesine de bağlıdır |
| 8 | **Kira, tahsilat, nakit akışı** | Kira ve Tahsilat Planı (1299134), Gelir Gider Dengesi (1299815), Kur Takibi (1299816) | Stopaj USD, CFADS USD, Borç Servisi USD, DSCR, DSCR Uyarısı | **KNOWN_ISSUES KI-03** (DSCR tutarsızlığı); Kur Takibi bağlantısızdır |
| 9 | **Senaryo motoru** | Senaryolar (1303465), Senaryo Finansman Dilimleri (1303466), Senaryo Ödeme Planı (1303467), Senaryo Varsayımları (1303468), Senaryo Değerlendirme (1303469), Senaryo Gelir Gider Akışı (1303470) | Toplam Borç Servisi, Toplam Gelir/Gider, Net Nakit Akışı, Borç Servisi, DSCR | **KI-03, KI-04**; tablolar şu an boş; erteleme alanları şemada hazır (Anapara Erteleme (Ay), Faiz Erteleme (Ay), Erteleme Faizi) |
| 10 | **Bakım ve hizmet** | Bakım ve Yedek Parça (1299136), Hizmet Kayıtları (1299814) | Toplam USD, Bakım Kontrolü, Tutar USD | – |
| 11 | **Belge ve yazışma** | Belgeler (1299133), Yazışmalar (1299811) | Geçerli mi, Gerekli Eksik/Tamam, Dosya Kontrolü | **KI-02**; belge kanıtı = dosya ekli + Durum `Tamam` (`Dosya Kontrolü` doğru referanstır) |
| 12 | **SYS yönetim** | SYS-001 … SYS-011 (1301798–1301805, 1301819–1301821), Table (620460) | – | `05_AI_PROTOCOLS/`; SYS yazma izni ayrıdır |

## Geliştirme isteği → modül eşlemesi (örnekler)

| İstek | Modüller |
|---|---|
| "Seller's Credit için 12 ay anapara ödemesiz, 5 yıl vadeli alternatifler" | 9 (Senaryo Finansman Dilimleri, Ödeme Planı), 7 (Krediler / Geri Ödeme Planı mevcut planı bozmadan), 8 (DSCR) |
| "Makine geri alma ve yeniden tahsis süreci" | 4 (Makineler, Süreç Adımları, Belgeler), 5 |
| "Yeni ülke / yeni iş modeli ekle (ticaret, ithalat, ihracat)" | 1, 2, 9; önce `FEATURE_REQUEST_WORKFLOW.md` etki analizi |
| "Belge eksikliği raporu" | 11, 4 |
| "Gümrük vergisi / KDV hesabı değişti" | 6, 2 (Projeler toplam formülleri) |

Yeni modül veya tablo eklendiğinde bu dosya ve `tools/build_schema_docs.py` içindeki `META` sözlüğü birlikte güncellenir.
