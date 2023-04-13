import { defaultCategories } from "./category";

export class Transaction {
    public id: string;
    public date: Date;
    public amount: number;
    public description: string;
    public category: string;

    constructor(id: string, date: Date, amount: number, description: string, category: string) {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.description = description;
        this.category = category;
    }
}

export type TransactionMapping = {
    id: number;
    date: number;
    amount: number;
    description: number;
    category: number;
};

// parse a csv line by comma but ignore commas inside quotes
// https://stackoverflow.com/questions/8493195/how-can-i-parse-a-csv-string-with-javascript-which-contains-comma-in-data
function splitCsvLine(line: string): string[] {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = "";
        } else {
            current += char;
        }
    }
    result.push(current);
    return result;
}

// create a function that returns a list of transactions given a csv file and a mapping of column names to transaction properties
export function getTransactionsFromCsv(csvData: string[], mapping: TransactionMapping): Transaction[] {
    const transactions: Transaction[] = [];

    const categories = defaultCategories;

    for (let i = 1; i < csvData.length; i++) {
        // split csvdata into an array of strings by comma
        const csvLine = splitCsvLine(csvData[i]);

        // create a description string using the mapping and the csvLine, while removing extra quotes
        const desc = (csvLine[mapping.description] ?? "").replace(/"/g, "");

        let category = csvLine[mapping.category] ?? "Uncategorized"

        if (category === "Uncategorized") {
            //compare the description with the defaultCategories and assign the category
            for (let j = 0; j < categories.length; j++) {
                for (let k = 0; k < categories[j].keywords.length; k++) {
                    if (desc.toLowerCase().includes(categories[j].keywords[k])) {
                        category = categories[j].name;
                        break;
                    }
                }
            }
        }

        const amount = parseFloat((csvLine[mapping.amount] ?? "").replace(/[^0-9.-]+/g, ""));

        // create a new transaction object and push it to the transactions array
        const transaction = new Transaction(
            csvLine[mapping.id] ?? "",
            new Date(csvLine[mapping.date]) ?? "",
            amount,
            desc,
            category
        );

        if (transaction.description !== "") {
            transactions.push(transaction);
        }
    }
    return transactions;
}

