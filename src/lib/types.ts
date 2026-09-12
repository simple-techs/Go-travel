import type { Socials } from "./socials";

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  avatar_url: string;
  bio: string;
  country: string;
  country_code: string;
  city: string;
  interests: Interest[];
  languages: string[];
  hosting_status: "available" | "maybe" | "unavailable";
  created_at: string;
  socials?: Socials;
}

export interface Interest {
  id: string;
  name: string;
  emoji: string;
  category: "adventure" | "culture" | "social" | "nature" | "lifestyle";
}

export interface StayRequest {
  id: string;
  guest_id: string;
  host_id: string;
  message: string;
  status: "pending" | "accepted" | "declined";
  start_date: string;
  end_date: string;
  created_at: string;
}

export interface Country {
  code: string;
  name: string;
  lat: number;
  lng: number;
  continent: string;
  popular: boolean;
}
