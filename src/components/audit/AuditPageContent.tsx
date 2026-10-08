"use client";

import Link from "next/link";
import { useState } from "react";
import type { Lang } from "@/content/audit/checks";
import { t } from "@/content/audit/translations";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AuditTool } from "./AuditTool";

export function AuditPageContent() {
  const [lang, setLang] = useState<Lang>("fr");
  const ui = t(lang);
  return (
    <main lang={lang}>
      <section className="audit-hero">
        <Breadcrumbs homeLabel={ui.homeLabel} navLabel={ui.breadcrumbNavLabel} items={[{ label: ui.breadcrumbLabel }]} />
        <p className="eyebrow"><span /> {ui.pageKicker}</p>
        <h1>{ui.heroTitleParts[0]}<br /><em>{ui.heroTitleParts[1]}</em></h1>
        <p className="hero-lead">{ui.pageIntro}</p>
      </section>
      <AuditTool lang={lang} onLangChange={setLang} />
      <section className="audit-feature-grid">
        {ui.featureCards.map(card => (
          <article key={card.kicker}>
            <p className="section-kicker">{card.kicker}</p>
            <h2>{card.title[0]}<br /><em>{card.title[1]}</em></h2>
            <p>{card.description}</p>
          </article>
        ))}
      </section>
      <section className="faq">
        <div><p className="section-kicker">{ui.faqKicker}</p><h2>{ui.faqTitle[0]}<br /><em>{ui.faqTitle[1]}</em></h2></div>
        <div className="faq-list">
          {ui.faq.map(item => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}
        </div>
      </section>
      <section className="soft-cta"><p>{ui.ctaTitle}</p><Link className="button primary" href="/contact">{ui.ctaButton} <span>↗</span></Link></section>
    </main>
  );
}
