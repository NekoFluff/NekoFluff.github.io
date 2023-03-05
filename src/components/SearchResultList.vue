<script setup lang="ts">
import SearchResult from "./SearchResult.vue";

defineProps<{
    results: string[];
}>();

defineEmits(['onSearchResultClick'])

</script>


<template>
    <div class="absolute z-10" v-show="results.length > 0">
        <ul>
            <SearchResult v-for="result of results" :text="result"
                @onClick="(text: string) => { $emit('onSearchResultClick', text) }" />
        </ul>
</div>
</template>