import Link from "next/link";
import { navLinks } from "./nav";

export function MenuToggle() {
  return (
    <details className="menu-details">
      <summary className="menu-toggle" aria-label="Ouvrir le menu">
        <span />
        <span />
      </summary>
      <div id="mobile-navigation" className="mobile-menu">
        <nav aria-label="Navigation mobile">
          {navLinks.map((l, i) => (
            <Link key={l.href} href={l.href} style={{ transitionDelay: `${i * 55}ms` }}>
              <span>0{i + 1}</span>
              {l.label}
              <b>↗</b>
            </Link>
          ))}
          <Link className="mobile-menu-cta" href="/contact">
            Demander un devis <span>↗</span>
          </Link>
        </nav>
        <p>Lausanne · Vaud · Suisse romande</p>
      </div>
    </details>
  );
}