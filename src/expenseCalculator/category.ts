export type Category = {
    name: string;
    description: string;
    color: string;
    keywords: string[];
};

// convert defaultCatgories to a type
export const defaultCategories: Category[] = [
    {
        name: "Uncategorized",
        description: "Uncategorized",
        color: "gray",
        keywords: []
    },
    {
        name: "Utility",
        description: "Utility",
        color: "red",
        keywords: [
            "utility",
            "water",
            "gas",
            "cox",
            "geico",
            "mvd",
            "srp"
        ]
    },
    {
        name: "Groceries",
        description: "Groceries",
        color: "blue",
        keywords: [
            "groceries",
            "food",
            "grocery",
            "grocery store",
            "walmart",
            "wal-mart",
            "wm supercenter",
            "trader joe",
            "target",
            "city-market"
        ]
    },
    {
        name: "Restaurants",
        description: "Restaurants",
        color: "green",
        keywords: [
            "tea swirl",
            "chilis",
            "restaurant",
            "chipotle",
            "jin shabu",
            "mcdonald",
            "raising",
            "bjs rest",
            "ramen",
            "bbq",
            "barbecue",
            "sushi",
            "junn all you can eat",
            "snooze an am",
            "chili's",
            "snooze eatery",
            "denny",
            "tea swirld",
            "senor taco",
            "smashburger",
            "taco",
            "in n out",
            "wendy",
            "rositas fine",
            "burgers",
            "jersey mikes",
            "chopshop",
            "deli",
            "starbucks",
            "just just subs",
            "samurai sam",
            "betty's pizza",
            "the lunch lounge"
        ]
    },
    {
        name: "Entertainment",
        description: "Entertainment",
        color: "yellow",
        keywords: [
            "sport",
            "microsoft*subscription",
            "drop.com",
            "etsy",
            "amc",
            "entertainment",
            "movie",
            "movies",
            "cinema",
            "theater",
            "theaters",
            "theatre",
            "theatres",
            "concert",
            "concerts",
            "music",
            "musicia",
            "steam",
            "game",
            "anime",
            "youtube",
            "hulu",
            "netflix",
            "google",
            "nintendo",
            "yostar",
            "spotify",
            "patreon",
            "hololive",
            "microsoft*pc",
            "otaku",
            "kwei",
            "demondice",
            "hitsu",
            "foreign transaction",
            "alamo",
            "movie",
            "b&n",
            "harkins",
            "tokyo",
            "therightpod",
            "levyatlaconvtn",
            "ca tlr cash",
            "barnes & noble",
            "whiskey row",
            "keebsforall",
            "the oodie",
            "luxome products",
            "discord* nitro",
            "total wine",
            "renaissance festiva",
        ]
    },
    {
        name: "Mortgage",
        description: "Mortgage",
        color: "orange",
        keywords: [
            "mortgage",
            "mortgages",
            "home",
            "house",
            "rent",
            "rental",
            "rentals",
            "apartment",
            "apartments",
            "condo",
            "condos",
            "condominium",
            "condominiums",
            "proptax",
            "aic*allst",
            "projectsolar",
            "project solar"
        ]
    },
    {
        name: "Medical",
        description: "Medical",
        color: "purple",
        keywords: [
            "medical",
            "doctor",
            "doctors",
            "dentist",
            "dentists",
            "pharmacy",
            "pharmacies",
            "hospital",
            "hospitals",
            "clinic",
            "clinics",
            "health",
            "healthcare",
            "health care",
            "health insurance",
            "healthcare in",
            "hospital",
            "sick",
            "visit",
            "banner",
            "health",
            "dental",
            "ear nose throat",
            "radiology",
            "labcorp",
            "onemed",
            "farmers insuran des:payment id:xxxx"
        ]
    },
    {
        name: "Coinbase",
        description: "Coinbase",
        color: "pink",
        keywords: [
            "coinbase",
            "cointracker",
            "coinledger",
            "wire type:wire in date: 221109",
            "bkofamerica mobile 11/09 xxxxx00401 deposit"
        ]
    },
    {
        name: "Amazon",
        description: "Amazon",
        color: "brown",
        keywords: [
            "amazon",
            "amzn"
        ]
    },
    {
        name: "Work",
        description: "Work",
        color: "gray",
        keywords: [
            "work",
            "job",
            "jobs",
            "empl",
            "revolu",
            "github",
            "heroku",
            "godaddy"
        ]
    },
    {
        name: "Misc",
        description: "Misc",
        color: "black",
        keywords: [
            "misc",
            "miscellaneous",
            "other",
            "others",
            "miscellaneous",
            "cashreward"
        ]
    },
    {
        name: "Gas",
        description: "Gas",
        color: "teal",
        keywords: [
            "gas",
            "fuel",
            "petrol",
            "petroleum",
            "shell",
            "arco",
            "chevron",
            "valero",
            "76",
            "76 gas",
            "chevron",
            "circle k"
        ]
    },
    {
        name: "Tax",
        description: "Tax",
        color: "cyan",
        keywords: [
            "tax",
            "taxes",
            "irs",
            "federal",
            "state",
            "income",
            "property",
            "sales",
            "turbotax",
            "usataxpymt",
            "ctt-tax-report",
            "az dept of rev"
        ]
    },
    {
        name: "Credit Card",
        description: "Credit Card",
        color: "lime",
        keywords: [
            "credit card bill payment",
            "payment - thank you"
        ]
    }
];