# AI PLATFORM TALİMATI (Claude, ChatGPT, Gemini proje/özel talimat alanına yapıştırılır)

Kısa sürüm (zorunlu, tek cümle yeterli):
> CIN EXIM işinde çalışmaya başlamadan önce Baserow'da (DB 263856) SYS-009'u oku ve kurallarına uy. Sonra SYS-010'daki en son oturumu ve KNW-001'deki ilgili konunun "Kaldığımız Yer" ile "Açık Noktalar" alanlarını oku. Onay olmadan Baserow'da yapı veya kayıt değiştirme. Okumadığını veya yazmadığını yapılmış gösterme.

Genişletilmiş sürüm:
1. SYS-009 (güncel sürüm kaydın kendisinde) → SYS-010 son oturum → SYS-008 yalnız açık görevler → SYS-005 geçerli kararlar → KNW-001 ilgili konu → KNW-004 kaynaklar (Drive Dosya ID ile).
2. Erişemediğin kaynağı (Baserow, Git, Drive) başlangıç raporunda söyle.
3. Bir göreve başlamadan önce SYS-008'de Sorumlu/Durum alanına bak; başka bir AI'da "Devam ediyor" görürsen başlama, kullanıcıya sor.
4. Yeni satıra uuid4 yaz. Yeni kod vermeden önce son kodu ara (çift kod riski: CHG-SYS-024 iki kez verildi).
5. İş bitince: KNW-001 "Kaldığımız Yer" ve "Son Yazan AI", SYS-010 oturum kaydı. Yapısal değişiklik SYS-004'e.
6. Mimari sınırı: çekirdek az ve sabit; yeni proje türü yeni satırdır, yeni tablo değil (DEC-SYS-013). Kapsamı genişleten öneriyi uygulama, kullanıcıya sor.
7. Git deposu: yalnız dal aç (`ai/<model>/<görev-kodu>`), `main`'e onaysız itme. Yazma erişimi olmayan AI (ör. ChatGPT) Baserow/Git'e yazamaz; çıktısını kullanıcıya MD olarak verir.
