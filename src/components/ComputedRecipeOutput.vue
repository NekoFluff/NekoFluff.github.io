<script setup lang="ts">
import { computed } from 'vue';
import ComputedRecipeGrid from './ComputedRecipeGrid.vue';
import Divider from './Divider.vue';


export interface ComputedRecipe {
    OutputItem: string,
    Facility: string,
    NumFacilitiesNeeded: number,
    ItemsConsumedPerSec: {[key: string]: number},
    SecondsSpentPerCraft: number,
    CraftingPerSec: number,
    UsedFor: string,
    Depth: number,
}

const props = defineProps<{
    computedRecipes: ComputedRecipe[]
    depthMode: boolean
}>();

const depthSeparatedRecipes = computed(() => {
    const result: ComputedRecipe[][] = []

    if (props.depthMode) {
        for (const recipe of props.computedRecipes) {
            const depth = recipe.Depth || 0
            if (result[depth] == undefined) { result[depth] = []}
            result[depth].push(recipe)
        }
    }

    return result
})

</script>

<template>
    <div v-if="computedRecipes.length > 0">

        <ComputedRecipeGrid v-if="!depthMode" :computedRecipes="computedRecipes"></ComputedRecipeGrid>
        <div v-if="depthMode">
            <div v-for="recipes in depthSeparatedRecipes">
                <ComputedRecipeGrid :computedRecipes="recipes"></ComputedRecipeGrid>
                <Divider class="my-6"/>

            </div>
        </div>
        <div class="text-lg font-bold">JSON</div>
        <textarea class="text-black h-96 w-full" readonly>{{ JSON.stringify(computedRecipes, null, 4) }}</textarea>
    </div>
</template>