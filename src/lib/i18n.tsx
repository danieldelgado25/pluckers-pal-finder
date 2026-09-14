import * as React from "react";

export type Lang = "en" | "es";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.menu": "Menu",
  "nav.club": "Pluckers Club",
  "nav.catering": "Catering & Parties",
  "nav.news": "News",
  "nav.story": "Our Story",
  "nav.feedback": "Feedback",
  "nav.gift": "Gift Cards",
  "nav.order": "Order Online",
  "nav.waitlist": "Join Waitlist",
  "nav.locations": "Locations",
  "nav.close": "Close",
  "nav.open": "Open menu",

  "lang.label": "Language",
  "lang.en": "English",
  "lang.es": "Español",

  "home.tagline": "Wings. Sauce. Game day. Since 1995.",
  "brand.slogan": "If you don't like our wings, we'll give you the bird!",
  "home.hero.title": "Every wing deserves a better sauce",
  "home.hero.sub":
    "Hand-tossed wings, 20+ house sauces, and a table for the whole crew across Texas and Louisiana.",
  "home.hero.order": "Order Online",
  "home.hero.menu": "See the Menu",
  "home.location.title": "Pick your Pluckers",
  "home.location.sub": "Set a location to see hours, wait times and the full local menu.",
  "home.location.choose": "Choose a location",
  "home.location.all": "All locations",
  "home.location.order": "Order from here",
  "home.location.waitlist": "Join the waitlist",
  "home.grad.badge": "Limited time",
  "home.grad.title": "Grad Meal Deal",
  "home.grad.body":
    "Feed the whole graduation party: 50 wings, 2 large sides, and a gallon of tea. Available through the end of the semester.",
  "home.grad.cta": "See the deal",
  "home.daily.title": "Daily Specials",
  "home.daily.sub": "A different reason to show up every day of the week.",
  "home.news.title": "What's happening",
  "home.news.sub": "Fresh from the Pluckers world.",
  "home.giving.title": "Giving back",
  "home.giving.sub": "Where your wings go beyond the table.",
  "home.news.all": "All news & archive",
  "home.club.title": "Join the Pluckers Club",
  "home.club.body": "Points on every visit, a free appetizer to start, and something on us for your birthday.",
  "home.club.cta": "Join free",

  "menu.title": "Menu",
  "menu.sub": "Jump straight to what you're hungry for.",
  "menu.jump": "Jump to",
  "menu.filter.all": "All",
  "menu.filter.label": "Entrée sections",
  "menu.seeSauces": "See all sauces & heat levels",
  "menu.notAll": "Not available at all locations",
  "menu.allergen.title": "Allergens & Nutrition",
  "menu.allergen.body":
    "Allergen and nutrition information is maintained per item and reviewed quarterly. Items marked with an asterisk contain a common allergen.",
  "menu.caution": "Contains a common allergen — ask your server for details.",

  "cat.pregame": "Pregame",
  "cat.entrees": "Entrées",
  "cat.sideline": "Sideline",
  "cat.desserts": "Dessert",
  "cat.drinks": "Drinks",

  "sub.wings": "Wings",
  "sub.tenders": "Jumbo Tenders",
  "sub.sandwiches": "Sandwiches",
  "sub.burgers": "Burgers",
  "sub.salads": "Salads",

  "drink.cocktails": "Cocktails",
  "drink.margaritas": "Margaritas",
  "drink.draft": "Draft Beer",
  "drink.cans": "Bottles & Cans",
  "drink.wine": "Wine",

  "nav.sauces": "Sauces",
  "sauces.title": "Wing Sauces",
  "sauces.sub": "Pluckers homemade sauces and dry rubs, rated by heat.",
  "sauces.heat": "Heat level",
  "sauces.heatLegend": "Five flames means Fire in the Hole territory.",
  "sauces.backToMenu": "Back to the menu",
  "sauce.featured": "Featured sauce",
  "sauce.marks": "Mark's Favorites",
  "sauce.daves": "Dave's Favorites",
  "sauce.seans": "Sean's Favorites",
  "sauce.originals": "Pluckers Originals",
  "sauce.traditional": "Traditional Flavors",
  "sauce.rubs": "Dry Rubs",
  "sauce.dryRub": "Dry rub",

  "club.title": "Pluckers Club",
  "club.sub": "One card. Every visit counts.",
  "club.how": "How it works",
  "club.birthday": "Birthday perks",
  "club.birthdayBody":
    "Free dessert during your birthday month, plus a bonus points multiplier on your birthday visit.",
  "club.join": "Join the club",
  "club.partners": "Partner discounts",
  "club.partnersBody":
    "Club members get a standing discount with our local partner companies. The full, current partner list lives here — no hunting required.",

  "catering.title": "Catering & Parties",
  "catering.sub": "Wings for 10 or 500. We travel well.",
  "catering.quote": "Request a quote",

  "news.title": "News",
  "news.sub": "Current updates up front. Everything older lives in the archive.",
  "news.current": "Current",
  "news.archive": "Archive",
  "news.giving": "Giving Back",

  "story.title": "Our Story",
  "story.sub": "From one Austin sports bar to a Texas institution.",

  "feedback.title": "Feedback",
  "feedback.sub": "Tell us how we did. We read all of it.",
  "feedback.name": "Name",
  "feedback.email": "Email",
  "feedback.location": "Location",
  "feedback.message": "Your feedback",
  "feedback.submit": "Send feedback",
  "feedback.thanks": "Thanks — your feedback is on its way to the team.",

  "gift.title": "Gift Cards",
  "gift.sub": "The easiest win of the year.",
  "gift.buy": "Buy a gift card",
  "gift.balance": "Check your balance",
  "gift.balanceLabel": "Gift card number",
  "gift.check": "Check balance",
  "gift.balanceResult": "Enter a valid 16-digit card number to see your balance.",

  "footer.connect": "Connect with us",
  "footer.explore": "Explore",
  "footer.company": "Company",
  "footer.rights": "All rights reserved.",
  "footer.careers": "Careers",
  "footer.corporate": "Corporate Office",
  "footer.accessibility": "Accessibility",
};

const es: Dict = {
  "nav.menu": "Menú",
  "nav.club": "Club Pluckers",
  "nav.catering": "Catering y Fiestas",
  "nav.news": "Noticias",
  "nav.story": "Nuestra Historia",
  "nav.feedback": "Comentarios",
  "nav.gift": "Tarjetas de Regalo",
  "nav.order": "Ordenar en línea",
  "nav.waitlist": "Lista de espera",
  "nav.locations": "Ubicaciones",
  "nav.close": "Cerrar",
  "nav.open": "Abrir menú",

  "lang.label": "Idioma",
  "lang.en": "English",
  "lang.es": "Español",

  "home.tagline": "Alitas. Salsa. Día de partido. Desde 1995.",
  "brand.slogan": "Si no te gustan nuestras alitas, ¡te damos el pájaro!",
  "home.hero.title": "Cada alita merece una mejor salsa",
  "home.hero.sub":
    "Alitas hechas a mano, más de 20 salsas de la casa y mesa para todo el grupo en Texas y Luisiana.",
  "home.hero.order": "Ordenar en línea",
  "home.hero.menu": "Ver el menú",
  "home.location.title": "Elige tu Pluckers",
  "home.location.sub": "Elige una ubicación para ver horarios, tiempos de espera y el menú local.",
  "home.location.choose": "Elige una ubicación",
  "home.location.all": "Todas las ubicaciones",
  "home.location.order": "Ordenar desde aquí",
  "home.location.waitlist": "Unirse a la lista de espera",
  "home.grad.badge": "Tiempo limitado",
  "home.grad.title": "Combo de Graduación",
  "home.grad.body":
    "Para toda la fiesta de graduación: 50 alitas, 2 guarniciones grandes y un galón de té. Disponible hasta el fin del semestre.",
  "home.grad.cta": "Ver la oferta",
  "home.daily.title": "Especiales del día",
  "home.daily.sub": "Una razón distinta para venir cada día de la semana.",
  "home.news.title": "Lo que está pasando",
  "home.news.sub": "Lo más nuevo del mundo Pluckers.",
  "home.giving.title": "Devolviendo a la comunidad",
  "home.giving.sub": "A dónde llegan tus alitas más allá de la mesa.",
  "home.news.all": "Todas las noticias y archivo",
  "home.club.title": "Únete al Club Pluckers",
  "home.club.body": "Puntos en cada visita, una entrada gratis al inscribirte y algo de nuestra parte en tu cumpleaños.",
  "home.club.cta": "Únete gratis",

  "menu.title": "Menú",
  "menu.sub": "Cinco secciones. Toca para abrir lo que se te antoje.",
  "menu.filter.all": "Todo",
  "menu.filter.label": "Filtrar platos fuertes",
  "menu.expand": "Abrir todo",
  "menu.collapse": "Cerrar todo",
  "menu.availability": "Disponible en",
  "menu.notAll": "No disponible en todas las ubicaciones",
  "menu.allergen.title": "Alérgenos y Nutrición",
  "menu.allergen.body":
    "La información de alérgenos y nutrición se mantiene por platillo y se revisa cada trimestre. Los platillos con asterisco contienen un alérgeno común.",
  "menu.allergen.updated": "Última revisión",
  "menu.caution": "Contiene un alérgeno común — pregunta a tu mesero.",

  "cat.sauces": "Salsas",
  "cat.apps": "Entradas",
  "cat.entrees": "Platos fuertes",
  "cat.sides": "Guarniciones",
  "cat.desserts": "Postres",

  "sub.wings": "Alitas",
  "sub.boneless": "Sin hueso",
  "sub.sandwiches": "Sándwiches",
  "sub.burgers": "Hamburguesas",
  "sub.salads": "Ensaladas",

  "club.title": "Club Pluckers",
  "club.sub": "Una tarjeta. Cada visita cuenta.",
  "club.how": "Cómo funciona",
  "club.birthday": "Beneficios de cumpleaños",
  "club.birthdayBody":
    "Postre gratis durante tu mes de cumpleaños y puntos dobles en tu visita del día.",
  "club.join": "Únete al club",
  "club.partners": "Descuentos con socios",
  "club.partnersBody":
    "Los miembros del club reciben descuento permanente con nuestras empresas socias. La lista completa y actual está aquí — sin buscar.",

  "catering.title": "Catering y Fiestas",
  "catering.sub": "Alitas para 10 o para 500. Viajamos bien.",
  "catering.quote": "Pedir cotización",

  "news.title": "Noticias",
  "news.sub": "Lo actual al frente. Lo anterior vive en el archivo.",
  "news.current": "Actual",
  "news.archive": "Archivo",
  "news.giving": "Comunidad",

  "story.title": "Nuestra Historia",
  "story.sub": "De un bar deportivo en Austin a una institución de Texas.",

  "feedback.title": "Comentarios",
  "feedback.sub": "Cuéntanos cómo nos fue. Leemos todo.",
  "feedback.name": "Nombre",
  "feedback.email": "Correo electrónico",
  "feedback.location": "Ubicación",
  "feedback.message": "Tus comentarios",
  "feedback.submit": "Enviar comentarios",
  "feedback.thanks": "Gracias — tus comentarios van en camino al equipo.",

  "gift.title": "Tarjetas de Regalo",
  "gift.sub": "El regalo más fácil del año.",
  "gift.buy": "Comprar una tarjeta",
  "gift.balance": "Consultar saldo",
  "gift.balanceLabel": "Número de tarjeta",
  "gift.check": "Consultar saldo",
  "gift.balanceResult": "Ingresa un número de 16 dígitos para ver tu saldo.",

  "footer.connect": "Conéctate con nosotros",
  "footer.explore": "Explorar",
  "footer.company": "Compañía",
  "footer.rights": "Todos los derechos reservados.",
  "footer.careers": "Empleo",
  "footer.corporate": "Oficina Corporativa",
  "footer.accessibility": "Accesibilidad",
};

const dicts: Record<Lang, Dict> = { en, es };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };

const LangContext = React.createContext<Ctx>({ lang: "en", setLang: () => {}, t: (k) => k });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>("en");

  React.useEffect(() => {
    const stored = window.localStorage.getItem("pluckers-lang");
    if (stored === "es" || stored === "en") setLangState(stored);
  }, []);

  const setLang = React.useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("pluckers-lang", l);
    document.documentElement.lang = l;
  }, []);

  const t = React.useCallback((k: string) => dicts[lang][k] ?? dicts.en[k] ?? k, [lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return React.useContext(LangContext);
}
