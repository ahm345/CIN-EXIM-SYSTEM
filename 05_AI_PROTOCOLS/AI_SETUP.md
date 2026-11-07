# AI platformları: okuma ve yazma kurulumu

> Ürün özellikleri ve plan koşulları sık değişir. Aşağıdaki "doğrulandı" işareti yalnızca oturum içinde okunan kaynağı gösterir; `Doğrulanmadı` olanları kullanıcı ürün sayfasından teyit eder. Sır (token, parola) bu dosyaya yazılmaz.

## Rol dağılımı

| AI | Git okuma | Git yazma | Baserow | Rol |
|---|---|---|---|---|
| Claude Code (web / masaüstü) | Evet (depo oturuma bağlanır) | Evet, kendi dalına; `main`'e kullanıcı onayıyla | Claude bağlayıcısı | **Tek yazıcı**: birleştirme, araçlar, devir |
| Claude (claude.ai) | Doğrulanmadı | Hayır varsay | Claude bağlayıcısı | Tartışma, sentez |
| ChatGPT | GitHub bağlayıcısı (Doğrulanmadı) | Hayır varsay; Codex ajanı PR açabilir (Doğrulanmadı) | Baserow doğrudan bağlantı (doğrulandı: baserow.io/user-docs/mcp-server) | Tartışma, kod/analiz |
| Perplexity | Raw URL ile (depo public iken) | **Yok** | Özel bağlayıcı ücretli plana bağlı, bağlanmıyor | **Yalnızca araştırma**; çıktı `08_RESEARCH/` |

## Ortak kurallar

- Her AI önce `AI_START.md`'yi okur.
- `main`'e doğrudan yazılmaz; dal: `ai/<model>/<görev>`.
- Yazamayan AI dosyayı `08_INBOX/` biçiminde üretir, kullanıcı bir dala yükler.
- Mevcut dosyanın üzerine **yükleme** yapılmaz (sessiz ezme riski); araçla üretilen dosyalar elle yazılmaz.
- Baserow bağlayıcısında önce yalnızca okuma araçlarını aç; yazma araçlarını açmak kullanıcı kararıdır. Baserow belgesi izin ekranlarını tutarsız anlatıyor, hangi araçların açıldığına bakılmalıdır.
- Token gerekirse: yalnızca bu depoya, `Contents` izniyle, 7–30 gün süreli; yalnızca ürünün gizli alanında (`GIT_ACCESS.md`).

## Kurulum sonrası sınama

Yeni sohbette: "AI_START.md'yi oku, SYS-009 sürümünü ve açık istekleri söyle." AI okuyamadığını açıkça söylemeli; okumuş gibi davranmamalı (`PLATFORM_SETUP.md` bölüm 4).
