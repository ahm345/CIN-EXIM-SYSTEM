# GIT_ACCESS — AI'lar bu depoya nasıl girer, kim yazabilir

> Depo: `github.com/ahm345/CIN-EXIM-SYSTEM` · Görünürlük: **public** (2026-11-07 salt okunur sınandı: kimlik bilgisi olmadan web sayfası, ham dosya ve API 200 döndü).
> Bu dosya **sır içermez** (token, parola yok). Erişim bilgisi bu depoya, Baserow'a veya sohbete **yazılmaz**.

## 1. Claude Code oturumu nasıl girdi (2026-11-06/07)

Claude Code / claude.ai oturumuna kullanıcının **kendi Claude hesabına bağlı GitHub yetkisi** üzerinden depo eklenir (oturum aracı `add_repo`). Oturum kimlik bilgisini kullanıcıdan istemez: platform, kullanıcının GitHub yetkilendirmesini kontrol eder ve oturuma **süreli, yalnızca o oturumda geçerli** bir erişim verir; `git clone` ve `git push` bu erişimle çalışır.

Sonuçları:

- Bu erişim bir parola veya token **değildir**, başka bir AI'ya **devredilemez**; oturum bitince geçerliliğini yitirir.
- Başka bir AI ürününün (ChatGPT, Gemini vb.) Claude'un bu bağlantısına erişimi **yoktur**. Her ürün için erişim ayrıca kurulur (bölüm 3).
- Oturumun yazma yetkisi vardı, ama `CLAUDE.md` kuralı gereği değişiklikler **dala** (`ai/<model>/<görev-kodu>`) yazılır; `main`'e itme kullanıcı onayıyla yapılır.

## 2. Önceki "Add files via upload" commit'leri

Bu commit'ler GitHub web arayüzünden **kullanıcının kendi hesabıyla** yüklenmiştir (başka AI'ların ürettiği dosyaların elle yüklenmesi). Yani o AI'ların depoya yazma yetkisi olmadığı gözlemiyle uyumludur. Bu bir güvenlik sorunu değil, kullanılan yöntemdir.

## 3. Başka bir AI nasıl girer

Önce AI'nın **ne yapabildiğine** bak:

| Yetenek | Ne yapabilir |
|---|---|
| Web'den URL okuyabiliyor | Depo public olduğu sürece **giriş gerekmez**: `https://raw.githubusercontent.com/ahm345/CIN-EXIM-SYSTEM/main/AI_START.md` adresini okuyup oradaki sırayı izler. Dosya yolu = depo yolu. |
| `git` çalıştırabiliyor | `git clone https://github.com/ahm345/CIN-EXIM-SYSTEM.git` (giriş gerekmez). Yalnızca okur. |
| Hiçbiri yok (yalnızca sohbet) | Kullanıcı `AI_START.md` ve gerekli dosyaları sohbete **yükler** veya yapıştırır. |

**Yazma** (commit/push) için AI'nın GitHub'da yetkilendirilmesi gerekir. Güvenlik sırasıyla:

1. **Yazma yetkisi verme (varsayılan, en güvenli).** AI dosyayı üretir, kullanıcı GitHub web'den yükler veya Claude Code oturumu dala işler. Şu an uygulanan yöntem budur.
2. **Ürünün kendi GitHub bağlayıcısı.** Ürün ayarlarında kullanıcı **kendi GitHub hesabını** bağlar ve yalnızca bu depoyu seçer. Sır sohbete girmez. (Hangi üründe bulunduğu zamanla değişir; ürünün ayarlarına bak.)
3. **Tek depoya sınırlı, kısa ömürlü token** (son çare). GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens**: *Repository access* = yalnızca bu depo; *Contents* = Read (yalnızca okuma) veya Read and write; süre 7–30 gün. Token'ı yalnızca ürünün **gizli anahtar/secret alanına** koy. **Asla** sohbete, Baserow'a (SYS-010/011 dahil), commit'e veya bu depoya yazma. Sızdıysa GitHub'dan hemen iptal et.

Hangi yol seçilirse seçilsin kurallar aynıdır: **dal + commit mesajında SYS referansı + `main`'e itme kullanıcı onayıyla** (`CLAUDE.md`, `SYS_GIT_LINKING.md`).

## 4. Public mi private mı

Depoda **satır verisi yok** (şema, formül metinleri, iş kuralları, bilinen sorunlar, finansman yapısı var). Public kalması herkese şunları gösterir: tablo/alan adları, formüller, KI-01…KI-18 sorun listesi, finansman/DSCR tasarım notları.

**Öneri: private yap, ama sırayla.** Private olunca "giriş gerekmez" yolu (bölüm 3, ilk iki satır) kapanır. Önce kullanılacak AI'ların erişim yolunu hazırla (bağlayıcı, token veya yükleme), sonra GitHub → Settings → General → Danger Zone → *Change visibility* → Private.

Karar kullanıcıdadır; bu belge yalnızca durumu ve sırayı anlatır.
