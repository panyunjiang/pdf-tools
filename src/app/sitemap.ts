import type { MetadataRoute } from "next";

const baseUrl = "https://pdf.aiv.yn.cn";

const tools = [
  { path: "merge", priority: 0.9 },
  { path: "split", priority: 0.9 },
  { path: "compress", priority: 0.9 },
  { path: "pdf-to-image", priority: 0.8 },
  { path: "image-to-pdf", priority: 0.8 },
  { path: "encrypt", priority: 0.8 },
  { path: "rotate", priority: 0.7 },
  { path: "watermark", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const zhPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...tools.map((tool) => ({
      url: `${baseUrl}/${tool.path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: tool.priority,
    })),
  ];

  const enPages = [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...tools.map((tool) => ({
      url: `${baseUrl}/en/${tool.path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: tool.priority,
    })),
  ];

  return [...zhPages, ...enPages];
}
