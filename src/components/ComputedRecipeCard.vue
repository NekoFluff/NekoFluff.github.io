<script setup lang="ts">
import { useRecipesStore } from "@/stores/recipes";
import { computed, ref } from "vue";
import Card from "./Card.vue";
import type { ComputedRecipe } from "./ComputedRecipeOutput.vue";
import Divider from "./Divider.vue";

const recipesStore = useRecipesStore();

const props = defineProps<{
    computedRecipe: ComputedRecipe;
}>();

const scrollToElement = (id: string) => {
    const el = document.getElementById(id);

    if (el) {
        el.scrollIntoView({ block: 'center', behavior: 'smooth' });
        recipesStore.setSelectedRecipe(id);
    }
}

const usedFor = computed(() => {
    const result: { [key: string]: string } = {}

    if (props.computedRecipe.usedFor.includes('Uses')) {
        const parentRecipes = props.computedRecipe.usedFor.split('|').map((parentRecipe) => parentRecipe.trim())

        const re = /(.*)\s+(\(Uses.*\))/;
        for (const parentRecipe of parentRecipes) {
            const match = re.exec(parentRecipe)
            if (match != null && match?.length > 2) {
                result[match[1]] = match[2]
            }
        }
        return result
    } else {
        result[props.computedRecipe.usedFor] = ""
    }

    return result
})

const highlighted = ref<boolean>(false);

recipesStore.$subscribe(() => {
    highlighted.value = (recipesStore.selectedRecipe == props.computedRecipe.outputItem)
})


</script>

<template>
    <Card class="p-2 text-xs" :class="{ 'border-yellow-500': highlighted }" :id="computedRecipe.outputItem">
        <template #header>
            <div>
                {{ computedRecipe.craftingPerSec }} {{ computedRecipe.outputItem }} per sec
            </div>
        </template>
        <Divider class="my-2" />
        <div class="mb-2">
            <span class="font-bold">{{ computedRecipe.numFacilitiesNeeded ==
                1 ?
                "Facility" : "Facilities" }}:</span> {{ computedRecipe.numFacilitiesNeeded }} {{ computedRecipe.facility
    }}{{
    computedRecipe.numFacilitiesNeeded ==
    1 ?
    "" : "s" }}
        </div>
        <div class="font-bold">
            Consumes:
        </div>
        <ul class="mb-2">
            <li v-for="(val, key) in computedRecipe.itemsConsumedPerSec">
                <button class="hover:bg-gray-800" @click="scrollToElement(key as string)">{{ key }}</button>: {{ val }}/s
            </li>
        </ul>
        <div class="font-bold" v-if="computedRecipe.usedFor !== ''">
            For:
        </div>
        <ul class="mb-2">
            <li v-for="(usesStr, parentRecipeName) in usedFor">
                <button class="hover:bg-gray-800" @click="scrollToElement(parentRecipeName as string)">{{ parentRecipeName
                }}</button> {{ usesStr }}
            </li>
        </ul>
    </Card>
</template>
