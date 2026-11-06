# Etki Analizi Özeti

> Otomatik üretildi. 'Etkilenen' = bu alanı doğrudan veya zincirleme okuyan formül alanı sayısı. Formül metninden regex ile çıkarılır; **text-based olduğu için kaçırma/yanlış eşleme olabilir**, kritik değişiklikte `FORMULAS.md` ile elle doğrula.

| Alan | Etkilenen formül sayısı | Örnek etkilenenler |
|---|---|---|
| Geri Ödeme Planı.Anapara USD | 11 | Gelir Gider Dengesi.Borç Servisi USD, Gelir Gider Dengesi.DSCR, Gelir Gider Dengesi.Net Nakit USD |
| Geri Ödeme Planı.Faiz USD | 10 | Gelir Gider Dengesi.Borç Servisi USD, Gelir Gider Dengesi.DSCR, Gelir Gider Dengesi.Net Nakit USD |
| Gümrük İşlemleri.Gümrük Vergisi USD | 10 | Gümrük İşlemleri.KDV Maliyeti USD, Gümrük İşlemleri.KDV USD, Gümrük İşlemleri.Net Gümrük Vergisi USD |
| Gümrük İşlemleri.Gümrük Vergisi Muafiyet USD | 10 | Gümrük İşlemleri.KDV Maliyeti USD, Gümrük İşlemleri.KDV USD, Gümrük İşlemleri.Net Gümrük Vergisi USD |
| Gümrük İşlemleri.Gümrük Matrahı USD | 9 | Gümrük İşlemleri.KDV Maliyeti USD, Gümrük İşlemleri.KDV USD, Gümrük İşlemleri.Net KDV Matrahı USD |
| Gümrük İşlemleri.Net Gümrük Vergisi USD | 9 | Gümrük İşlemleri.KDV Maliyeti USD, Gümrük İşlemleri.KDV USD, Gümrük İşlemleri.Net KDV Matrahı USD |
| Geri Ödeme Planı.Taksit USD | 8 | Gelir Gider Dengesi.Borç Servisi USD, Gelir Gider Dengesi.DSCR, Gelir Gider Dengesi.Net Nakit USD |
| Gümrük İşlemleri.KDV Oranı | 8 | Gümrük İşlemleri.KDV Maliyeti USD, Gümrük İşlemleri.KDV USD, Gümrük İşlemleri.Net KDV Tahakkuk USD |
| Gümrük İşlemleri.KDV Muafiyet USD | 8 | Gümrük İşlemleri.KDV Maliyeti USD, Gümrük İşlemleri.KDV USD, Gümrük İşlemleri.Net KDV Tahakkuk USD |
| Gümrük İşlemleri.Net KDV Matrahı USD | 8 | Gümrük İşlemleri.KDV Maliyeti USD, Gümrük İşlemleri.KDV USD, Gümrük İşlemleri.Net KDV Tahakkuk USD |
| Gelir Gider Dengesi.TOO SPC Ödemesi | 7 | Gelir Gider Dengesi.CFADS USD, Gelir Gider Dengesi.DSCR, Gelir Gider Dengesi.Net Nakit USD |
| Belgeler.Durum | 7 | Belgeler.Dosya Kontrolü, Belgeler.Gerekli Eksik, Belgeler.Gerekli Tamam |
| Gümrük İşlemleri.Net KDV Tahakkuk USD | 7 | Gümrük İşlemleri.KDV Maliyeti USD, Gümrük İşlemleri.KDV USD, Gümrük İşlemleri.Net Vergi USD |
| Süreç Adımları.Geçerli Incoterm | 7 | Projeler.Gerekli Adım, Projeler.Süreç İlerleme, Projeler.Tamamlanan Adım |
| Süreç Adımları.Proje Incoterm | 7 | Projeler.Gerekli Adım, Projeler.Süreç İlerleme, Projeler.Tamamlanan Adım |
| Süreç Adımları.Proje Ödeme Yöntemi | 7 | Projeler.Gerekli Adım, Projeler.Süreç İlerleme, Projeler.Tamamlanan Adım |
| Süreç Adımları.Proje Çıkış Modeli | 7 | Projeler.Gerekli Adım, Projeler.Süreç İlerleme, Projeler.Tamamlanan Adım |
| Süreç Adımları.Geçerli Ödeme Yöntemi | 7 | Projeler.Gerekli Adım, Projeler.Süreç İlerleme, Projeler.Tamamlanan Adım |
| Süreç Adımları.Geçerli Çıkış Modeli | 7 | Projeler.Gerekli Adım, Projeler.Süreç İlerleme, Projeler.Tamamlanan Adım |
| Süreç Adımları.Geçerli mi | 6 | Projeler.Gerekli Adım, Projeler.Süreç İlerleme, Projeler.Tamamlanan Adım |
| Belgeler.Proje Ödeme Yöntemi | 6 | Belgeler.Gerekli Eksik, Belgeler.Gerekli Sayı, Belgeler.Gerekli Tamam |
| Belgeler.Proje Incoterm | 6 | Belgeler.Gerekli Eksik, Belgeler.Gerekli Sayı, Belgeler.Gerekli Tamam |
| Belgeler.Proje Çıkış Modeli | 6 | Belgeler.Gerekli Eksik, Belgeler.Gerekli Sayı, Belgeler.Gerekli Tamam |
| Belgeler.Geçerli Çıkış Modeli | 6 | Belgeler.Gerekli Eksik, Belgeler.Gerekli Sayı, Belgeler.Gerekli Tamam |
| Belgeler.Geçerli Incoterm | 6 | Belgeler.Gerekli Eksik, Belgeler.Gerekli Sayı, Belgeler.Gerekli Tamam |

Tek alan için: `python3 -I tools/build_xray.py --impact "Tablo.Alan"`
