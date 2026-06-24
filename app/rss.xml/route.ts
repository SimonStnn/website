import { NextResponse } from "next/server";

import { siteConfig } from "@/lib/config";
import { getPosts } from "@/lib/blog";

export const dynamic = "force-static";

export async function GET() {
  const posts = await getPosts();

  const rssItems = posts
    .map((post) => {
      const postUrl = `${siteConfig.url}/blog/${post.slug}`;
      const description = post.description
        ? `<![CDATA[${post.description}]]>`
        : `<![CDATA[Read "${post.title}" on ${siteConfig.name}'s blog.]]>`;

      return [
        `    <item>`,
        `      <title><![CDATA[${post.title}]]></title>`,
        `      <link>${postUrl}</link>`,
        `      <description>${description}</description>`,
        `      <pubDate>${post.date.toUTCString()}</pubDate>`,
        `      <guid isPermaLink="true">${postUrl}</guid>`,
        `    </item>`,
      ].join("\n");
    })
    .join("\n");

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">`,
    `  <channel>`,
    `    <title><![CDATA[${siteConfig.name}'s Blog]]></title>`,
    `    <link>${siteConfig.url}/blog</link>`,
    `    <description><![CDATA[${siteConfig.description}]]></description>`,
    `    <language>en</language>`,
    `    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml" />`,
    rssItems,
    `  </channel>`,
    `</rss>`,
  ].join("\n");

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
