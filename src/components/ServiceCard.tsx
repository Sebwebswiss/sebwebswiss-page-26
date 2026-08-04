import Link from "next/link";
type Props={number:string; title:string; text:string; href:string};
export function ServiceCard({number,title,text,href}:Props){return <Link href={href} className="service-card service-link"><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><b>↗</b></Link>}
