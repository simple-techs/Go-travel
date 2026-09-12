"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { getProfileById } from "@/lib/mock-data";
import InterestBadge from "@/components/InterestBadge";
import StayReviews from "@/components/StayReviews";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  Globe,
  MessageCircle,
  Calendar,
  Languages,
  Send,
  CheckCircle,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const profileId = params.id as string;
  const profile = useMemo(() => getProfileById(profileId), [profileId]);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [message, setMessage] = useState("");

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Profile not found</h1>
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

  const statusTextColors = {
    available: "text-green-400",
    maybe: "text-yellow-400",
    unavailable: "text-red-400",
  };

  const handleSendRequest = () => {
    setRequestSent(true);
    setShowRequestForm(false);
    setTimeout(() => setRequestSent(false), 5000);
  };

  return (
    <div className="min-h-screen">
      {/* Header with gradient */}
      <div className="bg-gradient-to-b from-cyan-950/30 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          {/* Profile header */}
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="relative">
              <div className="w-28 h-28 rounded-2xl overflow-hidden ring-2 ring-white/10">
                <Image
                  src={profile.avatar_url}
                  alt={profile.name}
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
              <div
                className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-3 border-gray-900 ${statusColors[profile.hosting_status]}`}
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
                <span className="text-gray-400 text-lg">{profile.age}</span>
              </div>

              <div className="flex items-center gap-4 mt-2 flex-wrap">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <MapPin size={14} />
                  <span>
                    {profile.city}, {profile.country}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Globe size={14} />
                  <span>{profile.country}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <div
                  className={`w-2 h-2 rounded-full ${statusColors[profile.hosting_status]}`}
                />
                <span className={`text-sm font-medium ${statusTextColors[profile.hosting_status]}`}>
                  {statusLabels[profile.hosting_status]}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 sm:flex-col w-full sm:w-auto">
              {profile.hosting_status !== "unavailable" && (
                <button
                  onClick={() => setShowRequestForm(true)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20"
                >
                  <Calendar size={16} />
                  Request Stay
                </button>
              )}
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition-all">
                <MessageCircle size={16} />
                Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Bio */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-3">About</h2>
          <p className="text-gray-300 leading-relaxed">{profile.bio}</p>
        </section>

        {/* Interests */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <InterestBadge key={interest.id} interest={interest} size="md" />
            ))}
          </div>
        </section>

        {/* Languages */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Languages size={18} />
            Languages
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.languages.map((lang) => (
              <span
                key={lang}
                className="text-sm bg-white/5 border border-white/10 text-gray-300 px-3 py-1.5 rounded-lg"
              >
                {lang}
              </span>
            ))}
          </div>
        </section>

        {/* Member since */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-3">Member Info</h2>
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar size={14} />
            <span>
              Member since{" "}
              {new Date(profile.created_at).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </section>

        <StayReviews hostId={profileId} hostName={profile.name} />
      </div>

      {/* Stay Request Modal */}
      <AnimatePresence>
        {showRequestForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowRequestForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-gray-900 border border-white/10 rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Request a Stay</h3>
                <button
                  onClick={() => setShowRequestForm(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-6 bg-white/5 rounded-xl p-3">
                <Image
                  src={profile.avatar_url}
                  alt={profile.name}
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <div>
                  <p className="text-white font-medium">{profile.name}</p>
                  <p className="text-gray-400 text-sm">
                    {profile.city}, {profile.country}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">Arrive</label>
                    <input
                      type="date"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">Depart</label>
                    <input
                      type="date"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-1">
                    Message to {profile.name}
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Hi ${profile.name}! I'd love to stay at your place...`}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-500/50 resize-none placeholder:text-gray-600"
                  />
                </div>

                <button
                  onClick={handleSendRequest}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-medium hover:from-cyan-400 hover:to-blue-500 transition-all"
                >
                  <Send size={16} />
                  Send Request
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success notification */}
      <AnimatePresence>
        {requestSent && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 bg-green-900/80 backdrop-blur-xl border border-green-500/30 rounded-xl px-5 py-3 flex items-center gap-3 shadow-lg"
          >
            <CheckCircle size={20} className="text-green-400" />
            <p className="text-white font-medium">Stay request sent to {profile.name}!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
