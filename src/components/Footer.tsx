import Link from "next/link";
import { CookieSettings } from "@/components/CookieSettings";

export function Footer(){return <footer><p>© {new Date().getFullYear()} SebWebSwiss. Tous droits réservés.</p><div><Link href="/confidentialite">Confidentialité</Link><CookieSettings /><Link href="/contact">Contact</Link></div></footer>}
