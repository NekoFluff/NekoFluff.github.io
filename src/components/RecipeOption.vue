<script setup lang="ts">
import { useRecipesStore, type ComputedRecipeRequest } from "@/stores/recipes.js"
import type { Recipe } from "@/views/RecipeToolView.vue";
import { ref } from "vue";

const recipesStore = useRecipesStore()
const props = defineProps<{
    recipeRequest: ComputedRecipeRequest
    recipeOption: Recipe
    index: number
}>();

const handleAddRequirement = (index: number) => {
    recipesStore.addRequestRequirement(props.recipeRequest, props.recipeOption.OutputItem, index)
}

const calculateIsSelected = () => {
    const requirements = props.recipeRequest.Requirements
    const selectedIdx = requirements[props.recipeOption.OutputItem]
    return selectedIdx === props.index || selectedIdx === undefined && props.index == 0
}

let isSelected = ref<boolean>(calculateIsSelected())

recipesStore.$subscribe(() => {
    isSelected.value = calculateIsSelected()
})

</script>

<template>
    <button class="w-full  mt-2 mb-2 rounded-md p-2" :class="{ 'bg-green-400': isSelected, 'bg-slate-400': !isSelected }"
        @click="() => { handleAddRequirement(index) }">
        Recipe #{{ index + 1 }}:
        <i v-for="(amount, materialName) in recipeOption.Materials">
            <slot name="icons">{{ materialName }} x{{ amount }} | </slot>
        </i>
        at {{ recipeOption.Facility }}
</button>
</template>
