import { SOCIAL_PLATFORMS, socialUrl, type Socials } from "@/lib/socials";
import SocialIcon from "@/components/SocialIcon";

export default function SocialLinks({ socials }: { socials: Socials }) {
  const linked = SOCIAL_PLATFORMS.filter((p) => socials[p.key]);
  if (linked.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {linked.map((p) => {
        const handle = socials[p.key]!;
        return (
          <a
            key={p.key}
            href={socialUrl(p, handle)}
            target="_blank"
            rel="noopener noreferrer"
            title={`${p.label}: @${handle}`}
            className={`flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300 transition-colors ${p.color}`}
          >
            <SocialIcon platform={p.key} size={15} />
            <span className="truncate max-w-[140px]">@{handle}</span>
          </a>
        );
      })}
    </div>
  );
}
