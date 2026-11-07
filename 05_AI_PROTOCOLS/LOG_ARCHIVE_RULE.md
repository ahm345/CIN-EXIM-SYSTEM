# LOG_ARCHIVE_RULE — Log arşiv kuralı (Baserow satır limiti için)

> **KABUL EDİLDİ — SYS-005 `DEC-SYS-003` (2026-11-07).** Kullanıcı, Claude'un önerisini devretti ("senin dediğini yapalım"); **eşikler ve saklama sayıları Claude önerisidir**, kullanıcı rakamları tek tek incelemedi. Rakamları değiştirmek istenirse DEC-SYS-003 yeni bir kararla yerine geçer. Protokolün tek kaynağı Baserow `SYS-009`'dur; bu kural SYS-009'a **işlenmedi**, SYS-005 kararı ve bu dosya ayrıntıdır. KI-16 (3.000 satır limiti) hâlâ bağımsız doğrulanmadı.

## 1. Neden

`KNOWN_ISSUES.md` KI-16: Baserow ücretsiz planda **3.000 satır** tüm çalışma alanı için ortaktır; `baserow yedek` kopyası aynı havuzdadır. **Bu rakam SYS beyanıdır, bağımsız doğrulanmadı** (kullanıcı Baserow *Workspace usage* sayfasından teyit etmeli; bkz. §6).

Durum (Baserow'dan **2026-11-07 salt okunur sayıldı**): SYS-010 8, SYS-011 17, SYS-004 23, SYS-008 15 satır, yani log tabloları toplam ≈ 63 satır. `CLAUDE-20261105-002` beyanına göre operasyonel tablolar 335, SYS tabloları ≈ 45 satırdı (yedek kopya sayılmamıştı). **Log tabloları bugün limit sorunu değildir; kural önleyicidir.** Limite yaklaşmanın asıl yolu yedek kopya ve operasyonel veri büyümesidir (bkz. §6).

Satır geçmişi/çöp kutusu kısadır (KI-17, beyan: ≈14 gün). **Baserow'dan silinen satırın geri gelmesine güvenme; Git arşivi asıl kopyadır.**

## 2. Kapsam

| Tablo | Arşivlenebilir mi | Not |
|---|---|---|
| SYS-011 (olay günlüğü) | **Evet** | Yalnızca hata/geri alma/olay kaydı; bir oturuma bağlıysa bağ metin olarak arşive yazılır. |
| SYS-010 (oturum/devir) | **Evet, yalnızca kapanmış oturumlar** | `Devam ediyor` olanlar **asla** arşivlenip silinmez (araç reddeder). Önce kullanıcı onayıyla kapatılır (`BLOCKED_BY_MISSING_INFO.md` #20). |
| SYS-004 (yapısal değişiklik) | **Hayır** | Geri alma talimatı taşır; kalıcı kayıt. |
| SYS-005 (kararlar), SYS-008 (görevler), SYS-001/002/003/006/007/009 | **Hayır** | Kalıcı kayıt veya aktif iş. |
| Operasyonel tablolar | **Hayır** | Bu kural log içindir; iş verisi arşivlenmez/silinmez. |
| `baserow yedek` (ID 615555) | **Hayır, dokunma** | Yedek kopyayı CSV'ye alıp küçültme kararı **kullanıcının** (§6). |

## 3. Tetikleyiciler (öneri)

| Seviye | Koşul | AI ne yapar |
|---|---|---|
| Uyarı | Çalışma alanı toplamı ≥ **2.100** satır (%70), veya SYS-011 > **200**, veya SYS-010 > **50** satır | Başlangıç raporunda kullanıcıya bildirir, arşiv önerir. |
| Öncelikli | Toplam ≥ **2.550** (%85) | Arşivi P1 görev olarak SYS-008'e yazar (onayla). |
| Kritik | Toplam ≥ **2.850** (%95) | Yeni log yazmadan önce kullanıcıya sorar; yazma başarısız olabilir, başarı iddia etme. |

Toplam satır sayısını AI **doğrudan göremez**. İki yol: kullanıcıdan *Workspace usage* değerini iste, veya her tablodan `list_table_rows` (`size=1`) `count` değerini topla (41 tablo + yedek veritabanı). Sayılmayan yerleri ("yedek kopya sayılmadı") raporda açıkça yaz.

## 4. Saklama (öneri)

- **SYS-010:** son **10 kapanmış** oturum canlıda kalır; daha eskileri arşivlenebilir. `Devam ediyor` oturumların hepsi kalır. DEMO oturumlar (ör. `DEMO-AI-HANDOVER-…`) öncelikli adaydır.
- **SYS-011:** son **30 gün** canlıda kalır (`Olay Tarihi` doluysa); daha eskileri arşivlenebilir. Tarihi boş olan satırları eski sayma, kullanıcıya sor.

## 5. Prosedür: arşivle → doğrula → onay al → sil

1. **Oku.** Aday satırları Baserow `list_table_rows` ile **tüm alanlarıyla** oku, bir JSON dosyasına yaz (örn. `satirlar.json`).
2. **Arşivle.** `python3 -I tools/archive_log.py archive --table SYS-011 --rows satirlar.json` — Git'e `LOG_ARCHIVE/SYS-011_id<ilk>-<son>.md` ve `.json` yazar. Araç `Devam ediyor` oturumları ve kapsam dışı tabloları reddeder, var olan arşivin üzerine yazmaz.
3. **Commit + push** (dal `ai/<model>/<görev-kodu>`; mesajda `SYS:` ve `Oturum:` satırları, bkz. `SYS_GIT_LINKING.md`).
4. **Doğrula.** `python3 -I tools/archive_log.py verify --table SYS-011 --ids <silinecek ID'ler>` — hepsi arşivde değilse **silme yapılmaz**.
5. **Kullanıcıdan açık onay iste.** Listeyi ver: tablo, ID'ler, adet, arşiv dosyası, commit. Onay olmadan silme **yasak** (`AI_START.md` altın kural 2).
6. **Sil.** Yalnızca onaylanan ID'leri sil; başka satıra dokunma. Başarısızsa başarı iddia etme.
7. **Kaydet.** SYS-010'a **tek satırlık özet**: tablo, ID aralığı, adet, arşiv dosyası, commit. (Silme yapısal değişiklik değildir; SYS-004'e yazılmaz.) Kaynak ve tarih bilgisi commit'tedir; saat uydurma.

## 6. Kararlar ve açık kalanlar

Karara bağlandı (DEC-SYS-003, 2026-11-07): eşikler (§3), saklama sayıları (§4), kuralın kabulü. **Her silme yine tek tek açık kullanıcı onayı ister** (§5 adım 5); kural, silme izni değildir.

Hâlâ kullanıcıda:
1. Gerçek limit: Baserow *Workspace usage* sayfasındaki toplam satır sayısı ve plan sınırı (KI-16 doğrulaması).
2. `baserow yedek` kopyası CSV'ye alınıp küçültülsün mü? (Limitin asıl tüketicisi olabilir; sayılmadı.)
3. DEMO oturum/olay satırları (`DEMO-…`) arşivlenip silinebilir mi? (Silme için ayrıca açık onay gerekir.)

## 7. Yasaklar

- Arşivsiz silme. Arşivi doğrulamadan silme.
- Kullanıcı onayı olmadan Baserow'dan satır silme.
- `Devam ediyor` oturumu arşivleyip silme; onaysız "Tamamlandı" yapma.
- Arşive gerçek şirket/banka/ödeme verisi veya parola koyma (log kayıtlarında varsa arşivlemeden önce kullanıcıya bildir).
- `baserow yedek` (ID 615555) veritabanına yazma.
