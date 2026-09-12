import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GO - Free Stays for Backpackers",
    short_name: "GO",
    description:
      "Spin the globe, find your people, stay for free. The backpacker community platform.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#050a15",
    theme_color: "#050a15",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
