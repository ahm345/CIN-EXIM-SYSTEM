import json,re
a=json.load(open('/tmp/agent_is.json'))
mk=a['makineler']; sg=a['sigortalar']; bl=a['belgeler']; sr=a['surec']; ki=a['kira']
IS={
 'tarih':'2026-11-09',
 'proje':{'deger':3990000,'pesinatOran':15,'pesinat':598500,'kredi':3391500,'kiraAy':63240,'omgGelir':95000,'stopaj':15,
  'toplamMaliyet':5149665,'vergi':869820,'gider':252195,'bakim':37650,'kiraToplam':3794400,
  'gerekliBelge':bl['gecerli_sayi'],'gerekliAdim':27,'tamamAdim':1,'ilerleme':4},
 'kira':{'donem':ki['donem_sayisi'],'dscr1alti':ki['dscr_1_alti_donem'],'minDscr':ki['min_dscr'],'maxDscr':ki['max_dscr'],'topServis':ki['toplam_borc_servisi'],'topCfads':ki['toplam_cfads']},
 'krediler':[
  {'ad':'Köprü (Bridge) Kredi – %15 peşinat','tutar':598500,'faiz':6.5,'vade':6,'tip':'Bullet (vade sonunda)','faizToplam':19451.28,'toplamServis':617951.28,'eksikBelge':1,'durum':'Başvuru','not':'Kullandırım tarihi ve gerçek teklif yok; oran ve masraflar bağlayıcı değil.'},
  {'ad':"SINOMACH Seller's Credit / Eximbank – %85",'tutar':3391500,'faiz':4.5,'vade':60,'tip':'Eşit anapara','faizToplam':387902.82,'toplamServis':3779402.82,'eksikBelge':6,'durum':'Onay Bekliyor','nakitRehni':10000000,'ipotekOran':1.18,'not':'12 ay anapara ertelemesi bu plana henüz işlenmedi; vadenin erteleme dahil mi hariç mi olduğu kesinleşmeden yeni takvim kurulmayacak (TASK-FIN-001).'}],
 'sevkiyat':[
  {'no':'SHP-001 (Lot-1)','durum':'Teslim Edildi','etd':'2026-08-18','eta':'2026-09-10','adet':25,'deger':1750000,'vergi':381500,'mulkiyet':True,'eksik':5},
  {'no':'SHP-002 (Lot-2)','durum':'Gümrükte','etd':'2026-10-05','eta':'2026-10-28','adet':20,'deger':1400000,'vergi':305200,'mulkiyet':False,'eksik':5},
  {'no':'SHP-003 (Lot-3)','durum':'Hazırlanıyor','etd':'2027-02-05','eta':'2027-02-22','adet':12,'deger':840000,'vergi':183120,'mulkiyet':False,'eksik':5}],
 'lotlar':[
  {'ad':'Lot-1 (25)','adet':25,'toplam':1750000,'ted':'İmalatçı A','uretim':'Teslim Edildi','fat':True},
  {'ad':'Lot-2 (20)','adet':20,'toplam':1400000,'ted':'İmalatçı A','uretim':'Sevkiyata Hazır','fat':True},
  {'ad':'Lot-3 (12)','adet':12,'toplam':840000,'ted':'İmalatçı B','uretim':'Üretimde','fat':False}],
 'gumruk':[{'gv':g['gumruk_vergisi'],'kdv':g['kdv']} for g in a['gumruk']],
 'makine':{'toplam':mk['toplam'],'spc':mk['mulkiyet_durumu']['SPC mülkiyetinde'],'gumruk':mk['mulkiyet_durumu']['Gümrükte'],'tedarikci':mk['mulkiyet_durumu']['Tedarikçide'],
  'malikYok':mk['operasyon_kontrolu']['HUKUKİ MALİK EKSİK'],'sigortaYok':mk['gecerli_sigorta_yok']},
 'sigorta':{'toplam':sg['toplam'],'gecerli':sg['durum']['Geçerli'],'dolmus':sg['durum']['SÜRESİ DOLDU'],'enErken':sg['en_erken_bitis']},
 'belgeler':{'toplam':bl['toplam'],'eksik':bl['durum']['Eksik'],'taslak':bl['durum']['Taslak'],'imzada':bl['durum']['İmzada'],'tamam':bl['gecerli_tamam'],'liste':[x['ad'] for x in bl['eksik_belge_adlari']]},
 'surec':{'toplam':sr['toplam'],'bekliyor':sr['durum']['Bekliyor'],'devam':sr['durum']['Devam Ediyor'],'tamam':sr['durum']['Tamam'],'modelDisi':sr['adim_kontrolu']['SEÇİLİ PROJE MODELİNE UYGUN DEĞİL']},
 'teminat':{'say':len(a['teminatlar']),'hukuki':sum(1 for t in a['teminatlar'] if t['hukuki_dogrulama']=='Gerekli')},
 'sozlesme':{'say':len(a['sozlesmeler'])},
 'tahsis':{'say':a['tahsisler']['toplam']},
}
h=open('base.html',encoding='utf8').read()
css=open('add.css',encoding='utf8').read()+open('add2.css',encoding='utf8').read()+open('add3.css',encoding='utf8').read()+open('add4.css',encoding='utf8').read()+open('add5.css',encoding='utf8').read()+open('add6.css',encoding='utf8').read()+open('add7.css',encoding='utf8').read()+open('add9.css',encoding='utf8').read()+open('add11.css',encoding='utf8').read()+open('add13.css',encoding='utf8').read()+open('add15.css',encoding='utf8').read()
is2=open('is2.json',encoding='utf8').read()
js=open('add.js',encoding='utf8').read().replace('__IS__',json.dumps(IS,ensure_ascii=False))+open('add2.js',encoding='utf8').read().replace('__IS2__',is2)+open('add3.js',encoding='utf8').read()+open('add4.js',encoding='utf8').read()+open('add5.js',encoding='utf8').read()+open('add6.js',encoding='utf8').read()+open('add7.js',encoding='utf8').read()+open('add8.js',encoding='utf8').read()+open('add9.js',encoding='utf8').read()+open('add10.js',encoding='utf8').read()+open('add12.js',encoding='utf8').read()+open('add13.js',encoding='utf8').read()+open('add11.js',encoding='utf8').read().replace('__BEL__',open('bel.json',encoding='utf8').read()).replace('__CAT__',open('cat.json',encoding='utf8').read())+open('add14.js',encoding='utf8').read()+open('add15.js',encoding='utf8').read()+open('add16.js',encoding='utf8').read()+open('add17.js',encoding='utf8').read().replace('__DRV__',open('drive.json',encoding='utf8').read())+open('add18.js',encoding='utf8').read()
def rep(old,new):
    global h
    assert old in h,('yok:',old[:70]); h=h.replace(old,new,1)
rep('</style>\n\n<div class="wrap">',css+'</style>\n\n<div class="wrap">') if '</style>\n\n<div class="wrap">' in h else None
if css not in h:
    i=h.index('</style>',h.index('<div class="wrap">')-3000); h=h[:i]+css+h[i:]
# yönlendirme
rep("const curKey=()=>{const h=(location.hash||'#bugun').slice(1);return views[h]?h:'genel'};","let CUR=null;const curKey=()=>{const h=(CUR||location.hash||'#bugun').replace('#','');return views[h]?h:'genel'};")
rep("const h = (location.hash || '#bugun').slice(1);\n  const key = views[h] ? h : 'genel';","const key = curKey();")
rep("$('#view').innerHTML = pageFx(key, views[key]());","$('#view').innerHTML = _segWrap(key)+pageFx(key, views[key]())+(window.pageNote?window.pageNote(key):'');")
rep("window.scrollTo(0, NAVF?0:(SCR[location.hash||'#bugun']||0));","try{window.scrollTo(0, NAVF?0:(SCR[key]||0))}catch(e){}")
rep("window.addEventListener('scroll',()=>{SCR[location.hash||'#bugun']=window.scrollY},{passive:true});","window.addEventListener('scroll',()=>{SCR[curKey()]=window.scrollY},{passive:true});")
rep("window.addEventListener('hashchange', route);",js+"\nwindow.addEventListener('hashchange', ()=>{CUR=null;route()});\ndocument.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[href^=\"#\"]');if(!a||a.classList.contains('rl'))return;e.preventDefault();CUR=a.getAttribute('href').slice(1);try{history.replaceState(null,'','#'+CUR)}catch(x){}route()});")
rep("SEL=+a.dataset.t;location.hash='#ag';if(location.hash==='#ag')route()","SEL=+a.dataset.t;CUR='ag';try{history.replaceState(null,'','#ag')}catch(x){}route()")
rep("key.startsWith('n:')?'Yeni konu taslağı'","key.startsWith('sn:')?'Senaryo taslağı':key.startsWith('n:')?'Yeni konu taslağı'")
rep("'Yeni konu taslağı':'Bugün'","'Yeni konu taslağı':key.startsWith('pn:')?'Sayfa notu ('+key.split(':')[1]+')':'Bugün'")
rep("Baserow 263856 ve CIN-EXIM-SYSTEM deposu · salt okunur","Baserow 263856 ve CIN-EXIM-SYSTEM deposu · salt okunur · İş verisi: ${IS.tarih} (canlı değil)")
# bölüm adları
open('panel_v3_full.html','w',encoding='utf8').write(h)
# iskeleti kaldır (artifact için)
i=h.index('<title>');body=h[i:]
j=body.rindex('</body>');body=body[:j]
open('panel_v3_artifact.html','w',encoding='utf8').write(body)
print('ok',len(body))
