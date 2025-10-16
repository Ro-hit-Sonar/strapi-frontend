import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StrapiArticle, getImageUrl, formatDate } from "@/lib/api";

interface BlogCardProps {
  article: StrapiArticle;
}

export function BlogCard({ article }: BlogCardProps) {
  const coverImage = getImageUrl(article.cover);

  return (
    <Link href={`/blog/${article.slug}`}>
      <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
        {coverImage && coverImage.trim() !== "" && (
          <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
            <Image
              src={coverImage}
              alt={article.cover?.alternativeText || article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            {article.category && (
              <Badge variant="secondary" className="text-xs">
                {article.category.name}
              </Badge>
            )}
            <span className="text-sm text-muted-foreground">
              {formatDate(article.publishedAt)}
            </span>
          </div>
          <h3 className="text-xl font-semibold line-clamp-2">
            {article.title}
          </h3>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground line-clamp-3">
            {article.description}
          </p>
        </CardContent>

        <CardFooter>
          <div className="flex items-center gap-2 w-full">
            <span className="text-sm text-muted-foreground">
              By {article.author?.name || "Unknown Author"}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
