// API configuration and utilities for Strapi integration

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: string | null;
      width: number;
      height: number;
      size: number;
      sizeInBytes: number;
      url: string;
    };
    small?: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: string | null;
      width: number;
      height: number;
      size: number;
      sizeInBytes: number;
      url: string;
    };
    medium?: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: string | null;
      width: number;
      height: number;
      size: number;
      sizeInBytes: number;
      url: string;
    };
    large?: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: string | null;
      width: number;
      height: number;
      size: number;
      sizeInBytes: number;
      url: string;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiAuthor {
  id: number;
  documentId: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiArticle {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  cover: StrapiMedia | null;
  author: StrapiAuthor | null;
  category: StrapiCategory | null;
  blocks: any[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// API functions
export async function fetchArticles(): Promise<
  StrapiResponse<StrapiArticle[]>
> {
  const response = await fetch(`${STRAPI_URL}/api/articles?populate=*`, {
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  return response.json();
}

export async function fetchArticle(
  slug: string
): Promise<StrapiResponse<StrapiArticle>> {
  const response = await fetch(
    `${STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`,
    {
      next: { revalidate: 60 }, // Cache for 60 seconds
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch article");
  }

  const result = await response.json();

  if (result.data.length === 0) {
    throw new Error("Article not found");
  }

  return {
    data: result.data[0],
    meta: result.meta,
  };
}

export function getImageUrl(image: StrapiMedia | null): string | null {
  if (!image || !image.url || image.url.trim() === "") return null;

  const url = image.url;
  if (url.startsWith("http")) {
    return url;
  }

  return `${STRAPI_URL}${url}`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
