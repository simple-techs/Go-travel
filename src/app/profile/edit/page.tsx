"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/supabase/use-user";
import { ALL_INTERESTS } from "@/lib/interests";
import { countries } from "@/lib/countries";
import InterestBadge from "@/components/InterestBadge";
import {
  ArrowLeft,
  Camera,
  Save,
  User,
  MapPin,
  FileText,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EditProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [hostingStatus, setHostingStatus] = useState<string>("available");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const { user, loading, supabase } = useUser();

  useEffect(() => {
    if (!supabase || !user) return;

    supabase
      .from("profiles")
      .select("name, age, bio, country_code, city, interests, hosting_status")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data, error: loadError }) => {
        if (loadError) {
          setError(loadError.message);
          return;
        }
        if (!data) return;
        setName(data.name ?? "");
        setAge(data.age != null ? String(data.age) : "");
        setBio(data.bio ?? "");
        setCountry(data.country_code ?? "");
        setCity(data.city ?? "");
        setSelectedInterests(data.interests ?? []);
        setHostingStatus(data.hosting_status ?? "available");
      });
  }, [supabase, user]);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    setError("");

    if (supabase && user) {
      setSaving(true);
      const { error: saveError } = await supabase.from("profiles").upsert({
        id: user.id,
        name,
        age: age ? Number(age) : null,
        bio,
        country_code: country || null,
        city: city || null,
        interests: selectedInterests,
        hosting_status: hostingStatus,
      });
      setSaving(false);

      if (saveError) {
        setError(saveError.message);
        return;
      }
    }

    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      router.push("/dashboard");
    }, 1500);
  };

  const interestsByCategory = {
    adventure: ALL_INTERESTS.filter((i) => i.category === "adventure"),
    social: ALL_INTERESTS.filter((i) => i.category === "social"),
    nature: ALL_INTERESTS.filter((i) => i.category === "nature"),
    culture: ALL_INTERESTS.filter((i) => i.category === "culture"),
    lifestyle: ALL_INTERESTS.filter((i) => i.category === "lifestyle"),
  };

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Edit Profile</h1>
        <p className="text-gray-400">
          Set up your profile so other backpackers can find you
        </p>
      </div>

      <div className="space-y-8">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Avatar */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white/10 flex items-center justify-center border-2 border-dashed border-white/20 hover:border-cyan-500/40 transition-colors cursor-pointer">
              <Camera size={24} className="text-gray-500" />
            </div>
            <div>
              <h3 className="text-white font-medium">Profile Photo</h3>
              <p className="text-gray-500 text-sm mt-1">
                Upload a photo so hosts and guests can recognize you
              </p>
              <button className="mt-2 text-sm text-cyan-400 hover:text-cyan-300">
                Upload photo
              </button>
            </div>
          </div>
        </section>

        {/* Basic info */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <User size={18} />
            Basic Info
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 block mb-1.5">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500/50 placeholder:text-gray-600"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1.5">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Your age"
                min={16}
                max={99}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500/50 placeholder:text-gray-600"
              />
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <MapPin size={18} />
            Location
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 block mb-1.5">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500/50 appearance-none"
              >
                <option value="" className="bg-gray-900">
                  Select country
                </option>
                {countries.map((c) => (
                  <option key={c.code} value={c.code} className="bg-gray-900">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1.5">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Your city"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500/50 placeholder:text-gray-600"
              />
            </div>
          </div>
        </section>

        {/* Bio */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <FileText size={18} />
            About You
          </h2>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell other backpackers about yourself, your travel style, and what makes you a great host or guest..."
            rows={5}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 placeholder:text-gray-600 resize-none"
          />
          <p className="text-xs text-gray-600 mt-2">
            {bio.length}/500 characters
          </p>
        </section>

        {/* Hosting Status */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-5">Hosting Status</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                value: "available",
                label: "Available",
                color: "green",
                desc: "Open to guests",
              },
              {
                value: "maybe",
                label: "Maybe",
                color: "yellow",
                desc: "Depends on timing",
              },
              {
                value: "unavailable",
                label: "Traveling",
                color: "red",
                desc: "Currently away",
              },
            ].map((status) => (
              <button
                key={status.value}
                type="button"
                onClick={() => setHostingStatus(status.value)}
                className={`p-4 rounded-xl border text-center transition-all ${
                  hostingStatus === status.value
                    ? `border-${status.color}-500/40 bg-${status.color}-500/10`
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                    status.color === "green"
                      ? "bg-green-500"
                      : status.color === "yellow"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                />
                <p className="text-white text-sm font-medium">{status.label}</p>
                <p className="text-gray-500 text-xs mt-1">{status.desc}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Interests */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-2">Your Interests</h2>
          <p className="text-gray-400 text-sm mb-5">
            Select interests to match with like-minded travelers ({selectedInterests.length} selected)
          </p>

          {Object.entries(interestsByCategory).map(([category, interests]) => (
            <div key={category} className="mb-5 last:mb-0">
              <h3 className="text-sm font-medium text-gray-400 mb-2 capitalize">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <InterestBadge
                    key={interest.id}
                    interest={interest}
                    selected={selectedInterests.includes(interest.id)}
                    onClick={() => toggleInterest(interest.id)}
                    size="sm"
                  />
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={saving || loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
        >
          <Save size={20} />
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </div>

      {/* Success notification */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 bg-green-900/80 backdrop-blur-xl border border-green-500/30 rounded-xl px-5 py-3 flex items-center gap-3 shadow-lg"
          >
            <CheckCircle size={20} className="text-green-400" />
            <p className="text-white font-medium">Profile saved!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
