import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Recipe } from "@/views/RecipeToolView.vue";
import type { ComputedRecipe } from "@/components/ComputedRecipeOutput.vue";

export interface ComputedRecipeRequest {
    Name: string,
    Rate: number
    RecipeOptions: Recipe[]
    Requirements: { [key: string]: number }
}

export const useRecipesStore = defineStore("recipes", () => {
    const recipes = ref<Recipe[][]>([])
    const recipeMap = computed<{ [key: string]: Recipe[] }>(() => {
        const map: { [key: string]: Recipe[] } = {}
        for (const recipeList of recipes.value) {
            map[recipeList[0].OutputItem] = recipeList
        }
        return map
    })
    const recipeRequests = ref<{ [key: string]: ComputedRecipeRequest }>({});
    const groupRecipes = ref(false);

    function setRecipes(r: Recipe[][]) {
        recipes.value = r
    }

    function addRequest(req: ComputedRecipeRequest) {
        console.log('addrequest', req)
        recipeRequests.value[req.Name] = req;
    }

    function removeRequest(req: ComputedRecipeRequest) {
        delete recipeRequests.value[req.Name];
    }

    function addRequestRequirement(req: ComputedRecipeRequest, reqRecipeName: string, recipeIdx: number) {
        recipeRequests.value[req.Name].Requirements[reqRecipeName] = recipeIdx
    }

    function getRecipesWithOptions(computedRecipes: ComputedRecipe[]): Recipe[][] {
        var recipes: Recipe[][] = [];
        for (const computedRecipe of computedRecipes) {
            const recipe = recipeMap.value[computedRecipe.OutputItem];
            if (recipe.length > 1) {
                recipes.push(recipe)
            }
        }

        return recipes;
    }

    return { recipes, recipeMap, getRecipesWithOptions, setRecipes, recipeRequests, groupRecipes, addRequest, removeRequest, addRequestRequirement };
});
