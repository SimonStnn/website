import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import remarkSmartypants from "remark-smartypants";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

export interface BlogPost {
  slug: string;
  lastModified: Date;
  title: string;
  description: string;
  /** ISO date string from frontmatter, e.g. "2026-06-24" */
  date: Date;
  /** Optional cover image path relative to /public */
  coverImage?: string;
  /** Raw markdown body */
  content: string;
  /** Rendered HTML of the markdown body */
  contentHtml: string;
  /** Estimated reading time in minutes */
  readingTime: number;
}

// Path to the blog post files
const blogDirectory = path.join(process.cwd(), "content/blog");

/** Converts a markdown string to an HTML string */
async function markdownToHtml(md: string): Promise<string> {
  const file = await remark()
    .use(remarkGfm)
    .use(remarkEmoji)
    .use(remarkSmartypants)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypePrettyCode, {
      // theme: { dark: "github-dark", light: "github-light" },
    })
    .use(rehypeStringify)
    .process(md);
  return String(file);
}

/** Estimates reading time from raw markdown (~200 wpm) */
function estimateReadingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Reads all blog posts from Markdown files in the content/blog directory.
 * The filename (without .md) is used as the slug.
 * YAML frontmatter holds metadata; the body is the post content in Markdown.
 * Posts are sorted by date, newest first.
 */
export const getPosts = cache(async function getPosts(): Promise<BlogPost[]> {
  // Create directory if it doesn't exist yet
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);

  const posts = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map(async (fileName): Promise<BlogPost | null> => {
        const slug = fileName.replace(/\.md$/, "");
        const filePath = path.join(blogDirectory, fileName);

        let data: Record<string, unknown>;
        let content: string;
        let contentHtml: string;
        try {
          const fileContent = fs.readFileSync(filePath, "utf8");
          const parsed = matter(fileContent);
          data = parsed.data as Record<string, unknown>;
          content = parsed.content;
          contentHtml = await markdownToHtml(content);
        } catch (error) {
          console.error(`Error reading or parsing markdown for blog post ${slug}`, {
            error,
            fileName,
          });
          return null;
        }

        // Ensure frontmatter is an object
        if (typeof data !== "object" || data === null || Array.isArray(data)) {
          console.error(`Invalid frontmatter structure for blog post ${slug}`, { data });
          return null;
        }

        // Validate required frontmatter fields
        if (typeof data.title !== "string" || !data.title) {
          console.error(`Missing or invalid 'title' field for blog post ${slug}`, { data });
          return null;
        }
        if (!data.date) {
          console.error(`Missing 'date' field for blog post ${slug}`, { data });
          return null;
        }

        const date = new Date(data.date as string);
        if (isNaN(date.getTime())) {
          console.error(`Invalid 'date' value for blog post ${slug}`, { date: data.date });
          return null;
        }

        return {
          slug,
          lastModified: fs.statSync(filePath).mtime,
          title: data.title,
          description: typeof data.description === "string" ? data.description : "",
          date,
          coverImage: typeof data.coverImage === "string" ? data.coverImage : undefined,
          content,
          contentHtml,
          readingTime: estimateReadingTime(content),
        };
      })
  );

  // Filter out null entries (invalid files) and sort newest first
  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
});

/**
 * Gets a specific blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
