import type { CriterionSeed } from './activities.data';

/** Savol: [mezon, "uz | kaa", [to'g'ri, xato1, xato2, xato3]] — variant matnlari ham "uz | kaa". */
export type QSeed = [CriterionSeed, string, [string, string, string, string]];

export interface TestSeed {
  key: string;
  title: string;
  description: string;
  period?: string;
  thinker?: string;
  questions: QSeed[];
}

export const tests: TestSeed[] = [
  {
    key: 'test-davr',
    title: "Oltin O'rda va No'g'oyli davri | Altın Orda hám Noǵaylı dáwiri",
    description:
      "Dissertatsiyaning 1.2-§ va 2.2-§ mazmuni bo'yicha umumiy test. | Dissertaciyanıń 1.2-§ hám 2.2-§ mazmunı boyınsha ulıwma test.",
    questions: [
      ['COGNITIVE', "Dissertatsiyada «jirovlar maktabi asoschisi» deb kim ko'rsatiladi? | Dissertaciyada «jıraw mektebi tiykarshısı» dep kim kórsetiledi?", ["Sopbasli Sipira jirov | Sopbaslı Sipira jıraw", "Asan qayg'i | Asan qayǵı", "Jiyrenshe sheshen | Jiyrenshe sheshen", "Dospambet jirov | Dospambet jıraw"]],
      ['COGNITIVE', "Gali Mahmudning «Nahj al-faradis» kitobi qaysi yilda yozilgan? | Gali Mahmudtıń «Nahj al-faradis» kitabı qaysı jılı jazılǵan?", ["1358", "1412", "1223", "1206"]],
      ['COGNITIVE', "«Ummi Kamol» kitobi dissertatsiyada qaysi yilga oid deb ko'rsatiladi? | «Ummi Kamol» kitabı dissertaciyada qaysı jılǵa tiyisli dep kórsetiledi?", ["1412", "1358", "1456", "1380"]],
      ['COGNITIVE', "No'g'oyli xonligining poytaxti dissertatsiyada qaysi shahar deb ko'rsatiladi? | Noǵaylı xanlıǵınıń paytaxtı dissertaciyada qaysı qala dep kórsetiledi?", ["Saroyshiq | Sarayshıq", "Saroy Botu | Saray Bátu", "Urganch | Úrgenish", "Buxoro | Buxara"]],
      ['AXIOLOGICAL', "Insonni nasabiga emas, fazilatiga qarab baholash qaysi qadriyatga mos keladi? | Insandı nasiline emes, pazıyletine qarap bahalaw qaysı qádiriyatqa sáykes keledi?", ["Insonparvarlik | Insanparwarlıq", "Mehnatsevarlik | Miynetsúygishlik", "Estetik did | Estetikalıq talǵam", "Tabiatni asrash | Tábiyattı asırawlaw"]],
      ['AXIOLOGICAL', "Asan qayg'ining xonlarga soliq haqidagi tanqidi qaysi qadriyat bilan bog'liq? | Asan qayǵınıń xanlarǵa salıq haqqındaǵı synı qaysı qádiriyat penen baylanıslı?", ["Adolat | Ádalat", "Sabr-qanoat | Sabır-qanaát", "Nutq madaniyati | Sóylew mádeniyatı", "Estetik did | Estetikalıq talǵam"]],
      ['ACTIVITY', "«Jigso» metodida o'quvchilar qanday ishlaydi? | «Jigso» metodında oqıwshılar qalay isleydi?", ["Material qismlarga bo'linadi; har guruh bir qismni o'rganib, boshqalarga tushuntiradi | Material bólimlerge bólinedi; hár topar bir bólimdi úyrenip, basqalarǵa túsindiredi", "Hamma bir xil matnni yod oladi | Hámme birdey tekstti jattap aladı", "Faqat o'qituvchi tushuntiradi | Tek oqıtıwshı túsindiredi", "Har kim alohida, hech kim bilan gaplashmaydi | Hár kim ayrıqsha, hesh kim menen sóylespeydi"]],
      ['REFLECTIVE', "Muammoli muhokamaning «Refleksiya» bosqichida o'quvchi nima qiladi? | Máselelik talqılawdıń «Refleksiya» basqıshında oqıwshı ne isleydi?", ["Fikri o'zgargan yoki o'zgarmaganini va qaysi dalil ta'sir qilganini tushuntiradi | Pikiri ózgergen yamasa ózgermegenin hám qaysı dálil tásir etkenin túsindiredi", "Faqat boshqalarning javobini ko'chiradi | Tek basqalardıń juwabın kóshiredi", "Mavzuni o'zgartiradi | Temanı ózgertedi", "Natijani baholamaydi | Nátiyjeni bahalamaydı"]],
    ],
  },
  {
    key: 'test-sipira-asan',
    title: "Sipira jirov va Asan qayg'i | Sipira jıraw hám Asan qayǵı",
    description:
      "Sipira jirov va Asan qayg'ining ta'lim-tarbiyaviy fikrlari bo'yicha test (1.1-§, 1.3-§). | Sipira jıraw hám Asan qayǵınıń tálim-tárbiyalıq pikirleri boyınsha test (1.1-§, 1.3-§).",
    thinker: 'asan',
    questions: [
      ['COGNITIVE', "«Otangga la'nat Kenjembay» to'lg'ovidagi Kenjembay kim? | «Ataǵa lánet Kenjembay» tolǵawındaǵı Kenjembay kim?", ["To'xtamishning bosh vaziri | Toqtamıstıń bas wázirı", "Xorazm hokimi | Xorezm hákimi", "Jiyrenshe sheshenning o'g'li | Jiyrenshe sheshenniń ulı", "Berkexonning elchisi | Berkexannıń elshisi"]],
      ['COGNITIVE', "Asan qayg'i dissertatsiyada qaysi hukmdorlarning maslahatchisi sifatida tilga olinadi? | Asan qayǵı dissertaciyada qaysı húkimdarlardıń másláhátshisi retinde atap ótiledi?", ["Ormambet bi va Janibek xon | Ormambet bi hám Janibek xan", "Chingizxon va Botuxon | Shıńǵısxan hám Batıxan", "Berkexon va Jo'shixon | Berkexan hám Joshıxan", "Abulxayrxon va Shayxi Mamay | Abulxayırxan hám Sheyxi Mamay"]],
      ['COGNITIVE', "Asanga «qayg'i» laqabi nima uchun berilgan? | Asanǵa «qayǵı» laqabı ne ushın berilgen?", ["Butun xalqning taqdiri haqida qayg'urgani uchun | Pútkil xalıqtıń táǵdiri haqqında qayǵırǵanı ushın", "Qo'shiq aytolmagani uchun | Qosıq ayta almaǵanı ushın", "Ko'p sayohat qilgani uchun | Kóp sayaxat qılǵanı ushın", "Xonlikdan haydalgani uchun | Xanlıqtan aydalǵanı ushın"]],
      ['AXIOLOGICAL', "«Yaxshidan tanlab do'st tuting» fikri qaysi qadriyatga tegishli? | «Jaqsıdan saylap dos tutıń» pikiri qaysı qádiriyatqa tiyisli?", ["Do'stlik va ahillik | Dosliq hám awızbirshilik", "Vatanparvarlik | Watanparwarlıq", "Estetik did | Estetikalıq talǵam", "Tabiatni asrash | Tábiyattı asırawlaw"]],
      ['AXIOLOGICAL', "«Ulug'dan oldin kichikning gapirishi yo'q» qaysi qadriyatni bildiradi? | «Ulıǵdan aldın kishiniń sóylewi joq» qaysı qádiriyattı bildiredi?", ["Kattalarga hurmat | Úlkenlerge húrmet", "Jasorat | Jasorat", "Mehnatsevarlik | Miynetsúygishlik", "Tabiat uyg'unligi | Tábiyat sáykesligi"]],
      ['ACTIVITY', "Sinfdoshingiz ijtimoiy tarmoqda tekshirilmagan xabar tarqatayapti. Asan qayg'i fikriga ko'ra nima qilasiz? | Klasslasıńız sociallıq tarmaqta tekserilmegen xabar tarqatıp atır. Asan qayǵı pikirine kóre ne qılasız?", ["Xabarni tekshirishni va tarqatmaslikni tavsiya qilaman | Xabardı tekseriwdi hám tarqatpawdı usınıs etemen", "Menda ham tarqataman | Men de tarqataman", "Hech narsa demayman | Hesh nárse demeymen", "Sinfdoshimni haqorat qilaman | Klasslasımdı haqaratlayman"]],
      ['ACTIVITY', "Do'stingiz xatosini tan olib, kechirim so'radi. Asan qayg'i nasihatiga mos harakat qaysi? | Dosıńız qátesin moyınlap, keshirim sorada. Asan qayǵı násiyatına say háreket qaysı?", ["Kechiraman va xatodan xulosa chiqarishga yordam beraman | Keshiremen hám qátelikten juwmaq shıǵarıwǵa járdem beremen", "O'ch olaman | Óshimdi alaman", "Hammaga aytib kuladi | Hámmege aytıp külemen", "U bilan gaplashmay qo'yaman | Onıń menen sóylespey qoyaman"]],
      ['REFLECTIVE', "O'z xulqingizni tahlil qilish uchun qaysi savol eng foydali? | Óz minez-qulqıńızdı analizlew ushın qaysı sorawlar eń paydalı?", ["Qaysi qadriyatga amal qildim va nimani o'zgartirgan bo'lardim? | Qaysı qádiriyatqa ámel ettim hám neni ózgertken bolar edim?", "Kim meni ko'rdi? | Kim meni kórdi?", "Qanchalik tez tugatdim? | Qansha tez pitkerdim?", "Boshqalar nima qildi? | Basqalar ne qıldı?"]],
    ],
  },
  {
    key: 'test-jiy-dos',
    title: "Jiyrenshe sheshen va Dospambet jirov | Jiyrenshe sheshen hám Dospambet jıraw",
    description:
      "Jiyrenshe sheshen va Dospambet jirovning pedagogik fikrlari bo'yicha test (1.1-§, 1.3-§, 2.1-§). | Jiyrenshe sheshen hám Dospambet jırawdıń pedagogikalıq pikirleri boyınsha test (1.1-§, 1.3-§, 2.1-§).",
    thinker: 'dospambet',
    questions: [
      ['COGNITIVE', "Dissertatsiyada Jiyrenshe sheshen qaysi xonning vaziri va maslahatchisi sifatida ko'rsatiladi? | Dissertaciyada Jiyrenshe sheshen qaysı xannıń wázirı hám másláhátshisi retinde kórsetiledi?", ["Janibek xon | Janibek xan", "Botuxon | Batıxan", "Chingizxon | Shıńǵısxan", "Berkexon | Berkexan"]],
      ['COGNITIVE', "Dospambet jirov dissertatsiyada qayerda tug'ilgan deb ko'rsatiladi? | Dospambet jıraw dissertaciyada qayerde tuwılǵan dep kórsetiledi?", ["Azov shahri atrofida | Azov qalası átirapında", "Urganchda | Úrgenishte", "Saroychiqda | Sarayshıqta", "Buxoroda | Buxarada"]],
      ['COGNITIVE', "Jiyrenshe sheshen inson umrini nechta davrga bo'lib tasvirlaydi? | Jiyrenshe sheshen insan ómirin neshe dáwirge bólip sıpatlaydı?", ["Sakkiz | Segiz", "Uch | Úsh", "To'rt | Tórt", "Ikki | Eki"]],
      ['AXIOLOGICAL', "«Zolimlik qonunsizlikdan, ezilish ongsizlikdan» fikri qaysi qadriyatga yaqin? | «Zulımlıq nızamsızlıqtan, ezilıw sanasızlıqtan» pikiri qaysı qádiriyatqa jaqın?", ["Adolat va haqqoniylik | Ádalat hám haqıyqatshıllıq", "Estetik did | Estetikalıq talǵam", "Tabiat uyg'unligi | Tábiyat sáykesligi", "Mehmondo'stlik | Miymandóstlik"]],
      ['AXIOLOGICAL', "«Xon o'g'lidan nimasi kam, biy o'g'lidan nimasi kam» qaysi qadriyatni bildiradi? | «Xan ulınan nesi kem, biy ulınan nesi kem» qaysı qádiriyattı bildiredi?", ["Insonparvarlik | Insanparwarlıq", "Mehnatsevarlik | Miynetsúygishlik", "Nutq madaniyati | Sóylew mádeniyatı", "Estetik did | Estetikalıq talǵam"]],
      ['ACTIVITY', "Jiyrenshe xonning zulmini boyqushlar rivoyati orqali qanday aytadi? | Jiyrenshe xannıń zulımın bayquslar rawayatı arqalı qalay aytadı?", ["Ramziy, topqir so'z bilan | Ramziy, tapqır sóz benen", "Jangga chaqirib | Urısqa shaqırıp", "Indamay ketib | Indamay ketip", "Xonga yolg'on gapirib | Xanǵa jalǵan sóylep"]],
      ['ACTIVITY', "«Kulib kirib uyingga, g'udranib chiqqan do'stingdan» satrlariga mos hayotiy holat qaysi? | «Külip kirip úyińe, gúrsinip shıqqan dosıńnan» qatarlarına say turmıslıq jaǵday qaysı?", ["Yuziga kulib, orqasidan zarar yetkazadigan «do'st»dan ehtiyot bo'lish | Júzine külip, artınan zıyan keltiretuǵın «dos»tan abaylaw", "Hammaga ko'r-ko'rona ishonish | Hámmege kóz jumıp isenıw", "Do'stdan butunlay voz kechish | Dostan pútkilley waz keshiw", "Do'st haqida g'iybat qilish | Dos haqqında gıybat qılıw"]],
      ['REFLECTIVE', "Manba muhokamasidan keyin fikringiz o'zgargan bo'lsa, qanday javob to'g'ri? | Derek talqılawınan keyin pikiriń ózgergen bolsa, qanday juwap dúrıs?", ["Qaysi dalil va fakt ta'sir qilganini tushuntiraman | Qaysı dálil hám fakt tásir etkenin túsindiremen", "Hech narsa demayman | Hesh nárse demeymen", "Boshqalar aytganini takrorlayman | Basqalar aytqanın qaytalayman", "Faqat «bilmayman» deyman | Tek «bilmeymen» deymen"]],
    ],
  },
];

export interface DiagnosticSeed {
  kind: 'INITIAL' | 'FINAL';
  title: string;
  questions: QSeed[];
}

const V = {
  vatan: "Vatanparvarlik | Watanparwarlıq",
  dostlik: "Do'stlik va ahillik | Dosliq hám awızbirshilik",
  adolat: "Adolat | Ádalat",
  insonparvar: "Insonparvarlik | Insanparwarlıq",
  mehnat: "Mehnatsevarlik | Miynetsúygishlik",
  katta: "Kattalarga hurmat | Úlkenlerge húrmet",
  rost: "Rostgo'ylik | Rastgóylik",
  estetik: "Estetik did | Estetikalıq talǵam",
  tabiat: "Tabiat uyg'unligi | Tábiyat sáykesligi",
  nutq: "Nutq madaniyati | Sóylew mádeniyatı",
} as const;

export const diagnostics: DiagnosticSeed[] = [
  {
    kind: 'INITIAL',
    title: "Boshlang'ich diagnostika | Baslanǵısh diagnostika",
    questions: [
      ['COGNITIVE', "Jirovlar maktabi asoschisi deb kim ko'rsatiladi? | Jıraw mektebi tiykarshısı dep kim kórsetiledi?", ["Sopbasli Sipira jirov | Sopbaslı Sipira jıraw", "Dospambet jirov | Dospambet jıraw", "Jiyrenshe sheshen | Jiyrenshe sheshen", "Asan qayg'i | Asan qayǵı"]],
      ['COGNITIVE', "Asanga «qayg'i» laqabi nega berilgan? | Asanǵa «qayǵı» laqabı nege berilgen?", ["Xalqning taqdiri uchun qayg'urgani uchun | Xalıqtıń táǵdiri ushın qayǵırǵanı ushın", "Kam gapirgani uchun | Az sóylegeni ushın", "Sayohatga chiqmagani uchun | Sayaxatqa shıqpaǵanı ushın", "Xon bo'lgani uchun | Xan bolǵanı ushın"]],
      ['COGNITIVE', "Jiyrenshe sheshen kimning vaziri-maslahatchisi sifatida tilga olinadi? | Jiyrenshe sheshen kimniń wázirı-másláhátshisi retinde atap ótiledi?", ["Janibek xon | Janibek xan", "Chingizxon | Shıńǵısxan", "Botuxon | Batıxan", "Berkexon | Berkexan"]],
      ['COGNITIVE', "Dospambet jirov taxminan qayerda tug'ilgan? | Dospambet jıraw shama menen qayerde tuwılǵan?", ["Azov shahri atrofida | Azov qalası átirapında", "Urganchda | Úrgenishte", "Nukusda | Nókiste", "Buxoroda | Buxarada"]],
      ['COGNITIVE', "Q. Ayimbetov qoraqalpoq xalq jirchilarini nechta turga bo'ladi? | Q. Ayımbetov qaraqalpaq xalıq jırshılarin neshe túrge bóledi?", ["To'rtta | Tórt", "Ikkita | Eki", "Oltita | Altı", "Bitta | Bir"]],
      ['AXIOLOGICAL', "«Elning nurli bo'lgani — botirning tug'ilgani» qaysi qadriyat? | «Eldiń nurlı bolǵanı — batırdıń tuwılǵanı» qaysı qádiriyat?", [V.vatan, V.estetik, V.tabiat, V.nutq]],
      ['AXIOLOGICAL', "«Yaxshidan tanlab do'st tuting» qaysi qadriyat? | «Jaqsıdan saylap dos tutıń» qaysı qádiriyat?", [V.dostlik, V.mehnat, V.estetik, V.tabiat]],
      ['AXIOLOGICAL', "«Zolimlik qonunsizlikdan» qaysi qadriyatga yaqin? | «Zulımlıq nızamsızlıqtan» qaysı qádiriyatqa jaqın?", [V.adolat, V.estetik, V.tabiat, V.katta]],
      ['AXIOLOGICAL', "«Olmosga bermas ora bor, xonga bermas qora bor» nimani eslatadi? | «Almasqa bermes ara bar, xanǵa bermes qara bar» nenı eske túsiredi?", ["Inson qadri nasabda emas, aql va fazilatda | Insan qádiri nasilde emes, aqıl hám pazıylette", "Olmos qimmatligini | Almas qımbatlıǵın", "Xon eng aqlli ekanini | Xan eń aqıllı ekenin", "Hunar kerak emasligini | Hunar kerek emesligin"]],
      ['AXIOLOGICAL', "«Yoshligingda hunar bilmasang, ulg'ayganda bilmaysan» qaysi qadriyat? | «Jaslıǵıńda hunar bilmeseń, úlkeyiwde bilmeysen» qaysı qádiriyat?", [V.mehnat, V.nutq, V.estetik, V.tabiat]],
      ['ACTIVITY', "Sinfdoshingiz katta kishi gapirayotganda uni bo'lyapti. Sipira jirov fikriga mos harakat qaysi? | Klasslasıńız úlken adam sóylep atırǵanda onı bólip atır. Sipira jıraw pikirine say háreket qaysı?", ["Odob bilan navbatini kutishni eslataman | Ádep penen kezegin kútiwdi eske salaman", "Men ham gapni bo'laman | Men de sózdi bólemen", "Kulib qo'yaman | Külip qoyaman", "Chiqib ketaman | Shıǵıp ketemen"]],
      ['ACTIVITY', "Tarmoqda do'stingiz haqida g'iybat xabar keldi. Asan qayg'iga ko'ra? | Tarmaqta dosıńız haqqında gıybat xabar keldi. Asan qayǵıǵa kóre?", ["Tekshiraman va tarqatmayman | Tekseremen hám tarqatpayman", "Darhol tarqataman | Derhal tarqataman", "Do'stimdan yuz o'giraman | Dosımnan júz buraman", "Izoh yozib haqorat qilaman | Pikir jazıp haqaratlayman"]],
      ['ACTIVITY', "Do'stingiz xato qilib kechirim so'radi. Qanday harakat qilasiz? | Dosıńız qátelesip keshirim sorada. Qanday háreket qılasız?", ["Kechiraman va xatodan o'rganishga yordam beraman | Keshiremen hám qátelikten úyreniwge járdem beremen", "O'ch olaman | Óshimdi alaman", "Hammaga aytaman | Hámmege aytaman", "Gaplashmayman | Sóylespeymen"]],
      ['ACTIVITY', "Guruh ishida vazifalarni qanday taqsimlash adolatli? | Topar jumısında wazıypalardı qalay bóliw ádalatlı?", ["Hammaga teng va fikrini eshitib | Hámmege teń hám pikirin esitip", "Do'stlarimga yengilini | Doslarıma jeńilin", "Faqat kuchlilarga | Tek kúshlilerge", "Hammasini o'zim hal qilaman | Hámmesin ózim sheshemen"]],
      ['ACTIVITY', "Yoshlikdan hunar o'rganish uchun nima qilish mumkin? | Jaslıqtan hunar úyreniw ushın ne qılıw múmkin?", ["To'garakka qatnayman va uyda ishlarga yordam beraman | Úyirmege qatnayman hám úyde jumıslarǵa járdemlesemen", "Kutaman | Kútemen", "Faqat o'ynayman | Tek oynayman", "Boshqalar o'rgansin | Basqalar úyrensin"]],
      ['REFLECTIVE', "O'z xulqingizni tahlil qilish uchun qaysi savol foydali? | Óz minez-qulqıńızdı analizlew ushın qaysı soraw paydalı?", ["Qaysi qadriyatga amal qildim va nimani o'zgartirardim? | Qaysı qádiriyatqa ámel ettim hám neni ózgertermen?", "Kim ko'rdi? | Kim kórdi?", "Qancha tez tugatdim? | Qansha tez pitkerdim?", "Boshqalar nima qildi? | Basqalar ne qıldı?"]],
      ['REFLECTIVE', "Muhokamadan keyin fikringiz o'zgarsa, nima qilasiz? | Talqılawdan keyin pikiriń ózgerse, ne qılasız?", ["Qaysi dalil ta'sir qilganini tushuntiraman | Qaysı dálil tásir etkenin túsindiremen", "Indamayman | Indamayman", "Boshqalarni takrorlayman | Basqalardı qaytalayman", "Mavzuni o'zgartiraman | Temanı ózgertemen"]],
      ['REFLECTIVE', "Tarixiy fikrni bugungi hayotga bog'lashda nimaga ehtiyot bo'lish kerak? | Tariyxıy pikirdi búgingi ómirge baylanıstırıwda nege abaylaw kerek?", ["Manbadagi fikr bilan zamonaviy talqinni aralashtirmaslik | Derekdegi pikir menen házirgi zaman túsindirmesin aralastırmaw", "Manbani o'zgartirish | Derekti ózgertiw", "Tarixni o'ylab topish | Tariyxtı oylap tabıw", "Manbasiz gapirish | Dereksiz sóylew"]],
      ['REFLECTIVE', "Xatosini tan olib kechirim so'ragan kishi haqida Asan qayg'i nima deydi? | Qátesin moyınlap keshirim sorǵan adam haqqında Asan qayǵı ne deydi?", ["Jazolamaslik kerak; bu o'zini tarbiyalash belgisi | Jazalamaw kerek; bul ózin tárbiyalaw belgisi", "Doim jazolash | Hámme waqıt jazalaw", "E'tibor bermaslik | Itibar bermew", "Hammaga e'lon qilish | Hámmege járiyalaw"]],
      ['REFLECTIVE', "Qahramon xatti-harakatini baholashda nimaga tayanish to'g'ri? | Qaharman is-háreketin bahalawda nege súyeniw dúrıs?", ["Manba va dalilga hamda davr sharoitiga | Derek hám dálilge hám dáwir jaǵdayına", "Faqat his-tuyg'uga | Tek sezimge", "Eng ko'p ovozga | Eń kóp dawısqa", "Taxminga | Shamalawǵa"]],
    ],
  },
  {
    kind: 'FINAL',
    title: "Yakuniy diagnostika | Juwmaqlawshı diagnostika",
    questions: [
      ['COGNITIVE', "«Otangga la'nat Kenjembay» to'lg'ovi kimga tegishli? | «Ataǵa lánet Kenjembay» tolǵawı kimge tiyisli?", ["Sopbasli Sipira jirov | Sopbaslı Sipira jıraw", "Dospambet jirov | Dospambet jıraw", "Jiyrenshe sheshen | Jiyrenshe sheshen", "Asan qayg'i | Asan qayǵı"]],
      ['COGNITIVE', "Asan qayg'i taxminan qaysi yilda tug'ilgan deyiladi? | Asan qayǵı shama menen qaysı jılı tuwılǵan delinedi?", ["1370", "1213", "1393", "1456"]],
      ['COGNITIVE', "Jiyrenshe sheshen inson umrini nechta davrga bo'ladi? | Jiyrenshe sheshen insan ómirin neshe dáwirge bóledi?", ["Sakkiz | Segiz", "Uch | Úsh", "Besh | Bes", "Ikki | Eki"]],
      ['COGNITIVE', "«Vatanimdan ayrilmaslik» to'lg'ovi kimniki? | «Watanımnan ayırılmaslıq» tolǵawı kimdiki?", ["Dospambet jirov | Dospambet jıraw", "Sopbasli Sipira jirov | Sopbaslı Sipira jıraw", "Asan qayg'i | Asan qayǵı", "Jiyrenshe sheshen | Jiyrenshe sheshen"]],
      ['COGNITIVE', "Gali Mahmudning «Nahj al-faradis» kitobi qaysi yilda yozilgan? | Gali Mahmudtıń «Nahj al-faradis» kitabı qaysı jılı jazılǵan?", ["1358", "1412", "1206", "1227"]],
      ['AXIOLOGICAL', "«Barchangiz bir bo'ling» qaysi qadriyat? | «Barlıǵıńız bir bolıń» qaysı qádiriyat?", [V.dostlik, V.estetik, V.tabiat, V.nutq]],
      ['AXIOLOGICAL', "«Ulug'dan oldin kichikning gapirishi yo'q» qaysi qadriyat? | «Ulıǵdan aldın kishiniń sóylewi joq» qaysı qádiriyat?", [V.katta, V.vatan, V.tabiat, V.estetik]],
      ['AXIOLOGICAL', "Beva-yetimlarga g'amxo'rlik talabi qaysi qadriyat? | Jesir-jetimlerge ǵamxorlıq talabı qaysı qádiriyat?", [V.insonparvar, V.estetik, V.tabiat, V.nutq]],
      ['AXIOLOGICAL', "«Xavotir so'z oz bo'lmas, ko'nglingni buzma» qaysi qadriyatga tegishli? | «Xawotır sóz az bolmas, kewlińdi buzba» qaysı qádiriyatqa tiyisli?", [V.rost, V.estetik, V.tabiat, V.mehnat]],
      ['AXIOLOGICAL', "«Vatanimdan ayrilmaslik» qaysi qadriyat bilan bog'liq? | «Watanımnan ayırılmaslıq» qaysı qádiriyat penen baylanıslı?", [V.vatan, V.estetik, V.nutq, V.tabiat]],
      ['ACTIVITY', "Mahalladagi qariya yordam so'radi. Qanday harakat qilasiz? | Mahalladaǵı qarıya járdem sorada. Qanday háreket qılasız?", ["Hurmat bilan yordam beraman | Húrmet penen járdem beremen", "E'tibor bermayman | Itibar bermeymen", "Kulaman | Külemen", "Boshqa birovga topshiraman | Basqa birewge tapsıraman"]],
      ['ACTIVITY', "Guruh ishida kelishmovchilik chiqdi. Asan qayg'iga ko'ra? | Topar jumısında kelispewshilik shıqtı. Asan qayǵıǵa kóre?", ["Hammani tinglab, maslahatlashib hal qilaman | Hámmeni tıńlap, másláhátlesip sheshemen", "Faqat o'zimnikini qilaman | Tek ózimnikin qılaman", "Ishdan chiqib ketaman | Jumıstan shıǵıp ketemen", "Qichqiraman | Qıshqıraman"]],
      ['ACTIVITY', "Yangi xabar keldi. Uni tarqatishdan oldin nima qilasiz? | Jańa xabar keldi. Onı tarqatıwdan aldın ne qılasız?", ["Ishonchli manbada tekshiraman | Isenimli derekte tekseremen", "Darhol yuboraman | Derhal jiberemen", "Hamma ishonadi deb o'ylayman | Hámme isenedi dep oylayman", "Izoh yozaman | Pikir jazaman"]],
      ['ACTIVITY', "Jahlingiz chiqdi. Asan qayg'iga ko'ra qanday harakat qilasiz? | Ashıwıńız shıqtı. Asan qayǵıǵa kóre qanday háreket qılasız?", ["To'xtab o'ylayman, g'azabni jilovlayman | Toqtap oylayman, gázepti tıyaman", "Qichqiraman | Qıshqıraman", "Haqorat qilaman | Haqaratlayman", "Eshikni uraman | Esikti uraman"]],
      ['ACTIVITY', "Maktab tadbirida yurt tarixini taqdim etish kerak. Nima qilasiz? | Mektep ilajında jurt tariyxın usınıw kerek. Ne qılasız?", ["Tayyorlanib, manbaga tayanib taqdim etaman | Tayarlanıp, derekke súyenip usınaman", "Qatnashmayman | Qatnaspayman", "O'ylab topaman | Oylap tabaman", "Boshqalar qilsin | Basqalar qılsın"]],
      ['REFLECTIVE', "O'z xatti-harakatingizni baholashda qaysi savol yordam beradi? | Óz is-háreketińizdi bahalawda qaysı soraw járdem beredi?", ["Qaysi qadriyatga amal qildim va nima o'zgartirardim? | Qaysı qádiriyatqa ámel ettim hám ne ózgertermen?", "Kim ko'rdi? | Kim kórdi?", "Qancha vaqt ketdi? | Qansha waqıt ketti?", "Boshqalar nima dedi? | Basqalar ne dedi?"]],
      ['REFLECTIVE', "Fikringiz o'zgargan bo'lsa nima deysiz? | Pikiriń ózgergen bolsa ne deysiz?", ["Qaysi dalil ta'sir qilganini tushuntiraman | Qaysı dálil tásir etkenin túsindiremen", "Hech narsa | Hesh nárse", "Boshqalar aytgandek | Basqalar aytqanday", "Bilmayman | Bilmeymen"]],
      ['REFLECTIVE', "Tarixiy manba va zamonaviy talqinni qanday ajratasiz? | Tariyxıy derek hám házirgi zaman túsindirmesin qalay ajıratasız?", ["Manbani alohida, talqinni alohida ko'rsataman | Derekti ayrıqsha, túsindirmeni ayrıqsha kórsetemen", "Aralashtiraman | Aralastıraman", "Manbani o'zgartiraman | Derekti ózgertemen", "Talqinni manba deb atayman | Túsindirmeni derek dep atayman"]],
      ['REFLECTIVE', "Kechirim so'rash haqida Asan qayg'i fikri nima? | Keshirim soraw haqqında Asan qayǵı pikiri ne?", ["O'zini tarbiyalash belgisi | Ózin tárbiyalaw belgisi", "Zaiflik | Álsizlik", "Foydasiz | Paydasız", "Majburiyat emas | Májbúriyat emes"]],
      ['REFLECTIVE', "Qahramon xatti-harakatini baholashda to'g'ri yondashuv? | Qaharman is-háreketin bahalawda dúrıs jantasıw?", ["Dalil va davr sharoitiga tayanish | Dálil hám dáwir jaǵdayına súyeniw", "Faqat his-tuyg'u | Tek sezim", "Ko'pchilik fikri | Kópshilik pikiri", "Taxmin | Shamalaw"]],
    ],
  },
];
