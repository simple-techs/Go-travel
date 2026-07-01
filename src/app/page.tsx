"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Country } from "@/lib/types";
import { getPopularCountries } from "@/lib/countries";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe as GlobeIcon, Users, Home, Sparkles } from "lucide-react";

const Globe = dynamic(() => import("@/components/Globe"), { ssr: false });

export default function HomePage() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const popularCountries = getPopularCountries();

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
  };

  const handleExplore = () => {
    if (selectedCountry) {
      router.push(`/explore/${selectedCountry.code}`);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Hero with Globe */}
      <div className="relative h-[85vh] globe-container flex items-center justify-center overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        {/* Globe */}
        <div className="absolute inset-0">
          <Globe onSelectCountry={handleSelectCountry} />
        </div>

        {/* Hero text overlay */}
        <div className="relative z-10 text-center pointer-events-none px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-4">
              <span className="gradient-text">GO</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-lg mx-auto leading-relaxed">
              Spin the globe. Find your people.
              <br />
              <span className="text-cyan-400">Stay for free.</span>
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-6 text-sm text-gray-500"
          >
            Click any marker on the globe to explore
          </motion.p>
        </div>

        {/* Country selection popup */}
        <AnimatePresence>
          {selectedCountry && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
            >
              <div className="bg-black/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-2xl shadow-cyan-500/10">
                <div>
                  <p className="text-sm text-gray-400">Selected destination</p>
                  <h3 className="text-xl font-bold text-white">{selectedCountry.name}</h3>
                  <p className="text-xs text-gray-500">{selectedCountry.continent}</p>
                </div>
                <button
                  onClick={handleExplore}
                  className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
                >
                  Explore
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* How it works */}
      <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How <span className="gradient-text">GO</span> Works
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Three simple steps to find your next adventure and a free place to stay.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: GlobeIcon,
              title: "Spin the Globe",
              description: "Explore destinations around the world with our interactive 3D globe. Click any country that catches your eye.",
              color: "from-cyan-500 to-blue-500",
            },
            {
              icon: Users,
              title: "Find Your People",
              description: "See profiles of travelers and locals who share your interests - partying, surfing, hiking, tech, and more.",
              color: "from-blue-500 to-purple-500",
            },
            {
              icon: Home,
              title: "Stay for Free",
              description: "Send a stay request. Crash at their place for free. Return the favor when they visit your city.",
              color: "from-purple-500 to-pink-500",
            },
          ].map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative group"
            >
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-500/20 transition-all duration-300">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <step.icon size={24} className="text-white" />
                </div>
                <div className="absolute top-6 right-6 text-6xl font-black text-white/3">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular destinations */}
      <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Popular Destinations
          </h2>
          <p className="text-gray-400">Where backpackers are going right now</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {popularCountries.slice(0, 18).map((country, i) => (
            <motion.button
              key={country.code}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              onClick={() => router.push(`/explore/${country.code}`)}
              className="group bg-white/5 border border-white/10 rounded-xl p-4 hover:border-cyan-500/30 hover:bg-white/8 transition-all text-center"
            >
              <p className="text-white font-medium group-hover:text-cyan-300 transition-colors text-sm">
                {country.name}
              </p>
              <p className="text-gray-500 text-xs mt-1">{country.continent}</p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <Sparkles className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to <span className="gradient-text">GO</span>?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of backpackers sharing their homes and adventures around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/auth/sign-up")}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
            >
              Create Free Account
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
            >
              Explore the Globe
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-white text-sm">
              G
            </div>
            <span className="text-sm text-gray-500">GO - Free Stays for Backpackers</span>
          </div>
          <p className="text-xs text-gray-600">
            Built with adventure in mind. Travel responsibly.
          </p>
        </div>
      </footer>
    </div>
  );
}
