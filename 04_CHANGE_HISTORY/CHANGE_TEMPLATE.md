# Değişiklik Kaydı Şablonu

Her anlamlı değişiklik için `CHANGELOG.md` en üstüne aşağıdaki alanlarla bir kayıt ekle. Küçük metin düzeltmeleri için commit mesajı yeterlidir. Baserow'da **yapısal / riskli** değişiklik varsa ayrıca `SYS-004`'e kayıt aç (SYS yazma izni gerekir).

```
## <sürüm> — <YYYY-MM-DD> — <kısa başlık>

| Alan | Değer |
|---|---|
| Ne vardı? | |
| Ne eklendi? | |
| Ne değişti? | |
| Ne kaldırıldı? | |
| Neden? | |
| Etkilenen tablolar | |
| Etkilenen formüller ve ilişkiler | |
| Kim yaptı (AI / model / oturum kodu) | |
| Kullanıcı onayı (kim, ne zaman, hangi sözle) | |
| Test (ne yapıldı, sonuç; başarısızlıkları gizleme) | |
| GitHub commit / PR | |
| Baserow'da uygulandı mı? (evet / hayır / kısmen; hangi kayıt ID'leri) | |
| SYS referansları (TASK / CHG / DEC / oturum) | |
| Geri alma planı | |
| Bilinen eksikler | |
```

Kurallar:

- Yapılmayan testi "başarılı" yazma; yapılmadıysa "yapılmadı" yaz.
- Onay alınmadıysa "onay yok" yaz ve uygulamaya geçme.
- Zaman damgası için saat aracını kullan; saat uydurma.
