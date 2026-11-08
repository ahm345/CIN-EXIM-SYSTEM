# Tablo Kartları

> Otomatik üretildi (`tools/build_schema_docs.py`). Kaynak: canlı Baserow şeması, 2026-11-08T16:01:05+03:00. **Elle düzenlemeyin**; şemayı yeniden okuyup betiği çalıştırın.

**Özet:** 44 tablo, 896 alan, 223 ilişki alanı, 91 formül. Satır sayıları bu belgede yoktur (canlı okunmalı).

## Hızlı dizin

| Grup | Tablo | ID | Alan | İlişki | Formül |
|---|---|---|---|---|---|
| 01 İş Çekirdeği | Firmalar | 1299125 | 44 | 38 | 0 |
| 01 İş Çekirdeği | Projeler | 1299126 | 55 | 20 | 17 |
| 01 İş Çekirdeği | Ekipman Lotları | 1299127 | 17 | 7 | 2 |
| 01 İş Çekirdeği | İmalat ve Tedarik | 1299128 | 15 | 3 | 2 |
| 01 İş Çekirdeği | Bakım ve Yedek Parça | 1299136 | 12 | 3 | 2 |
| 01 İş Çekirdeği | Makineler | 1299813 | 46 | 16 | 4 |
| 01 İş Çekirdeği | Hizmet Kayıtları | 1299814 | 14 | 4 | 1 |
| 01 İş Çekirdeği | Sözleşmeler | 1301364 | 24 | 9 | 2 |
| 01 İş Çekirdeği | Tahsisler | 1301365 | 11 | 4 | 1 |
| 01 İş Çekirdeği | Sigortalar | 1301366 | 14 | 3 | 2 |
| 02 Finansman ve Nakit Akışı | Krediler | 1299129 | 39 | 6 | 10 |
| 02 Finansman ve Nakit Akışı | Teminatlar | 1299130 | 15 | 5 | 1 |
| 02 Finansman ve Nakit Akışı | Kira ve Tahsilat Planı | 1299134 | 18 | 3 | 7 |
| 02 Finansman ve Nakit Akışı | Giderler ve Vergiler | 1299135 | 12 | 3 | 1 |
| 02 Finansman ve Nakit Akışı | Geri Ödeme Planı | 1299810 | 17 | 3 | 1 |
| 02 Finansman ve Nakit Akışı | Gelir Gider Dengesi | 1299815 | 19 | 2 | 8 |
| 02 Finansman ve Nakit Akışı | Kur Takibi | 1299816 | 5 | 0 | 0 |
| 03 Lojistik ve Gümrük | Sevkiyatlar | 1299131 | 27 | 8 | 7 |
| 03 Lojistik ve Gümrük | Gümrük İşlemleri | 1299132 | 20 | 3 | 7 |
| 03 Lojistik ve Gümrük | Muafiyetler ve Teşvikler | 1299812 | 10 | 2 | 0 |
| 04 Belge ve Süreç | Belgeler | 1299133 | 31 | 10 | 5 |
| 04 Belge ve Süreç | Süreç Adımları | 1299137 | 27 | 6 | 5 |
| 04 Belge ve Süreç | Yazışmalar | 1299811 | 12 | 3 | 0 |
| 05 Senaryo Motoru | Senaryolar | 1303465 | 27 | 10 | 0 |
| 05 Senaryo Motoru | Senaryo Finansman Dilimleri | 1303466 | 31 | 3 | 0 |
| 05 Senaryo Motoru | Senaryo Ödeme Planı | 1303467 | 22 | 3 | 1 |
| 05 Senaryo Motoru | Senaryo Varsayımları | 1303468 | 12 | 1 | 0 |
| 05 Senaryo Motoru | Senaryo Değerlendirme | 1303469 | 10 | 1 | 0 |
| 05 Senaryo Motoru | Senaryo Gelir Gider Akışı | 1303470 | 25 | 2 | 5 |
| 06 SYS Yönetim | SYS-001 \| Sistem Ana İndeksi | 1301798 | 15 | 2 | 0 |
| 06 SYS Yönetim | SYS-002 \| Sistem Sürüm Kayıtları | 1301799 | 24 | 8 | 0 |
| 06 SYS Yönetim | SYS-003 \| Sistem Yedek Paketleri | 1301800 | 18 | 2 | 0 |
| 06 SYS Yönetim | SYS-004 \| Sistem Değişiklik Günlüğü | 1301801 | 17 | 3 | 0 |
| 06 SYS Yönetim | SYS-005 \| Sistem Karar Kayıtları | 1301802 | 16 | 4 | 0 |
| 06 SYS Yönetim | SYS-006 \| Sistem Denetim ve Testleri | 1301803 | 21 | 5 | 0 |
| 06 SYS Yönetim | SYS-007 \| Sistem Geri Yükleme ve Klonlama | 1301804 | 19 | 2 | 0 |
| 06 SYS Yönetim | SYS-008 \| Sistem Görev ve Geliştirme Takibi | 1301805 | 21 | 5 | 0 |
| 06 SYS Yönetim | SYS-009 \| AI İşletim Protokolü | 1301819 | 13 | 0 | 0 |
| 06 SYS Yönetim | SYS-010 \| AI Oturum ve Devir Kayıtları | 1301820 | 26 | 5 | 0 |
| 06 SYS Yönetim | SYS-011 \| AI Çalışma ve Olay Günlüğü | 1301821 | 20 | 1 | 0 |
| 07 Eski / Referans | Table | 620460 | 8 | 1 | 0 |
| 08 CHAT (konu ve sohbet hafızası) | CHAT-001 \| Konular | 1306063 | 20 | 2 | 0 |
| 08 CHAT (konu ve sohbet hafızası) | CHAT-002 \| Notlar | 1306064 | 11 | 1 | 0 |
| 08 CHAT (konu ve sohbet hafızası) | CHAT-003 \| Sorular | 1306065 | 16 | 1 | 0 |


---

## 01 İş Çekirdeği

### Firmalar  (ID 1299125)

Tüm taraflar için ortak firma kaydı (tedarikçi, imalatçı, kreditör, kiracı, sigortacı, taşıyıcı vb.). Mülkiyet zincirindeki roller buradan bağlanır.

- Birincil alan: `Firma Adı` | Alan sayısı: 44
- İlişkiler (alan -> hedef tablo):
  - `Ekipman Lotları` -> **Ekipman Lotları** (1299127)
  - `İmalat ve Tedarik` -> **İmalat ve Tedarik** (1299128)
  - `Krediler` -> **Krediler** (1299129)
  - `Krediler - Borçlu` -> **Krediler** (1299129)
  - `Teminatlar` -> **Teminatlar** (1299130)
  - `Teminatlar - Lehtar` -> **Teminatlar** (1299130)
  - `Sevkiyatlar` -> **Sevkiyatlar** (1299131)
  - `Gümrük İşlemleri` -> **Gümrük İşlemleri** (1299132)
  - `Kira ve Tahsilat Planı` -> **Kira ve Tahsilat Planı** (1299134)
  - `Giderler ve Vergiler` -> **Giderler ve Vergiler** (1299135)
  - `Yazışmalar` -> **Yazışmalar** (1299811)
  - `Yazışmalar - Kime Firma` -> **Yazışmalar** (1299811)
  - `Makineler` -> **Makineler** (1299813)
  - `Teminatlar - Bildirim Yapılan Taraf` -> **Teminatlar** (1299130)
  - `Sözleşmeler` -> **Sözleşmeler** (1301364)
  - `Sözleşmeler - Alan / Alıcı Taraf` -> **Sözleşmeler** (1301364)
  - `Tahsisler` -> **Tahsisler** (1301365)
  - `Sigortalar` -> **Sigortalar** (1301366)
  - `Makineler - Hukuki Malik` -> **Makineler** (1299813)
  - `Makineler - Fiili Kullanıcı` -> **Makineler** (1299813)
  - `Projeler` -> **Projeler** (1299126)
  - `Projeler - Gümrük Beyan Sahibi` -> **Projeler** (1299126)
  - `Projeler - Fatura Alıcısı` -> **Projeler** (1299126)
  - `Projeler - İlk Hukuki Malik` -> **Projeler** (1299126)
  - `Projeler - Nihai Hedef Malik` -> **Projeler** (1299126)
  - `Projeler - Tescil Sahibi` -> **Projeler** (1299126)
  - `Hizmet Kayıtları` -> **Hizmet Kayıtları** (1299814)
  - `Makineler - İthalatçı Firma` -> **Makineler** (1299813)
  - `Makineler - Gümrük Beyan Sahibi` -> **Makineler** (1299813)
  - `Makineler - Tescil Sahibi` -> **Makineler** (1299813)
  - `Makineler - Zilyet / Teslim Alan` -> **Makineler** (1299813)
  - `Makineler - Hedef Hukuki Malik` -> **Makineler** (1299813)
  - `Süreç Adımları` -> **Süreç Adımları** (1299137)
  - `Senaryolar` -> **Senaryolar** (1303465)
  - `Senaryolar - Gümrük Beyan Sahibi` -> **Senaryolar** (1303465)
  - `Senaryolar - Hukuki Malik` -> **Senaryolar** (1303465)
  - `Senaryolar - Fiili Kullanıcı` -> **Senaryolar** (1303465)
  - `Senaryo Finansman Dilimleri` -> **Senaryo Finansman Dilimleri** (1303466)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Firma Adı | text |
| Rol | single_select [Alıcı / Nihai Gelir Kaynağı / Genel Yüklenici / SPC / Lessor / Operatör / Lessee (TOO) / Banka / Kreditör / Sigortacı / İmalatçı / Tedarikçi / Nakit Rehni Sahibi (Finansör) / ...] |
| Ülke | text |
| İletişim | text |
| Not | long_text |
| Ekipman Lotları | link_row |
| İmalat ve Tedarik | link_row |
| Krediler | link_row |
| Krediler - Borçlu | link_row |
| Teminatlar | link_row |
| Teminatlar - Lehtar | link_row |
| Sevkiyatlar | link_row |
| Gümrük İşlemleri | link_row |
| Kira ve Tahsilat Planı | link_row |
| Giderler ve Vergiler | link_row |
| Yazışmalar | link_row |
| Yazışmalar - Kime Firma | link_row |
| Makineler | link_row |
| Teminatlar - Bildirim Yapılan Taraf | link_row |
| Gerçek Veri | boolean |
| Sözleşmeler | link_row |
| Sözleşmeler - Alan / Alıcı Taraf | link_row |
| Tahsisler | link_row |
| Sigortalar | link_row |
| Makineler - Hukuki Malik | link_row |
| Makineler - Fiili Kullanıcı | link_row |
| Projeler | link_row |
| Projeler - Gümrük Beyan Sahibi | link_row |
| Projeler - Fatura Alıcısı | link_row |
| Projeler - İlk Hukuki Malik | link_row |
| Projeler - Nihai Hedef Malik | link_row |
| Projeler - Tescil Sahibi | link_row |
| Hizmet Kayıtları | link_row |
| Makineler - İthalatçı Firma | link_row |
| Makineler - Gümrük Beyan Sahibi | link_row |
| Makineler - Tescil Sahibi | link_row |
| Makineler - Zilyet / Teslim Alan | link_row |
| Makineler - Hedef Hukuki Malik | link_row |
| Süreç Adımları | link_row |
| Senaryolar | link_row |
| Senaryolar - Gümrük Beyan Sahibi | link_row |
| Senaryolar - Hukuki Malik | link_row |
| Senaryolar - Fiili Kullanıcı | link_row |
| Senaryo Finansman Dilimleri | link_row |

</details>

### Projeler  (ID 1299126)

Ana proje kaydı. Maliyet, kredi, kira, vergi ve süreç ilerleme özetlerini toplayan formüller içerir.

- Birincil alan: `Proje Adı` | Alan sayısı: 55
- İlişkiler (alan -> hedef tablo):
  - `Ekipman Lotları` -> **Ekipman Lotları** (1299127)
  - `Krediler` -> **Krediler** (1299129)
  - `Sevkiyatlar` -> **Sevkiyatlar** (1299131)
  - `Belgeler` -> **Belgeler** (1299133)
  - `Kira ve Tahsilat Planı` -> **Kira ve Tahsilat Planı** (1299134)
  - `Giderler ve Vergiler` -> **Giderler ve Vergiler** (1299135)
  - `Süreç Adımları` -> **Süreç Adımları** (1299137)
  - `Yazışmalar` -> **Yazışmalar** (1299811)
  - `Muafiyetler ve Teşvikler` -> **Muafiyetler ve Teşvikler** (1299812)
  - `Gelir Gider Dengesi` -> **Gelir Gider Dengesi** (1299815)
  - `Bakım ve Yedek Parça` -> **Bakım ve Yedek Parça** (1299136)
  - `Sözleşmeler` -> **Sözleşmeler** (1301364)
  - `İthalatçı Firma` -> **Firmalar** (1299125)
  - `Gümrük Beyan Sahibi` -> **Firmalar** (1299125)
  - `Fatura Alıcısı` -> **Firmalar** (1299125)
  - `İlk Hukuki Malik` -> **Firmalar** (1299125)
  - `Nihai Hedef Malik` -> **Firmalar** (1299125)
  - `Tescil Sahibi` -> **Firmalar** (1299125)
  - `Hizmet Kayıtları` -> **Hizmet Kayıtları** (1299814)
  - `Senaryolar` -> **Senaryolar** (1303465)
- Formüller: `Peşinat USD`, `Kredi Tutarı USD`, `Lot Toplamı USD`, `Toplam Kredi USD`, `Sevkiyat Sayısı`, `Gerekli Belge Sayısı`, `Eksik Belge Sayısı`, `Toplam Gider USD (vergisiz)`, `Kira Planı SPC Payı USD`, `Gerekli Adım`, `Tamamlanan Adım`, `Süreç İlerleme`, `Etkin Stopaj Oranı`, `Toplam Vergi USD (Gümrük)`, `Bakım ve Yedek Parça USD`, `Kira Toplamı − Varlık Bedeli USD`, `Toplam Maliyet USD (vergi dahil)` (metinleri `FORMULAS.md` içinde)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Proje Adı | text |
| Toplam Değer USD | number |
| Peşinat Oranı | number |
| Incoterm | single_select [DAP / CIF / FOB / EXW / DDP / FCA / CIP / Sınır Teslimi] |
| Teslim Noktası | text |
| Kira / Leasing Süresi (Yıl) | number |
| Aşama | single_select [1 Yapılandırma / 2 Eximbank / Sinosure Onayı / 3 Rehin ve Bridge / 4 İmalat / 5 Sevkiyat / 6 Gümrük ve Mülkiyet Devri / 7 İpotek Tescili / 8 Sahada İşletme] |
| Başlangıç Tarihi | date |
| Notlar | long_text |
| Ekipman Lotları | link_row |
| Krediler | link_row |
| Sevkiyatlar | link_row |
| Belgeler | link_row |
| Kira ve Tahsilat Planı | link_row |
| Giderler ve Vergiler | link_row |
| Süreç Adımları | link_row |
| Peşinat USD | formula |
| Kredi Tutarı USD | formula |
| Lot Toplamı USD | formula |
| Toplam Kredi USD | formula |
| Sevkiyat Sayısı | formula |
| Gerekli Belge Sayısı | formula |
| Eksik Belge Sayısı | formula |
| Toplam Gider USD (vergisiz) | formula |
| Kira Planı SPC Payı USD | formula |
| Gerekli Adım | formula |
| Tamamlanan Adım | formula |
| Süreç İlerleme | formula |
| Ödeme Yöntemi | single_select [LC / TT / Escrow / Açık Hesap / Seller's Credit] |
| Çıkış Modeli | single_select [A İç Leasing / B Operasyonel Kiralama / C Satış / D Finance Lease (SPC → TOO)] |
| Varsayım: Kredi Faizi | number |
| Varsayım: Kredi Vadesi (Ay) | number |
| Varsayım: Aylık SPC Kira Payı USD | number |
| Stopaj Oranı | number |
| AIFC Muafiyeti Onaylandı (belge var) | boolean |
| Yazışmalar | link_row |
| Muafiyetler ve Teşvikler | link_row |
| Gelir Gider Dengesi | link_row |
| Etkin Stopaj Oranı | formula |
| Bakım ve Yedek Parça | link_row |
| Toplam Vergi USD (Gümrük) | formula |
| Bakım ve Yedek Parça USD | formula |
| Kira Toplamı − Varlık Bedeli USD | formula |
| Toplam Maliyet USD (vergi dahil) | formula |
| Gerçek Veri | boolean |
| Sözleşmeler | link_row |
| Mülkiyet Modeli | single_select [SPC (Varsayılan) / TOO / Üçüncü Taraf / Ortak Mülkiyet / Diğer] |
| İthalatçı Firma | link_row |
| Gümrük Beyan Sahibi | link_row |
| Fatura Alıcısı | link_row |
| İlk Hukuki Malik | link_row |
| Nihai Hedef Malik | link_row |
| Tescil Sahibi | link_row |
| Hizmet Kayıtları | link_row |
| Senaryolar | link_row |

</details>

### Ekipman Lotları  (ID 1299127)

Projedeki ekipman lotları (tedarikçi, tutar). Makineleri ve sevkiyatları gruplar.

- Birincil alan: `Lot Adı` | Alan sayısı: 17
- İlişkiler (alan -> hedef tablo):
  - `Proje` -> **Projeler** (1299126)
  - `Tedarikçi` -> **Firmalar** (1299125)
  - `İmalat ve Tedarik` -> **İmalat ve Tedarik** (1299128)
  - `Sevkiyatlar` -> **Sevkiyatlar** (1299131)
  - `Bakım ve Yedek Parça` -> **Bakım ve Yedek Parça** (1299136)
  - `Makineler` -> **Makineler** (1299813)
  - `Sözleşmeler` -> **Sözleşmeler** (1301364)
- Formüller: `Toplam USD`, `Lot Operasyon Kontrolü` (metinleri `FORMULAS.md` içinde)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Lot Adı | text |
| Adet | number |
| Birim Fiyat USD | number |
| HS Kodu | text |
| Durum | single_select [Sipariş Verildi / İmalatta / Yüklemeye Hazır / Yolda / Khorgos Gümrüğünde / Teslim Alındı / İpotek Tescilli / Sahada Çalışıyor] |
| İpotek Tescil Edildi | boolean |
| Teslim Tarihi | date |
| Proje | link_row |
| Tedarikçi | link_row |
| İmalat ve Tedarik | link_row |
| Sevkiyatlar | link_row |
| Bakım ve Yedek Parça | link_row |
| Toplam USD | formula |
| Makineler | link_row |
| Sözleşmeler | link_row |
| Gerçek Veri | boolean |
| Lot Operasyon Kontrolü | formula |

</details>

### İmalat ve Tedarik  (ID 1299128)

Lot bazlı sipariş ve üretim takibi; FAT raporu belgesi bağlanır.

- Birincil alan: `Sipariş No` | Alan sayısı: 15
- İlişkiler (alan -> hedef tablo):
  - `Lot` -> **Ekipman Lotları** (1299127)
  - `İmalatçı` -> **Firmalar** (1299125)
  - `FAT Raporu` -> **Belgeler** (1299133)
- Formüller: `Üretim Süresi (Gün)`, `Tedarik Kontrolü` (metinleri `FORMULAS.md` içinde)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Sipariş No | text |
| Üretim Durumu | single_select [Planlandı / Üretimde / Kalite Kontrol (FAT) / Sevkiyata Hazır / Teslim Edildi] |
| İlerleme | number |
| Planlanan Bitiş | date |
| Kalite Kontrol Geçti | boolean |
| Not | long_text |
| Lot | link_row |
| İmalatçı | link_row |
| Sipariş Tarihi | date |
| Üretim Süresi (Gün) | formula |
| Gerçek Veri | boolean |
| Kalite Kontrol Sorumlusu | text |
| FAT Tarihi | date |
| FAT Raporu | link_row |
| Tedarik Kontrolü | formula |

</details>

### Bakım ve Yedek Parça  (ID 1299136)

Lot ve makine bazlı bakım ve yedek parça kalemleri.

- Birincil alan: `Kalem` | Alan sayısı: 12
- İlişkiler (alan -> hedef tablo):
  - `Lot` -> **Ekipman Lotları** (1299127)
  - `Proje` -> **Projeler** (1299126)
  - `Makine` -> **Makineler** (1299813)
- Formüller: `Toplam USD`, `Bakım Kontrolü` (metinleri `FORMULAS.md` içinde)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Kalem | text |
| Tür | single_select [Periyodik Bakım / Yedek Parça / Arıza / Sigorta Hasarı] |
| Miktar | number |
| Birim Maliyet USD | number |
| Tarih | date |
| Durum | single_select [Planlandı / Yapıldı / Bekliyor] |
| Lot | link_row |
| Toplam USD | formula |
| Proje | link_row |
| Makine | link_row |
| Gerçek Veri | boolean |
| Bakım Kontrolü | formula |

</details>

### Makineler  (ID 1299813)

Makine (şasi / seri no) kaydı: hukuki malik, fiili kullanıcı, tahsis, sigorta ve yaşam döngüsü kontrolleri.

- Birincil alan: `Şasi / Seri No` | Alan sayısı: 46
- İlişkiler (alan -> hedef tablo):
  - `Lot` -> **Ekipman Lotları** (1299127)
  - `Saha / Kiracı` -> **Firmalar** (1299125)
  - `Hizmet Kayıtları` -> **Hizmet Kayıtları** (1299814)
  - `Bakım ve Yedek Parça` -> **Bakım ve Yedek Parça** (1299136)
  - `Tahsisler` -> **Tahsisler** (1301365)
  - `Sigortalar` -> **Sigortalar** (1301366)
  - `Hukuki Malik` -> **Firmalar** (1299125)
  - `Fiili Kullanıcı` -> **Firmalar** (1299125)
  - `İthalatçı Firma` -> **Firmalar** (1299125)
  - `Gümrük Beyan Sahibi` -> **Firmalar** (1299125)
  - `Tescil Sahibi` -> **Firmalar** (1299125)
  - `Zilyet / Teslim Alan` -> **Firmalar** (1299125)
  - `Mülkiyet Devir Belgesi` -> **Belgeler** (1299133)
  - `Geri Alma Teslim Belgesi` -> **Belgeler** (1299133)
  - `Hedef Hukuki Malik` -> **Firmalar** (1299125)
  - `Süreç Adımları` -> **Süreç Adımları** (1299137)
- Formüller: `Aktif Tahsis Sayısı`, `Geçerli Sigorta Sayısı`, `Operasyon Kontrolü`, `Varlık Yaşam Döngüsü Kontrolü` (metinleri `FORMULAS.md` içinde)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Şasi / Seri No | text |
| İpotek Tescil No | text |
| Sinosure Hasar Dosya No | text |
| Durum | single_select [Teslim Alındı / İpotek Tescilli / Sahada Çalışıyor / Arızalı] |
| Çalışma Saati | number |
| Yedek Araç mı | boolean |
| Aylık Km | number |
| Lot | link_row |
| Saha / Kiracı | link_row |
| Hizmet Kayıtları | link_row |
| Bakım ve Yedek Parça | link_row |
| Tahsisler | link_row |
| Sigortalar | link_row |
| Plaka | text |
| Motor No | text |
| Marka | text |
| Model | text |
| Üretim Yılı | number |
| Konum | text |
| Ruhsat / Tescil No | text |
| Hukuki Malik | link_row |
| Fiili Kullanıcı | link_row |
| Aktif Tahsis Sayısı | formula |
| Geçerli Sigorta Sayısı | formula |
| Operasyon Kontrolü | formula |
| Gerçek Veri | boolean |
| Mülkiyet Başlangıç Tarihi | date |
| Mülkiyet Durumu | single_select [Tedarikçide / Transit / Taşımada / Gümrükte / SPC mülkiyetinde / TOO mülkiyetinde / Üçüncü taraf mülkiyetinde / Uyuşmazlıkta] |
| Geri Alma Aşaması | single_select [Uygulanmaz / Ödeme Takibi / İhtar / Temerrüt Tespiti / Fesih / Hukuki İnceleme / Geri Alma Talebi / Teslim Alındı / İtiraz / Dava] |
| Temerrüt / Olay Tarihi | date |
| İhtar Tarihi | date |
| Fesih Tarihi | date |
| Geri Alma Dosya No | text |
| Geri Alma Teslim Tarihi | date |
| Geri Alma Sonrası Durum | single_select [Kontrol Bekliyor / Bakım Gerekli / Kiralamaya Hazır / Satışa Hazır / Hukuki Blokaj] |
| Yeniden Tahsis Tarihi | date |
| İthalatçı Firma | link_row |
| Gümrük Beyan Sahibi | link_row |
| Tescil Sahibi | link_row |
| Zilyet / Teslim Alan | link_row |
| Mülkiyet Devir Belgesi | link_row |
| Geri Alma Teslim Belgesi | link_row |
| Varlık Yaşam Döngüsü Kontrolü | formula |
| Mülkiyet Senaryosu | single_select [A – SPC doğrudan ithalat ve mülkiyet / B – TOO ithalatı, sonra SPC devri / C – Üçüncü taraf mülkiyeti / D – Ortak mülkiyet / E – Diğer] |
| Hedef Hukuki Malik | link_row |
| Süreç Adımları | link_row |

</details>

### Hizmet Kayıtları  (ID 1299814)

Makine / sözleşme bazlı hizmet kayıtları.

- Birincil alan: `Kayıt` | Alan sayısı: 14
- İlişkiler (alan -> hedef tablo):
  - `Makine` -> **Makineler** (1299813)
  - `Proje` -> **Projeler** (1299126)
  - `Firma` -> **Firmalar** (1299125)
  - `Sözleşme` -> **Sözleşmeler** (1301364)
- Formüller: `Tutar USD` (metinleri `FORMULAS.md` içinde)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Kayıt | text |
| Tarih | date |
| Hizmet | single_select [Yolcu Taşıma / Sahada Çalışma / Yedek Araç / Diğer] |
| Saat veya Km | number |
| Birim Ücret USD | number |
| ÖMG Onayı | single_select [Bekliyor / Onaylandı / Faturalandı] |
| Fatura No | text |
| Makine | link_row |
| Tutar USD | formula |
| Gerçek Veri | boolean |
| Fatura Durumu | single_select [Bekliyor / Faturalandı / Tahsil Edildi / İtirazlı] |
| Proje | link_row |
| Firma | link_row |
| Sözleşme | link_row |

</details>

### Sözleşmeler  (ID 1301364)

Sözleşmeler (satış, leasing, kira, alt kiralama, tahsis, teminat, hizmet vb.); ana sözleşme ile kendine bağlanabilir.

- Birincil alan: `Sözleşme Adı` | Alan sayısı: 24
- İlişkiler (alan -> hedef tablo):
  - `Veren / Satıcı Taraf` -> **Firmalar** (1299125)
  - `Alan / Alıcı Taraf` -> **Firmalar** (1299125)
  - `Proje` -> **Projeler** (1299126)
  - `Lotlar` -> **Ekipman Lotları** (1299127)
  - `Tahsisler` -> **Tahsisler** (1301365)
  - `Ana Sözleşme` -> **Sözleşmeler** (1301364) (kendine)
  - `Belgeler` -> **Belgeler** (1299133)
  - `Hizmet Kayıtları` -> **Hizmet Kayıtları** (1299814)
  - `Süreç Adımları` -> **Süreç Adımları** (1299137)
- Formüller: `Alt Kiralama Kontrolü`, `Sözleşme Kontrolü` (metinleri `FORMULAS.md` içinde)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Sözleşme Adı | text |
| Tür | single_select [Satış (Peşin) / Satış (Vadeli) / Finansal Leasing / Operasyonel Leasing / Kira / Alt Kiralama / Bakım / Teknik Servis / Araç Tahsis / ...] |
| Para Birimi | single_select [USD / EUR / CNY / KZT / TRY] |
| Tutar | number |
| Başlangıç | date |
| Bitiş | date |
| Alt Kiralama / Yeniden Satış İzni Var | boolean |
| Mülkiyet ve Kullanım Notu | long_text |
| Durum | single_select [Taslak / İmzalandı / Aktif / Sona Erdi / Fesih] |
| Hukuki Doğrulama | single_select [Gerekli / Yapıldı / Gerekmiyor] |
| Gerçek Veri | boolean |
| Veren / Satıcı Taraf | link_row |
| Alan / Alıcı Taraf | link_row |
| Proje | link_row |
| Lotlar | link_row |
| Tahsisler | link_row |
| Ana Sözleşme | link_row |
| Alt Kiralama Kontrolü | formula |
| İmza Tarihi | date |
| Fesih / İhtar Durumu | single_select [Yok / İhtar Gönderildi / Temerrüt / Fesih Sürecinde / Feshedildi] |
| Belgeler | link_row |
| Sözleşme Kontrolü | formula |
| Hizmet Kayıtları | link_row |
| Süreç Adımları | link_row |

</details>

### Tahsisler  (ID 1301365)

Makine - sözleşme - kullanan firma tahsisi; tarih ve durum. Çakışma kontrolü için kritik.

- Birincil alan: `Tahsis` | Alan sayısı: 11
- İlişkiler (alan -> hedef tablo):
  - `Makine` -> **Makineler** (1299813)
  - `Sözleşme` -> **Sözleşmeler** (1301364)
  - `Kullanan Firma` -> **Firmalar** (1299125)
  - `Süreç Adımları` -> **Süreç Adımları** (1299137)
- Formüller: `Tahsis Kontrolü` (metinleri `FORMULAS.md` içinde)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Tahsis | text |
| Başlangıç | date |
| Bitiş | date |
| Durum | single_select [Planlandı / Aktif / Sona Erdi] |
| Not | long_text |
| Makine | link_row |
| Sözleşme | link_row |
| Kullanan Firma | link_row |
| Gerçek Veri | boolean |
| Tahsis Kontrolü | formula |
| Süreç Adımları | link_row |

</details>

### Sigortalar  (ID 1301366)

Sigorta poliçeleri (makine veya sevkiyat bazlı); geçerlilik formülü içerir.

- Birincil alan: `Poliçe` | Alan sayısı: 14
- İlişkiler (alan -> hedef tablo):
  - `Makine` -> **Makineler** (1299813)
  - `Sigorta Şirketi` -> **Firmalar** (1299125)
  - `Sevkiyatlar` -> **Sevkiyatlar** (1299131)
- Formüller: `Durum`, `Sigorta Kontrolü` (metinleri `FORMULAS.md` içinde)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Poliçe | text |
| Tür | single_select [Zorunlu Trafik / Kasko / Nakliye / Taşıma / Üçüncü Şahıs Sorumluluk / İşveren / Personel Sorumluluk] |
| Poliçe No | text |
| Başlangıç | date |
| Bitiş | date |
| Prim USD | number |
| Muafiyet | text |
| Makine | link_row |
| Sigorta Şirketi | link_row |
| Durum | formula |
| Gerçek Veri | boolean |
| Teminat Limiti USD | number |
| Sigorta Kontrolü | formula |
| Sevkiyatlar | link_row |

</details>


---

## 02 Finansman ve Nakit Akışı

### Krediler  (ID 1299129)

Finansman kredileri (kreditör, borçlu); teminat, belge ve geri ödeme planı özetleri.

- Birincil alan: `Kredi Adı` | Alan sayısı: 39
- İlişkiler (alan -> hedef tablo):
  - `Proje` -> **Projeler** (1299126)
  - `Kreditör` -> **Firmalar** (1299125)
  - `Borçlu` -> **Firmalar** (1299125)
  - `Teminatlar` -> **Teminatlar** (1299130)
  - `Belgeler` -> **Belgeler** (1299133)
  - `Geri Ödeme Planı` -> **Geri Ödeme Planı** (1299810)
- Formüller: `Teminat Sayısı`, `İpotek Teminatı USD`, `Belge Sayısı`, `Eksik Belge`, `Nakit Rehni USD`, `İpotek / Kredi Oranı`, `Planlanan Anapara Toplamı USD`, `Planlanan Faiz Toplamı USD`, `Planlanan Toplam Borç Servisi USD`, `Anapara Mutabakatı` (metinleri `FORMULAS.md` içinde)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Kredi Adı | text |
| Tür | single_select [Bridge Kredi (Peşinat) / Seller's Credit / Eximbank Destekli Kredi] |
| Tutar USD | number |
| Faiz Oranı | number |
| Vade (Ay) | number |
| Kullandırım Tarihi | date |
| Durum | single_select [Başvuru / Onay Bekliyor / Onaylandı / Kullandırıldı / Kapandı] |
| Proje | link_row |
| Kreditör | link_row |
| Borçlu | link_row |
| Teminatlar | link_row |
| Belgeler | link_row |
| Teminat Sayısı | formula |
| İpotek Teminatı USD | formula |
| Belge Sayısı | formula |
| Eksik Belge | formula |
| Geri Ödeme Planı | link_row |
| Nakit Rehni USD | formula |
| İpotek / Kredi Oranı | formula |
| Gerçek Veri | boolean |
| Anapara Ödemesiz Süre (Ay) | number |
| Faiz Ödemesiz Süre (Ay) | number |
| Vade Tanımı | single_select [Toplam vade – kullandırım tarihinden / Ödemesiz dönem sonrası anapara vadesi] |
| Anapara Ödeme Tipi | single_select [Eşit anapara / Eşit taksit (annuity) / Grace + amortisman / Bullet – vade sonunda / Balloon – balon ödemeli / Özel plan] |
| Faiz Tipi | single_select [Sabit / Değişken] |
| Faiz Endeksi / Marj | text |
| Ödeme Sıklığı | single_select [Aylık / 3 aylık / 6 aylık / Yıllık / Vade sonunda] |
| Kullandırım Tutarı USD | number |
| Planlanan Kullandırım Tarihi | date |
| Faiz Başlangıç Tarihi | date |
| Son Vade Tarihi | date |
| Balon Ödeme USD | number |
| Komisyon / Masraf USD | number |
| Toplam Planlanan Geri Ödeme USD | number |
| Finansman Varsayımı Notu | long_text |
| Planlanan Anapara Toplamı USD | formula |
| Planlanan Faiz Toplamı USD | formula |
| Planlanan Toplam Borç Servisi USD | formula |
| Anapara Mutabakatı | formula |

</details>

### Teminatlar  (ID 1299130)

Kredi teminatları (veren, lehtar, bildirim yapılan taraf).

- Birincil alan: `Teminat Adı` | Alan sayısı: 15
- İlişkiler (alan -> hedef tablo):
  - `Kredi` -> **Krediler** (1299129)
  - `Veren` -> **Firmalar** (1299125)
  - `Lehtar` -> **Firmalar** (1299125)
  - `Belgeler` -> **Belgeler** (1299133)
  - `Bildirim Yapılan Taraf` -> **Firmalar** (1299125)
- Formüller: `Teminat Kontrolü` (metinleri `FORMULAS.md` içinde)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Teminat Adı | text |
| Tür | single_select [Üçüncü Taraf Nakit Rehni / 1. Derece Ekipman İpoteği / Tahsilat Hesabı Rehni / Escrow / Kira Alacağı Temliki / Notice of Assignment / Sinosure Poliçesi] |
| Tutar USD | number |
| Başlangıç | date |
| Bitiş | date |
| Durum | single_select [Hazırlanıyor / İmzalandı / Aktif / Çözüldü / Kaldırıldı] |
| Not | long_text |
| Kredi | link_row |
| Veren | link_row |
| Lehtar | link_row |
| Belgeler | link_row |
| Hukuki Doğrulama | single_select [Gerekli / Yapıldı / Gerekmiyor] |
| Bildirim Yapılan Taraf | link_row |
| Gerçek Veri | boolean |
| Teminat Kontrolü | formula |

</details>

### Kira ve Tahsilat Planı  (ID 1299134)

Dönemsel kira ve tahsilat planı; stopaj, borç servisi, CFADS ve DSCR.

- Birincil alan: `Dönem` | Alan sayısı: 18
- İlişkiler (alan -> hedef tablo):
  - `Proje` -> **Projeler** (1299126)
  - `Kiracı` -> **Firmalar** (1299125)
  - `Geri Ödeme Dönemleri` -> **Geri Ödeme Planı** (1299810)
- Formüller: `Kalan USD`, `Stopaj USD`, `Net SPC'ye USD`, `DSCR`, `DSCR Uyarısı`, `Borç Servisi USD`, `CFADS USD` (metinleri `FORMULAS.md` içinde)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Dönem | text |
| Vade Tarihi | date |
| ÖMG Hizmet Geliri USD | number |
| SPC Kira Payı USD | number |
| Tahsil Edilen USD | number |
| Durum | single_select [Planlandı / Tahsil Edildi / Kısmi / Gecikti] |
| Proje | link_row |
| Kiracı | link_row |
| Kalan USD | formula |
| Stopaj USD | formula |
| Net SPC'ye USD | formula |
| DSCR | formula |
| DSCR Uyarısı | formula |
| Geri Ödeme Dönemleri | link_row |
| Borç Servisi USD | formula |
| Gerçek Veri | boolean |
| SPC İşletme Gideri USD | number |
| CFADS USD | formula |

</details>

### Giderler ve Vergiler  (ID 1299135)

Proje / sevkiyat giderleri ve vergiler; USD karşılığı.

- Birincil alan: `Gider Adı` | Alan sayısı: 12
- İlişkiler (alan -> hedef tablo):
  - `Proje` -> **Projeler** (1299126)
  - `Sevkiyat` -> **Sevkiyatlar** (1299131)
  - `Firma` -> **Firmalar** (1299125)
- Formüller: `USD Karşılığı` (metinleri `FORMULAS.md` içinde)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Gider Adı | text |
| Kategori | single_select [Navlun / Taşıma / Sigorta / Sinosure Primi / Gümrük Vergisi / KDV / Banka / Faiz / Komisyon / Noter / Tescil / Danışmanlık / Hukuk / Bakım / Yedek Parça / ...] |
| Tutar | number |
| Para Birimi | single_select [USD / EUR / CNY / KZT / TRY] |
| Tarih | date |
| Ödeme Durumu | single_select [Bekliyor / Ödendi / Gecikti] |
| Proje | link_row |
| Sevkiyat | link_row |
| Firma | link_row |
| Kur Çarpanı (USD) | number |
| USD Karşılığı | formula |
| Gerçek Veri | boolean |

</details>

### Geri Ödeme Planı  (ID 1299810)

Kredi geri ödeme satırları; kira planı ve gelir-gider dengesiyle bağlıdır.

- Birincil alan: `Dönem` | Alan sayısı: 17
- İlişkiler (alan -> hedef tablo):
  - `Kredi` -> **Krediler** (1299129)
  - `Kira ve Tahsilat Planı` -> **Kira ve Tahsilat Planı** (1299134)
  - `Gelir Gider Dengesi` -> **Gelir Gider Dengesi** (1299815)
- Formüller: `Taksit USD` (metinleri `FORMULAS.md` içinde)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Dönem | text |
| Sıra | number |
| Anapara USD | number |
| Faiz USD | number |
| Kalan Bakiye USD | number |
| Durum | single_select [Planlandı / Ödendi / Gecikti] |
| Kredi | link_row |
| Taksit USD | formula |
| Kira ve Tahsilat Planı | link_row |
| Gelir Gider Dengesi | link_row |
| Vade Tarihi | date |
| Planlanan Ödeme Tarihi | date |
| Fiili Ödeme Tarihi | date |
| Ödeme Referansı / Dekont No | text |
| Ödeme Türü | single_select [Anapara / Faiz / Anapara + faiz / Komisyon / Masraf / Balon ödeme / Erken kapama] |
| Ödeme Gecikme Günü | number |
| Gerçek Veri | boolean |

</details>

### Gelir Gider Dengesi  (ID 1299815)

Proje gelir-gider dengesi; DSCR, CFADS ve geri ödeme satırlarıyla bağlıdır.

- Birincil alan: `Senaryo` | Alan sayısı: 19
- İlişkiler (alan -> hedef tablo):
  - `Proje` -> **Projeler** (1299126)
  - `Geri Ödeme Satırları` -> **Geri Ödeme Planı** (1299810)
- Formüller: `Stopaj USD`, `SPC Net USD`, `Net Nakit USD`, `DSCR`, `Uyarı`, `Borç Servisi USD`, `TOO Net Ödeme Gücü USD`, `CFADS USD` (metinleri `FORMULAS.md` içinde)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Senaryo | text |
| Dönem | text |
| Varyant | single_select [A İç Leasing / B Operasyonel Kiralama / C Satış / D Finance Lease (SPC → TOO)] |
| ÖMG Hizmet Geliri | number |
| TOO Operasyon Gideri | number |
| TOO SPC Ödemesi | number |
| Stopaj Oranı | number |
| Kredi Taksiti USD (elle, plan yoksa) | number |
| Proje | link_row |
| Stopaj USD | formula |
| SPC Net USD | formula |
| Net Nakit USD | formula |
| DSCR | formula |
| Uyarı | formula |
| Geri Ödeme Satırları | link_row |
| Borç Servisi USD | formula |
| TOO Net Ödeme Gücü USD | formula |
| SPC İşletme Gideri USD | number |
| CFADS USD | formula |

</details>

### Kur Takibi  (ID 1299816)

Kur kayıtları. Başka tabloyla bağlantısı yoktur (referans tablo).

- Birincil alan: `Kayıt` | Alan sayısı: 5
- İlişki yok.

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Kayıt | text |
| Tarih | date |
| Kur Çifti | single_select [USD/CNY / USD/KZT / USD/EUR] |
| Kur | number |
| Kullanım Yeri | text |

</details>


---

## 03 Lojistik ve Gümrük

### Sevkiyatlar  (ID 1299131)

Sevkiyat kayıtları; taşıyıcı, gümrük, belge ve taşıma sigortası bağlantıları.

- Birincil alan: `Sevkiyat No` | Alan sayısı: 27
- İlişkiler (alan -> hedef tablo):
  - `Proje` -> **Projeler** (1299126)
  - `Lotlar` -> **Ekipman Lotları** (1299127)
  - `Taşıyıcı` -> **Firmalar** (1299125)
  - `Gümrük İşlemleri` -> **Gümrük İşlemleri** (1299132)
  - `Belgeler` -> **Belgeler** (1299133)
  - `Giderler ve Vergiler` -> **Giderler ve Vergiler** (1299135)
  - `Taşıma Sigortası Poliçesi` -> **Sigortalar** (1301366)
  - `Devir Dayanağı Belge` -> **Belgeler** (1299133)
- Formüller: `Otobüs Adedi`, `Mal Değeri USD`, `Toplam Vergi USD`, `Belge Sayısı`, `Eksik Belge`, `Gider Toplamı`, `Sevkiyat Kontrolü` (metinleri `FORMULAS.md` içinde)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Sevkiyat No | text |
| Incoterm | single_select [DAP / CIF / FOB / EXW / DDP / FCA / CIP / Sınır Teslimi] |
| Çıkış Yeri | text |
| Varış Yeri | text |
| ETD | date |
| ETA | date |
| Taşıma Türü | single_select [Demiryolu / Karayolu / Deniz + Kara] |
| Durum | single_select [Hazırlanıyor / Yolda / Khorgos'ta / Gümrükte / Teslim Edildi] |
| Mülkiyet SPC'ye Geçti | boolean |
| Proje | link_row |
| Lotlar | link_row |
| Taşıyıcı | link_row |
| Gümrük İşlemleri | link_row |
| Belgeler | link_row |
| Giderler ve Vergiler | link_row |
| Otobüs Adedi | formula |
| Mal Değeri USD | formula |
| Toplam Vergi USD | formula |
| Belge Sayısı | formula |
| Eksik Belge | formula |
| Gider Toplamı | formula |
| Gerçek Veri | boolean |
| Teslim Alım Tarihi | date |
| Mülkiyet Devir Tarihi | date |
| Taşıma Sigortası Poliçesi | link_row |
| Devir Dayanağı Belge | link_row |
| Sevkiyat Kontrolü | formula |

</details>

### Gümrük İşlemleri  (ID 1299132)

Beyanname bazlı gümrük vergisi ve KDV hesapları; muafiyet bağlantısı.

- Birincil alan: `Beyanname No` | Alan sayısı: 20
- İlişkiler (alan -> hedef tablo):
  - `Sevkiyat` -> **Sevkiyatlar** (1299131)
  - `Gümrük Müşaviri` -> **Firmalar** (1299125)
  - `Muafiyet / Teşvik` -> **Muafiyetler ve Teşvikler** (1299812)
- Formüller: `KDV USD`, `Toplam Vergi USD`, `Net Gümrük Vergisi USD`, `Net KDV Matrahı USD`, `Net KDV Tahakkuk USD`, `Net Vergi USD`, `KDV Maliyeti USD` (metinleri `FORMULAS.md` içinde)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Beyanname No | text |
| Tür | single_select [Çin İhracat Beyannamesi / Kazakistan İthalat Beyannamesi] |
| Gümrük Matrahı USD | number |
| Gümrük Vergisi USD | number |
| KDV Oranı | number |
| Durum | single_select [Hazırlanıyor / Sunuldu / Kapandı / Tamam / Sorunlu] |
| Sevkiyat | link_row |
| Gümrük Müşaviri | link_row |
| KDV USD | formula |
| Toplam Vergi USD | formula |
| Gerçek Veri | boolean |
| Gümrük Vergisi Muafiyet USD | number |
| KDV Muafiyet USD | number |
| İndirilebilir KDV USD | number |
| Muafiyet / Teşvik | link_row |
| Net Gümrük Vergisi USD | formula |
| Net KDV Matrahı USD | formula |
| Net KDV Tahakkuk USD | formula |
| Net Vergi USD | formula |
| KDV Maliyeti USD | formula |

</details>

### Muafiyetler ve Teşvikler  (ID 1299812)

Proje muafiyet ve teşvik kayıtları; gümrük işlemleriyle bağlıdır.

- Birincil alan: `Ad` | Alan sayısı: 10
- İlişkiler (alan -> hedef tablo):
  - `Proje` -> **Projeler** (1299126)
  - `Gümrük İşlemleri` -> **Gümrük İşlemleri** (1299132)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Ad | text |
| Tür | single_select [AIFC Muafiyeti / KZ İthalat Muafiyeti / Gümrük Teşviki / DTT / Diğer] |
| Dayanak | text |
| Kapsam | long_text |
| Etki | single_select [Stopaj 0 / Gümrük Vergisi Muaf / KDV İade / Diğer] |
| Tutar Etkisi USD | number |
| Durum | single_select [Başvurulacak / Başvuruda / Alındı / Reddedildi] |
| Geçerlilik Bitişi | date |
| Proje | link_row |
| Gümrük İşlemleri | link_row |

</details>


---

## 04 Belge ve Süreç

### Belgeler  (ID 1299133)

Belge kayıtları ve dosya ekleri. Pek çok tablonun kanıt belgesidir; Dosya Kontrolü formülü burada.

- Birincil alan: `Belge Adı` | Alan sayısı: 31
- İlişkiler (alan -> hedef tablo):
  - `Proje` -> **Projeler** (1299126)
  - `Sevkiyat` -> **Sevkiyatlar** (1299131)
  - `Kredi` -> **Krediler** (1299129)
  - `Teminat` -> **Teminatlar** (1299130)
  - `Sözleşmeler` -> **Sözleşmeler** (1301364)
  - `İmalat ve Tedarik` -> **İmalat ve Tedarik** (1299128)
  - `Sevkiyatlar` -> **Sevkiyatlar** (1299131)
  - `Makineler` -> **Makineler** (1299813)
  - `Makineler - Geri Alma Teslim Belgesi` -> **Makineler** (1299813)
  - `Süreç Adımları` -> **Süreç Adımları** (1299137)
- Formüller: `Geçerli mi`, `Gerekli Sayı`, `Gerekli Eksik`, `Gerekli Tamam`, `Dosya Kontrolü` (metinleri `FORMULAS.md` içinde)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Belge Adı | text |
| Tür | single_select [Ticari Fatura / Paketleme Listesi / Demiryolu Konşimentosu (CIM/SMGS) / Menşe Şahadetnamesi / Sigorta Poliçesi / Gümrük Beyannamesi / Satış Sözleşmesi / Finance Lease Sözleşmesi / ...] |
| Durum | single_select [Eksik / Taslak / İmzada / Tamam] |
| Tarih | date |
| Dosya | file |
| Not | long_text |
| Proje | link_row |
| Sevkiyat | link_row |
| Kredi | link_row |
| Teminat | link_row |
| Sevkiyat Durumu | lookup |
| Proje Aşaması | lookup |
| Kredi Durumu | lookup |
| Geçerli Incoterm | multiple_select [EXW / FCA / FOB / CIF / CIP / DAP / DDP / Sınır Teslimi] |
| Geçerli Ödeme Yöntemi | multiple_select [LC / TT / Escrow / Açık Hesap / Seller's Credit] |
| Geçerli Çıkış Modeli | multiple_select [A İç Leasing / B Operasyonel Kiralama / C Satış / D Finance Lease (SPC → TOO)] |
| Proje Incoterm | lookup |
| Proje Ödeme Yöntemi | lookup |
| Proje Çıkış Modeli | lookup |
| Geçerli mi | formula |
| Gerekli Sayı | formula |
| Gerekli Eksik | formula |
| Gerekli Tamam | formula |
| Dosya Kontrolü | formula |
| Gerçek Veri | boolean |
| Sözleşmeler | link_row |
| İmalat ve Tedarik | link_row |
| Sevkiyatlar | link_row |
| Makineler | link_row |
| Makineler - Geri Alma Teslim Belgesi | link_row |
| Süreç Adımları | link_row |

</details>

### Süreç Adımları  (ID 1299137)

Süreç / olay adımları (varlık olayları dahil); kanıt belgesi ve sorumlu firma.

- Birincil alan: `Adım` | Alan sayısı: 27
- İlişkiler (alan -> hedef tablo):
  - `Proje` -> **Projeler** (1299126)
  - `Makine` -> **Makineler** (1299813)
  - `Tahsis` -> **Tahsisler** (1301365)
  - `Sözleşme` -> **Sözleşmeler** (1301364)
  - `Kanıt Belgesi` -> **Belgeler** (1299133)
  - `Sorumlu Firma` -> **Firmalar** (1299125)
- Formüller: `Geçerli mi`, `Geçerli Sayı`, `Geçerli Tamam Sayı`, `Adım Kontrolü`, `Varlık Olay Kontrolü` (metinleri `FORMULAS.md` içinde)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Adım | text |
| Sıra | number |
| Aşama | single_select [1 Yapılandırma / 2 Eximbank / Sinosure Onayı / 3 Rehin ve Bridge / 4 İmalat / 5 Sevkiyat / 6 Gümrük ve Mülkiyet Devri / 7 İpotek Tescili / 8 Sahada İşletme] |
| Sorumlu | text |
| Vade | date |
| Durum | single_select [Bekliyor / Devam Ediyor / Tamam / Engelli] |
| Not | long_text |
| Proje | link_row |
| Geçerli Incoterm | multiple_select [EXW / FCA / FOB / CIF / CIP / DAP / DDP / Sınır Teslimi] |
| Geçerli Ödeme Yöntemi | multiple_select [LC / TT / Escrow / Açık Hesap / Seller's Credit] |
| Geçerli Çıkış Modeli | multiple_select [A İç Leasing / B Operasyonel Kiralama / C Satış / D Finance Lease (SPC → TOO)] |
| Proje Incoterm | lookup |
| Proje Ödeme Yöntemi | lookup |
| Proje Çıkış Modeli | lookup |
| Geçerli mi | formula |
| Geçerli Sayı | formula |
| Geçerli Tamam Sayı | formula |
| Gerçek Veri | boolean |
| Adım Kontrolü | formula |
| Varlık Olayı | single_select [Tahsilat takibi / Vade gecikmesi / Temerrüt değerlendirmesi / İhtar gönderimi / Sözleşme fesih incelemesi / Geri alma talebi / Hukuki takip / icra / Fiili teslim alma / ...] |
| Olay Tarihi | date |
| Makine | link_row |
| Tahsis | link_row |
| Sözleşme | link_row |
| Kanıt Belgesi | link_row |
| Sorumlu Firma | link_row |
| Varlık Olay Kontrolü | formula |

</details>

### Yazışmalar  (ID 1299811)

Firmalar arası yazışma kayıtları.

- Birincil alan: `Konu` | Alan sayısı: 12
- İlişkiler (alan -> hedef tablo):
  - `Proje` -> **Projeler** (1299126)
  - `Kimden Firma` -> **Firmalar** (1299125)
  - `Kime Firma` -> **Firmalar** (1299125)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Konu | text |
| Yön | single_select [SPC ↔ TOO / TOO ↔ ÖMG / SPC ↔ Eximbank / SPC ↔ Sinosure / SPC ↔ Tedarikçi / Diğer] |
| Tür | single_select [E-posta / Resmi Yazı / Teklif / Sözleşme Taslak / Teknik Doküman] |
| Tarih | date |
| İlgili Aşama | single_select [1 Yapılandırma / 2 Eximbank / Sinosure Onayı / 3 Rehin ve Bridge / 4 İmalat / 5 Sevkiyat / 6 Gümrük ve Mülkiyet Devri / 7 İpotek Tescili / 8 Sahada İşletme] |
| Belge Dosyası | file |
| Özet ve Aksiyon | long_text |
| Proje | link_row |
| Kimden Firma | link_row |
| Kime Firma | link_row |
| Gerçek Veri | boolean |
| Yanıt Durumu | single_select [Yanıt Bekliyor / Yanıtlandı / Takip Gerekli / Kapandı] |

</details>


---

## 05 Senaryo Motoru

### Senaryolar  (ID 1303465)

Senaryo ana kaydı (finansman, mülkiyet, ithalat, çıkış modeli, kur varsayımı); alt senaryo tablolarını bağlar.

- Birincil alan: `Senaryo Kodu` | Alan sayısı: 27
- İlişkiler (alan -> hedef tablo):
  - `Proje` -> **Projeler** (1299126)
  - `İthalatçı Firma` -> **Firmalar** (1299125)
  - `Gümrük Beyan Sahibi` -> **Firmalar** (1299125)
  - `Hukuki Malik` -> **Firmalar** (1299125)
  - `Fiili Kullanıcı` -> **Firmalar** (1299125)
  - `Senaryo Finansman Dilimleri` -> **Senaryo Finansman Dilimleri** (1303466)
  - `Senaryo Ödeme Planı` -> **Senaryo Ödeme Planı** (1303467)
  - `Senaryo Varsayımları` -> **Senaryo Varsayımları** (1303468)
  - `Senaryo Değerlendirme` -> **Senaryo Değerlendirme** (1303469)
  - `Senaryo Gelir Gider Akışı` -> **Senaryo Gelir Gider Akışı** (1303470)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Senaryo Kodu | text |
| Senaryo Adı | text |
| Senaryo Sürümü | number |
| Üst Senaryo Kodu | text |
| Senaryo Durumu | single_select [Taslak / Hesaplanıyor / Test Bekliyor / Karşılaştırmaya Hazır / Seçildi / Reddedildi / Arşiv] |
| Senaryo Tipi | single_select [Finansman / Mülkiyet / İthalat / Ticaret / Kiralama / Lojistik / Vergi / Birleşik Model / Kullanıcı Tanımlı] |
| Finansman Stratejisi | text |
| Mülkiyet Modeli | single_select [SPC / TOO / Üçüncü Taraf / Ortak Mülkiyet / Diğer] |
| Incoterm | single_select [EXW / FCA / FOB / CIF / CIP / DAP / DDP / Diğer] |
| Çıkış Modeli | single_select [Finance Lease / Operating Lease / Satış / Hizmet / Kullanım / Alt Kiralama / Karma / Diğer] |
| Para Birimi | single_select [USD / CNY / EUR / KZT / TRY / Çoklu Para Birimi] |
| Kur Varsayımı | number |
| Gerçek Veri | boolean |
| Seçilen Senaryo | boolean |
| Karşılaştırma Grubu | text |
| Varsayım Notları | long_text |
| Hesaplama Sonucu | single_select [Hesaplanmadı / Başarılı / Eksik Veri / Hata] |
| Proje | link_row |
| İthalatçı Firma | link_row |
| Gümrük Beyan Sahibi | link_row |
| Hukuki Malik | link_row |
| Fiili Kullanıcı | link_row |
| Senaryo Finansman Dilimleri | link_row |
| Senaryo Ödeme Planı | link_row |
| Senaryo Varsayımları | link_row |
| Senaryo Değerlendirme | link_row |
| Senaryo Gelir Gider Akışı | link_row |

</details>

### Senaryo Finansman Dilimleri  (ID 1303466)

Senaryonun finansman dilimleri (araç, anapara, faiz, vade, erteleme, balloon, komisyon).

- Birincil alan: `Finansman Dilimi Kodu` | Alan sayısı: 31
- İlişkiler (alan -> hedef tablo):
  - `Senaryo` -> **Senaryolar** (1303465)
  - `Finansör` -> **Firmalar** (1299125)
  - `Senaryo Ödeme Planı` -> **Senaryo Ödeme Planı** (1303467)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Finansman Dilimi Kodu | text |
| Finansman Aracı | single_select [Eximbank Kredisi / Seller's Credit / Banka Nakit Kredisi / Bridge Kredi / Leasing / LC / SBLC / Banka Garantisi / ...] |
| Finansman Alt Türü | text |
| Anapara Tutarı | number |
| Para Birimi | single_select [USD / CNY / EUR / KZT / TRY] |
| Yıllık Faiz Oranı (%) | number |
| Faiz Tipi | single_select [Sabit / Değişken / Endeks + Marj / Faizsiz / Komisyon Bazlı] |
| Endeks | text |
| Marj (%) | number |
| Toplam Vade (Ay) | number |
| Anapara Erteleme (Ay) | number |
| Faiz Erteleme (Ay) | number |
| Erteleme Faizi | single_select [Aylık ödenir / Kapitalize edilir / Vade sonunda ödenir / Tahakkuk yok / Özel kural] |
| Anapara Ödeme Tipi | single_select [Eşit Anapara / Eşit Taksit / Balloon / Tek Ödeme / Düzensiz / Özel] |
| Faiz Ödeme Sıklığı | single_select [Aylık / Üç Aylık / Altı Aylık / Yıllık / Vade Sonu / Özel] |
| Anapara Ödeme Sıklığı | single_select [Aylık / Üç Aylık / Altı Aylık / Yıllık / Vade Sonu / Özel] |
| Gün Sayım Esası | single_select [30/360 / ACT/360 / ACT/365 / ACT/ACT / Belirtilmedi] |
| Kullandırım Tarihi | date |
| Faiz Başlangıç Tarihi | date |
| İlk Ödeme Tarihi | date |
| Vade Sonu Tarihi | date |
| Balloon Tutarı | number |
| Komisyon Tutarı | number |
| Komisyon Oranı (%) | number |
| Teminat | long_text |
| Term Sheet / Kaynak | text |
| Gerçek Veri | boolean |
| Notlar | long_text |
| Senaryo | link_row |
| Finansör | link_row |
| Senaryo Ödeme Planı | link_row |

</details>

### Senaryo Ödeme Planı  (ID 1303467)

Senaryo ödeme planı satırları; toplam borç servisi formülü.

- Birincil alan: `Ödeme Satırı Kodu` | Alan sayısı: 22
- İlişkiler (alan -> hedef tablo):
  - `Senaryo` -> **Senaryolar** (1303465)
  - `Finansman Dilimi` -> **Senaryo Finansman Dilimleri** (1303466)
  - `Senaryo Gelir Gider Akışı` -> **Senaryo Gelir Gider Akışı** (1303470)
- Formüller: `Toplam Borç Servisi` (metinleri `FORMULAS.md` içinde)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Ödeme Satırı Kodu | text |
| Dönem No | number |
| Dönem Başlangıcı | date |
| Vade Tarihi | date |
| Açılış Anapara | number |
| Yeni Kullandırım | number |
| Anapara Ödemesi | number |
| Faiz Tahakkuku | number |
| Faiz Ödemesi | number |
| Komisyon / Ücret | number |
| Balloon Ödemesi | number |
| Kapanış Anapara | number |
| Ödeme Durumu | single_select [Planlandı / Vadesi Geldi / Ödendi / Gecikti / Ertelendi / İptal] |
| Gerçek Ödeme Tarihi | date |
| Gerçek Ödeme Tutarı | number |
| Gerçek Veri | boolean |
| Kaynak / Kanıt | text |
| Notlar | long_text |
| Senaryo | link_row |
| Finansman Dilimi | link_row |
| Toplam Borç Servisi | formula |
| Senaryo Gelir Gider Akışı | link_row |

</details>

### Senaryo Varsayımları  (ID 1303468)

Senaryo varsayımları (parametre, değer, kaynak, doğrulama durumu).

- Birincil alan: `Varsayım Kodu` | Alan sayısı: 12
- İlişkiler (alan -> hedef tablo):
  - `Senaryo` -> **Senaryolar** (1303465)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Varsayım Kodu | text |
| Kategori | single_select [Finansman / Vergi / Gümrük / Kur / Lojistik / Mülkiyet / Kiralama / Satış / Operasyon / Hukuk / Uyum / ...] |
| Parametre Adı | text |
| Değer Metin | long_text |
| Değer Sayı | number |
| Değer Tarih | date |
| Birim | text |
| Kaynak / Belge | text |
| Doğrulama Durumu | single_select [Varsayım / Demo / Kaynak Bekliyor / Belgeyle Doğrulandı / Hukuk / Vergi Görüşü Gerekli] |
| Gerçek Veri | boolean |
| Notlar | long_text |
| Senaryo | link_row |

</details>

### Senaryo Değerlendirme  (ID 1303469)

Senaryo değerlendirme metrikleri (IRR, NPV, DSCR, net kâr vb.).

- Birincil alan: `Değerlendirme Kodu` | Alan sayısı: 10
- İlişkiler (alan -> hedef tablo):
  - `Senaryo` -> **Senaryolar** (1303465)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Değerlendirme Kodu | text |
| Metrik | single_select [Toplam Yatırım Maliyeti / Toplam Finansman Maliyeti / Toplam Vergi / İlk Nakit İhtiyacı / Toplam Gelir / Net Kâr / IRR / NPV / ...] |
| Değer | number |
| Para Birimi / Birim | text |
| Dönem | text |
| Hesaplama Tarihi | date |
| Hesaplama Durumu | single_select [Hesaplanmadı / Ön Hesap / Kontrol Edildi / Eksik Veri / Hata] |
| Kaynak / Formül Açıklaması | long_text |
| Gerçek Veri | boolean |
| Senaryo | link_row |

</details>

### Senaryo Gelir Gider Akışı  (ID 1303470)

Senaryo gelir-gider akışı; toplam gelir/gider, net nakit akışı, borç servisi ve DSCR formülleri.

- Birincil alan: `Nakit Akış Satırı Kodu` | Alan sayısı: 25
- İlişkiler (alan -> hedef tablo):
  - `Senaryo` -> **Senaryolar** (1303465)
  - `Borç Servisi Satırları` -> **Senaryo Ödeme Planı** (1303467)
- Formüller: `Toplam Gelir`, `Toplam Gider`, `Net Nakit Akışı`, `Borç Servisi`, `DSCR` (metinleri `FORMULAS.md` içinde)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Nakit Akış Satırı Kodu | text |
| Dönem No | number |
| Dönem Başlangıcı | date |
| Dönem Sonu | date |
| Kira Geliri | number |
| Hizmet Geliri | number |
| Satış Geliri | number |
| Diğer Gelir | number |
| Operasyon Gideri | number |
| Bakım Gideri | number |
| Sigorta Gideri | number |
| Vergi ve Harç | number |
| Lojistik ve Gümrük | number |
| Yatırım Harcaması | number |
| Diğer Gider | number |
| Para Birimi | single_select [USD / CNY / EUR / KZT / TRY] |
| Gerçek Veri | boolean |
| Notlar | long_text |
| Senaryo | link_row |
| Borç Servisi Satırları | link_row |
| Toplam Gelir | formula |
| Toplam Gider | formula |
| Net Nakit Akışı | formula |
| Borç Servisi | formula |
| DSCR | formula |

</details>


---

## 06 SYS Yönetim

### SYS-001 | Sistem Ana İndeksi  (ID 1301798)

SYS-001 Sistem Ana İndeksi: aktif sürüm, AI başlangıç talimatı, yedekleme politikası.

- Birincil alan: `Sistem Kaydı` | Alan sayısı: 15
- İlişkiler (alan -> hedef tablo):
  - `Aktif Sürüm Kaydı` -> **SYS-002 \| Sistem Sürüm Kayıtları** (1301799)
  - `Son Denetim Kaydı` -> **SYS-006 \| Sistem Denetim ve Testleri** (1301803)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Sistem Kaydı | text |
| Sistem Kodu | text |
| Sistem Adı | text |
| Aktif Sürüm | text |
| Sürüm Durumu | text |
| Son Denetim Tarihi | date |
| Sistem Özeti | long_text |
| AI Başlangıç Talimatı | long_text |
| Yedekleme Politikası | long_text |
| Ana Veritabanı | text |
| Yedek Çalışma Alanı | text |
| Son Doğrulama | text |
| Notlar | long_text |
| Aktif Sürüm Kaydı | link_row |
| Son Denetim Kaydı | link_row |

</details>

### SYS-002 | Sistem Sürüm Kayıtları  (ID 1301799)

SYS-002 Sistem Sürüm Kayıtları: sürüm kodu, tablo/alan/ilişki/formül sayıları, eklenen/değişen/kaldırılan.

- Birincil alan: `Sürüm Kodu` | Alan sayısı: 24
- İlişkiler (alan -> hedef tablo):
  - `SYS-001 | Sistem Ana İndeksi` -> **SYS-001 \| Sistem Ana İndeksi** (1301798)
  - `Yedek Paketleri` -> **SYS-003 \| Sistem Yedek Paketleri** (1301800)
  - `İlgili Değişiklikler` -> **SYS-004 \| Sistem Değişiklik Günlüğü** (1301801)
  - `İlgili Kararlar` -> **SYS-005 \| Sistem Karar Kayıtları** (1301802)
  - `Denetim ve Testler` -> **SYS-006 \| Sistem Denetim ve Testleri** (1301803)
  - `Geri Yükleme İşlemleri` -> **SYS-007 \| Sistem Geri Yükleme ve Klonlama** (1301804)
  - `Görevler` -> **SYS-008 \| Sistem Görev ve Geliştirme Takibi** (1301805)
  - `SYS-010 | AI Oturum ve Devir Kayıtları` -> **SYS-010 \| AI Oturum ve Devir Kayıtları** (1301820)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Sürüm Kodu | text |
| SYS-001 \| Sistem Ana İndeksi | link_row |
| Sürüm Adı | text |
| Sürüm Tarihi | date |
| Sürüm Durumu | text |
| Önceki Sürüm | text |
| Tablo Sayısı | number |
| Alan Sayısı | number |
| İlişki Sayısı | number |
| Formül Sayısı | number |
| Sürüm Açıklaması | long_text |
| Eklenenler | long_text |
| Değişenler | long_text |
| Kaldırılanlar | long_text |
| Bilinen Sorunlar | long_text |
| Test Sonucu | text |
| Demo Sürümü | boolean |
| Yedek Paketleri | link_row |
| İlgili Değişiklikler | link_row |
| İlgili Kararlar | link_row |
| Denetim ve Testler | link_row |
| Geri Yükleme İşlemleri | link_row |
| Görevler | link_row |
| SYS-010 \| AI Oturum ve Devir Kayıtları | link_row |

</details>

### SYS-003 | Sistem Yedek Paketleri  (ID 1301800)

SYS-003 Sistem Yedek Paketleri: yedek türü, konum, bütünlük ve geri yükleme testi.

- Birincil alan: `Yedek Paket Kodu` | Alan sayısı: 18
- İlişkiler (alan -> hedef tablo):
  - `SYS-002 | Sistem Sürüm Kayıtları` -> **SYS-002 \| Sistem Sürüm Kayıtları** (1301799)
  - `SYS-007 | Sistem Geri Yükleme ve Klonlama` -> **SYS-007 \| Sistem Geri Yükleme ve Klonlama** (1301804)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Yedek Paket Kodu | text |
| SYS-002 \| Sistem Sürüm Kayıtları | link_row |
| Sürüm Kodu | text |
| Yedek Türü | text |
| Yedek Tarihi | date |
| Depolama Konumu | text |
| Google Drive Klasör URL | text |
| Paket Dosyası URL | text |
| Manifest Dosyası URL | text |
| Paket İçeriği | long_text |
| Gerçek Ticari Veri İçerir | boolean |
| Demo Veri İçerir | boolean |
| Dosya Boyutu MB | number |
| Kontrol Özeti / Hash | long_text |
| Bütünlük Kontrolü | text |
| Geri Yükleme Testi | text |
| Yedek Durumu | text |
| SYS-007 \| Sistem Geri Yükleme ve Klonlama | link_row |

</details>

### SYS-004 | Sistem Değişiklik Günlüğü  (ID 1301801)

SYS-004 Sistem Değişiklik Günlüğü: yapısal / riskli değişikliklerin önceki-yeni durumu ve geri alma talimatı.

- Birincil alan: `Değişiklik Kodu` | Alan sayısı: 17
- İlişkiler (alan -> hedef tablo):
  - `SYS-002 | Sistem Sürüm Kayıtları` -> **SYS-002 \| Sistem Sürüm Kayıtları** (1301799)
  - `İlgili Karar` -> **SYS-005 \| Sistem Karar Kayıtları** (1301802)
  - `SYS-008 | Sistem Görev ve Geliştirme Takibi` -> **SYS-008 \| Sistem Görev ve Geliştirme Takibi** (1301805)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Değişiklik Kodu | text |
| SYS-002 \| Sistem Sürüm Kayıtları | link_row |
| Değişiklik Tarihi | date |
| İlgili Veritabanı | text |
| Tablo Adı | text |
| Alan / Bileşen | text |
| Değişiklik Türü | text |
| Önceki Durum | long_text |
| Yeni Durum | long_text |
| Değişiklik Gerekçesi | long_text |
| Değişikliği Yapan | text |
| Onaylayan | text |
| Onay Durumu | text |
| Test Sonucu | text |
| Geri Alma Talimatı | long_text |
| İlgili Karar | link_row |
| SYS-008 \| Sistem Görev ve Geliştirme Takibi | link_row |

</details>

### SYS-005 | Sistem Karar Kayıtları  (ID 1301802)

SYS-005 Sistem Karar Kayıtları: kullanıcı onaylı kalıcı kararlar.

- Birincil alan: `Karar Kodu` | Alan sayısı: 16
- İlişkiler (alan -> hedef tablo):
  - `SYS-002 | Sistem Sürüm Kayıtları` -> **SYS-002 \| Sistem Sürüm Kayıtları** (1301799)
  - `SYS-004 | Sistem Değişiklik Günlüğü` -> **SYS-004 \| Sistem Değişiklik Günlüğü** (1301801)
  - `SYS-008 | Sistem Görev ve Geliştirme Takibi` -> **SYS-008 \| Sistem Görev ve Geliştirme Takibi** (1301805)
  - `SYS-010 | AI Oturum ve Devir Kayıtları` -> **SYS-010 \| AI Oturum ve Devir Kayıtları** (1301820)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Karar Kodu | text |
| SYS-002 \| Sistem Sürüm Kayıtları | link_row |
| SYS-004 \| Sistem Değişiklik Günlüğü | link_row |
| Karar Tarihi | date |
| Karar Başlığı | text |
| Konu / Kapsam | text |
| Alınan Karar | long_text |
| Karar Gerekçesi | long_text |
| Değerlendirilen Alternatifler | long_text |
| Karar Durumu | text |
| Kararı Veren | text |
| Kaynak Sohbet / Rapor | text |
| Geçerlilik Başlangıcı | date |
| Yerine Geçen Karar | text |
| SYS-008 \| Sistem Görev ve Geliştirme Takibi | link_row |
| SYS-010 \| AI Oturum ve Devir Kayıtları | link_row |

</details>

### SYS-006 | Sistem Denetim ve Testleri  (ID 1301803)

SYS-006 Sistem Denetim ve Testleri: denetim kapsamı, bulgu sayıları (P0-P3), rapor.

- Birincil alan: `Denetim / Test Kodu` | Alan sayısı: 21
- İlişkiler (alan -> hedef tablo):
  - `SYS-001 | Sistem Ana İndeksi` -> **SYS-001 \| Sistem Ana İndeksi** (1301798)
  - `SYS-002 | Sistem Sürüm Kayıtları` -> **SYS-002 \| Sistem Sürüm Kayıtları** (1301799)
  - `Açılan Görevler` -> **SYS-008 \| Sistem Görev ve Geliştirme Takibi** (1301805)
  - `Kaynak Eski Rapor Kaydı` -> **Table** (620460)
  - `SYS-010 | AI Oturum ve Devir Kayıtları` -> **SYS-010 \| AI Oturum ve Devir Kayıtları** (1301820)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Denetim / Test Kodu | text |
| SYS-001 \| Sistem Ana İndeksi | link_row |
| SYS-002 \| Sistem Sürüm Kayıtları | link_row |
| Denetim Tarihi | date |
| Denetimi Yapan AI / Kişi | text |
| Denetim Türü | text |
| Kapsam | long_text |
| İncelenen Tablo Sayısı | number |
| Bulgu Sayısı | number |
| P0 Bulgu | number |
| P1 Bulgu | number |
| P2 Bulgu | number |
| P3 Bulgu | number |
| Denetim Sonucu | text |
| Rapor Metni | long_text |
| Rapor Dosyası URL | text |
| Veri Anlık Görüntü Tarihi | date |
| Önceki Denetim | text |
| Açılan Görevler | link_row |
| Kaynak Eski Rapor Kaydı | link_row |
| SYS-010 \| AI Oturum ve Devir Kayıtları | link_row |

</details>

### SYS-007 | Sistem Geri Yükleme ve Klonlama  (ID 1301804)

SYS-007 Geri Yükleme ve Klonlama: yedekten kurulum işlemleri ve doğrulama sonuçları.

- Birincil alan: `İşlem Kodu` | Alan sayısı: 19
- İlişkiler (alan -> hedef tablo):
  - `SYS-002 | Sistem Sürüm Kayıtları` -> **SYS-002 \| Sistem Sürüm Kayıtları** (1301799)
  - `İlgili Yedek` -> **SYS-003 \| Sistem Yedek Paketleri** (1301800)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| İşlem Kodu | text |
| SYS-002 \| Sistem Sürüm Kayıtları | link_row |
| İşlem Türü | text |
| Talep Tarihi | date |
| Kaynak Sürüm | text |
| Kaynak Yedek Paketi | text |
| Hedef Çalışma Alanı | text |
| Hedef Veritabanı | text |
| Gerçek Veri Aktarımı | boolean |
| Demo Veri Aktarımı | boolean |
| İşlem Durumu | text |
| Başlangıç Tarihi | date |
| Bitiş Tarihi | date |
| Ön Kontrol Sonucu | long_text |
| Kurulum Sonucu | long_text |
| Doğrulama Sonucu | long_text |
| Hata / Eksik Listesi | long_text |
| Onaylayan | text |
| İlgili Yedek | link_row |

</details>

### SYS-008 | Sistem Görev ve Geliştirme Takibi  (ID 1301805)

SYS-008 Görev ve Geliştirme Takibi: öncelik, durum, sorumlu, tamamlanma kriteri.

- Birincil alan: `Görev Kodu` | Alan sayısı: 21
- İlişkiler (alan -> hedef tablo):
  - `SYS-002 | Sistem Sürüm Kayıtları` -> **SYS-002 \| Sistem Sürüm Kayıtları** (1301799)
  - `SYS-006 | Sistem Denetim ve Testleri` -> **SYS-006 \| Sistem Denetim ve Testleri** (1301803)
  - `İlgili Karar` -> **SYS-005 \| Sistem Karar Kayıtları** (1301802)
  - `İlgili Değişiklik` -> **SYS-004 \| Sistem Değişiklik Günlüğü** (1301801)
  - `SYS-010 | AI Oturum ve Devir Kayıtları` -> **SYS-010 \| AI Oturum ve Devir Kayıtları** (1301820)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Görev Kodu | text |
| SYS-002 \| Sistem Sürüm Kayıtları | link_row |
| SYS-006 \| Sistem Denetim ve Testleri | link_row |
| Görev Başlığı | text |
| Görev Açıklaması | long_text |
| Öncelik | text |
| Görev Durumu | text |
| Sorumlu | text |
| Oluşturma Tarihi | date |
| Hedef Tarih | date |
| Tamamlanma Tarihi | date |
| Bağımlılıklar | long_text |
| Tamamlanma Kriteri | long_text |
| Test Sonucu | long_text |
| İlgili Tablo / Alan | text |
| İlgili Denetim Bulgusu | text |
| İlgili Karar | link_row |
| İlgili Değişiklik | link_row |
| SYS-010 \| AI Oturum ve Devir Kayıtları | link_row |
| Öncelik (Seçmeli) | single_select [P0 / P1 / P2 / P3] |
| Durum (Seçmeli) | single_select [Açık / Bekliyor / Uygulandı – doğrulama bekliyor / Tamamlandı] |

</details>

### SYS-009 | AI İşletim Protokolü  (ID 1301819)

SYS-009 AI İşletim Protokolü: giriş, çalışma, çıkış, yasaklar. Protokolün TEK KAYNAĞI.

- Birincil alan: `Protokol Kodu` | Alan sayısı: 13
- İlişki yok.

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Protokol Kodu | text |
| Protokol Adı | text |
| Protokol Sürümü | text |
| Durum | text |
| Ne Zaman Okunacak | long_text |
| Girişte Zorunlu Adımlar | long_text |
| Çalışma Sırasında Kayıt Kuralları | long_text |
| Çıkışta Zorunlu Adımlar | long_text |
| Yasaklar ve Yetki Sınırları | long_text |
| Eksik Bilgi Yönetimi | long_text |
| Okuma Sırası | long_text |
| Protokol Sahibi / Onay | text |
| Son Gözden Geçirme | date |

</details>

### SYS-010 | AI Oturum ve Devir Kayıtları  (ID 1301820)

SYS-010 AI Oturum ve Devir Kayıtları: her oturum için tek kayıt; sonraki AI için talimat.

- Birincil alan: `Oturum Kodu` | Alan sayısı: 26
- İlişkiler (alan -> hedef tablo):
  - `İlgili Sürüm` -> **SYS-002 \| Sistem Sürüm Kayıtları** (1301799)
  - `İlgili Görevler` -> **SYS-008 \| Sistem Görev ve Geliştirme Takibi** (1301805)
  - `İlgili Kararlar` -> **SYS-005 \| Sistem Karar Kayıtları** (1301802)
  - `İlgili Denetimler` -> **SYS-006 \| Sistem Denetim ve Testleri** (1301803)
  - `SYS-011 | AI Çalışma ve Olay Günlüğü` -> **SYS-011 \| AI Çalışma ve Olay Günlüğü** (1301821)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Oturum Kodu | text |
| Oturum Başlığı | text |
| AI / Model | text |
| Başlangıç Tarihi | date |
| Bitiş Tarihi | date |
| Oturum Durumu | text |
| Kullanıcı Talebi ve Amaç | long_text |
| Okunan SYS Kayıtları | long_text |
| İncelenen Tablolar | long_text |
| Yapılan İşler | long_text |
| Oluşturulan Kayıtlar | long_text |
| Değiştirilen Kayıtlar | long_text |
| Alınan Kararlar | long_text |
| Tespitler ve Riskler | long_text |
| Tamamlanmayan İşler | long_text |
| Sonraki AI İçin Talimat | long_text |
| Kullanıcıdan Beklenenler | long_text |
| Kaynak Sohbet / Dosya | text |
| Kayıt Tamlık Kontrolü | text |
| İlgili Sürüm | link_row |
| İlgili Görevler | link_row |
| İlgili Kararlar | link_row |
| İlgili Denetimler | link_row |
| SYS-011 \| AI Çalışma ve Olay Günlüğü | link_row |
| Created on | created_on |
| Last modified | last_modified |

</details>

### SYS-011 | AI Çalışma ve Olay Günlüğü  (ID 1301821)

SYS-011 AI Çalışma ve Olay Günlüğü: yalnızca hata, geri alma, beklenmedik durum, kullanıcı talebi.

- Birincil alan: `Olay Kodu` | Alan sayısı: 20
- İlişkiler (alan -> hedef tablo):
  - `Oturum Kaydı` -> **SYS-010 \| AI Oturum ve Devir Kayıtları** (1301820)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Olay Kodu | text |
| Olay Tarihi | date |
| Oturum Kodu | text |
| AI / Model | text |
| Olay Türü | text |
| İlgili Veritabanı | text |
| İlgili Tablo | text |
| İlgili Kayıt ID | text |
| İşlem Özeti | long_text |
| İşlem Öncesi Durum | long_text |
| İşlem Sonrası Durum | long_text |
| Kullanıcı Onayı | text |
| Sonuç | text |
| Hata / Uyarı | long_text |
| İlgili Görev Kodu | text |
| İlgili Karar Kodu | text |
| Kanıt / Kaynak | text |
| Oturum Kaydı | link_row |
| Oluşturulma Zamanı | created_on |
| Son Değişiklik Zamanı | last_modified |

</details>


---

## 07 Eski / Referans

### Table  (ID 620460)

Eski AI denetim raporu kaydı (SYS-006 ile bağlı). Korunur, silinmez.

- Birincil alan: `yz raporu` | Alan sayısı: 8
- İlişkiler (alan -> hedef tablo):
  - `SYS-006 | Sistem Denetim ve Testleri` -> **SYS-006 \| Sistem Denetim ve Testleri** (1301803)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| yz raporu | text |
| Notes | long_text |
| Active | boolean |
| Date | date |
| rapor adı | long_text |
| veri tabanı  adı | long_text |
| yz adı | text |
| SYS-006 \| Sistem Denetim ve Testleri | link_row |

</details>


---

## 08 CHAT (konu ve sohbet hafızası)

### CHAT-001 | Konular  (ID 1306063)

CHAT-001 Konular: her konu bir satır (durum, güncel özet, açık noktalar, kararlar, arşiv yolu). Kural: 05_AI_PROTOCOLS/CHAT_PROTOCOL.md.

- Birincil alan: `Konu Kodu` | Alan sayısı: 20
- İlişkiler (alan -> hedef tablo):
  - `CHAT-002 | Notlar` -> **CHAT-002 \| Notlar** (1306064)
  - `CHAT-003 | Sorular` -> **CHAT-003 \| Sorular** (1306065)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Konu Kodu | text |
| Konu Başlığı | text |
| Durum | single_select [Açık / Yarım / Bitti / Arşivlendi] |
| Amaç | long_text |
| Güncel Özet | long_text |
| Açık Noktalar | long_text |
| Alınan Kararlar | long_text |
| Son Konuşan AI | text |
| Son Güncelleme | date |
| Kaynak Sohbetler | long_text |
| Arşiv Yolu | text |
| İlgili SYS Kodları | text |
| CHAT-002 \| Notlar | link_row |
| CHAT-003 \| Sorular | link_row |
| Oluşturulma Zamanı | created_on |
| Son Değişiklik Zamanı | last_modified |
| Rapor Satırı | text |
| Sıradaki Adım | long_text |
| Üst Konu Kodu | text |
| Bölge | single_select [Yapı / Chat / İş] |

</details>

### CHAT-002 | Notlar  (ID 1306064)

CHAT-002 Notlar: konunun içindeki temizlenmiş kayıtlar (kullanıcı sözü, AI görüşü, karar adayı, karar); her not bir konuya bağlıdır.

- Birincil alan: `Not Kodu` | Alan sayısı: 11
- İlişkiler (alan -> hedef tablo):
  - `Konu` -> **CHAT-001 \| Konular** (1306063)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Not Kodu | text |
| Yazan | text |
| Not Türü | single_select [Kullanıcı sözü / AI görüşü / Soru / Öneri / Karar adayı / Karar / Test sonucu / Özet / ...] |
| Onay Durumu | single_select [Onaysız / Kullanıcı onayladı / Reddedildi] |
| İçerik | long_text |
| Tarih | date |
| Kaynak Sohbet | text |
| Konu | link_row |
| Oluşturulma Zamanı | created_on |
| Son Değişiklik Zamanı | last_modified |
| Fikir Durumu | single_select [Park / Konuya dönüştü / Arşiv] |

</details>

### CHAT-003 | Sorular  (ID 1306065)

CHAT-003 Sorular: aynı soruya her AI'nın bağımsız cevabı (ayrı kolon), sentez ve iş emri taslağı, kullanıcı kararı.

- Birincil alan: `Soru Kodu` | Alan sayısı: 16
- İlişkiler (alan -> hedef tablo):
  - `Konu` -> **CHAT-001 \| Konular** (1306063)

<details><summary>Tüm alanlar</summary>

| Alan | Tip |
|---|---|
| Soru Kodu | text |
| Soru | long_text |
| Soru Durumu | single_select [Açık / Cevaplar toplanıyor / Sentezlendi / Onaylandı / İptal] |
| GPT Cevabı | long_text |
| Claude Cevabı | long_text |
| Perplexity Cevabı | long_text |
| Diğer AI Cevabı | long_text |
| Bağımsızlık Notu | text |
| Sentez | long_text |
| Sentezi Yazan | text |
| İş Emri / Prompt | long_text |
| Kullanıcı Kararı | single_select [Bekliyor / Uygula / Geliştir / Beklet / Reddet] |
| Soru Tarihi | date |
| Konu | link_row |
| Oluşturulma Zamanı | created_on |
| Son Değişiklik Zamanı | last_modified |

</details>
