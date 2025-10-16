import { fetchArticles } from "@/lib/api";
import { BlogCard } from "@/components/blog-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function BlogPage() {
  try {
    const response = await fetchArticles();
    const articles = response.data;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8 text-center font-extrabold text-2xl">
          <Link href="/">
          <button>
            Home
          </button>
          </Link>
        </div>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mt-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
              Our Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover insights, stories, and updates from our team. Stay
              informed with the latest content.
            </p>
          </div>

          {/* Articles Grid */}
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <BlogCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-center">No Articles Found</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  There are no published articles at the moment. Check back
                  later!
                </p>
              </CardContent>
            </Card>
          )}

          {/* Stats */}
          {articles.length > 0 && (
            <div className="mt-12 text-center">
              <p className="text-muted-foreground">
                Showing {articles.length} article
                {articles.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching articles:", error);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
              Our Blog
            </h1>

            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-center text-red-600">
                  Error Loading Articles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  We're having trouble loading the articles. Please make sure
                  your Strapi backend is running and accessible.
                </p>
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Expected URL: http://localhost:1337/api/articles
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export const metadata = {
  title: "Blog - AIrocIA",
  description: "Discover insights, stories, and updates from our team.",
};
