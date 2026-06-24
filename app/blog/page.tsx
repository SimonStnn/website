import { getPosts } from "@/lib/blog";
import BlogCard from "@/components/blog-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Project write-ups, technical notes, and the occasional opinion.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <section className="scroll-mt-16 px-4 py-16 md:px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-3xl font-bold">Blog</h1>
        <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center text-lg">
          Project write-ups, technical notes, and the occasional opinion.
        </p>

        {posts.length === 0 ? (
          <p className="text-muted-foreground text-center">No posts yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
