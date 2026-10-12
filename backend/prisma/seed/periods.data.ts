import { t } from './helpers';
import type { LText } from '../../src/lib/types';

export interface PeriodSeed {
  key: string;
  name: LText;
  startYear: number | null;
  endYear: number | null;
  shortDescription: LText;
  content: LText;
  order: number;
}

export const periods: PeriodSeed[] = [
  {
    key: 'golden-horde',
    name: t("Oltin O'rda davri | Altın Orda dáwiri"),
    startYear: null,
    endYear: null,
    shortDescription: t(
      "XIII asr o'rtalaridan shakllangan davlat; Xorazm, Dashti Qipchoq va Yoyiq-Idil bo'ylarida turkiy xalqlar madaniyati va ta'lim-tarbiya an'analari rivojlangan. | XIII ásir ortalarınan qáliplesken mámleket; Xorezm, Dashti Qıpshaq hám Yayıq-Edil boylarında túrkiy xalıqlar mádeniyatı hám tálim-tárbiya dástúrleri rawajlandı.",
    ),
    content: t(
      "Dissertatsiyada (1.2-§) qoraqalpoq xalqining shakllanish asosi sifatida Turon pasttekisliklari, Orol atrofi, Idil va Yoyiq bo'ylarida ko'chib yurgan pecheneg qabilalari ko'rsatiladi; ular Oltin O'rda davrida o'zlarini «qora qipchoqlar» deb atagan. Jo'shi vafotidan (1227) so'ng Botuxon bo'ysundirgan yerlar birlashtirilib, Oltin O'rda tashkil topgan; Xorazm to'liq shu davlatga qarashli bo'lgan. Poytaxt Saroy Botu (Astraxan atrofi), keyinchalik Saroy Berke. Berkexon islomni qabul qilgan, ma'rifat va ilm ahlining ko'payishiga e'tibor qaratgan. Madaniy markazlar: Urganch, O'tror, Buxoro, Qashqar, Bolasog'un, O'zgan, Talas. Yosh avlod tarbiyasiga oid kitoblar yozilgan: Gali Mahmudning «Nahj al-faradis» (1358), Mejlesiyning «Sayf al-muluk» (XV asr), «Ummi Kamol» (1412). Hunarmandchilik (kulolchilik, zargarlik), astronomik bilimlar va ota-onalarning bolalar bilimga qiziqishini rivojlantirishi ta'lim-tarbiyaning muhim jihatlari bo'lgan. | Dissertaciyada (1.2-§) qaraqalpaq xalqınıń qáliplesiw tiykarı retinde Turan tómen tegisliklerinde, Aral átirapında, Edil hám Yayıq boylarında kóship-qonıp júrgen pecheneg tayparları kórsetiledi; olar Altın Orda dáwirinde ózlerin «qara qıpshaqlar» dep atagan. Joshı qaytıs bolǵannan (1227) keyin Batıxan boysındırǵan jerler birlestirilip, Altın Orda mámleketi payda bolǵan; Xorezm tolıq usı mámleketke qaraslı bolǵan. Paytaxt Saray Bátu (Astraxan átirapı), keyin Saray Berke. Berkexan islamdı qabıllaǵan, aǵartıwshılıqqa hám ilim ahlin kóbeytiwge itibar qaratqan. Mádeniy orayları: Úrgenish, Otırar, Buxara, Qashqar, Balasaǵun, Ózgen, Talas. Jas áwladtı tárbiyalawǵa arnalǵan kitaplar jazılǵan: Gali Mahmudtıń «Nahj al-faradis» (1358), Mejlesiydiń «Sayf al-muluk» (XV ásir), «Ummi Kamol» (1412). Hunarmentshilik (kulalshılıq, zergerlik), jaslarǵa astronomiyalıq bilim beriw hám ata-analardıń balalardıń bilimge qızıǵıwın rawajlandırıwǵa itibar qaratıwı tálim-tárbiyanıń áhmiyetli táreplerinen bolǵan.",
    ),
    order: 1,
  },
  {
    key: 'nogai',
    name: t("No'g'oyli davri | Noǵaylı dáwiri"),
    startYear: 1440,
    endYear: 1550,
    shortDescription: t(
      "XV asrning 40-yillarida tashkil topgan, XVI asr o'rtalarida quladi (yillar taxminiy); qoraqalpoqlar No'g'ay ittifoqi tarkibida jirov-shoirlar an'anasini rivojlantirgan. | XV ásirdiń 40-jıllarında quraldı, XVI ásir ortalarında qulaǵan (jıllar shama menen); qaraqalpaqlar Noǵay ittifaqı quramında jıraw-shayırlar dástúrin rawajlandırǵan.",
    ),
    content: t(
      "Dissertatsiyada (1.2-§) No'g'oyli xonligi XV asrning 40-yillarida tashkil topib, XVI asrning birinchi yarmida hukmronlik qilgani, poytaxti Saroyshiq bo'lgani, XVI asr o'rtalarida No'g'ay O'rdasi qulagani yoziladi. Qoraqalpoqlarning mang'it urug'idan chiqqan No'g'ay mirzo bilan bog'liq «No'g'oyli» atamasi qoraqalpoq dostonlarida («Qirq qiz», «Sharyar») ko'p uchraydi. Xalq ko'chmanchi va yarim ko'chmanchi bo'lgan; ko'chish mehnat bilan teng sanalgan, butun aholi mehnatga tortilgan, bu birlik va hamdamlikni ta'minlagan. Yoshlarga chorvachilik, ov, to'quvchilik, teri ishlash kabi hunarlar o'rgatilgan; vatanni himoya qilish beminnat ish hisoblangan va yoshlarga jang hunarini o'rgatish birinchi o'rinda turgan. Mehmondo'stlik, qarindoshlik tuyg'usi va o'zaro yordam mustahkam bo'lgan. Bu davrda jirov-shoirlar (Asan qayg'i, Jiyrenshe sheshen, Dospambet jirov) xon va xalqqa maslahatchi, murabbiy sifatida ham xizmat qilgan. | Dissertaciyada (1.2-§) Noǵaylı xanlıǵı XV ásirdiń 40-jıllarında quralıp, XVI ásirdiń birinshi yarımında húkimranlıq etkeni, paytaxtı Sarayshıq bolǵanı, XVI ásir ortalarında Noǵay Ordası qulaǵanı jazıladı. Qaraqalpaqlardıń mańǵıt urıwınan shıqqan Noǵay mirza menen baylanıslı «Noǵaylı» atamasi qaraqalpaq dástanlarında («Qırq qız», «Sháriyar») kóp ushırasadı. Xalıq kóshpeli hám yarım kóshpeli bolǵan; kóshiw miynet penen teń sanalǵan, pútkil xalıq miynetke tartılǵan, bul birlik hám hámdemlikti támiynlegen. Jaslarǵa shorvashılıq, awshılıq, toqımashılıq, teri ıshlew sıyaqlı hunerler úyretilgen; watandı qorǵaw minnetsiz is esaplanǵan hám jaslarǵa urıs hunerin úyretiw birinshi orında turǵan. Miymandóstlik, tuwısqanlıq sezimi hám ózara járdem bekkem bolǵan. Bul dáwirde jıraw-shayırlar (Asan qayǵı, Jiyrenshe sheshen, Dospambet jıraw) xan hám xalıqqa másláhátshi, tárbiyashı retinde de xızmet etken.",
    ),
    order: 2,
  },
];
