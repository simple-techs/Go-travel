"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function toKey(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function fromKey(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export default function DatePicker({
  value,
  onChange,
  placeholder = "Select a date",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = value ? fromKey(value) : null;
  const [view, setView] = useState(() => {
    const base = selected ?? new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const firstWeekday = view.getDay();
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1)),
  ];

  const shiftMonth = (delta: number) =>
    setView(new Date(view.getFullYear(), view.getMonth() + delta, 1));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm hover:border-cyan-500/50 focus:outline-none focus:border-cyan-500/50 transition-colors min-w-[180px]"
      >
        <Calendar size={14} className="text-gray-400" />
        <span className={selected ? "text-white" : "text-gray-500"}>
          {selected
            ? selected.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
            : placeholder}
        </span>
        <ChevronDown size={14} className={`ml-auto text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.12 }}
            className="absolute z-30 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-2">
              <button type="button" onClick={() => shiftMonth(-1)} className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10">
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm font-medium text-white">
                {view.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </span>
              <button
                type="button"
                onClick={() => shiftMonth(1)}
                disabled={view.getFullYear() === today.getFullYear() && view.getMonth() === today.getMonth()}
                className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-0.5 text-center">
              {WEEKDAYS.map((d) => (
                <span key={d} className="text-[11px] text-gray-500 py-1">
                  {d}
                </span>
              ))}
              {cells.map((d, i) => {
                if (!d) return <span key={`e-${i}`} />;
                const key = toKey(d);
                const isSelected = value === key;
                const isFuture = d > today;
                const isToday = key === toKey(today);
                return (
                  <button
                    key={key}
                    type="button"
                    disabled={isFuture}
                    onClick={() => {
                      onChange(key);
                      setOpen(false);
                    }}
                    className={`h-8 w-8 mx-auto rounded-md text-sm transition-colors ${
                      isSelected
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium"
                        : isFuture
                          ? "text-gray-700 cursor-not-allowed"
                          : "text-gray-300 hover:bg-white/10 hover:text-white"
                    } ${isToday && !isSelected ? "ring-1 ring-cyan-500/50" : ""}`}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>

            {value && (
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
                className="mt-2 w-full text-xs text-gray-500 hover:text-gray-300 py-1"
              >
                Clear
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
