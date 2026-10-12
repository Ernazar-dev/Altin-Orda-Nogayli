import { t } from './helpers';
import type { SourceSeed } from './sources.data';

const L = (...lines: string[]): string => lines.join('\n');

export const sources2: SourceSeed[] = [
  {
    key: 'jiy-yosh',
    title: t("Jiyrenshe sheshen: umr davrlari to'lg'ovi | Jiyrenshe sheshen: ómir dáwirleri tolǵawı"),
    type: 'TOLGOV',
    period: 'nogai',
    thinker: 'jiyrenshe',
    content: L(
      'Ўн беш ёш қуюн қувган шамол билан тенг,',
      'Йигирма беш довул урган пари билан тенг,',
      'Қирқ беш айиқ осмас бел билан тенг,',
      'Етмиш бешда кўнглинг ер билан тенг,',
      'Саксонда селкилдаган чол бўларсан,',
      'Тўқсонда тўлиқ мияси ўртага тушар,',
      'Юзда дунёдан умидингни уз,',
      'Ўлмасанг ҳам ўликдан кам бўларсан.',
    ),
    description: t(
      "Dissertatsiyada (2.1-§) Jiyrenshe sheshen inson umrini sakkiz davrga bo'lib tasvirlagan satrlar sifatida keltirilgan. | Dissertaciyada (2.1-§) Jiyrenshe sheshen insan ómirin segiz dáwirge bólip sıpatlaǵan qatarlar retinde keltirilgen.",
    ),
    educationalMeaning: t(
      "Odamning ruhiyati, feli yoshga bog'liq ravishda o'zgaradi; shaxsning individual-psixologik xususiyatlariga e'tibor. | Adamnıń ruwxıyatı, minezi jasqa baylanıslı ózgeredi; shaxstıń individual-psixologiyalıq ózgesheliklerine itibar.",
    ),
    note: t(
      "Muallif izohi: sheshen odamning ruhiy jarayonlaridagi o'zgarishlarni anatomik va fiziologik asoslar bilan bog'laydi. | Avtor túsindirmesi: sheshen adamnıń ruwxıy processlerindegi ózgerislerdi anatomiyalıq hám fiziologiyalıq tiykarlar menen baylanıstıradı.",
    ),
    reference: '[6;258]; dissertatsiya 2.1-§',
    values: ['manaviy'],
  },
  {
    key: 'jiy-zolim',
    title: t("Jiyrenshe sheshen: «Zolimlik qonunsizlikdan...» | Jiyrenshe sheshen: «Zulımlıq nızamsızlıqtan...»"),
    type: 'OGZAKI_IJOD',
    period: 'nogai',
    thinker: 'jiyrenshe',
    content: 'Золимлик қонунсизликдан, Эзилиш онгсизликдан',
    description: t(
      "«Zolimlik nimadan kelib chiqadi?» degan yosh biyning savoliga Jiyrenshe sheshenning javobi (1.3-§). | «Zulımlıq nelerden kelip shıǵadı?» degen jas biydiń sorawına Jiyrenshe sheshenniń juwabı (1.3-§).",
    ),
    educationalMeaning: t(
      "Zulm yozma qonunning yo'qligidan, xalqning ezilishga ko'nikishi esa ongsizlik va bilimsizlikdan; xalqning hunar-bilimga intilishi va savodli bo'lishi orzu qilingan. | Zulım jazba nızamnıń joqlıǵınan, xalıqtıń ezilıwge kónigiwi bolsa sanasızlıq hám bilimsizlikten; xalıqtıń hunar-bilimge umtılıwı hám sawatlı bolıwı arzıw etilgen.",
    ),
    note: t(
      "Muallif izohi: bu falsafiy fikr XV asrda Jiyrenshening donoligini ko'rsatadi; u xonlar yozma qonunga bo'ysunishini orzu qilgan. | Avtor túsindirmesi: bul filosofiyalıq pikir XV ásirde Jiyrenshe danalıǵın kórsetedi; ol xanlardıń jazba nızamǵa boysınıwın arzıw etken.",
    ),
    reference: 'Dissertatsiya 1.3-§ (havola raqami ko\'rsatilmagan)',
    values: ['adolat', 'ilim'],
  },
  {
    key: 'jiy-boyqush',
    title: t("Jiyrenshe sheshen va uch boyqush rivoyati | Jiyrenshe sheshen hám úsh bayqus rawayatı"),
    type: 'RIVOYAT',
    period: 'nogai',
    thinker: 'jiyrenshe',
    content: L(
      '"Бойқушлар бир-бирига қуда тушиб қалин мол айтишаётган экан"-дейди чечан. "Қалин молига нима беради экан? Нима сўраяпти экан?"-деб сўраган хонга "Гил эски уйларни беради экан. Бири қизининг қалинига 300 та эски уй сўраб турган экан. Иккинчиси 300 эмас, 200 эски уй берай дейди унга.',
      'Ўртасидаги оқсоқоли: "Сен қийналма! Жанибек хон соғ бўлиб, юрт сўраб турадиган бўлса, 300 эмас,  500 та эски уй бўшаб қолади, озсинмай қизингни бера қол" – деб турибди дейди',
    ),
    description: t(
      "Xon yuborgan Jiyrenshe sheshen boyqushlar suhbatini «tarjima» qilib, xonning zulmini fosh etadi (1.3-§). | Xan jibergen Jiyrenshe sheshen bayquslar sóylesiwin «awdarıp», xannıń zulımın áshkaralaydı (1.3-§).",
    ),
    educationalMeaning: t(
      "Topqir, ramziy so'z orqali haqiqatni aytish; xalqning og'ir turmushi va xon zulmi ochib beriladi. | Tapqır, ramziy sóz arqalı haqıyqattı aytıw; xalıqtıń awır turmısı hám xan zulımı ashıp beriledi.",
    ),
    note: t(
      "Muallif izohi: bu afsona-rivoyatda Jiyrenshe oddiy xalqning jonkuyari va xalq tarafida turgan shaxs sifatida ko'rinadi. | Avtor túsindirmesi: bul ápsana-rawayatta Jiyrenshe ápiwayı xalıqtıń janashırı hám xalıq tárepinde turǵan shaxs retinde kórinedi.",
    ),
    reference: '[40;135]; dissertatsiya 1.3-§',
    values: ['nutq', 'adolat'],
  },
  {
    key: 'dos-vatan',
    title: t("Dospambet jirov: «Vatanimdan ayrilmaslik» | Dospambet jıraw: «Watanımnan ayırılmaslıq»"),
    type: 'TOLGOV',
    period: 'nogai',
    thinker: 'dospambet',
    content: L(
      'Айланиб оққан Оқ Ёйиқ,',
      'От солмай ўтар кун қайда,',
      'Эшиги баланд Бўз ўрда,',
      'Эгилмай кирар кун қайда',
    ),
    description: t(
      "Idil bo'yiga bostirib kelgan qalmoq feodallariga qarshi hujumga otlanish voqeasi bilan bog'liq asar (1.1-§). | Edil boyına basıp kelgen qalmaq feodallarına qarsı hújimge atlanıw waqıyası menen baylanıslı shıǵarma (1.1-§).",
    ),
    educationalMeaning: t(
      "Vatan va el-yurt uchun kurash, vatanga sadoqat g'oyasi. | Watan hám el-jurt ushın gúres, watanǵa sadıqlıq ideyası.",
    ),
    note: t(
      "Muallif izohi: bu asar M. Ospanovning «No'g'ay va qumiq shoirlari» kitobidagi ma'lumotga bog'lanadi [40;138]. | Avtor túsindirmesi: bul shıǵarma M. Ospanovtıń «Noǵay hám qumıq shayırları» kitabındaǵı maǵlıwmatqa baylanısadı [40;138].",
    ),
    reference: '[26;59]; dissertatsiya 1.1-§',
    values: ['vatan', 'jasorat'],
  },
  {
    key: 'dos-aymedet',
    title: t("Dospambet jirov: «Aymedet bilan Dospambet...» | Dospambet jıraw: «Aymedet penen Dospambet...»"),
    type: 'TOLGOV',
    period: 'nogai',
    thinker: 'dospambet',
    content: L('Аймедет билан Доспамбет,', 'Хон ўғлидан нимаси кам,', 'Бий ўғлидан нимаси кам'),
    description: t(
      "Dissertatsiyada (1.3-§) Dospambet jirovning insonni nasabiga qarab baholashga qarshi to'lg'ovi. | Dissertaciyada (1.3-§) Dospambet jırawdıń insandı nasiline qarap bahalawǵa qarsı tolǵawı.",
    ),
    educationalMeaning: t(
      "Xon va biy bolalarini nasliga emas, insoniylik kamolotiga qarab baholash to'g'ri. | Xan hám biy balaların nasiline emes, insanlıq kamalatına qarap bahalaw dúrıs.",
    ),
    note: t(
      "Muallif izohi: odamlarni boy-kambag'al, oqsuyak-qorasuyak deb bo'lish kamsitishga kiradi, insonparvarlik emas. | Avtor túsindirmesi: adamlardı bay-kámbaǵal, aqsúyek-qarasúyek dep bóliw kemsitiwge kiredi, insanparwarlıq emes.",
    ),
    reference: '[6;268]; dissertatsiya 1.3-§',
    values: ['insonparvar'],
  },
  {
    key: 'dos-oq',
    title: t("Dospambet jirov: «Arg'umoqqa o'q tegdi...» | Dospambet jıraw: «Arǵımaqqa oq tiydi...»"),
    type: 'TOLGOV',
    period: 'nogai',
    thinker: 'dospambet',
    content: L(
      'Арғумоққа ўқ тегди,',
      'Қил майқининг тубидан.',
      'Аймедетга ўқ тегди,',
      'Ўттиз икки умуртқанинг бўғинидан.',
      'Шариллаб оққан қора қон,',
      'Тўхтамайди жоннинг ўнг томиридан.',
      'Сақ этиб тегди сонимга,',
      'Қаттиқ ботди жонимга,',
      'Қўнжим тўла қонимга',
    ),
    description: t(
      "Dissertatsiyada (1.3-§) jangovar to'lg'ov: jirov jangda yaralangani tasvirlanadi. | Dissertaciyada (1.3-§) urıslıq tolǵaw: jıraw urısta jaralanǵanı sıpatlanadı.",
    ),
    educationalMeaning: t(
      "Jirovlar sarkarda, qahramon bo'lib doimo oldingi safda yurgan va el uchun jonini ayamagan. | Jıraw-shayırlar sarkarda, qaharman bolıp hámme waqıt aldıńǵı sapta júrgen hám el ushın janın ayamaǵan.",
    ),
    note: t(
      "Muallif izohi: bu janglar asosan No'g'ayli qavmlari orasidagi ichki janglar bo'lishi ehtimol; jirov Shayxi Mamay tarafida bo'lgani sezilar. | Avtor túsindirmesi: bul urıslar tiykarınan Noǵaylı qawımları arasındaǵı ishki urıslar bolıwı itimal; jıraw Sheyxi Mamay tárepinde bolǵanı seziledi.",
    ),
    reference: '[40;139]; dissertatsiya 1.3-§',
    values: ['jasorat', 'vatan'],
  },
  {
    key: 'dos-saqlan',
    title: t("Dospambet jirov: «Olib, olib, ol saqlan...» | Dospambet jıraw: «Alıp, alıp, al saqlan...»"),
    type: 'TOLGOV',
    period: 'nogai',
    thinker: 'dospambet',
    content: L(
      'Олиб, олиб, ол сақлан,',
      'Пойлаб юрган душмандан.',
      'Олиб, олиб, ол сақлан,',
      'Уриб жўрттага қочгандан.',
      'Эҳтиётсиз қуларсан,',
      'Юз карра сақлан қасддан»',
      'Сақлагил минг марта,',
      'Кулиб кириб уйингга,',
      'Ғудраниб чиққан дўстингдан.',
    ),
    description: t(
      "Dissertatsiyada (1.3-§) dushman va xoin do'st haqida ogohlantiruvchi to'lg'ov. | Dissertaciyada (1.3-§) dushpan hám hıyanatshı dos haqqında eskertiwshi tolǵaw.",
    ),
    educationalMeaning: t(
      "Insonni ehtiyotkorlik, hiyla va xiyonatga qarshi sergak bo'lishga chaqiradi; do'st va dushman o'rtasidagi farqni ko'rsatadi. | Insandı abaylawshılıqqa, hiyle hám hıyanatqa qarsı sergek bolıwǵa shaqıradı; dos hám dushpan arasındaǵı parıqtı kórsetedi.",
    ),
    note: t(
      "Muallif izohi: «Kulib kirib uyingga, g'udranib chiqqan do'stingdan» — yaqin ko'ringan, ammo xiyonat qilishga qodir odamlar haqida ogohlantirish. | Avtor túsindirmesi: «Külip kirip úyińe, gúrsinip shıqqan dosıńnan» — jaqın kóringen, biraq hıyanat etiwge qábiletli adamlar haqqında eskertiw.",
    ),
    reference: '[27]; dissertatsiya 1.3-§',
    values: ['dostlik'],
  },
  {
    key: 'dos-qarindosh',
    title: t("Dospambet jirov: «Qarindoshning ko'pi afzal» | Dospambet jıraw: «Tuwısqannıń kópi artıq»"),
    type: 'TOLGOV',
    period: 'nogai',
    thinker: 'dospambet',
    content: L(
      'Ёмғирли куни кўп юрма,',
      'Жар ёқаси тойғоқ,',
      'Ёмонга яқиним деб сўз айтма,',
      'Қариндошнинг кўпи афзал.',
      'Кунларнинг куни бўлганда,',
      'Ёвга чопмас ёмоннинг,',
      'Боридан йўғи афзал',
    ),
    description: t(
      "Dissertatsiyada (1.3-§) yaxshi va yomon odamlar bilan munosabat, qarindoshlik haqidagi to'lg'ov. | Dissertaciyada (1.3-§) jaqsı hám jaman adamlar menen qatnas, tuwısqanlıq haqqındaǵı tolǵaw.",
    ),
    educationalMeaning: t(
      "Yomonlikdan qochib yaxshilikka intilish; qiyinchilikda qarindosh-tilakdoshlarning ko'pligi kuch beradi, ularning totuvligiga o'rgatish foydali. | Jamanlıqtan qashıp jaqsılıqqa umtılıw; qıyınshılıqta tuwısqan-tilekles adamlardıń kóplıǵı kúsh beredi, olardıń tınıshlıǵına úyretiw paydalı.",
    ),
    note: t(
      "Muallif izohi: Dospambet dushmanni yengishning asosiy imkoniyatini qondosh, nasabdosh odamlarning ko'p bo'lishida deb hisoblagan. | Avtor túsindirmesi: Dospambet dushpandı jeńiwdiń tiykarǵı múmkinshiligin qandas, nasildas adamlardıń kóp bolıwında dep esaplaǵan.",
    ),
    reference: '[27]; dissertatsiya 1.3-§',
    values: ['dostlik'],
  },
  {
    key: 'book-nahj',
    title: t("Gali Mahmud, «Nahj al-faradis» (1358) | Gali Mahmud, «Nahj al-faradis» (1358)"),
    type: 'TARIXIY_ASAR',
    period: 'golden-horde',
    content:
      'Шулардан бири  XIV асрдаги Олтин Ўрда пойтахти саройида яшаган ўқимишли олим Гали Махмуд томонидан 1358йили ёзилган ёшларни  одоб-ахлоққа ўргатувчи китоб: «Наҳжел фарадис» (жаннатга йўл) хисобланади.',
    description: t(
      "Dissertatsiya (1.2-§) ko'rsatishicha, Oltin O'rda poytaxti saroyida yashagan olim Gali Mahmud tomonidan 1358-yilda yozilgan, yoshlarni odob-axloqqa o'rgatuvchi kitob. | Dissertaciya (1.2-§) kórsetiwinshe, Altın Orda paytaxtı sarayında jasaǵan ilimpaz Gali Mahmud tárepinen 1358-jılı jazılǵan, jaslardı ádep-ahlaqqa úyretiwshi kitap.",
    ),
    educationalMeaning: t(
      "Kitoblar yoshlarning ta'lim-tarbiyasi, jamiyatda o'z o'rnini topishi va shaxs sifatida kamol topishida katta ahamiyatga ega bo'lgan. | Kitaplar jaslardıń tálim-tárbiyası, jámiyette óz ornın tabıwı hám shaxs retinde kamalatqa erisiwinde úlken áhmiyetke iye bolǵan.",
    ),
    note: t(
      "Bu yozma manba bo'lib, jirov to'lg'ovi emas; dissertatsiya uni davr madaniy hayotining bir ko'rinishi sifatida keltiradi. | Bul jazba derek bolıp, jıraw tolǵawı emes; dissertaciya onı dáwir mádeniy ómiriniń bir kórinisi retinde keltiredi.",
    ),
    reference: 'Dissertatsiya 1.2-§ (havola raqami ko\'rsatilmagan)',
    values: ['manaviy', 'ilim'],
  },
  {
    key: 'book-sayf',
    title: t("Mejlesiy, «Sayf al-muluk» (XV asr) | Mejlesiy, «Sayf al-muluk» (XV ásir)"),
    type: 'TARIXIY_ASAR',
    period: 'golden-horde',
    content:
      'Меджлесийнинг шу даврда пайдо бўлган “Сеифелмелек” (ХV аср) китобида ҳам ёшлар одоб-ахлоқи ҳақида тушунча берилган, кўплаб тарбиявий фикрлар билдирилган.',
    description: t(
      "Dissertatsiyada (1.2-§) yoshlar odob-axloqi haqida tushuncha berilgan, hadislar ruhida yozilgan kitob sifatida tilga olinadi. | Dissertaciyada (1.2-§) jaslar ádep-ahlaqı haqqında túsinik berilgen, hádisler ruwxında jazılǵan kitap retinde atap ótiledi.",
    ),
    educationalMeaning: t(
      "Yoshlar odob-axloqi va tarbiyaviy fikrlar manbai. | Jaslar ádep-ahlaqı hám tárbiyalıq pikirler deregi.",
    ),
    note: t(
      "Yozma manba; dissertatsiya uni davrning ta'lim-tarbiyaviy muhitini ko'rsatish uchun keltiradi. | Jazba derek; dissertaciya onı dáwirdiń tálim-tárbiyalıq ortasın kórsetiw ushın keltiredi.",
    ),
    reference: '[6; 227]; dissertatsiya 1.2-§',
    values: ['katta', 'manaviy'],
  },
  {
    key: 'book-ummi',
    title: t("«Ummi Kamol» (1412) | «Ummi Kamol» (1412)"),
    type: 'TARIXIY_ASAR',
    period: 'golden-horde',
    content:
      'Айниқса 140 қиссадан иборат Олтин Ўрда даври (1412) “Умми Камол” китобида тарбиявий ишларни олиб боришга, ёшлар одоб-ахлоқига қўйиладиган талабларга алоҳида эътибор қаратилган.',
    description: t(
      "Dissertatsiyada (1.2-§) 140 qissadan iborat, 1412-yilga oid kitob; muallifi Ismoil o'zini «Ummi Kamol» («Savodsiz Kamol») deb atagan. | Dissertaciyada (1.2-§) 140 qissadan ibarat, 1412-jılǵa tiyisli kitap; avtorı Ismayıl ózin «Ummi Kamol» («Sawatsız Kamol») dep atagan.",
    ),
    educationalMeaning: t(
      "Tarbiyaviy ishlarni olib borish va yoshlar odob-axloqiga qo'yiladigan talablarga alohida e'tibor. | Tárbiyalıq jumıslardı alıp barıw hám jaslar ádep-ahlaqına qoyılatuǵın talaplarǵa ayrıqsha itibar.",
    ),
    note: t(
      "Yozma manba; dissertatsiya uni davr tarbiyaviy adabiyotining namunasi sifatida keltiradi. | Jazba derek; dissertaciya onı dáwir tárbiyalıq ádebiyatınıń úlgisi retinde keltiredi.",
    ),
    reference: '[100;9]; dissertatsiya 1.2-§',
    values: ['manaviy', 'ilim'],
  },
  {
    key: 'book-dostonlar',
    title: t("Qahramonlik dostonlari: «Edige», «Er Shora», «Alpomish», «Qo'blon», «Qurbanbek» | Qaharmanlıq dástanları: «Edige», «Er Shora», «Alpamıs», «Qoblan», «Qurbanbek»"),
    type: 'DOSTON',
    period: 'nogai',
    content:
      'Қорақалпоқ халқи орасда ҳозирги кунгача сақланиб қолган “Едиге”, “Ер Шора”, “Aлпомиш”, “Қўблон”, “Қурбанбек” ва бошқада кўплаб қаҳрамонлик достонлари бор.',
    description: t(
      "Dissertatsiya (1.2-§) ko'rsatishicha, Oltin O'rda voqealari va o'sha davrdagi no'g'oy xalqi hayotiga shunday qahramonlik dostonlari bag'ishlangan. | Dissertaciya (1.2-§) kórsetiwinshe, Altın Orda waqıyaları hám sol dáwirdegi noǵay xalqı ómirine usınday qaharmanlıq dástanları baǵıshlanǵan.",
    ),
    educationalMeaning: t(
      "Dostonlar xalq tarixiy xotirasi va vatanparvarlik, jasorat g'oyalarini avloddan avlodga yetkazadi. | Dástanlar xalıq tariyxıy esi hám watanparwarlıq, jasorat ideyaların áwladtan áwladqa jetkeredi.",
    ),
    note: t(
      "Bu yerda dostonlarning nomlari keltirilgan; doston matni manba sifatida dissertatsiyada to'liq berilmagan. | Bul jerde dástanlardıń atları keltirilgen; dástan teksti derek retinde dissertaciyada tolıq berilmegen.",
    ),
    reference: 'Dissertatsiya 1.2-§ (havola raqami ko\'rsatilmagan)',
    values: ['vatan', 'jasorat', 'estetik'],
  },
  {
    key: 'book-tarqalgan',
    title: t("O'sha davrda tarqalgan ta'limiy kitoblar | Sol dáwirde tarqalǵan tálimiy kitaplar"),
    type: 'TARIXIY_ASAR',
    period: 'golden-horde',
    content:
      'Саадийнинг “Гулистон” китоби ва шу даврлари ўзбек ва татар тилларига таржима қилинган қадимги ҳинд халқининг педагогикаси ҳақидаги “Қалила ва Димна”, Хўжа Aҳмад Яссавийнинг “Ҳикматлар”, Сулаймон Боқирғонийнинг “Охирзамон китоби” ва бошқада таълим-тарбияга оид китоблар Олтин Ўрда халқлари орасида кенг тарқалган.',
    description: t(
      "Dissertatsiya (1.2-§) Oltin O'rda xalqlari orasida keng tarqalgan kitoblarni sanab o'tadi: Sa'diy «Guliston», «Kalila va Dimna», Yassaviy «Hikmatlar», Boqirg'oniy «Oxirzamon kitobi» va boshqalar. | Dissertaciya (1.2-§) Altın Orda xalıqları arasında keń tarqalǵan kitaplardı sanap ótedi: Sa'diy «Gulistan», «Kalila hám Dimna», Yassawiy «Hikmetler», Boqırǵanıy «Aqırzaman kitabı» hám basqalar.",
    ),
    educationalMeaning: t(
      "Davrning yozma ta'lim-tarbiyaviy muhiti va jirovlar og'zaki ijodi bilan birga mavjudligini ko'rsatadi. | Dáwirdiń jazba tálim-tárbiyalıq ortası hám jıraw awızeki dóretpeleri menen birge bar bolǵanın kórsetedi.",
    ),
    note: t(
      "Yozma manbalar ro'yxati; ularning matni dissertatsiyada keltirilmagan. | Jazba derekler dizimi; olardıń teksti dissertaciyada keltirilmegen.",
    ),
    reference: 'Dissertatsiya 1.2-§ (havola raqami ko\'rsatilmagan)',
    values: ['ilim'],
  },
];
