import { t } from './helpers';
import type { LText } from '../../src/lib/types';

export interface ThinkerValueLink {
  value: string;
  description: LText;
  source?: string;
}

export interface ThinkerSeed {
  key: string;
  name: string;
  period: string;
  birthYear: number | null;
  deathYear: number | null;
  biography: LText;
  mainIdeas: LText;
  educationalViews: LText;
  modernImportance: LText;
  values: ThinkerValueLink[];
}

export const thinkers: ThinkerSeed[] = [
  {
    key: 'sipira',
    name: 'Sopbaslı Sipira jırov',
    period: 'golden-horde',
    birthYear: 1213,
    deathYear: 1393,
    biography: t(
      "Dissertatsiyada (1.1-§) jirovlar maktabi asoschisi, XIV asr shoiri deb ko'rsatiladi. Qozoq olimi Suyinshaliev (keltirilgan fikr [58;219]) P.M. Melioranskiyga tayanib, Sipira jirov To'xtamish o'rdasida 1393-yilda eng so'nggi to'lg'ovini aytgan va 1213–1393-yillar orasida yashagan deb hisoblaydi; bu — olimning fikri, dissertatsiya buni qat'iy tarixiy fakt deb tasdiqlamaydi. Ibn Battuta XIV asrning 30-yillarida Saroychiqda bo'lib, turkiy xalqlar jirovi Sopbasli ulug'ligi haqida yozgani aytiladi [48;74]. Dastlab ilmiy adabiyotga Sipira jirov nomini Ch. Valixonov kiritgan [16;34-35]. Jirov Dashti Qipchoqda ko'p xonlarni ko'rgan, xonlarga maslahat bergan donishmand sifatida tasvirlanadi. | Dissertaciyada (1.1-§) jırawlar mektebi tiykarshısı, XIV ásir shayırı dep kórsetiledi. Qazaq ilimpazı Süyinshaliev (keltirilgen pikir [58;219]) P.M. Melioranskiyge súyenip, Sipira jıraw Toqtamıs ordasında 1393-jılı eń sońǵı tolǵawın aytqan hám 1213–1393-jıllar arasında jasaǵan dep esaplaydı; bul — ilimpazdıń pikiri, dissertaciya buni qatań tariyxıy fakt dep tastıyıqlamaydı. Ibn Battuta XIV ásirdiń 30-jıllarında Sarayshıqta bolıp, túrkiy xalıqlar jırawı Sopbaslınıń uluǵlıǵı haqqında jazǵanı aytıladı [48;74]. Dáslep ilimiy ádebiyatqa Sipira jıraw atın Ch. Valixanov kirgizgen [16;34-35]. Jıraw Dashti Qıpshaqta kóp xanlardı kórgen, xanlarǵa másláhát bergen danıshpan retinde sıpatlanadı.",
    ),
    mainIdeas: t(
      "Insonparvarlik va adolat; xalqqa halol xizmat, vatanni sevish; kattalarni hurmat qilish; do'stlik va ahillik; mehnatning roli; ota-ona va muhitning bola tarbiyasiga ta'siri; hukmdorlarga ham haqiqatni aytish. | Insanparwarlıq hám ádalat; xalıqqa hádil xızmet, watandı súyiw; úlkenlerdi húrmetlew; dosliq hám awızbirshilik; miynettiń roli; ata-ana hám ortanıń bala tárbiyasına tásiri; húkimdarlarǵa da haqıyqattı aytıw.",
    ),
    educationalViews: t(
      "Sipira jirov «Bir deganda ne yomon» to'lg'ovida o'g'ilni aqlli va bilimli, qizni odobli va iboli qilib tarbiyalashni ta'lim-tarbiyaning asosiy ikki masalasi deb ko'radi; bola oilada ko'rgan-bilganiga o'xshab ulg'ayadi. «Otangga la'nat Kenjembay» to'lg'ovida beva-yetimlarga g'amxo'rlik talab qilinadi. Yoshlar kattalar oldida odob saqlashi («ulug'dan oldin kichikning gapirishi yo'q») va mehnat, do'stlik, ahillikka chaqiriladi (dissertatsiya 1.1-§, 2.1-§). | Sipira jıraw «Bir degende ne jaman» tolǵawında ulandı aqıllı hám bilimli, qızdı ádepli hám ibalı etip tárbiyalawdı tálim-tárbiyanıń tiykarǵı eki máselesi dep kóredi; bala shańaraqta kórgen-bilgenine usap ósedi. «Ataǵa lánet Kenjembay» tolǵawında jetim-jesirlerge ǵamxorlıq talap etiledi. Jaslar úlkenler aldında ádep saqlawı («ulıǵdan aldın kishiniń sóylewi joq») hám miynet, dosliq, awızbirshilikke shaqırıladı (dissertaciya 1.1-§, 2.1-§).",
    ),
    modernImportance: t(
      "Zamonaviy talqin: Sipira jirov g'oyalari «Tarbiya» darslarida odob-axloq, oilaviy qadriyatlar, jamoatchilik mas'uliyati va insonparvarlik mavzularida muhokama uchun asos bo'la oladi. | Házirgi zaman túsindirmesi: Sipira jıraw ideyaları «Tárbiya» sabaqlarında ádep-ahlaq, shańaraqlıq qádiriyatlar, jámiyetlik juwapkershilik hám insanparwarlıq temalarında talqılaw ushın tiykar bola aladı.",
    ),
    values: [
      { value: 'insonparvar', description: t("Beva-yetimlarga g'amxo'rlik va hukmdorlardan insonparvarlik talab qilishi. | Jetim-jesirlerge ǵamxorlıq hám húkimdarlardan insanparwarlıq talap etiwi."), source: 'sipira-kenjembay' },
      { value: 'adolat', description: t("Adolatsiz biyni tanqid qilishi: «To'rasin buzsa biy yomon». | Ádalatsız biydi synlawı: «Tórasin buzsa biy jaman»."), source: 'sipira-tora' },
      { value: 'vatan', description: t("Elning nurli bo'lishi — botirning tug'ilishi; xalqqa fidoyi xizmat. | Eldiń nurlı bolıwı — batırdıń tuwılıwı; xalıqqa pidayı xızmet."), source: 'sipira-el' },
      { value: 'katta', description: t("Kattalar oldida odob, «ulug'dan oldin kichikning gapirishi yo'q». | Úlkenler aldında ádep, «ulıǵdan aldın kishiniń sóylewi joq»."), source: 'sipira-ulug' },
      { value: 'katta', description: t("Oila tarbiyasi va muhitning ta'siri. | Shańaraq tárbiyası hám ortanıń tásiri."), source: 'sipira-boy' },
      { value: 'mehnat', description: t("Tirikchilik uchun kurashda mehnatning o'rni (dissertatsiya 1.1-§). | Tirishilik ushın gúreste miynettiń orni (dissertaciya 1.1-§).") },
      { value: 'dostlik', description: t("Yoshlarni o'zaro do'stlik va ahillikka chaqirishi (1.1-§). | Jaslardı ózara dosliq hám awızbirshilikke shaqırıwı (1.1-§).") },
    ],
  },
  {
    key: 'asan',
    name: 'Asan qayǵı',
    period: 'nogai',
    birthYear: 1370,
    deathYear: 1490,
    biography: t(
      "Dissertatsiyada (1.1-§) Asan taxminan 1370-yilda tug'ilgan, otasi ovchi Sobit, onasi Solixa; Edil va Yoyiq daryolari atrofida yashab, taxminan 1490-yillarda vafot etgani ko'rsatiladi [6;241]. Vafot joyi haqida ma'lumotlar turlicha: qozoq olimlari Jiydeli Boysunda, Ch. Valixonov Issiqko'l qirg'og'ida vafot etgan deb yozadi [37;66]. Ormambet bi (Ulug' Muhammad) va Janibek xonning maslahatchisi bo'lgan; unga «qayg'i» laqabi xalqning og'ir taqdiri uchun qayg'urgani sababli berilgan. | Dissertaciyada (1.1-§) Asan shama menen 1370-jılı tuwılǵan, ákesi awshı Sobit, anası Solixa; Edil hám Yayıq dárya átirapında jasap, shama menen 1490-jıllarda qaytıs bolǵanı kórsetiledi [6;241]. Qaytıs bolǵan jeri haqqında maǵlıwmatlar túrlishe: qazaq ilimpazları Jiydeli Boysunda, Ch. Valixanov Issıqkól jaǵasında qaytıs bolǵan dep jazadı [37;66]. Ormambet bi (Ulıǵ Muxammed) hám Janibek xannıń másláhátshisi bolǵan; oǵan «qayǵı» laqabı xalıqtıń awır táǵdiri ushın qayǵırǵanı sebepli berilgen.",
    ),
    mainIdeas: t(
      "Adolat va haqqoniylik; xalqni birlashtirish; vatanparvarlik; bilim va ilmning ahamiyati; ma'naviy taraqqiyot; tabiat va inson uyg'unligi (1.3.1-jadval); do'stlik, rostgo'ylik, sabr va kechirimlilik. | Ádalat hám haqıyqatshıllıq; xalıqtı birlestiriw; watanparwarlıq; bilim hám ilimniń áhmiyeti; ruwxıy rawajlanıw; tábiyat hám insan sáykesligi (1.3.1-keste); dosliq, rastgóylik, sabır hám keshirimlilik.",
    ),
    educationalViews: t(
      "Asan qayg'i yoshlarga ilm va hunarni kichikdan o'rgatishni, maslahatlashib ish ko'rishni, ustoz-shogird o'zaro tushunishini, do'stni to'g'ri tanlashni, yolg'on va g'iybatdan yiroq bo'lishni, g'azabni jilovlashni, xatosini tan olganni kechirishni targ'ib qiladi. Xon-biylardan xalq ahvolini bilishni, ortiqcha soliq solmaslikni, ta'lim muassasalari va ma'rifatga e'tibor berishni talab qiladi. | Asan qayǵı jaslarǵa ilim hám hunardı kishkeneliginen úyretiwdi, másláhátlesip is kóriwdi, ustaz-shákirt ózara túsiniwin, dostı dóris saylawdı, jalǵan hám gıybattan iyrimdi, gázepti tıyıwdı, qátesin moyınlaǵandı keshiriwdi úgitleydi. Xan-biylerden xalıq jaǵdayın biliwdi, artıqsha salıq salmawdı, tálim mákemeleri hám aǵartıwshılıqqa itibar beriwdi talap etedi.",
    ),
    modernImportance: t(
      "Zamonaviy talqin: Asan qayg'i fikrlari adolat, jamoaviylik, ekologik ong, axborotni tanqidiy baholash va hissiyotni boshqarish mavzularida dars materiali bo'la oladi. | Házirgi zaman túsindirmesi: Asan qayǵı pikirleri ádalat, jámáátshilik, ekologiyalıq sana, maǵlıwmattı synlı bahalaw hám sezimdi basqarıw temalarında sabaq materialı bola aladı.",
    ),
    values: [
      { value: 'adolat', description: t("Xon va biylarning adolatsizligi, ortiqcha soliq va xalqni ezishini tanqid qilishi. | Xan hám biylerdiń ádalatsızlıǵı, artıqsha salıq hám xalıqtı ezıwin synlawı."), source: 'asan-soliq' },
      { value: 'adolat', description: t("Zulm oqibati: xalq qorayadi, xalqning qasosi kuchga kiradi. | Zulım aqıbeti: xalıq qarayadı, xalıqtıń qásası kúshke kiredi."), source: 'asan-qisganda' },
      { value: 'insonparvar', description: t("Nasab emas, aql va fazilat inson qadrini belgilaydi. | Nasil emes, aqıl hám pazıylet insan qádirin belgileydi."), source: 'asan-olmos' },
      { value: 'vatan', description: t("El bor joyda shuhrat: xon xalqdan o'zini ajratmasligi kerak. | El bar jerde abıray: xan xalıqtan ózin ajıratpawı kerek."), source: 'asan-el' },
      { value: 'dostlik', description: t("Do'stni yaxshidan tanlash va do'stning ko'nglini og'ritmaslik. | Dostı jaqsıdan saylaw hám dostıń kewlin awırtpaw."), source: 'asan-dost' },
      { value: 'dostlik', description: t("Barchangiz bir bo'ling — ahil ittifoq. | Barlıǵıńız bir bolıń — awızbirshilik."), source: 'asan-bir' },
      { value: 'mehnat', description: t("Yoshlikdan hunar o'rganish. | Jaslıqtan hunar úyreniw."), source: 'asan-hunar' },
      { value: 'ilim', description: t("Toza, nuqsonsiz so'z o'y tubida yotadi — teran fikrlash. | Taza, kemsiz sóz oy túbinde jatadı — tereń pikirlew."), source: 'asan-soz' },
      { value: 'ustoz', description: t("Ilmim yurtdan oshdi deb maslahatsiz so'z boshlama. | Ilimim jurttan ashtı dep másláhátsiz sóz baslama."), source: 'asan-ilm' },
      { value: 'rost', description: t("Yolg'on va g'iybatga ishonmaslik, voqeani o'z ko'zing bilan ko'r. | Jalǵan hám gıybatqa isenbew, waqıyanı óz kózińiz benen kór."), source: 'asan-xavotir' },
      { value: 'sabr', description: t("G'azab — dushman; xato qilib kechirim so'ragan kishini kechirish. | Gázep — dushpan; qátelesip keshirim sorǵan adamdı keshiriw."), source: 'asan-gazab' },
      { value: 'tabiat', description: t("Har bir jonzot o'z yashash joyi tabiatiga moslashgan va uni qadrlaydi. | Hár bir jánzat óz jasaw ornı tábiyatına beyimlesken hám onı qádirleydi."), source: 'asan-qaz' },
    ],
  },
  {
    key: 'jiyrenshe',
    name: 'Jiyrenshe sheshen',
    period: 'nogai',
    birthYear: null,
    deathYear: null,
    biography: t(
      "Dissertatsiyada (1.1-§) Jiyrenshe sheshen Janibek xonning vaziri, maslahatchisi sifatida XV asrda yashagan deyiladi [6;253]; biroq tadqiqotchilar uning qaysi Janibek zamonida yashagani haqida turlicha fikrda (Q. Maqsetov: Janibek 1342–1357 davri bo'lishi mumkin [44;136]). Ba'zi olimlar (Q. Ayimbetov va boshqalar) uning tarixiy shaxs ekanligiga shubha qilib, xalq yaratgan adabiy tip deb hisoblaydi; dissertatsiya muallifi esa Ch. Valixonov, A. Divayev, M. Avezov fikrlariga tayanib, Jiyrenshe tarixda bo'lgan, degan xulosaga keladi. Tug'ilgan va vafot etgan yillari ma'lum emas. | Dissertaciyada (1.1-§) Jiyrenshe sheshen Janibek xannıń wázirı, másláhátshisi retinde XV ásirde jasaǵan delinedi [6;253]; biraq izertlewshiler onıń qaysı Janibek zamanında jasaǵanı haqqında túrlishe pikirde (Q. Maqsetov: Janibek 1342–1357 dáwiri bolıwı múmkin [44;136]). Ayırım ilimpazlar (Q. Ayımbetov hám basqalar) onıń tariyxıy shaxs ekenine gúmanlanıp, xalıq jaratqan ádebiy tip dep esaplaydı; dissertaciya avtorı bolsa Ch. Valixanov, A. Divaev, M. Áwezov pikirlerine súyenip, Jiyrenshe tariyxta bolǵan, degen juwmaqqa keledi. Tuwılǵan hám qaytıs bolǵan jılları belgisiz.",
    ),
    mainIdeas: t(
      "Zulm qonunsizlikdan, ezilish ongsizlikdan keladi; xalq savodli bo'lishi va hunar-bilimga intilishi kerak; xon zulmini topqirlik bilan fosh qilish; nutq madaniyati; oila va ota-ona tarbiyasi. | Zulımlıq nızamsızlıqtan, ezilıw sanasızlıqtan keledi; xalıq sawatlı bolıwı hám hunar-bilimge umtılıwı kerek; xan zulımın tapqırlıq penen áshkaralaw; sóylew mádeniyatı; shańaraq hám ata-ana tárbiyası.",
    ),
    educationalViews: t(
      "Jiyrenshe sheshen insonning xulqi yoshlikda olingan tarbiya va oilada o'rganilgan odatga bog'liq ekanini, ota-ona farzandning asosiy tarbiyachisi ekanini, onaning bola tarbiyasidagi xizmatini, ota-onaga hurmat bolaga o'rnak bo'lishini aytadi. Shuningdek odamning ruhiyati yoshga qarab o'zgarishini sakkiz davrga bo'lib tasvirlaydi; sheshenlik so'zlari yoshlarning nutq va muloqot madaniyatini rivojlantirishda muhim. | Jiyrenshe sheshen insannıń minez-qulqı jaslıqta alınǵan tárbiya hám shańaraqta úyrenilgen ádetke baylanıslı ekenin, ata-ana perzenttiń tiykarǵı tárbiyashısı ekenin, ananıń bala tárbiyasındaǵı xızmetin, ata-anaǵa húrmet balaǵa úlgi bolıwın aytadı. Sonday-aq adamnıń ruwxıyatı jasqa qarap ózgeriwin segiz dáwirge bólip sıpatlaydı; sheshenlik sózleri jaslardıń sóylew hám sóylesiw mádeniyatın rawajlandırıwda áhmiyetli.",
    ),
    modernImportance: t(
      "Zamonaviy talqin: Jiyrenshe sheshen so'zlari nutq madaniyati, fuqarolik ongi va tanqidiy fikrlash mashg'ulotlarida qo'llanishi mumkin. | Házirgi zaman túsindirmesi: Jiyrenshe sheshen sózleri sóylew mádeniyatı, puqaralıq sana hám synlı pikirlew shınıǵıwlarında qollanılıwı múmkin.",
    ),
    values: [
      { value: 'adolat', description: t("«Zolimlik qonunsizlikdan, ezilish ongsizlikdan» — adolat va qonun g'oyasi. | «Zulımlıq nızamsızlıqtan, ezilıw sanasızlıqtan» — ádalat hám nızam ideyası."), source: 'jiy-zolim' },
      { value: 'nutq', description: t("Xonning zulmini topqir so'z bilan fosh qilishi (boyqushlar rivoyati). | Xannıń zulımın tapqır sóz benen áshkaralawı (bayqushlar rawayatı)."), source: 'jiy-boyqush' },
      { value: 'katta', description: t("Ota-ona farzandning asosiy tarbiyachisi; ota-ona hurmati bolaga o'rnak. | Ata-ana perzenttiń tiykarǵı tárbiyashısı; ata-ana húrmeti balaǵa úlgi."), source: 'jiy-yosh' },
      { value: 'ilim', description: t("Xalqning hunar-bilimga intilishi va savodli bo'lishini orzu qilishi. | Xalıqtıń hunar-bilimge umtılıwı hám sawatlı bolıwın arzıw etiwi."), source: 'jiy-zolim' },
      { value: 'manaviy', description: t("Inson yoshi, ruhiyati va xulqi o'rtasidagi bog'liqlikni tahlil qilishi (8 davr). | Insan jası, ruwxıyatı hám minez-qulqı arasındaǵı baylanıstı analizlewi (8 dáwir)."), source: 'jiy-yosh' },
    ],
  },
  {
    key: 'dospambet',
    name: 'Dospambet jırov',
    period: 'nogai',
    birthYear: null,
    deathYear: null,
    biography: t(
      "Dissertatsiyada (1.1-§) Dospambet jirov tarixiy manbalarga ko'ra XV asr oxiri – XVI asr boshlarida yashagan, tug'ilgan joyi Azov shahri atrofi, aristokratlar orasidan chiqqan va Ormambet biyning hurmatli lashkarboshilaridan biri bo'lgani aytiladi. Uning yashagan zamoni Musoning katta o'g'li Shayxi Mamayning taxtga o'tirgan yillariga to'g'ri keladi. Tug'ilgan va vafot etgan aniq yillari keltirilmagan. M. Ospanovning 1833-yilda Sankt-Peterburgda chiqqan «No'g'ay va qumiq shoirlari» kitobi qimmatli ma'lumot beradi [40;138]. | Dissertaciyada (1.1-§) Dospambet jıraw tariyxıy dereklerge kóre XV ásir aqırı – XVI ásir basında jasaǵan, tuwılǵan jeri Azov qalası átirapı, aristokratlar arasınan shıqqan hám Ormambet biydiń húrmetli láshkarbasılarınan biri bolǵanı aytıladı. Onıń jasaǵan zamanı Musanıń úlken ulı Sheyxi Mamaydıń taxqa otırǵan jıllarına tuwra keledi. Tuwılǵan hám qaytıs bolǵan anıq jılları keltirilmegen. M. Ospanovtıń 1833-jılı Sankt-Peterburgta shıqqan «Noǵay hám qumıq shayırları» kitabı qádirli maǵlıwmat beredi [40;138].",
    ),
    mainIdeas: t(
      "Vatanparvarlik, jasorat va qahramonlik; insonparvarlik (bori-kambag'al, oqsuyak-qorasuyak deb bo'lmaslik); do'st va dushmanni farqlash, ehtiyotkorlik; qarindosh-urug'ning kuchi; yaxshi va yomon odam xulqi. | Watanparwarlıq, jasorat hám qaharmanlıq; insanparwarlıq (bay-kámbaǵal, aqsúyek-qarasúyek dep bólmew); dos hám dushpandı ayırıw, abaylawshılıq; tuwısqanlardıń kúshi; jaqsı hám jaman adam minez-qulqı.",
    ),
    educationalViews: t(
      "Dospambet jirov to'lg'ovlarida Vatan himoyasi, jangda oldingi safda yurish, insonni nasabiga emas insoniy kamolotiga qarab baholash, yomonlardan uzoq yurish, sirni yomonga aytmaslik, qarindoshlar bilan totuvlikda yashash g'oyalari ilgari suriladi. Dissertatsiya muallifi bu to'lg'ovlar yoshlarda vatanparvarlik, insonparvarlik, qahramonlik, adolat, do'stlik g'oyalarini shakllantirishga xizmat qiladi, deb hisoblaydi. | Dospambet jıraw tolǵawlarında Watandı qorǵaw, urısta aldıńǵı sapta júriw, insandı nasiline emes insanlıq kamalatına qarap bahalaw, jamanlardan iyrim júriw, sırdı jamanǵa aytpaw, tuwısqanlar menen tınıshlıqta jasaw ideyaları ilgeri súriledi. Dissertaciya avtorı bul tolǵawlar jaslarda watanparwarlıq, insanparwarlıq, qaharmanlıq, ádalat, dosliq ideyaların qáliplestiriwge xızmet etedi, dep esaplaydı.",
    ),
    modernImportance: t(
      "Zamonaviy talqin: jirovning jasorat va vatanparvarlik g'oyalari axloqiy dilemma, rolli o'yin va qadriyat xaritasi metodlari bilan muhokama qilinishi mumkin (2.2-§). | Házirgi zaman túsindirmesi: jırawdıń jasorat hám watanparwarlıq ideyaları ahlaqıy dilemma, rollik oyın hám qádiriyat kartası metodları menen talqılanıwı múmkin (2.2-§).",
    ),
    values: [
      { value: 'vatan', description: t("«Vatanimdan ayrilmaslik» to'lg'ovi: Vatanni dushmandan himoya qilishga otlanish. | «Watanımnan ayırılmaslıq» tolǵawı: Watandı dushpannan qorǵawǵa atlanıw."), source: 'dos-vatan' },
      { value: 'jasorat', description: t("Jirov sarkarda sifatida oldingi safda yurib, el uchun jonini ayamagan. | Jıraw sarkarda retinde aldıńǵı sapta júrip, el ushın janın ayamaǵan."), source: 'dos-oq' },
      { value: 'insonparvar', description: t("Xon va biy o'g'lidan kam emasligi: insonni nasabiga emas, kamolotiga qarab baholash. | Xan hám biy ulınan kem emesligi: insandı nasiline emes, kamalatına qarap bahalaw."), source: 'dos-aymedet' },
      { value: 'dostlik', description: t("Do'st qiyofasidagi xoinlardan ehtiyot bo'lish. | Dos qıyapatındaǵı hıyanatshılardan abaylaw."), source: 'dos-saqlan' },
      { value: 'dostlik', description: t("Qarindoshlarning ko'pligi — qiyinchilikda kuch. | Tuwısqanlardıń kóplıǵı — qıyınshılıqta kúsh."), source: 'dos-qarindosh' },
    ],
  },
];
