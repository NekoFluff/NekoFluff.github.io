<script setup lang="ts">
import type { Recipe } from "@/views/RecipeToolView.vue"
import RecipeItem from "./RecipeItem.vue";

defineProps<{
    recipes: Recipe[][];
}>();

</script>


<template>
    <div class="text-black text-2xl bg-red-400 p-2 my-4 rounded-md" v-show="recipes.length > 0">

        <h2>Recipe Options</h2>
        <ul>
            <RecipeItem class="text-xl" v-for="r of recipes" :recipes="r" />
        </ul>
</div>
</template>