import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPosts, getPostBySlug } from "@/lib/blog";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/lib/config";

// Generate static params for all posts at build time
export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const description = post.description || `Read "${post.title}" on ${siteConfig.name}'s blog.`;
  const imageUrl = post.coverImage ?? "/images/profile-meta.jpg";

  return {
    title: post.title,
    description,
    openGraph: {
      type: "article",
      locale: "en_US",
      url: `${siteConfig.url}/blog/${post.slug}`,
      title: `${post.title} | ${siteConfig.name}`,
      description,
      publishedTime: post.date.toISOString(),
      authors: [siteConfig.author.name],
      images: [
        {
          url: imageUrl,
          alt: post.title,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${siteConfig.name}`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = post.date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="scroll-mt-16 px-4 py-16 md:px-6">
      <div className="container mx-auto max-w-4xl">
        <Button variant="link" className="mb-6 !px-0" asChild>
          <Link href="/blog" className="text-primary hover:underline">
            <ArrowLeft />
            Back to Blog
          </Link>
        </Button>

        <h1 className="mb-3 text-4xl font-bold">{post.title}</h1>

        <p className="text-muted-foreground mb-8 text-sm">
          {formattedDate} · {post.readingTime} min read
        </p>

        {post.coverImage && (
          <div className="mb-8 overflow-hidden rounded-lg">
            <Image
              src={post.coverImage}
              alt={`Cover image for ${post.title}`}
              width={1200}
              height={630}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        )}

        <div className="prose dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </div>
      </div>
    </section>
  );
}
