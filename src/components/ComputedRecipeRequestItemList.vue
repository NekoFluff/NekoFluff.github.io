<script setup lang="ts">

import { useRecipesStore, type ComputedRecipeRequest } from "@/stores/recipes.js"
import ComputedRecipeRequestItem from "./ComputedRecipeRequestItem.vue";

const { recipeRequests } = useRecipesStore();

defineEmits(["recipeRequestClick"])

const props = defineProps<{
    selectedRecipeRequest: ComputedRecipeRequest
}>()

const isSelected = (recipeRequest: ComputedRecipeRequest) => {
    return recipeRequest === props.selectedRecipeRequest
}

</script>


<template>
    <ul v-show="Object.keys(recipeRequests).length > 0">
        <ComputedRecipeRequestItem :class="{ 'bg-slate-800': isSelected(recipeRequest) }"
            v-for="recipeRequest of recipeRequests" :recipeRequest="recipeRequest"
            @click="(recipeRequest: ComputedRecipeRequest) => $emit('recipeRequestClick', recipeRequest)" />
    </ul>
</template>