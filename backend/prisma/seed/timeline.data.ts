import { t } from './helpers';
import type { LText } from '../../src/lib/types';

export interface TimelineSeed {
  kind: 'DAVR' | 'VOQEA' | 'MUTAFAKKIR' | 'ASAR' | 'GOYA';
  year: number | null;
  yearLabel: string;
  title: LText;
  description: LText;
  period: string;
  ref?: { type: 'PERIOD' | 'THINKER' | 'VALUE' | 'SOURCE'; key: string };
  sourceRef: string;
}

export const timeline: TimelineSeed[] = [
  {
    kind: 'VOQEA', year: 1206, yearLabel: '1206',
    title: t("Qurultoy: Temuchin Chingizxon deb e'lon qilinadi | Quriltay: Temuchin Shıńǵısxan dep járiyalanadı"),
    description: t(
      "Dissertatsiya (1.2-§) 1206-yilda o'tgan qurultoy Temuchinni Chingizxon nomi bilan mo'g'illarning xoqoni deb e'lon qilganini yozadi. | Dissertaciya (1.2-§) 1206-jılı ótken quriltay Temuchindi Shıńǵısxan atı menen mońǵıllardıń xaqanı dep járiyalaǵanın jazadı.",
    ),
    period: 'golden-horde', sourceRef: '[21;32]; 1.2-§',
  },
  {
    kind: 'VOQEA', year: 1221, yearLabel: '1221–1223',
    title: t("Chingizxon Xorazm, Orol, Idil va Yoyiq atroflarini egallaydi | Shıńǵısxan Xorezm, Aral, Edil hám Yayıq átirapların iyeleydi"),
    description: t(
      "1221–23-yillarda Xorazm, janubiy Orol, Idil va Yoyiq atroflari bosib olinishi bilan qipchoqlarning mo'g'illarga qaramligi yuzaga kelgan (1.2-§). | 1221–23-jılları Xorezm, qubla Aral, Edil hám Yayıq átiraplarınıń basıp alınıwı menen qıpshaqlardıń mońǵıllarǵa qaramlıǵı payda bolǵan (1.2-§).",
    ),
    period: 'golden-horde', sourceRef: '1.2-§',
  },
  {
    kind: 'DAVR', year: 1227, yearLabel: '1227 dan keyin',
    title: t("Oltin O'rda davlatining tashkil topishi | Altın Orda mámleketiniń qáliplesiwi"),
    description: t(
      "Jo'shi xon vafotidan (1227) so'ng o'rniga Botuxon qo'yiladi; bo'ysundirilgan yerlar birlashtirilib Oltin O'rda tashkil topadi (1.2-§). | Joshı xan qaytıs bolǵannan (1227) keyin ornına Batıxan qoyıladı; boysındırılǵan jerler birlestirilip Altın Orda quraladı (1.2-§).",
    ),
    period: 'golden-horde', ref: { type: 'PERIOD', key: 'golden-horde' }, sourceRef: '[74;114]; 1.2-§',
  },
  {
    kind: 'MUTAFAKKIR', year: null, yearLabel: 'XIV asr',
    title: t("Sopbasli Sipira jirov | Sopbaslı Sipira jıraw"),
    description: t(
      "Dissertatsiyada jirovlar maktabi asoschisi, XIV asr shoiri sifatida ko'rsatiladi (1.1-§). | Dissertaciyada jıraw mektebi tiykarshısı, XIV ásir shayırı retinde kórsetiledi (1.1-§).",
    ),
    period: 'golden-horde', ref: { type: 'THINKER', key: 'sipira' }, sourceRef: '1.1-§',
  },
  {
    kind: 'ASAR', year: 1358, yearLabel: '1358',
    title: t("Gali Mahmud «Nahj al-faradis»ni yozadi | Gali Mahmud «Nahj al-faradis»ti jazadı"),
    description: t(
      "Yoshlarni odob-axloqqa o'rgatuvchi kitob Oltin O'rda poytaxti saroyida yozilgan (1.2-§). | Jaslardı ádep-ahlaqqa úyretiwshi kitap Altın Orda paytaxtı sarayında jazılǵan (1.2-§).",
    ),
    period: 'golden-horde', ref: { type: 'SOURCE', key: 'book-nahj' }, sourceRef: '1.2-§',
  },
  {
    kind: 'VOQEA', year: 1380, yearLabel: '1380–1395',
    title: t("To'xtamishxon hukmronligi | Toqtamısxan húkimranlıǵı"),
    description: t(
      "To'xtamishxon o'z zamonasida (1380–1395) farmonlarida shayx va so'fiylarga hurmat ko'rsatgan (1.2-§). Sipira jirov shu davrdagi xon saroyi bilan bog'liq tasvirlanadi. | Toqtamısxan óz zamanında (1380–1395) pármanlarında sheyx hám súfiylerge húrmet kórsetken (1.2-§). Sipira jıraw usı dáwirdegi xan sarayı menen baylanıslı sıpatlanadı.",
    ),
    period: 'golden-horde', sourceRef: '1.2-§',
  },
  {
    kind: 'VOQEA', year: 1393, yearLabel: '1393',
    title: t("Sipira jirovning so'nggi to'lg'ovi (olim fikri) | Sipira jırawdıń sońǵı tolǵawı (ilimpaz pikiri)"),
    description: t(
      "Suyinshaliev P.M. Melioranskiyga tayanib, Sipira jirov To'xtamish o'rdasida 1393-yilda eng so'nggi to'lg'ovini aytgan deb hisoblaydi (dissertatsiyada keltirilgan olim fikri). | Süyinshaliev P.M. Melioranskiyge súyenip, Sipira jıraw Toqtamıs ordasında 1393-jılı eń sońǵı tolǵawın aytqan dep esaplaydı (dissertaciyada keltirilgen ilimpaz pikiri).",
    ),
    period: 'golden-horde', sourceRef: '[58;219]; 1.1-§',
  },
  {
    kind: 'MUTAFAKKIR', year: 1370, yearLabel: 'taxminan 1370',
    title: t("Asan qayg'i tug'iladi (taxminan) | Asan qayǵı tuwıladı (shama menen)"),
    description: t(
      "Dissertatsiyada Asan taxminan 1370-yilda tug'ilgan, taxminan 1490-yillarda vafot etgan deyiladi. | Dissertaciyada Asan shama menen 1370-jılı tuwılǵan, shama menen 1490-jıllarda qaytıs bolǵan delinedi.",
    ),
    period: 'nogai', ref: { type: 'THINKER', key: 'asan' }, sourceRef: '[6;241]; 1.1-§',
  },
  {
    kind: 'ASAR', year: 1412, yearLabel: '1412',
    title: t("«Ummi Kamol» kitobi | «Ummi Kamol» kitabı"),
    description: t(
      "140 qissadan iborat kitob; tarbiyaviy ishlarga va yoshlar odob-axloqiga qo'yiladigan talablarga e'tibor qaratilgan (1.2-§). | 140 qissadan ibarat kitap; tárbiyalıq jumıslarǵa hám jaslar ádep-ahlaqına qoyılatuǵın talaplarǵa itibar qaratılǵan (1.2-§).",
    ),
    period: 'golden-horde', ref: { type: 'SOURCE', key: 'book-ummi' }, sourceRef: '[100;9]; 1.2-§',
  },
  {
    kind: 'VOQEA', year: 1420, yearLabel: '1420',
    title: t("Ormambet bi vafoti | Ormambet bi qaytıs bolıwı"),
    description: t(
      "«Buyuk xon» nomi bilan xonlik qilgan Ormambet bi (1420) vafot etganda Asan qayg'uga botgan (2.1-§/1.2-§). | «Uluǵ xan» atı menen xanlıq qılǵan Ormambet bi (1420) qaytıs bolǵanda Asan qayǵıǵa batqan (1.2-§).",
    ),
    period: 'nogai', sourceRef: '[58;19]; 1.2-§',
  },
  {
    kind: 'DAVR', year: 1440, yearLabel: 'XV asr 40-yillari',
    title: t("No'g'oyli xonligining tashkil topishi | Noǵaylı xanlıǵınıń quralıwı"),
    description: t(
      "No'g'oyli xonligi XV asrning 40-yillarida tashkil topib, XVI asrning birinchi yarmida hukmronlik qilgan; poytaxti Saroyshiq (1.2-§). | Noǵaylı xanlıǵı XV ásirdiń 40-jıllarında quralıp, XVI ásirdiń birinshi yarımında húkimranlıq qılǵan; paytaxtı Sarayshıq (1.2-§).",
    ),
    period: 'nogai', ref: { type: 'PERIOD', key: 'nogai' }, sourceRef: '1.2-§',
  },
  {
    kind: 'VOQEA', year: 1456, yearLabel: '1456–1478',
    title: t("Janibek xon davri | Janibek xan dáwiri"),
    description: t(
      "Tarixchi Abulg'ozi Janibekxonni (1456–1478) islom dini va axloqiga sadoqati uchun yuqori baholagan; Asan qayg'i va Jiyrenshe sheshen shu xon saroyida maslahatchi sifatida tilga olinadi. | Tariyxshı Abılǵazı Janibekxandı (1456–1478) islam dini hám ahlaqına sadıqlıǵı ushın joqarı bahalaǵan; Asan qayǵı hám Jiyrenshe sheshen usı xan sarayında másláhátshi retinde atap ótiledi.",
    ),
    period: 'nogai', sourceRef: '1.2-§, 2.1-§',
  },
  {
    kind: 'MUTAFAKKIR', year: null, yearLabel: 'XV asr',
    title: t("Jiyrenshe sheshen | Jiyrenshe sheshen"),
    description: t(
      "Dissertatsiyada XV asrda Janibek xonning vaziri-maslahatchisi sifatida tilga olinadi; tarixiyligi haqida olimlar turlicha fikrda (1.1-§). | Dissertaciyada XV ásirde Janibek xannıń wázir-másláhátshisi retinde atap ótiledi; tariyxıylıǵı haqqında ilimpazlar túrlishe pikirde (1.1-§).",
    ),
    period: 'nogai', ref: { type: 'THINKER', key: 'jiyrenshe' }, sourceRef: '[6;253]; 1.1-§',
  },
  {
    kind: 'MUTAFAKKIR', year: null, yearLabel: 'XV asr oxiri – XVI asr boshi',
    title: t("Dospambet jirov | Dospambet jıraw"),
    description: t(
      "Dissertatsiyada tarixiy manbalarga ko'ra XV asr oxiri – XVI asr boshlarida yashagan deyiladi (1.1-§). | Dissertaciyada tariyxıy derekler boyınsha XV ásir aqırı – XVI ásir basında jasaǵan delinedi (1.1-§).",
    ),
    period: 'nogai', ref: { type: 'THINKER', key: 'dospambet' }, sourceRef: '1.1-§',
  },
  {
    kind: 'VOQEA', year: 1490, yearLabel: 'taxminan 1490',
    title: t("Asan qayg'i vafoti (taxminan) | Asan qayǵı qaytıs bolıwı (shama menen)"),
    description: t(
      "Dissertatsiyada Asan taxminan 1490-yillarda vafot etgan deyiladi; vafot joyi haqida ma'lumotlar turlicha. | Dissertaciyada Asan shama menen 1490-jıllarda qaytıs bolǵan delinedi; qaytıs bolǵan jeri haqqında maǵlıwmatlar túrlishe.",
    ),
    period: 'nogai', sourceRef: '[6;241]; 1.1-§',
  },
  {
    kind: 'ASAR', year: 1833, yearLabel: '1833',
    title: t("M. Ospanov «No'g'ay va qumiq shoirlari» kitobi | M. Ospanov «Noǵay hám qumıq shayırları» kitabı"),
    description: t(
      "Sankt-Peterburgda chiqqan bu kitob Dospambet jirov haqida qimmatli ma'lumot beradi (1.1-§). | Sankt-Peterburgta shıqqan bul kitap Dospambet jıraw haqqında qádirli maǵlıwmat beredi (1.1-§).",
    ),
    period: 'nogai', sourceRef: '[40;138]; 1.1-§',
  },
  {
    kind: 'VOQEA', year: 1879, yearLabel: '1879',
    title: t("Jiyrenshe sheshen so'zlarining dastlabki nashri | Jiyrenshe sheshen sózleriniń dáslepki baspası"),
    description: t(
      "1879-yilda Ibroy Altinsarin o'z darsligiga Jiyrenshe sheshen so'zlarini kiritgan (1.1-§). | 1879-jılı Ibıray Altınsarin óz sabaqlıǵına Jiyrenshe sheshen sózlerin kirgizgen (1.1-§).",
    ),
    period: 'nogai', sourceRef: '[44;139]; 1.1-§',
  },
  {
    kind: 'VOQEA', year: 1946, yearLabel: '1946',
    title: t("N. Davqaraev nomzodlik dissertatsiyasi | N. Dawqaraev kandidatlıq dissertaciyası"),
    description: t(
      "N. Davqaraev 1946-yilda Sipira jirov, Asan qayg'i, Jiyrenshe sheshenni XIV–XV asr qoraqalpoq adabiyotining ko'zga ko'ringan vakillari deb yozgan (1.1-§). | N. Dawqaraev 1946-jılı Sipira jıraw, Asan qayǵı, Jiyrenshe sheshendi XIV–XV ásir qaraqalpaq ádebiyatınıń kózge kóringen wákilleri dep jazǵan (1.1-§).",
    ),
    period: 'nogai', sourceRef: '[40;7]; 1.1-§',
  },
  {
    kind: 'GOYA', year: null, yearLabel: 'XV asr',
    title: t("G'oya: adolat va xalqqa g'amxo'rlik (Asan qayg'i) | Ideya: ádalat hám xalıqqa ǵamxorlıq (Asan qayǵı)"),
    description: t(
      "«Xon bilan biylar qisganda, xalq qanday kun ko'rar» — adolat va rahbarning xalqqa mas'uliyati (1.3-§). | «Xan menen biyler qısqanda, xalıq qanday kún kóredi» — ádalat hám basshınıń xalıqqa juwapkershiligi (1.3-§).",
    ),
    period: 'nogai', ref: { type: 'VALUE', key: 'adolat' }, sourceRef: '[29;105]; 1.3-§',
  },
  {
    kind: 'GOYA', year: null, yearLabel: 'XIV asr',
    title: t("G'oya: kattalarga hurmat (Sipira jirov) | Ideya: úlkenlerge húrmet (Sipira jıraw)"),
    description: t(
      "«Ulug'dan oldin kichikning gapirishi yo'q» — yoshlar kattalar oldida odob saqlashi (1.1-§). | «Ulıǵdan aldın kishiniń sóylewi joq» — jaslar úlkenler aldında ádep saqlawı (1.1-§).",
    ),
    period: 'golden-horde', ref: { type: 'VALUE', key: 'katta' }, sourceRef: '1.1-§',
  },
  {
    kind: 'GOYA', year: null, yearLabel: 'XVI asr boshi',
    title: t("G'oya: vatanga sadoqat va jasorat (Dospambet jirov) | Ideya: watanǵa sadıqlıq hám jasorat (Dospambet jıraw)"),
    description: t(
      "«Vatanimdan ayrilmaslik» to'lg'ovi va jirovning jangda oldingi safda yurishi (1.1-§, 1.3-§). | «Watanımnan ayırılmaslıq» tolǵawı hám jırawdıń urısta aldıńǵı sapta júriwi (1.1-§, 1.3-§).",
    ),
    period: 'nogai', ref: { type: 'VALUE', key: 'vatan' }, sourceRef: '[26;59]; 1.1-§',
  },
];
