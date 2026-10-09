import type { Metadata } from "next";
import { openGraphDefaults } from "@/content/metadata";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { articles } from "@/content/articles";

export const metadata: Metadata = {
  title: "Blog : conseils SEO et création web",
  description: "Guides pratiques sur le référencement SEO, la création de sites web et la performance, rédigés par Sébastien pour les entreprises de Suisse romande.",
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": [{ url: "/blog/feed.xml", title: "Blog SebWebSwiss" }] },
  },
  openGraph: { ...openGraphDefaults, url: "https://sebwebswiss.ch/blog" },
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-CH", { day: "numeric", month: "long", year: "numeric" });

export default function Page() {
  return <><Header/><main>
    <PageHero
      kicker="BLOG · CONSEILS WEB & SEO"
      crumbs={[{label:"Blog"}]}
      title={<>Conseils web, SEO<br/><em>et performance.</em></>}
      intro="Des guides pratiques pour comprendre le référencement, créer un site qui fonctionne et éviter les pièges coûteux."
      primary={{label:"Me contacter",href:"/contact"}}
    />
    <section className="content-section"><div className="content-label">ARTICLES</div><div>
      <h2>Des réponses claires<br/><em>pour vos questions digitales.</em></h2>
      {articles.length === 0 ? (
        <div className="blog-empty">
          <p>Je publie ici des articles pour vous aider à décider avec clarté. Les premiers guides arrivent prochainement. En attendant, posez-moi votre question directement.</p>
          <a className="text-link" href="/contact">Posez votre question ↗</a>
        </div>
      ) : (
        <ul className="article-list">
          {articles.map((a) => (
            <li className="article-card" key={a.slug}>
              <a href={`/blog/${a.slug}`}>
                <div className="article-card-meta">
                  <span className="kicker">{a.kicker}</span>
                  <span className="dot">·</span>
                  <time dateTime={a.datePublished}>{formatDate(a.datePublished)}</time>
                </div>
                <h3>{a.title}</h3>
                <p>{a.excerpt}</p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div></section>
    <section className="soft-cta"><p>Une question sur votre présence en ligne ?</p><a className="button primary" href="/contact">Me contacter <span>↗</span></a></section>
  </main><Footer /></>;
}
