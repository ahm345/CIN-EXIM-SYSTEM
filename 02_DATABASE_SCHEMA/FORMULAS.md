# Formüller

> Otomatik üretildi, kaynak: canlı şema 2026-11-08T16:01:05+03:00. Toplam 91 formül. Bir formül değişince bu dosya yeniden üretilmeli ve `04_CHANGE_HISTORY/` altına kayıt düşülmelidir.

## Projeler  (ID 1299126)

### `Peşinat USD`  (alan ID 12040130, sonuç tipi: number)

```
field('Toplam Değer USD') * field('Peşinat Oranı') / 100
```

### `Kredi Tutarı USD`  (alan ID 12040144, sonuç tipi: number)

```
field('Toplam Değer USD') - field('Peşinat USD')
```

### `Lot Toplamı USD`  (alan ID 12040924, sonuç tipi: number)

```
sum(lookup('Ekipman Lotları', 'Toplam USD'))
```

### `Toplam Kredi USD`  (alan ID 12040925, sonuç tipi: number)

```
sum(lookup('Krediler', 'Tutar USD'))
```

### `Sevkiyat Sayısı`  (alan ID 12040926, sonuç tipi: number)

```
count(field('Sevkiyatlar'))
```

### `Gerekli Belge Sayısı`  (alan ID 12040927, sonuç tipi: number)

```
sum(lookup('Belgeler', 'Gerekli Sayı'))
```

### `Eksik Belge Sayısı`  (alan ID 12040928, sonuç tipi: number)

```
sum(lookup('Belgeler', 'Gerekli Eksik'))
```

### `Toplam Gider USD (vergisiz)`  (alan ID 12040930, sonuç tipi: number)

```
sum(lookup('Giderler ve Vergiler', 'USD Karşılığı'))
```

### `Kira Planı SPC Payı USD`  (alan ID 12040931, sonuç tipi: number)

```
sum(lookup('Kira ve Tahsilat Planı', 'SPC Kira Payı USD'))
```

### `Gerekli Adım`  (alan ID 12040932, sonuç tipi: number)

```
sum(lookup('Süreç Adımları', 'Geçerli Sayı'))
```

### `Tamamlanan Adım`  (alan ID 12040933, sonuç tipi: number)

```
sum(lookup('Süreç Adımları', 'Geçerli Tamam Sayı'))
```

### `Süreç İlerleme`  (alan ID 12040934, sonuç tipi: number)

```
if(field('Gerekli Adım') = 0, 0, round(field('Tamamlanan Adım') / field('Gerekli Adım') * 100, 0))
```

### `Etkin Stopaj Oranı`  (alan ID 12064017, sonuç tipi: number)

```
if(field('AIFC Muafiyeti Onaylandı (belge var)'), 0, field('Stopaj Oranı'))
```

### `Toplam Vergi USD (Gümrük)`  (alan ID 12064069, sonuç tipi: number)

```
sum(lookup('Sevkiyatlar', 'Toplam Vergi USD'))
```

### `Bakım ve Yedek Parça USD`  (alan ID 12064070, sonuç tipi: number)

```
sum(lookup('Bakım ve Yedek Parça', 'Toplam USD'))
```

### `Kira Toplamı − Varlık Bedeli USD`  (alan ID 12064071, sonuç tipi: number)

```
field('Kira Planı SPC Payı USD') - field('Toplam Değer USD')
```

### `Toplam Maliyet USD (vergi dahil)`  (alan ID 12064073, sonuç tipi: number)

```
field('Lot Toplamı USD') + field('Toplam Gider USD (vergisiz)') + field('Toplam Vergi USD (Gümrük)') + field('Bakım ve Yedek Parça USD')
```

## Ekipman Lotları  (ID 1299127)

### `Toplam USD`  (alan ID 12040152, sonuç tipi: number)

```
field('Adet') * field('Birim Fiyat USD')
```

### `Lot Operasyon Kontrolü`  (alan ID 12088725, sonuç tipi: text)

```
if(count(field('Proje')) = 0, 'PROJE BAĞLANTISI EKSİK', if(count(field('Tedarikçi')) = 0, 'TEDARİKÇİ EKSİK', if(count(field('İmalat ve Tedarik')) = 0, 'ÜRETİM SİPARİŞİ EKSİK', if(field('İpotek Tescil Edildi') = true && isblank(field('Teslim Tarihi')), 'TESLİM TARİHİ EKSİK', 'OK – bağlantılar ve tarihler tamam; belge dosyası ve hukuki doğrulama ayrıca gerekli'))))
```

## İmalat ve Tedarik  (ID 1299128)

### `Üretim Süresi (Gün)`  (alan ID 12067374, sonuç tipi: number)

```
date_diff('dd', field('Sipariş Tarihi'), field('Planlanan Bitiş'))
```

### `Tedarik Kontrolü`  (alan ID 12088716, sonuç tipi: text)

```
if(count(field('İmalatçı')) = 0, 'İMALATÇI EKSİK', if(totext(field('Üretim Durumu')) = 'Kalite Kontrol (FAT)' && field('Kalite Kontrol Geçti') = false, 'FAT ONAYI BEKLİYOR', if(totext(field('Üretim Durumu')) = 'Sevkiyata Hazır' && field('Kalite Kontrol Geçti') = false, 'HATA: FAT ONAYI OLMADAN SEVKİYAT', if(field('Kalite Kontrol Geçti') = true && count(field('FAT Raporu')) = 0, 'FAT RAPORU EKSİK', if(isblank(field('Planlanan Bitiş')), 'PLAN TARİHİ EKSİK', 'OK – bağlantılar ve tarihler tamam; belge dosyası ve hukuki doğrulama ayrıca gerekli')))))
```

## Bakım ve Yedek Parça  (ID 1299136)

### `Toplam USD`  (alan ID 12040171, sonuç tipi: number)

```
field('Miktar') * field('Birim Maliyet USD')
```

### `Bakım Kontrolü`  (alan ID 12088694, sonuç tipi: text)

```
if(count(field('Makine')) = 0, 'HATA: makine bağlantısı yok', if(isblank(field('Tarih')), 'TARİH EKSİK', if(totext(field('Durum')) = 'Yapıldı' && field('Toplam USD') = 0, 'MALİYET KONTROLÜ', 'KONTROL GEREKLİ')))
```

## Makineler  (ID 1299813)

### `Aktif Tahsis Sayısı`  (alan ID 12067507, sonuç tipi: number)

```
count(filter(lookup('Tahsisler', 'Durum'), totext(lookup('Tahsisler', 'Durum')) = 'Aktif'))
```

### `Geçerli Sigorta Sayısı`  (alan ID 12067508, sonuç tipi: number)

```
count(filter(lookup('Sigortalar', 'Durum'), totext(lookup('Sigortalar', 'Durum')) = 'Geçerli'))
```

### `Operasyon Kontrolü`  (alan ID 12067509, sonuç tipi: text)

```
if(count(field('Hukuki Malik')) = 0, 'HUKUKİ MALİK EKSİK', if(field('Aktif Tahsis Sayısı') > 1, 'ÇAKIŞMA: birden fazla aktif tahsis', if(field('Aktif Tahsis Sayısı') > 0 && count(field('Fiili Kullanıcı')) = 0, 'FİİLİ KULLANICI EKSİK', if(field('Geçerli Sigorta Sayısı') = 0, 'SİGORTA YOK / SÜRESİ DOLMUŞ', 'OK'))))
```

### `Varlık Yaşam Döngüsü Kontrolü`  (alan ID 12094129, sonuç tipi: text)

```
if(count(field('Hukuki Malik')) = 0, 'HUKUKİ MALİK EKSİK', if(isblank(totext(field('Mülkiyet Durumu'))), 'MÜLKİYET DURUMU EKSİK', if(totext(field('Mülkiyet Durumu')) = 'SPC mülkiyetinde' && count(field('Mülkiyet Devir Belgesi')) = 0, 'SPC MÜLKİYET KANITI EKSİK', if(totext(field('Geri Alma Aşaması')) = 'Teslim Alındı' && (isblank(field('Geri Alma Teslim Tarihi')) || count(field('Geri Alma Teslim Belgesi')) = 0), 'GERİ ALMA TESLİM KANITI EKSİK', if(totext(field('Geri Alma Sonrası Durum')) = 'Kiralamaya Hazır' && isblank(field('Yeniden Tahsis Tarihi')), 'YENİDEN TAHSİS TARİHİ EKSİK', 'OK – kayıtlı kanıtlar tamam; hukuki doğrulama ayrıca gerekli')))))
```

## Hizmet Kayıtları  (ID 1299814)

### `Tutar USD`  (alan ID 12047601, sonuç tipi: number)

```
field('Saat veya Km') * field('Birim Ücret USD')
```

## Sözleşmeler  (ID 1301364)

### `Alt Kiralama Kontrolü`  (alan ID 12067510, sonuç tipi: text)

```
if(totext(field('Tür')) = 'Alt Kiralama', if(count(filter(lookup('Ana Sözleşme', 'Alt Kiralama / Yeniden Satış İzni Var'), lookup('Ana Sözleşme', 'Alt Kiralama / Yeniden Satış İzni Var'))) = 0, 'UYARI: ana sözleşmede alt kiralama izni yok', 'İzin var'), '-')
```

### `Sözleşme Kontrolü`  (alan ID 12088618, sonuç tipi: text)

```
if(field('Gerçek Veri') = false && field('Hukuki Doğrulama') != 'Yapıldı', 'DEMO – HUKUKİ İNCELEME GEREKLİ', if(field('Durum') = 'Aktif' && isblank(field('Başlangıç')), 'HATA: başlangıç tarihi yok', if(field('Durum') = 'Aktif' && isblank(field('Bitiş')), 'BİTİŞ / SÜRE KONTROLÜ GEREKLİ', 'KONTROL ET')))
```

## Tahsisler  (ID 1301365)

### `Tahsis Kontrolü`  (alan ID 12088620, sonuç tipi: text)

```
if(count(field('Makine')) = 0, 'HATA: makine bağlantısı yok', if(count(field('Kullanan Firma')) = 0, 'HATA: kullanan firma yok', if(count(field('Sözleşme')) = 0, 'UYARI: sözleşme bağlantısı yok', if(isblank(field('Başlangıç')), 'HATA: başlangıç tarihi yok', if(totext(field('Durum')) = 'Aktif' && isblank(field('Bitiş')), 'SÜRE / BİTİŞ TARİHİ KONTROLÜ', 'KONTROL GEREKLİ')))))
```

## Sigortalar  (ID 1301366)

### `Durum`  (alan ID 12067494, sonuç tipi: text)

```
if(isblank(field('Bitiş')), 'Tarih yok', if(field('Bitiş') < today(), 'SÜRESİ DOLDU', if(isblank(field('Başlangıç')), 'Tarih yok', if(field('Başlangıç') > today(), 'HENÜZ BAŞLAMADI', 'Geçerli'))))
```

### `Sigorta Kontrolü`  (alan ID 12088623, sonuç tipi: text)

```
if(count(field('Makine')) = 0 && count(field('Sevkiyatlar')) = 0, 'HATA: makine veya sevkiyat bağlantısı yok', if(isblank(field('Poliçe No')), 'POLİÇE NUMARASI EKSİK', if(isblank(field('Başlangıç')) || isblank(field('Bitiş')), 'POLİÇE TARİHLERİ EKSİK', if(field('Bitiş') < today(), 'SÜRESİ DOLDU', if(field('Başlangıç') > today(), 'HENÜZ BAŞLAMADI', 'TARİH GEÇERLİ – TEMİNAT KAPSAMI KONTROL EDİLMELİ')))))
```

## Krediler  (ID 1299129)

### `Teminat Sayısı`  (alan ID 12040941, sonuç tipi: number)

```
count(field('Teminatlar'))
```

### `İpotek Teminatı USD`  (alan ID 12040942, sonuç tipi: number)

```
sum(filter(lookup('Teminatlar', 'Tutar USD'), totext(lookup('Teminatlar', 'Tür')) = '1. Derece Ekipman İpoteği'))
```

### `Belge Sayısı`  (alan ID 12040943, sonuç tipi: number)

```
count(field('Belgeler'))
```

### `Eksik Belge`  (alan ID 12040944, sonuç tipi: number)

```
count(filter(lookup('Belgeler', 'Durum'), totext(lookup('Belgeler', 'Durum')) = 'Eksik'))
```

### `Nakit Rehni USD`  (alan ID 12064075, sonuç tipi: number)

```
sum(filter(lookup('Teminatlar', 'Tutar USD'), totext(lookup('Teminatlar', 'Tür')) = 'Üçüncü Taraf Nakit Rehni'))
```

### `İpotek / Kredi Oranı`  (alan ID 12064076, sonuç tipi: number)

```
if(field('Tutar USD') = 0, 0, round(field('İpotek Teminatı USD') / field('Tutar USD'), 2))
```

### `Planlanan Anapara Toplamı USD`  (alan ID 12094238, sonuç tipi: number)

```
sum(lookup('Geri Ödeme Planı', 'Anapara USD'))
```

### `Planlanan Faiz Toplamı USD`  (alan ID 12094239, sonuç tipi: number)

```
sum(lookup('Geri Ödeme Planı', 'Faiz USD'))
```

### `Planlanan Toplam Borç Servisi USD`  (alan ID 12094240, sonuç tipi: number)

```
sum(lookup('Geri Ödeme Planı', 'Taksit USD'))
```

### `Anapara Mutabakatı`  (alan ID 12094241, sonuç tipi: text)

```
if(round(field('Planlanan Anapara Toplamı USD'), 2) = round(field('Tutar USD'), 2), 'OK – anapara eşleşiyor', 'HATA – anapara planı kredi tutarıyla eşleşmiyor')
```

## Teminatlar  (ID 1299130)

### `Teminat Kontrolü`  (alan ID 12088624, sonuç tipi: text)

```
if(isblank(totext(field('Tür'))), 'HATA: teminat türü yok', if(count(field('Veren')) = 0, 'VEREN TARAF EKSİK', if(count(field('Lehtar')) = 0, 'LEHTAR EKSİK', if(totext(field('Hukuki Doğrulama')) = 'Gerekli', 'HUKUKİ DOĞRULAMA GEREKLİ', if(totext(field('Durum')) = 'Aktif' && isblank(field('Bitiş')), 'SÜRE / GEÇERLİLİK KONTROLÜ', 'OK – bağlantılar ve tarihler tamam; belge dosyası ve hukuki doğrulama ayrıca gerekli')))))
```

## Kira ve Tahsilat Planı  (ID 1299134)

### `Kalan USD`  (alan ID 12040167, sonuç tipi: number)

```
field('SPC Kira Payı USD') - field('Tahsil Edilen USD')
```

### `Stopaj USD`  (alan ID 12047613, sonuç tipi: number)

```
field('SPC Kira Payı USD') * sum(lookup('Proje', 'Etkin Stopaj Oranı')) / 100
```

### `Net SPC'ye USD`  (alan ID 12047614, sonuç tipi: number)

```
field('SPC Kira Payı USD') - field('Stopaj USD')
```

### `DSCR`  (alan ID 12047616, sonuç tipi: number)

```
if(field('Borç Servisi USD') = 0, 0, round(field('CFADS USD') / field('Borç Servisi USD'), 2))
```

### `DSCR Uyarısı`  (alan ID 12047617, sonuç tipi: text)

```
if(field('Borç Servisi USD') = 0, 'Borç servisi plana bağlı değil', if(field('DSCR') < 1, 'KRİTİK: DSCR 1 altında', 'Yeterli'))
```

### `Borç Servisi USD`  (alan ID 12064020, sonuç tipi: number)

```
sum(lookup('Geri Ödeme Dönemleri', 'Taksit USD'))
```

### `CFADS USD`  (alan ID 12088368, sonuç tipi: number)

```
field('Net SPC\'ye USD') - field('SPC İşletme Gideri USD')
```

## Giderler ve Vergiler  (ID 1299135)

### `USD Karşılığı`  (alan ID 12064063, sonuç tipi: number)

```
if(totext(field('Para Birimi')) = 'USD', field('Tutar'), field('Tutar') * field('Kur Çarpanı (USD)'))
```

## Geri Ödeme Planı  (ID 1299810)

### `Taksit USD`  (alan ID 12047600, sonuç tipi: number)

```
field('Anapara USD') + field('Faiz USD')
```

## Gelir Gider Dengesi  (ID 1299815)

### `Stopaj USD`  (alan ID 12047602, sonuç tipi: number)

```
field('TOO SPC Ödemesi') * field('Stopaj Oranı') / 100
```

### `SPC Net USD`  (alan ID 12047603, sonuç tipi: number)

```
field('TOO SPC Ödemesi') - field('Stopaj USD')
```

### `Net Nakit USD`  (alan ID 12047604, sonuç tipi: number)

```
field('CFADS USD') - field('Borç Servisi USD')
```

### `DSCR`  (alan ID 12047605, sonuç tipi: number)

```
if(field('Dönem') = 'Tek seferlik', 0, if(field('Borç Servisi USD') = 0, 0, round(field('CFADS USD') / field('Borç Servisi USD'), 2)))
```

### `Uyarı`  (alan ID 12047606, sonuç tipi: text)

```
if(field('Dönem') = 'Tek seferlik', 'DSCR UYGULANMAZ: tek seferlik satış / kredi kapama', if(field('Borç Servisi USD') = 0, 'Borç servisi plana bağlı değil', if(field('DSCR') < 1, 'KRİTİK: DSCR 1 altında', 'Yeterli')))
```

### `Borç Servisi USD`  (alan ID 12067440, sonuç tipi: number)

```
if(count(field('Geri Ödeme Satırları')) > 0, sum(lookup('Geri Ödeme Satırları', 'Taksit USD')), field('Kredi Taksiti USD (elle, plan yoksa)'))
```

### `TOO Net Ödeme Gücü USD`  (alan ID 12067441, sonuç tipi: number)

```
field('ÖMG Hizmet Geliri') - field('TOO Operasyon Gideri') - field('TOO SPC Ödemesi')
```

### `CFADS USD`  (alan ID 12088574, sonuç tipi: number)

```
field('SPC Net USD') - field('SPC İşletme Gideri USD')
```

## Sevkiyatlar  (ID 1299131)

### `Otobüs Adedi`  (alan ID 12040935, sonuç tipi: number)

```
sum(lookup('Lotlar', 'Adet'))
```

### `Mal Değeri USD`  (alan ID 12040936, sonuç tipi: number)

```
sum(lookup('Lotlar', 'Toplam USD'))
```

### `Toplam Vergi USD`  (alan ID 12040937, sonuç tipi: number)

```
sum(lookup('Gümrük İşlemleri', 'Net Vergi USD'))
```

### `Belge Sayısı`  (alan ID 12040938, sonuç tipi: number)

```
count(field('Belgeler'))
```

### `Eksik Belge`  (alan ID 12040939, sonuç tipi: number)

```
count(filter(lookup('Belgeler', 'Durum'), totext(lookup('Belgeler', 'Durum')) = 'Eksik'))
```

### `Gider Toplamı`  (alan ID 12040940, sonuç tipi: number)

```
sum(lookup('Giderler ve Vergiler', 'USD Karşılığı'))
```

### `Sevkiyat Kontrolü`  (alan ID 12088723, sonuç tipi: text)

```
if(count(field('Proje')) = 0, 'PROJE BAĞLANTISI EKSİK', if(count(field('Lotlar')) = 0, 'LOT BAĞLANTISI EKSİK', if(count(field('Taşıyıcı')) = 0, 'TAŞIYICI EKSİK', if(totext(field('Durum')) = 'Teslim Edildi' && isblank(field('Teslim Alım Tarihi')), 'TESLİM TARİHİ EKSİK', if(field('Mülkiyet SPC\'ye Geçti') = true && (isblank(field('Mülkiyet Devir Tarihi')) || count(field('Devir Dayanağı Belge')) = 0), 'MÜLKİYET DEVİR KANITI EKSİK', if(field('Eksik Belge') > 0, concat('EKSİK BELGE VAR: ', totext(field('Eksik Belge'))), 'OK – bağlantılar ve tarihler tamam; belge dosyası ve hukuki doğrulama ayrıca gerekli'))))))
```

## Gümrük İşlemleri  (ID 1299132)

### `KDV USD`  (alan ID 12040159, sonuç tipi: number)

```
field('Net KDV Tahakkuk USD')
```

### `Toplam Vergi USD`  (alan ID 12040163, sonuç tipi: number)

```
field('Net Vergi USD')
```

### `Net Gümrük Vergisi USD`  (alan ID 12088594, sonuç tipi: number)

```
if(field('Gümrük Vergisi USD') - field('Gümrük Vergisi Muafiyet USD') < 0, 0, field('Gümrük Vergisi USD') - field('Gümrük Vergisi Muafiyet USD'))
```

### `Net KDV Matrahı USD`  (alan ID 12088595, sonuç tipi: number)

```
field('Gümrük Matrahı USD') + field('Net Gümrük Vergisi USD')
```

### `Net KDV Tahakkuk USD`  (alan ID 12088596, sonuç tipi: number)

```
if((field('Net KDV Matrahı USD') * field('KDV Oranı') / 100) - field('KDV Muafiyet USD') < 0, 0, (field('Net KDV Matrahı USD') * field('KDV Oranı') / 100) - field('KDV Muafiyet USD'))
```

### `Net Vergi USD`  (alan ID 12088597, sonuç tipi: number)

```
field('Net Gümrük Vergisi USD') + field('Net KDV Tahakkuk USD')
```

### `KDV Maliyeti USD`  (alan ID 12088598, sonuç tipi: number)

```
if(field('Net KDV Tahakkuk USD') - field('İndirilebilir KDV USD') < 0, 0, field('Net KDV Tahakkuk USD') - field('İndirilebilir KDV USD'))
```

## Belgeler  (ID 1299133)

### `Geçerli mi`  (alan ID 12047514, sonuç tipi: boolean)

```
(isblank(totext(field('Geçerli Incoterm'))) || contains(totext(field('Geçerli Incoterm')), join(totext(field('Proje Incoterm')), ''))) && (isblank(totext(field('Geçerli Ödeme Yöntemi'))) || contains(totext(field('Geçerli Ödeme Yöntemi')), join(totext(field('Proje Ödeme Yöntemi')), ''))) && (isblank(totext(field('Geçerli Çıkış Modeli'))) || contains(totext(field('Geçerli Çıkış Modeli')), join(totext(field('Proje Çıkış Modeli')), '')))
```

### `Gerekli Sayı`  (alan ID 12047519, sonuç tipi: number)

```
if(field('Geçerli mi'), 1, 0)
```

### `Gerekli Eksik`  (alan ID 12047520, sonuç tipi: number)

```
if(field('Geçerli mi') && (totext(field('Durum')) != 'Tamam' || count(field('Dosya')) = 0), 1, 0)
```

### `Gerekli Tamam`  (alan ID 12047521, sonuç tipi: number)

```
if(field('Geçerli mi') && totext(field('Durum')) = 'Tamam' && count(field('Dosya')) > 0, 1, 0)
```

### `Dosya Kontrolü`  (alan ID 12067442, sonuç tipi: text)

```
if(count(field('Dosya')) = 0, if(totext(field('Durum')) = 'Tamam', 'HATA: Tamam ama dosya yok', 'DOSYA BEKLENİYOR'), if(totext(field('Durum')) = 'Tamam', 'OK', 'DOSYA VAR – DURUM TAMAMLANMADI'))
```

## Süreç Adımları  (ID 1299137)

### `Geçerli mi`  (alan ID 12047513, sonuç tipi: boolean)

```
(isblank(totext(field('Geçerli Incoterm'))) || contains(totext(field('Geçerli Incoterm')), join(totext(field('Proje Incoterm')), ''))) && (isblank(totext(field('Geçerli Ödeme Yöntemi'))) || contains(totext(field('Geçerli Ödeme Yöntemi')), join(totext(field('Proje Ödeme Yöntemi')), ''))) && (isblank(totext(field('Geçerli Çıkış Modeli'))) || contains(totext(field('Geçerli Çıkış Modeli')), join(totext(field('Proje Çıkış Modeli')), '')))
```

### `Geçerli Sayı`  (alan ID 12047516, sonuç tipi: number)

```
if(field('Geçerli mi'), 1, 0)
```

### `Geçerli Tamam Sayı`  (alan ID 12047517, sonuç tipi: number)

```
if(field('Geçerli mi') && totext(field('Durum')) = 'Tamam', 1, 0)
```

### `Adım Kontrolü`  (alan ID 12088706, sonuç tipi: text)

```
if(field('Geçerli mi') = false, 'SEÇİLİ PROJE MODELİNE UYGUN DEĞİL', if(field('Durum') = 'Tamam' && isblank(field('Not')), 'TAMAM – KANIT / NOT EKLENMELİ', if(field('Durum') = 'Engelli', 'ENGEL VAR – AÇIKLAMA GEREKLİ', 'GEÇERLİ ADIM')))
```

### `Varlık Olay Kontrolü`  (alan ID 12094147, sonuç tipi: text)

```
if(isblank(totext(field('Varlık Olayı'))), 'GENEL ADIM – VARLIK OLAYI DEĞİL', if(count(field('Makine')) = 0, 'MAKİNE BAĞLANTISI EKSİK', if(totext(field('Durum')) = 'Tamam' && count(field('Kanıt Belgesi')) = 0, 'TAMAM AMA KANIT BELGESİ YOK', if(isblank(field('Olay Tarihi')), 'OLAY TARİHİ EKSİK', 'OK – bağlantılar ve tarihler tamam; belge dosyası ve hukuki doğrulama ayrıca gerekli'))))
```

## Senaryo Ödeme Planı  (ID 1303467)

### `Toplam Borç Servisi`  (alan ID 12096657, sonuç tipi: number)

```
field('Anapara Ödemesi') + field('Faiz Ödemesi') + field('Komisyon / Ücret') + field('Balloon Ödemesi')
```

## Senaryo Gelir Gider Akışı  (ID 1303470)

### `Toplam Gelir`  (alan ID 12096681, sonuç tipi: number)

```
field('Kira Geliri') + field('Hizmet Geliri') + field('Satış Geliri') + field('Diğer Gelir')
```

### `Toplam Gider`  (alan ID 12096682, sonuç tipi: number)

```
field('Operasyon Gideri') + field('Bakım Gideri') + field('Sigorta Gideri') + field('Vergi ve Harç') + field('Lojistik ve Gümrük') + field('Yatırım Harcaması') + field('Diğer Gider')
```

### `Net Nakit Akışı`  (alan ID 12096683, sonuç tipi: number)

```
field('Toplam Gelir') - field('Toplam Gider')
```

### `Borç Servisi`  (alan ID 12096685, sonuç tipi: number)

```
sum(lookup('Borç Servisi Satırları', 'Toplam Borç Servisi'))
```

### `DSCR`  (alan ID 12096687, sonuç tipi: number)

```
if(field('Borç Servisi') = 0, 0, field('Net Nakit Akışı') / field('Borç Servisi'))
```
