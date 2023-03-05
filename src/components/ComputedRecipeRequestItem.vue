<script setup lang="ts">
import { useRecipesStore, type ComputedRecipeRequest } from "@/stores/recipes.js"
import { ref } from "vue"
import { debounce } from "lodash";

const recipesStore = useRecipesStore()
const props = defineProps<{
    recipeRequest: ComputedRecipeRequest;
}>();

defineEmits(["click"])

const rate = ref(props.recipeRequest.Rate);

const handleDelete = () => {
    recipesStore.removeRequest(props.recipeRequest)
}

const handleInput = debounce((value: string) => {
    props.recipeRequest.Rate = Number(value)
    recipesStore.addRequest(props.recipeRequest)
}, 500)

</script>

<template>
    <li class="rounded-md bg-black text-green-500 p-3 hover:bg-slate-700">
        <button class="flex flex-row w-full " @click="$emit('click', recipeRequest)">
            <div class="flex-1 text-left">
                {{ recipeRequest.Name }}
            </div>

            <input class="flex-initial w-10 rounded-md text-right px-0.5 ml-5" type="number" placeholder="1.0" :value="rate"
                @input="handleInput(($event.target as HTMLInputElement).value)" /> <span class="ml-0.5">/s</span>
            <button class="flex-initial ml-2 text-center rounded-md" @click="handleDelete">
                <font-awesome-icon icon="fa-solid fa-trash" />
            </button>
        </button>
    </li>
</template>
