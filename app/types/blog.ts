/**
 * TypeScript type definitions for blog-related data structures
 * Used throughout the FitTrack Blog application for type safety and IntelliSense
 */

/**
 * Represents an author of blog posts
 */
export interface Author {
  /** Unique identifier for the author */
  id: string;
  /** Full name of the author */
  name: string;
  /** Author's profile image URL */
  avatar?: string;
  /** Short biography of the author */
  bio?: string;
  /** Author's social media links */
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

/**
 * Blog post categories for content organization and SEO
 */
export type BlogCategory = 
  | 'workout-tips'
  | 'nutrition'
  | 'beginner-guide'
  | 'muscle-building'
  | 'cardio'
  | 'recovery'
  | 'supplements'
  | 'motivation'
  | 'equipment'
  | 'form-technique';

/**
 * Represents a complete blog post with all metadata
 * Used for both static generation and runtime rendering
 */
export interface BlogPost {
  /** Unique identifier for the blog post */
  id: string;
  /** SEO-optimized title (50-60 characters) */
  title: string;
  /** URL-friendly slug for routing */
  slug: string;
  /** Brief description for listings (150-200 characters) */
  excerpt: string;
  /** Full blog post content in HTML or Markdown */
  content: string;
  /** Publication date in ISO format */
  publishedAt: string;
  /** Last updated date in ISO format */
  updatedAt?: string;
  /** Author information */
  author: Author;
  /** Post categories for filtering and SEO */
  categories: BlogCategory[];
  /** Searchable tags */
  tags: string[];
  /** Featured image for social sharing and listings */
  featuredImage: {
    /** Image URL */
    url: string;
    /** Alt text for accessibility */
    alt: string;
    /** Image width in pixels */
    width?: number;
    /** Image height in pixels */
    height?: number;
  };
  /** SEO meta description (150-160 characters) */
  metaDescription: string;
  /** Estimated reading time in minutes */
  readTime: number;
  /** Whether the post is published */
  isPublished: boolean;
  /** Whether the post is featured */
  isFeatured?: boolean;
  /** View count for analytics */
  views?: number;
  /** Related post IDs for recommendations */
  relatedPosts?: string[];
}

/**
 * Represents a simplified blog post for listings
 * Used in blog cards and previews to reduce data transfer
 */
export interface BlogPostPreview {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  author: Pick<Author, 'name' | 'avatar'>;
  categories: BlogCategory[];
  featuredImage: BlogPost['featuredImage'];
  readTime: number;
  views?: number;
}

/**
 * Blog post filtering and sorting options
 * Used for search and category filtering functionality
 */
export interface BlogFilters {
  /** Filter by categories */
  categories?: BlogCategory[];
  /** Filter by tags */
  tags?: string[];
  /** Filter by author */
  authorId?: string;
  /** Search query */
  search?: string;
  /** Sort options */
  sortBy?: 'publishedAt' | 'views' | 'readTime' | 'title';
  /** Sort direction */
  sortOrder?: 'asc' | 'desc';
  /** Pagination */
  page?: number;
  /** Items per page */
  limit?: number;
}

/**
 * Blog post metadata for SEO and social sharing
 * Used in page head tags and Open Graph meta tags
 */
export interface BlogPostMeta {
  title: string;
  description: string;
  canonicalUrl: string;
  openGraph: {
    title: string;
    description: string;
    image: string;
    type: 'article';
    publishedTime: string;
    modifiedTime?: string;
    author: string;
    section: string;
    tags: string[];
  };
  twitter: {
    card: 'summary_large_image';
    title: string;
    description: string;
    image: string;
    creator?: string;
  };
  structuredData: {
    '@context': 'https://schema.org';
    '@type': 'Article';
    headline: string;
    description: string;
    image: string;
    author: {
      '@type': 'Person';
      name: string;
    };
    publisher: {
      '@type': 'Organization';
      name: string;
      logo: {
        '@type': 'ImageObject';
        url: string;
      };
    };
    datePublished: string;
    dateModified?: string;
    wordCount: number;
  };
}