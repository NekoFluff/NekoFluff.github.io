<script setup lang="ts">

import { useRecipesStore, type ComputedRecipeRequest } from "@/stores/recipes.js"
import axios from 'axios';
import { ref } from "vue";
import RecipeOptionsPicker from "./RecipeOptionsPicker.vue";

export interface ComputedRecipe {
    OutputItem: string,
    Facility: string,
    NumFacilitiesNeeded: number,
    ItemsConsumedPerSec: any,
    SecondsSpentPerCraft: number,
    CraftingPerSec: number,
    UsedFor: string,
}

const props = defineProps<{
    recipeRequest: ComputedRecipeRequest;
}>();

const recipesStore = useRecipesStore();

var computedRecipes = ref<ComputedRecipe[]>([])

const fetchData = async () => {
    const reqBody = [props.recipeRequest]

    const data = JSON.stringify(reqBody)
    var url = 'https://alex-api.herokuapp.com/dsp/computedRecipe'

    const resp = await axios.post<ComputedRecipe[]>(url, data, { params: { group: recipesStore.groupRecipes ? 1 : 0 } })
    computedRecipes.value = resp.data
}

fetchData()

recipesStore.$subscribe(async () => {
    await fetchData()
});

console.log("GROUP RECIPES 2", recipesStore.groupRecipes)

</script>

<template>
    <div class="flex flex-col h-96">
        <h2 class="font-bold mt-5 mb-2">Computed Recipe</h2>
        <textarea class="mt-1 w-full text-black flex flex-grow"
            readonly>{{ JSON.stringify(computedRecipes, null, 4) }}</textarea>
    </div>
    <h1 class="mt-5 mb-2 font-bold">
        Alternate Recipe Options
    </h1>
    <div v-for="recipeOptions of recipesStore.getRecipesWithOptions(computedRecipes)">
        <RecipeOptionsPicker :recipeRequest="recipeRequest" :options="recipeOptions">
        </RecipeOptionsPicker>
</div>
</template>