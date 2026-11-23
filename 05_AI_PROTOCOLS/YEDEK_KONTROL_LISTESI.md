# YEDEK VE GERİ YÜKLEME KONTROL LİSTESİ (TASK-BAK-001, P0 — kullanıcı yapar)

Yapısal değişiklikten önce. `baserow yedek` (615555) aynı workspace'tedir ve test edilmemiştir; yedek sayılmaz.
1. Baserow'da Workspace usage ekranını aç: gerçek toplam satır sayısını ve 3.000 sınırının kapsamını not et.
2. DB 263856 için dışa aktarma (export) al; dosyayı Drive'a (SURECYONETIM/99_YEDEK) koy; dosya adına tarih yaz.
3. Başka bir Baserow hesabı/workspace'te içe aktar (geri yükleme testi). Tablo sayısı 48 ve satır sayıları (Belgeler 116, Projeler 11, SYS-008 59) eşleşmeli.
4. Sonucu SYS-003'e (yedek kaydı) yaz: yedek yolu, tarih, doğrulama sonucu.
5. GitHub deposunu private yapmayı düşün (kullanıcı kararı).
Bu 4 adım bitmeden Belgeler "Dosya Kontrolü" formülüne ve Projeler tablosunun genelleştirilmesine dokunma.
