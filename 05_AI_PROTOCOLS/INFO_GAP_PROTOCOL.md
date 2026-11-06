# INFO_GAP_PROTOCOL — Eksik bilgi toplu soru protokolü

> Kaynak: Baserow `SYS-009` v1.5 (`Eksik Bilgi Yönetimi`). Bu dosya onun ayrıntısıdır; çelişkide SYS-009 geçerlidir. Değişiklik kaydı: SYS-004 `CHG-SYS-013`.

## Amaç

AI'nın eksik bilgiyle belge üretip yarım bırakmasını, ya da soruları parça parça sorup oturumu uzatmasını önlemek. Bilgi eksikliği yüzünden duran her iş baştan tek listede görünür olur.

## Ne zaman uygulanır

Kullanıcı bir **belge, rapor, model, ödeme planı, sözleşme taslağı, analiz** veya benzeri çıktı istediğinde ve çıktı için gereken bilgilerden biri bile kayıtlarda yoksa. Çıktıyı üretmeye başlamadan **önce** uygulanır.

## Adımlar

1. **Önce kendin ara (C).** Baserow SYS/operasyonel kayıtları, bu depo ve önceki oturum kayıtlarında bulabildiğin her bilgiyi kendin bul. Bulabileceğini kullanıcıya sorma.
2. **Eksikleri tek listede topla.** Çıktıyı üretmek için gereken bütün eksik bilgiyi çıkar; ilerledikçe yeni soru çıkarma. (Çalışırken gerçekten öngörülemeyen bir eksik çıkarsa, onu da bu formatta ve tek seferde bildir.)
3. **Üç gruba ayır:**
   - **A — Yalnızca kullanıcı bilir:** karar, tercih, kendi belgesi, sözleşme/term sheet içeriği, gerçek durum.
   - **B — Dış kaynaktan bulunabilir:** mevzuat, piyasa uygulaması, teknik/yasal bilgi. Kullanıcı bunu Perplexity vb. ile araştırabilir. **Her B maddesi için hazır araştırma promptu yaz.**
   - **C — AI kendi bulabilir:** sorulmaz; yaptığını kısaca belirt.
4. **Her soruda** şunu yaz: neden gerekli, hangi çıktıyı engelliyor, cevap yoksa ne yapılacak (varsayılan: o kısım `Bilinmiyor / Doğrulanmadı` kalır).
5. **Uydurma.** Cevap gelmeyen bilgi tahmin edilmez; çıktıda açıkça işaretlenir. Kısmi cevapla üretilen çıktı "TASLAK – eksik bilgi: …" etiketi taşır.
6. **Kayıt.** Bilgi eksikliği yüzünden duran iş SYS-008'de durumuyla ve eksik bilgi listesiyle yazılır; SYS-010 `Tamamlanmayan İşler` alanında referans verilir.

## Soru listesi şablonu

```
EKSİK BİLGİ LİSTESİ — <çıktı adı>
Engellenen çıktı: <belge/model>

A) Yalnızca sen bilirsin
 A1. <soru> — Neden: <…> — Cevap yoksa: <…>

B) Dış kaynaktan bulabilirsin (aşağıda hazır Perplexity promptu var)
 B1. <konu> — Neden: <…>

C) Kendim buldum
 C1. <bilgi> — Kaynak: <tablo/ID veya dosya>
```

## B maddeleri için Perplexity prompt şablonu

```
Konu: <tek cümle>
Bağlam: <gerekli en az bağlam; gizli/ticari ayrıntı yazma>
Lütfen şunları kaynaklarıyla (kurum, tarih, bağlantı) yanıtla:
1. …
2. …
Her madde için "yaygın uygulama", "sözleşmeye/duruma göre değişir" ve "kaynak bulunamadı" ayrımını yap. Uydurma bilgi verme. Resmi kaynakları öncele. Türkçe yanıtla.
```

Kullanıcı Perplexity yanıtını AI'ya getirdiğinde AI kaynakları **doğrulanmamış dış bilgi** olarak işaretler; hukuki ve finansal kararlar için uzman teyidi gerektiğini belirtir.

## Yapılmayacaklar

- Soruları tek tek, oturum boyunca sızdırarak sorma.
- Kullanıcının bulabileceği bilgiyi "bende yok" deyip sormadan varsayma.
- Perplexity yanıtını kesin doğru gibi kayda geçirme.
- Gizli bilgi (parola, API anahtarı, banka bilgisi) isteme veya prompta yazma.
