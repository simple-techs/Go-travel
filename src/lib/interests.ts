import { Interest } from "./types";

export const ALL_INTERESTS: Interest[] = [
  { id: "partying", name: "Partying", emoji: "\uD83C\uDF89", category: "social" },
  { id: "nightlife", name: "Nightlife", emoji: "\uD83C\uDF1B", category: "social" },
  { id: "beach", name: "Beach", emoji: "\uD83C\uDFD6\uFE0F", category: "nature" },
  { id: "hiking", name: "Hiking", emoji: "\u26F0\uFE0F", category: "adventure" },
  { id: "surfing", name: "Surfing", emoji: "\uD83C\uDFC4", category: "adventure" },
  { id: "diving", name: "Diving", emoji: "\uD83E\uDD3F", category: "adventure" },
  { id: "rock-climbing", name: "Rock Climbing", emoji: "\uD83E\uDDD7", category: "adventure" },
  { id: "yoga", name: "Yoga", emoji: "\uD83E\uDDD8", category: "lifestyle" },
  { id: "meditation", name: "Meditation", emoji: "\uD83D\uDE4F", category: "lifestyle" },
  { id: "tech", name: "Tech", emoji: "\uD83D\uDCBB", category: "lifestyle" },
  { id: "digital-nomad", name: "Digital Nomad", emoji: "\uD83C\uDF0D", category: "lifestyle" },
  { id: "photography", name: "Photography", emoji: "\uD83D\uDCF7", category: "culture" },
  { id: "art", name: "Art", emoji: "\uD83C\uDFA8", category: "culture" },
  { id: "music", name: "Music", emoji: "\uD83C\uDFB5", category: "culture" },
  { id: "cooking", name: "Cooking", emoji: "\uD83C\uDF73", category: "culture" },
  { id: "street-food", name: "Street Food", emoji: "\uD83C\uDF5C", category: "culture" },
  { id: "history", name: "History", emoji: "\uD83C\uDFDB\uFE0F", category: "culture" },
  { id: "volunteering", name: "Volunteering", emoji: "\uD83E\uDD1D", category: "social" },
  { id: "languages", name: "Languages", emoji: "\uD83D\uDDE3\uFE0F", category: "social" },
  { id: "camping", name: "Camping", emoji: "\u26FA", category: "nature" },
  { id: "wildlife", name: "Wildlife", emoji: "\uD83E\uDD81", category: "nature" },
  { id: "budget-travel", name: "Budget Travel", emoji: "\uD83D\uDCB0", category: "lifestyle" },
  { id: "solo-travel", name: "Solo Travel", emoji: "\uD83E\uDDED", category: "lifestyle" },
  { id: "festivals", name: "Festivals", emoji: "\uD83C\uDFAA", category: "social" },
  { id: "skateboarding", name: "Skateboarding", emoji: "\uD83D\uDEF9", category: "adventure" },
  { id: "cycling", name: "Cycling", emoji: "\uD83D\uDEB4", category: "adventure" },
  { id: "fitness", name: "Fitness", emoji: "\uD83D\uDCAA", category: "lifestyle" },
  { id: "reading", name: "Reading", emoji: "\uD83D\uDCDA", category: "culture" },
  { id: "gaming", name: "Gaming", emoji: "\uD83C\uDFAE", category: "social" },
  { id: "vegan", name: "Vegan", emoji: "\uD83C\uDF31", category: "lifestyle" },
];

export function getInterestById(id: string): Interest | undefined {
  return ALL_INTERESTS.find((i) => i.id === id);
}

export function getInterestsByCategory(category: Interest["category"]): Interest[] {
  return ALL_INTERESTS.filter((i) => i.category === category);
}
