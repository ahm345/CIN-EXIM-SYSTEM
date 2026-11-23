# AI DEVİR TESTİ (kullanıcı yapar, sonucu yazar)

Bu test geçmeden "AI'lar birbirinin işini devralıyor" denmez.

1. Yeni bir ChatGPT sohbeti aç (talimat AI_PLATFORM_TALIMATI.md konmuş). Yalnız "Başla" yaz.
   GEÇTİ ölçütü: SYS-009'u okuduğunu söyler, SYS-010'daki son oturumu ve KNW-001 "Kaldığımız Yer"i doğru özetler, erişemediğini belirtir.
2. Ona küçük bir iş ver, yarıda durdur.
   GEÇTİ ölçütü: Yazma erişimi yoksa kaldığı yeri MD olarak sana verir; yazma erişimi varsa SYS-010'a kayıt açar.
3. Yeni bir Claude sohbetinde "Kaldığımız yerden devam et" de.
   GEÇTİ ölçütü: Doğru işi ve doğru noktayı bulur, yapılmış işi tekrar yapmaz.
4. Gemini için 1. adımı tekrarla.
Sonuçları KNW-002 (AI Görüşleri) tablosuna "Doğrulama" alanıyla yaz.
