import type { Metadata } from "next";
import Link from "next/link";
import { openGraphDefaults } from "@/content/metadata";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de SebWebSwiss : données collectées, Google Analytics, cookies, droits des personnes selon la nLDG (Suisse) et le RGPD.",
  alternates: { canonical: "/confidentialite" },
  openGraph: { ...openGraphDefaults, url: "https://sebwebswiss.ch/confidentialite" },
};

export default function Confidentialite() {
  return <><Header/><main>
    <PageHero
      kicker="CONFIDENTIALITÉ · nLDG · RGPD"
      crumbs={[{label:"Confidentialité"}]}
      title={<>Votre vie privée,<br/><em>expliquée clairement.</em></>}
      intro="Cette page explique quelles données sont collectées sur sebwebswiss.ch, pourquoi, pendant combien de temps, et comment exercer vos droits. Même principe que pour un projet web : des explications claires avant chaque décision."
    />

    <section className="content-section"><div className="content-label">RESPONSABLE</div><div>
      <h2>Qui est responsable<br/><em>du traitement des données ?</em></h2>
      <p>SebWebSwiss — {business.legalName}</p>
      <ul className="check-list">
        <li>{business.address}, {business.postalCode} {business.locality}, {business.country}</li>
        <li>Google : {business.email}</li>
        <li>Téléphone : {business.phoneDisplay}</li>
      </ul>
      <p>Pour toute question relative à vos données, écrivez-nous directement via notre <Link href="/contact">formulaire de contact</Link>.</p>
    </div></section>

    <section className="content-section"><div className="content-label">DONNÉES COLLECTÉES</div><div>
      <h2>Ce que nous collectons<br/><em>et pourquoi.</em></h2>
      <p><strong>Formulaire de contact.</strong> Lorsque vous nous écrivez, nous recevons votre nom, votre adresse e-mail et le contenu de votre message. Ces données servent uniquement à vous répondre. Elles sont traitées par notre prestataire d’envoi d’e-mails (Resend, prestataire de traitement) et ne sont ni vendues ni transmises à des tiers à des fins commerciales.</p>
      <p><strong>Journaux techniques.</strong> L’hébergement (Vercel) enregistre automatiquement des informations techniques : adresse IP, navigateur, page demandée, horodatage. Ces journaux servent à la sécurité et au bon fonctionnement du site.</p>
      <p><strong>Statistiques de fréquentation.</strong> Nous mesurons l’audience avec Google Analytics afin de comprendre quelles pages sont utiles et lesquelles doivent être améliorées.</p>
    </div></section>

    <section className="content-section"><div className="content-label">GOOGLE ANALYTICS</div><div>
      <h2>Google Analytics<br/><em>en toute transparence.</em></h2>
      <p>Ce site utilise Google Analytics (identifiant de mesure {`G-0N3HQK03DF`}), un service d’analyse fourni par Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, États-Unis.</p>
      <ul className="check-list">
        <li>Cookies utilisés : <code>_ga</code> et <code>_ga_*</code> (durée maximale 13 mois)</li>
        <li>Finalité : statistiques de fréquentation agrégées (pages vues, provenance, appareil)</li>
        <li>Données transmises : adresse IP, navigation, identifiant du cookie</li>
        <li>Aucune donnée n’est utilisée à des fins publicitaires ni revendue</li>
      </ul>
      <p><strong>Opt-out :</strong> vous pouvez empêcher la mesure Google Analytics en installant l’extension Google Analytics Opt-out Add-on ou en désactivant les cookies dans votre navigateur.</p>
      <p>Google peut transférer les données vers les États-Unis. Le transfert repose sur les clauses contractuelles types de la Commission européenne. Des informations complémentaires sont disponibles dans la <a href="https://policies.google.com/privacy?hl=fr" target="_blank" rel="noreferrer">politique de confidentialité de Google</a>.</p>
    </div></section>

    <section className="content-section"><div className="content-label">VOS DROITS</div><div>
      <h2>Vos droits<br/><em>sont clairs et gratuits.</em></h2>
      <p>Conformément à la loi fédérale sur la protection des données (nLDG, révision entrée en vigueur en 2023) et, le cas échéant, au RGPD, vous disposez des droits suivants :</p>
      <ul className="check-list">
        <li>Accéder aux données qui vous concernent</li>
        <li>Demander leur rectification ou leur effacement</li>
        <li>Vous opposer à leur traitement ou en demander la limitation</li>
        <li>Retirer votre consentement à tout moment</li>
        <li>Introduire une réclamation auprès du Préposé fédéral à la protection des données</li>
      </ul>
      <p>Une simple demande à <strong>{business.email}</strong> suffit. Nous y répondons sans frais et dans les meilleurs délais.</p>
    </div></section>

    <section className="content-section"><div className="content-label">LIENS EXTERNES</div><div>
      <h2>Liens vers<br/><em>d’autres sites.</em></h2>
      <p>Ce site contient des liens vers nos réseaux sociaux (Facebook, YouTube, TikTok). Ces plateformes ont leurs propres politiques de confidentialité, sur lesquelles nous n’avons aucun contrôle.</p>
      <p className="small-note">Dernière mise à jour : octobre 2026. Nous pouvons modifier cette page si nos outils ou la législation évoluent ; la version en ligne fait foi.</p>
      <div className="hero-actions" style={{ marginTop: 32 }}>
        <Link className="button primary" href="/contact">Nous contacter <span>↗</span></Link>
      </div>
    </div></section>
  </main><Footer /></>;
}
