# Alan Sözlüğü

> Otomatik üretildi (`tools/build_field_dictionary.py`). Şema kaynağı: INVENTORY.json, 2026-11-07T20:44:51+03:00. Çelişkide canlı Baserow geçerlidir. Satır verisi yoktur.

**653 benzersiz alan adı · 107 tanesi ≥2 tabloda ortak · 8 tanesi farklı türlerde kullanılıyor · 85 seçmeli değer listesi**

**Anlamı kayıtlı alan adı: 2** (bunların 1 tanesi ortak alan; ortak alanların 106 tanesinin anlamı yok). Anlamı belgelerde kanıtlanmayan alan için `Bilinmiyor / Doğrulanmadı` yazılır; anlam uydurulmaz. Tablo bazında alan listesi: `TABLES.md`; formül metinleri: `FORMULAS.md`.

## 1. Ortak alanlar (aynı ad, ≥2 tablo)

| Alan | Tür | Tablo | Tablolar | Anlam |
|---|---|---|---|---|
| Gerçek Veri | boolean | 26 | Bakım ve Yedek Parça, Belgeler, Ekipman Lotları, Firmalar, Geri Ödeme Planı, Giderler ve Vergiler (+20) | Kaydın DEMO mu gerçek mi olduğunu ayıran boolean işaret (DEMO / REFERENCE / REAL ayrımı). `false` = DEMO: Sözleşmeler `Sözleşme Kontrolü` formülü `Gerçek Veri = false` ise 'DEMO – HUKUKİ İNCELEME GEREKLİ' döndürür. REFERENCE kayıtların bu tek boolean ile nasıl ayrıldığı belgelenmemiştir: Doğrulanmadı. _(kaynak: 03_BUSINESS_RULES/BUSINESS_RULES.md R-01; 02_DATABASE_SCHEMA/FORMULAS.md (Sözleşme Kontrolü))_ |
| Durum | formula, single_select, text | 17 | Bakım ve Yedek Parça, Belgeler, CHAT-001 \| Konular, Ekipman Lotları, Geri Ödeme Planı, Gümrük İşlemleri (+11) | Bilinmiyor / Doğrulanmadı |
| Proje | link_row → Projeler | 14 | Bakım ve Yedek Parça, Belgeler, Ekipman Lotları, Gelir Gider Dengesi, Giderler ve Vergiler, Hizmet Kayıtları (+8) | İlişki alanı → Projeler. Anlam: Bilinmiyor / Doğrulanmadı |
| Tür | single_select | 9 | Bakım ve Yedek Parça, Belgeler, Gümrük İşlemleri, Krediler, Muafiyetler ve Teşvikler, Sigortalar (+3) | Bilinmiyor / Doğrulanmadı |
| Tarih | date | 7 | Bakım ve Yedek Parça, Belgeler, CHAT-002 \| Notlar, Giderler ve Vergiler, Hizmet Kayıtları, Kur Takibi (+1) | Bilinmiyor / Doğrulanmadı |
| Not | long_text | 6 | Belgeler, Firmalar, Süreç Adımları, Tahsisler, Teminatlar, İmalat ve Tedarik | Bilinmiyor / Doğrulanmadı |
| Notlar | long_text | 6 | Projeler, SYS-001 \| Sistem Ana İndeksi, Senaryo Finansman Dilimleri, Senaryo Gelir Gider Akışı, Senaryo Varsayımları, Senaryo Ödeme Planı | Bilinmiyor / Doğrulanmadı |
| SYS-002 \| Sistem Sürüm Kayıtları | link_row → SYS-002 \\\| Sistem Sürüm Kayıtları | 6 | SYS-003 \| Sistem Yedek Paketleri, SYS-004 \| Sistem Değişiklik Günlüğü, SYS-005 \| Sistem Karar Kayıtları, SYS-006 \| Sistem Denetim ve Testleri, SYS-007 \| Sistem Geri Yükleme ve Klonlama, SYS-008 \| Sistem Görev ve Geliştirme Takibi | İlişki alanı → SYS-002 \/ Sistem Sürüm Kayıtları. Anlam: Bilinmiyor / Doğrulanmadı |
| Senaryo | link_row, text → Senaryolar | 6 | Gelir Gider Dengesi, Senaryo Değerlendirme, Senaryo Finansman Dilimleri, Senaryo Gelir Gider Akışı, Senaryo Varsayımları, Senaryo Ödeme Planı | İlişki alanı → Senaryolar. Anlam: Bilinmiyor / Doğrulanmadı |
| Süreç Adımları | link_row → Süreç Adımları | 6 | Belgeler, Firmalar, Makineler, Projeler, Sözleşmeler, Tahsisler | İlişki alanı → Süreç Adımları. Anlam: Bilinmiyor / Doğrulanmadı |
| Belgeler | link_row → Belgeler | 5 | Krediler, Projeler, Sevkiyatlar, Sözleşmeler, Teminatlar | İlişki alanı → Belgeler. Anlam: Bilinmiyor / Doğrulanmadı |
| Makine | link_row → Makineler | 5 | Bakım ve Yedek Parça, Hizmet Kayıtları, Sigortalar, Süreç Adımları, Tahsisler | İlişki alanı → Makineler. Anlam: Bilinmiyor / Doğrulanmadı |
| Para Birimi | single_select | 5 | Giderler ve Vergiler, Senaryo Finansman Dilimleri, Senaryo Gelir Gider Akışı, Senaryolar, Sözleşmeler | Bilinmiyor / Doğrulanmadı |
| Sevkiyatlar | link_row → Sevkiyatlar | 5 | Belgeler, Ekipman Lotları, Firmalar, Projeler, Sigortalar | İlişki alanı → Sevkiyatlar. Anlam: Bilinmiyor / Doğrulanmadı |
| Başlangıç | date | 4 | Sigortalar, Sözleşmeler, Tahsisler, Teminatlar | Bilinmiyor / Doğrulanmadı |
| Bitiş | date | 4 | Sigortalar, Sözleşmeler, Tahsisler, Teminatlar | Bilinmiyor / Doğrulanmadı |
| Dönem | text | 4 | Gelir Gider Dengesi, Geri Ödeme Planı, Kira ve Tahsilat Planı, Senaryo Değerlendirme | Bilinmiyor / Doğrulanmadı |
| Hizmet Kayıtları | link_row → Hizmet Kayıtları | 4 | Firmalar, Makineler, Projeler, Sözleşmeler | İlişki alanı → Hizmet Kayıtları. Anlam: Bilinmiyor / Doğrulanmadı |
| Oluşturulma Zamanı | created_on | 4 | CHAT-001 \| Konular, CHAT-002 \| Notlar, CHAT-003 \| Sorular, SYS-011 \| AI Çalışma ve Olay Günlüğü | Bilinmiyor / Doğrulanmadı |
| SYS-010 \| AI Oturum ve Devir Kayıtları | link_row → SYS-010 \\\| AI Oturum ve Devir Kayıtları | 4 | SYS-002 \| Sistem Sürüm Kayıtları, SYS-005 \| Sistem Karar Kayıtları, SYS-006 \| Sistem Denetim ve Testleri, SYS-008 \| Sistem Görev ve Geliştirme Takibi | İlişki alanı → SYS-010 \/ AI Oturum ve Devir Kayıtları. Anlam: Bilinmiyor / Doğrulanmadı |
| Son Değişiklik Zamanı | last_modified | 4 | CHAT-001 \| Konular, CHAT-002 \| Notlar, CHAT-003 \| Sorular, SYS-011 \| AI Çalışma ve Olay Günlüğü | Bilinmiyor / Doğrulanmadı |
| Sözleşmeler | link_row → Sözleşmeler | 4 | Belgeler, Ekipman Lotları, Firmalar, Projeler | İlişki alanı → Sözleşmeler. Anlam: Bilinmiyor / Doğrulanmadı |
| Bakım ve Yedek Parça | link_row → Bakım ve Yedek Parça | 3 | Ekipman Lotları, Makineler, Projeler | İlişki alanı → Bakım ve Yedek Parça. Anlam: Bilinmiyor / Doğrulanmadı |
| Başlangıç Tarihi | date | 3 | Projeler, SYS-007 \| Sistem Geri Yükleme ve Klonlama, SYS-010 \| AI Oturum ve Devir Kayıtları | Bilinmiyor / Doğrulanmadı |
| DSCR | formula | 3 | Gelir Gider Dengesi, Kira ve Tahsilat Planı, Senaryo Gelir Gider Akışı | Bilinmiyor / Doğrulanmadı |
| Giderler ve Vergiler | link_row → Giderler ve Vergiler | 3 | Firmalar, Projeler, Sevkiyatlar | İlişki alanı → Giderler ve Vergiler. Anlam: Bilinmiyor / Doğrulanmadı |
| Gümrük Beyan Sahibi | link_row → Firmalar | 3 | Makineler, Projeler, Senaryolar | İlişki alanı → Firmalar. Anlam: Bilinmiyor / Doğrulanmadı |
| Gümrük İşlemleri | link_row → Gümrük İşlemleri | 3 | Firmalar, Muafiyetler ve Teşvikler, Sevkiyatlar | İlişki alanı → Gümrük İşlemleri. Anlam: Bilinmiyor / Doğrulanmadı |
| Incoterm | single_select | 3 | Projeler, Senaryolar, Sevkiyatlar | Bilinmiyor / Doğrulanmadı |
| Kira ve Tahsilat Planı | link_row → Kira ve Tahsilat Planı | 3 | Firmalar, Geri Ödeme Planı, Projeler | İlişki alanı → Kira ve Tahsilat Planı. Anlam: Bilinmiyor / Doğrulanmadı |
| Konu | link_row, text → CHAT-001 \\\| Konular | 3 | CHAT-002 \| Notlar, CHAT-003 \| Sorular, Yazışmalar | İlişki alanı → CHAT-001 \/ Konular. Anlam: Bilinmiyor / Doğrulanmadı |
| Kredi | link_row → Krediler | 3 | Belgeler, Geri Ödeme Planı, Teminatlar | İlişki alanı → Krediler. Anlam: Bilinmiyor / Doğrulanmadı |
| Lot | link_row → Ekipman Lotları | 3 | Bakım ve Yedek Parça, Makineler, İmalat ve Tedarik | İlişki alanı → Ekipman Lotları. Anlam: Bilinmiyor / Doğrulanmadı |
| Makineler | link_row → Makineler | 3 | Belgeler, Ekipman Lotları, Firmalar | İlişki alanı → Makineler. Anlam: Bilinmiyor / Doğrulanmadı |
| Sevkiyat | link_row → Sevkiyatlar | 3 | Belgeler, Giderler ve Vergiler, Gümrük İşlemleri | İlişki alanı → Sevkiyatlar. Anlam: Bilinmiyor / Doğrulanmadı |
| Sözleşme | link_row → Sözleşmeler | 3 | Hizmet Kayıtları, Süreç Adımları, Tahsisler | İlişki alanı → Sözleşmeler. Anlam: Bilinmiyor / Doğrulanmadı |
| Tahsisler | link_row → Tahsisler | 3 | Firmalar, Makineler, Sözleşmeler | İlişki alanı → Tahsisler. Anlam: Bilinmiyor / Doğrulanmadı |
| Test Sonucu | long_text, text | 3 | SYS-002 \| Sistem Sürüm Kayıtları, SYS-004 \| Sistem Değişiklik Günlüğü, SYS-008 \| Sistem Görev ve Geliştirme Takibi | Bilinmiyor / Doğrulanmadı |
| Tutar USD | formula, number | 3 | Hizmet Kayıtları, Krediler, Teminatlar | Bilinmiyor / Doğrulanmadı |
| Vade Tarihi | date | 3 | Geri Ödeme Planı, Kira ve Tahsilat Planı, Senaryo Ödeme Planı | Bilinmiyor / Doğrulanmadı |
| İmalat ve Tedarik | link_row → İmalat ve Tedarik | 3 | Belgeler, Ekipman Lotları, Firmalar | İlişki alanı → İmalat ve Tedarik. Anlam: Bilinmiyor / Doğrulanmadı |
| İthalatçı Firma | link_row → Firmalar | 3 | Makineler, Projeler, Senaryolar | İlişki alanı → Firmalar. Anlam: Bilinmiyor / Doğrulanmadı |
| AI / Model | text | 2 | SYS-010 \| AI Oturum ve Devir Kayıtları, SYS-011 \| AI Çalışma ve Olay Günlüğü | Bilinmiyor / Doğrulanmadı |
| Alınan Kararlar | long_text | 2 | CHAT-001 \| Konular, SYS-010 \| AI Oturum ve Devir Kayıtları | Bilinmiyor / Doğrulanmadı |
| Anapara Ödeme Tipi | single_select | 2 | Krediler, Senaryo Finansman Dilimleri | Bilinmiyor / Doğrulanmadı |
| Aşama | single_select | 2 | Projeler, Süreç Adımları | Bilinmiyor / Doğrulanmadı |
| Belge Sayısı | formula | 2 | Krediler, Sevkiyatlar | Bilinmiyor / Doğrulanmadı |
| Bitiş Tarihi | date | 2 | SYS-007 \| Sistem Geri Yükleme ve Klonlama, SYS-010 \| AI Oturum ve Devir Kayıtları | Bilinmiyor / Doğrulanmadı |
| Borç Servisi USD | formula | 2 | Gelir Gider Dengesi, Kira ve Tahsilat Planı | Bilinmiyor / Doğrulanmadı |
| CFADS USD | formula | 2 | Gelir Gider Dengesi, Kira ve Tahsilat Planı | Bilinmiyor / Doğrulanmadı |
| Dönem Başlangıcı | date | 2 | Senaryo Gelir Gider Akışı, Senaryo Ödeme Planı | Bilinmiyor / Doğrulanmadı |
| Dönem No | number | 2 | Senaryo Gelir Gider Akışı, Senaryo Ödeme Planı | Bilinmiyor / Doğrulanmadı |
| Ekipman Lotları | link_row → Ekipman Lotları | 2 | Firmalar, Projeler | İlişki alanı → Ekipman Lotları. Anlam: Bilinmiyor / Doğrulanmadı |
| Eksik Belge | formula | 2 | Krediler, Sevkiyatlar | Bilinmiyor / Doğrulanmadı |
| Faiz Başlangıç Tarihi | date | 2 | Krediler, Senaryo Finansman Dilimleri | Bilinmiyor / Doğrulanmadı |
| Faiz Tipi | single_select | 2 | Krediler, Senaryo Finansman Dilimleri | Bilinmiyor / Doğrulanmadı |
| Fiili Kullanıcı | link_row → Firmalar | 2 | Makineler, Senaryolar | İlişki alanı → Firmalar. Anlam: Bilinmiyor / Doğrulanmadı |
| Firma | link_row → Firmalar | 2 | Giderler ve Vergiler, Hizmet Kayıtları | İlişki alanı → Firmalar. Anlam: Bilinmiyor / Doğrulanmadı |
| Gelir Gider Dengesi | link_row → Gelir Gider Dengesi | 2 | Geri Ödeme Planı, Projeler | İlişki alanı → Gelir Gider Dengesi. Anlam: Bilinmiyor / Doğrulanmadı |
| Geçerli Incoterm | multiple_select | 2 | Belgeler, Süreç Adımları | Bilinmiyor / Doğrulanmadı |
| Geçerli mi | formula | 2 | Belgeler, Süreç Adımları | Bilinmiyor / Doğrulanmadı |
| Geçerli Çıkış Modeli | multiple_select | 2 | Belgeler, Süreç Adımları | Bilinmiyor / Doğrulanmadı |
| Geçerli Ödeme Yöntemi | multiple_select | 2 | Belgeler, Süreç Adımları | Bilinmiyor / Doğrulanmadı |
| Hukuki Doğrulama | single_select | 2 | Sözleşmeler, Teminatlar | Bilinmiyor / Doğrulanmadı |
| Hukuki Malik | link_row → Firmalar | 2 | Makineler, Senaryolar | İlişki alanı → Firmalar. Anlam: Bilinmiyor / Doğrulanmadı |
| Kapsam | long_text | 2 | Muafiyetler ve Teşvikler, SYS-006 \| Sistem Denetim ve Testleri | Bilinmiyor / Doğrulanmadı |
| Kategori | single_select | 2 | Giderler ve Vergiler, Senaryo Varsayımları | Bilinmiyor / Doğrulanmadı |
| Kayıt | text | 2 | Hizmet Kayıtları, Kur Takibi | Bilinmiyor / Doğrulanmadı |
| Krediler | link_row → Krediler | 2 | Firmalar, Projeler | İlişki alanı → Krediler. Anlam: Bilinmiyor / Doğrulanmadı |
| Kullandırım Tarihi | date | 2 | Krediler, Senaryo Finansman Dilimleri | Bilinmiyor / Doğrulanmadı |
| Lotlar | link_row → Ekipman Lotları | 2 | Sevkiyatlar, Sözleşmeler | İlişki alanı → Ekipman Lotları. Anlam: Bilinmiyor / Doğrulanmadı |
| Mülkiyet Modeli | single_select | 2 | Projeler, Senaryolar | Bilinmiyor / Doğrulanmadı |
| Olay Tarihi | date | 2 | SYS-011 \| AI Çalışma ve Olay Günlüğü, Süreç Adımları | Bilinmiyor / Doğrulanmadı |
| Onay Durumu | single_select, text | 2 | CHAT-002 \| Notlar, SYS-004 \| Sistem Değişiklik Günlüğü | Bilinmiyor / Doğrulanmadı |
| Onaylayan | text | 2 | SYS-004 \| Sistem Değişiklik Günlüğü, SYS-007 \| Sistem Geri Yükleme ve Klonlama | Bilinmiyor / Doğrulanmadı |
| Oturum Kodu | text | 2 | SYS-010 \| AI Oturum ve Devir Kayıtları, SYS-011 \| AI Çalışma ve Olay Günlüğü | Bilinmiyor / Doğrulanmadı |
| Proje Incoterm | lookup | 2 | Belgeler, Süreç Adımları | Bilinmiyor / Doğrulanmadı |
| Proje Çıkış Modeli | lookup | 2 | Belgeler, Süreç Adımları | Bilinmiyor / Doğrulanmadı |
| Proje Ödeme Yöntemi | lookup | 2 | Belgeler, Süreç Adımları | Bilinmiyor / Doğrulanmadı |
| SPC İşletme Gideri USD | number | 2 | Gelir Gider Dengesi, Kira ve Tahsilat Planı | Bilinmiyor / Doğrulanmadı |
| SYS-001 \| Sistem Ana İndeksi | link_row → SYS-001 \\\| Sistem Ana İndeksi | 2 | SYS-002 \| Sistem Sürüm Kayıtları, SYS-006 \| Sistem Denetim ve Testleri | İlişki alanı → SYS-001 \/ Sistem Ana İndeksi. Anlam: Bilinmiyor / Doğrulanmadı |
| SYS-006 \| Sistem Denetim ve Testleri | link_row → SYS-006 \\\| Sistem Denetim ve Testleri | 2 | SYS-008 \| Sistem Görev ve Geliştirme Takibi, Table | İlişki alanı → SYS-006 \/ Sistem Denetim ve Testleri. Anlam: Bilinmiyor / Doğrulanmadı |
| SYS-008 \| Sistem Görev ve Geliştirme Takibi | link_row → SYS-008 \\\| Sistem Görev ve Geliştirme Takibi | 2 | SYS-004 \| Sistem Değişiklik Günlüğü, SYS-005 \| Sistem Karar Kayıtları | İlişki alanı → SYS-008 \/ Sistem Görev ve Geliştirme Takibi. Anlam: Bilinmiyor / Doğrulanmadı |
| Senaryo Finansman Dilimleri | link_row → Senaryo Finansman Dilimleri | 2 | Firmalar, Senaryolar | İlişki alanı → Senaryo Finansman Dilimleri. Anlam: Bilinmiyor / Doğrulanmadı |
| Senaryo Gelir Gider Akışı | link_row → Senaryo Gelir Gider Akışı | 2 | Senaryo Ödeme Planı, Senaryolar | İlişki alanı → Senaryo Gelir Gider Akışı. Anlam: Bilinmiyor / Doğrulanmadı |
| Senaryo Ödeme Planı | link_row → Senaryo Ödeme Planı | 2 | Senaryo Finansman Dilimleri, Senaryolar | İlişki alanı → Senaryo Ödeme Planı. Anlam: Bilinmiyor / Doğrulanmadı |
| Senaryolar | link_row → Senaryolar | 2 | Firmalar, Projeler | İlişki alanı → Senaryolar. Anlam: Bilinmiyor / Doğrulanmadı |
| Sigortalar | link_row → Sigortalar | 2 | Firmalar, Makineler | İlişki alanı → Sigortalar. Anlam: Bilinmiyor / Doğrulanmadı |
| Sorumlu | text | 2 | SYS-008 \| Sistem Görev ve Geliştirme Takibi, Süreç Adımları | Bilinmiyor / Doğrulanmadı |
| Stopaj Oranı | number | 2 | Gelir Gider Dengesi, Projeler | Bilinmiyor / Doğrulanmadı |
| Stopaj USD | formula | 2 | Gelir Gider Dengesi, Kira ve Tahsilat Planı | Bilinmiyor / Doğrulanmadı |
| Sürüm Durumu | text | 2 | SYS-001 \| Sistem Ana İndeksi, SYS-002 \| Sistem Sürüm Kayıtları | Bilinmiyor / Doğrulanmadı |
| Sürüm Kodu | text | 2 | SYS-002 \| Sistem Sürüm Kayıtları, SYS-003 \| Sistem Yedek Paketleri | Bilinmiyor / Doğrulanmadı |
| Sıra | number | 2 | Geri Ödeme Planı, Süreç Adımları | Bilinmiyor / Doğrulanmadı |
| Tahsis | link_row, text → Tahsisler | 2 | Süreç Adımları, Tahsisler | İlişki alanı → Tahsisler. Anlam: Bilinmiyor / Doğrulanmadı |
| Teminat | link_row, long_text → Teminatlar | 2 | Belgeler, Senaryo Finansman Dilimleri | İlişki alanı → Teminatlar. Anlam: Bilinmiyor / Doğrulanmadı |
| Teminatlar | link_row → Teminatlar | 2 | Firmalar, Krediler | İlişki alanı → Teminatlar. Anlam: Bilinmiyor / Doğrulanmadı |
| Tescil Sahibi | link_row → Firmalar | 2 | Makineler, Projeler | İlişki alanı → Firmalar. Anlam: Bilinmiyor / Doğrulanmadı |
| Toplam USD | formula | 2 | Bakım ve Yedek Parça, Ekipman Lotları | Bilinmiyor / Doğrulanmadı |
| Toplam Vergi USD | formula | 2 | Gümrük İşlemleri, Sevkiyatlar | Bilinmiyor / Doğrulanmadı |
| Tutar | number | 2 | Giderler ve Vergiler, Sözleşmeler | Bilinmiyor / Doğrulanmadı |
| Yazışmalar | link_row → Yazışmalar | 2 | Firmalar, Projeler | İlişki alanı → Yazışmalar. Anlam: Bilinmiyor / Doğrulanmadı |
| Çıkış Modeli | single_select | 2 | Projeler, Senaryolar | Bilinmiyor / Doğrulanmadı |
| Ödeme Durumu | single_select | 2 | Giderler ve Vergiler, Senaryo Ödeme Planı | Bilinmiyor / Doğrulanmadı |
| İlgili Karar | link_row → SYS-005 \\\| Sistem Karar Kayıtları | 2 | SYS-004 \| Sistem Değişiklik Günlüğü, SYS-008 \| Sistem Görev ve Geliştirme Takibi | İlişki alanı → SYS-005 \/ Sistem Karar Kayıtları. Anlam: Bilinmiyor / Doğrulanmadı |
| İlgili Kararlar | link_row → SYS-005 \\\| Sistem Karar Kayıtları | 2 | SYS-002 \| Sistem Sürüm Kayıtları, SYS-010 \| AI Oturum ve Devir Kayıtları | İlişki alanı → SYS-005 \/ Sistem Karar Kayıtları. Anlam: Bilinmiyor / Doğrulanmadı |
| İlgili Veritabanı | text | 2 | SYS-004 \| Sistem Değişiklik Günlüğü, SYS-011 \| AI Çalışma ve Olay Günlüğü | Bilinmiyor / Doğrulanmadı |

## 2. Aynı adı farklı türde kullanan alanlar

Aynı adlı alanın tablolar arasında farklı türde olması bakım riski taşır (formül, filtre, dışa aktarma). Bu liste bir **gözlemdir**; farkın kasıtlı olup olmadığı belgelenmemiştir.

| Alan | Tür → tablolar |
|---|---|
| Durum | **formula** → Sigortalar; **single_select** → Bakım ve Yedek Parça, Belgeler, CHAT-001 \| Konular, Ekipman Lotları (+11); **text** → SYS-009 \| AI İşletim Protokolü |
| Konu | **link_row** → CHAT-002 \| Notlar, CHAT-003 \| Sorular; **text** → Yazışmalar |
| Onay Durumu | **single_select** → CHAT-002 \| Notlar; **text** → SYS-004 \| Sistem Değişiklik Günlüğü |
| Senaryo | **link_row** → Senaryo Değerlendirme, Senaryo Finansman Dilimleri, Senaryo Gelir Gider Akışı, Senaryo Varsayımları (+1); **text** → Gelir Gider Dengesi |
| Tahsis | **link_row** → Süreç Adımları; **text** → Tahsisler |
| Teminat | **link_row** → Belgeler; **long_text** → Senaryo Finansman Dilimleri |
| Test Sonucu | **long_text** → SYS-008 \| Sistem Görev ve Geliştirme Takibi; **text** → SYS-002 \| Sistem Sürüm Kayıtları, SYS-004 \| Sistem Değişiklik Günlüğü |
| Tutar USD | **formula** → Hizmet Kayıtları; **number** → Krediler, Teminatlar |

## 3. Seçmeli alanların geçerli değerleri

Aynı ad ve aynı değer listesi birlikte gruplanır. Liste farklıysa aynı alan adı ayrı satırda görünür (tablolar arası tutarsızlık işareti).

| Alan | Tür | Tablolar | Değerler |
|---|---|---|---|
| Anapara Ödeme Sıklığı | single_select | Senaryo Finansman Dilimleri | Aylık · Üç Aylık · Altı Aylık · Yıllık · Vade Sonu · Özel |
| Anapara Ödeme Tipi | single_select | Senaryo Finansman Dilimleri | Eşit Anapara · Eşit Taksit · Balloon · Tek Ödeme · Düzensiz / Özel |
| Anapara Ödeme Tipi | single_select | Krediler | Eşit anapara · Eşit taksit (annuity) · Grace + amortisman · Bullet – vade sonunda · Balloon – balon ödemeli · Özel plan |
| Aşama | single_select | Projeler, Süreç Adımları | 1 Yapılandırma · 2 Eximbank / Sinosure Onayı · 3 Rehin ve Bridge · 4 İmalat · 5 Sevkiyat · 6 Gümrük ve Mülkiyet Devri · 7 İpotek Tescili · 8 Sahada İşletme |
| Doğrulama Durumu | single_select | Senaryo Varsayımları | Varsayım · Demo · Kaynak Bekliyor · Belgeyle Doğrulandı · Hukuk / Vergi Görüşü Gerekli |
| Durum | single_select | CHAT-001 \| Konular | Açık · Yarım · Bitti · Arşivlendi |
| Durum | single_select | Krediler | Başvuru · Onay Bekliyor · Onaylandı · Kullandırıldı · Kapandı |
| Durum | single_select | Muafiyetler ve Teşvikler | Başvurulacak · Başvuruda · Alındı · Reddedildi |
| Durum | single_select | Süreç Adımları | Bekliyor · Devam Ediyor · Tamam · Engelli |
| Durum | single_select | Belgeler | Eksik · Taslak · İmzada · Tamam |
| Durum | single_select | Gümrük İşlemleri | Hazırlanıyor · Sunuldu · Kapandı / Tamam · Sorunlu |
| Durum | single_select | Sevkiyatlar | Hazırlanıyor · Yolda · Khorgos'ta · Gümrükte · Teslim Edildi |
| Durum | single_select | Teminatlar | Hazırlanıyor · İmzalandı · Aktif · Çözüldü / Kaldırıldı |
| Durum | single_select | Tahsisler | Planlandı · Aktif · Sona Erdi |
| Durum | single_select | Kira ve Tahsilat Planı | Planlandı · Tahsil Edildi · Kısmi · Gecikti |
| Durum | single_select | Bakım ve Yedek Parça | Planlandı · Yapıldı · Bekliyor |
| Durum | single_select | Geri Ödeme Planı | Planlandı · Ödendi · Gecikti |
| Durum | single_select | Ekipman Lotları | Sipariş Verildi · İmalatta · Yüklemeye Hazır · Yolda · Khorgos Gümrüğünde · Teslim Alındı · İpotek Tescilli · Sahada Çalışıyor |
| Durum | single_select | Sözleşmeler | Taslak · İmzalandı · Aktif · Sona Erdi · Fesih |
| Durum | single_select | Makineler | Teslim Alındı · İpotek Tescilli · Sahada Çalışıyor · Arızalı |
| Durum (Seçmeli) | single_select | SYS-008 \| Sistem Görev ve Geliştirme Takibi | Açık · Bekliyor · Uygulandı – doğrulama bekliyor · Tamamlandı |
| Erteleme Faizi | single_select | Senaryo Finansman Dilimleri | Aylık ödenir · Kapitalize edilir · Vade sonunda ödenir · Tahakkuk yok · Özel kural |
| Etki | single_select | Muafiyetler ve Teşvikler | Stopaj 0 · Gümrük Vergisi Muaf · KDV İade · Diğer |
| Faiz Tipi | single_select | Krediler | Sabit · Değişken |
| Faiz Tipi | single_select | Senaryo Finansman Dilimleri | Sabit · Değişken · Endeks + Marj · Faizsiz · Komisyon Bazlı |
| Faiz Ödeme Sıklığı | single_select | Senaryo Finansman Dilimleri | Aylık · Üç Aylık · Altı Aylık · Yıllık · Vade Sonu · Özel |
| Fatura Durumu | single_select | Hizmet Kayıtları | Bekliyor · Faturalandı · Tahsil Edildi · İtirazlı |
| Fesih / İhtar Durumu | single_select | Sözleşmeler | Yok · İhtar Gönderildi · Temerrüt · Fesih Sürecinde · Feshedildi |
| Finansman Aracı | single_select | Senaryo Finansman Dilimleri | Eximbank Kredisi · Seller's Credit · Banka Nakit Kredisi · Bridge Kredi · Leasing · LC · SBLC · Banka Garantisi · Yuan Blokesi · Müşteri Avansı · Öz Kaynak · Varlık Rehni · Diğer / Kullanıcı Tanımlı |
| Geri Alma Aşaması | single_select | Makineler | Uygulanmaz · Ödeme Takibi · İhtar · Temerrüt Tespiti · Fesih / Hukuki İnceleme · Geri Alma Talebi · Teslim Alındı · İtiraz / Dava |
| Geri Alma Sonrası Durum | single_select | Makineler | Kontrol Bekliyor · Bakım Gerekli · Kiralamaya Hazır · Satışa Hazır · Hukuki Blokaj |
| Geçerli Incoterm | multiple_select | Belgeler, Süreç Adımları | EXW · FCA · FOB · CIF · CIP · DAP · DDP · Sınır Teslimi |
| Geçerli Çıkış Modeli | multiple_select | Belgeler, Süreç Adımları | A İç Leasing · B Operasyonel Kiralama · C Satış · D Finance Lease (SPC → TOO) |
| Geçerli Ödeme Yöntemi | multiple_select | Belgeler, Süreç Adımları | LC · TT · Escrow · Açık Hesap · Seller's Credit |
| Gün Sayım Esası | single_select | Senaryo Finansman Dilimleri | 30/360 · ACT/360 · ACT/365 · ACT/ACT · Belirtilmedi |
| Hesaplama Durumu | single_select | Senaryo Değerlendirme | Hesaplanmadı · Ön Hesap · Kontrol Edildi · Eksik Veri · Hata |
| Hesaplama Sonucu | single_select | Senaryolar | Hesaplanmadı · Başarılı · Eksik Veri · Hata |
| Hizmet | single_select | Hizmet Kayıtları | Yolcu Taşıma · Sahada Çalışma · Yedek Araç · Diğer |
| Hukuki Doğrulama | single_select | Sözleşmeler, Teminatlar | Gerekli · Yapıldı · Gerekmiyor |
| Incoterm | single_select | Projeler, Sevkiyatlar | DAP · CIF · FOB · EXW · DDP · FCA · CIP · Sınır Teslimi |
| Incoterm | single_select | Senaryolar | EXW · FCA · FOB · CIF · CIP · DAP · DDP · Diğer |
| Kategori | single_select | Senaryo Varsayımları | Finansman · Vergi / Gümrük · Kur · Lojistik · Mülkiyet · Kiralama / Satış · Operasyon · Hukuk / Uyum · Diğer |
| Kategori | single_select | Giderler ve Vergiler | Navlun / Taşıma · Sigorta / Sinosure Primi · Gümrük Vergisi · KDV · Banka / Faiz / Komisyon · Noter / Tescil · Danışmanlık / Hukuk · Bakım / Yedek Parça · Diğer |
| Kullanıcı Kararı | single_select | CHAT-003 \| Sorular | Bekliyor · Uygula · Geliştir · Beklet · Reddet |
| Kur Çifti | single_select | Kur Takibi | USD/CNY · USD/KZT · USD/EUR |
| Metrik | single_select | Senaryo Değerlendirme | Toplam Yatırım Maliyeti · Toplam Finansman Maliyeti · Toplam Vergi · İlk Nakit İhtiyacı · Toplam Gelir · Net Kâr · IRR · NPV · DSCR Min · DSCR Ortalama · Geri Ödeme Süresi · Hukuki Risk · Operasyonel Risk · Diğer |
| Mülkiyet Durumu | single_select | Makineler | Tedarikçide · Transit / Taşımada · Gümrükte · SPC mülkiyetinde · TOO mülkiyetinde · Üçüncü taraf mülkiyetinde · Uyuşmazlıkta |
| Mülkiyet Modeli | single_select | Senaryolar | SPC · TOO · Üçüncü Taraf · Ortak Mülkiyet · Diğer |
| Mülkiyet Modeli | single_select | Projeler | SPC (Varsayılan) · TOO · Üçüncü Taraf · Ortak Mülkiyet · Diğer |
| Mülkiyet Senaryosu | single_select | Makineler | A – SPC doğrudan ithalat ve mülkiyet · B – TOO ithalatı, sonra SPC devri · C – Üçüncü taraf mülkiyeti · D – Ortak mülkiyet · E – Diğer |
| Not Türü | single_select | CHAT-002 \| Notlar | Kullanıcı sözü · AI görüşü · Soru · Öneri · Karar adayı · Karar · Test sonucu · Özet |
| Onay Durumu | single_select | CHAT-002 \| Notlar | Onaysız · Kullanıcı onayladı · Reddedildi |
| Para Birimi | single_select | Senaryo Finansman Dilimleri, Senaryo Gelir Gider Akışı | USD · CNY · EUR · KZT · TRY |
| Para Birimi | single_select | Senaryolar | USD · CNY · EUR · KZT · TRY · Çoklu Para Birimi |
| Para Birimi | single_select | Giderler ve Vergiler, Sözleşmeler | USD · EUR · CNY · KZT · TRY |
| Rol | single_select | Firmalar | Alıcı / Nihai Gelir Kaynağı · Genel Yüklenici · SPC / Lessor · Operatör / Lessee (TOO) · Banka / Kreditör · Sigortacı · İmalatçı / Tedarikçi · Nakit Rehni Sahibi (Finansör) · Gümrük Müşaviri · Taşıyıcı / Lojistik · Servis / Bakım |
| Senaryo Durumu | single_select | Senaryolar | Taslak · Hesaplanıyor · Test Bekliyor · Karşılaştırmaya Hazır · Seçildi · Reddedildi · Arşiv |
| Senaryo Tipi | single_select | Senaryolar | Finansman · Mülkiyet / İthalat · Ticaret / Kiralama · Lojistik / Vergi · Birleşik Model · Kullanıcı Tanımlı |
| Soru Durumu | single_select | CHAT-003 \| Sorular | Açık · Cevaplar toplanıyor · Sentezlendi · Onaylandı · İptal |
| Taşıma Türü | single_select | Sevkiyatlar | Demiryolu · Karayolu · Deniz + Kara |
| Tür | single_select | Muafiyetler ve Teşvikler | AIFC Muafiyeti · KZ İthalat Muafiyeti · Gümrük Teşviki · DTT · Diğer |
| Tür | single_select | Krediler | Bridge Kredi (Peşinat) · Seller's Credit · Eximbank Destekli Kredi |
| Tür | single_select | Yazışmalar | E-posta · Resmi Yazı · Teklif · Sözleşme Taslak · Teknik Doküman |
| Tür | single_select | Bakım ve Yedek Parça | Periyodik Bakım · Yedek Parça · Arıza · Sigorta Hasarı |
| Tür | single_select | Sözleşmeler | Satış (Peşin) · Satış (Vadeli) · Finansal Leasing · Operasyonel Leasing · Kira · Alt Kiralama · Bakım / Teknik Servis · Araç Tahsis · Teminat / Depozito · Hizmet Alım (ÖMG–TOO) · Taşıma / Lojistik · Alt Yüklenici |
| Tür | single_select | Belgeler | Ticari Fatura · Paketleme Listesi · Demiryolu Konşimentosu (CIM/SMGS) · Menşe Şahadetnamesi · Sigorta Poliçesi · Gümrük Beyannamesi · Satış Sözleşmesi · Finance Lease Sözleşmesi · Hizmet Alım Sözleşmesi · Kredi Sözleşmesi · Rehin Sözleşmesi · İpotek Tescil Belgesi · Hukuki Görüş (Legal Opinion) · Notice of Assignment · Teslim Tutanağı · Sigorta Sertifikası (Satıcı) · Taşıma Sigortası Poliçesi (Alıcı) · İhracat Beyannamesi (Alıcı Adına) · LC Akreditif Talimatı · LC Belge Seti · Proforma Fatura · TT Dekontu · Escrow Hesap Sözleşmesi · Escrow Serbest Bırakma Onayı · Vade Taahhüdü / Aval · İç Leasing Sözleşmesi · Kira Sözleşmesi · Tax Ruling Yazısı · Satış Faturası · Devir Tutanağı · FAT / Kalite Kontrol Raporu · İhtarname / Tebligat Kanıtı · Fesih Bildirimi · Geri Alma Teslim Tutanağı · Ekspertiz / Durum Tespit Raporu · Yeniden Tahsis / Satış Onayı |
| Tür | single_select | Sigortalar | Zorunlu Trafik · Kasko · Nakliye / Taşıma · Üçüncü Şahıs Sorumluluk · İşveren / Personel Sorumluluk |
| Tür | single_select | Gümrük İşlemleri | Çin İhracat Beyannamesi · Kazakistan İthalat Beyannamesi |
| Tür | single_select | Teminatlar | Üçüncü Taraf Nakit Rehni · 1. Derece Ekipman İpoteği · Tahsilat Hesabı Rehni / Escrow · Kira Alacağı Temliki · Notice of Assignment · Sinosure Poliçesi |
| Vade Tanımı | single_select | Krediler | Toplam vade – kullandırım tarihinden · Ödemesiz dönem sonrası anapara vadesi |
| Varlık Olayı | single_select | Süreç Adımları | Tahsilat takibi · Vade gecikmesi · Temerrüt değerlendirmesi · İhtar gönderimi · Sözleşme fesih incelemesi · Geri alma talebi · Hukuki takip / icra · Fiili teslim alma · Durum tespiti / ekspertiz · Bakım ve onarım · Yeniden tahsis / satış |
| Varyant | single_select | Gelir Gider Dengesi | A İç Leasing · B Operasyonel Kiralama · C Satış · D Finance Lease (SPC → TOO) |
| Yanıt Durumu | single_select | Yazışmalar | Yanıt Bekliyor · Yanıtlandı · Takip Gerekli · Kapandı |
| Yön | single_select | Yazışmalar | SPC ↔ TOO · TOO ↔ ÖMG · SPC ↔ Eximbank · SPC ↔ Sinosure · SPC ↔ Tedarikçi · Diğer |
| Çıkış Modeli | single_select | Projeler | A İç Leasing · B Operasyonel Kiralama · C Satış · D Finance Lease (SPC → TOO) |
| Çıkış Modeli | single_select | Senaryolar | Finance Lease · Operating Lease · Satış · Hizmet / Kullanım · Alt Kiralama · Karma · Diğer |
| ÖMG Onayı | single_select | Hizmet Kayıtları | Bekliyor · Onaylandı · Faturalandı |
| Ödeme Durumu | single_select | Giderler ve Vergiler | Bekliyor · Ödendi · Gecikti |
| Ödeme Durumu | single_select | Senaryo Ödeme Planı | Planlandı · Vadesi Geldi · Ödendi · Gecikti · Ertelendi · İptal |
| Ödeme Sıklığı | single_select | Krediler | Aylık · 3 aylık · 6 aylık · Yıllık · Vade sonunda |
| Ödeme Türü | single_select | Geri Ödeme Planı | Anapara · Faiz · Anapara + faiz · Komisyon / Masraf · Balon ödeme · Erken kapama |
| Ödeme Yöntemi | single_select | Projeler | LC · TT · Escrow · Açık Hesap · Seller's Credit |
| Öncelik (Seçmeli) | single_select | SYS-008 \| Sistem Görev ve Geliştirme Takibi | P0 · P1 · P2 · P3 |
| Üretim Durumu | single_select | İmalat ve Tedarik | Planlandı · Üretimde · Kalite Kontrol (FAT) · Sevkiyata Hazır · Teslim Edildi |
| İlgili Aşama | single_select | Yazışmalar | 1 Yapılandırma · 2 Eximbank / Sinosure Onayı · 3 Rehin ve Bridge · 4 İmalat · 5 Sevkiyat · 6 Gümrük ve Mülkiyet Devri · 7 İpotek Tescili · 8 Sahada İşletme |

## 4. Tek tabloda geçen ama anlamı kayıtlı alanlar

| Alan | Tablo | Anlam |
|---|---|---|
| Dosya Kontrolü | Belgeler | Belgeler tablosunda dosya eki ile durumun tutarlılığını gösteren formül: dosya yoksa 'DOSYA BEKLENİYOR' (Durum `Tamam` ise 'HATA: Tamam ama dosya yok'), dosya varsa 'OK' (Durum `Tamam` değilse 'DOSYA VAR – DURUM TAMAMLANMADI'). `OK` hukuki doğrulama demek değildir. _(kaynak: 03_BUSINESS_RULES/BUSINESS_RULES.md R-05; 02_DATABASE_SCHEMA/FORMULAS.md (Dosya Kontrolü); 07_TESTS_AND_RELEASES/KNOWN_ISSUES.md KI-01, KI-02)_ |

## Anlam eklemek

1. Anlam, belgede/formülde **kanıtlıysa** `FIELD_MEANINGS.json` içine `anlam` + `kaynak` ile yaz. Kullanıcıdan geldiyse `kaynak`: `Kullanıcı beyanı (tarih)`.
2. Kanıtı yoksa yazma; eksik anlamları `INFO_GAP_PROTOCOL.md` ile **tek listede, A grubu (yalnızca kullanıcı bilir)** olarak sor.
3. `python3 -I tools/build_field_dictionary.py` ile yeniden üret.
