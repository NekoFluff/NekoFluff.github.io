<script setup lang="ts">
import { useRecipesStore, type ComputedRecipeRequest } from "@/stores/recipes.js"
import { ref } from "vue"
import { debounce } from "lodash";

const recipesStore = useRecipesStore()
const props = defineProps<{
    recipeRequest: ComputedRecipeRequest;
}>();

defineEmits(["click"])

const rate = ref(props.recipeRequest.rate);

const handleDelete = () => {
    recipesStore.removeRequest(props.recipeRequest)
}

const handleInput = debounce((value: string) => {
    rate.value = Number(value)
    props.recipeRequest.rate = Number(value)
    recipesStore.addRequest(props.recipeRequest)
}, 500)

</script>

<template>
    <li class="rounded-md bg-black text-green-500 p-3 hover:bg-slate-700">
        <button class="flex flex-row w-full items-center" @click="$emit('click', recipeRequest)">

            <img v-if="recipesStore.recipeMap[props.recipeRequest.name][0].image" class="inline h-6 w-6" :src="recipesStore.recipeMap[props.recipeRequest.name][0].image" :alt="props.recipeRequest.name"/>
            <div class="flex-1 text-left mr-3 ml-2">
                {{ recipeRequest.name }}
            </div>

            <input class="text-black flex-initial w-10 rounded-md text-right px-0.5 outline-none" type="number" step="0.01"
                placeholder="1.0" :value="rate" @input="handleInput(($event.target as HTMLInputElement).value)" /> <span
                class="ml-0.5">/s</span>
            <button class="flex-initial ml-2 text-center rounded-md" @click="handleDelete">
                <font-awesome-icon icon="fa-solid fa-trash" />
            </button>
        </button>
    </li>
</template>
