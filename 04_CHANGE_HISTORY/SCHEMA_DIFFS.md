# Şema Değişiklik Günlüğü (otomatik)

> `tools/schema_diff.py` üretir; en yeni kayıt en üstte. Kaynak: `02_DATABASE_SCHEMA/history/` altındaki INVENTORY anlık görüntüleri.
> Burası yalnızca **ne değiştiğini** gösterir. Değişikliğin **nedeni ve onayı** Baserow `SYS-004` ve `CHANGELOG.md` içindedir.
> Tablo ve alanlar Baserow ID'siyle eşlenir (yeniden adlandırma, silip yeniden oluşturmadan ayrılır). Formül etkisi regex ile çıkarılır; kaçırma olabilir.

<!-- KAYITLAR (en yeni üstte) -->

## 2026-11-07T20:44:51+03:00 → 2026-11-07T21:57:34+03:00

Şema özeti: `148555a4be34` → `802b670adb80`

| Sayı | Önce | Sonra |
|---|---|---|
| Tablo | 44 | 44 |
| Alan | 891 | 893 |
| İlişki alanı | 223 | 223 |
| Formül | 91 | 91 |

Özet: 2 alan eklendi

### CHAT-001 | Konular

- `Rapor Satırı`: **alan eklendi** — `text`
- `Sıradaki Adım`: **alan eklendi** — `long_text`

---


## 2026-11-07T15:09:04+03:00 → 2026-11-07T20:44:51+03:00

Şema özeti: `e5a46f04b5d5` → `148555a4be34`

| Sayı | Önce | Sonra |
|---|---|---|
| Tablo | 44 | 44 |
| Alan | 881 | 891 |
| İlişki alanı | 223 | 223 |
| Formül | 91 | 91 |

Özet: 10 alan eklendi

### CHAT-001 | Konular

- `Oluşturulma Zamanı`: **alan eklendi** — `created_on`
- `Son Değişiklik Zamanı`: **alan eklendi** — `last_modified`

### CHAT-002 | Notlar

- `Oluşturulma Zamanı`: **alan eklendi** — `created_on`
- `Son Değişiklik Zamanı`: **alan eklendi** — `last_modified`

### CHAT-003 | Sorular

- `Oluşturulma Zamanı`: **alan eklendi** — `created_on`
- `Son Değişiklik Zamanı`: **alan eklendi** — `last_modified`

### SYS-010 | AI Oturum ve Devir Kayıtları

- `Created on`: **alan eklendi** — `created_on`
- `Last modified`: **alan eklendi** — `last_modified`

### SYS-011 | AI Çalışma ve Olay Günlüğü

- `Oluşturulma Zamanı`: **alan eklendi** — `created_on`
- `Son Değişiklik Zamanı`: **alan eklendi** — `last_modified`

---


## 2026-11-06T08:57:59+03:00 → 2026-11-07T15:09:04+03:00

Şema özeti: `a8068f47e2bc` → `e5a46f04b5d5`

| Sayı | Önce | Sonra |
|---|---|---|
| Tablo | 41 | 44 |
| Alan | 845 | 881 |
| İlişki alanı | 219 | 223 |
| Formül | 91 | 91 |

Özet: 3 tablo eklendi

### CHAT-001 | Konular

- **tablo eklendi** — 14 alanla eklendi

### CHAT-002 | Notlar

- **tablo eklendi** — 8 alanla eklendi

### CHAT-003 | Sorular

- **tablo eklendi** — 14 alanla eklendi

---


## 2026-11-06T08:57:59+03:00 — başlangıç noktası

İlk anlık görüntü (şema özeti `a8068f47e2bc`; 41 tablo / 845 alan / 219 ilişki / 91 formül). Bundan önceki sürümler için fark kaydı yoktur; sonraki şema değişiklikleri bu noktadan itibaren yazılır.

---

