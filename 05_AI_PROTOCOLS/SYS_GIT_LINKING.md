# SYS ↔ Git Bağlantı Standardı

Amaç: aynı bilgiyi iki yere yazmadan, **Git'teki teknik değişiklik** ile **Baserow SYS'teki iş/süreç kaydını** birbirine bağlamak. Git commit geçmişi "ne değişti"yi; SYS tabloları "neden, kim onayladı, görev, oturum, denetim"i tutar.

## 1. Hangi sistem neyi tutar

| SYS tablosu | Görevi | Git karşılığı | Bağlantı |
|---|---|---|---|
| SYS-001 Ana indeks | Sistem ve tablo dizini, aktif sürüm | `01_SYSTEM_TREE/`, `02_DATABASE_SCHEMA/INVENTORY.json` | Şema envanteri tablo ID'lerini taşır |
| SYS-002 Sürüm kayıtları | Sürüm kodu, tablo/alan/ilişki/formül sayıları | `07_TESTS_AND_RELEASES/RELEASES.md`, Git etiketi | Sayılar `INVENTORY.json meta` ile karşılaştırılır |
| SYS-003 Yedek paketleri | Yedek türü, konum, bütünlük, geri yükleme testi | (Git yedek değildir) | Yedek manifesti dosyası depoya konabilir; URL SYS-003 `Manifest Dosyası URL`'ine yazılır |
| SYS-004 Değişiklik günlüğü | Yapısal/riskli değişiklik, önceki/yeni durum, geri alma | `04_CHANGE_HISTORY/CHANGELOG.md`, commit | Çapraz referans (aşağıda) |
| SYS-005 Karar kayıtları | Kullanıcı onaylı kalıcı kararlar | `03_BUSINESS_RULES/` (karar durumu sütunu) | Kural satırı `DEC-…` koduna referans verir |
| SYS-006 Denetim ve testler | Denetim kapsamı, bulgular | `07_TESTS_AND_RELEASES/` | Rapor dosyası yolu SYS-006 `Rapor Dosyası URL`'ine yazılır |
| SYS-007 Geri yükleme/klonlama | Yedekten kurulum işlemleri | `07_TESTS_AND_RELEASES/TEST_CHECKLISTS.md` | Test kanıtı dosyası referanslanır |
| SYS-008 Görev ve geliştirme | Görev, öncelik, sorumlu, kriter | `06_TASKS_AND_HANDOVER/CURRENT_STATE.md` (anlık görüntü) | **Kaynak SYS-008'dir**; Git'tekiler tarihli özettir |
| SYS-009 AI protokolü | Protokol (tek kaynak) | `05_AI_PROTOCOLS/PROTOCOL_MIRROR.md` (yansıma) | Yansıma sürüm ve tarih taşır |
| SYS-010 Oturum/devir | Oturum başına tek kayıt | `06_TASKS_AND_HANDOVER/HANDOVER_TEMPLATE.md` (şablon) | Commit sonuna oturum kodu yazılır |
| SYS-011 Olay günlüğü | Hata, geri alma, beklenmedik durum | – | Git hatası/geri alma olursa kayıt düşülür |

**Kural:** her bilginin tek kaynağı vardır. Görev durumu için kaynak SYS-008, protokol için SYS-009, yapı için canlı Baserow şeması; Git'tekiler bunların tarihli yansımasıdır ve tarihlerini taşır.

## 2. Commit mesajı standardı

```
<kısa özet, emir kipi, ≤72 karakter>

<neden: ne değişti ve neden değişti>

SYS: TASK-xxx; CHG-xxx; DEC-xxx
Oturum: <SYS-010 oturum kodu, ör. CLAUDE-20261106-003>
Baserow'da uygulandı: evet | hayır | kısmen
```

Baserow'da değişiklik yapılmadıysa `SYS:` satırına `-` yaz. Kayıt kodu yoksa uydurma; "yok" yaz.

## 3. Dal ve onay akışı

| Durum | Yol |
|---|---|
| Belge / şema yenileme / küçük düzeltme | `ai/<model>/<görev-kodu>` dalı → Pull Request → kullanıcı onayı → `main` |
| Baserow'da uygulanacak değişiklik | Önce Git'te tasarım ve test planı (PR) → **kullanıcı onayı** → Baserow'da uygulama → test → SYS kayıtları → PR'a sonucu yaz → birleştir |
| İlk kurulum | Doğrudan `main` (tek seferlik istisna, `CHANGELOG.md` repo-v0.1.0) |

Git, Baserow'daki onayı veya kilidi **teknik olarak zorlayamaz**. Görev sahipliği bir koordinasyon kuralıdır: görevi almadan önce SYS-008 `Sorumlu` alanına bak; başka AI'ya atanmış işi onun SYS-010 kaydını okumadan sürdürme. Kesin engelleme için ileride kontrollü bir uygulama katmanı gerekir.

## 4. Mevcut alanlarla geçici bağ

SYS tablolarında şu an **Git referansı için ayrı bir alan yoktur** (SYS-002 ve SYS-004 alan listesi `INVENTORY.json` içinde). Şema değişikliği kullanıcı onayı gerektirdiği için, onay gelene kadar mevcut metin alanlarına şu satır eklenir:

```
GIT: ahm345/CIN-EXIM-SYSTEM@<commit-sha> | PR #<no> | <dosya yolu>
```

| Ne bağlanıyor | Yazılacak mevcut alan |
|---|---|
| Oturumdaki Git işleri | SYS-010 `Kaynak Sohbet / Dosya` |
| Yapısal değişikliğin Git kaydı | SYS-004 `Değişiklik Gerekçesi` (son satır) |
| Denetim raporu dosyası | SYS-006 `Rapor Dosyası URL` |
| Yedek manifesti | SYS-003 `Manifest Dosyası URL` |
| Karar gerekçesi dosyası | SYS-005 `Kaynak Sohbet / Rapor` |

**Kalıcı çözüm önerisi (onay bekliyor, uygulanmadı):** SYS-002 ve SYS-004'e `Git Referansı` (metin) alanı eklemek. Bu bir şema değişikliğidir; SYS-009 gereği açık kullanıcı onayı olmadan yapılmaz.
