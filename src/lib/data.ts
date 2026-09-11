export type Loc = {
  id: string;
  city: string;
  name: string;
  region: string;
  address: string;
  phone: string;
  hours: string;
  pickleball?: boolean;
};

export const locations: Loc[] = [
  { id: "austin-downtown", city: "Austin", name: "Downtown", region: "Central Texas", address: "2222 Rio Grande St, Austin, TX", phone: "(512) 469-9464", hours: "11am – 12am" },
  { id: "austin-arboretum", city: "Austin", name: "Arboretum", region: "Central Texas", address: "9070 Research Blvd, Austin, TX", phone: "(512) 454-9464", hours: "11am – 11pm" },
  { id: "round-rock", city: "Round Rock", name: "Round Rock", region: "Central Texas", address: "2400 S IH-35, Round Rock, TX", phone: "(512) held", hours: "11am – 11pm" },
  { id: "san-marcos", city: "San Marcos", name: "San Marcos", region: "Central Texas", address: "105 N LBJ Dr, San Marcos, TX", phone: "(512) 396-9464", hours: "11am – 12am" },
  { id: "college-station", city: "College Station", name: "College Station", region: "Brazos Valley", address: "1730 University Dr E, College Station, TX", phone: "(979) 260-9464", hours: "11am – 12am", pickleball: true },
  { id: "killeen", city: "Killeen", name: "Killeen", region: "Central Texas", address: "2201 E Central Texas Expy, Killeen, TX", phone: "(254) 690-9464", hours: "11am – 11pm" },
  { id: "dallas", city: "Dallas", name: "Dallas", region: "DFW", address: "5350 E Mockingbird Ln, Dallas, TX", phone: "(214) 484-9464", hours: "11am – 11pm" },
  { id: "fort-worth", city: "Fort Worth", name: "Fort Worth", region: "DFW", address: "5228 Trail Lake Dr, Fort Worth, TX", phone: "(817) 386-9464", hours: "11am – 11pm" },
  { id: "houston", city: "Houston", name: "Houston", region: "Gulf Coast", address: "1400 Shepherd Dr, Houston, TX", phone: "(713) 393-9464", hours: "11am – 11pm" },
  { id: "san-antonio", city: "San Antonio", name: "San Antonio", region: "South Texas", address: "1250 SW Loop 410, San Antonio, TX", phone: "(210) 267-9464", hours: "11am – 11pm" },
  { id: "baton-rouge", city: "Baton Rouge", name: "Baton Rouge", region: "Louisiana", address: "4225 Nicholson Dr, Baton Rouge, LA", phone: "(225) 636-9464", hours: "11am – 12am" },
];

export type Category = "sauces" | "apps" | "entrees" | "sides" | "desserts";
export type EntreeType = "wings" | "boneless" | "sandwiches" | "burgers" | "salads";

export type Item = {
  id: string;
  name: string;
  nameEs: string;
  desc: string;
  descEs: string;
  price?: string;
  category: Category;
  type?: EntreeType;
  allergen?: boolean;
  heat?: 0 | 1 | 2 | 3;
  /** location ids where this item is NOT available */
  unavailableAt?: string[];
};

export const menu: Item[] = [
  // Sauces
  { id: "lemon-pepper", name: "Lemon Pepper", nameEs: "Limón con Pimienta", desc: "Dry rub, bright citrus, cracked black pepper.", descEs: "Sazón seco, cítrico brillante y pimienta negra.", category: "sauces", heat: 0 },
  { id: "honey-bbq", name: "Honey BBQ", nameEs: "BBQ con Miel", desc: "Sweet, smoky, the crowd-pleaser.", descEs: "Dulce, ahumada, la favorita de todos.", category: "sauces", heat: 0 },
  { id: "buffalo", name: "Classic Buffalo", nameEs: "Buffalo Clásica", desc: "Cayenne and butter. The original.", descEs: "Cayena y mantequilla. La original.", category: "sauces", heat: 2 },
  { id: "fire-in-the-hole", name: "Fire in the Hole", nameEs: "Fire in the Hole", desc: "Habanero heat with a vinegar snap.", descEs: "Picor de habanero con toque de vinagre.", category: "sauces", heat: 3 },
  { id: "gold-rush", name: "Gold Rush", nameEs: "Gold Rush", desc: "Honey mustard meets buffalo.", descEs: "Mostaza con miel más buffalo.", category: "sauces", heat: 1 },
  { id: "garlic-parm", name: "Garlic Parmesan", nameEs: "Ajo y Parmesano", desc: "Roasted garlic, aged parmesan.", descEs: "Ajo rostizado y parmesano añejo.", category: "sauces", allergen: true, heat: 0, unavailableAt: ["killeen"] },
  { id: "mango-habanero", name: "Mango Habanero", nameEs: "Mango Habanero", desc: "Sweet up front, serious finish.", descEs: "Dulce al inicio, picante al final.", category: "sauces", heat: 3 },
  { id: "dr-pepper-bbq", name: "Dr Pepper BBQ", nameEs: "BBQ Dr Pepper", desc: "Texas-sweet barbecue glaze.", descEs: "Glaseado barbacoa dulce estilo Texas.", category: "sauces", heat: 0, unavailableAt: ["baton-rouge"] },
  { id: "nashville-hot", name: "Nashville Hot", nameEs: "Nashville Picante", desc: "Cayenne oil, brown sugar, pickles on the side.", descEs: "Aceite de cayena, azúcar morena y pepinillos.", category: "sauces", heat: 3, unavailableAt: ["san-marcos", "killeen"] },

  // Apps
  { id: "fried-pickles", name: "Fried Pickles", nameEs: "Pepinillos Fritos", desc: "Hand-breaded spears with ranch.", descEs: "Empanizados a mano con ranch.", price: "$9.49", category: "apps", allergen: true },
  { id: "loaded-tots", name: "Loaded Tots", nameEs: "Tots Cargados", desc: "Cheese, bacon, jalapeño, green onion.", descEs: "Queso, tocino, jalapeño y cebollín.", price: "$10.99", category: "apps", allergen: true },
  { id: "queso", name: "Queso & Chips", nameEs: "Queso con Totopos", desc: "House queso, warm chips.", descEs: "Queso de la casa con totopos calientes.", price: "$8.99", category: "apps", allergen: true },
  { id: "fried-mushrooms", name: "Fried Mushrooms", nameEs: "Champiñones Fritos", desc: "Crispy button mushrooms, horseradish dip.", descEs: "Champiñones crujientes con dip de rábano.", price: "$9.49", category: "apps", allergen: true },
  { id: "spinach-dip", name: "Spinach & Artichoke Dip", nameEs: "Dip de Espinaca y Alcachofa", desc: "Baked, cheesy, served with chips.", descEs: "Horneado con queso, servido con totopos.", price: "$10.49", category: "apps", allergen: true },

  // Entrées - wings
  { id: "traditional-wings", name: "Traditional Wings", nameEs: "Alitas Tradicionales", desc: "Never frozen, tossed in any sauce. 6, 10, 15 or 20.", descEs: "Nunca congeladas, con la salsa que elijas. 6, 10, 15 o 20.", price: "from $12.99", category: "entrees", type: "wings" },
  { id: "smoked-wings", name: "Smoked Wings", nameEs: "Alitas Ahumadas", desc: "Slow-smoked, then flashed crispy.", descEs: "Ahumadas lento y luego crujientes.", price: "from $14.49", category: "entrees", type: "wings" },
  { id: "naked-wings", name: "Naked Wings", nameEs: "Alitas Sin Salsa", desc: "Sauce on the side, dry rub optional.", descEs: "Salsa aparte, sazón opcional.", price: "from $12.99", category: "entrees", type: "wings" },

  // boneless
  { id: "boneless-wings", name: "Boneless Wings", nameEs: "Alitas Sin Hueso", desc: "White meat, hand-breaded, sauced to order.", descEs: "Carne blanca empanizada a mano y con salsa al gusto.", price: "from $12.49", category: "entrees", type: "boneless", allergen: true },
  { id: "tenders", name: "Chicken Tenders", nameEs: "Tiras de Pollo", desc: "Three or five, with fries and a dip.", descEs: "Tres o cinco, con papas y dip.", price: "$13.99", category: "entrees", type: "boneless", allergen: true },

  // sandwiches
  { id: "crispy-chicken-sando", name: "Crispy Chicken Sandwich", nameEs: "Sándwich de Pollo Crujiente", desc: "Brioche, pickles, slaw, choice of sauce.", descEs: "Pan brioche, pepinillos, ensalada de col y tu salsa.", price: "$14.49", category: "entrees", type: "sandwiches", allergen: true },
  { id: "grilled-chicken-sando", name: "Grilled Chicken Sandwich", nameEs: "Sándwich de Pollo a la Parrilla", desc: "Marinated breast, lettuce, tomato, avocado.", descEs: "Pechuga marinada, lechuga, tomate y aguacate.", price: "$14.49", category: "entrees", type: "sandwiches", allergen: true },
  { id: "buffalo-wrap", name: "Buffalo Chicken Wrap", nameEs: "Wrap de Pollo Buffalo", desc: "Tossed chicken, ranch, lettuce, cheddar.", descEs: "Pollo con salsa, ranch, lechuga y cheddar.", price: "$13.49", category: "entrees", type: "sandwiches", allergen: true },

  // burgers
  { id: "pluckers-burger", name: "Pluckers Burger", nameEs: "Hamburguesa Pluckers", desc: "Half-pound patty, American cheese, house sauce.", descEs: "Carne de media libra, queso americano y salsa de la casa.", price: "$15.49", category: "entrees", type: "burgers", allergen: true },
  { id: "bacon-bbq-burger", name: "Bacon BBQ Burger", nameEs: "Hamburguesa BBQ con Tocino", desc: "Cheddar, bacon, onion straws, BBQ.", descEs: "Cheddar, tocino, aros de cebolla y BBQ.", price: "$16.49", category: "entrees", type: "burgers", allergen: true },

  // salads
  { id: "caesar-salad", name: "Traditional Caesar Salad", nameEs: "Ensalada César Tradicional", desc: "Romaine, parmesan, croutons, classic dressing.", descEs: "Lechuga romana, parmesano, crutones y aderezo clásico.", price: "$11.99", category: "entrees", type: "salads", allergen: true },
  { id: "buffalo-chicken-salad", name: "Buffalo Chicken Salad", nameEs: "Ensalada de Pollo Buffalo", desc: "Tossed chicken, bleu cheese, cucumber, tomato.", descEs: "Pollo con salsa, queso azul, pepino y tomate.", price: "$14.99", category: "entrees", type: "salads", allergen: true },
  { id: "house-salad", name: "House Salad", nameEs: "Ensalada de la Casa", desc: "Mixed greens, cheddar, carrots, croutons.", descEs: "Mezcla de verdes, cheddar, zanahoria y crutones.", price: "$9.99", category: "entrees", type: "salads", allergen: true },

  // Sides
  { id: "fries", name: "Seasoned Fries", nameEs: "Papas Sazonadas", desc: "Crispy, generously seasoned.", descEs: "Crujientes y bien sazonadas.", price: "$4.99", category: "sides" },
  { id: "side-caesar", name: "Side Caesar Salad", nameEs: "Ensalada César Chica", desc: "Half portion of the traditional Caesar.", descEs: "Media porción de la César tradicional.", price: "$5.99", category: "sides", allergen: true },
  { id: "mac", name: "Mac & Cheese", nameEs: "Macarrones con Queso", desc: "Three-cheese, baked crumb top.", descEs: "Tres quesos con costra horneada.", price: "$5.99", category: "sides", allergen: true },
  { id: "tots", name: "Tots", nameEs: "Tots", desc: "Golden, salted, dangerous.", descEs: "Dorados, salados y peligrosos.", price: "$4.99", category: "sides" },
  { id: "coleslaw", name: "Coleslaw", nameEs: "Ensalada de Col", desc: "Cool, crunchy, house-made.", descEs: "Fresca, crujiente y hecha en casa.", price: "$3.99", category: "sides", allergen: true },
  { id: "veggie-sticks", name: "Celery & Carrots", nameEs: "Apio y Zanahoria", desc: "With ranch or bleu cheese.", descEs: "Con ranch o queso azul.", price: "$3.49", category: "sides" },

  // Desserts
  { id: "cookie-sundae", name: "Warm Cookie Sundae", nameEs: "Galleta Caliente con Helado", desc: "Skillet cookie, vanilla ice cream, chocolate.", descEs: "Galleta en sartén, helado de vainilla y chocolate.", price: "$8.99", category: "desserts", allergen: true },
  { id: "fried-oreos", name: "Fried Oreos", nameEs: "Oreos Fritas", desc: "Six, dusted in powdered sugar.", descEs: "Seis, espolvoreadas con azúcar glas.", price: "$7.49", category: "desserts", allergen: true },
];

export const dailySpecials: { day: string; dayEs: string; title: string; titleEs: string }[] = [
  { day: "Monday", dayEs: "Lunes", title: "All-day boneless deal", titleEs: "Oferta de sin hueso todo el día" },
  { day: "Tuesday", dayEs: "Martes", title: "Two-for-one tenders", titleEs: "Tiras 2x1" },
  { day: "Wednesday", dayEs: "Miércoles", title: "Wing night pricing", titleEs: "Precio especial de alitas" },
  { day: "Thursday", dayEs: "Jueves", title: "Burger + side combo", titleEs: "Combo hamburguesa y guarnición" },
  { day: "Friday", dayEs: "Viernes", title: "Family pack discount", titleEs: "Descuento en paquete familiar" },
  { day: "Saturday", dayEs: "Sábado", title: "Game day platters", titleEs: "Platones de día de partido" },
  { day: "Sunday", dayEs: "Domingo", title: "Kids eat free", titleEs: "Niños comen gratis" },
];

export type NewsItem = {
  id: string;
  date: string;
  title: string;
  titleEs: string;
  body: string;
  bodyEs: string;
  kind: "current" | "archive" | "giving";
};

export const news: NewsItem[] = [
  { id: "n1", date: "2026-09-02", title: "Featured Sauce: Smoked Peach Habanero", titleEs: "Salsa destacada: Durazno Ahumado con Habanero", body: "Our sauce lab's late-summer drop is on the board through October.", bodyEs: "La creación de fin de verano de nuestro laboratorio de salsas estará hasta octubre.", kind: "current" },
  { id: "n2", date: "2026-08-25", title: "Football season kickoff specials", titleEs: "Especiales de arranque de temporada", body: "Game day platters and reserved big-table seating are back at every location.", bodyEs: "Regresan los platones y las mesas grandes reservadas en todas las ubicaciones.", kind: "current" },
  { id: "n3", date: "2026-08-10", title: "Pickleball courts open in College Station", titleEs: "Canchas de pickleball abren en College Station", body: "Four courts, wing service to the sideline, leagues starting this fall.", bodyEs: "Cuatro canchas, servicio de alitas en la línea y ligas este otoño.", kind: "current" },
  { id: "g1", date: "2026-08-18", title: "$42,000 raised for local school athletics", titleEs: "$42,000 recaudados para deportes escolares", body: "Spirit nights across Texas funded gear and travel for 14 school programs.", bodyEs: "Las noches escolares en Texas financiaron equipo y viajes para 14 programas.", kind: "giving" },
  { id: "g2", date: "2026-07-04", title: "Free meals for first responders", titleEs: "Comidas gratis para servicios de emergencia", body: "Every holiday weekend, badge or uniform gets a meal on us.", bodyEs: "Cada fin de semana festivo, con gafete o uniforme la comida va por nuestra cuenta.", kind: "giving" },
  { id: "g3", date: "2026-05-12", title: "Food bank partnership expands to Baton Rouge", titleEs: "Alianza con banco de alimentos llega a Baton Rouge", body: "Weekly donations now cover all eleven locations.", bodyEs: "Las donaciones semanales ahora cubren las once ubicaciones.", kind: "giving" },
  { id: "a1", date: "2026-03-14", title: "Spring menu refresh", titleEs: "Renovación del menú de primavera", body: "Loaded tots and the traditional Caesar returned to the permanent menu.", bodyEs: "Los tots cargados y la César tradicional regresaron al menú permanente.", kind: "archive" },
  { id: "a2", date: "2025-11-01", title: "30th anniversary celebration", titleEs: "Celebración del 30 aniversario", body: "Throwback pricing and a one-night-only original sauce lineup.", bodyEs: "Precios de antaño y las salsas originales por una sola noche.", kind: "archive" },
  { id: "a3", date: "2025-06-20", title: "Killeen location remodel complete", titleEs: "Remodelación de Killeen completada", body: "New patio, more screens, same wings.", bodyEs: "Nuevo patio, más pantallas, las mismas alitas.", kind: "archive" },
];

export const partners = [
  "Texas State University staff",
  "Texas A&M faculty & staff",
  "Local first responders",
  "Baton Rouge General employees",
  "Austin ISD educators",
];
