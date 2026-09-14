import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Article from "@/components/Article";
import { getArticle, getArticleSlugs, articleUrl } from "@/content/articles";

export const dynamicParams = false;

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const url = articleUrl(article.slug);

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: "article",
      siteName: "SebWebSwiss",
      locale: "fr_CH",
      title: article.title,
      description: article.description,
      url,
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: [article.author.url],
      images: [{ url: article.image, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.image],
    },
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return <Article article={article} />;
}