<script setup lang="ts">

import { AnalyticsApi } from "alex-api-typescript-client/api";
import { ref } from "vue";
import { useRoute } from "vue-router";

let count = ref(0)
let isLoading = ref(false)
let route = useRoute()
const api = new AnalyticsApi()


const pageViewCount = () => {
    if (isLoading.value) return
    isLoading.value = true
    api.pageViewed({
        path: route.path
    })
        .then((resp) => {
            count.value = resp.data.timesTracked ?? 0
        })
        .catch((ex) => {
            console.error('Unable to increment page view', ex)
        })
        .finally(() => {
            isLoading.value = false
        })
}

pageViewCount()

</script>

<template>
    <div class="flex justify-center">
        <div class="p-2 text-lg font-semibold text-green-500 transition-all duration-700 rounded-md"
            :class="{ 'text-transparent': isLoading, 'tracking-widest': !isLoading }">
            {{ `${count}`.padStart(10, '0') }}
        </div>
    </div>
</template>
