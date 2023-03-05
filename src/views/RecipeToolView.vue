<script setup lang="ts">
// import TheWelcome from "../components/TheWelcome.vue";
import ComputedRecipeRequestList from "@/components/ComputedRecipeRequestItemList.vue";
import SearchBar from "@/components/SearchBar.vue"

import axios from 'axios';
import debounce from 'lodash/debounce';
import { computed, ref } from "vue";

import { useRecipesStore } from "@/stores/recipes";

export interface MaterialMap { [key: string]: number }

export interface Recipe {
    OutputItem: string,
    OutputItemCount: number,
    Facility: string,
    Time: number,
    Materials: MaterialMap
}

const recipesStore = useRecipesStore()

// recipesStore.$subscribe(() => {
//     text.value = ""
// })

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

</script>

<template>
    <div class="flex flex-col">

        <SearchBar :options="recipesStore.recipes.map((recipeList) => recipeList[0].OutputItem).sort()"
            @onSearchResultClick="handleSearchResultClicked" />
        <div v-if="Object.keys(recipesStore.recipeRequests).length > 0" class="m-2 p-2 text-green-500">Grouped: <input
                type="checkbox" v-model="recipesStore.groupRecipes" /></div>
        <ComputedRecipeRequestList />
</div>
</template>