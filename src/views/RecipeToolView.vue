<script setup lang="ts">
// import TheWelcome from "../components/TheWelcome.vue";
import ComputedRecipeRequestList from "@/components/ComputedRecipeRequestItemList.vue";
import RecipeList from "@/components/RecipeItemList.vue";
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

recipesStore.$subscribe(() => {
    text.value = ""
})

let text = ref<string>("super")

const filteredRecipes = computed(() => {
    if (text.value === "") { return [] }

    return recipesStore.recipes.filter((recipe) => { return recipe[0].OutputItem.toLowerCase().includes(text.value.toLocaleLowerCase()) })
})

const handleUpdate = debounce((updatedText: string) => {
    text.value = updatedText
}, 500)

axios.get<Recipe[][]>('https://alex-api.herokuapp.com/dsp/recipes')
    .then((resp) => {
        recipesStore.setRecipes(resp.data)
    })
    .catch((ex) => {
        console.log('An error occurred', ex)
    })

</script>

<template>
    <div class="flex flex-col">

        <SearchBar class="flex" :text="text" @onUpdate="handleUpdate" />
        <div v-if="Object.keys(recipesStore.recipeRequests).length > 0" class="ml-2 p-2 text-green-400">Grouped: <input
                type="checkbox" v-model="recipesStore.groupRecipes" /></div>
        <RecipeList :recipes="filteredRecipes"></RecipeList>
        <ComputedRecipeRequestList />
</div>
</template>