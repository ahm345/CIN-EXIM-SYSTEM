# AI Devir Kaydı Şablonu

Asıl devir kaydı Baserow **SYS-010** tablosuna yazılır (oturum başına **tek kayıt**, oturum boyunca güncellenir). Bu şablon, SYS-010 alanlarının nasıl doldurulacağını ve Git tarafında neyin eklenmesi gerektiğini gösterir. SYS yazma izni operasyonel veri yazma izni değildir; kullanıcı kalıcı SYS kayıt izni vermediyse yazmadan önce sor.

## SYS-010 alanları ve doldurma rehberi

| Alan | Ne yazılır | Dikkat |
|---|---|---|
| Oturum Kodu | `<AI>-<YYYYMMDD>-<NNN>` (ör. `CLAUDE-20261106-003`) | Aynı kodun olmadığını kontrol et |
| Oturum Başlığı | Tek satır konu | |
| AI / Model | Ürün + model + bağlantı türü | Model adını biliyorsan yaz; uydurma |
| Başlangıç / Bitiş Tarihi | Yalnızca saat aracından gelen değer | Araç yoksa **boş bırak**; `00:00:00Z` "saat yok" demektir |
| Oturum Durumu | `Devam ediyor` veya `Tamamlandı` + kısa not | İş sürüyorsa "Devam ediyor" kalır |
| Kullanıcı Talebi ve Amaç | Kullanıcının istediği ve verdiği izinler (sözle) | |
| Okunan SYS Kayıtları | Tablo + kayıt ID'leri | Okumadığını yazma |
| İncelenen Tablolar | Okunan tablolar ve **kapsamı** (şema / tüm satır / kısmi) | Okunmayanları da yaz |
| Yapılan İşler | Gerçekten yapılanlar, numaralı | Yapılmayanı yazma |
| Oluşturulan Kayıtlar | Tablo + ID + kod | |
| Değiştirilen Kayıtlar | Tablo + ID + alan; silinenler ayrıca | "Silinen: yok" demek de bilgidir |
| Alınan Kararlar | Yalnızca **kullanıcı kararı**; AI tercihini karar diye yazma | |
| Tespitler ve Riskler | Bulgular, doğrulanmamış iddialar (kaynağıyla) | |
| Tamamlanmayan İşler | Açık kalan görev kodları | |
| Sonraki AI İçin Talimat | İlk 3–5 adım, okuma sırası, yasaklar | Somut ve sıralı olsun |
| Kullanıcıdan Beklenenler | Karar / işlem listesi | |
| Kaynak Sohbet / Dosya | Sohbet adı/tarihi ve `GIT: ahm345/CIN-EXIM-SYSTEM@<sha>` | Git işi varsa |
| Kayıt Tamlık Kontrolü | Hangi doğrulama yapıldı / yapılmadı | "Bağımsız doğrulama yok" de |
| İlgili Sürüm / Görevler / Kararlar / Denetimler | Bağlantı alanları | |

## Git tarafı (her oturum sonunda)

- [ ] Yapısal değişiklik varsa `02_DATABASE_SCHEMA/` yeniden üretildi (`cin-exim-schema-refresh`)
- [ ] `04_CHANGE_HISTORY/CHANGELOG.md` kaydı eklendi (şablon: `CHANGE_TEMPLATE.md`)
- [ ] `06_TASKS_AND_HANDOVER/CURRENT_STATE.md` tarih ve sayılarla güncellendi
- [ ] Yeni sorun/çözüm `07_TESTS_AND_RELEASES/KNOWN_ISSUES.md` içinde işlendi
- [ ] Commit mesajında `SYS:` ve `Oturum:` satırları var (`SYS_GIT_LINKING.md`)
- [ ] Gerçek şirket/müşteri/banka/ödeme verisi depoya girmedi

## Devralan AI için doğrulama

Devir kaydı **beyandır**. Devralan AI en az şunları doğrular:

1. Kayıttaki "yapılan işler"den **en az bir** tanesini canlı veriyle (şema, satır, commit) karşılaştır.
2. "Değiştirilen kayıtlar" listesindeki bir kaydı aç ve içeriğin tarif edilene uyduğunu gör.
3. "Devam ediyor" durumundaysa, oturumun kapanmadığını varsay ve yarım kalan işi kullanıcıya sor.
4. Uyuşmazlık varsa kullanıcıya bildir; hangisinin doğru olduğunu tahmin etme.
