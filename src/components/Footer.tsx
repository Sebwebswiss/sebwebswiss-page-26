import Link from "next/link";

export function Footer(){return <footer><p>© {new Date().getFullYear()} SebWebSwiss. Tous droits réservés.</p><div><Link href="/confidentialite">Confidentialité</Link><Link href="/contact">Contact</Link></div></footer>}
