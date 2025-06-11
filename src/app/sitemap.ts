import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "http://localhost:3001",
      lastModified: new Date(),
    },
    {
      url: "http://localhost:3001/about",
      lastModified: new Date(),
    },
    {
      url: "http://localhost:3001/blog",
      lastModified: new Date(),
    },
  ];
}

/*

Generated  will look like this ~


This XML file does not appear to have any style information associated with it. The document tree is shown below.
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
<loc>http://localhost:3001</loc>
<lastmod>2024-05-30T10:59:49.075Z</lastmod>
</url>
<url>
<loc>http://localhost:3001/about</loc>
<lastmod>2024-05-30T10:59:49.075Z</lastmod>
</url>
<url>
<loc>http://localhost:3001/blog</loc>
<lastmod>2024-05-30T10:59:49.075Z</lastmod>
</url>
</urlset>
*/
