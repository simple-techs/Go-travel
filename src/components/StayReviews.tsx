"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Star, Camera, X, Send, Trash2, ImageOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/lib/supabase/use-user";
import DatePicker from "@/components/DatePicker";

interface Review {
  id: string;
  author_id: string;
  rating: number;
  body: string;
  photos: string[];
  stayed_at: string | null;
  created_at: string;
  author: { name: string; avatar_url: string | null } | null;
}

const MAX_PHOTOS = 4;

function Stars({
  value,
  onChange,
  size = 16,
}: {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
}) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={!onChange}
          onClick={() => onChange?.(n)}
          className={onChange ? "hover:scale-110 transition-transform" : "cursor-default"}
        >
          <Star
            size={size}
            className={n <= value ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}
          />
        </button>
      ))}
    </div>
  );
}

export default function StayReviews({
  hostId,
  hostName,
}: {
  hostId: string;
  hostName: string;
}) {
  const pathname = usePathname();
  const { user, supabase, loading: userLoading } = useUser();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");
  const [stayedAt, setStayedAt] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const loadReviews = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const { data, error: loadError } = await supabase
      .from("stay_reviews")
      .select(
        "id, author_id, rating, body, photos, stayed_at, created_at, author:profiles(name, avatar_url)"
      )
      .eq("host_id", hostId)
      .order("created_at", { ascending: false });
    if (loadError) {
      setError(`Could not load reviews: ${loadError.message}`);
    } else if (data) {
      setReviews(
        data.map((r) => ({
          ...r,
          author: Array.isArray(r.author) ? r.author[0] ?? null : r.author,
        }))
      );
    }
    setLoading(false);
  }, [supabase, hostId]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [files]);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    setFiles((prev) => [...prev, ...Array.from(list)].slice(0, MAX_PHOTOS));
  };

  const resetForm = () => {
    setShowForm(false);
    setRating(5);
    setBody("");
    setStayedAt("");
    setFiles([]);
    setError("");
  };

  const handleSubmit = async () => {
    if (!supabase || !user) return;
    if (!body.trim()) {
      setError("Tell others a bit about your stay.");
      return;
    }
    setSubmitting(true);
    setError("");

    const photoUrls: string[] = [];
    for (const file of files) {
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${user.id}/${hostId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("review-photos")
        .upload(path, file, { contentType: file.type });
      if (uploadError) {
        setError(`Photo upload failed: ${uploadError.message}`);
        setSubmitting(false);
        return;
      }
      photoUrls.push(supabase.storage.from("review-photos").getPublicUrl(path).data.publicUrl);
    }

    const { error: insertError } = await supabase.from("stay_reviews").insert({
      host_id: hostId,
      author_id: user.id,
      rating,
      body: body.trim(),
      photos: photoUrls,
      stayed_at: stayedAt || null,
    });

    setSubmitting(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    resetForm();
    loadReviews();
  };

  const handleDelete = async (id: string) => {
    if (!supabase) return;
    await supabase.from("stay_reviews").delete().eq("id", id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const average =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold text-white">Stays & Reviews</h2>
          {reviews.length > 0 ? (
            <div className="flex items-center gap-2 mt-1">
              <Stars value={Math.round(average)} />
              <span className="text-sm text-gray-400">
                {average.toFixed(1)} · {reviews.length}{" "}
                {reviews.length === 1 ? "stay" : "stays"}
              </span>
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-1">No one has reviewed a stay yet.</p>
          )}
        </div>

        {!userLoading &&
          (user ? (
            !showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-cyan-400 hover:to-blue-500 transition-all"
              >
                I stayed here
              </button>
            )
          ) : (
            <Link
              href={`/auth/sign-in?next=${encodeURIComponent(pathname)}`}
              className="text-sm text-cyan-400 hover:text-cyan-300"
            >
              Sign in to review a stay
            </Link>
          ))}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5 text-sm text-red-400 mb-4">
          {error}
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0, overflow: "hidden" }}
            animate={{ opacity: 1, height: "auto", overflow: "visible" }}
            exit={{ opacity: 0, height: 0, overflow: "hidden" }}
          >
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6 space-y-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <label className="text-sm text-gray-400 block mb-1.5">Your rating</label>
                  <Stars value={rating} onChange={setRating} size={22} />
                </div>
                <div>
                  <label className="text-sm text-gray-400 block mb-1.5">When did you stay?</label>
                  <DatePicker value={stayedAt} onChange={setStayedAt} />
                </div>
              </div>

              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value.slice(0, 1000))}
                placeholder={`How was your stay with ${hostName}? What did you do together?`}
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 placeholder:text-gray-600 resize-none"
              />

              <div>
                <div className="flex flex-wrap gap-3">
                  {previews.map((src, i) => (
                    <div key={src} className="relative w-20 h-20 rounded-lg overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                        className="absolute top-1 right-1 bg-black/70 rounded-full p-0.5 text-white"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  {files.length < MAX_PHOTOS && (
                    <label className="w-20 h-20 rounded-lg border-2 border-dashed border-white/20 hover:border-cyan-500/40 flex flex-col items-center justify-center text-gray-500 hover:text-cyan-400 cursor-pointer transition-colors">
                      <Camera size={18} />
                      <span className="text-[10px] mt-1">Add photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          addFiles(e.target.files);
                          e.target.value = "";
                        }}
                      />
                    </label>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-2">Up to {MAX_PHOTOS} photos, 5 MB each</p>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-sm text-gray-400 hover:text-white px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex items-center gap-2 text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-50"
                >
                  <Send size={14} />
                  {submitting ? "Posting..." : "Post review"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="space-y-4">
          {[0, 1].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-5">
          {reviews.map((review) => (
            <article key={review.id} className="border-t border-white/5 pt-5 first:border-t-0 first:pt-0">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/40 to-blue-600/40 flex items-center justify-center text-white font-semibold text-sm overflow-hidden shrink-0">
                  {review.author?.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={review.author.avatar_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    (review.author?.name || "?").charAt(0).toUpperCase()
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div>
                      <p className="text-white font-medium">
                        {review.author?.name || "A traveler"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {review.stayed_at
                          ? `Stayed ${new Date(`${review.stayed_at}T00:00:00`).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}`
                          : `Posted ${new Date(review.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Stars value={review.rating} size={14} />
                      {user?.id === review.author_id && (
                        <button
                          onClick={() => handleDelete(review.id)}
                          className="text-gray-600 hover:text-red-400 transition-colors"
                          title="Delete review"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mt-2 whitespace-pre-line">
                    {review.body}
                  </p>
                  {review.photos.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {review.photos.map((url) => (
                        <button
                          key={url}
                          type="button"
                          onClick={() => setLightbox(url)}
                          className="w-24 h-24 rounded-lg overflow-hidden ring-1 ring-white/10 hover:ring-cyan-500/50 transition-all"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={url} alt="Stay photo" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
          {!supabase && (
            <p className="flex items-center gap-2 text-sm text-gray-500">
              <ImageOff size={14} />
              Reviews are unavailable in demo mode.
            </p>
          )}
        </div>
      )}

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-4 right-4 text-white/70 hover:text-white">
              <X size={28} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lightbox} alt="Stay photo" className="max-w-full max-h-full rounded-xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
