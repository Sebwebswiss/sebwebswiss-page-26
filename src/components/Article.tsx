import Link from "next/link";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { business } from "@/content/business";
import type { Article as ArticleData, ArticleBlock, Inline } from "@/content/articles";
import { articleUrl } from "@/content/articles";

const bylineDate = (article: ArticleData): string =>
  new Date(article.datePublished).toLocaleDateString("fr-CH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const renderInline = (content: Inline[]) =>
  content.map((seg, i) =>
    seg.link ? (
      <a key={i} href={seg.link}>
        {seg.text}
      </a>
    ) : (
      seg.text
    ),
  );

const Block = ({ block }: { block: ArticleBlock }) => {
  switch (block.kind) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "p":
      return <p>{renderInline(block.content)}</p>;
    case "list":
      return (
        <ul className="article-check-list">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "faq":
      return (
        <div className="article-faq">
          <div className="faq-list">
            {block.items.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span>+</span>
                </summary>
                <p>{Array.isArray(a) ? renderInline(a) : a}</p>
              </details>
            ))}
          </div>
        </div>
      );
  }
};

export default function Article({ article }: { article: ArticleData }) {
  const url = articleUrl(article.slug);

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": "Person",
      name: article.author.name,
      url: article.author.url,
    },
    image: article.image,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    publisher: {
      "@id": `${business.url}/#organization`,
    },
    inLanguage: "fr-CH",
  };

  return (
    <>
      <Header />
      <main>
        <JsonLd data={blogPosting} />
        <PageHero
          kicker={article.kicker}
          crumbs={[
            { label: "Blog", href: "/blog" },
            { label: article.title },
          ]}
          title={article.title}
          intro={article.intro}
          primary={{ label: "Me contacter", href: "/contact" }}
        />
        <div className="article-byline">
          <span>
            Par <Link href="/a-propos">{article.author.name}</Link>
          </span>
          <span className="dot">·</span>
          <time dateTime={article.datePublished}>{bylineDate(article)}</time>
          <span className="dot">·</span>
          <span>Blog SebWebSwiss</span>
        </div>
        <article className="article-body">
          {article.sections.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </article>
        <section className="soft-cta">
          <p>
            Un projet, une question ou un avis d’expert&nbsp;?
          </p>
          <a className="button primary" href="/contact">
            Parler de votre projet <span>↗</span>
          </a>
        </section>
      </main>
    </>
  );
}