<script setup lang="ts">
import type { Recipe } from "@/views/RecipeToolView.vue"
import { useRecipesStore } from "@/stores/recipes.js"
import { ref } from "vue"

const { addRequest } = useRecipesStore()
const props = defineProps<{
    recipes: Recipe[];
}>();

const rate = ref(0);

const onAdd = () => {
    if (rate.value <= 0) { return; }
    addRequest({
        Name: props.recipes[0].OutputItem,
        Rate: rate.value,
        RecipeOptions: props.recipes,
        Requirements: {}
    })
}

</script>

<template>
    <li class="rounded-md text-black bg-purple-400 shadow-lg p-2 m-2 flex flex-col">
        <i>
            <slot name="icon"></slot>
        </i>
        <div class="font-bold">
            {{ recipes[0].OutputItem }}
        </div>
        <div class="mt-2 w-full flex">
            <input class="rounded-md flex-auto text-right p-0.5" type="number" placeholder="1.0" v-model="rate" /> <span
                class="ml-2 font-bold">/s</span>
        </div>
        <button class="my-2 py-2 w-full text-center rounded-sm bg-lime-600" @click="onAdd">Add</button>
</li>
</template>
