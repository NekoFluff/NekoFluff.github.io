<script setup lang="ts">
import { useRecipesStore, type ComputedRecipeRequest } from "@/stores/recipes.js"
import { ref } from "vue"
import { debounce } from "lodash";
import RecipeOptions from "./RecipeOptions.vue";
import ComputedRecipeOutput from "./ComputedRecipeOutput.vue";

const { removeRequest, addRequest } = useRecipesStore()
const props = defineProps<{
    recipeRequest: ComputedRecipeRequest;
}>();

const rate = ref(props.recipeRequest.Rate);

const handleDelete = () => {
    removeRequest(props.recipeRequest)
}

const handleInput = debounce((value: string) => {
    props.recipeRequest.Rate = Number(value)
    addRequest(props.recipeRequest)
}, 500)

</script>

<template>
    <li class="rounded-md text-black bg-purple-400 shadow-lg m-3 p-3 flex flex-col">
        <i>
            <slot name="icon"></slot>
        </i>
        <div class="flex-1 font-bold">
            {{ recipeRequest.Name }}
        </div>
        <RecipeOptions :recipeRequest="recipeRequest" :options="recipeRequest.RecipeOptions" />

        <div class="w-full flex ">
            <input class="rounded-md flex-auto text-right p-0.5" type="number" placeholder="1.0" :value="rate"
                @input="handleInput(($event.target as HTMLInputElement).value)" /> <span class="ml-2 font-bold">/s</span>
        </div>
        <button class="my-2 py-2 text-center rounded-sm bg-red-600 w-full" @click="handleDelete">Remove</button>
        <ComputedRecipeOutput :recipeRequest="recipeRequest" />
</li>
</template>
