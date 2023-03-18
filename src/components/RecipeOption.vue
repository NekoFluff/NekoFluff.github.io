<script setup lang="ts">
import { useRecipesStore, type ComputedRecipeRequest } from "@/stores/recipes.js"
import type { Recipe } from "@/views/RecipeToolView.vue";
import { ref, watch } from "vue";

const recipesStore = useRecipesStore()
const props = defineProps<{
    recipeRequest: ComputedRecipeRequest
    recipeOption: Recipe
    index: number
}>();

const handleAddRequirement = (index: number) => {
    recipesStore.addRequestRequirement(props.recipeRequest, props.recipeOption.outputItem, index)
}

const calculateIsSelected = () => {
    const requirements = props.recipeRequest.requirements
    const selectedIdx = requirements[props.recipeOption.outputItem]
    return selectedIdx === props.index || selectedIdx === undefined && props.index == 0
}

let isSelected = ref<boolean>(calculateIsSelected())

watch(
    () =>  props.recipeRequest.requirements[props.recipeOption.outputItem],
    () => { isSelected.value = calculateIsSelected() }
)

</script>

<template>
    <button class="w-full mt-2 mb-2 rounded-md p-2 hover:bg-slate-700" :class="{ 'bg-slate-800': isSelected }"
        @click="() => { handleAddRequirement(index) }">
        <i class="text-sm" v-for="(amount, materialName) in recipeOption.materials">
            <slot name="icons">{{ materialName }} x{{ amount }} | </slot>
        </i>
        at {{ recipeOption.facility }}
    </button>
</template>
