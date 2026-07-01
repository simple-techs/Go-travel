"use client";

import { UserProfile } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { MapPin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ProfileCardProps {
  profile: UserProfile;
  index?: number;
  showMatchScore?: boolean;
}

export default function ProfileCard({ profile, index = 0, showMatchScore }: ProfileCardProps) {
  const statusColors = {
    available: "bg-green-500",
    maybe: "bg-yellow-500",
    unavailable: "bg-red-500",
  };

  const statusLabels = {
    available: "Accepting Guests",
    maybe: "Maybe Accepting",
    unavailable: "Not Accepting",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/profile/${profile.id}`}>
        <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/30 hover:bg-white/8 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5">
          <div className="p-5">
            <div className="flex items-start gap-4">
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 rounded-xl overflow-hidden ring-2 ring-white/10 group-hover:ring-cyan-500/30 transition-all">
                  <Image
                    src={profile.avatar_url}
                    alt={profile.name}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-900 ${statusColors[profile.hosting_status]}`}
                  title={statusLabels[profile.hosting_status]}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-semibold text-lg group-hover:text-cyan-300 transition-colors">
                    {profile.name}
                  </h3>
                  <span className="text-gray-500 text-sm">{profile.age}</span>
                  {showMatchScore && (
                    <span className="ml-auto text-xs bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full">
                      Match
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-gray-400 text-sm mt-0.5">
                  <MapPin size={12} />
                  <span>{profile.city}, {profile.country}</span>
                </div>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {profile.bio}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-4">
              {profile.interests.slice(0, 5).map((interest) => (
                <span
                  key={interest.id}
                  className="text-xs bg-white/5 border border-white/10 text-gray-300 px-2 py-1 rounded-lg"
                >
                  {interest.emoji} {interest.name}
                </span>
              ))}
              {profile.interests.length > 5 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{profile.interests.length - 5} more
                </span>
              )}
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    profile.hosting_status === "available"
                      ? "bg-green-500/10 text-green-400"
                      : profile.hosting_status === "maybe"
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {statusLabels[profile.hosting_status]}
                </span>
              </div>
              <div className="flex items-center gap-1 text-cyan-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <MessageCircle size={14} />
                <span>View Profile</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
