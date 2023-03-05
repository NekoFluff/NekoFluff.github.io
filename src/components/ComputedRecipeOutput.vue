<script setup lang="ts">
import ComputedRecipeCard from './ComputedRecipeCard.vue';


export interface ComputedRecipe {
    OutputItem: string,
    Facility: string,
    NumFacilitiesNeeded: number,
    ItemsConsumedPerSec: any,
    SecondsSpentPerCraft: number,
    CraftingPerSec: number,
    UsedFor: string,
}

defineProps<{
    computedRecipes: ComputedRecipe[]
}>();

</script>

<template>
    <div class="grid grid-cols-3">
        <ComputedRecipeCard v-for="computedRecipe in computedRecipes" :computedRecipe="computedRecipe" />
    </div>

    <div class="text-lg font-bold">JSON</div>
    <textarea class="text-black h-96 w-full" readonly>{{ JSON.stringify(computedRecipes, null, 4) }}</textarea>
</template>