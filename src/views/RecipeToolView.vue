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
import { includes } from "lodash";

export interface MaterialMap { [key: string]: number }

export interface Recipe {
    outputItem: string,
    outputItemCount: number,
    facility: string,
    time: number,
    materials: MaterialMap,
    image: string,
}

const recipesStore = useRecipesStore()

const depthModeEnabled = ref<boolean>(true)
const selectedRecipeRequest = ref<ComputedRecipeRequest>()
const computedRecipes = ref<ComputedRecipe[]>([])
const recipeOptionsList = ref<Recipe[][]>([])

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
        name: recipeName,
        rate: 1,
        recipeOptions: recipesStore.recipeMap[recipeName],
        requirements: {}
    })
}

const fetchData = async () => {
    if (selectedRecipeRequest.value == undefined) return;
    if (selectedRecipeRequest.value.rate <= 0) return;

    const reqBody = [selectedRecipeRequest.value]

    const data = JSON.stringify(reqBody)
    var url = 'https://alex-api.herokuapp.com/dsp/computedRecipes'

    const resp = await axios.post<ComputedRecipe[]>(url, data, { params: { group: recipesStore.groupRecipes ? 1 : 0 } })
    computedRecipes.value = resp.data
    recipeOptionsList.value = recipesStore.getRecipesWithOptions(resp.data)
}

recipesStore.$subscribe(async () => {
    const recipeRequests = Object.keys(recipesStore.recipeRequests)
    if (!includes(recipeRequests, selectedRecipeRequest.value?.name)) {
        if (recipeRequests.length > 0) {
            const recipeRequest = recipesStore.recipeRequests[recipeRequests[0]]
            selectedRecipeRequest.value = recipeRequest
        } else {
            selectedRecipeRequest.value = undefined
        }
    }

    await fetchData()
});

</script>

<template>
    <div class="flex flex-col">

        <SearchBar :options="recipesStore.recipes.map((recipeList) => {
            return {
                text: recipeList[0].outputItem,
                image: recipeList[0].image
            }
        }).sort()"
            @searchResultClick="handleSearchResultClicked" />
        <Section header="Options:" class="bg-black" v-if="Object.keys(recipesStore.recipeRequests).length > 0">
            <div class="text-sm ml-4 mb-3">Group Recipes: <input class="ml-1" type="checkbox" v-model="recipesStore.groupRecipes" />
            </div>
            <div class="text-sm ml-4 mb-3 ">Sort by Depth: <input class="ml-1" type="checkbox" v-model="depthModeEnabled" />
            </div>
        </Section>
        <div v-if="selectedRecipeRequest != undefined" class="flex justify-between">
            <Section header="Want" class="flex-initial bg-black max-w-xs">
                <ComputedRecipeRequestList :selectedRecipeRequest="selectedRecipeRequest"
                    @recipeRequestClick="handleRecipeRequestClicked" />
            </Section>
            <Section header="Need" class="flex-initial bg-black mx-3">
                <ComputedRecipeOutput :depthMode="depthModeEnabled" :computedRecipes="computedRecipes" />
            </Section>
            <Section header="Alternate Recipes" class="flex-initial bg-black max-w-xs">
                <div v-for="recipeOptions of recipeOptionsList">
                    <RecipeOptionsCard :recipeRequest="selectedRecipeRequest" :options="recipeOptions" />
                </div>
            </Section>
        </div>


    </div>
</template>
