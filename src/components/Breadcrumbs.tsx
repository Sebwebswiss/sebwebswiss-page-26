import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const base = "https://sebwebswiss.ch";
  const itemListElement = [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${base}/` },
    ...items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 2,
      name: item.label,
      ...(item.href ? { item: `${base}${item.href}` } : {}),
    })),
  ];
  const schema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement };
  return (
    <>
      <JsonLd data={schema} />
      <nav className="breadcrumbs" aria-label="Fil d'Ariane"><Link href="/">Accueil</Link>{items.map((item) => <span key={item.label}>/ {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}</span>)}</nav>
    </>
  );
}
