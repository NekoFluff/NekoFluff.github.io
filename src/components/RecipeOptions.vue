<script setup lang="ts">
import type { ComputedRecipeRequest } from "@/stores/recipes.js"
import type { Recipe } from "@/views/RecipeToolView.vue";
import RecipeOption from "./RecipeOption.vue";

defineProps<{
    recipeRequest: ComputedRecipeRequest
    options: Recipe[]
}>();

</script>

<template>
    <RecipeOption v-for="(recipe, index) in options" :recipeRequest="recipeRequest" :recipeOption="recipe" :index="index" />
</template>
