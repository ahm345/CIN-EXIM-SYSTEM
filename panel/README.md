# panel/ — CIN EXIM Kontrol Paneli (kaynak)

Tek dosyalık HTML panel. claude.ai artifact olarak yayınlanır (sürüm 23, `KiPnhegHRuhXBdtweNDLWN`); Baserow canlı okuma yalnız artifact'ın MCP yeteneğiyle çalışır. Google Sites'ta bu yetenek yoktur (SYS-008 TASK-WEB-001).

## Derleme
```
cd panel/src
python3 build.py            # panel_v3_full.html ve panel_v3_artifact.html üretir
NODE_PATH=<jsdom'un olduğu node_modules> node t9.js   # jsdom testi (panel_v3_artifact.html okur)
```
`dist/CIN_EXIM_Kontrol_Paneli_v23.html` bu kaynaktan üretilen artifact gövdesidir (derleme sonucu birebir aynı doğrulandı).

## Dosyalar
- `add.js … add15.js`, `add*.css`: sırayla birleştirilir (sıra `build.py` içinde; üst düzey `const` adları ortak kapsamdadır).
- `base.html` iskelet; `agent_is.json`, `is2.json`, `bel.json`, `cat.json` gömülü veri (Baserow'dan alınmış DEMO anlık görüntüsü, 2026-11-09/17).
- `t9.js` jsdom testi, `pw40.py` Playwright ekran kontrolü.

## Kurallar
- Panel Baserow'a yazmaz (`WRITE_OK=false`). Yazma katmanı onay, önizleme, geri alma olmadan açılmaz.
- Gömülü veri DEMO'dur. Gerçek ticari veri bu depoya konmaz.
- Değişiklik: dal aç, SYS-004/SYS-010 referansı ver.
