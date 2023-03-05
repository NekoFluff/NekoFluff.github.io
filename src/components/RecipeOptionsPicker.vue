<script setup lang="ts">
import RecipeOptions from "./RecipeOptions.vue";
import type { Recipe } from "@/views/RecipeToolView.vue";
import type { ComputedRecipeRequest } from "@/stores/recipes.js";

const props = defineProps<{
    recipeRequest: ComputedRecipeRequest;
    options: Recipe[];
}>();
</script>

<template>
    <li class="rounded-md text-black bg-purple-500 shadow-lg m-3 p-3 flex flex-col">
        <i>
            <slot name="icon"></slot>
        </i>
        <div class="flex-1 font-bold">
            {{ options[0].OutputItem }}
        </div>
        <RecipeOptions :recipeRequest="props.recipeRequest" :options="options" />
</li>
</template>
