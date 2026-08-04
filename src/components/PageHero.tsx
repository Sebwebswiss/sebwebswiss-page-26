import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

type Props = { kicker: string; title: React.ReactNode; intro: string; crumbs: { label: string; href?: string }[]; primary?: { label: string; href: string }; secondary?: { label: string; href: string } };
export function PageHero({ kicker, title, intro, crumbs, primary, secondary }: Props) {
 return <section className="page-hero"><Breadcrumbs items={crumbs}/><p className="eyebrow"><span /> {kicker}</p><h1>{title}</h1><p>{intro}</p><div className="hero-actions">{primary && <Link className="button primary" href={primary.href}>{primary.label} <span>↗</span></Link>}{secondary && <Link className="button ghost" href={secondary.href}>{secondary.label} <span>↓</span></Link>}</div></section>
}
