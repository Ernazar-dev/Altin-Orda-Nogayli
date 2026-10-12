import { t } from './helpers';
import type { LText } from '../../src/lib/types';

export interface ValueSeed {
  key: string;
  name: LText;
  category:
    | 'AXIOLOGICAL'
    | 'INTELLECTUAL'
    | 'PATRIOTIC'
    | 'FAMILY'
    | 'LABOR'
    | 'COMMUNICATIVE'
    | 'AESTHETIC'
    | 'REFLECTIVE'
    | 'SOCIAL';
  description: LText;
  modern: LText;
}

export const values: ValueSeed[] = [
  {
    key: 'vatan',
    name: t("Vatanparvarlik | Watanparwarlıq"),
    category: 'PATRIOTIC',
    description: t(
      "Vatan himoyasi, xalqqa xizmat, el birligi; «ota makon» eng muqaddas tushuncha sanalgan (dissertatsiya 1.3-§, 2.1.1-jadval). | Watandı qorǵaw, xalıqqa xızmet, el birligi; «ata makan» eń muqaddes túsinik sanalǵan (dissertaciya 1.3-§, 2.1.1-keste).",
    ),
    modern: t(
      "Zamonaviy talqin: vatanga sadoqat — fuqarolik mas'uliyati, jamoat ishlarida ishtirok, yurt tarixini bilish va asrash. | Házirgi zaman túsindirmesi: watanǵa sadıqlıq — puqaralıq juwapkershilik, jámiyetlik jumıslarda qatnasıw, jurt tariyxın biliw hám saqlaw.",
    ),
  },
  {
    key: 'adolat',
    name: t("Adolat va haqqoniylik | Ádalat hám haqıyqatshıllıq"),
    category: 'AXIOLOGICAL',
    description: t(
      "Adolat hamma uchun baravar bo'lishi, xalqni adolatli boshqarish zarurligi (Asan qayg'ining pedagogik fikrlari, 1.3.1-jadval); adolat, haqiqat — aksiologik komponent (2.1.1-jadval). | Ádalat hámme ushın birdey bolıwı, xalıqtı ádalatlı basqarıw zárúrligi (Asan qayǵınıń pedagogikalıq pikirleri, 1.3.1-keste); ádalat, haqıyqat — aksiologiyalıq komponent (2.1.1-keste).",
    ),
    modern: t(
      "Zamonaviy talqin: qonun oldida tenglik, har bir insonning haqini hurmat qilish, sinfdagi munosabatlarda xolislik. | Házirgi zaman túsindirmesi: nızam aldında teńlik, hár bir insannıń haqqın húrmetlew, klasstaǵı qatnaslarda xolıslıq.",
    ),
  },
  {
    key: 'mehnat',
    name: t("Mehnatsevarlik | Miynetsúygishlik"),
    category: 'LABOR',
    description: t(
      "Kasb-hunar, halol mehnat, tirishqoqlik; yoshlikdan hunar o'rganish (2.1.1-jadval; Asan qayg'i). | Káspi-hunar, hálal miynet, tırısqaqlıq; jaslıqtan hunar úyreniw (2.1.1-keste; Asan qayǵı).",
    ),
    modern: t(
      "Zamonaviy talqin: kasbga erta qiziqish, o'z mehnati bilan natijaga erishish, mas'uliyatli o'qish va ishlash. | Házirgi zaman túsindirmesi: kásipke erte qızıǵıw, óz miyneti menen nátiyjege erisiw, juwapkershilikli oqıw hám islew.",
    ),
  },
  {
    key: 'katta',
    name: t("Kattalarga hurmat va oila tarbiyasi | Úlkenlerge húrmet hám shańaraq tárbiyası"),
    category: 'FAMILY',
    description: t(
      "Ota-ona namunasi, avlodlar davomiyligi, kattalarga hurmat (2.1.1-jadval). Sipira jirov: «ulug'dan oldin kichikning gapirishi yo'q». | Ata-ana úlgisi, áwladlar dawamlılıǵı, úlkenlerge húrmet (2.1.1-keste). Sipira jıraw: «ulıǵdan aldın kishiniń sóylewi joq».",
    ),
    modern: t(
      "Zamonaviy talqin: kattalarni tinglash, suhbatda odob saqlash, oilaviy burchni anglash. | Házirgi zaman túsindirmesi: úlkenlerdi tıńlaw, sóylesiwde ádep saqlaw, shańaraq minnetin túsiniw.",
    ),
  },
  {
    key: 'ilim',
    name: t("Ilm va bilimga intilish | Ilim hám bilimge umtılıw"),
    category: 'INTELLECTUAL',
    description: t(
      "Bilim, aql, tajriba, tafakkur; inson ilm va mehnat bilan komillikka erishadi (2.1.1-jadval; Asan qayg'i). | Bilim, aqıl, tájiriybe, pikirlew; insan ilim hám miynet penen kamalatqa erisedi (2.1.1-keste; Asan qayǵı).",
    ),
    modern: t(
      "Zamonaviy talqin: mustaqil va tanqidiy fikrlash, manbalar bilan ishlash, hayot davomida o'rganish. | Házirgi zaman túsindirmesi: óz aldına hám synlı pikirlew, derekler menen islew, ómir dawamında úyreniw.",
    ),
  },
  {
    key: 'ustoz',
    name: t("Ustoz-shogird munosabati | Ustaz-shákirt qatnası"),
    category: 'INTELLECTUAL',
    description: t(
      "Ustoz va shogirdning o'zaro tushunishi, ustozning shogirdga ixtiyori bilan ta'lim berishi, olimga xos odob (Asan qayg'i, 1.3-§); ustoz-shogird munosabatlarini rivojlantirish — dissertatsiya xulosasi. | Ustaz benen shákirttiń ózara túsiniwi, ustazdıń shákirtke ıqtıyarı menen tálim beriwi, ilimpazǵa tán ádep (Asan qayǵı, 1.3-§); ustaz-shákirt qatnasların rawajlandırıw — dissertaciya juwmaǵı.",
    ),
    modern: t(
      "Zamonaviy talqin: o'qituvchi bilan hamkorlik, maslahatlashib o'qish, tanqidni hurmat bilan qabul qilish. | Házirgi zaman túsindirmesi: oqıtıwshı menen hámkorlıq, másláhátlesip oqıw, synǵa húrmet penen qatnas.",
    ),
  },
  {
    key: 'dostlik',
    name: t("Do'stlik va ahillik | Dosliq hám awızbirshilik"),
    category: 'SOCIAL',
    description: t(
      "Do'stni to'g'ri tanlash, do'stning ko'nglini og'ritmaslik, bir ittifoqda bo'lish; «Yaxshidan tanlab do'st tuting» (Asan qayg'i). | Dosıńdı dóris saylaw, dostıń kewlin awırtpaw, bir ittifaqta bolıw; «Jaqsıdan saylap dos tutıń» (Asan qayǵı).",
    ),
    modern: t(
      "Zamonaviy talqin: sinfdoshlar bilan hamkorlik, jamoada ahil ishlash, yaxshi muhit tanlash. | Házirgi zaman túsindirmesi: klasslaslar menen hámkorlıq, toparda awızbirshilik penen islew, jaqsı orta saylaw.",
    ),
  },
  {
    key: 'insonparvar',
    name: t("Insonparvarlik | Insanparwarlıq"),
    category: 'AXIOLOGICAL',
    description: t(
      "Inson qadrini hurmat qilish, beva-yetimlarga g'amxo'rlik; insonni nasabiga emas, fazilatiga qarab baholash (Sipira jirov, Asan qayg'i, Dospambet jirov). | Insannıń qádirin húrmetlew, jetim-jesirlerge ǵamxorlıq; insandı nasiline emes, pazıyletine qarap bahalaw (Sipira jıraw, Asan qayǵı, Dospambet jıraw).",
    ),
    modern: t(
      "Zamonaviy talqin: ijtimoiy tenglik, mehr-oqibat, himoyaga muhtojlarga yordam. | Házirgi zaman túsindirmesi: sociallıq teńlik, mehir-oqıbet, qorǵawǵa mútáj bolǵanlarǵa járdem.",
    ),
  },
  {
    key: 'rost',
    name: t("Rostgo'ylik va halollik | Rastgóylik hám hádlik"),
    category: 'AXIOLOGICAL',
    description: t(
      "Yolg'on gapirish va g'iybat yomonlik sanalgan; voqeani o'z ko'zi bilan ko'rmasdan ishonmaslik (Asan qayg'i, 1.3-§). | Jalǵan sóylew hám gıybat jamanlıq sanalǵan; waqıyanı óz kózi menen kórmey isenbew (Asan qayǵı, 1.3-§).",
    ),
    modern: t(
      "Zamonaviy talqin: ijtimoiy tarmoqdagi yolg'on xabarlarga tanqidiy yondashuv, so'zga mas'uliyat. | Házirgi zaman túsindirmesi: sociallıq tarawdaǵı jalǵan xabarlarǵa synlı jantasıw, sózge juwapkershilik.",
    ),
  },
  {
    key: 'jasorat',
    name: t("Jasorat va qahramonlik | Jasorat hám qaharmanlıq"),
    category: 'PATRIOTIC',
    description: t(
      "Mardlik, botirlik, el-yurt sha'nini himoya qilish; jirovlar sarkarda sifatida oldingi safda yurgan (Dospambet jirov). | Mártlik, batırlıq, el-jurt abırayın qorǵaw; jıraw-shayırlar sarkarda retinde aldıńǵı sapta júrgen (Dospambet jıraw).",
    ),
    modern: t(
      "Zamonaviy talqin: haqiqatni aytishga jur'at, zaifni himoya qilish, qiyinchilikda sabot. | Házirgi zaman túsindirmesi: haqıyqattı aytıwǵa batıllıq, álsizdi qorǵaw, qıyınshılıqta tabanlıq.",
    ),
  },
  {
    key: 'nutq',
    name: t("Nutq madaniyati va sheshenlik | Sóylew mádeniyatı hám sheshenlik"),
    category: 'COMMUNICATIVE',
    description: t(
      "Nutq madaniyati, maslahat, haqiqatni aytish; muloqot va bahs madaniyati (2.1.1-jadval; Jiyrenshe sheshen). | Sóylew mádeniyatı, másláhát, haqıyqattı aytıw; sóylesiw hám bahs mádeniyatı (2.1.1-keste; Jiyrenshe sheshen).",
    ),
    modern: t(
      "Zamonaviy talqin: dalil bilan fikr bildirish, munozarada odob, qisqa va mazmunli gapirish. | Házirgi zaman túsindirmesi: dálil menen pikir bildiriw, munazarada ádep, qısqa hám mazmunlı sóylew.",
    ),
  },
  {
    key: 'sabr',
    name: t("Sabr-qanoat va kechirimlilik | Sabır-qanaát hám keshirimlilik"),
    category: 'REFLECTIVE',
    description: t(
      "G'azabni jilovlash, sabrli va kechirimli bo'lish; xatosini tan olib kechirim so'ragan kishini jazolamaslik (Asan qayg'i, 1.3-§). | Gázepti tıyıw, sabırlı hám keshirimli bolıw; qátesin moyınlap keshirim sorǵan adamdı jazalamaw (Asan qayǵı, 1.3-§).",
    ),
    modern: t(
      "Zamonaviy talqin: hissiyotni boshqarish, nizoni muloqot bilan hal etish, xatodan o'rganish. | Házirgi zaman túsindirmesi: sezimdi basqarıw, nızanı sóylesiw menen sheshiw, qátelikten úyreniw.",
    ),
  },
  {
    key: 'estetik',
    name: t("Estetik did va jirovchilik san'ati | Estetikalıq talǵam hám jırawshılıq óneri"),
    category: 'AESTHETIC',
    description: t(
      "To'lg'ov, hikoya, doston, musiqa va jirovchilik orqali badiiy did va hissiy ta'sirchanlik (2.1.1-jadval). | Tolǵaw, hikaya, dástan, muzıka hám jırawshılıq arqalı kórkem talǵam hám sezimtallıq (2.1.1-keste).",
    ),
    modern: t(
      "Zamonaviy talqin: xalq og'zaki ijodini tinglash va ijro etish, qo'biz musiqasiga qiziqish. | Házirgi zaman túsindirmesi: xalıq awızeki dóretpelerin tıńlaw hám atqarıw, qobız muzıkasına qızıǵıw.",
    ),
  },
  {
    key: 'tabiat',
    name: t("Tabiat va inson uyg'unligi | Tábiyat hám insan sáykesligi"),
    category: 'SOCIAL',
    description: t(
      "Tabiatni inson hayotining ajralmas qismi sifatida qabul qilish, uni asrash va unumli foydalanish (Asan qayg'i, 1.3.1-jadval). | Tábiyattı insan ómiriniń ajıralmas bólegi retinde qabıllaw, onı asırap-abaylaw hám nátiyjeli paydalanıw (Asan qayǵı, 1.3.1-keste).",
    ),
    modern: t(
      "Zamonaviy talqin: ekologik ong, tabiat boyliklaridan oqilona foydalanish. | Házirgi zaman túsindirmesi: ekologiyalıq sana, tábiyat baylıqlarınan aqılǵa muwapıq paydalanıw.",
    ),
  },
  {
    key: 'manaviy',
    name: t("Ma'naviy kamolot va o'zini anglash | Ruwxıy kamalat hám ózin túsiniw"),
    category: 'REFLECTIVE',
    description: t(
      "Insonning ruhiy kamoloti, o'zini tahlil qilishi va o'zini yaxshilashi (Asan qayg'i, 1.3.1-jadval); qahramon xatti-harakatini baholash va o'z xulqini tahlil qilish (2.1.1-jadval, refleksiv komponent). | Insannıń rawxıy kamalatı, ózin analizlewi hám ózin jaqsılawı (Asan qayǵı, 1.3.1-keste); qaharman is-háreketin bahalaw hám óz minez-qulqın analizlew (2.1.1-keste, refleksiv komponent).",
    ),
    modern: t(
      "Zamonaviy talqin: refleksiv yozuv, shaxsiy maqsad qo'yish, o'z xulqiga tanqidiy baho. | Házirgi zaman túsindirmesi: refleksiv jazıw, jeke maqset qoyıw, óz minez-qulqına synlı baha.",
    ),
  },
];
