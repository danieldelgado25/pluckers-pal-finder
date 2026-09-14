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
  { id: "round-rock", city: "Round Rock", name: "Round Rock", region: "Central Texas", address: "2400 S IH-35, Round Rock, TX", phone: "(512) 244-9464", hours: "11am – 11pm" },
  { id: "san-marcos", city: "San Marcos", name: "San Marcos", region: "Central Texas", address: "105 N LBJ Dr, San Marcos, TX", phone: "(512) 396-9464", hours: "11am – 12am" },
  { id: "college-station", city: "College Station", name: "College Station", region: "Brazos Valley", address: "1730 University Dr E, College Station, TX", phone: "(979) 260-9464", hours: "11am – 12am", pickleball: true },
  { id: "killeen", city: "Killeen", name: "Killeen", region: "Central Texas", address: "2201 E Central Texas Expy, Killeen, TX", phone: "(254) 690-9464", hours: "11am – 11pm" },
  { id: "dallas", city: "Dallas", name: "Dallas", region: "DFW", address: "5350 E Mockingbird Ln, Dallas, TX", phone: "(214) 484-9464", hours: "11am – 11pm" },
  { id: "fort-worth", city: "Fort Worth", name: "Fort Worth", region: "DFW", address: "5228 Trail Lake Dr, Fort Worth, TX", phone: "(817) 386-9464", hours: "11am – 11pm" },
  { id: "houston", city: "Houston", name: "Houston", region: "Gulf Coast", address: "1400 Shepherd Dr, Houston, TX", phone: "(713) 393-9464", hours: "11am – 11pm" },
  { id: "san-antonio", city: "San Antonio", name: "San Antonio", region: "South Texas", address: "1250 SW Loop 410, San Antonio, TX", phone: "(210) 267-9464", hours: "11am – 11pm" },
  { id: "baton-rouge", city: "Baton Rouge", name: "Baton Rouge", region: "Louisiana", address: "4225 Nicholson Dr, Baton Rouge, LA", phone: "(225) 636-9464", hours: "11am – 12am" },
];

/* ---------------- Sauces ---------------- */

export type SauceGroup =
  | "featured"
  | "originals"
  | "traditional"
  | "rubs";

export type Sauce = {
  id: string;
  name: string;
  nameEs: string;
  desc: string;
  descEs: string;
  /** 0 – 5 flames */
  heat: 0 | 1 | 2 | 3 | 4 | 5;
  group: SauceGroup;
  founderPick?: "Mark" | "Dave" | "Sean";
  dryRub?: boolean;
  note?: string;
  noteEs?: string;
};

export const sauces: Sauce[] = [
  {
    id: "pickle-dust",
    name: "Pickle Dust",
    nameEs: "Pickle Dust",
    desc: "Pickle lovers, rejoice! Our new dry rub is a big dill. Pickle your wings, your apps, your fries, anything!",
    descEs: "¡Amantes del pepinillo, a celebrar! Nuestro nuevo sazón seco es un encurtido total. Úsalo en alitas, entradas, papas, lo que sea.",
    heat: 0,
    group: "featured",
    dryRub: true,
    note: "Limited time only. While supplies last.",
    noteEs: "Tiempo limitado. Hasta agotar existencias.",
  },

  { id: "bakers-gold", name: "Baker's Gold", nameEs: "Baker's Gold", desc: "This original flavor has become a Pluckers treasure. Bold BBQ flavor with golden mustard and enough heat to still pack a punch.", descEs: "Un sabor original que ya es tesoro de Pluckers. BBQ intenso con mostaza dorada y el picor justo.", heat: 2, group: "originals", founderPick: "Mark" },
  { id: "honey-bbq", name: "Honey BBQ", nameEs: "BBQ con Miel", desc: "Taste the sweet, not the heat.", descEs: "Puro dulce, sin picor.", heat: 0, group: "originals", founderPick: "Mark" },

  { id: "maple-chipotle", name: "Maple Chipotle", nameEs: "Maple con Chipotle", desc: "A sweet, syrupy glaze with a smoky chipotle kick.", descEs: "Glaseado dulce tipo miel de maple con toque ahumado de chipotle.", heat: 1, group: "originals", founderPick: "Dave" },
  { id: "manganero", name: "Manganero", nameEs: "Manganero", desc: "Mango sweetness up front. Habanero heat in the back. This glaze is a tropical rollercoaster.", descEs: "Dulzura de mango al frente y habanero al final. Una montaña rusa tropical.", heat: 3, group: "originals", founderPick: "Dave" },

  { id: "spicy-lemon-pepper", name: "Spicy Lemon Pepper", nameEs: "Limón con Pimienta Picante", desc: "Our Medium and Lemon Pepper combined.", descEs: "Nuestra Medium y Limón con Pimienta combinadas.", heat: 2, group: "rubs", founderPick: "Sean", dryRub: true },
  { id: "spicy-ranch", name: "Spicy Ranch", nameEs: "Ranch Picante", desc: "A kicked up version of our Ranch dry rub.", descEs: "Versión con más carácter de nuestro sazón Ranch.", heat: 2, group: "rubs", founderPick: "Sean", dryRub: true },

  { id: "raspberry-chipotle", name: "Raspberry Chipotle", nameEs: "Frambuesa con Chipotle", desc: "A bold blend of ripe raspberries and smoky chipotle peppers for a slow-building heat.", descEs: "Mezcla intensa de frambuesa madura y chipotle ahumado con picor que sube poco a poco.", heat: 3, group: "originals" },
  { id: "vampire-killer", name: "Vampire Killer", nameEs: "Vampire Killer", desc: "The heat from this spicy garlic sauce is strong enough to wake the undead.", descEs: "El picor de esta salsa de ajo despierta hasta a los muertos.", heat: 3, group: "originals" },
  { id: "fire-in-the-hole", name: "Fire in the Hole", nameEs: "Fire in the Hole", desc: "Burns going in… burns going out.", descEs: "Quema al entrar… y al salir.", heat: 5, group: "originals" },
  { id: "garlic-parmesan", name: "Garlic Parmesan", nameEs: "Ajo y Parmesano", desc: "Rich, garlicky, and dripping with so much chunky parmesan it barely qualifies as dry rub.", descEs: "Rica, con mucho ajo y tanto parmesano en trozos que apenas es un sazón seco.", heat: 0, group: "originals" },
  { id: "spicy-garlic-parmesan", name: "Spicy Garlic Parmesan", nameEs: "Ajo y Parmesano Picante", desc: "When our fans kept requesting our Garlic Parm get mixed with Buffalo hot sauce, we knew they were on to something.", descEs: "Nuestros fans pedían mezclar el ajo con parmesano y la Buffalo hot. Tenían razón.", heat: 2, group: "originals" },
  { id: "dr-pepper", name: "Dr Pepper®", nameEs: "Dr Pepper®", desc: "A BBQ sauce based on the legendary Texas soda. A mix of every flavor, except spicy!", descEs: "BBQ basada en el refresco legendario de Texas. Todos los sabores, menos picante.", heat: 0, group: "originals" },
  { id: "goldrush", name: "Goldrush", nameEs: "Goldrush", desc: "Smoky, tangy, and just sweet enough to strike flavor gold.", descEs: "Ahumada, ácida y con el dulzor justo para dar en el oro.", heat: 0, group: "originals" },
  { id: "spicy-mandarin", name: "Spicy Mandarin", nameEs: "Mandarina Picante", desc: "Zesty citrus, a touch of soy, and a rising chili heat. Flavorful and fiery.", descEs: "Cítrico vibrante, un toque de soya y picor de chile en ascenso.", heat: 3, group: "originals" },

  { id: "buffalo-mild", name: "Buffalo Mild", nameEs: "Buffalo Suave", desc: "For a Pluckers beginner.", descEs: "Para principiantes en Pluckers.", heat: 1, group: "traditional" },
  { id: "buffalo-medium", name: "Buffalo Medium", nameEs: "Buffalo Media", desc: "Tangy with a bit of a kick.", descEs: "Ácida con un buen golpe.", heat: 2, group: "traditional" },
  { id: "buffalo-hot", name: "Buffalo Hot", nameEs: "Buffalo Picante", desc: "Professionals only, please.", descEs: "Solo para profesionales.", heat: 4, group: "traditional" },
  { id: "teriyaki", name: "Teriyaki", nameEs: "Teriyaki", desc: "A rich soy glaze with a touch of garlic and sweetness. Simple. Timeless. Delicious.", descEs: "Glaseado de soya con ajo y dulzor. Simple, clásico y delicioso.", heat: 0, group: "traditional" },
  { id: "spicy-bbq", name: "Spicy BBQ", nameEs: "BBQ Picante", desc: "Our BBQ with a cayenne kick.", descEs: "Nuestra BBQ con golpe de cayena.", heat: 2, group: "traditional" },
  { id: "gochujang", name: "Gochujang", nameEs: "Gochujang", desc: "A spicy-sweet blend of fermented chili, garlic, and soy. Deep flavor hits straight to the Seoul.", descEs: "Mezcla dulce y picante de chile fermentado, ajo y soya. Sabor profundo directo al alma.", heat: 2, group: "traditional" },

  { id: "lemon-pepper", name: "Lemon Pepper", nameEs: "Limón con Pimienta", desc: "Zesty, salty, and sharp. Pucker up!", descEs: "Cítrico, salado y filoso. ¡Frunce los labios!", heat: 0, group: "rubs", dryRub: true },
  { id: "ranch-rub", name: "Ranch", nameEs: "Ranch", desc: "A Texas favorite.", descEs: "La favorita de Texas.", heat: 0, group: "rubs", dryRub: true },
  { id: "cajun", name: "Cajun", nameEs: "Cajún", desc: "All the bold Louisiana flavor without the burn. Savory, smoky, and full of soul.", descEs: "Todo el sabor de Luisiana sin el ardor. Sabroso, ahumado y con alma.", heat: 0, group: "rubs", dryRub: true },
];

/* ---------------- Food menu ---------------- */

export type Category =
  | "pregame"
  | "entrees"
  | "sideline"
  | "desserts"
  | "drinks";

export type EntreeType = "wings" | "tenders" | "burgers" | "sandwiches" | "salads";

export type Item = {
  id: string;
  name: string;
  nameEs: string;
  desc: string;
  descEs: string;
  price?: string;
  calories?: string;
  category: Category;
  type?: EntreeType;
  allergen?: boolean;
  /** location ids where this item is NOT available */
  unavailableAt?: string[];
};

export const menu: Item[] = [
  // PREGAME
  { id: "appetizer-sampler", name: "Appetizer Sampler", nameEs: "Sampler de Entradas", desc: "6 Fried Pickles, 4 Holy Macaroni, and 4 Fried Cheese. Quintessential Pluckers.", descEs: "6 pepinillos fritos, 4 Holy Macaroni y 4 quesos fritos. Pluckers en esencia.", price: "$19.00", calories: "3368 cal", category: "pregame", allergen: true },
  { id: "fried-pickles", name: "Fried Pickles", nameEs: "Pepinillos Fritos", desc: "It's our #1 selling appetizer. Try a full or half order.", descEs: "Nuestra entrada más vendida. Orden completa o media.", price: "$9.00 / $5.00", calories: "566–872 cal", category: "pregame", allergen: true },
  { id: "holy-macaroni", name: "Holy Macaroni", nameEs: "Holy Macaroni", desc: "At Pluckers, we fry everything — even Macaroni and Cheese.", descEs: "En Pluckers freímos todo, hasta los macarrones con queso.", price: "$10.00", calories: "1481 cal", category: "pregame", allergen: true },
  { id: "pluckers-nachos", name: "Pluckers Nachos", nameEs: "Nachos Pluckers", desc: "Tortilla chips topped with chicken, queso, Honey BBQ sauce, red onions, and cilantro.", descEs: "Totopos con pollo, queso, salsa Honey BBQ, cebolla morada y cilantro.", price: "$12.00", calories: "1243 cal", category: "pregame", allergen: true },
  { id: "fried-cheese", name: "Fried Cheese", nameEs: "Queso Frito", desc: "Giant blocks of our fresh mozzarella cheese deep fried in our homemade breading.", descEs: "Bloques gigantes de mozzarella fresca empanizados y fritos.", price: "$10.00", calories: "1321 cal", category: "pregame", allergen: true },
  { id: "blue-cheese-chips", name: "Blue Cheese Potato Chips", nameEs: "Papas con Queso Azul", desc: "Topped with bacon, blue cheese, chopped tomatoes, and green onions.", descEs: "Con tocino, queso azul, tomate picado y cebollín.", price: "$10.00", calories: "1817 cal", category: "pregame", allergen: true },
  { id: "waffles-n-cheese", name: "Waffles N' Cheese", nameEs: "Waffles N' Cheese", desc: "Waffle fries smothered in Monterey Jack, cheddar, bacon, sour cream, and jalapeños. Try a full or half order.", descEs: "Papas waffle bañadas en Monterey Jack, cheddar, tocino, crema y jalapeños. Completa o media.", price: "$12.00 / $6.50", calories: "959–1671 cal", category: "pregame", allergen: true },
  { id: "chips-queso", name: "Chips & Queso", nameEs: "Totopos con Queso", desc: "The favorite dip for your chip!", descEs: "El dip favorito para tus totopos.", price: "$8.00", calories: "1030 cal", category: "pregame", allergen: true },
  { id: "frachos", name: "Frachos™", nameEs: "Frachos™", desc: "Substitute tortilla chips with Waffle Fries!", descEs: "Cambia los totopos por papas waffle.", price: "$13.50", calories: "1333 cal", category: "pregame", allergen: true },
  { id: "totchos", name: "Totchos", nameEs: "Totchos", desc: "Substitute tortilla chips with Tater Tots!", descEs: "Cambia los totopos por tots de papa.", price: "$14.00", calories: "1453 cal", category: "pregame", allergen: true },

  // ENTREES — wings
  { id: "wing-combo-5", name: "5 Wing Combo", nameEs: "Combo de 5 Alitas", desc: "One sauce. Served with waffle fries, tater tots, or chips.", descEs: "Una salsa. Con papas waffle, tots o papas fritas caseras.", price: "$12.00", calories: "585–1329 cal", category: "entrees", type: "wings" },
  { id: "wing-combo-10", name: "10 Wing Combo", nameEs: "Combo de 10 Alitas", desc: "Two sauces. Served with waffle fries, tater tots, or chips.", descEs: "Dos salsas. Con papas waffle, tots o papas caseras.", price: "$19.75", calories: "945–1531 cal", category: "entrees", type: "wings" },
  { id: "wing-combo-15", name: "15 Wing Combo", nameEs: "Combo de 15 Alitas", desc: "Three sauces. Served with waffle fries, tater tots, or chips.", descEs: "Tres salsas. Con papas waffle, tots o papas caseras.", price: "$28.00", calories: "1305–2309 cal", category: "entrees", type: "wings" },
  { id: "wings-5", name: "5 Pieces", nameEs: "5 Piezas", desc: "You ordering for Nana?", descEs: "¿Pediste para la abuelita?", price: "$8.50", category: "entrees", type: "wings" },
  { id: "wings-10", name: "10 Pieces", nameEs: "10 Piezas", desc: "Single.", descEs: "Sencillo.", price: "$17.00", category: "entrees", type: "wings" },
  { id: "wings-15", name: "15 Pieces", nameEs: "15 Piezas", desc: "I'm Pluckin' starvin'.", descEs: "Me muero de hambre.", price: "$25.50", category: "entrees", type: "wings" },
  { id: "wings-20", name: "20 Pieces", nameEs: "20 Piezas", desc: "Double.", descEs: "Doble.", price: "$34.00", category: "entrees", type: "wings" },
  { id: "wall-of-flame", name: "5 Wing Wall of Flame Challenge", nameEs: "Reto Wall of Flame (5 alitas)", desc: "Finish 5 Fire in the Hole wings in 5 minutes to join our Wall of Flame and get a T-shirt. No shirt for those who do not complete the challenge. No participation trophies here!", descEs: "Termina 5 alitas Fire in the Hole en 5 minutos y entra al Wall of Flame con playera. Si no lo logras, no hay playera ni trofeo de participación.", price: "$13.50", calories: "585–1329 cal", category: "entrees", type: "wings" },
  { id: "party-wings", name: "Party Platter — Wings", nameEs: "Platón de Fiesta — Alitas", desc: "50 pieces $85.00 · 100 pieces $170.00", descEs: "50 piezas $85.00 · 100 piezas $170.00", category: "entrees", type: "wings" },

  // ENTREES — tenders
  { id: "buffalo-bites-basket", name: "Buffalo Bites Basket", nameEs: "Canasta de Buffalo Bites", desc: "1 lb of hand-breaded, bite-sized versions of our Jumbo Tenders. Tossed in your favorite wing sauce and served with a side.", descEs: "450 g de versiones pequeñas de nuestros Jumbo Tenders, empanizadas a mano, con tu salsa favorita y una guarnición.", price: "$15.50", calories: "1023–1907 cal", category: "entrees", type: "tenders", allergen: true },
  { id: "jumbo-tenders-basket", name: "Jumbo Tenders Basket", nameEs: "Canasta de Jumbo Tenders", desc: "1 lb of hand-breaded chicken tenders tossed in your favorite wing sauce and served with a side.", descEs: "450 g de tiras de pollo empanizadas a mano con tu salsa favorita y guarnición.", price: "$16.00", calories: "906–1906 cal", category: "entrees", type: "tenders", allergen: true },
  { id: "monster-tenders-basket", name: "Monster Jumbo Tenders Basket", nameEs: "Canasta Monster Jumbo Tenders", desc: "Just like its truck counterpart, this monster is bigger and badder. 1.5 lbs of delicious tenders and a side.", descEs: "Como su tocayo de cuatro ruedas: más grande y más rudo. 680 g de tiras y una guarnición.", price: "$24.00", calories: "1265–2948 cal", category: "entrees", type: "tenders", allergen: true },
  { id: "naked-tenders-basket", name: "Naked Jumbo Tenders Basket", nameEs: "Canasta de Tenders sin Empanizar", desc: "1 lb of our fresh chicken tenders cooked on the grill and served with a side.", descEs: "450 g de tiras de pollo fresco a la parrilla con guarnición.", price: "$16.00", calories: "645–1519 cal", category: "entrees", type: "tenders" },
  { id: "beyond-tenders-basket", name: "\u201CBeyond Meat\u201D Tenders Basket", nameEs: "Canasta de Tenders \u201CBeyond Meat\u201D", desc: "1/2 lb of plant-based \u201Cchicken\u201D tenders tossed in your favorite wing sauce and served with a side.", descEs: "225 g de tiras de \u201Cpollo\u201D vegetal con tu salsa favorita y guarnición.", price: "$17.00", calories: "540–1170 cal", category: "entrees", type: "tenders", allergen: true },
  { id: "party-tenders", name: "Party Platter — Jumbo Tenders & Buffalo Bites", nameEs: "Platón de Fiesta — Tenders y Buffalo Bites", desc: "Jumbo Tenders: 50 pc $125.00 · 100 pc $250.00. Buffalo Bites: 50 $30.00 · 100 $60.00", descEs: "Jumbo Tenders: 50 pz $125.00 · 100 pz $250.00. Buffalo Bites: 50 $30.00 · 100 $60.00", category: "entrees", type: "tenders", allergen: true },

  // ENTREES — burgers
  { id: "bypass-burger", name: "The Bypass Burger", nameEs: "The Bypass Burger", desc: "Who ever said Pluckers was healthy? A hamburger topped with bacon, cheese, grilled onions, jalapeños, and Pluckers Sauce.", descEs: "¿Quién dijo que Pluckers era saludable? Hamburguesa con tocino, queso, cebolla asada, jalapeños y salsa Pluckers.", price: "$15.50", calories: "1055–1381 cal", category: "entrees", type: "burgers", allergen: true },
  { id: "honey-bbq-burger", name: "Honey BBQ Burger", nameEs: "Hamburguesa Honey BBQ", desc: "Our burger tossed in Honey BBQ sauce and covered with cheese and grilled onions.", descEs: "Nuestra hamburguesa bañada en Honey BBQ con queso y cebolla asada.", price: "$15.50", calories: "891–1216 cal", category: "entrees", type: "burgers", allergen: true },
  { id: "dirty-patty-melt", name: "The Dirty Patty Melt", nameEs: "The Dirty Patty Melt", desc: "A classic with a fresh hamburger patty, sliced American cheese, and grilled onions served on Texas toast.", descEs: "Un clásico: carne fresca, queso americano y cebolla asada en pan Texas toast.", price: "$15.00", calories: "931–1256 cal", category: "entrees", type: "burgers", allergen: true },
  { id: "boring-burger", name: "Boring Burger", nameEs: "Boring Burger", desc: "Boring compared to everything else, but wait until you taste the Pluckers Sauce on it! Comes with your choice of cheese.", descEs: "Aburrida al lado del resto… hasta que pruebas la salsa Pluckers. Con el queso que elijas.", price: "$14.50", calories: "971–1451 cal", category: "entrees", type: "burgers", allergen: true },
  { id: "gut-grenade", name: "The Gut Grenade", nameEs: "The Gut Grenade", desc: "We dare you to finish it! A double meat burger topped with queso, Pluckers Sauce, grilled onions, bacon, and jalapeños served with a side of Waffles n' Cheese and a 24 oz. domestic beer.", descEs: "Te retamos a terminarla. Doble carne con queso fundido, salsa Pluckers, cebolla asada, tocino y jalapeños, con Waffles n' Cheese y una cerveza de 24 oz.", price: "$20.00", calories: "1897 cal", category: "entrees", type: "burgers", allergen: true },
  { id: "impossible-burger", name: "Impossible Burger", nameEs: "Impossible Burger", desc: "A burger made entirely from plants but tastes like meat! Comes with your choice of cheese, lettuce, grilled onions, and Pluckers Sauce.", descEs: "Hecha 100% de plantas pero sabe a carne. Con queso a elegir, lechuga, cebolla asada y salsa Pluckers.", price: "$16.50", calories: "1157–1482 cal", category: "entrees", type: "burgers", allergen: true },

  // ENTREES — sandwiches
  { id: "buffalo-chicken-sandwich", name: "Buffalo Chicken Sandwich", nameEs: "Sándwich de Pollo Buffalo", desc: "A hand-breaded and fried chicken breast tossed in your favorite wing sauce and served with your choice of ranch or blue cheese.", descEs: "Pechuga empanizada a mano y frita con tu salsa favorita, con ranch o queso azul.", price: "$15.50", calories: "950–1594 cal", category: "entrees", type: "sandwiches", allergen: true },
  { id: "cheech-and-chong", name: "Cheech and Chong", nameEs: "Cheech and Chong", desc: "Man, it's a fried chicken breast with queso, guacamole, grilled onions, and tortilla strips, man.", descEs: "Pechuga frita con queso fundido, guacamole, cebolla asada y tiras de tortilla.", price: "$16.00", calories: "1157–1482 cal", category: "entrees", type: "sandwiches", allergen: true },
  { id: "south-philly", name: "South Philly Cheesesteak", nameEs: "South Philly Cheesesteak", desc: "Smothered in grilled onions and queso.", descEs: "Bañado en cebolla asada y queso fundido.", price: "$15.00", calories: "916–1242 cal", category: "entrees", type: "sandwiches", allergen: true },
  { id: "chicken-cheesesteak", name: "Chicken Cheesesteak", nameEs: "Cheesesteak de Pollo", desc: "Thinly sliced chicken smothered in grilled onions and queso.", descEs: "Pollo en tiras finas con cebolla asada y queso fundido.", price: "$15.00", calories: "646–1224 cal", category: "entrees", type: "sandwiches", allergen: true },
  { id: "chicken-club", name: "Chicken Club", nameEs: "Chicken Club", desc: "A grilled chicken breast tossed in Buffalo Medium and topped with bacon, cheese, and grilled onions.", descEs: "Pechuga a la parrilla con Buffalo Media, tocino, queso y cebolla asada.", price: "$15.00", calories: "737–1062 cal", category: "entrees", type: "sandwiches", allergen: true },
  { id: "chicken-bypass", name: "The Chicken Bypass", nameEs: "The Chicken Bypass", desc: "A chicken breast topped with bacon, cheese, grilled onions, jalapeños, and Pluckers Sauce.", descEs: "Pechuga con tocino, queso, cebolla asada, jalapeños y salsa Pluckers.", price: "$15.50", calories: "795–1300 cal", category: "entrees", type: "sandwiches", allergen: true },
  { id: "larry-bird", name: "The Larry Bird", nameEs: "The Larry Bird", desc: "Like the hick from French Lick, our chicken is all white meat tossed in your favorite Wing Sauce.", descEs: "Como el de French Lick: puro pollo de carne blanca con tu salsa favorita.", price: "$14.50", calories: "535–1120 cal", category: "entrees", type: "sandwiches", allergen: true },
  { id: "seans-blt", name: "Sean's BLT", nameEs: "Sean's BLT", desc: "6 strips of bacon, lettuce, mayo, and a slice of fresh tomato.", descEs: "6 tiras de tocino, lechuga, mayonesa y una rebanada de tomate fresco.", price: "$13.00", calories: "856–1181 cal", category: "entrees", type: "sandwiches", allergen: true },
  { id: "moms-grilled-cheese", name: "Mom's Grilled Cheese", nameEs: "Sándwich de Queso de Mamá", desc: "Texas toast smothered in butter, melted American cheese, and maternal love. Thanks Mom.", descEs: "Pan Texas toast con mantequilla, queso americano derretido y amor de mamá.", price: "$10.00", calories: "485–810 cal", category: "entrees", type: "sandwiches", allergen: true },

  // ENTREES — salads
  { id: "buffalo-chicken-salad", name: "Buffalo Chicken Salad", nameEs: "Ensalada de Pollo Buffalo", desc: "A garden salad with chopped Jumbo Tenders tossed in your favorite wing sauce. Bacon and cheese upon request.", descEs: "Ensalada verde con Jumbo Tenders picados en tu salsa favorita. Tocino y queso a pedido.", price: "$14.00", calories: "610–1448 cal", category: "entrees", type: "salads", allergen: true },
  { id: "honey-bbq-chop", name: "Honey BBQ Chicken Chop", nameEs: "Honey BBQ Chicken Chop", desc: "A salad full of crunch featuring crisp lettuce, grilled chicken, tomatoes, black beans, corn, and our own Honey BBQ sauce. Topped with tortilla strips.", descEs: "Ensalada crujiente con lechuga, pollo a la parrilla, tomate, frijol negro, elote y salsa Honey BBQ. Con tiras de tortilla.", price: "$14.00", calories: "646–1224 cal", category: "entrees", type: "salads", allergen: true },
  { id: "southwest-caesar", name: "Southwest Caesar", nameEs: "César Southwest", desc: "Your choice of grilled or fried chicken on top of romaine, black beans, corn, tortilla strips, and Classic Caesar dressing.", descEs: "Pollo a la parrilla o frito sobre romana, frijol negro, elote, tiras de tortilla y aderezo César clásico.", price: "$14.00", calories: "936 cal", category: "entrees", type: "salads", allergen: true },
  { id: "blue-cheese-cobb", name: "Blue Cheese Chicken Cobb", nameEs: "Cobb de Pollo con Queso Azul", desc: "Grilled chicken, avocado, blue cheese, bacon, tortilla strips, tomatoes, and cabbage all neatly stacked on top of crisp lettuce.", descEs: "Pollo a la parrilla, aguacate, queso azul, tocino, tiras de tortilla, tomate y col sobre lechuga fresca.", price: "$14.00", calories: "760–1338 cal", category: "entrees", type: "salads", allergen: true },
  { id: "grilled-garden-salad", name: "Grilled Chicken Garden Salad", nameEs: "Ensalada Verde con Pollo a la Parrilla", desc: "Grilled chicken, iceberg, romaine, carrots, cabbage, and garlic croutons. Bacon and cheese upon request.", descEs: "Pollo a la parrilla, lechuga iceberg y romana, zanahoria, col y crutones de ajo. Tocino y queso a pedido.", price: "$14.00", calories: "432–1010 cal", category: "entrees", type: "salads", allergen: true },

  // SIDELINE
  { id: "homemade-chips", name: "Homemade Potato Chips", nameEs: "Papas Caseras", desc: "Fresh cooked chips served with homemade blue cheese dressing.", descEs: "Papas recién fritas con aderezo casero de queso azul.", price: "$4.50", calories: "435 cal", category: "sideline", allergen: true },
  { id: "waffle-fries", name: "Waffle Fries", nameEs: "Papas Waffle", desc: "The best fries anywhere, period!", descEs: "Las mejores papas, punto.", price: "$4.50", calories: "360 cal", category: "sideline" },
  { id: "tater-tots", name: "Tater Tots", nameEs: "Tots de Papa", desc: "Golden, salted, dangerous.", descEs: "Dorados, salados y peligrosos.", price: "$4.50", calories: "320 cal", category: "sideline" },
  { id: "mac-and-cheese", name: "Macaroni and Cheese", nameEs: "Macarrones con Queso", desc: "Creamy and classic.", descEs: "Cremosos y clásicos.", price: "$5.00", calories: "300 cal", category: "sideline", allergen: true },
  { id: "side-salad", name: "Side Salad", nameEs: "Ensalada Chica", desc: "A smaller green start to the meal.", descEs: "Un inicio verde en porción chica.", price: "$5.50", calories: "168–457 cal", category: "sideline", allergen: true },
  { id: "side-caesar", name: "Side Caesar Salad", nameEs: "Ensalada César Chica", desc: "Romaine, parmesan, croutons, Classic Caesar dressing.", descEs: "Romana, parmesano, crutones y aderezo César clásico.", price: "$6.00", calories: "254 cal", category: "sideline", allergen: true },
  { id: "side-dressing", name: "Side of House-Made Ranch or Blue Cheese", nameEs: "Ranch o Queso Azul de la Casa", desc: "75¢ / $1.50 / $3.00", descEs: "75¢ / $1.50 / $3.00", calories: "260–319 cal", category: "sideline", allergen: true },

  // DESSERT
  { id: "brownie", name: "Brownie", nameEs: "Brownie", desc: "A HUGE brownie made from scratch and served warm with a scoop of Blue Bell® vanilla ice cream.", descEs: "Un brownie ENORME hecho desde cero, tibio y con una bola de helado Blue Bell® de vainilla.", price: "$8.00", calories: "1230 cal", category: "desserts", allergen: true },
  { id: "fried-twinkies", name: "Fried Twinkies", nameEs: "Twinkies Fritos", desc: "Hostess Twinkies dipped in our original batter and served with a scoop of Blue Bell® vanilla ice cream.", descEs: "Twinkies Hostess en nuestra masa original con una bola de helado Blue Bell® de vainilla.", price: "$8.00", calories: "700 cal", category: "desserts", allergen: true },
  { id: "fried-cookies-cream", name: "Fried Cookies & Cream", nameEs: "Galletas y Crema Fritas", desc: "A Texas State Fair favorite made with real OREO® Cookies served with a scoop of Blue Bell® vanilla ice cream.", descEs: "Favorita de la feria de Texas, con galletas OREO® y helado Blue Bell® de vainilla.", price: "$8.00", calories: "1040 cal", category: "desserts", allergen: true },
];

export const menuNotes = {
  wings: {
    en: "Side of wing sauce $1 · Split flavors 40¢ · All drums or all flappers $1 per 10 wings · Extra wet wings $1 per 10 wings",
    es: "Salsa extra $1 · Sabores divididos 40¢ · Solo baquetas o solo aletas $1 por cada 10 · Extra salsa $1 por cada 10",
  },
  baskets: {
    en: "All baskets, wing combos, sandwiches, and burgers are served with waffle fries, tater tots, or chips. Substitute with anything from the Sideline for $2.00.",
    es: "Todas las canastas, combos de alitas, sándwiches y hamburguesas incluyen papas waffle, tots o papas caseras. Cambia por algo del Sideline por $2.00.",
  },
  burgers: {
    en: "Swap any burger with an Impossible patty for $3.00.",
    es: "Cambia cualquier hamburguesa por carne Impossible por $3.00.",
  },
  toss: { en: "Toss anything in your favorite sauce for $1!", es: "¡Baña lo que quieras en tu salsa favorita por $1!" },
  party: {
    en: "Parties of 6 or more will have an automatic 20% gratuity added to the check. Consuming undercooked meat, poultry, seafood, shellfish, or eggs may increase your risk of foodborne illness.",
    es: "Grupos de 6 o más llevan 20% de propina automática. Consumir carne, aves, pescados o huevos crudos o poco cocidos puede aumentar el riesgo de enfermedad.",
  },
};

/* ---------------- Drinks ---------------- */

export type Drink = {
  id: string;
  name: string;
  desc?: string;
  descEs?: string;
  price?: string;
  group: "cocktails" | "margaritas" | "draft" | "cans" | "wine";
};

export const drinks: Drink[] = [
  { id: "pluckers-lemonade", name: "Pluckers Lemonade", desc: "Made with Austin's own Tito's Handmade Vodka. You would've had more customers at your childhood lemonade stand with this.", descEs: "Hecha con vodka Tito's de Austin. Con esto tu puesto de limonada habría sido un éxito.", price: "Regular $7.50 · Large $10.50", group: "cocktails" },
  { id: "pluckers-michelada", name: "Pluckers Michelada", desc: "Our twist on a Texas favorite made with Dos Equis and featuring our Baker's Gold sauce.", descEs: "Nuestra versión del clásico texano con Dos Equis y salsa Baker's Gold.", price: "Regular $5.00 · Large $7.50", group: "cocktails" },
  { id: "psychedelic-frog", name: "Psychedelic Frog", desc: "4 liquors and 3 mixers create this neon green drink.", descEs: "4 licores y 3 mezcladores en un trago verde neón.", price: "Regular $6.50 · Large $9.00", group: "cocktails" },
  { id: "batman", name: "Batman", desc: "Made with Austin's own Tito's Handmade Vodka. This drink may do more to cause crime than to fight it.", descEs: "Con vodka Tito's de Austin. Este trago causa más problemas de los que resuelve.", price: "Regular $7.00 · Large $9.75", group: "cocktails" },
  { id: "liquid-tailgate", name: "Liquid Tailgate Bloody Mary", desc: "A chicken wing, pickle, two strips of bacon, spicy green beans, and olives with Absolut Vodka and Zing Zang Bloody Mary Mix.", descEs: "Una alita, pepinillo, dos tiras de tocino, ejotes picantes y aceitunas con vodka Absolut y mezcla Zing Zang.", price: "$9.50", group: "cocktails" },
  { id: "irish-trash-can", name: "Irish Trash Can Punch", desc: "A wild mix of Red Bull with six different liquors.", descEs: "Mezcla salvaje de Red Bull con seis licores.", price: "$10.50", group: "cocktails" },
  { id: "toxic-tea", name: "Toxic Tea", desc: "Homemade sweet tea, fresh lemonade, and vodka. Add a floater of peach or raspberry schnapps for 50¢.", descEs: "Té dulce casero, limonada fresca y vodka. Agrega schnapps de durazno o frambuesa por 50¢.", price: "Regular $6.50 · Large $9.00", group: "cocktails" },
  { id: "redrum", name: "Redrum", desc: "Our signature rum drink featuring Bacardi Raspberry and Bacardi Superior.", descEs: "Nuestro trago de ron con Bacardi Raspberry y Bacardi Superior.", price: "Regular $7.00 · Large $10.50", group: "cocktails" },
  { id: "aguasol-sunrise", name: "Aguasol Sunrise", desc: "Made with Austin's own Aguasol tequila.", descEs: "Con tequila Aguasol de Austin.", price: "$11.00", group: "cocktails" },
  { id: "moscow-mule", name: "Grey Goose Moscow Mule", desc: "Grey Goose Vodka, ginger beer, and lime.", descEs: "Vodka Grey Goose, ginger beer y limón.", price: "$11.00", group: "cocktails" },
  { id: "jameson-ginger-peach", name: "Jameson Ginger Peach", desc: "Jameson whiskey, peach puree, and ginger beer.", descEs: "Whiskey Jameson, puré de durazno y ginger beer.", price: "$12.00", group: "cocktails" },
  { id: "high-west-old-fashioned", name: "High West Old Fashioned", desc: "An American classic made with High West American Prairie Bourbon.", descEs: "Un clásico americano con bourbon High West American Prairie.", price: "$9.50", group: "cocktails" },
  { id: "boozeberry", name: "Boozeberry", desc: "Western Son Blueberry Vodka and the sweet taste of lemonade.", descEs: "Vodka Western Son de arándano con el dulzor de la limonada.", price: "$8.50", group: "cocktails" },
  { id: "pluckers-lit", name: "Pluckers L.I.T.", desc: "Our top-shelf Long Island Tea featuring Dulce Vida Tequila.", descEs: "Nuestro Long Island premium con tequila Dulce Vida.", price: "$8.50", group: "cocktails" },

  { id: "regular-rita", name: "Regular-Rita (frozen)", desc: "8 oz.", descEs: "8 oz.", price: "$8.50", group: "margaritas" },
  { id: "mega-rita", name: "Mega-Rita (frozen)", desc: "16 oz. Choose between Regular, Strawberry, Mango, Pineapple, or Pluckers Colada.", descEs: "16 oz. Elige entre Regular, Fresa, Mango, Piña o Pluckers Colada.", price: "$14.00", group: "margaritas" },
  { id: "pluckers-margarita", name: "Pluckers Margarita", desc: "Made with fresh juices and Dulce Vida tequila. Served with a tajín rim.", descEs: "Con jugos frescos y tequila Dulce Vida. Con escarcha de tajín.", price: "$10.00", group: "margaritas" },
  { id: "jalapeno-pineapple-rita", name: "Dulce Vida Jalapeño Pineapple Margarita", desc: "Made with fresh juices, pineapple, and Dulce Vida tequila.", descEs: "Con jugos frescos, piña y tequila Dulce Vida.", price: "$9.00", group: "margaritas" },
  { id: "strawberry-rocks", name: "Strawberry Margarita on the Rocks", desc: "A classic margarita with a fruity spin.", descEs: "La margarita clásica con un giro frutal.", price: "$10.00", group: "margaritas" },

  { id: "draft-local", name: "Local Draft", desc: "512 IPA (7.2%) · McConauHaze (6.5% IPA) · Pinthouse Electric Jellyfish (6.5% IPA)", descEs: "512 IPA (7.2%) · McConauHaze (6.5% IPA) · Pinthouse Electric Jellyfish (6.5% IPA)", group: "draft" },
  { id: "draft-regional", name: "Regional Draft", desc: "Karbach Love Street (4.9% pilsner) · Shiner Bock (4.4% bock)", descEs: "Karbach Love Street (4.9% pilsner) · Shiner Bock (4.4% bock)", group: "draft" },
  { id: "draft-craft", name: "Craft Draft", desc: "Landshark · Angry Orchard · Blue Moon · Kona Big Wave", descEs: "Landshark · Angry Orchard · Blue Moon · Kona Big Wave", group: "draft" },
  { id: "draft-import", name: "Import Draft", desc: "Corona · Dos Equis · Modelo Especial", descEs: "Corona · Dos Equis · Modelo Especial", group: "draft" },
  { id: "draft-domestic", name: "Domestic Draft", desc: "Bud Light · Coors Light · Michelob Ultra · Miller Lite", descEs: "Bud Light · Coors Light · Michelob Ultra · Miller Lite", group: "draft" },

  { id: "cans-local", name: "Local Bottles & Cans", desc: "Austin Eastciders (5.0% cider)", descEs: "Austin Eastciders (5.0% sidra)", group: "cans" },
  { id: "cans-seltzer", name: "Seltzer", desc: "High Noon Pineapple, Watermelon, Peach, Black Cherry · NÜTRL Orange, Watermelon", descEs: "High Noon Piña, Sandía, Durazno, Cereza Negra · NÜTRL Naranja, Sandía", group: "cans" },
  { id: "cans-import", name: "Import Bottles & Cans", desc: "Corona · Corona Premier · Dos Equis · Guinness · Heineken · Heineken 0.0 · Pacifico", descEs: "Corona · Corona Premier · Dos Equis · Guinness · Heineken · Heineken 0.0 · Pacífico", group: "cans" },
  { id: "cans-domestic", name: "Domestic Bottles & Cans", desc: "Bud Light · Budweiser · Coors Light · Michelob Ultra · Michelob Ultra Zero · Miller Lite", descEs: "Bud Light · Budweiser · Coors Light · Michelob Ultra · Michelob Ultra Zero · Miller Lite", group: "cans" },

  { id: "underwood", name: "Underwood Canned Wine", desc: "Pinot Noir, Rosé, or The Bubbles (250 ml)", descEs: "Pinot Noir, Rosé o The Bubbles (250 ml)", price: "$10.00", group: "wine" },
];

/* ---------------- Specials ---------------- */

export const dailySpecials: { day: string; dayEs: string; title: string; titleEs: string }[] = [
  { day: "Monday", dayEs: "Lunes", title: "$2.50 Bud Light & Michelob Ultra pints", titleEs: "Pintas de Bud Light y Michelob Ultra a $2.50" },
  { day: "Tuesday", dayEs: "Martes", title: "Kids eat free! (2 kids meals per adult entrée)", titleEs: "¡Niños comen gratis! (2 menús infantiles por plato fuerte de adulto)" },
  { day: "Wednesday", dayEs: "Miércoles", title: "Live Team Trivia + $2 off 24 oz. Mother Plucker mugs of Dos Equis", titleEs: "Trivia en vivo + $2 de descuento en tarros Mother Plucker de 24 oz de Dos Equis" },
  { day: "Thursday", dayEs: "Jueves", title: "All you can eat Buffalo Bites, $21 · Over/Under trivia night", titleEs: "Buffalo Bites a discreción, $21 · Noche de Over/Under" },
  { day: "Friday", dayEs: "Viernes", title: "Teacher Freebie Friday — free apps for teachers 3–7 PM", titleEs: "Viernes de maestros — entradas gratis para maestros de 3 a 7 PM" },
  { day: "Saturday", dayEs: "Sábado", title: "$1 off Bud Light and Dos Equis pints", titleEs: "$1 de descuento en pintas de Bud Light y Dos Equis" },
  { day: "Sunday", dayEs: "Domingo", title: "$1 off Pluckers cocktails", titleEs: "$1 de descuento en cocteles Pluckers" },
];

export const barSpecials = {
  happyHour: {
    en: "Happy Hour — Mon–Fri, 3PM–5PM: $1.00 off 24 oz. Mother Plucker Mugs of Bud Light, Dos Equis, Michelob Ultra & Kona Big Wave · $1.00 off Pluckers Cocktails · $1.00 off Frozen Regular-ritas",
    es: "Happy Hour — lun a vie, 3PM–5PM: $1.00 de descuento en tarros Mother Plucker de 24 oz de Bud Light, Dos Equis, Michelob Ultra y Kona Big Wave · $1.00 en cocteles Pluckers · $1.00 en Regular-ritas frozen",
  },
  allDay: {
    en: "All day, every day: $6.00 Tito's, Fireball, Bacardi, Sapphire · $6.50 Jack Daniel's · $7.00 Crown Royal, Dulce Vida Silver · $7.50 Jameson",
    es: "Todos los días: $6.00 Tito's, Fireball, Bacardi, Sapphire · $6.50 Jack Daniel's · $7.00 Crown Royal, Dulce Vida Silver · $7.50 Jameson",
  },
  events: {
    en: "Wednesday Night Live Team Trivia — win up to $375 in Pluckers gift cards. Thursday Night Over/Under — win up to $300 in Pluckers gift cards.",
    es: "Trivia en vivo los miércoles — gana hasta $375 en tarjetas de regalo. Over/Under los jueves — gana hasta $300 en tarjetas de regalo.",
  },
};

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
  { id: "n1", date: "NEWEST ADDITION", title: "Featured: Pickle Dust", titleEs: "Salsa destacada: Pickle Dust", body: "Our latest dill delight dry-rub. Ask for it on your fries!", bodyEs: "Nuestro nuevo sazón seco de pepinillo. ¡Pídelo en tus papas!", kind: "current" },
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
