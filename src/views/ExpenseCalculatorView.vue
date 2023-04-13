<script setup lang="ts">
export type SortDirection = 'asc' | 'desc'

import FileButton from '@/components/FileButton.vue';
import UploadCSV from '@/components/UploadCSV.vue';
import ExpensesBar from '@/components/charts/ExpensesBar.vue';
import type { Transaction } from '@/expenseCalculator/transaction';
import { getTransactionsFromCsv } from '@/expenseCalculator/transaction';
import { ref } from 'vue';

const totalEarned = ref(0)
const totalSpent = ref(0)
const transactions = ref([] as Transaction[])
const currentSortBy = ref("date" as keyof Transaction)
const currentSortDirection = ref("asc" as SortDirection)

const files = ref([] as File[])

const removeFile = (file: File) => {
    const index = files.value.indexOf(file)
    files.value.splice(index, 1)
    handleFilesChange()
}

const handleAddFile = (file: File) => {
    files.value.push(file)
    handleFilesChange()
}

const handleFilesChange = () => {
    transactions.value = [];

    // loop files
    files.value.forEach(file => {

        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target) {
                const csv = e.target.result as string;
                const csvLines = csv.split('\n');

                let t = [] as Transaction[]

                if (file.name === "Debit.csv") {
                    t = getTransactionsFromCsv(csvLines, {
                        id: -1,
                        date: 0,
                        description: 1,
                        amount: 2,
                        category: -1,
                    });
                } else {
                    t = getTransactionsFromCsv(csvLines, {
                        id: 1,
                        date: 0,
                        description: 2,
                        amount: 4,
                        category: -1,
                    });
                }

                // filter out credit card transactions
                t = t.filter(t => t.category !== 'Credit Card')

                // add t to transactions
                transactions.value = [...transactions.value, ...t]
                transactions.value.sort((a, b) => a.date.getTime() - b.date.getTime());
                handleTransactionsChange()
            }
        }
        reader.readAsText(file);
    })
}

const handleTransactionsChange = () => {
    // sum all positive transactions into number, all negative tranasctions into a number, and the sum of all transactions
    const positiveTransactions = transactions.value.filter(t => t.amount > 0);
    const negativeTransactions = transactions.value.filter(t => t.amount < 0);

    // sum all transaction amounts
    totalEarned.value = positiveTransactions.reduce((acc, t) => acc + t.amount, 0);
    totalSpent.value = negativeTransactions.reduce((acc, t) => acc + t.amount, 0);

    console.log('Total earned', totalEarned.value)
    console.log('Total spent', totalSpent.value)
}


const sortBy = (key: keyof Transaction) => {
    if (currentSortBy.value === key) {
        currentSortDirection.value = currentSortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
        currentSortBy.value = key
        currentSortDirection.value = 'asc'
    }

    transactions.value.sort((a, b) => {
        if (a[key] < b[key]) {
            return currentSortDirection.value === 'asc' ? -1 : 1
        }
        if (a[key] > b[key]) {
            return currentSortDirection.value === 'asc' ? 1 : -1
        }
        return 0
    })
}


</script>

<template>
    <main>
        <h1>Expense Calculator</h1>
        <p>Calculate and analyze your expenses on a daily, monthy, or yearly basis.</p>
        <div class="card">
            <h2>Upload CSV</h2>
            <p>Upload a CSV file containing your expense & income data.</p>
            <UploadCSV @add-file="handleAddFile" />
        </div>

        <!-- Create a file button for every file -->
        <div class="card">
            <h2>Files</h2>
            <div v-for="file in files" :key="file.name">
                <FileButton :file="file" @remove="removeFile"></FileButton>
            </div>
        </div>

        <!-- Create a summary -->
        <div class="card">
            <h2>Summary</h2>

            <p>Number of files: {{ files.length }}</p>
            <p>Number of transactions: {{ transactions.length }}</p>
            <p>Number of positive transactions: {{ transactions.filter(t => t.amount > 0).length }}</p>
            <p>Number of negative transactions: {{ transactions.filter(t => t.amount < 0).length }}</p>
                    <p>Total earned: {{ totalEarned.toFixed(2) }}</p>
                    <p>Total spent: {{ totalSpent.toFixed(2) }}</p>
                    <p>Net: {{ (totalEarned + totalSpent).toFixed(2) }}</p>
        </div>

        <!-- Create a bar chart -->
        <div class="mb-10 max-h-96">
            <h2>Bar Chart</h2>
            <ExpensesBar :transactions="transactions"></ExpensesBar>
        </div>

        <!-- Create a table -->
        <div>
            <h2>Transactions</h2>
            <table>
                <thead>
                    <tr>
                        <th @click="sortBy('date')">Date</th>
                        <th @click="sortBy('description')">Description</th>
                        <th @click="sortBy('amount')">Amount</th>
                        <th @click="sortBy('category')">Category</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="transaction in transactions"
                        :key="transaction.date + transaction.id + transaction.description">
                        <td>{{ transaction.date.toLocaleDateString() }}</td>
                        <td>{{ transaction.description }}</td>
                        <td>{{ transaction.amount }}</td>
                        <td>{{ transaction.category }}</td>
                    </tr>
                </tbody>
            </table>
        </div>


    </main>
</template>
