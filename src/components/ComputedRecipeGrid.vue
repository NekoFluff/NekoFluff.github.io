<script setup lang="ts">
import ComputedRecipeCard from "./ComputedRecipeCard.vue";
import type { ComputedRecipe } from "./ComputedRecipeOutput.vue";

defineProps<{
    computedRecipes: ComputedRecipe[];
}>();

</script>

<template>
    <div class="grid md:grid-cols-1 lg:grid-cols-3">
        <ComputedRecipeCard v-for="computedRecipe in computedRecipes" :computedRecipe="computedRecipe" />
    </div>
</template>
