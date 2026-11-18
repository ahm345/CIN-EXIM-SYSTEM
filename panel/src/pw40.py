from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1280,'height':900},device_scale_factor=1)
    errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/work/panel_v3_full.html'); pg.wait_for_timeout(500)
    for k in ['pkart','surec','kontrol','rapor','drive','canli']:
        pg.evaluate(f"location.hash='#{k}'"); pg.wait_for_timeout(400)
        pg.screenshot(path=f's40_{k}.png')
        print(k, pg.inner_text('#nav')[:120].replace('\n',' | '), '||', pg.inner_text('#nav2')[:140].replace('\n',' | '))
    print(errs); b.close()
