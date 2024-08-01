import { json } from "@remix-run/node";
import { LoaderFunction } from "@remix-run/node";

export let loader: LoaderFunction = async () => {
  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://the-silver-tear.com/search/</loc>
        <lastmod>2024-08-01</lastmod>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://the-silver-tear.com/about/</loc>
        <lastmod>2024-08-01</lastmod>
        <priority>0.8</priority>
      </url>
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
};
