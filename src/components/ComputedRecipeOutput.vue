<script setup lang="ts">
import { computed } from 'vue';
import ComputedRecipeGrid from './ComputedRecipeGrid.vue';
import Divider from './Divider.vue';
import type { ComputedRecipe } from "alex-api-typescript-client/api";

const props = defineProps<{
    computedRecipes: ComputedRecipe[]
    depthMode: boolean
}>();

const depthSeparatedRecipes = computed(() => {
    const result: ComputedRecipe[][] = []

    if (props.depthMode) {
        for (const recipe of props.computedRecipes) {
            const depth = recipe.depth || 0
            if (result[depth] == undefined) { result[depth] = [] }
            result[depth].push(recipe)
        }
    }

    return result
})

</script>

<template>
    <div v-if="computedRecipes.length > 0">

        <ComputedRecipeGrid v-if="!depthMode" :computedRecipes="computedRecipes"></ComputedRecipeGrid>
        <div v-if="depthMode" class="mb-5">
            <div v-for="recipes, index in depthSeparatedRecipes">
                <ComputedRecipeGrid :computedRecipes="recipes"></ComputedRecipeGrid>
                <div v-if="index < depthSeparatedRecipes.length - 1">
                    <Divider class="my-6" />
                    <div class="absolute px-4 -translate-x-1/2 bg-black -translate-y-9 left-1/2 ">
                        <font-awesome-icon icon="fa-solid fa-arrow-up fa-3x" transform="grow-15" />
                    </div>
                </div>
            </div>
        </div>
        <div class="m-3">
            <div class="text-lg font-bold">JSON</div>
            <textarea class="w-full text-black h-96" readonly>{{ JSON.stringify(computedRecipes, null, 4) }}</textarea>
        </div>
    </div>
</template>