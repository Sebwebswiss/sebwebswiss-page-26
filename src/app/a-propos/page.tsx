import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";

export const metadata:Metadata={title:"À propos de SebWebSwiss",description:"SebWebSwiss accompagne les entreprises de Suisse romande dans leurs projets web et SEO.",alternates:{canonical:"/a-propos"}};
export default function About(){return <><Header/><main><PageHero kicker="À PROPOS · SUISSE ROMANDE" crumbs={[{label:"À propos"}]} title={<>Une collaboration directe,<br/><em>des décisions utiles.</em></>} intro="SebWebSwiss accompagne les indépendants, PME et entreprises qui veulent faire de leur présence digitale un outil clair et durable." primary={{label:"Nous contacter",href:"/contact"}}/><section className="content-section"><div className="content-label">Notre ligne</div><div><h2>Moins de promesses.<br/><em>Plus de méthode.</em></h2><p>Nous privilégions une relation directe, des explications compréhensibles et des solutions adaptées à la réalité de chaque entreprise. Un projet web ou SEO doit être utile à vos clients avant d’être visible sur un écran.</p><p>Basés près de Lausanne, nous accompagnons des projets dans le canton de Vaud et en Suisse romande.</p></div></section></main></>}
