"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { getCountryByCode } from "@/lib/countries";
import { generateMockProfiles } from "@/lib/mock-data";
import { ALL_INTERESTS } from "@/lib/interests";
import ProfileCard from "@/components/ProfileCard";
import InterestBadge from "@/components/InterestBadge";
import { ArrowLeft, Filter, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function ExplorePage() {
  const params = useParams();
  const router = useRouter();
  const countryCode = (params.country as string).toUpperCase();
  const country = getCountryByCode(countryCode);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const allProfiles = useMemo(
    () => generateMockProfiles(countryCode, 12),
    [countryCode]
  );

  const filteredProfiles = useMemo(() => {
    if (selectedInterests.length === 0) return allProfiles;
    return allProfiles.filter((profile) =>
      profile.interests.some((interest) =>
        selectedInterests.includes(interest.id)
      )
    );
  }, [allProfiles, selectedInterests]);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Country not found</h1>
          <button
            onClick={() => router.push("/")}
            className="text-cyan-400 hover:text-cyan-300"
          >
            Back to Globe
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-cyan-950/30 to-transparent border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Back to Globe
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <MapPin size={14} />
                <span>{country.continent}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {country.name}
              </h1>
              <div className="flex items-center gap-2 mt-2 text-gray-400">
                <Users size={16} />
                <span>{allProfiles.length} hosts available</span>
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                showFilters || selectedInterests.length > 0
                  ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                  : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              <Filter size={16} />
              Filter by Interests
              {selectedInterests.length > 0 && (
                <span className="bg-cyan-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {selectedInterests.length}
                </span>
              )}
            </button>
          </div>

          {/* Interest filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6 pt-6 border-t border-white/5"
            >
              <p className="text-sm text-gray-400 mb-3">
                Select interests to find matching hosts:
              </p>
              <div className="flex flex-wrap gap-2">
                {ALL_INTERESTS.map((interest) => (
                  <InterestBadge
                    key={interest.id}
                    interest={interest}
                    selected={selectedInterests.includes(interest.id)}
                    onClick={() => toggleInterest(interest.id)}
                    size="sm"
                  />
                ))}
              </div>
              {selectedInterests.length > 0 && (
                <button
                  onClick={() => setSelectedInterests([])}
                  className="mt-3 text-sm text-gray-500 hover:text-gray-300 transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Profiles grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {filteredProfiles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No hosts match your interests.</p>
            <button
              onClick={() => setSelectedInterests([])}
              className="mt-4 text-cyan-400 hover:text-cyan-300"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProfiles.map((profile, i) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                index={i}
                showMatchScore={selectedInterests.length > 0}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
