import { UserProfile } from "./types";
import { ALL_INTERESTS } from "./interests";

const AVATARS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop&crop=face",
];

const NAMES = [
  "Emma", "Liam", "Sophia", "Noah", "Mia", "Lucas", "Ava", "Mason",
  "Luna", "Ethan", "Chloe", "Aiden", "Yuki", "Kai", "Priya", "Arjun",
  "Sofia", "Marco", "Lena", "Felix", "Nina", "Diego", "Sakura", "Lars",
  "Zara", "Mateo", "Ingrid", "Chen", "Amara", "Ravi", "Isla", "Oscar",
  "Freya", "Hugo", "Camila", "Sven", "Noor", "Tao", "Ines", "Kofi",
];

const BIOS = [
  "Solo traveler exploring the world one country at a time. Love meeting new people and sharing stories over a cold beer.",
  "Digital nomad working from cafes around the globe. Always down for a beach day or a late-night coding session.",
  "Adventure junkie and amateur photographer. If there's a mountain, I'm climbing it. If there's a wave, I'm surfing it.",
  "Foodie on a mission to try every street food stall in Southeast Asia. Will trade cooking skills for a couch to crash on!",
  "Ex-corporate worker turned full-time backpacker. Best decision ever. Let's explore together!",
  "Yoga instructor traveling to learn from different masters. Spreading good vibes wherever I go.",
  "Music lover and festival hopper. From Tomorrowland to Full Moon Party - I've been there. Let's party!",
  "Nature enthusiast and wildlife photographer. Happiest when I'm off the beaten path with my camera.",
  "Language learner currently studying my 5th language. Cultural exchange is my favorite kind of travel.",
  "Budget travel expert - ask me how I traveled 20 countries on $10/day. Yes, really!",
  "Surf instructor by day, traveler by nature. Looking for waves and good company.",
  "Bookworm who loves reading in hammocks across different countries. Quiet traveler with great stories.",
  "Volunteer traveler working with local communities. Travel with purpose is the best kind of travel.",
  "Tech entrepreneur taking a gap year to explore. Building my next startup idea while backpacking.",
  "Fitness enthusiast who can find a gym anywhere. Morning runs in new cities are my favorite thing.",
];

const CITIES: Record<string, string[]> = {
  TH: ["Bangkok", "Chiang Mai", "Phuket", "Koh Phangan", "Pai"],
  VN: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Hoi An", "Nha Trang"],
  ID: ["Bali", "Jakarta", "Yogyakarta", "Lombok", "Flores"],
  PH: ["Manila", "Cebu", "Siargao", "Palawan", "Boracay"],
  KH: ["Phnom Penh", "Siem Reap", "Sihanoukville", "Kampot"],
  MY: ["Kuala Lumpur", "Penang", "Langkawi", "Melaka"],
  IN: ["Goa", "Mumbai", "Delhi", "Rishikesh", "Varanasi"],
  NP: ["Kathmandu", "Pokhara", "Chitwan"],
  LK: ["Colombo", "Ella", "Mirissa", "Kandy"],
  JP: ["Tokyo", "Osaka", "Kyoto", "Hiroshima"],
  PT: ["Lisbon", "Porto", "Lagos", "Ericeira"],
  ES: ["Barcelona", "Madrid", "Valencia", "Sevilla", "San Sebastian"],
  IT: ["Rome", "Florence", "Naples", "Milan", "Amalfi"],
  GR: ["Athens", "Santorini", "Mykonos", "Crete"],
  HR: ["Split", "Dubrovnik", "Zagreb", "Hvar"],
  FR: ["Paris", "Nice", "Lyon", "Marseille"],
  CZ: ["Prague", "Brno", "Cesky Krumlov"],
  TR: ["Istanbul", "Cappadocia", "Antalya", "Izmir"],
  MX: ["Mexico City", "Tulum", "Oaxaca", "Guadalajara", "Playa del Carmen"],
  CR: ["San Jose", "Tamarindo", "Manuel Antonio", "Monteverde"],
  GT: ["Antigua", "Lake Atitlan", "Guatemala City", "Flores"],
  CU: ["Havana", "Trinidad", "Vinales"],
  CO: ["Medellin", "Bogota", "Cartagena", "Cali"],
  PE: ["Lima", "Cusco", "Arequipa", "Huaraz"],
  BR: ["Rio de Janeiro", "Sao Paulo", "Florianopolis", "Salvador"],
  AR: ["Buenos Aires", "Mendoza", "Bariloche", "Ushuaia"],
  BO: ["La Paz", "Sucre", "Uyuni"],
  EC: ["Quito", "Banos", "Montanita", "Cuenca"],
  MA: ["Marrakech", "Fez", "Chefchaouen", "Essaouira"],
  ZA: ["Cape Town", "Johannesburg", "Durban"],
  EG: ["Cairo", "Luxor", "Dahab", "Aswan"],
  KE: ["Nairobi", "Mombasa", "Diani"],
  TZ: ["Dar es Salaam", "Zanzibar", "Arusha"],
  AU: ["Sydney", "Melbourne", "Byron Bay", "Cairns", "Perth"],
  NZ: ["Auckland", "Queenstown", "Wellington", "Christchurch"],
  FJ: ["Suva", "Nadi", "Coral Coast"],
};

const LANGUAGES = [
  "English", "Spanish", "French", "German", "Portuguese",
  "Japanese", "Korean", "Mandarin", "Thai", "Hindi",
  "Italian", "Dutch", "Swedish", "Arabic", "Indonesian",
];

export function generateMockProfiles(countryCode: string, count: number = 8): UserProfile[] {
  const cities = CITIES[countryCode] || ["Capital City"];
  const countryNames: Record<string, string> = {
    TH: "Thailand", VN: "Vietnam", ID: "Indonesia", PH: "Philippines",
    KH: "Cambodia", MY: "Malaysia", IN: "India", NP: "Nepal",
    LK: "Sri Lanka", JP: "Japan", PT: "Portugal", ES: "Spain",
    IT: "Italy", GR: "Greece", HR: "Croatia", FR: "France",
    CZ: "Czech Republic", TR: "Turkey", MX: "Mexico", CR: "Costa Rica",
    GT: "Guatemala", CU: "Cuba", CO: "Colombia", PE: "Peru",
    BR: "Brazil", AR: "Argentina", BO: "Bolivia", EC: "Ecuador",
    MA: "Morocco", ZA: "South Africa", EG: "Egypt", KE: "Kenya",
    TZ: "Tanzania", AU: "Australia", NZ: "New Zealand", FJ: "Fiji",
  };

  return Array.from({ length: count }, (_, i) => {
    const nameIndex = (countryCode.charCodeAt(0) * 7 + i * 13) % NAMES.length;
    const avatarIndex = (countryCode.charCodeAt(1) * 3 + i * 7) % AVATARS.length;
    const bioIndex = (countryCode.charCodeAt(0) + i * 5) % BIOS.length;
    const cityIndex = i % cities.length;

    const interestCount = 3 + (i % 4);
    const interestStart = (countryCode.charCodeAt(0) + i * 3) % ALL_INTERESTS.length;
    const interests = [];
    for (let j = 0; j < interestCount; j++) {
      interests.push(ALL_INTERESTS[(interestStart + j * 4) % ALL_INTERESTS.length]);
    }

    const langCount = 1 + (i % 3);
    const langStart = (countryCode.charCodeAt(1) + i * 2) % LANGUAGES.length;
    const langs = ["English"];
    for (let j = 0; j < langCount; j++) {
      const lang = LANGUAGES[(langStart + j * 3) % LANGUAGES.length];
      if (!langs.includes(lang)) langs.push(lang);
    }

    const statuses: UserProfile["hosting_status"][] = ["available", "available", "available", "maybe", "maybe", "unavailable"];

    return {
      id: `${countryCode.toLowerCase()}-${i + 1}`,
      name: NAMES[nameIndex],
      age: 19 + ((countryCode.charCodeAt(0) + i * 3) % 15),
      avatar_url: AVATARS[avatarIndex],
      bio: BIOS[bioIndex],
      country: countryNames[countryCode] || countryCode,
      country_code: countryCode,
      city: cities[cityIndex],
      interests,
      languages: langs,
      hosting_status: statuses[i % statuses.length],
      created_at: new Date(Date.now() - (i * 30 + 10) * 24 * 60 * 60 * 1000).toISOString(),
    };
  });
}

export function getProfileById(id: string): UserProfile | null {
  const parts = id.split("-");
  if (parts.length < 2) return null;
  const countryCode = parts[0].toUpperCase();
  const index = parseInt(parts[1], 10) - 1;
  if (isNaN(index) || index < 0) return null;
  const profiles = generateMockProfiles(countryCode, Math.max(index + 1, 8));
  return profiles[index] || null;
}
