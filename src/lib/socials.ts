export type SocialKey = "instagram" | "tiktok" | "linkedin" | "snapchat";

export type Socials = Partial<Record<SocialKey, string>>;

export interface SocialPlatform {
  key: SocialKey;
  label: string;
  baseUrl: string;
  placeholder: string;
  color: string;
}

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    key: "instagram",
    label: "Instagram",
    baseUrl: "https://instagram.com/",
    placeholder: "yourhandle",
    color: "hover:text-pink-400 hover:border-pink-500/40",
  },
  {
    key: "tiktok",
    label: "TikTok",
    baseUrl: "https://tiktok.com/@",
    placeholder: "yourhandle",
    color: "hover:text-cyan-300 hover:border-cyan-400/40",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    baseUrl: "https://linkedin.com/in/",
    placeholder: "your-name",
    color: "hover:text-blue-400 hover:border-blue-500/40",
  },
  {
    key: "snapchat",
    label: "Snapchat",
    baseUrl: "https://snapchat.com/add/",
    placeholder: "yourhandle",
    color: "hover:text-yellow-300 hover:border-yellow-400/40",
  },
];

/** Accepts a handle, @handle, or full profile URL and returns the bare handle. */
export function normalizeHandle(input: string): string {
  let value = input.trim();
  if (!value) return "";
  value = value.replace(/^https?:\/\/(www\.)?/i, "");
  value = value.replace(
    /^(instagram\.com|tiktok\.com|linkedin\.com\/in|snapchat\.com\/add)\/?/i,
    ""
  );
  value = value.replace(/^@/, "").replace(/[/?#].*$/, "");
  return value;
}

export function socialUrl(platform: SocialPlatform, handle: string): string {
  return `${platform.baseUrl}${encodeURIComponent(handle)}`;
}
