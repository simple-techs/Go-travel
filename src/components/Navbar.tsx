"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, User, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Explore", icon: Globe },
  { href: "/search", label: "Search", icon: Search },
  { href: "/profile", label: "Profile", icon: User },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              G
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              GO
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-cyan-500/10 text-cyan-400"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth/sign-in"
              className="text-sm text-gray-400 hover:text-white transition-colors px-4 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/auth/sign-up"
              className="text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
            >
              Join GO
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-400 hover:text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-cyan-500/10 text-cyan-400"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon size={18} />
                    {label}
                  </Link>
                );
              })}
              <hr className="border-white/5 my-2" />
              <Link
                href="/auth/sign-in"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm text-gray-400 hover:text-white"
              >
                Sign In
              </Link>
              <Link
                href="/auth/sign-up"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-center font-medium"
              >
                Join GO
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
