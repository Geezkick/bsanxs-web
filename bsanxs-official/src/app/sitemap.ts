import type { MetadataRoute } from "next";

const baseUrl = "https://bsanxs-web.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
