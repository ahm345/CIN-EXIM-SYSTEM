#!/usr/bin/env python3
"""CIN EXIM - Gelen kutusu paketini depodakiyle karşılaştırır (salt okunur; depoya HİÇBİR ŞEY YAZMAZ).

Kullanıcı, yazma yetkisi olmayan bir AI'nın değiştirdiği dosyaları `08_INBOX/<ai>_<tarih>/` altına yükler
(aynı dosya adlarıyla olabilir). Bu araç her dosyayı depodaki sürümüyle karşılaştırır ve neyin yeni,
değişmiş, aynı, belirsiz olduğunu söyler. Birleştirmeyi yazabilen AI fark okunduktan sonra elle yapar.

Kullanım (depo kökünden):
  python3 -I tools/inbox_diff.py 08_INBOX/chatgpt_2026-11-07 [--show]

Eşleştirme: önce paket içi yol depodaki yolla aynı mı (ör. 05_AI_PROTOCOLS/X.md); değilse dosya adı depoda
TAM BİR dosyayla eşleşiyorsa o; birden çok eşleşme "belirsiz", hiç yoksa "yeni".
Üretilen dosyalar (02_DATABASE_SCHEMA/, SCHEMA_DIFFS.md) elle birleştirilmez; araçla yeniden üretilir.
"Silinen satır" çoksa AI eski sürümden çalışmış olabilir: başkasının yeni değişikliğini ezebilir.
"""
import difflib
import os
import sys

sys.dont_write_bytecode = True
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP_DIRS = {".git", "08_INBOX", "history", "__pycache__"}
GENERATED = ("02_DATABASE_SCHEMA/", "04_CHANGE_HISTORY/SCHEMA_DIFFS.md")


def repo_index():
    idx = {}
    for d, dirs, files in os.walk(ROOT):
        dirs[:] = [x for x in dirs if x not in SKIP_DIRS]
        for f in files:
            rel = os.path.relpath(os.path.join(d, f), ROOT).replace(os.sep, "/")
            idx.setdefault(f, []).append(rel)
    return idx


def read(p):
    try:
        with open(p, encoding="utf-8") as fh:
            return fh.read().splitlines()
    except (UnicodeDecodeError, OSError):
        return None


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    show = "--show" in sys.argv
    if len(args) != 1 or not os.path.isdir(args[0]):
        print(__doc__)
        return 2
    pkg = os.path.abspath(args[0])
    idx = repo_index()
    counts = {"aynı": 0, "değişmiş": 0, "yeni": 0, "belirsiz": 0, "üretilen": 0, "okunamadı": 0}
    for d, _, files in os.walk(pkg):
        for f in sorted(files):
            full = os.path.join(d, f)
            rel = os.path.relpath(full, pkg).replace(os.sep, "/")
            target = rel if os.path.isfile(os.path.join(ROOT, rel)) else None
            note = ""
            if not target:
                cands = idx.get(f, [])
                if len(cands) == 1:
                    target, note = cands[0], " (dosya adından eşleşti)"
                elif len(cands) > 1:
                    counts["belirsiz"] += 1
                    print(f"BELİRSİZ   {rel}: birden çok eşleşme: {', '.join(cands)}; hangisi olduğu sorulmalı")
                    continue
            if not target:
                counts["yeni"] += 1
                print(f"YENİ       {rel}: depoda karşılığı yok")
                continue
            if target.startswith(GENERATED[0]) or target == GENERATED[1]:
                counts["üretilen"] += 1
                print(f"ÜRETİLEN   {rel} -> {target}: araçla üretilir, elle birleştirilmez (AI_START.md bölüm 7)")
                continue
            a, b = read(os.path.join(ROOT, target)), read(full)
            if a is None or b is None:
                counts["okunamadı"] += 1
                print(f"OKUNAMADI  {rel} -> {target}: metin değil veya okunamıyor")
                continue
            if a == b:
                counts["aynı"] += 1
                print(f"AYNI       {rel} -> {target}{note}")
                continue
            diff = list(difflib.unified_diff(a, b, "depo/" + target, "paket/" + rel, lineterm="", n=1))
            add = sum(1 for x in diff if x.startswith("+") and not x.startswith("+++"))
            rem = sum(1 for x in diff if x.startswith("-") and not x.startswith("---"))
            warn = ""
            if a and rem > 0.2 * len(a):
                warn = f"  UYARI: {rem} satır silinmiş (dosyanın %{int(100 * rem / len(a))}'i): AI eski sürümden çalışmış, başkasının değişikliğini eziyor olabilir"
            counts["değişmiş"] += 1
            print(f"DEĞİŞMİŞ   {rel} -> {target}{note}: +{add} / -{rem} satır{warn}")
            if show:
                for line in diff[:80]:
                    print("    " + line)
                if len(diff) > 80:
                    print(f"    ... ({len(diff) - 80} satır daha)")
    print("\nÖzet:", ", ".join(f"{k}={v}" for k, v in counts.items() if v) or "paket boş")
    print("Bu araç hiçbir şey yazmadı. Birleştirme: fark okunduktan sonra yazabilen AI, kendi dalında, kullanıcıya göstererek.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
