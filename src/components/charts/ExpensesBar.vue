<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, type ChartData } from 'chart.js'
import type { Transaction } from '@/expenseCalculator/transaction';
import { defaultCategories } from '@/expenseCalculator/category';
import { watchEffect, ref } from 'vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{
    transactions: Transaction[]
}>()

const categories = defaultCategories.filter(t => t.name !== 'Credit Card');
const categoryNames = categories.map(c => c.name)
const data = ref({} as ChartData<"bar">)

watchEffect(() => {
    const categorizedTransactions = categories.map(c => props.transactions.filter(t => t.category === c.name))

    data.value = {
        labels: categoryNames.filter((_, i) => categorizedTransactions[i].length > 0),
        datasets: [
            {
                label: 'Income',
                backgroundColor: '#79f879',
                data: categorizedTransactions.map(t => t.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0))
            },
            {
                label: 'Expense',
                backgroundColor: '#f87979',
                data: categorizedTransactions.map(t => t.filter(t => t.amount < 0).reduce((acc, t) => acc - t.amount, 0))
            },
            {
                label: 'Net',
                backgroundColor: '#7979f8',
                data: categorizedTransactions.map(t => t.reduce((acc, t) => acc + t.amount, 0))
            }
        ]
    }
})

const options = {
    responsive: true,
    maintainAspectRatio: false
}

</script>

<template>
    <Bar id="expenses-bar-chart" :options="options" :data="data" />
</template>
