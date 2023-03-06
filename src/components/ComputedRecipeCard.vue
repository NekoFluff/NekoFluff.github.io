<script setup lang="ts">
import { computed } from "vue";
import Card from "./Card.vue";
import type { ComputedRecipe } from "./ComputedRecipeOutput.vue";
import Divider from "./Divider.vue";

const props = defineProps<{
    computedRecipe: ComputedRecipe;
}>();

const scrollToElement = (id: string) => {
    const el = document.getElementById(id);

    if (el) {
        el.scrollIntoView();
    }
}

const usedFor = computed(() => {
    const result: { [key: string]: string } = {}

    if (props.computedRecipe.UsedFor.includes('Uses')) {
        const parentRecipes = props.computedRecipe.UsedFor.split('|').map((parentRecipe) => parentRecipe.trim())

        const re = /(.*)\s+(\(Uses.*\))/;
        for (const parentRecipe of parentRecipes) {
            const match = re.exec(parentRecipe)
            if (match != null && match?.length > 2) {
                result[match[1]] = match[2]
            }
        }
        return result
    } else {
        result[props.computedRecipe.UsedFor] = ""
    }

    return result
})

</script>

<template>
    <Card class="p-2 text-xs" :id="computedRecipe.OutputItem">
        <template #header>
            <div>
                {{ computedRecipe.CraftingPerSec }} {{ computedRecipe.OutputItem }} per sec
            </div>
        </template>
        <Divider class="my-2" />
        <div class="mb-2">
            <span class="font-bold">{{ computedRecipe.NumFacilitiesNeeded ==
                1 ?
                "Facility" : "Facilities" }}:</span> {{ computedRecipe.NumFacilitiesNeeded }} {{ computedRecipe.Facility
    }}{{
    computedRecipe.NumFacilitiesNeeded ==
    1 ?
    "" : "s" }}
        </div>
        <div class="font-bold">
            Consumes:
        </div>
        <ul class="mb-2">
            <li v-for="(val, key) in computedRecipe.ItemsConsumedPerSec">
                <button class="hover:bg-gray-800" @click="scrollToElement(key as string)">{{ key }}</button>: {{ val }}/s
            </li>
        </ul>
        <div class="font-bold" v-if="computedRecipe.UsedFor !== ''">
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
