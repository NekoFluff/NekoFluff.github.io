<script setup lang="ts">
// import TheWelcome from "../components/TheWelcome.vue";
import ComputedRecipeRequestList from "@/components/ComputedRecipeRequestItemList.vue";
import SearchBar from "@/components/SearchBar.vue"

import axios from 'axios';

import { useRecipesStore, type ComputedRecipeRequest } from "@/stores/recipes";
import ComputedRecipeOutput, { type ComputedRecipe } from "@/components/ComputedRecipeOutput.vue";
import { ref } from "vue";
import RecipeOptionsCard from "@/components/RecipeOptionsCard.vue";
import Section from "@/components/Section.vue";

export interface MaterialMap { [key: string]: number }

export interface Recipe {
    OutputItem: string,
    OutputItemCount: number,
    Facility: string,
    Time: number,
    Materials: MaterialMap
}

const recipesStore = useRecipesStore()

const selectedRecipeRequest = ref<ComputedRecipeRequest>()
const computedRecipes = ref<ComputedRecipe[]>([])

const handleRecipeRequestClicked = (recipeRequest: ComputedRecipeRequest) => {
    selectedRecipeRequest.value = recipeRequest
    fetchData()
}

axios.get<Recipe[][]>('https://alex-api.herokuapp.com/dsp/recipes')
    .then((resp) => {
        recipesStore.setRecipes(resp.data)
    })
    .catch((ex) => {
        console.log('An error occurred', ex)
    })

const handleSearchResultClicked = (recipeName: string) => {
    recipesStore.addRequest({
        Name: recipeName,
        Rate: 1,
        RecipeOptions: recipesStore.recipeMap[recipeName],
        Requirements: {}
    })
}

const fetchData = async () => {
    if (selectedRecipeRequest.value == undefined) return;

    const reqBody = [selectedRecipeRequest.value]

    const data = JSON.stringify(reqBody)
    var url = 'https://alex-api.herokuapp.com/dsp/computedRecipe'

    const resp = await axios.post<ComputedRecipe[]>(url, data, { params: { group: recipesStore.groupRecipes ? 1 : 0 } })
    computedRecipes.value = resp.data
}

recipesStore.$subscribe(async () => {
    const recipeRequests = Object.keys(recipesStore.recipeRequests)

    if (selectedRecipeRequest.value == undefined && recipeRequests.length > 0) {
        selectedRecipeRequest.value = recipesStore.recipeRequests[recipeRequests[0]]
    }
    await fetchData()
});

</script>

<template>
    <div class="flex flex-col">

        <SearchBar :options="recipesStore.recipes.map((recipeList) => recipeList[0].OutputItem).sort()"
            @searchResultClick="handleSearchResultClicked" />
        <Section header="Options:" class=" hover:bg-slate-900" v-if="Object.keys(recipesStore.recipeRequests).length > 0">
            <div class="text-sm ml-3">Grouped: <input class="ml-1" type="checkbox" v-model="recipesStore.groupRecipes" />
            </div>
        </Section>
        <div class="flex justify-between">
            <Section header="Want" class="flex-initial bg-black max-w-xs">

                <ComputedRecipeRequestList :selectedRecipeRequest="selectedRecipeRequest"
                    @recipeRequestClick="handleRecipeRequestClicked" />
            </Section>
            <Section header="Need" class="flex-1 bg-black mx-3">
                <ComputedRecipeOutput :computedRecipes="computedRecipes" />
            </Section>
            <Section header="Alternate Recipes" class="flex-initial bg-black max-w-xs">
                <div v-if="selectedRecipeRequest != undefined"
                    v-for="recipeOptions of recipesStore.getRecipesWithOptions(computedRecipes)">
                    <RecipeOptionsCard :recipeRequest="selectedRecipeRequest" :options="recipeOptions" />
                </div>
            </Section>
        </div>


    </div>
</template>
