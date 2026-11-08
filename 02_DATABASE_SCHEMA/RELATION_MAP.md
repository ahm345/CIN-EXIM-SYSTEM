# Tablo İlişki Haritası

> Otomatik üretildi (`tools/build_schema_docs.py`), kaynak: canlı şema 2026-11-08T16:01:05+03:00. Kenar etiketi = iki tablo arasındaki ilişki alanı sayısı (çift yönlü alanlar tek sayılır).

## 1. Grup düzeyinde harita

```mermaid
flowchart LR
    G01["01 İş Çekirdeği (10 tablo)"]
    G02["02 Finansman ve Nakit Akışı (7 tablo)"]
    G03["03 Lojistik ve Gümrük (3 tablo)"]
    G04["04 Belge ve Süreç (3 tablo)"]
    G05["05 Senaryo Motoru (6 tablo)"]
    G06["06 SYS Yönetim (11 tablo)"]
    G07["07 Eski / Referans (1 tablo)"]
    G08["08 CHAT (konu ve sohbet hafızası) (3 tablo)"]
    G01 ---|11| G02
    G01 ---|6| G03
    G01 ---|13| G04
    G01 ---|6| G05
    G02 ---|1| G03
    G02 ---|2| G04
    G03 ---|2| G04
    G06 ---|1| G07
```

## 2. Operasyonel tablolar (grup 01-04)

```mermaid
flowchart LR
    T1299125["Firmalar"]
    T1299126["Projeler"]
    T1299127["Ekipman Lotları"]
    T1299128["İmalat ve Tedarik"]
    T1299129["Krediler"]
    T1299130["Teminatlar"]
    T1299131["Sevkiyatlar"]
    T1299132["Gümrük İşlemleri"]
    T1299133["Belgeler"]
    T1299134["Kira ve Tahsilat Planı"]
    T1299135["Giderler ve Vergiler"]
    T1299136["Bakım ve Yedek Parça"]
    T1299137["Süreç Adımları"]
    T1299810["Geri Ödeme Planı"]
    T1299811["Yazışmalar"]
    T1299812["Muafiyetler ve Teşvikler"]
    T1299813["Makineler"]
    T1299814["Hizmet Kayıtları"]
    T1299815["Gelir Gider Dengesi"]
    T1299816["Kur Takibi"]
    T1301364["Sözleşmeler"]
    T1301365["Tahsisler"]
    T1301366["Sigortalar"]
    T1299125 ---|6| T1299126
    T1299125 ---|1| T1299127
    T1299125 ---|1| T1299128
    T1299125 ---|2| T1299129
    T1299125 ---|3| T1299130
    T1299125 ---|1| T1299131
    T1299125 ---|1| T1299132
    T1299125 ---|1| T1299134
    T1299125 ---|1| T1299135
    T1299125 ---|1| T1299137
    T1299125 ---|2| T1299811
    T1299125 ---|8| T1299813
    T1299125 ---|1| T1299814
    T1299125 ---|2| T1301364
    T1299125 ---|1| T1301365
    T1299125 ---|1| T1301366
    T1299126 ---|1| T1299127
    T1299126 ---|1| T1299129
    T1299126 ---|1| T1299131
    T1299126 ---|1| T1299133
    T1299126 ---|1| T1299134
    T1299126 ---|1| T1299135
    T1299126 ---|1| T1299136
    T1299126 ---|1| T1299137
    T1299126 ---|1| T1299811
    T1299126 ---|1| T1299812
    T1299126 ---|1| T1299814
    T1299126 ---|1| T1299815
    T1299126 ---|1| T1301364
    T1299127 ---|1| T1299128
    T1299127 ---|1| T1299131
    T1299127 ---|1| T1299136
    T1299127 ---|1| T1299813
    T1299127 ---|1| T1301364
    T1299128 ---|1| T1299133
    T1299129 ---|1| T1299130
    T1299129 ---|1| T1299133
    T1299129 ---|1| T1299810
    T1299130 ---|1| T1299133
    T1299131 ---|1| T1299132
    T1299131 ---|2| T1299133
    T1299131 ---|1| T1299135
    T1299131 ---|1| T1301366
    T1299132 ---|1| T1299812
    T1299133 ---|1| T1299137
    T1299133 ---|2| T1299813
    T1299133 ---|1| T1301364
    T1299134 ---|1| T1299810
    T1299136 ---|1| T1299813
    T1299137 ---|1| T1299813
    T1299137 ---|1| T1301364
    T1299137 ---|1| T1301365
    T1299810 ---|1| T1299815
    T1299813 ---|1| T1299814
    T1299813 ---|1| T1301365
    T1299813 ---|1| T1301366
    T1299814 ---|1| T1301364
    T1301364 ---|1| T1301365
    classDef ext stroke-dasharray: 4 3
```

## 3. Senaryo motoru (grup 05) ve bağlandığı tablolar

```mermaid
flowchart LR
    T1303465["Senaryolar"]
    T1303466["Senaryo Finansman Dilimleri"]
    T1303467["Senaryo Ödeme Planı"]
    T1303468["Senaryo Varsayımları"]
    T1303469["Senaryo Değerlendirme"]
    T1303470["Senaryo Gelir Gider Akışı"]
    T1299125["Firmalar"]:::ext
    T1299126["Projeler"]:::ext
    T1299125 ---|4| T1303465
    T1299125 ---|1| T1303466
    T1299126 ---|1| T1303465
    T1303465 ---|1| T1303466
    T1303465 ---|1| T1303467
    T1303465 ---|1| T1303468
    T1303465 ---|1| T1303469
    T1303465 ---|1| T1303470
    T1303466 ---|1| T1303467
    T1303467 ---|1| T1303470
    classDef ext stroke-dasharray: 4 3
```

## 4. SYS yönetim tabloları (grup 06)

```mermaid
flowchart LR
    T1301798["SYS-001"]
    T1301799["SYS-002"]
    T1301800["SYS-003"]
    T1301801["SYS-004"]
    T1301802["SYS-005"]
    T1301803["SYS-006"]
    T1301804["SYS-007"]
    T1301805["SYS-008"]
    T1301819["SYS-009"]
    T1301820["SYS-010"]
    T1301821["SYS-011"]
    T620460["Table"]:::ext
    T620460 ---|1| T1301803
    T1301798 ---|1| T1301799
    T1301798 ---|1| T1301803
    T1301799 ---|1| T1301800
    T1301799 ---|1| T1301801
    T1301799 ---|1| T1301802
    T1301799 ---|1| T1301803
    T1301799 ---|1| T1301804
    T1301799 ---|1| T1301805
    T1301799 ---|1| T1301820
    T1301800 ---|1| T1301804
    T1301801 ---|1| T1301802
    T1301801 ---|1| T1301805
    T1301802 ---|1| T1301805
    T1301802 ---|1| T1301820
    T1301803 ---|1| T1301805
    T1301803 ---|1| T1301820
    T1301805 ---|1| T1301820
    T1301820 ---|1| T1301821
    classDef ext stroke-dasharray: 4 3
```

## 5. Tablo -> bağlı olduğu tablolar

Parantez içindeki sayı, o tablodan hedefe giden ilişki alanı sayısıdır. Hızlı etki analizi için kullanın: bir tabloyu değiştirmeden önce buradaki komşulara bakın.

| Tablo | Bağlantılı tablolar |
|---|---|
| Firmalar | Ekipman Lotları (1), Giderler ve Vergiler (1), Gümrük İşlemleri (1), Hizmet Kayıtları (1), Kira ve Tahsilat Planı (1), Krediler (2), Makineler (8), Projeler (6), Senaryo Finansman Dilimleri (1), Senaryolar (4), Sevkiyatlar (1), Sigortalar (1), Sözleşmeler (2), Süreç Adımları (1), Tahsisler (1), Teminatlar (3), Yazışmalar (2), İmalat ve Tedarik (1) |
| Projeler | Bakım ve Yedek Parça (1), Belgeler (1), Ekipman Lotları (1), Firmalar (6), Gelir Gider Dengesi (1), Giderler ve Vergiler (1), Hizmet Kayıtları (1), Kira ve Tahsilat Planı (1), Krediler (1), Muafiyetler ve Teşvikler (1), Senaryolar (1), Sevkiyatlar (1), Sözleşmeler (1), Süreç Adımları (1), Yazışmalar (1) |
| Ekipman Lotları | Bakım ve Yedek Parça (1), Firmalar (1), Makineler (1), Projeler (1), Sevkiyatlar (1), Sözleşmeler (1), İmalat ve Tedarik (1) |
| İmalat ve Tedarik | Belgeler (1), Ekipman Lotları (1), Firmalar (1) |
| Bakım ve Yedek Parça | Ekipman Lotları (1), Makineler (1), Projeler (1) |
| Makineler | Bakım ve Yedek Parça (1), Belgeler (2), Ekipman Lotları (1), Firmalar (8), Hizmet Kayıtları (1), Sigortalar (1), Süreç Adımları (1), Tahsisler (1) |
| Hizmet Kayıtları | Firmalar (1), Makineler (1), Projeler (1), Sözleşmeler (1) |
| Sözleşmeler | Belgeler (1), Ekipman Lotları (1), Firmalar (2), Hizmet Kayıtları (1), Projeler (1), Sözleşmeler (kendine) (1), Süreç Adımları (1), Tahsisler (1) |
| Tahsisler | Firmalar (1), Makineler (1), Sözleşmeler (1), Süreç Adımları (1) |
| Sigortalar | Firmalar (1), Makineler (1), Sevkiyatlar (1) |
| Krediler | Belgeler (1), Firmalar (2), Geri Ödeme Planı (1), Projeler (1), Teminatlar (1) |
| Teminatlar | Belgeler (1), Firmalar (3), Krediler (1) |
| Kira ve Tahsilat Planı | Firmalar (1), Geri Ödeme Planı (1), Projeler (1) |
| Giderler ve Vergiler | Firmalar (1), Projeler (1), Sevkiyatlar (1) |
| Geri Ödeme Planı | Gelir Gider Dengesi (1), Kira ve Tahsilat Planı (1), Krediler (1) |
| Gelir Gider Dengesi | Geri Ödeme Planı (1), Projeler (1) |
| Kur Takibi | - |
| Sevkiyatlar | Belgeler (2), Ekipman Lotları (1), Firmalar (1), Giderler ve Vergiler (1), Gümrük İşlemleri (1), Projeler (1), Sigortalar (1) |
| Gümrük İşlemleri | Firmalar (1), Muafiyetler ve Teşvikler (1), Sevkiyatlar (1) |
| Muafiyetler ve Teşvikler | Gümrük İşlemleri (1), Projeler (1) |
| Belgeler | Krediler (1), Makineler (2), Projeler (1), Sevkiyatlar (2), Sözleşmeler (1), Süreç Adımları (1), Teminatlar (1), İmalat ve Tedarik (1) |
| Süreç Adımları | Belgeler (1), Firmalar (1), Makineler (1), Projeler (1), Sözleşmeler (1), Tahsisler (1) |
| Yazışmalar | Firmalar (2), Projeler (1) |
| Senaryolar | Firmalar (4), Projeler (1), Senaryo Değerlendirme (1), Senaryo Finansman Dilimleri (1), Senaryo Gelir Gider Akışı (1), Senaryo Varsayımları (1), Senaryo Ödeme Planı (1) |
| Senaryo Finansman Dilimleri | Firmalar (1), Senaryo Ödeme Planı (1), Senaryolar (1) |
| Senaryo Ödeme Planı | Senaryo Finansman Dilimleri (1), Senaryo Gelir Gider Akışı (1), Senaryolar (1) |
| Senaryo Varsayımları | Senaryolar (1) |
| Senaryo Değerlendirme | Senaryolar (1) |
| Senaryo Gelir Gider Akışı | Senaryo Ödeme Planı (1), Senaryolar (1) |
| SYS-001 | SYS-002 (1), SYS-006 (1) |
| SYS-002 | SYS-001 (1), SYS-003 (1), SYS-004 (1), SYS-005 (1), SYS-006 (1), SYS-007 (1), SYS-008 (1), SYS-010 (1) |
| SYS-003 | SYS-002 (1), SYS-007 (1) |
| SYS-004 | SYS-002 (1), SYS-005 (1), SYS-008 (1) |
| SYS-005 | SYS-002 (1), SYS-004 (1), SYS-008 (1), SYS-010 (1) |
| SYS-006 | SYS-001 (1), SYS-002 (1), SYS-008 (1), SYS-010 (1), Table (1) |
| SYS-007 | SYS-002 (1), SYS-003 (1) |
| SYS-008 | SYS-002 (1), SYS-004 (1), SYS-005 (1), SYS-006 (1), SYS-010 (1) |
| SYS-009 | - |
| SYS-010 | SYS-002 (1), SYS-005 (1), SYS-006 (1), SYS-008 (1), SYS-011 (1) |
| SYS-011 | SYS-010 (1) |
| Table | SYS-006 (1) |
| CHAT-001 \| Konular | CHAT-002 \| Notlar (1), CHAT-003 \| Sorular (1) |
| CHAT-002 \| Notlar | CHAT-001 \| Konular (1) |
| CHAT-003 \| Sorular | CHAT-001 \| Konular (1) |

## 6. Firmalar rol alanları (mülkiyet ve sorumluluk zinciri)

Aşağıdaki alanların hepsi **Firmalar** tablosuna bağlanır; hukuki malik, fiili kullanıcı, ithalatçı, tescil sahibi gibi rolleri ayırır.

| Tablo | Alan |
|---|---|
| Projeler | İthalatçı Firma, Gümrük Beyan Sahibi, Fatura Alıcısı, İlk Hukuki Malik, Nihai Hedef Malik, Tescil Sahibi |
| Ekipman Lotları | Tedarikçi |
| İmalat ve Tedarik | İmalatçı |
| Krediler | Kreditör, Borçlu |
| Teminatlar | Veren, Lehtar, Bildirim Yapılan Taraf |
| Sevkiyatlar | Taşıyıcı |
| Gümrük İşlemleri | Gümrük Müşaviri |
| Kira ve Tahsilat Planı | Kiracı |
| Giderler ve Vergiler | Firma |
| Süreç Adımları | Sorumlu Firma |
| Yazışmalar | Kimden Firma, Kime Firma |
| Makineler | Saha / Kiracı, Hukuki Malik, Fiili Kullanıcı, İthalatçı Firma, Gümrük Beyan Sahibi, Tescil Sahibi, Zilyet / Teslim Alan, Hedef Hukuki Malik |
| Hizmet Kayıtları | Firma |
| Sözleşmeler | Veren / Satıcı Taraf, Alan / Alıcı Taraf |
| Tahsisler | Kullanan Firma |
| Sigortalar | Sigorta Şirketi |
| Senaryolar | İthalatçı Firma, Gümrük Beyan Sahibi, Hukuki Malik, Fiili Kullanıcı |
| Senaryo Finansman Dilimleri | Finansör |

## 7. Kendine bağlanan alanlar

- Sözleşmeler: `Ana Sözleşme`
