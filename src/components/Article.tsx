import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
    case "callout":
      return (
        <aside className="article-callout">
          <b>{block.title}</b>
          <p>{renderInline(block.content)}</p>
        </aside>
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
      sameAs: [business.social.linkedin, business.social.x, business.social.facebook, business.social.youtube, business.social.tiktok],
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
        <aside className="author-box">
          <p className="author-name">Sébastien <span>— fondateur de SebWebSwiss</span></p>
          <p className="author-bio">Création web, SEO technique et visibilité locale en Suisse romande. Chaque article est écrit et vérifié par la même personne qui réalise les projets.</p>
          <p className="author-links">
            <Link href="/a-propos">À propos</Link>
            <a href={business.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </p>
        </aside>
        <section className="soft-cta">
          <p>
            Un projet, une question ou un avis d’expert&nbsp;?
          </p>
          <a className="button primary" href="/contact">
            Parler de votre projet <span>↗</span>
          </a>
        </section>
        <section className="article-follow">
          <div>
            <div>
              <p className="follow-title">Suivez SebWebSwiss</p>
              <p className="follow-note">Un article utile quand il sort, pas plus.</p>
            </div>
            <div className="follow-links">
              <a href="/blog/feed.xml">RSS</a>
              <a href={business.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={business.social.x} target="_blank" rel="noreferrer">X</a>
              <a href={business.social.facebook} target="_blank" rel="noreferrer">Facebook</a>
              <a href={business.social.youtube} target="_blank" rel="noreferrer">YouTube</a>
              <a href={business.social.tiktok} target="_blank" rel="noreferrer">TikTok</a>
            </div>
          </div>
        </section>
      </main><Footer />
    </>
  );
}