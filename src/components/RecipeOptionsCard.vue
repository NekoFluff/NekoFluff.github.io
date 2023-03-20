<script setup lang="ts">
import RecipeOptions from "./RecipeOptions.vue";
import Card from "./Card.vue";
import { useRecipesStore } from "@/stores/recipes";
import ScrollLink from "./ScrollLink.vue";
import type { ComputedRecipeRequest, Recipe } from "alex-api-typescript-client/api";

const recipesStore = useRecipesStore();

const props = defineProps<{
    recipeRequest: ComputedRecipeRequest;
    options: Recipe[];
}>();
</script>

<template>
    <Card>
        <template #header>

            <div class="flex-1 font-bold">
                <ScrollLink :targetId="(options[0].outputItem)" :callback="() => { recipesStore.setSelectedRecipe(options[0].outputItem); }">
                    <img v-if="recipesStore.recipeMap[options[0].outputItem]  && recipesStore.recipeMap[options[0].outputItem][0]" class="inline h-5 w-5" :src="recipesStore.recipeMap[options[0].outputItem][0].image" :alt="options[0].outputItem"/>
                    {{ options[0].outputItem }}
                </ScrollLink>
            </div>
        </template>

        <RecipeOptions :recipeRequest="props.recipeRequest" :options="options" />
    </Card>
</template>
