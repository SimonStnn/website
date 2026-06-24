import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = post.date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="group overflow-hidden pt-0">
      <CardHeader
        className={cn(
          "from-accent via-muted to-primary bg-gradient-to-br",
          "flex h-48 items-center justify-center px-1 pt-1",
          "text-muted-foreground",
          "transition-all group-hover:p-0"
        )}
      >
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={`Cover image for ${post.title}`}
            width={400}
            height={225}
            className="bg-muted/60 h-full w-full rounded-t-md object-cover transition-all group-hover:rounded-t-lg"
          />
        ) : (
          <div className="bg-muted/60 flex h-full w-full items-center justify-center rounded-t-md transition-all group-hover:rounded-t-lg">
            <span className="text-4xl">✍️</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="grow">
        <p className="text-muted-foreground mb-1 text-xs">
          {formattedDate} · {post.readingTime} min read
        </p>
        <CardTitle className="mb-1 text-lg">{post.title}</CardTitle>
        <CardDescription title={post.description}>{post.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" size="sm" className="w-full" asChild>
          <Link href={`/blog/${post.slug}`}>Read Post</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
