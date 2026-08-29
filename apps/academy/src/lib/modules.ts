import type { ModuleDef } from "./types";
import { gov, LINKS } from "./sources";
import { LANDFILL_IDS, MODULE2_IDS } from "./sort-items";

const recGov = gov("Oakland Recycles — Recycling (Dec 2025 sorting guide)", LINKS.recycling, "2025-12-01");
const compostGov = gov("Oakland Recycles — Compost", LINKS.compost, "2025-12-01");
const bulkyGov = gov("Oakland Recycles — Bulky Service", LINKS.bulky, "2025-01-01");
const lawsGov = gov("Oakland Recycles — Laws / ORRO; StopWaste Rules", LINKS.laws, "2024-01-01");
const hhwGov = gov("StopWaste — Household Hazardous Waste", LINKS.hhw, "2026-01-01");
const cityGov = gov("City of Oakland — Waste and Recycling", LINKS.cityWaste, "2026-01-01");

export const MODULES: ModuleDef[] = [
  {
    id: "m1",
    number: 1,
    title: "Where does “away” actually go?",
    essentialQuestion: "What happens after something leaves your hand?",
    durationMin: 6,
    objectives: [
      "Distinguish collection, sorting, processing, composting, recycling, reuse, and disposal",
      "See how one wrong sort can contaminate a recoverable load",
      "Place prevention above disposal",
    ],
    lesson: [
      {
        kind: "p",
        text: "Throwing something away is not the end of its physical existence. Every discarded object enters a physical, economic, regulatory, environmental, and logistical system. Recycling begins before collection — usually in a kitchen, a shop, an apartment chute, or a sidewalk.",
        plain: "Away is not a place. After you let go, someone else has to decide what the object is.",
      },
      {
        kind: "list",
        title: "The object still needs a decision",
        items: [
          "Reuse or repair — keep the object functioning",
          "Recycle — remake it as material, if the grade is clean",
          "Compost — return organics as soil amendment",
          "Special disposal — batteries, chemicals, e-waste, bulky, sharps",
          "Landfill — residual only, after the other four are no",
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "Infrastructure plus behavior",
        text: "Oakland has trucks, carts, a recycling processor, a compost system, and a landfill pathway. None of it works if the first sort is wrong. A plastic bag in recycling can wrap a screen. Food in recycling can spoil a bale. A lithium battery in trash can start a fire.",
      },
      {
        kind: "rule",
        title: "Prevention sits above disposal",
        text: "The cheapest, cleanest ton is the one that was never manufactured into waste. Sorting is literacy. Refusal, reduction, and reuse are the higher-leverage moves.",
      },
    ],
    interaction: {
      kind: "trace",
      title: "Trace the object",
      intro: "Follow four objects. One wrong first sort changes the pathway.",
    },
    quiz: [
      {
        id: "m1q1",
        prompt: "When does recycling actually begin in Oakland’s system?",
        options: [
          { id: "a", label: "When the truck empties the cart" },
          { id: "b", label: "When the Material Recovery Facility sorts the bale" },
          { id: "c", label: "At the first sort — kitchen, shop, chute, or sidewalk" },
          { id: "d", label: "When the City publishes an annual diversion rate" },
        ],
        correct: "c",
        explain: "The first sort decides whether material is recoverable. Trucks and plants cannot undo a bagged, food-soiled, or hazardous load cheaply.",
      },
      {
        id: "m1q2",
        prompt: "A lithium battery in the trash cart is primarily a problem of:",
        options: [
          { id: "a", label: "Aesthetics" },
          { id: "b", label: "Fire and worker safety" },
          { id: "c", label: "Cart color" },
          { id: "d", label: "Property tax" },
        ],
        correct: "b",
        explain: "Lithium batteries are a documented cause of collection and processing fires. They require special disposal.",
      },
      {
        id: "m1q3",
        prompt: "Which statement is accurate?",
        options: [
          { id: "a", label: "Once collected, all material is sorted perfectly by machines" },
          { id: "b", label: "Incorrect sorting can compromise otherwise recoverable material" },
          { id: "c", label: "Landfill is the default and recycling is optional decoration" },
          { id: "d", label: "Oakland has a single company that handles every stream" },
        ],
        correct: "b",
        explain: "Contamination is how good material becomes residual. Oakland also splits recycling (CWS) from trash/compost (WM).",
      },
      {
        id: "m1q4",
        prompt: "Waste prevention sits where in the hierarchy?",
        options: [
          { id: "a", label: "Below landfill" },
          { id: "b", label: "Equal to recycling" },
          { id: "c", label: "Above recycling, composting, and disposal" },
          { id: "d", label: "Only for businesses" },
        ],
        correct: "c",
        explain: "Refuse, reduce, reuse, repair, share, donate — then recycle/compost — then dispose.",
      },
      {
        id: "m1q5",
        prompt: "Why does STREETS treat recycling literacy as civic infrastructure?",
        options: [
          { id: "a", label: "Because it is a branding slogan" },
          { id: "b", label: "Because correct sorts, lawful bulky use, and honest documentation keep public space and processing systems working" },
          { id: "c", label: "Because it replaces OAK311" },
          { id: "d", label: "Because haulers asked STREETS to enforce carts" },
        ],
        correct: "b",
        explain: "Literacy is how residents, workers, and observers participate in a real system — not a substitute for official services.",
      },
    ],
    governance: recGov,
  },
  {
    id: "m2",
    number: 2,
    title: "Oakland’s three primary streams",
    essentialQuestion: "What actually belongs in recycling — here, not in a generic national infographic?",
    durationMin: 10,
    objectives: [
      "Name Oakland’s recycling grades: paper, plastic containers (bottles/jugs/tubs), metal, glass",
      "Apply Clean / Empty / Dry",
      "Reject bags, film, foam, food, tanglers, and hazardous material in recycling",
    ],
    lesson: [
      {
        kind: "p",
        text: "Oakland requires weekly recycling, compost, and trash collection for residences and businesses. Residential recycling is collected by California Waste Solutions. Trash and compost are collected by Waste Management of Alameda County. Do not recycle by the chasing-arrows number. Recycle plastics by shape: bottles, jugs, and tubs.",
      },
      {
        kind: "list",
        title: "Recycling accepts (clean, empty, dry)",
        items: [
          "Paper and cardboard — mail, envelopes, newspaper, flattened boxes",
          "Plastic containers — bottles, jugs, tubs",
          "Metal — food and beverage cans, aluminum trays and foil",
          "Glass — bottles and jars",
          "Cartons — milk and juice cartons (empty)",
        ],
      },
      {
        kind: "list",
        title: "Do not put in curbside recycling",
        items: [
          "Plastic bags, film, bubble wrap",
          "Toys, utensils, straws, foam / polystyrene",
          "Clothing, diapers, pet waste, food, food-soiled paper",
          "Hoses, ropes, hangers (tanglers)",
          "Batteries, chemicals, lamps, e-waste, propane, sharps",
        ],
      },
      {
        kind: "rule",
        title: "Golden rule",
        text: "Clean. Empty. Dry. Place items loose — never in a plastic bag. Bagged recyclables are treated as trash.",
      },
    ],
    interaction: {
      kind: "sort",
      title: "Sort twenty-five household objects",
      intro: "Oakland rules. Immediate feedback. Color is not the only cue — every object is named.",
      itemIds: MODULE2_IDS,
    },
    quiz: [
      {
        id: "m2q1",
        prompt: "Oakland recycles plastic by:",
        options: [
          { id: "a", label: "The number inside the chasing arrows" },
          { id: "b", label: "Shape — bottles, jugs, and tubs" },
          { id: "c", label: "Whether it is “BPA-free”" },
          { id: "d", label: "Color of the plastic" },
        ],
        correct: "b",
        explain: "Oakland Recycles: do not recycle based on the symbol or number. Recycle plastics by shape.",
      },
      {
        id: "m2q2",
        prompt: "Who collects residential recycling in Oakland?",
        options: [
          { id: "a", label: "Waste Management of Alameda County" },
          { id: "b", label: "California Waste Solutions" },
          { id: "c", label: "StopWaste trucks" },
          { id: "d", label: "OAK311 crews" },
        ],
        correct: "b",
        explain: "CWS is the exclusive residential recycling collector. WM collects trash and compost.",
      },
      {
        id: "m2q3",
        prompt: "Recyclables should be placed:",
        options: [
          { id: "a", label: "Inside a tied plastic bag" },
          { id: "b", label: "Loose in the cart, clean, empty, and dry" },
          { id: "c", label: "In compost if they are “natural”" },
          { id: "d", label: "Next to a litter can on the block" },
        ],
        correct: "b",
        explain: "Bagging recyclables sends them to landfill and can jam equipment.",
      },
      {
        id: "m2q4",
        prompt: "A greasy pizza box belongs in:",
        options: [
          { id: "a", label: "Recycling, because it is cardboard" },
          { id: "b", label: "Compost, because it is food-soiled paper" },
          { id: "c", label: "Special disposal" },
          { id: "d", label: "The sidewalk beside the cart" },
        ],
        correct: "b",
        explain: "Food-soiled paper contaminates recycling. Oakland compost accepts greasy pizza boxes.",
      },
      {
        id: "m2q5",
        prompt: "Which item is a tangler?",
        options: [
          { id: "a", label: "Aluminum can" },
          { id: "b", label: "Glass jar" },
          { id: "c", label: "Garden hose" },
          { id: "d", label: "Newspaper" },
        ],
        correct: "c",
        explain: "Hoses, ropes, and hangers wrap around MRF equipment. Keep them out of recycling.",
      },
    ],
    governance: recGov,
  },
  {
    id: "m3",
    number: 3,
    title: "Compost is not “anything biodegradable”",
    essentialQuestion: "If a cup says compostable, does it belong in Oakland compost?",
    durationMin: 7,
    objectives: [
      "List what Oakland compost actually accepts",
      "Reject compostable plastics, PLA, plastic-lined cups, bags, diapers, and pet waste",
      "Sort a coffee-shop order under Oakland rules",
    ],
    lesson: [
      {
        kind: "callout",
        tone: "warn",
        title: "The largest public misconception",
        text: "A label that says “compostable” does not mean the item belongs in Oakland’s compost collection. PLA cups, compostable plastic bags, and bioplastic foodware go in trash here.",
      },
      {
        kind: "list",
        title: "Oakland compost accepts",
        items: [
          "Food — fruit, vegetables, meat, bones, dairy, eggs, beans, grains; small amounts of grease",
          "Food-soiled paper — napkins, towels, greasy pizza boxes, uncoated fiber containers, paper filters, paper tea bags, shredded paper",
          "Plant debris — leaves, grass, branches, flowers",
          "Certain untreated wood — stirrers, chopsticks, popsicle sticks, wood corks",
        ],
      },
      {
        kind: "list",
        title: "Oakland compost does not accept",
        items: [
          "Plastic bags — including bags labeled compostable",
          "PLA and compostable plastic foodware",
          "Plastic-lined cups and milk cartons (cartons go in recycling)",
          "Diapers, pet waste, foam, bottles, cans, glass, hazardous waste",
          "Dirt, rocks, sod, painted or treated wood",
        ],
      },
    ],
    interaction: {
      kind: "coffee",
      title: "The coffee shop test",
      intro: "Sort the entire order. Oakland rules, not the printed compostable claim.",
    },
    quiz: [
      {
        id: "m3q1",
        prompt: "A PLA cup labeled compostable should go:",
        options: [
          { id: "a", label: "In Oakland compost" },
          { id: "b", label: "In recycling, because it is a cup" },
          { id: "c", label: "In trash" },
          { id: "d", label: "To HHW" },
        ],
        correct: "c",
        explain: "Oakland Recycles: compostable plastic / bioplastic foodware, including PLA-lined cups, goes in trash.",
      },
      {
        id: "m3q2",
        prompt: "Meat and dairy in Oakland compost?",
        options: [
          { id: "a", label: "Never — backyard rules apply" },
          { id: "b", label: "Yes — municipal compost accepts them" },
          { id: "c", label: "Only if frozen" },
          { id: "d", label: "Only in restaurants" },
        ],
        correct: "b",
        explain: "Oakland compost accepts meat, bones, dairy, and eggs. That surprises people used to backyard piles.",
      },
      {
        id: "m3q3",
        prompt: "Should compostables be bagged in plastic?",
        options: [
          { id: "a", label: "Yes, it is tidier" },
          { id: "b", label: "Yes, if the bag says compostable" },
          { id: "c", label: "No — do not bag compost in plastic, even “compostable” bags" },
          { id: "d", label: "Only on windy days" },
        ],
        correct: "c",
        explain: "Plastic does not break down in this system and contaminates compost.",
      },
      {
        id: "m3q4",
        prompt: "A paper napkin with coffee on it belongs in:",
        options: [
          { id: "a", label: "Recycling" },
          { id: "b", label: "Compost" },
          { id: "c", label: "Trash, because it is used" },
          { id: "d", label: "Special disposal" },
        ],
        correct: "b",
        explain: "Food-soiled paper is compost, not recycling.",
      },
      {
        id: "m3q5",
        prompt: "Milk cartons in Oakland:",
        options: [
          { id: "a", label: "Compost, because they held a food liquid" },
          { id: "b", label: "Recycling, empty — they are plastic-lined and not compost" },
          { id: "c", label: "HHW" },
          { id: "d", label: "Wherever is closest" },
        ],
        correct: "b",
        explain: "Cartons recycle. Plastic-lined paper is not Oakland compost.",
      },
    ],
    governance: compostGov,
  },
  {
    id: "m4",
    number: 4,
    title: "Trash: the residual stream",
    essentialQuestion: "Is trash the default — or the last remaining option?",
    durationMin: 6,
    objectives: [
      "Treat trash as residual, not default",
      "Run the four-question test before landfilling",
      "Identify difficult mixed-material objects",
    ],
    lesson: [
      {
        kind: "p",
        text: "Typical Oakland trash includes plastic bags and film, utensils, straws, foam, diapers, pet waste, broken ceramics, chip bags, candy wrappers, mixed-material packages, compostable plastic foodware, and tanglers such as hoses.",
      },
      {
        kind: "rule",
        title: "Before choosing trash, ask",
        text: "1. Can this be reused? 2. Can this be recycled under Oakland rules? 3. Can this be composted under Oakland rules? 4. Does this require specialized disposal? If all four answers are no, trash may be appropriate.",
      },
    ],
    interaction: {
      kind: "sort",
      title: "Last chance before landfill",
      intro: "Fifteen difficult objects. Trash is correct only when the other doors are closed.",
      itemIds: LANDFILL_IDS,
    },
    quiz: [
      {
        id: "m4q1",
        prompt: "Trash should be taught as:",
        options: [
          { id: "a", label: "The default category" },
          { id: "b", label: "The residual category after other pathways are exhausted" },
          { id: "c", label: "A recycling contaminant you add on purpose" },
          { id: "d", label: "Whatever does not fit in the other carts, including batteries" },
        ],
        correct: "b",
        explain: "Residual means leftover — not “I could not be bothered.”",
      },
      {
        id: "m4q2",
        prompt: "Chip bags and candy wrappers generally go:",
        options: [
          { id: "a", label: "Recycling, because they look metallic" },
          { id: "b", label: "Compost, because they held food" },
          { id: "c", label: "Trash — mixed-material film" },
          { id: "d", label: "HHW" },
        ],
        correct: "c",
        explain: "Mixed-material packages are residual.",
      },
      {
        id: "m4q3",
        prompt: "Broken ceramics (a mug) typically go:",
        options: [
          { id: "a", label: "Recycling with glass bottles" },
          { id: "b", label: "Trash (glass bottles and jars only in recycling)" },
          { id: "c", label: "Compost" },
          { id: "d", label: "Bulky metal" },
        ],
        correct: "b",
        explain: "Bottle-and-jar glass is recyclable. Ceramics, mirrors, and window glass are not that grade.",
      },
      {
        id: "m4q4",
        prompt: "If you are unsure whether an item is hazardous:",
        options: [
          { id: "a", label: "Put it in trash to be safe" },
          { id: "b", label: "Do not improvise — use an authorized disposal resource" },
          { id: "c", label: "Hide it in recycling" },
          { id: "d", label: "Leave it next to a dumpster" },
        ],
        correct: "b",
        explain: "Improvising is how facilities catch fire and workers get hurt.",
      },
      {
        id: "m4q5",
        prompt: "Compostable plastic utensils in Oakland:",
        options: [
          { id: "a", label: "Compost" },
          { id: "b", label: "Recycling" },
          { id: "c", label: "Trash" },
          { id: "d", label: "HHW" },
        ],
        correct: "c",
        explain: "Compostable plastic foodware is not accepted in Oakland compost.",
      },
    ],
    governance: recGov,
  },
  {
    id: "m5",
    number: 5,
    title: "Dangerous, special & misplaced materials",
    essentialQuestion: "When do you stop putting things in carts?",
    durationMin: 7,
    objectives: [
      "Recognize batteries, paint, chemicals, lamps, e-waste, sharps, automotive fluids, propane",
      "Name HHW as the authorized pathway",
      "Practice observe → document → distance → refer",
    ],
    lesson: [
      {
        kind: "p",
        text: "Some materials should never be casually placed in any standard collection container. Household hazardous waste in Alameda County is a free, no-appointment drop-off at four facilities, including Oakland at 2100 East 7th Street (Wed–Fri 9:00–2:30, Sat 9:00–4:00). Call 1-800-606-6606.",
      },
      {
        kind: "list",
        title: "Treat as special until proven otherwise",
        items: [
          "Batteries — household, rechargeable, lithium, auto (fire)",
          "Paint, coatings, thinners",
          "Household chemicals and pesticides",
          "Fluorescent lamps and mercury bulbs",
          "Electronics",
          "Sharps",
          "Automotive fluids",
          "Propane cylinders (small)",
        ],
      },
      {
        kind: "rule",
        title: "STREETS safety competency",
        text: "Observe → document → maintain distance → refer. Not: touch → open → investigate. Field observations are not an invitation to handle hazardous material.",
      },
    ],
    interaction: {
      kind: "redflag",
      title: "Red flag",
      intro: "A mixed street scene. Identify which objects require escalation rather than handling.",
    },
    quiz: [
      {
        id: "m5q1",
        prompt: "The Oakland HHW facility address is:",
        options: [
          { id: "a", label: "1 Frank Ogawa Plaza" },
          { id: "b", label: "2100 East 7th Street" },
          { id: "c", label: "City Hall annex" },
          { id: "d", label: "Any WM truck" },
        ],
        correct: "b",
        explain: "2100 East 7th Street, Oakland. Confirm hours before you go — they change on holidays.",
      },
      {
        id: "m5q2",
        prompt: "A STREETS trainee finds sealed chemical jugs on a sidewalk. First action:",
        options: [
          { id: "a", label: "Open them to identify the contents" },
          { id: "b", label: "Pour them in a trash cart" },
          { id: "c", label: "Observe, document, keep distance, refer to 311 / HHW pathway" },
          { id: "d", label: "Take them home to the HHW site personally" },
        ],
        correct: "c",
        explain: "Do not handle abandoned chemicals. Document and route.",
      },
      {
        id: "m5q3",
        prompt: "Lithium batteries belong:",
        options: [
          { id: "a", label: "In recycling, because metal" },
          { id: "b", label: "In trash, bagged" },
          { id: "c", label: "In authorized battery / HHW collection — never a cart" },
          { id: "d", label: "In compost, because they are “small”" },
        ],
        correct: "c",
        explain: "Fire risk at collection and processing.",
      },
      {
        id: "m5q4",
        prompt: "Fluorescent tubes are a problem because they contain:",
        options: [
          { id: "a", label: "Lead paint only" },
          { id: "b", label: "Mercury" },
          { id: "c", label: "Helium" },
          { id: "d", label: "Nothing of concern" },
        ],
        correct: "b",
        explain: "Mercury-containing lamps are HHW.",
      },
      {
        id: "m5q5",
        prompt: "When uncertain about hazardous material:",
        options: [
          { id: "a", label: "Improvise the closest cart" },
          { id: "b", label: "Do not improvise — use an authorized resource" },
          { id: "c", label: "Leave it in a park" },
          { id: "d", label: "Ask a passerby to take it" },
        ],
        correct: "b",
        explain: "Core rule of this module.",
      },
    ],
    governance: hhwGov,
  },
  {
    id: "m6",
    number: 6,
    title: "Bulky waste & illegal dumping",
    essentialQuestion: "Is a mattress on the sidewalk “trash” — or a service-pathway problem?",
    durationMin: 7,
    objectives: [
      "Distinguish scheduled bulky collection from illegal dumping",
      "Know WM bulky: 1-888-WM-BULKY, drop-off at Davis Street, curbside appointments",
      "Never assign origin without evidence",
    ],
    lesson: [
      {
        kind: "p",
        text: "A mattress on the sidewalk is not merely trash. It is a bulky item in the public right-of-way. Oakland households can schedule bulky drop-off (Davis Street Resource Recovery Complex, 2615 Davis Street, San Leandro — up to 4 cubic yards, proof of Oakland residency) and curbside pickup through Waste Management at 1-888-962-8559 or online via Oakland Recycles. Do not place items curbside more than one day before the appointment — that can be fined. Set out by 6 a.m. on the appointment day. Curbside bulky is typically scheduled within two weeks for single-family homes; apartment and condo pickups are often the last week of the month.",
      },
      {
        kind: "list",
        title: "What bulky is not",
        items: [
          "Dumping next to a dumpster does not make the material part of normal collection",
          "Waste beside a street litter receptacle is not automatically legitimate disposal",
          "Dirt, rock, and concrete are not standard bulky — they often require a debris box or extra fee",
          "Hazardous and medical waste are never bulky",
        ],
      },
      {
        kind: "quote",
        text: "Document conditions, not assumptions.",
      },
    ],
    interaction: {
      kind: "field",
      title: "The sofa on 35th",
      intro: "Read the incident record. Decide what is known.",
    },
    quiz: [
      {
        id: "m6q1",
        prompt: "A sofa beside a dumpster is automatically:",
        options: [
          { id: "a", label: "Part of that dumpster’s collection" },
          { id: "b", label: "Not automatically collection — origin and service status may be unverified" },
          { id: "c", label: "Proof the landlord dumped it" },
          { id: "d", label: "Proof WM failed" },
        ],
        correct: "b",
        explain: "Proximity is not a service ticket.",
      },
      {
        id: "m6q2",
        prompt: "Oakland bulky appointments are scheduled with:",
        options: [
          { id: "a", label: "CWS" },
          { id: "b", label: "Waste Management — 1-888-WM-BULKY" },
          { id: "c", label: "StopWaste" },
          { id: "d", label: "STREETS dispatch" },
        ],
        correct: "b",
        explain: "1-888-962-8559 or Oakland Recycles / WM online scheduling.",
      },
      {
        id: "m6q3",
        prompt: "Placing bulky items more than one day before the appointment:",
        options: [
          { id: "a", label: "Is recommended so you do not forget" },
          { id: "b", label: "Can be subject to a City fine" },
          { id: "c", label: "Converts the pile into recycling" },
          { id: "d", label: "Is required for apartments" },
        ],
        correct: "b",
        explain: "Oakland Recycles bulky rules. Set out by 6 a.m. on the day — not days early.",
      },
      {
        id: "m6q4",
        prompt: "The correct first answer to “who dumped this sofa?” is:",
        options: [
          { id: "a", label: "The tenant" },
          { id: "b", label: "The landlord" },
          { id: "c", label: "WM" },
          { id: "d", label: "Unknown unless there is evidence — record the condition" },
        ],
        correct: "d",
        explain: "See what is there. Record what is known. Label what remains uncertain.",
      },
      {
        id: "m6q5",
        prompt: "A mattress blocking a wheelchair path should be reported to:",
        options: [
          { id: "a", label: "CWS recycling" },
          { id: "b", label: "Oakland 311 as a right-of-way / dumping condition" },
          { id: "c", label: "StopWaste compost inspectors" },
          { id: "d", label: "The nearest restaurant" },
        ],
        correct: "b",
        explain: "Obstruction and possible dumping are 311. Residents can also schedule bulky service for their own items.",
      },
    ],
    governance: bulkyGov,
  },
  {
    id: "m7",
    number: 7,
    title: "Who does what in Oakland?",
    essentialQuestion: "If it is not one company and not one department — who is the first pathway?",
    durationMin: 8,
    objectives: [
      "Map WM, CWS, City of Oakland / 311, StopWaste, property owners, and residents",
      "Route ten incidents to the most appropriate first pathway",
      "Avoid collapsing the system into a single villain",
    ],
    lesson: [
      {
        kind: "p",
        text: "Participants frequently assume one company or one City department controls the entire waste system. They do not.",
      },
      {
        kind: "list",
        title: "System map (residential)",
        items: [
          "Waste Management of Alameda County — trash and compost collection; bulky service",
          "California Waste Solutions — residential recycling; household batteries and used motor oil programs",
          "City of Oakland — municipal requirements, public right-of-way, illegal-dumping response via OAK311",
          "StopWaste (Alameda County Waste Management Authority) — countywide reduction programs, HHW network, ORRO / SB 1383 implementation and enforcement",
          "Property owners and businesses — adequate service, indoor paired containers, sorting, education, access, property conditions",
          "Residents — participants in the system, not merely customers at the end of it",
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "STREETS is not in this stack as an official actor",
        text: "STREETS Oakland documents conditions and complements OAK311. It does not replace 311, emergency services, haulers, or the City. Do not represent unofficial partnerships as signed.",
      },
    ],
    interaction: {
      kind: "route",
      title: "Route the case",
      intro: "Ten incidents. Choose the most appropriate first pathway — not every actor who might eventually help.",
      caseIds: [
        "missed-recycle",
        "overflow-dumpster",
        "mattress",
        "paint",
        "batteries-cart",
        "food-recovery",
        "oil",
        "construction",
        "contamination-notice",
        "sharps",
      ],
    },
    quiz: [
      {
        id: "m7q1",
        prompt: "Residential recycling in Oakland is collected by:",
        options: [
          { id: "a", label: "WM" },
          { id: "b", label: "CWS" },
          { id: "c", label: "StopWaste" },
          { id: "d", label: "OAK311" },
        ],
        correct: "b",
        explain: "City of Oakland: CWS is exclusive for residential recycling. WM is exclusive for compost and trash.",
      },
      {
        id: "m7q2",
        prompt: "ORRO / SB 1383 enforcement in Alameda County is led by:",
        options: [
          { id: "a", label: "CWS" },
          { id: "b", label: "StopWaste" },
          { id: "c", label: "STREETS" },
          { id: "d", label: "Caltrans" },
        ],
        correct: "b",
        explain: "StopWaste leads ORRO enforcement. Citations are issued by StopWaste.",
      },
      {
        id: "m7q3",
        prompt: "A missed trash pickup (not recycling) is first a:",
        options: [
          { id: "a", label: "CWS issue" },
          { id: "b", label: "WM issue" },
          { id: "c", label: "HHW issue" },
          { id: "d", label: "Police issue" },
        ],
        correct: "b",
        explain: "WM collects trash and compost.",
      },
      {
        id: "m7q4",
        prompt: "Property managers in Alameda County must, among other duties:",
        options: [
          { id: "a", label: "Only provide a trash chute" },
          { id: "b", label: "Subscribe to recycling and compost, pair indoor containers, and educate tenants (including 14-day move-in / move-out notices)" },
          { id: "c", label: "Fine tenants for 311 reports" },
          { id: "d", label: "Refuse bulky service to renters" },
        ],
        correct: "b",
        explain: "ORRO basic compliance. Renters can schedule bulky service directly with WM.",
      },
      {
        id: "m7q5",
        prompt: "STREETS field observations:",
        options: [
          { id: "a", label: "Are official hauler contamination determinations" },
          { id: "b", label: "Replace OAK311" },
          { id: "c", label: "Are civic documentation unless made under an authorized partnership" },
          { id: "d", label: "Authorize trainees to open dumpsters" },
        ],
        correct: "c",
        explain: "The course is explicit: STREETS observations are not official hauler determinations.",
      },
    ],
    governance: cityGov,
  },
  {
    id: "m8",
    number: 8,
    title: "Contamination: when the right bin goes wrong",
    essentialQuestion: "Is recycling performance about tons in — or about quality?",
    durationMin: 6,
    objectives: [
      "Recognize common contamination patterns",
      "Apply STREETS field levels 0–3",
      "State the limitation: observation ≠ official determination",
    ],
    lesson: [
      {
        kind: "p",
        text: "Recycling performance is not simply how much material enters a recycling container. It is also about quality. Plastic bags, food, diapers, and tanglers in recycling; glass bottles or PLA cups in compost; bagged compostables in plastic — these are how recoverable loads become residual.",
      },
      {
        kind: "list",
        title: "STREETS field classification",
        items: [
          "Level 0 — Clean: no obvious contamination",
          "Level 1 — Minor: isolated incorrect items",
          "Level 2 — Moderate: repeated visible contamination",
          "Level 3 — Severe: contamination materially dominates or compromises the observable load",
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "Limitation",
        text: "STREETS field observations are not official hauler contamination determinations unless made under an authorized partnership. Do not write as if they were.",
      },
    ],
    interaction: {
      kind: "levels",
      title: "Classify the load",
      intro: "Four cart interiors. Assign a STREETS level and name the contaminant class.",
    },
    quiz: [
      {
        id: "m8q1",
        prompt: "A single plastic bag in an otherwise clean recycling cart is closest to:",
        options: [
          { id: "a", label: "Level 0" },
          { id: "b", label: "Level 1 — minor" },
          { id: "c", label: "Level 3 — severe" },
          { id: "d", label: "Not contamination" },
        ],
        correct: "b",
        explain: "Isolated incorrect item. Still worth noting — bags are high-impact contaminants.",
      },
      {
        id: "m8q2",
        prompt: "Diapers filling a compost cart are:",
        options: [
          { id: "a", label: "Level 0" },
          { id: "b", label: "Level 1" },
          { id: "c", label: "Level 3 — severe, load compromised" },
          { id: "d", label: "Acceptable if bagged" },
        ],
        correct: "c",
        explain: "Diapers are not compost. When they dominate, the observable load is compromised.",
      },
      {
        id: "m8q3",
        prompt: "Bagged bottles in recycling:",
        options: [
          { id: "a", label: "Help the MRF" },
          { id: "b", label: "Are treated as trash / jam equipment" },
          { id: "c", label: "Are required in Oakland" },
          { id: "d", label: "Count as compost" },
        ],
        correct: "b",
        explain: "Do not bag recyclables.",
      },
      {
        id: "m8q4",
        prompt: "A STREETS trainee’s contamination note should:",
        options: [
          { id: "a", label: "Declare the hauler’s official rate" },
          { id: "b", label: "Describe what is visible and the field level, without pretending to be the hauler" },
          { id: "c", label: "Name the tenant who did it" },
          { id: "d", label: "Be deleted because observation is useless" },
        ],
        correct: "b",
        explain: "Visible conditions plus limitation language.",
      },
      {
        id: "m8q5",
        prompt: "PLA cup in compost is contamination because:",
        options: [
          { id: "a", label: "It is metal" },
          { id: "b", label: "Oakland compost does not accept compostable plastics" },
          { id: "c", label: "It is food" },
          { id: "d", label: "StopWaste requires PLA in compost" },
        ],
        correct: "b",
        explain: "Label ≠ local acceptance.",
      },
    ],
    governance: recGov,
  },
  {
    id: "m9",
    number: 9,
    title: "SB 1383 without the bureaucratic fog",
    essentialQuestion: "Why does California care so much about food in the landfill?",
    durationMin: 8,
    objectives: [
      "Connect organics in landfill to methane",
      "State ORRO duties in plain language",
      "Adapt the duty list to the learner’s role",
    ],
    lesson: [
      {
        kind: "p",
        text: "Organic material decomposing in landfill conditions generates methane, a potent greenhouse gas. California’s SB 1383 framework is designed in significant part to keep organic material out of landfills. Oakland’s Equitable Climate Action Plan also treats composting and edible-food recovery as climate strategies. StopWaste leads local implementation and enforcement of the Organics Reduction and Recycling Ordinance (ORRO).",
      },
      {
        kind: "list",
        title: "Basic ORRO duties for businesses and multifamily sites",
        items: [
          "Subscribe to curbside compost and recycle service in addition to trash",
          "Place color-coded, labeled compost and recycle containers next to every indoor trash container (restrooms excluded)",
          "Sort materials correctly",
          "Educate employees, contractors, tenants, and students at least annually",
          "Periodically inspect bins and give feedback on incorrect items",
          "Commercial property managers: inform tenants within 14 days after move-in and at least 14 days before move-out",
          "Covered food generators: written food-recovery agreement, recover maximum surplus edible food, keep monthly pound records",
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "Enforcement is real",
        text: "StopWaste issues citations for non-compliance, with fines that escalate (and do not reset) for repeat edible-food recovery violations. Covered generators: Tier 1 (since 2022) includes large grocers, supermarkets, distributors, and wholesalers; Tier 2 (since 2024) includes large restaurants, hotels, venues, hospitals, and schools. This course does not replace legal counsel or an official inspection.",
      },
    ],
    roleNotes: {
      resident: [
        {
          kind: "p",
          text: "Your job is the cart: food and food-soiled paper in compost, clean containers in recycling, nothing hazardous in either. You are not the site’s ORRO officer — but your sort is how the ordinance succeeds or fails at the building.",
        },
      ],
      employee: [
        {
          kind: "p",
          text: "If indoor stations are missing or unlabeled, that is a site problem — tell a manager. Do not bag compost in plastic. Keep food out of recycling. You should have been trained at least annually.",
        },
      ],
      owner: [
        {
          kind: "p",
          text: "You must have service, indoor paired containers, staff training, and inspections. If you generate surplus edible food and are a covered generator, composting leftovers is not a substitute for donating edible food under a written agreement.",
        },
      ],
      property: [
        {
          kind: "p",
          text: "You sit on the critical path: adequate service, paired indoor containers, tenant education including the 14-day move-in and move-out notices, and inspection/feedback. Renters may schedule bulky service directly with WM — they do not need your permission to use the citywide bulky program.",
        },
      ],
      trainee: [
        {
          kind: "p",
          text: "You may observe missing indoor stations, chronic organics in trash, or overflowing compost as conditions. You do not enforce ORRO. You do not issue contamination rates. You document, route, and avoid implying a partnership that does not exist.",
        },
      ],
    },
    interaction: {
      kind: "route",
      title: "Whose duty?",
      intro: "Three ORRO-flavored incidents. Route the first responsible pathway.",
      caseIds: ["food-recovery", "contamination-notice", "overflow-dumpster"],
    },
    quiz: [
      {
        id: "m9q1",
        prompt: "Organics in landfill matter because they generate:",
        options: [
          { id: "a", label: "Oxygen" },
          { id: "b", label: "Methane" },
          { id: "c", label: "Only odor, with no climate effect" },
          { id: "d", label: "Helium" },
        ],
        correct: "b",
        explain: "Anaerobic landfill decay produces methane.",
      },
      {
        id: "m9q2",
        prompt: "Indoor compost and recycle containers must be:",
        options: [
          { id: "a", label: "Somewhere in the building, maybe the basement" },
          { id: "b", label: "Color-coded and labeled, next to all indoor trash (except restrooms)" },
          { id: "c", label: "Optional if you have a dumpster" },
          { id: "d", label: "Hidden so customers do not see them" },
        ],
        correct: "b",
        explain: "ORRO basic requirement #2.",
      },
      {
        id: "m9q3",
        prompt: "Edible surplus food at a covered grocery should first be:",
        options: [
          { id: "a", label: "Composted — that fully satisfies SB 1383" },
          { id: "b", label: "Recovered for people, with a written agreement and records; inedible scraps still composted" },
          { id: "c", label: "Landfilled after 24 hours" },
          { id: "d", label: "Given to staff without records, instead of a recovery organization" },
        ],
        correct: "b",
        explain: "Compost is for inedible organics. Edible surplus has a people pathway.",
      },
      {
        id: "m9q4",
        prompt: "Tenant education timing for commercial property managers includes:",
        options: [
          { id: "a", label: "Never — tenants should already know" },
          { id: "b", label: "No later than 14 days after move-in and at least 14 days before move-out" },
          { id: "c", label: "Only if StopWaste visits" },
          { id: "d", label: "A poster in the garage, once, in 2019" },
        ],
        correct: "b",
        explain: "ORRO property-manager notice windows.",
      },
      {
        id: "m9q5",
        prompt: "Who leads ORRO enforcement?",
        options: [
          { id: "a", label: "STREETS Academy" },
          { id: "b", label: "StopWaste" },
          { id: "c", label: "CWS" },
          { id: "d", label: "Caltrans" },
        ],
        correct: "b",
        explain: "Alameda County Waste Management Authority (StopWaste).",
      },
    ],
    governance: lawsGov,
  },
  {
    id: "m10",
    number: 10,
    title: "Waste prevention comes before recycling",
    essentialQuestion: "Can a flagship course avoid teaching consumerism-plus-sorting?",
    durationMin: 6,
    objectives: [
      "Use the full hierarchy from refuse to dispose",
      "Minimize landfill in a move-out scenario",
    ],
    lesson: [
      {
        kind: "list",
        title: "Hierarchy",
        items: [
          "Refuse — avoid unnecessary material",
          "Reduce — consume less material",
          "Reuse — keep material functioning",
          "Repair — extend product life",
          "Share / borrow / rent — avoid duplicative ownership",
          "Donate / redistribute — preserve utility",
          "Recycle / compost — recover material",
          "Dispose — landfill only for the residual stream",
        ],
      },
      {
        kind: "p",
        text: "A correctly sorted disposable fork is still a disposable fork. Sorting literacy matters. It is not a license to generate the fork.",
      },
    ],
    interaction: {
      kind: "prevent",
      title: "Move-out, minimum landfill",
      intro: "An Oakland renter is leaving a one-bedroom. Sequence the materials so landfill is the residual, not the plan.",
    },
    quiz: [
      {
        id: "m10q1",
        prompt: "The top of the hierarchy is:",
        options: [
          { id: "a", label: "Recycle" },
          { id: "b", label: "Refuse / avoid" },
          { id: "c", label: "Landfill" },
          { id: "d", label: "Compost" },
        ],
        correct: "b",
        explain: "Prevention precedes recovery.",
      },
      {
        id: "m10q2",
        prompt: "A usable lamp at move-out should first be:",
        options: [
          { id: "a", label: "Trash" },
          { id: "b", label: "Recycled as mixed plastic" },
          { id: "c", label: "Reused, sold, or donated" },
          { id: "d", label: "Left on the sidewalk the night before" },
        ],
        correct: "c",
        explain: "Preserve utility. Sidewalk piles without a bulky appointment are a dumping risk.",
      },
      {
        id: "m10q3",
        prompt: "Extra paint at move-out:",
        options: [
          { id: "a", label: "Trash" },
          { id: "b", label: "HHW drop-off (or a reuse program if offered)" },
          { id: "c", label: "Pour in the gutter" },
          { id: "d", label: "Recycling" },
        ],
        correct: "b",
        explain: "Paint is HHW.",
      },
      {
        id: "m10q4",
        prompt: "Why does this course put prevention before sorting games?",
        options: [
          { id: "a", label: "To shame consumers" },
          { id: "b", label: "So flagship education does not accidentally teach consumerism followed by sorting" },
          { id: "c", label: "Because recycling does not exist in Oakland" },
          { id: "d", label: "Because StopWaste forbids recycling education" },
        ],
        correct: "b",
        explain: "Stated purpose of Module 10.",
      },
      {
        id: "m10q5",
        prompt: "Food that is still edible at a covered business:",
        options: [
          { id: "a", label: "Should be landfilled to avoid liability myths" },
          { id: "b", label: "Should be recovered for people when the law applies, then inedible scraps composted" },
          { id: "c", label: "Must always be composted even if edible" },
          { id: "d", label: "Is a CWS recycling commodity" },
        ],
        correct: "b",
        explain: "Prevention and redistribution sit above compost.",
      },
    ],
    governance: lawsGov,
  },
  {
    id: "m11",
    number: 11,
    title: "Clean streets as environmental justice",
    essentialQuestion: "If waste burdens are geographically unequal — what, exactly, would we measure?",
    durationMin: 6,
    objectives: [
      "Name measurable harms of persistent dumping",
      "Ask recurrence, duration, access, and intervention questions instead of slogans",
    ],
    lesson: [
      {
        kind: "p",
        text: "Waste burdens are geographically unequal. Persistent dumping affects pedestrian access, disabled residents, children, transit riders, local businesses, stormwater systems, neighborhood aesthetics, public health, and perceptions of public investment. Environmental justice is not a logo. It is whether a condition recurs, how long it remains, who is exposed, and whether anyone has a lawful disposal option that actually works.",
      },
      {
        kind: "list",
        title: "Questions that can be answered with evidence",
        items: [
          "Where do conditions recur after a case closes?",
          "How long do they remain?",
          "Which neighborhoods experience repeated exposure?",
          "Which intervention actually reduces recurrence?",
          "Who has access to legitimate disposal options (service, bulky appointments, HHW hours, language, tenancy)?",
        ],
      },
      {
        kind: "callout",
        tone: "info",
        title: "STREETS Oakland’s job in this picture",
        text: "OAK311 creates cases. STREETS, where it operates, is built to preserve longitudinal evidence around repeat locations. This Academy teaches you not to flatten that into blame, spectacle, or person-tracking. Conditions, not people.",
      },
    ],
    interaction: {
      kind: "ej",
      title: "Measure the burden",
      intro: "A corridor has had mattress piles return six times in four months. Choose the questions that produce evidence — not theater.",
    },
    quiz: [
      {
        id: "m11q1",
        prompt: "A blocked sidewalk from dumping is primarily a problem of:",
        options: [
          { id: "a", label: "Aesthetics only" },
          { id: "b", label: "Access, safety, and equal use of public space — including for disabled residents" },
          { id: "c", label: "Tourism branding" },
          { id: "d", label: "Recycling rates alone" },
        ],
        correct: "b",
        explain: "EJ here is material: who can walk, roll, and wait for the bus.",
      },
      {
        id: "m11q2",
        prompt: "The most useful question after a cleanup is:",
        options: [
          { id: "a", label: "Did we post about it?" },
          { id: "b", label: "Did the condition return — and how soon?" },
          { id: "c", label: "Who looks guilty in the photo?" },
          { id: "d", label: "Can we skip 311 next time?" },
        ],
        correct: "b",
        explain: "Recurrence is the STREETS question.",
      },
      {
        id: "m11q3",
        prompt: "Lack of lawful bulky access can produce:",
        options: [
          { id: "a", label: "Only theoretical harm" },
          { id: "b", label: "Curb piles that look like dumping even when a tenant was trying to dispose of a sofa" },
          { id: "c", label: "Higher recycling quality automatically" },
          { id: "d", label: "Nothing — bulky is unused in Oakland" },
        ],
        correct: "b",
        explain: "Access to legitimate service is part of prevention.",
      },
      {
        id: "m11q4",
        prompt: "STREETS evidence rules forbid:",
        options: [
          { id: "a", label: "Photographing a mattress on a sidewalk where lawful" },
          { id: "b", label: "Person-tracking, encampment targeting, and assigning blame without evidence" },
          { id: "c", label: "Recording a location" },
          { id: "d", label: "Linking a public 311 case number" },
        ],
        correct: "b",
        explain: "Conditions, not people. Published independence and privacy rules on oaklandstreets.live.",
      },
      {
        id: "m11q5",
        prompt: "Stormwater connection: dumped oil and debris can:",
        options: [
          { id: "a", label: "Only affect the one parcel" },
          { id: "b", label: "Enter drains and creeks — a public-health and Bay water-quality pathway" },
          { id: "c", label: "Improve compost" },
          { id: "d", label: "Be ignored if the pile is on private property" },
        ],
        correct: "b",
        explain: "Illicit discharge is not a neighborhood-only aesthetic issue.",
      },
    ],
    governance: cityGov,
  },
  {
    id: "m12",
    number: 12,
    title: "The STREETS field method",
    essentialQuestion: "How do you turn a messy block into a record you could defend?",
    durationMin: 8,
    objectives: [
      "Apply the 10-step observation protocol",
      "Separate fact from inference",
      "Prepare for the 98th Avenue simulation",
    ],
    lesson: [
      {
        kind: "list",
        title: "Observation protocol",
        items: [
          "1 Observe — what is physically present?",
          "2 Locate — record sufficiently precise location",
          "3 Classify — identify condition type",
          "4 Assess — severity, volume, obstruction, possible hazards",
          "5 Document — photograph where lawful and appropriate",
          "6 Separate fact from inference — never assign blame without evidence",
          "7 Route — determine the appropriate service pathway",
          "8 Follow — check whether the condition changes",
          "9 Close — document verified resolution where possible",
          "10 Analyze — ask whether the condition recurs",
        ],
      },
      {
        kind: "quote",
        text: "See what is there. Record what is known. Label what remains uncertain.",
      },
      {
        kind: "rule",
        title: "Four questions a graduate must answer",
        text: "WHAT IS IT? WHERE DOES IT GO? WHO HANDLES IT? WHAT HAPPENS NEXT?",
      },
    ],
    interaction: {
      kind: "protocol",
      title: "Build a miniature incident record",
      intro: "You will be given a raw scene description. Produce a record that would survive review.",
    },
    quiz: [
      {
        id: "m12q1",
        prompt: "“The landlord dumped this” is:",
        options: [
          { id: "a", label: "A fact if the pile is near an apartment" },
          { id: "b", label: "An inference unless you have evidence" },
          { id: "c", label: "Required language in 311 reports" },
          { id: "d", label: "A STREETS mandatory field" },
        ],
        correct: "b",
        explain: "Label uncertainty. Do not launder guesses as facts.",
      },
      {
        id: "m12q2",
        prompt: "If a condition looks hazardous, the trainee:",
        options: [
          { id: "a", label: "Opens containers to confirm" },
          { id: "b", label: "Maintains distance and refers" },
          { id: "c", label: "Moves the material to the dumpster" },
          { id: "d", label: "Ignores it because STREETS is only about recycling quizzes" },
        ],
        correct: "b",
        explain: "Safety competency from Module 5, applied in the field method.",
      },
      {
        id: "m12q3",
        prompt: "Location information should be:",
        options: [
          { id: "a", label: "“Somewhere in East Oakland”" },
          { id: "b", label: "Sufficiently precise to find the condition again" },
          { id: "c", label: "A person’s name and unit number whenever possible" },
          { id: "d", label: "Omitted for speed" },
        ],
        correct: "b",
        explain: "Locate is step 2. Person-level data is constrained by STREETS privacy rules.",
      },
      {
        id: "m12q4",
        prompt: "Follow-up exists because:",
        options: [
          { id: "a", label: "A single photo proves the City failed forever" },
          { id: "b", label: "You cannot know whether a response changed the condition, or whether it returned, without a later look" },
          { id: "c", label: "Haulers require citizen follow-up as legal notice" },
          { id: "d", label: "It is optional decoration" },
        ],
        correct: "b",
        explain: "Before/after and recurrence are the point of longitudinal evidence.",
      },
      {
        id: "m12q5",
        prompt: "Passing the 98th Avenue exercise requires:",
        options: [
          { id: "a", label: "A perfect aesthetic judgment" },
          { id: "b", label: "80/100 across classification, disposal, safety, routing, documentation, and evidence discipline" },
          { id: "c", label: "Blaming a tenant in writing" },
          { id: "d", label: "Ignoring legitimate carts" },
        ],
        correct: "b",
        explain: "Stated scoring. Identify every condition, including the ones that are not defects.",
      },
    ],
    governance: cityGov,
  },
];

export const MODULE_MAP = Object.fromEntries(MODULES.map((m) => [m.id, m]));

export function nextModuleId(id: string): string | null {
  const i = MODULES.findIndex((m) => m.id === id);
  if (i < 0 || i === MODULES.length - 1) return null;
  return MODULES[i + 1].id;
}
