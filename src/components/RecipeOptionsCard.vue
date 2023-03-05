<script setup lang="ts">
import RecipeOptions from "./RecipeOptions.vue";
import type { Recipe } from "@/views/RecipeToolView.vue";
import type { ComputedRecipeRequest } from "@/stores/recipes.js";
import Card from "./Card.vue";

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
                {{ options[0].OutputItem }}
            </div>
        </template>

        <RecipeOptions :recipeRequest="props.recipeRequest" :options="options" />
    </Card>
</template>
