export type Location = {
  slug: string;
  city: string;
  canton: string;
  published: boolean;
  description: string;
};

export const locations: Location[] = [
  {
    slug: "lausanne",
    city: "Lausanne",
    canton: "Vaud",
    published: true,
    description: "Création de sites web, SEO local et solutions digitales pour les entreprises de Lausanne.",
  },
  {
    slug: "montreux",
    city: "Montreux",
    canton: "Vaud",
    published: false,
    description: "",
  },
  {
    slug: "geneve",
    city: "Genève",
    canton: "Genève",
    published: false,
    description: "",
  },
  {
    slug: "neuchatel",
    city: "Neuchâtel",
    canton: "Neuchâtel",
    published: false,
    description: "",
  },
];

export const publishedLocations = locations.filter((location) => location.published);
