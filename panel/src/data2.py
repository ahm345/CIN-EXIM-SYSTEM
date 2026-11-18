import json
d=json.load(open('/tmp/agent_is2.json'))
sc=json.load(open('/tmp/agent_schema.json'))
fid={f['ad']:f['id'] for f in d['firmalar']}
GR={3:'Biz (SPC)',4:'Operatörler (TOO)',13:'Operatörler (TOO)',1:'Gelir kaynağı',2:'Tedarik (Çin)',8:'Tedarik (Çin)',9:'Tedarik (Çin)',
    5:'Finansman ve teminat',6:'Finansman ve teminat',7:'Finansman ve teminat',10:'Lojistik ve gümrük',11:'Lojistik ve gümrük',14:'Sigorta',12:'Servis'}
firms=[]
for f in d['firmalar']:
    b=[[k,len(v),v[:3]] for k,v in f['baglar'].items()]
    firms.append({'id':f['id'],'ad':f['ad'],'ulke':f['ulke'],'roller':f['roller'],'not':f['diger_alanlar'].get('Not',''),'g':GR[f['id']],'b':b})
steps=[]
for s in d['surec']['adimlar']:
    da=s['diger_alanlar']
    steps.append({'n':s['sira'],'ad':s['ad'],'d':s['durum'],'a':s['asama_veya_grup'],'ok':s['gecerli'],'r':da.get('Sorumlu',''),'v':da.get('Vade',''),
      'k':da.get('Adım Kontrolü',''),'o':da.get('Varlık Olayı',''),'ok2':da.get('Varlık Olay Kontrolü',''),'not':da.get('Not',''),'f':s['sorumlu_firma'],'m':s['makine'][:4]})
FG=[['Taraflar',['Firmalar','Sözleşmeler','Yazışmalar']],['Proje ve finansman',['Projeler','Krediler','Teminatlar','Giderler ve Vergiler','Muafiyetler ve Teşvikler','Kur Takibi']],
 ['Tedarik ve üretim',['Ekipman Lotları','İmalat ve Tedarik']],['Lojistik ve gümrük',['Sevkiyatlar','Gümrük İşlemleri']],
 ['Varlık (makine ve saha)',['Makineler','Tahsisler','Sigortalar','Bakım ve Yedek Parça','Hizmet Kayıtları']],['Belge ve süreç',['Belgeler','Süreç Adımları']],
 ['Senaryo',['Senaryolar','Senaryo Finansman Dilimleri','Senaryo Varsayımları','Senaryo Değerlendirme']]]
gof={n:g for g,ns in FG for n in ns}
OKT={'text','long_text','number','date','boolean','single_select','url','email','phone'}
forms=[]
for t in sc['tablolar']:
    if t['ad'] not in gof: continue
    fl=[]
    for f in t['alanlar']:
        tp=f['tip']
        if tp in OKT:
            o={'n':f['ad'],'t':tp}
            if tp=='single_select': o['o']=f.get('secenekler') or []
            fl.append(o)
        elif tp=='link_row':
            bt=f.get('bagli_tablo')
            if bt=='Firmalar': fl.append({'n':f['ad'],'t':'firma'})
            elif bt=='Projeler': fl.append({'n':f['ad'],'t':'proje'})
    forms.append({'id':t['id'],'ad':t['ad'],'p':t['birincil_alan'],'g':gof[t['ad']],'f':fl})
forms.sort(key=lambda x:[g for g,_ in FG].index(x['g']))
out={'firms':firms,'steps':steps,'forms':forms,'fid':fid,'fg':[[g,ns] for g,ns in FG]}
json.dump(out,open('is2.json','w'),ensure_ascii=False,separators=(',',':'))
print(len(json.dumps(out,ensure_ascii=False)),[ (x['ad'],len(x['f'])) for x in forms])
