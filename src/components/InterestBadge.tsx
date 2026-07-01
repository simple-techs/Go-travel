"use client";

import { Interest } from "@/lib/types";

interface InterestBadgeProps {
  interest: Interest;
  selected?: boolean;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}

export default function InterestBadge({
  interest,
  selected = false,
  onClick,
  size = "md",
}: InterestBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-xl border transition-all duration-200 ${
        sizeClasses[size]
      } ${
        selected
          ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-sm shadow-cyan-500/10"
          : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-300"
      } ${onClick ? "cursor-pointer" : "cursor-default"}`}
    >
      <span>{interest.emoji}</span>
      <span className="font-medium">{interest.name}</span>
    </button>
  );
}
