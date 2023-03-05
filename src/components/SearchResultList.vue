<script setup lang="ts">
import SearchResult from "./SearchResult.vue";

defineProps<{
    results: string[];
}>();

defineEmits(['searchResultClick'])

</script>


<template>
    <div class="absolute z-10 bg-black" v-show="results.length > 0">
        <ul>
            <SearchResult v-for="result of results" :text="result"
                @click="(text: string) => { $emit('searchResultClick', text) }" />
        </ul>
</div>
</template>