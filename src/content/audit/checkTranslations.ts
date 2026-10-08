import { aiChecks, localChecks, techChecks, type CheckResult, type Lang } from "./checks";
import { auditLangs } from "./translations";

type Text = [fr: string, de: string, it: string, en: string];

// Structured messages keep evidence (URLs, names, counts) separate from UI copy.
const details = {
  "title.present": ["Longueur : {length} caractères — « {title} »", "Länge: {length} Zeichen — «{title}»", "Lunghezza: {length} caratteri — «{title}»", "Length: {length} characters — “{title}”"],
  "title.absent": ["Balise <title> absente.", "Der <title>-Tag fehlt.", "Tag <title> assente.", "The <title> tag is missing."],
  "description.present": ["Longueur : {length} caractères.", "Länge: {length} Zeichen.", "Lunghezza: {length} caratteri.", "Length: {length} characters."],
  "description.absent": ["Meta description absente.", "Die Meta-Beschreibung fehlt.", "Meta description assente.", "The meta description is missing."],
  h1: ["Balises H1 trouvées : {count}.", "Gefundene H1-Überschriften: {count}.", "Titoli H1 trovati: {count}.", "H1 headings found: {count}."],
  "canonical.present": ["URL canonique : {value}", "Kanonische URL: {value}", "URL canonico: {value}", "Canonical URL: {value}"],
  "canonical.absent": ["Balise canonical absente.", "Der Canonical-Tag fehlt.", "Tag canonical assente.", "The canonical tag is missing."],
  "robots.checked": ["Directives d’indexation détectées.", "Indexierungsanweisungen erkannt.", "Direttive di indicizzazione rilevate.", "Indexing directives detected."],
  "robots.meta": ["Balise robots : {meta}.", "Robots-Meta-Tag: {meta}.", "Meta tag robots: {meta}.", "Robots meta tag: {meta}."],
  "robots.header": ["X-Robots-Tag : {header}.", "X-Robots-Tag: {header}.", "X-Robots-Tag: {header}.", "X-Robots-Tag: {header}."],
  "robots.blocked": ["Indexation bloquée.", "Die Indexierung ist blockiert.", "Indicizzazione bloccata.", "Indexing is blocked."],
  "robots.absent": ["Aucune balise robots détectée (l’indexation n’est pas bloquée par cette balise).", "Kein Robots-Meta-Tag erkannt; dieser Tag blockiert die Indexierung nicht.", "Nessun meta tag robots rilevato; questo tag non blocca l’indicizzazione.", "No robots meta tag detected; indexing is not blocked by this tag."],
  og: ["Balises Open Graph détectées : {count}.", "Erkannte Open-Graph-Tags: {count}.", "Tag Open Graph rilevati: {count}.", "Open Graph tags detected: {count}."],
  "viewport.present": ["Balise viewport présente.", "Der Viewport-Tag ist vorhanden.", "Tag viewport presente.", "The viewport tag is present."],
  "viewport.absent": ["Balise viewport absente (compatibilité mobile).", "Der Viewport-Tag für mobile Geräte fehlt.", "Tag viewport assente per la compatibilità mobile.", "The viewport tag for mobile compatibility is missing."],
  "lang.present": ["Langue déclarée : {value}.", "Deklarierte Sprache: {value}.", "Lingua dichiarata: {value}.", "Declared language: {value}."],
  "lang.absent": ["Attribut lang absent sur la balise <html>.", "Das lang-Attribut am <html>-Tag fehlt.", "Attributo lang assente nel tag <html>.", "The lang attribute is missing from the <html> tag."],
  "schema.present": ["Blocs JSON-LD trouvés : {count}.", "Gefundene JSON-LD-Blöcke: {count}.", "Blocchi JSON-LD trovati: {count}.", "JSON-LD blocks found: {count}."],
  "schema.absent": ["Aucune donnée structurée JSON-LD détectée.", "Keine strukturierten JSON-LD-Daten erkannt.", "Nessun dato strutturato JSON-LD rilevato.", "No JSON-LD structured data detected."],
  "schema.invalid": ["Blocs JSON-LD invalides : {invalid}.", "Ungültige JSON-LD-Blöcke: {invalid}.", "Blocchi JSON-LD non validi: {invalid}.", "Invalid JSON-LD blocks: {invalid}."],
  https: ["Protocole : {protocol}//", "Protokoll: {protocol}//", "Protocollo: {protocol}//", "Protocol: {protocol}//"],
  redirect: ["Redirection vers {url}.", "Weiterleitung zu {url}.", "Reindirizzamento verso {url}.", "Redirected to {url}."],
  response: ["Code HTTP : {status} · Temps : {time} ms", "HTTP-Status: {status} · Dauer: {time} ms", "Codice HTTP: {status} · Tempo: {time} ms", "HTTP status: {status} · Time: {time} ms"],
  "name.present": ["Nom détecté : {value}", "Erkannter Name: {value}", "Nome rilevato: {value}", "Name detected: {value}"],
  "name.absent": ["Nom de l’entreprise non détecté.", "Der Unternehmensname wurde nicht erkannt.", "Nome dell’azienda non rilevato.", "The business name was not detected."],
  "phone.schema": ["Téléphone détecté dans le schema : {value}", "Telefonnummer in strukturierten Daten erkannt: {value}", "Telefono rilevato nei dati strutturati: {value}", "Phone detected in structured data: {value}"],
  "phone.visible": ["Un numéro de téléphone est présent dans le contenu.", "Eine Telefonnummer ist im Inhalt vorhanden.", "Un numero di telefono è presente nel contenuto.", "A phone number is present in the content."],
  "phone.absent": ["Aucun numéro de téléphone détecté.", "Keine Telefonnummer erkannt.", "Nessun numero di telefono rilevato.", "No phone number detected."],
  "tel.present": ["Lien tel: détecté.", "Ein tel:-Link wurde erkannt.", "Link tel: rilevato.", "A tel: link was detected."],
  "tel.absent": ["Aucun lien cliquable tel: détecté.", "Kein anklickbarer tel:-Link erkannt.", "Nessun link tel: cliccabile rilevato.", "No clickable tel: link detected."],
  "address.schema": ["Adresse dans le schema : {value}", "Adresse in strukturierten Daten: {value}", "Indirizzo nei dati strutturati: {value}", "Address in structured data: {value}"],
  "address.content": ["Adresse dans le contenu : {value}", "Adresse im Inhalt: {value}", "Indirizzo nel contenuto: {value}", "Address in the content: {value}"],
  "address.absent": ["Aucune adresse complète détectée.", "Keine vollständige Adresse erkannt.", "Nessun indirizzo completo rilevato.", "No complete address detected."],
  "locality.present": ["Ville ou région (p. ex. Lausanne, Vaud) mentionnée.", "Eine Stadt oder Region, zum Beispiel Lausanne oder Waadt, wird genannt.", "È indicata una città o regione, per esempio Losanna o Vaud.", "A town or region, such as Lausanne or Vaud, is mentioned."],
  "locality.absent": ["Aucune localité suisse ciblée détectée dans le contenu.", "Keine der geprüften Schweizer Ortsangaben im Inhalt erkannt.", "Nessuna delle località svizzere verificate è rilevata nel contenuto.", "None of the checked Swiss localities was detected in the content."],
  "localSchema.complete": ["Schema local complet (nom, adresse, téléphone) détecté.", "Vollständiges lokales Schema mit Name, Adresse und Telefon erkannt.", "Schema locale completo con nome, indirizzo e telefono rilevato.", "Complete local schema with name, address and phone detected."],
  "localSchema.partial": ["Schema local présent mais NAP incomplet.", "Lokales Schema vorhanden, aber Name, Adresse oder Telefon sind unvollständig.", "Schema locale presente, ma nome, indirizzo o telefono sono incompleti.", "Local schema is present, but name, address or phone information is incomplete."],
  "localSchema.absent": ["Aucun schema LocalBusiness/Organization avec adresse détecté.", "Kein LocalBusiness-/Organization-Schema mit Adresse erkannt.", "Nessuno schema LocalBusiness/Organization con indirizzo rilevato.", "No LocalBusiness/Organization schema with an address detected."],
  "contact.present": ["Lien vers une page contact détecté.", "Ein Link zu einer Kontaktseite wurde erkannt.", "Link verso una pagina di contatto rilevato.", "A link to a contact page was detected."],
  "contact.absent": ["Aucun lien vers une page contact détecté.", "Kein Link zu einer Kontaktseite erkannt.", "Nessun link verso una pagina di contatto rilevato.", "No link to a contact page detected."],
  "hours.present": ["Horaires d’ouverture détectés.", "Öffnungszeiten erkannt.", "Orari di apertura rilevati.", "Opening hours detected."],
  "hours.partial": ["Horaires mentionnés mais non détaillés.", "Öffnungszeiten erwähnt, aber nicht angegeben.", "Orari menzionati, ma senza dettagli.", "Opening hours are mentioned but not specified."],
  "hours.absent": ["Aucun horaire d’ouverture détecté.", "Keine Öffnungszeiten erkannt.", "Nessun orario di apertura rilevato.", "No opening hours detected."],
  "ai.access.blocked": ["OAI-SearchBot bloqué dans robots.txt — risque d’absence dans ChatGPT Search.", "OAI-SearchBot ist in robots.txt blockiert; dies kann die Sichtbarkeit in ChatGPT Search beeinträchtigen.", "OAI-SearchBot è bloccato in robots.txt; questo può limitare la presenza in ChatGPT Search.", "OAI-SearchBot is blocked in robots.txt, which may prevent visibility in ChatGPT Search."],
  "ai.access.allowed": ["robots.txt présent, aucune interdiction générale d’OAI-SearchBot détectée.", "robots.txt vorhanden; keine allgemeine Sperre für OAI-SearchBot erkannt.", "robots.txt presente; nessun blocco generale di OAI-SearchBot rilevato.", "robots.txt is present; no general block of OAI-SearchBot was detected."],
  "ai.access.absent": ["robots.txt absent (HTTP 404/410) — accès autorisé par défaut.", "robots.txt fehlt (HTTP 404/410); Zugriff ist standardmässig erlaubt.", "robots.txt assente (HTTP 404/410); l’accesso è consentito per impostazione predefinita.", "robots.txt is absent (HTTP 404/410); access is allowed by default."],
  "ai.access.unknown": ["robots.txt non vérifiable — accès des robots non confirmé.", "robots.txt konnte nicht geprüft werden; der Zugriff der Bots ist nicht bestätigt.", "Non è stato possibile verificare robots.txt; l’accesso dei bot non è confermato.", "robots.txt could not be verified; bot access is not confirmed."],
  "bot.gpt": ["GPTBot bloqué (entraînement) — sans impact sur ChatGPT Search.", "GPTBot blockiert (Training); ohne Einfluss auf ChatGPT Search.", "GPTBot bloccato per l’addestramento; nessun impatto su ChatGPT Search.", "GPTBot is blocked for training; this does not affect ChatGPT Search."],
  "bot.google": ["Google-Extended bloqué (Gemini) — sans impact sur la recherche Google.", "Google-Extended blockiert (Gemini); ohne Einfluss auf die Google-Suche.", "Google-Extended bloccato per Gemini; nessun impatto sulla ricerca Google.", "Google-Extended is blocked for Gemini; this does not affect Google Search."],
  "bot.user": ["ChatGPT-User bloqué (navigation à la demande).", "ChatGPT-User für angefragte Seitenaufrufe blockiert.", "ChatGPT-User bloccato per la navigazione su richiesta.", "ChatGPT-User is blocked for on-demand browsing."],
  "bot.cc": ["CCBot bloqué (informationnel).", "CCBot blockiert (Hinweis ohne Punktabzug).", "CCBot bloccato (solo informativo).", "CCBot is blocked (informational only)."],
  "ai.html.present": ["Contenu présent dans le HTML initial ({count} caractères).", "Inhalt im ursprünglichen HTML vorhanden ({count} Zeichen).", "Contenuto presente nell’HTML iniziale ({count} caratteri).", "Content is present in the initial HTML ({count} characters)."],
  "ai.html.few": ["Peu de contenu dans le HTML initial ({count} caractères) — dépend peut-être du JavaScript.", "Wenig Inhalt im ursprünglichen HTML ({count} Zeichen); möglicherweise JavaScript-abhängig.", "Poco contenuto nell’HTML iniziale ({count} caratteri); potrebbe dipendere da JavaScript.", "Little content in the initial HTML ({count} characters); it may depend on JavaScript."],
  "ai.schema.entity": ["Schéma d’entité détecté ({count} bloc(s) JSON-LD).", "Entitätsschema erkannt ({count} JSON-LD-Blöcke).", "Schema di entità rilevato ({count} blocchi JSON-LD).", "Entity schema detected ({count} JSON-LD blocks)."],
  "ai.schema.other": ["JSON-LD présent mais sans entité Organization/LocalBusiness/WebSite.", "JSON-LD vorhanden, aber ohne Organization-/LocalBusiness-/WebSite-Entität.", "JSON-LD presente, ma senza un’entità Organization/LocalBusiness/WebSite.", "JSON-LD is present, but without an Organization/LocalBusiness/WebSite entity."],
  "ai.schema.absent": ["Aucune donnée structurée JSON-LD détectée.", "Keine strukturierten JSON-LD-Daten erkannt.", "Nessun dato strutturato JSON-LD rilevato.", "No JSON-LD structured data detected."],
  "ai.identity.present": ["Signaux détectés ({count}) : {signals}.", "Erkannte Signale ({count}): {signals}.", "Segnali rilevati ({count}): {signals}.", "Signals detected ({count}): {signals}."],
  "ai.identity.absent": ["Peu de signaux d’identité détectés.", "Wenige Identitätssignale erkannt.", "Pochi segnali di identità rilevati.", "Few identity signals detected."],
  "signal.schema": ["schéma d’entité", "Entitätsschema", "schema di entità", "entity schema"],
  "signal.name": ["nom de l’entreprise", "Unternehmensname", "nome dell’azienda", "business name"],
  "signal.about": ["lien À propos", "Über-uns-Link", "link Chi siamo", "About link"],
  "signal.contact": ["lien Contact", "Kontaktlink", "link Contatti", "Contact link"],
  "signal.sameAs": ["profils officiels sameAs", "offizielle sameAs-Profile", "profili ufficiali sameAs", "official sameAs profiles"],
  "signal.legal": ["page légale/confidentialité", "Rechts-/Datenschutzseite", "pagina legale/privacy", "legal/privacy page"],
  "ai.content": ["Contenu : environ {count} mot(s).", "Inhalt: ungefähr {count} Wörter.", "Contenuto: circa {count} parole.", "Content: approximately {count} words."],
  "ai.headings": ["Titres secondaires : {h2} H2, {h3} H3.", "Unterüberschriften: {h2} H2, {h3} H3.", "Titoli secondari: {h2} H2, {h3} H3.", "Subheadings: {h2} H2, {h3} H3."],
  "ai.qa.present": ["Éléments questions-réponses détectés.", "Frage-Antwort-Inhalte erkannt.", "Elementi domanda-risposta rilevati.", "Question-and-answer content detected."],
  "ai.qa.questions": ["Titres en question : {count}.", "Überschriften als Fragen: {count}.", "Titoli formulati come domande: {count}.", "Headings phrased as questions: {count}."],
  "ai.qa.details": ["Bloc dépliable présent.", "Aufklappbarer Inhaltsblock vorhanden.", "Blocco espandibile presente.", "An expandable content block is present."],
  "ai.qa.absent": ["Aucun bloc questions-réponses visible détecté.", "Kein sichtbarer Frage-Antwort-Block erkannt.", "Nessun blocco domanda-risposta visibile rilevato.", "No visible question-and-answer block detected."],
  "ai.llms.present": ["Fichier /llms.txt présent.", "Die Datei /llms.txt ist vorhanden.", "File /llms.txt presente.", "The /llms.txt file is present."],
  "ai.llms.absent": ["Aucun /llms.txt détecté (optionnel, sans gain garanti).", "Keine /llms.txt-Datei erkannt; optional, ohne garantierten Nutzen.", "Nessun file /llms.txt rilevato; facoltativo, senza benefici garantiti.", "No /llms.txt file detected; optional, with no guaranteed benefit."],
} satisfies Record<string, Text>;

export type DetailKey = keyof typeof details;
type Values = Record<string, string | number>;
type Copy = [label: string, howToFix: string];

const de: Record<string, Copy> = {
  https: ["Sichere Verbindung (HTTPS)", "Installieren Sie ein SSL-Zertifikat und leiten Sie HTTP-Anfragen auf HTTPS um. Ihr Hosting-Anbieter kann Sie dabei unterstützen."],
  title: ["Seitentitel (30–60 Zeichen)", "Vergeben Sie jeder Seite einen eindeutigen Titel mit 30 bis 60 Zeichen, der Thema und wichtigsten Suchbegriff beschreibt."],
  "meta-description": ["Meta-Beschreibung vorhanden", "Ergänzen Sie pro Seite eine eindeutige Meta-Beschreibung mit 70 bis 160 Zeichen, die den Nutzen für Besucher klar beschreibt."],
  h1: ["Eine Hauptüberschrift (H1)", "Verwenden Sie pro Seite eine beschreibende H1-Überschrift und strukturieren Sie den restlichen Inhalt mit H2 und H3."],
  canonical: ["Canonical-Tag", "Geben Sie mit einem Canonical-Link die bevorzugte URL der Seite an, um unterschiedliche URL-Versionen eindeutig zuzuordnen."],
  robots: ["Robots-Anweisungen und Indexierung", "Prüfen Sie Meta-Robots, X-Robots-Tag und robots.txt, damit wichtige Seiten nicht unbeabsichtigt von der Indexierung ausgeschlossen sind."],
  og: ["Open Graph für soziale Netzwerke", "Ergänzen Sie og:title, og:description und og:image für eine verständliche Vorschau beim Teilen Ihrer Website."],
  viewport: ["Mobile Darstellung (Viewport)", "Ergänzen Sie den Viewport-Meta-Tag, damit sich die Darstellung an mobile Bildschirme anpasst."],
  lang: ["Sprache der Seite (lang)", "Deklarieren Sie im lang-Attribut des html-Elements eine gültige Sprache, zum Beispiel de-CH."],
  schema: ["Strukturierte Daten (schema.org)", "Beschreiben Sie Ihre Organisation oder Tätigkeit mit gültigen JSON-LD-Daten, die zum sichtbaren Inhalt passen."],
  response: ["Serverantwort und Antwortzeit", "Beheben Sie ungültige Serverantworten und optimieren Sie Hosting und Seitengrösse. Messen Sie die tatsächliche Ladezeit zusätzlich."],
  "business-name": ["Unternehmensname sichtbar", "Zeigen Sie den Namen Ihres Unternehmens deutlich auf der Startseite und in Ihren Kontaktinformationen."],
  phone: ["Telefonnummer vorhanden", "Zeigen Sie Ihre Telefonnummer sichtbar im Kopfbereich, im Footer oder auf der Kontaktseite."],
  "tel-link": ["Telefonnummer anklickbar (tel:)", "Verlinken Sie die Telefonnummer mit tel:, damit mobile Besucher direkt anrufen können."],
  address: ["Adresse und Postleitzahl", "Geben Sie Ihre vollständige Adresse und Postleitzahl im Footer und auf der Kontaktseite an."],
  locality: ["Ort und Region genannt", "Nennen Sie Ihre tatsächliche Stadt und Region in relevanten Überschriften und Texten, um den lokalen Kontext klarzumachen."],
  "schema-local": ["Lokales Schema (LocalBusiness)", "Ergänzen Sie LocalBusiness- oder passende Organisationsdaten mit Name, Adresse, Telefonnummer und Website-URL."],
  "contact-link": ["Link zur Kontaktseite", "Verlinken Sie Ihre Kontaktseite gut sichtbar in der Navigation und im Footer."],
  "opening-hours": ["Öffnungszeiten", "Geben Sie Ihre aktuellen Öffnungszeiten auf der Kontaktseite und möglichst auch in den strukturierten Daten an."],
  "ai-crawlers": ["Zugriff von OAI-SearchBot (ChatGPT Search)", "Prüfen Sie robots.txt und vermeiden Sie eine allgemeine Sperre für OAI-SearchBot. GPTBot betrifft Training und ist davon getrennt."],
  "ai-html": ["Inhalt im ursprünglichen HTML", "Stellen Sie wichtige Inhalte bereits im serverseitig oder statisch erzeugten HTML bereit, statt sie ausschliesslich per JavaScript nachzuladen."],
  "ai-schema": ["Nutzbare strukturierte Daten", "Beschreiben Sie Ihr Unternehmen mit gültigen Organization-, LocalBusiness-, ProfessionalService- oder WebSite-Daten."],
  "ai-identity": ["Identitäts- und Vertrauenssignale", "Machen Sie Unternehmen, Kontakt, Über-uns-Seite, Datenschutzinformationen und offizielle Profile klar erkennbar und konsistent."],
  "ai-content": ["Ausreichender Inhalt", "Beantworten Sie die Fragen Ihrer Kunden mit konkreten Angaben zu Tätigkeit, Angebot und Einzugsgebiet."],
  "ai-headings": ["Inhaltsstruktur (H2/H3)", "Gliedern Sie die Seite mit klaren H2- und H3-Überschriften, die die Inhalte sinnvoll beschreiben."],
  "ai-qa": ["Frage-Antwort-Inhalte", "Ergänzen Sie sichtbare Antworten auf häufige Kundenfragen, zum Beispiel als Fragenüberschriften oder aufklappbare Inhalte."],
  "ai-llms-txt": ["llms.txt-Datei (Hinweis)", "Optional können Sie wichtige Inhalte in llms.txt zusammenfassen. Diese vorgeschlagene Konvention garantiert keinen Sichtbarkeitsgewinn und beeinflusst den Punktestand nicht."],
};

const it: Record<string, Copy> = {
  https: ["Connessione sicura (HTTPS)", "Installa un certificato SSL e reindirizza il traffico HTTP verso HTTPS. Il tuo fornitore di hosting può aiutarti."],
  title: ["Titolo della pagina (30–60 caratteri)", "Assegna a ogni pagina un titolo unico di 30–60 caratteri che descriva il contenuto e il termine di ricerca principale."],
  "meta-description": ["Meta description presente", "Aggiungi a ogni pagina una meta description unica di 70–160 caratteri che spieghi il valore del contenuto per i visitatori."],
  h1: ["Un solo titolo principale (H1)", "Usa un H1 descrittivo per pagina, poi organizza gli altri contenuti con titoli H2 e H3."],
  canonical: ["Tag canonical", "Indica l’URL preferito della pagina con un link canonical per chiarire quale versione è quella di riferimento."],
  robots: ["Direttive robots e indicizzazione", "Controlla meta robots, X-Robots-Tag e robots.txt per non escludere involontariamente le pagine importanti dall’indicizzazione."],
  og: ["Open Graph per i social network", "Aggiungi og:title, og:description e og:image per mostrare un’anteprima chiara quando il sito viene condiviso."],
  viewport: ["Compatibilità mobile (viewport)", "Inserisci il meta tag viewport affinché il sito si adatti agli schermi mobili."],
  lang: ["Lingua della pagina (lang)", "Indica una lingua valida nell’attributo lang dell’elemento html, per esempio it-CH."],
  schema: ["Dati strutturati (schema.org)", "Descrivi la tua organizzazione o attività con dati JSON-LD validi e coerenti con i contenuti visibili."],
  response: ["Risposta e tempo del server", "Correggi le risposte del server non valide e ottimizza hosting e peso della pagina. Misura anche il tempo di caricamento reale."],
  "business-name": ["Nome dell’azienda visibile", "Mostra chiaramente il nome della tua azienda nella pagina iniziale e nelle informazioni di contatto."],
  phone: ["Numero di telefono presente", "Mostra il numero di telefono nell’intestazione, nel piè di pagina o nella pagina di contatto."],
  "tel-link": ["Telefono cliccabile (tel:)", "Trasforma il numero in un link tel: per consentire ai visitatori da mobile di chiamare direttamente."],
  address: ["Indirizzo e codice postale", "Indica l’indirizzo completo e il codice postale nel piè di pagina e nella pagina di contatto."],
  locality: ["Località e regione indicate", "Cita la città e la regione in cui operi nei titoli e nei testi pertinenti per chiarire il contesto locale."],
  "schema-local": ["Schema locale (LocalBusiness)", "Aggiungi dati LocalBusiness o di organizzazione con nome, indirizzo, telefono e URL del sito."],
  "contact-link": ["Link alla pagina di contatto", "Inserisci un link visibile alla pagina di contatto nella navigazione e nel piè di pagina."],
  "opening-hours": ["Orari di apertura", "Indica gli orari aggiornati nella pagina di contatto e, se possibile, nei dati strutturati."],
  "ai-crawlers": ["Accesso di OAI-SearchBot (ChatGPT Search)", "Controlla robots.txt ed evita un blocco generale di OAI-SearchBot. GPTBot riguarda l’addestramento ed è separato."],
  "ai-html": ["Contenuto nell’HTML iniziale", "Rendi disponibili i contenuti importanti nell’HTML generato dal server o staticamente, senza dipendere soltanto da JavaScript."],
  "ai-schema": ["Dati strutturati utilizzabili", "Descrivi l’azienda con dati validi Organization, LocalBusiness, ProfessionalService o WebSite."],
  "ai-identity": ["Segnali di identità e fiducia", "Rendi chiari e coerenti azienda, contatti, pagina Chi siamo, privacy e profili ufficiali."],
  "ai-content": ["Contenuto sostanziale", "Rispondi alle domande dei clienti con informazioni concrete su attività, offerta e area servita."],
  "ai-headings": ["Struttura del contenuto (H2/H3)", "Organizza la pagina con titoli H2 e H3 chiari che descrivano le diverse sezioni."],
  "ai-qa": ["Contenuti domanda-risposta", "Aggiungi risposte visibili alle domande frequenti dei clienti, con titoli formulati come domande o blocchi espandibili."],
  "ai-llms-txt": ["File llms.txt (informativo)", "Puoi facoltativamente riassumere i contenuti importanti in llms.txt. Questa convenzione proposta non garantisce maggiore visibilità e non influisce sul punteggio."],
};

const en: Record<string, Copy> = {
  https: ["Secure connection (HTTPS)", "Install an SSL certificate and redirect HTTP traffic to HTTPS. Your hosting provider can help you configure this."],
  title: ["Page title (30–60 characters)", "Give each page a unique title of 30–60 characters describing its content and main search topic."],
  "meta-description": ["Meta description present", "Add a unique 70–160 character meta description to each page, clearly explaining its value to visitors."],
  h1: ["One main heading (H1)", "Use one descriptive H1 heading per page, then organise the remaining content with H2 and H3 headings."],
  canonical: ["Canonical tag", "Use a canonical link to identify the preferred page URL and clarify which version is the reference."],
  robots: ["Robots directives and indexing", "Check meta robots, X-Robots-Tag and robots.txt so important pages are not unintentionally excluded from indexing."],
  og: ["Open Graph for social sharing", "Add og:title, og:description and og:image to provide a clear preview when your website is shared."],
  viewport: ["Mobile compatibility (viewport)", "Include the viewport meta tag so the website adapts to mobile screens."],
  lang: ["Page language (lang)", "Declare a valid language in the html element’s lang attribute, such as en-CH."],
  schema: ["Structured data (schema.org)", "Describe your organisation or activity with valid JSON-LD data that matches the visible content."],
  response: ["Server response and response time", "Fix invalid server responses and optimise hosting and page size. Also measure the actual page loading time."],
  "business-name": ["Business name visible", "Display your business name clearly on the homepage and in your contact information."],
  phone: ["Phone number present", "Display your phone number in the header, footer or contact page."],
  "tel-link": ["Clickable phone number (tel:)", "Turn your phone number into a tel: link so mobile visitors can call directly."],
  address: ["Address and postal code", "Provide your full address and postal code in the footer and contact page."],
  locality: ["Town and region mentioned", "Mention the town and region you actually serve in relevant headings and text to make the local context clear."],
  "schema-local": ["Local schema (LocalBusiness)", "Add LocalBusiness or appropriate organisation data with your name, address, phone number and website URL."],
  "contact-link": ["Link to the contact page", "Add a visible contact page link to your navigation and footer."],
  "opening-hours": ["Opening hours", "Display current opening hours on the contact page and, if possible, in structured data."],
  "ai-crawlers": ["OAI-SearchBot access (ChatGPT Search)", "Check robots.txt and avoid a general block of OAI-SearchBot. GPTBot concerns training and is separate."],
  "ai-html": ["Content in the initial HTML", "Make important content available in server-rendered or static HTML instead of relying only on JavaScript."],
  "ai-schema": ["Usable structured data", "Describe your business with valid Organization, LocalBusiness, ProfessionalService or WebSite data."],
  "ai-identity": ["Identity and trust signals", "Make your business, contact details, About page, privacy information and official profiles clear and consistent."],
  "ai-content": ["Substantial content", "Answer customer questions with specific information about your activity, offers and service area."],
  "ai-headings": ["Content structure (H2/H3)", "Organise the page with clear H2 and H3 headings that describe its sections."],
  "ai-qa": ["Question-and-answer content", "Add visible answers to common customer questions, using question headings or expandable content."],
  "ai-llms-txt": ["llms.txt file (informational)", "Optionally summarise important content in llms.txt. This proposed convention does not guarantee visibility gains and does not affect the score."],
};

const copies = { de, it, en };
const sourceChecks = [...techChecks, ...localChecks, ...aiChecks];

function fill(template: string, values: Values) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}

export function formatDetail(lang: Lang, key: DetailKey, params: Values = {}, notes: DetailKey[] = []) {
  const index = auditLangs.indexOf(lang);
  const values = { ...params };
  if (typeof params.signalIds === "string") {
    values.signals = params.signalIds.split(",").map(id => {
      const signal = `signal.${id}` as DetailKey;
      return Object.hasOwn(details, signal) ? details[signal][index] : id;
    }).join(", ");
  }
  return [key, ...notes].map(note => fill(details[note][index], values)).join(" ");
}

export function describe(key: DetailKey, params: Values = {}, notes: DetailKey[] = []) {
  return { detailKey: key, detailParams: params, detailNotes: notes, detail: formatDetail("fr", key, params, notes) };
}

export function localizeCheck(check: CheckResult, lang: Lang): CheckResult {
  const source = sourceChecks.find(item => item.id === check.id);
  const copy = lang === "fr" ? source && [source.label, source.howToFix] : copies[lang][check.id];
  const key = check.detailKey;
  const notes = (check.detailNotes ?? []).filter((note): note is DetailKey => Object.hasOwn(details, note));
  return {
    ...check,
    label: copy?.[0] ?? check.label,
    howToFix: copy?.[1] ?? check.howToFix,
    detail: key && Object.hasOwn(details, key)
      ? formatDetail(lang, key as DetailKey, check.detailParams, notes)
      : check.detail,
  };
}

export const translatedCheckIds = Object.keys(en);
export const detailKeys = Object.keys(details) as DetailKey[];
