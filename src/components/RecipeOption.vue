<script setup lang="ts">
import { useRecipesStore } from "@/stores/recipes.js"
import type { ComputedRecipeRequest, Recipe } from "alex-api-typescript-client/api";
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
    if (requirements) {
        const selectedIdx = requirements[props.recipeOption.outputItem]
        return selectedIdx === props.index || selectedIdx === undefined && props.index == 0
    }
    return false
}

let isSelected = ref<boolean>(calculateIsSelected())

watch(
    () => {
        if (props.recipeRequest.requirements) {
            return props.recipeRequest.requirements[props.recipeOption.outputItem]
        } else {
            return false
        }
    },
    () => { isSelected.value = calculateIsSelected() }
)

</script>

<template>
    <button class="w-full mt-2 mb-2 rounded-md p-2 hover:bg-slate-700" :class="{ 'bg-slate-800': isSelected }"
        @click="() => { handleAddRequirement(index) }">
        <slot name="icons">
            <i class="text-sm" v-for="(amount, materialName) in recipeOption.materials">
                {{ materialName }} x{{ amount }} |
            </i>
        </slot>
        at {{ recipeOption.facility }}
    </button>
</template>
