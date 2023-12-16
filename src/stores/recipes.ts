import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type {
  Recipe,
  ComputedRecipe,
  GetDSPComputedRecipeRequestInner,
} from "alex-api-typescript-client/api";

export const useRecipesStore = defineStore("recipes", () => {
  const recipes = ref<Recipe[][]>([]);
  const selectedRecipe = ref<string>("");
  const recipeMap = computed<{ [key: string]: Recipe[] }>(() => {
    const map: { [key: string]: Recipe[] } = {};
    for (const recipeList of recipes.value) {
      map[recipeList[0].name] = recipeList;
    }
    return map;
  });
  const recipeRequests = ref<{ [key: string]: GetDSPComputedRecipeRequestInner }>({});
  const groupRecipes = ref(true);

  function setRecipes(r: Recipe[][]) {
    recipes.value = r;
  }

  function setSelectedRecipe(r: string) {
    selectedRecipe.value = r;
  }

  function addRequest(req: GetDSPComputedRecipeRequestInner) {
    recipeRequests.value[req.name] = req;
  }

  function removeRequest(req: GetDSPComputedRecipeRequestInner) {
    delete recipeRequests.value[req.name];
  }

  function addRequestRequirement(
    req: GetDSPComputedRecipeRequestInner,
    reqRecipeName: string,
    recipeIdx: number
  ) {
    const request = recipeRequests.value[req.name];
    if (request) {
      request.requirements = request.requirements || {};
      request.requirements[reqRecipeName] = recipeIdx;
    }
  }

  function getRecipesWithOptions(
    computedRecipes: ComputedRecipe[]
  ): Recipe[][] {
    var seen: { [key: string]: boolean } = {};
    var recipes: Recipe[][] = [];
    for (const computedRecipe of computedRecipes) {
      const recipe = recipeMap.value[computedRecipe.name];
      if (recipe.length > 1 && !seen[recipe[0].name]) {
        recipes.push(recipe);
        seen[recipe[0].name] = true;
      }
    }

    recipes = recipes.sort((recipeList1, recipeList2) =>
      recipeList1[0].name.localeCompare(recipeList2[0].name)
    );

    return recipes;
  }

  return {
    recipes,
    selectedRecipe,
    setSelectedRecipe,
    recipeMap,
    getRecipesWithOptions,
    setRecipes,
    recipeRequests,
    groupRecipes,
    addRequest,
    removeRequest,
    addRequestRequirement,
  };
});
