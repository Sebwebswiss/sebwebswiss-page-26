import Link from "next/link";
import { MenuToggle } from "./MenuToggle";
import { navLinks } from "./nav";
export function Header(){return <header className="site-header"><Link href="/" className="brand" aria-label="SebWebSwiss - Accueil">Seb<span>Web</span>Swiss<i>.</i></Link><nav className="desktop-nav" aria-label="Navigation principale">{navLinks.map(l=><Link key={l.href} href={l.href}>{l.label}</Link>)}</nav><Link className="header-cta desktop-cta" href="/contact">Demander un devis <span>↗</span></Link><MenuToggle/></header>}