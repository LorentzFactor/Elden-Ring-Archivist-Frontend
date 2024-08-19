import { json } from "@remix-run/node";
import { LoaderFunction } from "@remix-run/node";
import createRedisClient from '../utils/redisClient';

const searchToXMLSiteMap = async () => {
  const redisClient = await createRedisClient();
  // Fetch all ips and convert them to the key used to store searches
  const ips = await redisClient.sMembers("known_ips").then(ips => ips.map(ip => `searches:by_ip:${ip}`));
  // Fetch all searches for each ip
  const searches = await redisClient.sUnion(ips);
  // Close the connection to the redis server
  await redisClient.disconnect();
  // url encode each search and conver them to urls
  const urls = searches.map(search => `https://the-silver-tear.com/search/${encodeURIComponent(search)}`);
  // Lastly, convert the urls to an xml block
  const urlsAsXml= urls.map(url => `<url><loc>${url}</loc><priority>0.5</priority></url>`).join('\n');

  return urlsAsXml;
}

export let loader: LoaderFunction = async () => {
  const urlsAsXml = await searchToXMLSiteMap();
  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://the-silver-tear.com/search</loc>
        <lastmod>2024-08-01</lastmod>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://the-silver-tear.com/about</loc>
        <lastmod>2024-08-01</lastmod>
        <priority>0.8</priority>
      </url>
      ${urlsAsXml}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
};
