"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Globe,
  Edit,
  MapPin,
  Calendar,
  MessageCircle,
  Users,
  ArrowRight,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const MOCK_REQUESTS = [
  {
    id: "1",
    name: "Emma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    country: "Thailand",
    city: "Chiang Mai",
    dates: "Jul 15 - Jul 20",
    status: "pending" as const,
    message: "Hey! I'd love to stay at your place while exploring Chiang Mai!",
  },
  {
    id: "2",
    name: "Lucas",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    country: "Vietnam",
    city: "Ho Chi Minh City",
    dates: "Aug 1 - Aug 5",
    status: "accepted" as const,
    message: "Can't wait to visit! I'll bring some local snacks from Portugal.",
  },
  {
    id: "3",
    name: "Sophia",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
    country: "Indonesia",
    city: "Bali",
    dates: "Jul 25 - Jul 28",
    status: "declined" as const,
    message: "Looking for a surf buddy and a place to crash in Bali!",
  },
];

export default function DashboardPage() {
  const [requests] = useState(MOCK_REQUESTS);

  const statusConfig = {
    pending: {
      icon: Clock,
      label: "Pending",
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    accepted: {
      icon: CheckCircle,
      label: "Accepted",
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    declined: {
      icon: XCircle,
      label: "Declined",
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Manage your stays and hosting</p>
        </div>
        <Link
          href="/profile/edit"
          className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl text-sm hover:bg-white/10 transition-all"
        >
          <Edit size={14} />
          Edit Profile
        </Link>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Countries Visited", value: "12", icon: Globe, color: "from-cyan-500 to-blue-500" },
          { label: "Stay Requests", value: "8", icon: MessageCircle, color: "from-blue-500 to-purple-500" },
          { label: "Guests Hosted", value: "5", icon: Users, color: "from-purple-500 to-pink-500" },
          { label: "Upcoming Stays", value: "2", icon: Calendar, color: "from-pink-500 to-orange-500" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-5"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon size={18} className="text-white" />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Stay Requests */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-5">Stay Requests</h2>
        <div className="space-y-3">
          {requests.map((request, i) => {
            const config = statusConfig[request.status];
            const StatusIcon = config.icon;

            return (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all"
              >
                <div className="flex items-start gap-4">
                  <Image
                    src={request.avatar}
                    alt={request.name}
                    width={48}
                    height={48}
                    className="rounded-xl"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-white font-semibold">{request.name}</h3>
                      <span
                        className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg ${config.bg} ${config.color}`}
                      >
                        <StatusIcon size={12} />
                        {config.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {request.city}, {request.country}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {request.dates}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">{request.message}</p>

                    {request.status === "pending" && (
                      <div className="flex gap-2 mt-3">
                        <button className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1.5 rounded-lg hover:bg-green-500/20 transition-all">
                          Accept
                        </button>
                        <button className="text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition-all">
                          Decline
                        </button>
                        <button className="text-xs bg-white/5 text-gray-400 border border-white/10 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all">
                          Message
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Quick links */}
      <section>
        <h2 className="text-xl font-bold text-white mb-5">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: "Explore the Globe", href: "/", desc: "Find new destinations" },
            { label: "Search Countries", href: "/search", desc: "Browse all countries" },
            { label: "Edit Your Profile", href: "/profile/edit", desc: "Update your info" },
            { label: "View Your Profile", href: "/profile/demo-1", desc: "See how others see you" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4 hover:border-cyan-500/30 hover:bg-white/8 transition-all"
            >
              <div>
                <p className="text-white font-medium group-hover:text-cyan-300 transition-colors">
                  {link.label}
                </p>
                <p className="text-gray-500 text-sm">{link.desc}</p>
              </div>
              <ArrowRight
                size={16}
                className="text-gray-600 group-hover:text-cyan-400 transition-colors"
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
