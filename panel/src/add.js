
/* ===================== v3: İŞ BÖLÜMÜ ===================== */
const IS = __IS__;
const fm = n => (n<0?'−':'')+String(Math.round(Math.abs(n))).replace(/\B(?=(\d{3})+(?!\d))/g,'.');
const fu = n => fm(n)+' USD';
const f2 = n => (Math.round(n*100)/100).toFixed(2).replace('.',',');
const pc = n => (Math.round(n*10)/10).toString().replace('.',',')+'%';

/* --- senaryo motoru: aylık borç servisi, CFADS, DSCR --- */
const SBASE = {V:3990000, dp:15, bOwn:0, bR:6.5, bM:6, lR:4.5, T:60, G:0, inc:1, rent:63240, RM:60, w:15, opex:0, resid:0, inc0:95000};
function sim(p){
  p = Object.assign({}, SBASE, p);
  const bridge = p.bOwn ? 0 : p.V*p.dp/100, loan = p.V*(1-p.dp/100);
  const N = p.inc ? Math.max(p.T-p.G,1) : p.T, LM = p.G+N;
  const H = Math.max(p.RM, LM, bridge>0?p.bM:0);
  let bal = loan, sDS=0, sCF=0, sInt=0, minAll=null, minEx=null, below=0, peakEx=0;
  const m = [];
  for(let k=1;k<=H;k++){
    let li=0, lp=0;
    if(k<=LM){ li = bal*p.lR/1200; lp = k>p.G ? loan/N : 0; bal -= lp; }
    let bi=0, bp=0;
    if(bridge>0 && k<=p.bM){ bi = bridge*p.bR/1200; bp = (k===p.bM) ? bridge : 0; }
    const ds = li+lp+bi+bp, dsEx = ds-bp;
    const cf = k<=p.RM ? p.rent*(1-p.w/100)-p.opex : 0;
    sDS+=ds; sCF+=cf; sInt+=li+bi;
    const d = ds>0 ? cf/ds : null;
    if(d!==null){ if(minAll===null||d<minAll) minAll=d; if(d<1) below++; }
    const dx = dsEx>0 ? cf/dsEx : null;
    if(dx!==null && (minEx===null||dx<minEx)) minEx=dx;
    if(dsEx>peakEx) peakEx=dsEx;
    m.push({k, li, lp, bi, bp, ds, cf, d});
  }
  const k0 = p.RM*(1-p.w/100);
  return {p, m, H, bridge, loan, sDS, sCF, sInt,
    net: sCF - sDS + p.resid,
    avg: sDS>0 ? (sCF+p.resid)/sDS : 0,
    minAll, minEx, below,
    beTotal: k0>0 ? (sDS - p.resid + p.opex*p.RM)/k0 : 0,
    bePeak: (peakEx + p.opex)/(1-p.w/100),
    too: p.inc0 - p.rent};
}
const SCN = () => {
  const b = sim({});
  const be = Math.ceil(b.beTotal/100)*100;
  return [
    ['Mevcut plan', {}],
    ['12 ay anapara ertelemesi (vade 60 içinde)', {G:12, inc:1}],
    ['12 ay erteleme, vade 60 + 12 (kira da 72 ay)', {G:12, inc:0, RM:72}],
    ['AIFC stopaj muafiyeti', {w:0}],
    ['Kira = kırılma kirası ('+fm(be)+')', {rent:be}],
    ['Peşinat öz kaynaktan (köprü yok)', {bOwn:1}]
  ];
};
let CUS = Object.assign({}, SBASE);
try { const s = JSON.parse(localStorage.getItem('cin-sc')||'null'); if(s) CUS = Object.assign({}, SBASE, s); } catch(e){}
const SCOL = ['#3b82c4','#2e9e6b','#d98a1f','#8b5cc9','#c9477a','#6b7a86','#1aa3a3'];

function dscrChart(list){
  const W=760,Hh=250,L=40,R=10,T=10,B=28, ymax=2;
  const Hn = Math.max(...list.map(s=>s.H),12);
  const x = k => L+(k-1)/(Hn-1)*(W-L-R), y = v => T+(1-Math.min(Math.max(v,0),ymax)/ymax)*(Hh-T-B);
  let s = `<svg viewBox="0 0 ${W} ${Hh}" style="width:100%;min-width:560px;display:block" role="img" aria-label="Aylık DSCR">`;
  [0,0.5,1,1.5,2].forEach(v=>{ s+=`<line x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}" style="stroke:var(--line);stroke-width:${v===1?1.6:.7};${v===1?'stroke-dasharray:5 4;stroke:var(--crit)':''}"/><text x="${L-6}" y="${y(v)+4}" text-anchor="end" class="mu">${String(v).replace('.',',')}</text>`; });
  for(let k=1;k<=Hn;k+=(Hn>40?6:3)||1){ s+=`<text x="${x(k)}" y="${Hh-10}" text-anchor="middle" class="mu">${k}</text>`; }
  s+=`<text x="${W-R}" y="${y(1)-5}" text-anchor="end" style="fill:var(--crit);font-size:11px">DSCR = 1</text>`;
  list.forEach((r,i)=>{
    const pts = r.m.filter(a=>a.d!==null).map(a=>`${x(a.k).toFixed(1)},${y(a.d).toFixed(1)}`).join(' ');
    s+=`<polyline points="${pts}" fill="none" style="stroke:${SCOL[i%SCOL.length]};stroke-width:${i===list.length-1?2.6:1.7}"/>`;
  });
  return s+'</svg>';
}
function scTable(rows){
  const cols = rows.map(r=>r[1]);
  const R = [
    ['Aylık SPC kirası', s=>fu(s.p.rent)],
    ['Stopaj', s=>pc(s.p.w)],
    ['Toplam borç servisi', s=>fu(s.sDS)],
    ['Toplam faiz', s=>fu(s.sInt)],
    ['Toplam CFADS (net kira)', s=>fu(s.sCF)],
    ['Dönem sonu nakit (CFADS − borç servisi'+'+devir)', s=>fu(s.net), s=>s.net<0?'bad':'good'],
    ['Ortalama DSCR', s=>f2(s.avg), s=>s.avg<1?'bad':'good'],
    ['En düşük DSCR (köprü balonu hariç)', s=>s.minEx===null?'—':f2(s.minEx), s=>s.minEx!==null&&s.minEx<1?'bad':'good'],
    ['En düşük DSCR (balon dahil)', s=>s.minAll===null?'—':f2(s.minAll), s=>s.minAll!==null&&s.minAll<1?'bad':'good'],
    ['DSCR < 1 olan ay', s=>s.below+' / '+s.m.filter(a=>a.d!==null).length, s=>s.below?'bad':'good'],
    ['Kırılma kirası (toplam denge)', s=>fu(s.beTotal)],
    ['Kırılma kirası (en yüksek ay)', s=>fu(s.bePeak)],
    ['TOO payı (ÖMG geliri − kira)', s=>fu(s.too), s=>s.too<0?'bad':''],
    ['Kira ayı / kredi ayı', s=>s.p.RM+' / '+(s.p.G+(s.p.inc?Math.max(s.p.T-s.p.G,1):s.p.T))]
  ];
  return `<div class="sct"><table><thead><tr><th>Ölçü</th>${rows.map((r,i)=>`<th style="color:${SCOL[i%SCOL.length]}">${esc(r[0])}</th>`).join('')}</tr></thead><tbody>`+
    R.map(r=>`<tr><td class="lbl">${esc(r[0])}</td>${cols.map(s=>`<td class="n ${r[2]?r[2](s):''}">${r[1](s)}</td>`).join('')}</tr>`).join('')+'</tbody></table></div>';
}
function scResult(){
  const rows = SCN().map(a=>[a[0], sim(a[1])]);
  rows.push(['Özel senaryo', sim(CUS)]);
  const leg = rows.map((r,i)=>`<span><i style="background:${SCOL[i%SCOL.length]}"></i>${esc(r[0])}</span>`).join('');
  return `<h3>Karşılaştırma</h3>${scTable(rows)}
  <h3 style="margin-top:14px">Aylık DSCR (1'in altı borç servisi karşılanmıyor demek)</h3><div class="sct">${dscrChart(rows.map(r=>r[1]))}</div><div class="leg">${leg}</div>`;
}
const SF = [
 ['V','Varlık değeri (USD)'],['dp','Peşinat %'],['bOwn','Peşinat kaynağı',[[0,'Köprü kredi'],[1,'Öz kaynak']]],['bR','Köprü faizi % (yıllık)'],['bM','Köprü vadesi (ay)'],
 ['lR','Seller\'s credit faizi %'],['T','Kredi vadesi (ay)'],['G','Anapara erteleme (ay)'],['inc','Erteleme vadeye',[[1,'Dahil'],[0,'Ek']]],
 ['rent','SPC kirası / ay (USD)'],['RM','Kira süresi (ay)'],['w','Stopaj %'],['opex','SPC işletme gideri / ay'],['resid','Dönem sonu devir bedeli (USD)'],['inc0','ÖMG hizmet geliri / ay']];
views.senaryo = function(){
  const f = SF.map(a=>{
    const id='sf_'+a[0];
    return a[2] ? `<label>${a[1]}<select id="${id}" data-sf="${a[0]}">${a[2].map(o=>`<option value="${o[0]}"${+CUS[a[0]]===o[0]?' selected':''}>${o[1]}</option>`).join('')}</select></label>`
                : `<label>${a[1]}<input id="${id}" data-sf="${a[0]}" type="number" step="any" value="${CUS[a[0]]}"></label>`;
  }).join('');
  return `<div class="demo">Girdiler DEMO projeden (Kazakistan 57 otobüs). Gerçek teklif geldiğinde değerleri değiştir; kurallar aynı çalışır.</div>
  <section class="panel" style="margin-bottom:14px"><h2>Senaryolar: finansman ve kira</h2>
  <p class="note" style="margin:0 0 10px">Aynı varlık ve aynı kira planı üzerinde finansman seçeneklerini yan yana dener. Özel senaryoya yazdığın girdiler yalnızca bu tarayıcıda saklanır, Baserow'a gitmez. “Talebe ekle” sonucu Toplam talepler listesine metin olarak koyar. “Mevcut plana döndür” özel senaryoyu Baserow'daki plan değerlerine sıfırlar. Mal alımı, faiz veya işçilik için ödeyebileceğin en yüksek sınırı görmek istiyorsan <a href="#teklif">Teklif sınırı</a> sayfasına bak. Senaryo tablolarına yazmak için <a href="#giris">Giriş</a> formunu kullan; AI senin “evet”inle işler (TASK-FIN-001).</p>
  <div id="scres">${scResult()}</div></section>
  <section class="panel"><h2>Özel senaryo</h2><div class="sf" id="scform">${f}</div>
  <p style="margin:0"><button type="button" class="btn" id="scAdd">Talebe ekle</button> <button type="button" class="btn ghost" id="scReset">Mevcut plana döndür</button> <span class="note" id="scmsg"></span></p>
  <p class="note" style="margin:10px 0 0">Varsayımlar: kredi eşit anapara, aylık faiz; köprü kredi ilk ayda kullanılır, faizi aylık ödenir, anaparası vade sonunda topluca ödenir; CFADS = kira × (1 − stopaj) − işletme gideri; kredi başlangıcı ile kira başlangıcı aynı ay. “Öz kaynak” seçilirse peşinat tutarı baştan sermayeden çıkar ve tabloda görünmez. Gerçek kullandırım ve vade tarihleri girilince takvim ayrıca bağlanır.</p>
  <p class="note" style="margin:6px 0 0">Senaryo tablolarının Baserow yapısı için <a href="#sentez">Senaryo tabloları</a>.</p></section>`;
};
document.addEventListener('input',e=>{
  const t = e.target; if(!t.dataset||!t.dataset.sf) return;
  CUS[t.dataset.sf] = +t.value;
  try{ localStorage.setItem('cin-sc',JSON.stringify(CUS)); }catch(x){}
  const r = document.getElementById('scres'); if(r) r.innerHTML = scResult();
});
document.addEventListener('change',e=>{ const t=e.target; if(t.dataset&&t.dataset.sf&&t.tagName==='SELECT'){ CUS[t.dataset.sf]=+t.value; try{localStorage.setItem('cin-sc',JSON.stringify(CUS))}catch(x){} const r=document.getElementById('scres'); if(r) r.innerHTML=scResult(); }});
document.addEventListener('click',e=>{
  if(e.target.id==='scReset'){ CUS=Object.assign({},SBASE); try{localStorage.removeItem('cin-sc')}catch(x){} route(); }
  if(e.target.id==='scAdd'){
    const s = sim(CUS), d = Object.entries(CUS).map(([k,v])=>k+'='+v).join(', ');
    REQ['sn:'+Date.now()] = {t:'SENARYO TASLAĞI: kira '+fm(CUS.rent)+'/ay, stopaj %'+CUS.w+', erteleme '+CUS.G+' ay', s:'yap', n:'Girdiler: '+d+'\nSonuç: toplam borç servisi '+fm(s.sDS)+', toplam CFADS '+fm(s.sCF)+', dönem sonu nakit '+fm(s.net)+', ortalama DSCR '+f2(s.avg)+', en düşük DSCR (balon hariç) '+(s.minEx===null?'—':f2(s.minEx))+', kırılma kirası '+fm(s.beTotal)};
    saveReq(); const m=document.getElementById('scmsg'); if(m) m.textContent='Eklendi. Toplam talepler sayfasında görürsün.';
  }
});

/* --- iş verisinden çıkarım kuralları --- */
function daysSince(iso){ return Math.floor((Date.now()-new Date(iso+'T00:00:00').getTime())/86400000); }
function insights(){
  const P=IS.proje, b=sim({}), bx=sim({w:0}), K=IS.krediler, S=IS.sevkiyat, X=[];
  const bal = b.m.find(a=>a.bp>0);
  X.push(['crit','Kira geliri borç servisini karşılamıyor',[
    ['Ne görüyoruz',`Kira planının ${IS.kira.dscr1alti} / ${IS.kira.donem} döneminde DSCR 1'in altında (en düşük ${f2(IS.kira.minDscr)}, en yüksek ${f2(IS.kira.maxDscr)}). Toplam borç servisi ${fu(IS.kira.topServis)}, net kira geliri (CFADS) ${fu(IS.kira.topCfads)}. Fark ${fu(IS.kira.topServis-IS.kira.topCfads)}.`],
    ['Neden önemli','Kredi veren DSCR 1,2 civarı ister. Bu planla geri ödeme kira gelirinden çıkmıyor; fark ya TOO\'dan ya sermayeden gelmek zorunda.'],
    ['Ne yapılabilir',`Kira payı ${fu(P.kiraAy)}/ay iken ÖMG hizmet geliri ${fu(P.omgGelir)}/ay; arada TOO'da ${fu(P.omgGelir-P.kiraAy)} kalıyor. Kırılma kirası stopajlı ≈ ${fu(b.beTotal)}/ay, muafiyetle ≈ ${fu(bx.beTotal)}/ay. Senaryolar sekmesinde dene.`],
    ['Dayanak','Kira ve Tahsilat Planı (60 dönem), Gelir Gider Dengesi, Krediler']]]);
  X.push(['crit',`Köprü kredi ${bal?bal.k:6}. ayda ${fu(K[0].tutar)} balon ödeme`,[
    ['Ne görüyoruz',`Köprü kredi ${pc(K[0].faiz)} faizli, ${K[0].vade} ay vadeli, anapara vade sonunda tek seferde ödeniyor. O ayın borç servisi ≈ ${fu(bal?bal.ds:0)}, DSCR ${f2(IS.kira.minDscr)}.`],
    ['Neden önemli','Kira geliri tek ayda bu tutarı karşılayamaz; balon ödeme yeniden finansman ya da öz kaynak gerektirir.'],
    ['Ne yapılabilir','Peşinatı öz kaynaktan karşıla ya da köprü krediyi seller\'s credit\'e yedir. Senaryolar sekmesinde “Peşinat öz kaynaktan” sütununa bak.'],
    ['Dayanak','Krediler (Bullet, Balon Ödeme 598.500), Geri Ödeme Planı']]]);
  X.push(['crit','Kira toplamı varlık bedelinden düşük',[
    ['Ne görüyoruz',`5 yıllık SPC kira payı ${fu(P.kiraToplam)}; varlık bedeli ${fu(P.deger)} (fark ${fu(P.kiraToplam-P.deger)}). Vergi dahil toplam maliyet ${fu(P.toplamMaliyet)}; kira bunun ${pc(P.kiraToplam/P.toplamMaliyet*100)}'ini karşılıyor. Faiz bu rakamlara dahil değil (${fu(b.sInt)}).`],
    ['Neden önemli','Dönem sonu devir bedeli ya da kalıntı değer planlanmadıkça proje zarar yazıyor.'],
    ['Ne yapılabilir','Sözleşme sonu devir bedelini (ve otobüslerin kalıntı değerini) modele ekle; senaryoda “Dönem sonu devir bedeli” alanı bunun için.'],
    ['Dayanak','Projeler (Kira Toplamı − Varlık Bedeli, Toplam Maliyet), Süreç adımı 40']]]);
  X.push(['warn','Ödenen stopaj kaybı ve muafiyet başvurusu',[
    ['Ne görüyoruz',`Stopaj %${P.stopaj}; AIFC muafiyeti onaylı değil. 5 yılda ${fu(P.kiraToplam*P.stopaj/100)} stopaj kesintisi. Muafiyet tablosunda 3 kayıt var, üçü de “Başvurulacak”.`],
    ['Neden önemli','Muafiyet olsa bile ortalama DSCR '+f2(bx.avg)+'; tek başına yetmiyor ama en kolay kazanç.'],
    ['Ne yapılabilir','Tax ruling başvurusunu (süreç adımı 33) öne al; onay belgesi sisteme girince Etkin Stopaj Oranı otomatik 0 olur.'],
    ['Dayanak','Projeler (AIFC Muafiyeti), Muafiyetler ve Teşvikler']]]);
  X.push(['warn',`İthalat vergisi ${fu(P.vergi)}; KDV iadesi girilmemiş`,[
    ['Ne görüyoruz',`Gümrük vergisi ${fu(IS.gumruk.reduce((a,g)=>a+g.gv,0))}, KDV ${fu(IS.gumruk.reduce((a,g)=>a+g.kdv,0))}. İndirilebilir KDV ve muafiyet alanları 0.`],
    ['Neden önemli','KDV mahsup ya da iade edilebiliyorsa maliyet o kadar düşer; modelde şu an tamamı maliyet.'],
    ['Ne yapılabilir','KDV iade/mahsup kuralını Kazakistan danışmanıyla netleştir; sonucu İndirilebilir KDV alanına gir (Gümrük İşlemleri).'],
    ['Dayanak','Gümrük İşlemleri (6 beyanname), Muafiyetler ve Teşvikler']]]);
  X.push(['crit','Belge tamamlanma %0',[
    ['Ne görüyoruz',`${P.gerekliBelge} gerekli belgenin ${P.gerekliBelge-IS.belgeler.tamam} tanesi eksik; sisteme yüklenmiş dosya yok (${IS.belgeler.toplam} kaydın tümü “DOSYA BEKLENİYOR”). Durum: ${IS.belgeler.eksik} eksik, ${IS.belgeler.taslak} taslak, ${IS.belgeler.imzada} imzada.`],
    ['Neden önemli','Eximbank/Sinosure başvurusu ve kredi çekimi belge setine bağlı. Lot-1 teslim edildi ama sevkiyatın 5 belgesi de eksik.'],
    ['Ne yapılabilir','Önce başvuru paketini oluşturan belgeleri tamamla (aşağıdaki liste), imzadaki 3 belgeyi sonuçlandır, dosyaları Belgeler tablosuna yükle.'],
    ['Dayanak','Belgeler (Dosya Kontrolü, Gerekli Eksik)']],
    `<details><summary>Eksik belgelerin ilk ${IS.belgeler.liste.length} tanesi</summary><ul>${IS.belgeler.liste.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></details>`]);
  X.push(['warn',`Süreç ilerlemesi %${P.ilerleme}`,[
    ['Ne görüyoruz',`${P.gerekliAdim} geçerli adımın ${P.tamamAdim} tanesi tamam, ${IS.surec.devam} devam ediyor. ${IS.surec.modelDisi} adım seçili modele uygun değil (sayılmıyor). Tamamlanan adımın kanıt/notu eksik.`],
    ['Neden önemli','Aşama “Eximbank / Sinosure onayı” görünüyor ama onay adımları bekliyor; aşama ile adım durumu çelişiyor.'],
    ['Ne yapılabilir','Aşama alanını gerçek durumla eşitle; tamam adımına kanıt belgesi ekle.'],
    ['Dayanak','Süreç Adımları, Projeler (Aşama, Süreç İlerleme)']]]);
  const s2=S[1], gec=daysSince(s2.eta);
  X.push(['warn',`SHP-002 (Lot-2) varış tarihini ${gec>0?gec+' gün':'—'} geçti`,[
    ['Ne görüyoruz',`ETA ${s2.eta}, durum “${s2.durum}”, Khorgos ithalat beyannamesi “Sunuldu” (${fu(s2.vergi)} vergi). Teslim alım ve mülkiyet devri yok; ${s2.adet} otobüs (${fu(s2.deger)}) gümrükte. İmalat tablosunda PO-002 hâlâ “Sevkiyata Hazır”.`],
    ['Neden önemli','Mülkiyet SPC\'ye geçmeden kira başlamaz ve ipotek tescil edilemez. Tarihler DEMO; gerçek projede bu satır gecikme alarmıdır.'],
    ['Ne yapılabilir','Beyannameyi kapat, teslim tutanağıyla mülkiyet devrini işle, PO-002 durumunu güncelle.'],
    ['Dayanak','Sevkiyatlar, Gümrük İşlemleri, İmalat ve Tedarik']]]);
  X.push(['warn',`${IS.makine.malikYok} makinenin hukuki maliki yok`,[
    ['Ne görüyoruz',`${IS.makine.toplam} makineden ${IS.makine.spc} tanesi SPC mülkiyetinde ve aktif tahsisli; ${IS.makine.gumruk} makine gümrükte, ${IS.makine.tedarikci} makine tedarikçide. Bu ${IS.makine.malikYok} makinede hukuki malik, tahsis ve geçerli sigorta yok.`],
    ['Neden önemli','Beklenen durum (teslim edilmemiş), ama teslim gecikirse bu otobüslerin kirası başlamaz.'],
    ['Ne yapılabilir','Teslim sonrası devir tutanağıyla hukuki maliki gir; yerel sigortayı teslim gününe yetiştir.'],
    ['Dayanak','Makineler (Operasyon Kontrolü), Tahsisler, Sigortalar']]]);
  X.push(['warn','Sigorta: 1 poliçe süresi dolmuş',[
    ['Ne görüyoruz',`${IS.sigorta.toplam} poliçeden ${IS.sigorta.gecerli} geçerli, ${IS.sigorta.dolmus} süresi dolmuş (en erken bitiş ${IS.sigorta.enErken}). Geçerli olanlarda “teminat kapsamı kontrol edilmeli” notu var. Taşıma sigortası tek poliçe (SHP-001/002/003).`],
    ['Neden önemli','Kredi sözleşmesi geçerli sigorta ister; dolmuş poliçe ihlal sayılabilir.'],
    ['Ne yapılabilir','Dolmuş poliçeyi yenile ya da kapat; kapsamı Sinosure/Eximbank şartlarıyla karşılaştır.'],
    ['Dayanak','Sigortalar (Durum, Sigorta Kontrolü)']]]);
  X.push(['warn','Teminatların hukuki doğrulaması bekliyor',[
    ['Ne görüyoruz',`${IS.teminat.say} teminatın ${IS.teminat.hukuki} tanesinde hukuki doğrulama “Gerekli”. Nakit rehni ${fu(K[1].nakitRehni)} (kredinin ${f2(K[1].nakitRehni/K[1].tutar)} katı, 120 gün); ipotek / kredi oranı ${f2(K[1].ipotekOran)}.`],
    ['Neden önemli','Nakit rehni sermayeyi bağlar; ipotek tescil edilince kaldırılması planlı (45. gün). Hukuki görüş olmadan temlik ve ihbarname geçerli sayılmaz.'],
    ['Ne yapılabilir','Legal opinion al (Kazakistan hukuk danışmanı, TASK-ASSET-002), rehin çıkış tarihini takvime bağla.'],
    ['Dayanak','Teminatlar, Krediler, Süreç adımı 2, 4, 11']]]);
  X.push(['warn','Alt kiralamada ana sözleşme izni yok',[
    ['Ne görüyoruz',`${IS.sozlesme.say} sözleşmenin üçü de DEMO ve hukuki inceleme gerekli. TOO-1 → TOO-2 alt kiralamasında ana sözleşmede alt kiralama izni yok uyarısı var.`],
    ['Neden önemli','İzin yoksa Lot-3 alt kiralaması ana sözleşmeyi ihlal edebilir.'],
    ['Ne yapılabilir','SPC → TOO-1 finance lease sözleşmesine alt kiralama izni maddesi ekle ya da alt kiralamayı çıkar.'],
    ['Dayanak','Sözleşmeler (Alt Kiralama Kontrolü)']]]);
  X.push(['warn','Köprü kredi satırları kira planına tutarsız bağlı',[
    ['Ne görüyoruz',`Geri Ödeme Planı'nda köprü kredi Dönem 5 satırı “Proje Dönem 1”e, Dönem 6 satırı (balon, ${fu(K[0].tutar+K[0].tutar*K[0].faiz/1200)}) “Proje Dönem 2”ye bağlı. Kredi planlarının toplamı ile kira planındaki borç servisi arasında ${fu(b.sDS-IS.kira.topServis)} fark var (4 faiz satırı kira planına yansımıyor).`],
    ['Neden önemli','Balon ödemenin hangi ayda göründüğü ve DSCR hesabı bu bağa bağlı; panel balonu 6. ayda gösterir, Baserow kira planı 2. dönemde.'],
    ['Ne yapılabilir','Köprü kredi satırlarını doğru kira dönemlerine bağla ya da kira planına kredi sırası (ay) alanı ekle (TASK-ASSET-001 ile birlikte test).'],
    ['Dayanak','Geri Ödeme Planı (Kira ve Tahsilat Planı bağlantısı), Kira ve Tahsilat Planı']]]);
  X.push(['info','Servis firması hiçbir kayda bağlı değil',[
    ['Ne görüyoruz','Servis ve Yedek Parça Ltd firma kaydı var ama hiçbir tabloya bağlı değil. Bakım ve Yedek Parça tablosunda firma alanı yok.'],
    ['Neden önemli','Bakım maliyeti kimin faturasıyla ödeniyor ve kim yedek parçayı tedarik ediyor sistem tarafından izlenemiyor.'],
    ['Ne yapılabilir','Bakım ve Yedek Parça tablosuna “Servis Firması” bağlantı alanı eklenmesini talep et.'],
    ['Dayanak','Firmalar, Bakım ve Yedek Parça']]]);
  X.push(['info','Takvim bilgisi boş: vade ve gecikme takibi çalışmaz',[
    ['Ne görüyoruz','Proje başlangıç tarihi, kredi kullandırım tarihleri ve kira dönemlerinin vadesi boş.'],
    ['Neden önemli','Ödeme günü, gecikme ve faiz başlangıcı hesaplanamaz; senaryolar ay sırasıyla çalışıyor, takvime bağlanamıyor.'],
    ['Ne yapılabilir','Term sheet gelince kullandırım ve ilk kira tarihini gir (TASK-FIN-002).'],
    ['Dayanak','Projeler, Krediler, Kira ve Tahsilat Planı']]]);
  X.push(['info','Formüller hep aynı sonucu veriyor',[
    ['Ne görüyoruz',`Tahsis Kontrolü ${IS.tahsis.say}/${IS.tahsis.say} satırda, Bakım Kontrolü 4/4 satırda “KONTROL GEREKLİ”.`],
    ['Neden önemli','Bir kontrol alanı tüm satırlara aynı cevabı veriyorsa ayırt etmiyor demektir; ya veri eksik ya formül yetersiz.'],
    ['Ne yapılabilir','Formülü uçtan uca test et (TASK-ASSET-001); sonucu kayda geçir.'],
    ['Dayanak','Tahsisler, Bakım ve Yedek Parça']]]);
  return X;
}
const sevN = {crit:0,warn:1,info:2,ok:3};
views.cikarim = function(){
  const X = insights().sort((a,b)=>sevN[a[0]]-sevN[b[0]]);
  const n = s => X.filter(x=>x[0]===s).length;
  const b = sim({});
  return `<div class="demo">Kayıtlar Baserow'da “Gerçek Veri = hayır” (DEMO) işaretli. Çıkarımlar gerçek rakam değil, ama aynı kurallar gerçek veride de çalışır. Veri tarihi: ${esc(IS.tarih)} (canlı değil).</div>
  <div class="tiles"><div class="tile crit"><b>${n('crit')}</b><span>kritik çıkarım</span></div><div class="tile warn"><b>${n('warn')}</b><span>dikkat</span></div><div class="tile"><b>${f2(b.avg)}</b><span>ortalama DSCR</span></div><div class="tile ${IS.proje.ilerleme<30?'warn':'ok'}"><b>%${IS.proje.ilerleme}</b><span>süreç ilerleme</span></div></div>
  <section class="panel" style="margin-bottom:14px"><h2>Önce ne yapılmalı</h2><ol class="todo">
  <li><b>Finansman dengesi:</b> kira, stopaj ve köprü kredi balonunu birlikte çöz. <a href="#senaryo">Senaryolar</a>'da denenebilir.</li>
  <li><b>Başvuru paketi:</b> Eximbank/Sinosure için eksik belgeleri tamamla, dosyaları yükle.</li>
  <li><b>Lot-2:</b> gümrük kapanışı, teslim ve mülkiyet devri.</li>
  <li><b>Hukuki doğrulama:</b> teminatlar ve alt kiralama izni için legal opinion.</li>
  <li><b>Takvim:</b> kullandırım ve kira başlangıç tarihlerini term sheet ile gir.</li></ol></section>
  ${X.map(x=>card(x[0],esc(x[1]),x[2])+(x[3]?'':'')).join('').replace(/<\/div><\/div>$/,'</div></div>')}`;
};
/* belge listesi kartın içine: card dışı ek içerik için ikinci geçiş */
const _cikarim = views.cikarim;
views.cikarim = function(){
  let h = _cikarim();
  const X = insights().filter(x=>x[3]);
  X.forEach(x=>{ const t=esc(x[1]); const i=h.indexOf('<b>'+t+'</b>'); if(i<0) return; const j=h.indexOf('<div class="rq"',i); if(j>0) h=h.slice(0,j)+x[3]+h.slice(j); });
  return h;
};

/* --- finansman --- */
function barsDS(b){
  const W=760,Hh=230,L=46,R=10,T=14,B=26,ymax=100000, n=b.m.length, bw=(W-L-R)/n;
  const y=v=>T+(1-Math.min(v,ymax)/ymax)*(Hh-T-B);
  let s=`<svg viewBox="0 0 ${W} ${Hh}" style="width:100%;min-width:560px;display:block" role="img" aria-label="Aylık borç servisi ve CFADS">`;
  [0,25000,50000,75000,100000].forEach(v=>{s+=`<line x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}" style="stroke:var(--line);stroke-width:.7"/><text x="${L-6}" y="${y(v)+4}" text-anchor="end" class="mu">${v/1000}k</text>`});
  b.m.forEach(a=>{
    const x=L+(a.k-1)*bw+1, w=Math.max(bw-2,2), ip=a.li+a.bi, pr=a.lp+a.bp;
    const hp=Math.min(pr,ymax), hi=Math.min(ip,Math.max(ymax-hp,0));
    s+=`<rect x="${x.toFixed(1)}" y="${y(hp)}" width="${w.toFixed(1)}" height="${(y(0)-y(hp)).toFixed(1)}" style="fill:var(--accent)"><title>Ay ${a.k}: anapara ${fm(pr)}</title></rect>`;
    if(hi>0) s+=`<rect x="${x.toFixed(1)}" y="${y(hp+hi)}" width="${w.toFixed(1)}" height="${(y(hp)-y(hp+hi)).toFixed(1)}" style="fill:var(--warn)"><title>Ay ${a.k}: faiz ${fm(ip)}</title></rect>`;
    if(a.ds>ymax) s+=`<text x="${(x+w/2).toFixed(1)}" y="${T-2}" text-anchor="middle" style="fill:var(--crit);font-size:11px;font-weight:600">${a.k}. ay: ${fm(a.ds)}</text>`;
  });
  const cf=b.m[0].cf; s+=`<line x1="${L}" x2="${W-R}" y1="${y(cf)}" y2="${y(cf)}" style="stroke:var(--ok);stroke-width:2.2;stroke-dasharray:6 4"/><text x="${W-R}" y="${y(cf)-5}" text-anchor="end" style="fill:var(--ok);font-size:11px">CFADS ${fm(cf)}</text>`;
  for(let k=1;k<=n;k+=6) s+=`<text x="${L+(k-1)*bw+bw/2}" y="${Hh-8}" text-anchor="middle" class="mu">${k}</text>`;
  return s+'</svg>';
}
views.finans = function(){
  const K=IS.krediler, P=IS.proje, b=sim({});
  const kc = k=>`<section class="panel"><h2>${esc(k.ad)}</h2><div class="kv">
   <div><b>${fu(k.tutar)}</b><span>tutar</span></div><div><b>${pc(k.faiz)}</b><span>faiz (yıllık, sabit)</span></div><div><b>${k.vade} ay</b><span>vade</span></div><div><b>${esc(k.tip)}</b><span>anapara ödeme</span></div>
   <div><b>${fu(k.faizToplam)}</b><span>planlı faiz</span></div><div><b>${fu(k.toplamServis)}</b><span>planlı borç servisi</span></div><div class="${k.eksikBelge?'warn':'ok'}"><b>${k.eksikBelge}</b><span>eksik belge</span></div><div><b>${pill(k.durum)}</b><span>durum</span></div></div>
   <p class="note" style="margin:0">${esc(k.not)}</p></section>`;
  return `<div class="demo">DEMO veri · ${esc(IS.tarih)} anlık görüntü. Hesap motoru kredi planına göre aylık çalışır (toplam borç servisi ${fu(b.sDS)}); Baserow kira planındaki toplam ${fu(IS.kira.topServis)} olduğundan ${fu(b.sDS-IS.kira.topServis)} fark var, nedeni Çıkarımlar'da.</div>
  <div class="tiles"><div class="tile"><b>${fu(P.deger).replace(' USD','')}</b><span>varlık değeri USD</span></div><div class="tile"><b>%${P.pesinatOran}</b><span>peşinat (${fm(P.pesinat)})</span></div><div class="tile"><b>${fm(P.kiraAy)}</b><span>SPC kirası / ay</span></div><div class="tile crit"><b>${f2(b.avg)}</b><span>ortalama DSCR</span></div></div>
  <section class="panel" style="margin-bottom:14px"><h2>Aylık borç servisi ve net kira (mevcut plan)</h2>
  <p class="note" style="margin:0 0 6px">Çubuk = ayın borç servisi (mavi anapara, sarı faiz); yeşil çizgi = net kira geliri. Çubuk çizginin üstündeyse o ay açık var. ${bm()} </p><div class="sct">${barsDS(b)}</div></section>
  <div class="grid">${kc(K[0])}${kc(K[1])}</div>
  <section class="panel" style="margin-top:14px"><h2>Maliyet ve gelir</h2>
  ${[['Varlık (3 lot)',P.deger],['İthalat vergisi',P.vergi],['Giderler (navlun, sigorta, komisyon, hukuk)',P.gider],['Bakım ve yedek parça',P.bakim]].map(r=>`<div class="hbar"><span>${esc(r[0])}</span><span class="tr"><i style="width:${(r[1]/P.toplamMaliyet*100).toFixed(1)}%"></i></span><span class="mono" style="text-align:right">${fm(r[1])}</span></div>`).join('')}
  <div class="hbar warn"><span><b>Toplam maliyet</b></span><span class="tr"><i style="width:100%"></i></span><span class="mono" style="text-align:right">${fm(P.toplamMaliyet)}</span></div>
  <div class="hbar crit"><span><b>5 yıllık kira (SPC payı)</b></span><span class="tr"><i style="width:${(P.kiraToplam/P.toplamMaliyet*100).toFixed(1)}%"></i></span><span class="mono" style="text-align:right">${fm(P.kiraToplam)}</span></div>
  <p class="note" style="margin:8px 0 0">Faiz bu çubuklara dahil değil; ${fu(b.sInt)} ek maliyet. Stopaj kesintisi sonrası net kira ${fu(b.sCF)}.</p></section>`;
};
function bm(){ const b=sim({}), a=b.m.find(x=>x.bp>0); return a?`${a.k}. ayda köprü kredi balonu (${fm(a.ds)}) grafiğin dışına taşar.`:''; }

/* --- operasyon --- */
views.operasyon = function(){
  const S=IS.sevkiyat, M=IS.makine, B=IS.belgeler, SU=IS.surec;
  const bars = (arr)=>{ const mx=Math.max(...arr.map(a=>a[1]),1); return arr.map(a=>`<div class="hbar ${a[2]||''}"><span>${esc(a[0])}</span><span class="tr"><i style="width:${(a[1]/mx*100).toFixed(1)}%"></i></span><span class="mono" style="text-align:right">${a[1]}</span></div>`).join(''); };
  const sev = table([
    {h:'Sevkiyat',f:r=>esc(r.no)},{h:'Durum',f:r=>pill(r.durum)},{h:'ETD → ETA',f:r=>`<span class="code">${esc(r.etd)} → ${esc(r.eta)}</span>`},
    {h:'Otobüs',n:1,f:r=>r.adet},{h:'Mal değeri',n:1,f:r=>fm(r.deger)},{h:'Vergi',n:1,f:r=>fm(r.vergi)},{h:'Mülkiyet SPC',f:r=>r.mulkiyet?pill('Tamam – geçti'):pill('Bekliyor')},{h:'Eksik belge',n:1,f:r=>r.eksik}],S);
  const lot = table([{h:'Lot',f:r=>esc(r.ad)},{h:'Adet',n:1,f:r=>r.adet},{h:'Tutar',n:1,f:r=>fm(r.toplam)},{h:'Tedarikçi',f:r=>esc(r.ted)},{h:'Üretim',f:r=>pill(r.uretim)},{h:'FAT',f:r=>r.fat?pill('Tamam – geçti'):pill('Bekliyor')}],IS.lotlar);
  return `<div class="demo">DEMO veri · ${esc(IS.tarih)} anlık görüntü (canlı değil).</div>
  <div class="tiles"><div class="tile"><b>${S.length}</b><span>sevkiyat</span></div><div class="tile"><b>${M.toplam}</b><span>makine</span></div><div class="tile ${B.tamam?'ok':'crit'}"><b>${B.tamam}/${IS.proje.gerekliBelge}</b><span>tamam belge</span></div><div class="tile warn"><b>${IS.proje.tamamAdim}/${IS.proje.gerekliAdim}</b><span>tamam adım</span></div></div>
  <section class="panel" style="margin-bottom:14px"><h2>Sevkiyatlar</h2>${sev}</section>
  <div class="grid">
  <section class="panel"><h2>Lotlar ve üretim</h2>${lot}</section>
  <section class="panel"><h2>Makineler (${M.toplam})</h2>${bars([['SPC mülkiyetinde, aktif tahsisli',M.spc,'ok'],['Gümrükte (hukuki malik yok)',M.gumruk,'warn'],['Tedarikçide (hukuki malik yok)',M.tedarikci,'warn']])}<p class="note" style="margin:8px 0 0">Geçerli sigortası olmayan: ${M.sigortaYok}. Sigorta poliçesi: ${IS.sigorta.gecerli} geçerli, ${IS.sigorta.dolmus} süresi dolmuş.</p></section>
  <section class="panel"><h2>Belgeler (${B.toplam} kayıt, ${IS.proje.gerekliBelge} gerekli)</h2>${bars([['Eksik',B.eksik,'crit'],['Taslak',B.taslak,'warn'],['İmzada',B.imzada,'info'],['Tamam',B.tamam,'ok']])}
  <details style="border:0;background:none"><summary style="padding:6px 0;color:var(--accent);font-size:12.5px">Eksik belge listesi</summary><ul style="margin:0;padding-left:18px;font-size:12.5px;color:var(--muted)">${B.liste.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></details></section>
  <section class="panel"><h2>Süreç adımları (${SU.toplam})</h2>${bars([['Bekliyor',SU.bekliyor,'warn'],['Devam ediyor',SU.devam,'info'],['Tamam',SU.tamam,'ok']])}<p class="note" style="margin:8px 0 0">${SU.modelDisi} adım seçili proje modeline (Seller's Credit, D Finance Lease) uygun değil; ilerleme yüzdesine sayılmıyor.</p></section>
  </div>`;
};

