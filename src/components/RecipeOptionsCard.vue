<script setup lang="ts">
import RecipeOptions from "./RecipeOptions.vue";
import type { Recipe } from "@/views/RecipeToolView.vue";
import type { ComputedRecipeRequest } from "@/stores/recipes.js";
import Card from "./Card.vue";
import { useRecipesStore } from "@/stores/recipes";
import ScrollLink from "./ScrollLink.vue";

const recipesStore = useRecipesStore();

const props = defineProps<{
    recipeRequest: ComputedRecipeRequest;
    options: Recipe[];
}>();
</script>

<template>
    <Card>
        <template #header>
            <i>
                <slot name="icon"></slot>
            </i>
            <div class="flex-1 font-bold">
                <ScrollLink :targetId="(options[0].outputItem)" :text="(options[0].outputItem)" :callback="() => { recipesStore.setSelectedRecipe(options[0].outputItem); }"></ScrollLink>
            </div>
        </template>

        <RecipeOptions :recipeRequest="props.recipeRequest" :options="options" />
    </Card>
</template>
