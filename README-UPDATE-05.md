# SebWebSwiss — Update 05 Release Candidate

## Prêt pour publication
- `sitemap.ts` contient désormais la page hébergement.
- Homepage : title, description et canonical propres.
- Métadonnées Open Graph et Twitter de base au niveau global.
- Liens internes depuis la homepage vers les services principaux.
- La page hébergement apparaît dans la liste des services.

## Avant déploiement
1. `npm install` puis `npm run build`.
2. Vérifier les URLs : `/`, `/services`, `/services/creation-site-internet-lausanne`, `/services/referencement-seo-lausanne`, `/services/hebergement-maintenance-web`, `/contact`.
3. Après mise en ligne : ajouter `https://sebwebswiss.ch/sitemap.xml` dans Search Console, puis demander l’indexation des 4 pages prioritaires.
4. Noter les métriques de départ dans Search Console. Ne changer aucun contenu pendant 14 jours sauf erreur technique claire.

## Limites assumées
- Aucune nouvelle ville n’est publiée sans contenu local original.
- `FAQPage` schema n’est pas ajouté : les FAQ restent utiles aux visiteurs, mais Google n’affiche plus les FAQ rich results.
- Une image Open Graph dédiée pourra être ajoutée plus tard sans changer les URL ou la structure SEO.
