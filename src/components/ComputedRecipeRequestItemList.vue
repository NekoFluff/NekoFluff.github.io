<script setup lang="ts">

import { useRecipesStore } from "@/stores/recipes.js"
import ComputedRecipeRequestItem from "./ComputedRecipeRequestItem.vue";

const { recipeRequests } = useRecipesStore();

</script>


<template>
    <div class="text-black text-2xl bg-red-400 p-2 my-4 rounded-md" v-show="Object.keys(recipeRequests).length > 0">

        <h2>Recipe List</h2>
        <ul>
            <ComputedRecipeRequestItem class="text-xl" v-for="recipeRequest of recipeRequests"
                :recipeRequest="recipeRequest">
            </ComputedRecipeRequestItem>
        </ul>
</div>
</template>