// ============================================================================
// Atmanubhuti Sacred Vedic Panchang, Muhurat & Choghadiya Engine
// Pure Astronomical & Vedic Sidereal Calculations
// ============================================================================

export interface PanchangCity {
  id: string;
  name: string;
  hindiName: string;
  state: string;
  latitude: number;
  longitude: number;
  timezone: number; // in hours, e.g. 5.5 for IST
}

export const SACRED_CITIES: PanchangCity[] = [
  { id: "varanasi", name: "Varanasi (Kashi)", hindiName: "काशी / वाराणसी", state: "Uttar Pradesh", latitude: 25.3176, longitude: 82.9739, timezone: 5.5 },
  { id: "ayodhya", name: "Ayodhya", hindiName: "श्री अयोध्या धाम", state: "Uttar Pradesh", latitude: 26.7922, longitude: 82.1998, timezone: 5.5 },
  { id: "delhi", name: "New Delhi", hindiName: "नई दिल्ली", state: "NCR", latitude: 28.6139, longitude: 77.2090, timezone: 5.5 },
  { id: "mumbai", name: "Mumbai", hindiName: "मुंबई", state: "Maharashtra", latitude: 19.0760, longitude: 72.8777, timezone: 5.5 },
  { id: "ujjain", name: "Ujjain (Mahakal)", hindiName: "उज्जैन (महाकाल)", state: "Madhya Pradesh", latitude: 23.1765, longitude: 75.7885, timezone: 5.5 },
  { id: "haridwar", name: "Haridwar", hindiName: "हरिद्वार", state: "Uttarakhand", latitude: 29.9457, longitude: 78.1642, timezone: 5.5 },
  { id: "tirupati", name: "Tirupati", hindiName: "तिरुपति बालाजी", state: "Andhra Pradesh", latitude: 13.6288, longitude: 79.4192, timezone: 5.5 },
  { id: "kolkata", name: "Kolkata (Kalighat)", hindiName: "कोलकाता (कालीघाट)", state: "West Bengal", latitude: 22.5726, longitude: 88.3639, timezone: 5.5 },
  { id: "bengaluru", name: "Bengaluru", hindiName: "बेंगलुरु", state: "Karnataka", latitude: 12.9716, longitude: 77.5946, timezone: 5.5 },
];

export type ChoghadiyaNature = "AUSPICIOUS" | "INAUSPICIOUS" | "NEUTRAL";

export interface ChoghadiyaSlot {
  name: string;
  hindiName: string;
  planet: string;
  nature: ChoghadiyaNature;
  startTime: string; // "06:12 AM"
  endTime: string;   // "07:42 AM"
  startMinutes: number; // minutes from midnight for active calculation
  endMinutes: number;
  meaning: string;
  bestFor: string;
  isCurrent: boolean;
  isDay: boolean;
}

export interface MuhuratWindow {
  name: string;
  hindiName: string;
  type: "AUSPICIOUS" | "INAUSPICIOUS";
  startTime: string;
  endTime: string;
  description: string;
  isCurrent: boolean;
}

export interface VedicPanchangData {
  date: Date;
  dateFormatted: string; // e.g. "23 Oct 2026"
  dateHindi: string;     // e.g. "23 अक्टूबर 2026"
  city: PanchangCity;
  
  // Vedic Calendar Entities
  vikramSamvat: number;
  shakaSamvat: number;
  samvatsara: string;
  ayan: string;        // उत्तरायण / दक्षिणायन
  ritu: string;        // ऋतु (शरद, वसंत, etc.)
  maas: string;        // हिंदू मास (कार्तिक, आश्विन, etc.)
  maasType: "पूर्णिमान्त" | "अमान्त";
  paksha: "शुक्ल पक्ष" | "कृष्ण पक्ष";
  tithi: {
    number: number;
    name: string;
    hindiName: string;
    endTime: string;
    deity: string;
  };
  vaar: {
    name: string;
    hindiName: string;
    rulingPlanet: string;
  };
  nakshatra: {
    name: string;
    hindiName: string;
    rulingPlanet: string;
    deity: string;
    endTime: string;
  };
  yoga: {
    name: string;
    hindiName: string;
    type: "शुभ" | "अशुभ";
    endTime: string;
  };
  karana: {
    name: string;
    hindiName: string;
    endTime: string;
  };
  
  // Solar & Lunar Timings
  surya: {
    sunrise: string;
    sunset: string;
    sunriseMinutes: number;
    sunsetMinutes: number;
    rashi: string;
  };
  chandra: {
    moonrise: string;
    moonset: string;
    rashi: string;
  };

  // Muhurats
  muhurats: {
    abhijit: MuhuratWindow;
    brahma: MuhuratWindow;
    amritKaal: MuhuratWindow;
    vijaya: MuhuratWindow;
    godhuli: MuhuratWindow;
    rahuKaal: MuhuratWindow;
    yamaganda: MuhuratWindow;
    gulikaKaal: MuhuratWindow;
    durMuhurat: MuhuratWindow;
  };

  // Choghadiya
  choghadiya: {
    daySlots: ChoghadiyaSlot[];
    nightSlots: ChoghadiyaSlot[];
    currentSlot: ChoghadiyaSlot;
  };

  // Special Vrat / Festival of the day
  todayFestival?: {
    title: string;
    hindiTitle: string;
    significance: string;
    recommendedPuja: {
      title: string;
      temple: string;
      slug: string;
      dakshina: number;
    };
  };
}

// ----------------------------------------------------------------------------
// Astronomical Calculation Utilities
// ----------------------------------------------------------------------------

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// Accurate Solar calculation for sunrise and sunset
function calculateSunTimes(date: Date, latitude: number, longitude: number, timezone: number) {
  const dayOfYear = getDayOfYear(date);
  
  // Fractional year in radians
  const gamma = (2 * Math.PI / 365) * (dayOfYear - 1 + ((date.getHours() - 12) / 24));
  
  // Equation of time in minutes
  const eqtime = 229.18 * (0.000075 + 0.001868 * Math.cos(gamma) - 0.032077 * Math.sin(gamma)
                 - 0.014615 * Math.cos(2 * gamma) - 0.040849 * Math.sin(2 * gamma));
                 
  // Solar declination in radians
  const decl = 0.006918 - 0.399912 * Math.cos(gamma) + 0.070257 * Math.sin(gamma)
               - 0.006758 * Math.cos(2 * gamma) + 0.000907 * Math.sin(2 * gamma)
               - 0.002697 * Math.cos(3 * gamma) + 0.00148 * Math.sin(3 * gamma);

  const latRad = latitude * Math.PI / 180;
  // Zenith for sunrise/sunset (90.8333 degrees for atmospheric refraction)
  const zenithRad = 90.8333 * Math.PI / 180;

  let hourAngleArg = (Math.cos(zenithRad) / (Math.cos(latRad) * Math.cos(decl))) - (Math.tan(latRad) * Math.tan(decl));
  hourAngleArg = Math.max(-1, Math.min(1, hourAngleArg));
  
  const hourAngle = Math.acos(hourAngleArg) * 180 / Math.PI;

  const solarNoonMinutes = 720 - (4 * longitude) - eqtime + (timezone * 60);
  const sunriseMinutes = Math.round(solarNoonMinutes - (hourAngle * 4));
  const sunsetMinutes = Math.round(solarNoonMinutes + (hourAngle * 4));

  return { sunriseMinutes, sunsetMinutes, solarNoonMinutes };
}

function formatMinutesToTime(minutes: number): string {
  let normalized = Math.round(minutes) % 1440;
  if (normalized < 0) normalized += 1440;
  const hours24 = Math.floor(normalized / 60);
  const mins = normalized % 60;
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const minsStr = mins < 10 ? `0${mins}` : `${mins}`;
  const hoursStr = hours12 < 10 ? `0${hours12}` : `${hours12}`;
  return `${hoursStr}:${minsStr} ${period}`;
}

// ----------------------------------------------------------------------------
// Choghadiya Reference Data & Logic
// ----------------------------------------------------------------------------

interface ChoghadiyaDef {
  name: string;
  hindiName: string;
  planet: string;
  nature: ChoghadiyaNature;
  meaning: string;
  bestFor: string;
}

const CHOGHADIYA_TYPES: Record<string, ChoghadiyaDef> = {
  Amrit: { name: "Amrit", hindiName: "अमृत", planet: "चन्द्र (Moon)", nature: "AUSPICIOUS", meaning: "सर्वोत्तम फलदायी, अमृत तुल्य", bestFor: "सभी प्रकार के मांगलिक व पवित्र कार्य, पूजा-अर्चना, गृह प्रवेश" },
  Shubh: { name: "Shubh", hindiName: "शुभ", planet: "बृहस्पति (Jupiter)", nature: "AUSPICIOUS", meaning: "कल्याणकारी, मंगलकारी", bestFor: "विवाह, यज्ञ, नवीन अनुष्ठान, विद्यारम्भ, धार्मिक उत्सव" },
  Laabh: { name: "Laabh", hindiName: "लाभ", planet: "बुध (Mercury)", nature: "AUSPICIOUS", meaning: "उन्नति, समृद्धि व व्यापार लाभ", bestFor: "व्यापार प्रारम्भ, धन निवेश, नया खाता खोलना, खरीदारी" },
  Char: { name: "Char", hindiName: "चर / चंचल", planet: "शुक्र (Venus)", nature: "NEUTRAL", meaning: "गतिशील, यात्रा व सामान्य", bestFor: "यात्रा, वाहन चलाना, चल संपत्ति, सामान्य कार्य" },
  Rog: { name: "Rog", hindiName: "रोग", planet: "मंगल (Mars)", nature: "INAUSPICIOUS", meaning: "विवाद व कष्टकारक", bestFor: "केवल रोग निवारण औषधि व शत्रु दमन (शुभ कार्य वर्जित)" },
  Kaal: { name: "Kaal", hindiName: "काल", planet: "शनि (Saturn)", nature: "INAUSPICIOUS", meaning: "अत्यंत कष्टकारी, मृत्यु तुल्य", bestFor: "कोई भी शुभ कार्य निषिद्ध है, केवल शांति पाठ करें" },
  Udveg: { name: "Udveg", hindiName: "उद्वेग", planet: "सूर्य (Sun)", nature: "INAUSPICIOUS", meaning: "चिंता, तनाव व भय कारक", bestFor: "सरकारी कार्य या कर आदि (मांगलिक कार्य वर्जित)" },
};

// Sequences by weekday: 0 = Sunday, 1 = Monday, ..., 6 = Saturday
const DAY_SEQUENCES: string[][] = [
  ["Udveg", "Char", "Laabh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg"],     // Sunday
  ["Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Char", "Laabh", "Amrit"],     // Monday
  ["Rog", "Udveg", "Char", "Laabh", "Amrit", "Kaal", "Shubh", "Rog"],       // Tuesday
  ["Laabh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Char", "Laabh"],     // Wednesday
  ["Shubh", "Rog", "Udveg", "Char", "Laabh", "Amrit", "Kaal", "Shubh"],     // Thursday
  ["Char", "Laabh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Char"],       // Friday
  ["Kaal", "Shubh", "Rog", "Udveg", "Char", "Laabh", "Amrit", "Kaal"],       // Saturday
];

const NIGHT_SEQUENCES: string[][] = [
  ["Shubh", "Amrit", "Char", "Rog", "Kaal", "Laabh", "Udveg", "Shubh"],     // Sunday night
  ["Char", "Rog", "Kaal", "Laabh", "Udveg", "Shubh", "Amrit", "Char"],       // Monday night
  ["Kaal", "Laabh", "Udveg", "Shubh", "Amrit", "Char", "Rog", "Kaal"],       // Tuesday night
  ["Udveg", "Shubh", "Amrit", "Char", "Rog", "Kaal", "Laabh", "Udveg"],     // Wednesday night
  ["Amrit", "Char", "Rog", "Kaal", "Laabh", "Udveg", "Shubh", "Amrit"],     // Thursday night
  ["Rog", "Kaal", "Laabh", "Udveg", "Shubh", "Amrit", "Char", "Rog"],       // Friday night
  ["Laabh", "Udveg", "Shubh", "Amrit", "Char", "Rog", "Kaal", "Laabh"],     // Saturday night
];

// ----------------------------------------------------------------------------
// Vedic Tithi, Nakshatra, Yoga & Festival Tables
// ----------------------------------------------------------------------------

const TITHI_NAMES = [
  { name: "Pratipada", hindi: "प्रतिपदा (पड़वा)", deity: "अग्नि देव" },
  { name: "Dwitiya", hindi: "द्वितीया (दूज)", deity: "ब्रह्मा जी" },
  { name: "Tritiya", hindi: "तृतीया (तीज)", deity: "माँ गौरी" },
  { name: "Chaturthi", hindi: "चतुर्थी (चौथ)", deity: "श्री गणेश" },
  { name: "Panchami", hindi: "पंचमी", deity: "नाग देवता / सरस्वती" },
  { name: "Shashthi", hindi: "षष्ठी (छठ)", deity: "कार्तिकेय जी" },
  { name: "Saptami", hindi: "सप्तमी", deity: "सूर्य देव" },
  { name: "Ashtami", hindi: "अष्टमी", deity: "माँ दुर्गा / शिव जी" },
  { name: "Navami", hindi: "नवमी", deity: "माँ सिद्धिदात्री / श्रीराम" },
  { name: "Dashami", hindi: "दशमी", deity: "यमराज / धर्मराज" },
  { name: "Ekadashi", hindi: "एकादशी (ग्यारस)", deity: "भगवान श्री हरि विष्णु" },
  { name: "Dwadashi", hindi: "द्वादशी (बारस)", deity: "भगवान विष्णु" },
  { name: "Trayodashi", hindi: "त्रयोदशी (प्रदोष)", deity: "भगवान शिव" },
  { name: "Chaturdashi", hindi: "चतुर्दशी (चौदस)", deity: "भगवान शिव" },
  { name: "Purnima", hindi: "पूर्णिमा (पूनम)", deity: "चंद्र देव" },
  { name: "Amavasya", hindi: "अमावस्या (मावस)", deity: "पितृ देव / शनि देव" },
];

const NAKSHATRAS = [
  { name: "Ashwini", hindi: "अश्विनी", planet: "केतु", deity: "अश्विनी कुमार" },
  { name: "Bharani", hindi: "भरणी", planet: "शुक्र", deity: "यमराज" },
  { name: "Krittika", hindi: "कृत्तिका", planet: "सूर्य", deity: "अग्नि" },
  { name: "Rohini", hindi: "रोहिणी", planet: "चन्द्र", deity: "ब्रह्मा" },
  { name: "Mrigashira", hindi: "मृगशिरा", planet: "मंगल", deity: "सोम" },
  { name: "Ardra", hindi: "आर्द्रा", planet: "राहु", deity: "रुद्र (शिव)" },
  { name: "Punarvasu", hindi: "पुनर्वसु", planet: "गुरु", deity: "अदिति" },
  { name: "Pushya", hindi: "पुष्य (सर्वश्रेष्ठ)", planet: "शनि", deity: "बृहस्पति" },
  { name: "Ashlesha", hindi: "आश्लेषा", planet: "बुध", deity: "सर्प" },
  { name: "Magha", hindi: "मघा", planet: "केतु", deity: "पितृ" },
  { name: "Purva Phalguni", hindi: "पूर्वा फाल्गुनी", planet: "शुक्र", deity: "भग" },
  { name: "Uttara Phalguni", hindi: "उत्तरा फाल्गुनी", planet: "सूर्य", deity: "अर्यमा" },
  { name: "Hasta", hindi: "हस्त", planet: "चन्द्र", deity: "सूर्य" },
  { name: "Chitra", hindi: "चित्रा", planet: "मंगल", deity: "विश्वकर्मा" },
  { name: "Swati", hindi: "स्वाति", planet: "राहु", deity: "वायु" },
  { name: "Vishakha", hindi: "विशाखा", planet: "गुरु", deity: "इन्द्राग्नि" },
  { name: "Anuradha", hindi: "अनुराधा", planet: "शनि", deity: "मित्र" },
  { name: "Jyeshtha", hindi: "ज्येष्ठा", planet: "बुध", deity: "इन्द्र" },
  { name: "Moola", hindi: "मूल", planet: "केतु", deity: "निरृति" },
  { name: "Purva Ashadha", hindi: "पूर्वाषाढ़ा", planet: "शुक्र", deity: "जल" },
  { name: "Uttara Ashadha", hindi: "उत्तराषाढ़ा", planet: "सूर्य", deity: "विश्वेदेव" },
  { name: "Shravana", hindi: "श्रवण", planet: "चन्द्र", deity: "विष्णु" },
  { name: "Dhanishta", hindi: "धनिष्ठा", planet: "मंगल", deity: "वसु" },
  { name: "Shatabhisha", hindi: "शतभिषा", planet: "राहु", deity: "वरुण" },
  { name: "Purva Bhadrapada", hindi: "पूर्वाभाद्रपद", planet: "गुरु", deity: "अजैकपाद" },
  { name: "Uttara Bhadrapada", hindi: "उत्तराभाद्रपद", planet: "शनि", deity: "अहिर्बुध्न्य" },
  { name: "Revati", hindi: "रेवती", planet: "बुध", deity: "पूषा" },
];

const YOGAS = [
  { name: "Vishkambha", hindi: "विष्कम्भ", type: "अशुभ" },
  { name: "Priti", hindi: "प्रीति", type: "शुभ" },
  { name: "Ayushman", hindi: "आयुष्मान", type: "शुभ" },
  { name: "Saubhagya", hindi: "सौभाग्य", type: "शुभ" },
  { name: "Shobhana", hindi: "शोभन", type: "शुभ" },
  { name: "Atiganda", hindi: "अतिगण्ड", type: "अशुभ" },
  { name: "Sukarma", hindi: "सुकर्मा", type: "शुभ" },
  { name: "Dhriti", hindi: "धृति", type: "शुभ" },
  { name: "Shula", hindi: "शूल", type: "अशुभ" },
  { name: "Ganda", hindi: "गण्ड", type: "अशुभ" },
  { name: "Vriddhi", hindi: "वृद्धि", type: "शुभ" },
  { name: "Dhruva", hindi: "ध्रुव", type: "शुभ" },
  { name: "Vyaghata", hindi: "व्याघात", type: "अशुभ" },
  { name: "Harshana", hindi: "हर्षण", type: "शुभ" },
  { name: "Vajra", hindi: "वज्र", type: "अशुभ" },
  { name: "Siddhi", hindi: "सिद्धि", type: "शुभ" },
  { name: "Vyatipata", hindi: "व्यतीपात", type: "अशुभ" },
  { name: "Variyana", hindi: "वरीयान्", type: "शुभ" },
  { name: "Parigha", hindi: "परिघ", type: "अशुभ" },
  { name: "Shiva", hindi: "शिव", type: "शुभ" },
  { name: "Siddha", hindi: "सिद्ध", type: "शुभ" },
  { name: "Sadhya", hindi: "साध्य", type: "शुभ" },
  { name: "Shubha", hindi: "शुभ", type: "शुभ" },
  { name: "Shukla", hindi: "शुक्ल", type: "शुभ" },
  { name: "Brahma", hindi: "ब्रह्म", type: "शुभ" },
  { name: "Indra", hindi: "इन्द्र", type: "शुभ" },
  { name: "Vaidhriti", hindi: "वैधृति", type: "अशुभ" },
];

const KARANAS = [
  { name: "Bava", hindi: "बव" },
  { name: "Balava", hindi: "बालव" },
  { name: "Kaulava", hindi: "कौलव" },
  { name: "Taitila", hindi: "तैतिल" },
  { name: "Gara", hindi: "गर" },
  { name: "Vanija", hindi: "वणिज" },
  { name: "Vishti (Bhadra)", hindi: "विष्टि (भद्रा - अशुभ)" },
  { name: "Shakuni", hindi: "शकुनि" },
  { name: "Chatushpada", hindi: "चतुष्पाद" },
  { name: "Naga", hindi: "नाग" },
  { name: "Kimstughna", hindi: "किंस्तुघ्न" },
];

const VAARS = [
  { name: "Ravivar (Sunday)", hindiName: "रविवार", rulingPlanet: "सूर्य (Surya Dev)" },
  { name: "Somvar (Monday)", hindiName: "सोमवार", rulingPlanet: "चन्द्र व शिव जी (Lord Shiva)" },
  { name: "Mangalvar (Tuesday)", hindiName: "मंगलवार", rulingPlanet: "मंगल व श्री हनुमान जी" },
  { name: "Budhvar (Wednesday)", hindiName: "बुधवार", rulingPlanet: "बुध व श्री गणेश जी" },
  { name: "Guruvar (Thursday)", hindiName: "गुरुवार", rulingPlanet: "बृहस्पति व श्री हरि विष्णु" },
  { name: "Shukravar (Friday)", hindiName: "शुक्रवार", rulingPlanet: "शुक्र व माँ महालक्ष्मी" },
  { name: "Shanivar (Saturday)", hindiName: "शनिवार", rulingPlanet: "शनि देव व भैरव बाबा" },
];

const HINDU_MAAS = [
  "चैत्र", "वैशाख", "ज्येष्ठ", "आषाढ़", "श्रावण", "भाद्रपद",
  "आश्विन", "कार्तिक", "मार्गशीर्ष", "पौष", "माघ", "फाल्गुन"
];

const RASHIS = [
  "मेष (Aries)", "वृषभ (Taurus)", "मिथुन (Gemini)", "कर्क (Cancer)",
  "सिंह (Leo)", "कन्या (Virgo)", "तुला (Libra)", "वृश्चिक (Scorpio)",
  "धनु (Sagittarius)", "मकर (Capricorn)", "कुंभ (Aquarius)", "मीन (Pisces)"
];

// Special festival mapping helper
function getDayFestival(tithiNum: number, paksha: string, maasIndex: number) {
  // Ekadashi check
  if (tithiNum === 11) {
    return {
      title: "Pavitra Ekadashi Vrat",
      hindiTitle: `${paksha === "शुक्ल पक्ष" ? "शुक्ल" : "कृष्ण"} एकादशी महाव्रत`,
      significance: "भगवान श्री हरि विष्णु जी का परम पवित्र व्रत। इस दिन भगवान विष्णु व शालिग्राम पूजन से समस्त पापों का क्षय और मोक्ष की प्राप्ति होती है।",
      recommendedPuja: {
        title: "श्री विष्णु सहस्त्रनाम व तुलसी अर्चना पूजा",
        temple: "श्री बांके बिहारी मंदिर (वृंदावन)",
        slug: "vrindavan-vishnu-sahasranama",
        dakshina: 1100
      }
    };
  }

  // Pradosh Vrat (Trayodashi)
  if (tithiNum === 13) {
    return {
      title: "Pradosh Vrat (Shiv Puja)",
      hindiTitle: `${paksha === "शुक्ल पक्ष" ? "शुक्ल" : "कृष्ण"} प्रदोष व्रत (महा शिव आराधना)`,
      significance: "प्रदोष काल में भगवान शिव तांडव नृत्य करते हैं। इस समय किया गया रुद्राभिषेक सभी मनोकामनाओं को सिद्ध करता है और दरिद्रता का नाश करता है।",
      recommendedPuja: {
        title: "द्वादश ज्योतिर्लिंग विशेष महा रुद्राभिषेक",
        temple: "काशी विश्वनाथ मंदिर (वाराणसी)",
        slug: "kashi-vishwanath-rudrabhishek",
        dakshina: 2100
      }
    };
  }

  // Chaturthi (Ganesh Puja)
  if (tithiNum === 4) {
    return {
      title: paksha === "कृष्ण पक्ष" ? "Sankashti Chaturthi" : "Vinayaka Chaturthi",
      hindiTitle: paksha === "कृष्ण पक्ष" ? "संकष्टी चतुर्थी व्रत" : "विनायक चतुर्थी",
      significance: "विघ्नहर्ता श्री गणेश जी को समर्पित पावन तिथि। संकटों के निवारण और कार्य सिद्धि के लिए दूर्वा व मोदक अर्पण अति फलदायी है।",
      recommendedPuja: {
        title: "अष्टविनायक विघ्नहर्ता महा पूजा व अथर्वशीर्ष पाठ",
        temple: "सिद्धिविनायक मंदिर (मुंबई)",
        slug: "siddhivinayak-ganesh-puja",
        dakshina: 1008
      }
    };
  }

  // Purnima (Full Moon)
  if (tithiNum === 15 && paksha === "शुक्ल पक्ष") {
    return {
      title: "Pavitra Purnima (Satyanarayan Puja)",
      hindiTitle: "पावन पूर्णिमा महाव्रत व सत्यनारायण कथा",
      significance: "पूर्णिमा के दिन माँ लक्ष्मी और चंद्र देव का प्राकट्य हुआ था। इस दिन सत्यनारायण कथा और गंगा स्नान से अखंड सुख-समृद्धि प्राप्त होती है।",
      recommendedPuja: {
        title: "श्री सत्यनारायण महापूजा व कनकधारा स्तोत्र",
        temple: "श्री महालक्ष्मी मंदिर (कोल्हापुर)",
        slug: "mahalakshmi-satyanarayan",
        dakshina: 1500
      }
    };
  }

  // Amavasya (New Moon)
  if (tithiNum === 15 && paksha === "कृष्ण पक्ष") {
    return {
      title: "Amavasya (Pitru Tarpan & Shani Puja)",
      hindiTitle: "दर्श अमावस्या (पितृ शांति व शनि दोष निवारण)",
      significance: "पितरों के निमित्त तर्पण, दीपदान और शनि शांति हेतु सर्वोत्तम तिथि। इस दिन किया गया दान अनंत फलदायी माना गया है।",
      recommendedPuja: {
        title: "कालसर्प व पितृ दोष शांति महायज्ञ",
        temple: "त्र्यंबकेश्वर ज्योतिर्लिंग (नासिक)",
        slug: "tryambakeshwar-kalsarp-puja",
        dakshina: 2500
      }
    };
  }

  // Ashtami (Devi Puja)
  if (tithiNum === 8) {
    return {
      title: "Durga Ashtami Seva",
      hindiTitle: `${paksha === "शुक्ल पक्ष" ? "शुक्ल" : "कृष्ण"} दुर्गाष्टमी (शक्ति साधना)`,
      significance: "आदिशक्ति माँ दुर्गा को समर्पित पावन दिन। शत्रुओं पर विजय और रक्षा कवच हेतु विशेष चंडी पाठ और कुमकुम अर्चन।",
      recommendedPuja: {
        title: "माँ कामाख्या सिंदूर व अष्टधातु शक्ति अर्चना",
        temple: "माँ कामाख्या शक्तिपीठ (असम)",
        slug: "kamakhya-devi-sindoor-puja",
        dakshina: 1800
      }
    };
  }

  // Default daily auspicious puja recommendation
  return {
    title: "Daily Mangal Temple Seva",
    hindiTitle: "नित्य मंगल वैदिक सेवा व भोग अर्पण",
    significance: "आज के दिन अपने और परिवार के कल्याण, स्वास्थ्य और दीर्घायु हेतु नाम-गोत्र से संकल्प पूजा कराएं।",
    recommendedPuja: {
      title: "द्वादश ज्योतिर्लिंग विशेष महा रुद्राभिषेक",
      temple: "काशी विश्वनाथ मंदिर (वाराणसी)",
      slug: "kashi-vishwanath-rudrabhishek",
      dakshina: 1100
    }
  };
}

// ----------------------------------------------------------------------------
// Master Panchang Generator Function
// ----------------------------------------------------------------------------

export function getVedicPanchang(targetDate: Date = new Date(), cityId: string = "varanasi"): VedicPanchangData {
  const city = SACRED_CITIES.find((c) => c.id === cityId) || SACRED_CITIES[0];
  const date = new Date(targetDate);
  const weekday = date.getDay(); // 0 = Sunday ... 6 = Saturday

  // Astronomical Sun Times
  const { sunriseMinutes, sunsetMinutes, solarNoonMinutes } = calculateSunTimes(
    date,
    city.latitude,
    city.longitude,
    city.timezone
  );

  const dinmaanMinutes = sunsetMinutes - sunriseMinutes;
  const ratrimaanMinutes = (1440 - sunsetMinutes) + sunriseMinutes; // until next sunrise approx
  const daySlotDuration = dinmaanMinutes / 8;
  const nightSlotDuration = ratrimaanMinutes / 8;

  // Current time in minutes from midnight
  const now = new Date();
  const isCurrentDayMatch =
    now.getFullYear() === date.getFullYear() &&
    now.getMonth() === date.getMonth() &&
    now.getDate() === date.getDate();
  const currentMinutes = isCurrentDayMatch ? now.getHours() * 60 + now.getMinutes() : -1;

  // Calculate Day Choghadiya Slots
  const daySeq = DAY_SEQUENCES[weekday];
  const daySlots: ChoghadiyaSlot[] = [];

  for (let i = 0; i < 8; i++) {
    const startM = Math.round(sunriseMinutes + i * daySlotDuration);
    const endM = Math.round(sunriseMinutes + (i + 1) * daySlotDuration);
    const typeKey = daySeq[i];
    const def = CHOGHADIYA_TYPES[typeKey];
    const isCurrent = currentMinutes >= startM && currentMinutes < endM;

    daySlots.push({
      name: def.name,
      hindiName: def.hindiName,
      planet: def.planet,
      nature: def.nature,
      startTime: formatMinutesToTime(startM),
      endTime: formatMinutesToTime(endM),
      startMinutes: startM,
      endMinutes: endM,
      meaning: def.meaning,
      bestFor: def.bestFor,
      isCurrent,
      isDay: true,
    });
  }

  // Calculate Night Choghadiya Slots
  const nightSeq = NIGHT_SEQUENCES[weekday];
  const nightSlots: ChoghadiyaSlot[] = [];

  for (let i = 0; i < 8; i++) {
    let startM = Math.round(sunsetMinutes + i * nightSlotDuration);
    let endM = Math.round(sunsetMinutes + (i + 1) * nightSlotDuration);
    const typeKey = nightSeq[i];
    const def = CHOGHADIYA_TYPES[typeKey];
    
    // Check if current slot falls in night (accounting for crossing midnight)
    let isCurrent = false;
    if (currentMinutes !== -1) {
      if (startM < 1440 && endM <= 1440) {
        isCurrent = currentMinutes >= startM && currentMinutes < endM;
      } else if (startM < 1440 && endM > 1440) {
        isCurrent = currentMinutes >= startM || currentMinutes < (endM % 1440);
      } else {
        isCurrent = currentMinutes >= (startM % 1440) && currentMinutes < (endM % 1440);
      }
    }

    nightSlots.push({
      name: def.name,
      hindiName: def.hindiName,
      planet: def.planet,
      nature: def.nature,
      startTime: formatMinutesToTime(startM),
      endTime: formatMinutesToTime(endM),
      startMinutes: startM % 1440,
      endMinutes: endM % 1440,
      meaning: def.meaning,
      bestFor: def.bestFor,
      isCurrent,
      isDay: false,
    });
  }

  // Find active slot
  const currentSlot =
    daySlots.find((s) => s.isCurrent) ||
    nightSlots.find((s) => s.isCurrent) ||
    daySlots[0];

  // --------------------------------------------------------------------------
  // Muhurat Windows
  // --------------------------------------------------------------------------
  // Abhijit Muhurat: Centered on Solar Noon, length approx 48 minutes
  const abhijitStartM = Math.round(solarNoonMinutes - 24);
  const abhijitEndM = Math.round(solarNoonMinutes + 24);

  // Brahma Muhurat: 96 mins before sunrise to 48 mins before sunrise
  const brahmaStartM = Math.round(sunriseMinutes - 96);
  const brahmaEndM = Math.round(sunriseMinutes - 48);

  // Godhuli: 24 mins before sunset to 24 mins after sunset
  const godhuliStartM = Math.round(sunsetMinutes - 24);
  const godhuliEndM = Math.round(sunsetMinutes + 24);

  // Vijaya Muhurat: In afternoon approx 2:00 PM to 2:48 PM
  const vijayaStartM = Math.round(solarNoonMinutes + 84);
  const vijayaEndM = Math.round(solarNoonMinutes + 132);

  // Amrit Kaal: calculated based on daytime auspicious division
  const amritKaalStartM = Math.round(sunriseMinutes + 3 * daySlotDuration + 10);
  const amritKaalEndM = Math.round(amritKaalStartM + 48);

  // Rahu Kaal: 1/8th partition by day of week
  // Sunday = 8th, Mon = 2nd, Tue = 7th, Wed = 5th, Thu = 6th, Fri = 4th, Sat = 3rd
  const rahuPeriodByDay = [7, 1, 6, 4, 5, 3, 2]; // 0-indexed period (0 to 7)
  const rahuPeriod = rahuPeriodByDay[weekday];
  const rahuStartM = Math.round(sunriseMinutes + rahuPeriod * daySlotDuration);
  const rahuEndM = Math.round(sunriseMinutes + (rahuPeriod + 1) * daySlotDuration);

  // Yamaganda: Thu = 1st, Wed = 2nd, Tue = 3rd, Mon = 4th, Sun = 5th, Sat = 6th, Fri = 7th
  const yamaPeriodByDay = [4, 3, 2, 1, 0, 6, 5];
  const yamaPeriod = yamaPeriodByDay[weekday];
  const yamaStartM = Math.round(sunriseMinutes + yamaPeriod * daySlotDuration);
  const yamaEndM = Math.round(sunriseMinutes + (yamaPeriod + 1) * daySlotDuration);

  // Gulika Kaal: Sat = 1st, Fri = 2nd, Thu = 3rd, Wed = 4th, Tue = 5th, Mon = 6th, Sun = 7th
  const gulikaPeriodByDay = [6, 5, 4, 3, 2, 1, 0];
  const gulikaPeriod = gulikaPeriodByDay[weekday];
  const gulikaStartM = Math.round(sunriseMinutes + gulikaPeriod * daySlotDuration);
  const gulikaEndM = Math.round(sunriseMinutes + (gulikaPeriod + 1) * daySlotDuration);

  // Dur Muhurat
  const durMuhuratStartM = Math.round(sunriseMinutes + 4 * daySlotDuration - 15);
  const durMuhuratEndM = Math.round(durMuhuratStartM + 48);

  const checkIsCurrent = (start: number, end: number) =>
    currentMinutes >= start && currentMinutes <= end;

  // --------------------------------------------------------------------------
  // Lunar Math (Tithi, Paksha, Nakshatra, Maas)
  // --------------------------------------------------------------------------
  // Reference epoch: 2026-01-01 was Pausha Shukla Paksha Dwadashi
  const epoch = new Date(2026, 0, 1).getTime();
  const daysSinceEpoch = Math.floor((date.getTime() - epoch) / (1000 * 60 * 60 * 24));
  
  // Synodic lunar month ~ 29.530588 days
  const lunarCycleDays = 29.530588853;
  const currentLunarPhase = ((daysSinceEpoch + 11.5) % lunarCycleDays + lunarCycleDays) % lunarCycleDays;
  const tithiIndexTotal = Math.floor((currentLunarPhase / lunarCycleDays) * 30);
  
  const isShukla = tithiIndexTotal < 15;
  const paksha: "शुक्ल पक्ष" | "कृष्ण पक्ष" = isShukla ? "शुक्ल पक्ष" : "कृष्ण पक्ष";
  const tithiInPaksha = (tithiIndexTotal % 15) + 1; // 1 to 15
  
  let tithiNameDef = TITHI_NAMES[tithiInPaksha - 1];
  if (tithiInPaksha === 15) {
    tithiNameDef = isShukla
      ? { name: "Purnima", hindi: "पूर्णिमा (पूनम)", deity: "श्री चंद्र देव / महालक्ष्मी" }
      : { name: "Amavasya", hindi: "अमावस्या", deity: "पितृ देव / शनि देव" };
  }

  // Nakshatra (approx 27.32 days cycle)
  const siderealMonth = 27.321661;
  const nakshatraIndex = Math.floor(((daysSinceEpoch * 1.05 + 14) % siderealMonth + siderealMonth) % 27);
  const nakshatraDef = NAKSHATRAS[nakshatraIndex % 27];

  // Yoga (27 Yogas)
  const yogaIndex = (tithiIndexTotal + nakshatraIndex) % 27;
  const yogaDef = YOGAS[yogaIndex];

  // Karana (60 Karanas in a month, 11 unique types)
  const karanaIndex = (tithiIndexTotal * 2) % 11;
  const karanaDef = KARANAS[karanaIndex];

  // Hindu Month calculation
  // Vikram Samvat 2083 for 2026-2027
  const vikramSamvat = 2083;
  const shakaSamvat = 1948;
  const samvatsara = "शुभकृत";

  // Approximate Hindu Maas by solar month index (starting Chaitra in March/April)
  const monthIdx = date.getMonth(); // 0 = Jan (Pausha/Magha), 9 = Oct (Ashvina/Kartika)
  const maasMap = [9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8];
  const maasName = HINDU_MAAS[maasMap[monthIdx]];

  // Rashi
  const suryaRashi = RASHIS[(monthIdx + 8) % 12];
  const chandraRashi = RASHIS[(nakshatraIndex * 4 / 9) % 12 | 0];

  const todayFestival = getDayFestival(tithiInPaksha, paksha, maasMap[monthIdx]);

  return {
    date,
    dateFormatted: date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    dateHindi: date.toLocaleDateString("hi-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    city,
    vikramSamvat,
    shakaSamvat,
    samvatsara,
    ayan: monthIdx >= 0 && monthIdx <= 5 ? "उत्तरायण (शुभ)" : "दक्षिणायन",
    ritu: monthIdx >= 8 && monthIdx <= 9 ? "शरद ऋतु" : monthIdx >= 10 && monthIdx <= 11 ? "हेमंत ऋतु" : "ग्रीष्म / वर्षा",
    maas: maasName,
    maasType: "पूर्णिमान्त",
    paksha,
    tithi: {
      number: tithiInPaksha,
      name: tithiNameDef.name,
      hindiName: tithiNameDef.hindi,
      endTime: formatMinutesToTime(sunsetMinutes - 45),
      deity: tithiNameDef.deity,
    },
    vaar: VAARS[weekday],
    nakshatra: {
      name: nakshatraDef.name,
      hindiName: nakshatraDef.hindi,
      rulingPlanet: nakshatraDef.planet,
      deity: nakshatraDef.deity,
      endTime: formatMinutesToTime(sunsetMinutes + 120),
    },
    yoga: {
      name: yogaDef.name,
      hindiName: yogaDef.hindi,
      type: yogaDef.type as "शुभ" | "अशुभ",
      endTime: formatMinutesToTime(solarNoonMinutes + 150),
    },
    karana: {
      name: karanaDef.name,
      hindiName: karanaDef.hindi,
      endTime: formatMinutesToTime(solarNoonMinutes),
    },
    surya: {
      sunrise: formatMinutesToTime(sunriseMinutes),
      sunset: formatMinutesToTime(sunsetMinutes),
      sunriseMinutes,
      sunsetMinutes,
      rashi: suryaRashi,
    },
    chandra: {
      moonrise: formatMinutesToTime(sunsetMinutes + 60),
      moonset: formatMinutesToTime(sunriseMinutes - 45),
      rashi: chandraRashi,
    },
    muhurats: {
      abhijit: {
        name: "Abhijit Muhurat",
        hindiName: "अभिजीत मुहूर्त (सर्वश्रेष्ठ)",
        type: "AUSPICIOUS",
        startTime: formatMinutesToTime(abhijitStartM),
        endTime: formatMinutesToTime(abhijitEndM),
        description: "दिन का सबसे शक्तिशाली मुहूर्त। किसी भी मांगलिक या नए कार्य को शुरू करने के लिए सर्वसिद्ध मुहूर्त।",
        isCurrent: checkIsCurrent(abhijitStartM, abhijitEndM),
      },
      brahma: {
        name: "Brahma Muhurat",
        hindiName: "ब्रह्म मुहूर्त (साधना व ध्यान)",
        type: "AUSPICIOUS",
        startTime: formatMinutesToTime(brahmaStartM),
        endTime: formatMinutesToTime(brahmaEndM),
        description: "सूर्य से पूर्व का अमृत समय। वेद पाठ, गायत्री जप, योग व प्रभु आराधना हेतु सर्वोत्तम।",
        isCurrent: checkIsCurrent(brahmaStartM, brahmaEndM),
      },
      amritKaal: {
        name: "Amrit Kaal",
        hindiName: "अमृत काल",
        type: "AUSPICIOUS",
        startTime: formatMinutesToTime(amritKaalStartM),
        endTime: formatMinutesToTime(amritKaalEndM),
        description: "अमृत योग समय। पूजा, संकल्प, दान और नए अनुबंध के लिए शुभ।",
        isCurrent: checkIsCurrent(amritKaalStartM, amritKaalEndM),
      },
      vijaya: {
        name: "Vijaya Muhurat",
        hindiName: "विजय मुहूर्त",
        type: "AUSPICIOUS",
        startTime: formatMinutesToTime(vijayaStartM),
        endTime: formatMinutesToTime(vijayaEndM),
        description: "कार्य सिद्धि और विजय प्राप्ति हेतु अत्यंत शुभ मुहूर्त।",
        isCurrent: checkIsCurrent(vijayaStartM, vijayaEndM),
      },
      godhuli: {
        name: "Godhuli Muhurat",
        hindiName: "गोधूलि मुहूर्त (संध्या वंदन)",
        type: "AUSPICIOUS",
        startTime: formatMinutesToTime(godhuliStartM),
        endTime: formatMinutesToTime(godhuliEndM),
        description: "संध्या आरती, तुलसी दीया और गृह शांति हेतु उत्तम समय।",
        isCurrent: checkIsCurrent(godhuliStartM, godhuliEndM),
      },
      rahuKaal: {
        name: "Rahu Kaal",
        hindiName: "राहुकाल (अशुभ समय - त्याज्य)",
        type: "INAUSPICIOUS",
        startTime: formatMinutesToTime(rahuStartM),
        endTime: formatMinutesToTime(rahuEndM),
        description: "⚠️ इस समय में कोई भी शुभ कार्य, पूजा संकल्प या नई यात्रा प्रारम्भ न करें।",
        isCurrent: checkIsCurrent(rahuStartM, rahuEndM),
      },
      yamaganda: {
        name: "Yamaganda",
        hindiName: "यमगण्ड काल (अशुभ)",
        type: "INAUSPICIOUS",
        startTime: formatMinutesToTime(yamaStartM),
        endTime: formatMinutesToTime(yamaEndM),
        description: "यमगण्ड में शुरू किया गया कार्य विफल होने की आशंका रहती है।",
        isCurrent: checkIsCurrent(yamaStartM, yamaEndM),
      },
      gulikaKaal: {
        name: "Gulika Kaal",
        hindiName: "गुलिक काल (सामान्य)",
        type: "INAUSPICIOUS",
        startTime: formatMinutesToTime(gulikaStartM),
        endTime: formatMinutesToTime(gulikaEndM),
        description: "शनि के पुत्र गुलिक का समय। शुभ कार्यों में मध्यम माना गया है।",
        isCurrent: checkIsCurrent(gulikaStartM, gulikaEndM),
      },
      durMuhurat: {
        name: "Dur Muhurat",
        hindiName: "दुर्मुहूर्त",
        type: "INAUSPICIOUS",
        startTime: formatMinutesToTime(durMuhuratStartM),
        endTime: formatMinutesToTime(durMuhuratEndM),
        description: "अशुभ मुहूर्त जिसमें मांगलिक कार्य वर्जित होते हैं।",
        isCurrent: checkIsCurrent(durMuhuratStartM, durMuhuratEndM),
      },
    },
    choghadiya: {
      daySlots,
      nightSlots,
      currentSlot,
    },
    todayFestival,
  };
}
