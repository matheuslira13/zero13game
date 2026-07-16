import type { MetadataRoute } from "next";
import { siteDescription, siteName } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: "Zero13",
    description: siteDescription,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#000a24",
    theme_color: "#f4c11a",
    icons: [
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
