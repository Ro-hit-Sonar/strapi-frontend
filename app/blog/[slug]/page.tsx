import { fetchArticle, fetchArticles } from "@/lib/api";
import { getImageUrl, formatDate } from "@/lib/api";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const response = await fetchArticles();
    return response.data.map((article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const resolvedParams = await params;
    const response = await fetchArticle(resolvedParams.slug);
    const article = response.data;

    const coverImage = getImageUrl(article.cover);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8">
          <article className="max-w-4xl mx-auto">
            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                {article.category && (
                  <Badge variant="secondary">{article.category.name}</Badge>
                )}
                <span className="text-muted-foreground">
                  {formatDate(article.publishedAt)}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                {article.title}
              </h1>

              <p className="text-xl text-muted-foreground mb-6">
                {article.description}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3 mb-6">
                <div>
                  <p className="font-medium">
                    By {article.author?.name || "Unknown Author"}
                  </p>
                  {article.author?.email && (
                    <p className="text-sm text-muted-foreground">
                      {article.author.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Cover Image */}
            {coverImage && coverImage.trim() !== "" && (
              <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                <Image
                  src={coverImage}
                  alt={article.cover?.alternativeText || article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  priority
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {article.blocks.map((block: any, index: number) => {
                switch (block.__component) {
                  case "shared.rich-text":
                    return (
                      <div
                        key={index}
                        className="mb-6"
                        dangerouslySetInnerHTML={{ __html: block.body }}
                      />
                    );
                  case "shared.quote":
                    return (
                      <blockquote
                        key={index}
                        className="border-l-4 border-primary pl-6 italic my-6 text-lg"
                      >
                        <p className="mb-2">"{block.body}"</p>
                        {block.title && (
                          <footer className="text-sm text-muted-foreground">
                            — {block.title}
                          </footer>
                        )}
                      </blockquote>
                    );
                  case "shared.media":
                    const mediaImage = getImageUrl(block.file);
                    return mediaImage && mediaImage.trim() !== "" ? (
                      <div key={index} className="my-8">
                        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
                          <Image
                            src={mediaImage}
                            alt={block.file?.alternativeText || "Article media"}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                          />
                        </div>
                        {block.file?.caption && (
                          <p className="text-sm text-muted-foreground text-center mt-2">
                            {block.file.caption}
                          </p>
                        )}
                      </div>
                    ) : null;
                  default:
                    return (
                      <div key={index} className="my-6">
                        <pre className="text-sm text-muted-foreground bg-muted p-4 rounded">
                          {JSON.stringify(block, null, 2)}
                        </pre>
                      </div>
                    );
                }
              })}
            </div>

            {/* Back to Blog Link */}
            <div className="mt-12 pt-8 border-t">
              <a
                href="/blog"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                ← Back to Blog
              </a>
            </div>
          </article>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching article:", error);
    notFound();
  }
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  try {
    const resolvedParams = await params;
    const response = await fetchArticle(resolvedParams.slug);
    const article = response.data;

    return {
      title: `${article.title} - AIrocIA Blog`,
      description: article.description,
      openGraph: {
        title: article.title,
        description: article.description,
        images: article.cover ? [getImageUrl(article.cover)] : [],
      },
    };
  } catch (error) {
    return {
      title: "Article Not Found - AIrocIA Blog",
      description: "The requested article could not be found.",
    };
  }
}
