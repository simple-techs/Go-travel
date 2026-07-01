"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { countries } from "@/lib/countries";
import { Search as SearchIcon, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filteredCountries = useMemo(() => {
    if (!query.trim()) return countries;
    const q = query.toLowerCase();
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.continent.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [query]);

  const grouped = useMemo(() => {
    const groups: Record<string, typeof countries> = {};
    for (const country of filteredCountries) {
      if (!groups[country.continent]) groups[country.continent] = [];
      groups[country.continent].push(country);
    }
    return groups;
  }, [filteredCountries]);

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Search Destinations</h1>
        <p className="text-gray-400">
          Find your next backpacking destination by country or continent
        </p>
      </div>

      {/* Search input */}
      <div className="relative mb-10">
        <SearchIcon
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search countries, continents..."
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white text-lg focus:outline-none focus:border-cyan-500/50 placeholder:text-gray-600"
          autoFocus
        />
      </div>

      {/* Results grouped by continent */}
      {Object.keys(grouped).length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400">No countries match &quot;{query}&quot;</p>
        </div>
      ) : (
        <div className="space-y-10">
          {Object.entries(grouped).map(([continent, continentCountries]) => (
            <motion.div
              key={continent}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <MapPin size={16} className="text-cyan-400" />
                {continent}
                <span className="text-sm text-gray-500 font-normal">
                  ({continentCountries.length})
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {continentCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => router.push(`/explore/${country.code}`)}
                    className="group flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:border-cyan-500/30 hover:bg-white/8 transition-all text-left"
                  >
                    <div>
                      <p className="text-white font-medium group-hover:text-cyan-300 transition-colors">
                        {country.name}
                      </p>
                      {country.popular && (
                        <span className="text-xs text-cyan-500/60">Popular</span>
                      )}
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-gray-600 group-hover:text-cyan-400 transition-colors"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
