<script setup lang="ts">
import Card from "./Card.vue";
import type { ComputedRecipe } from "./ComputedRecipeOutput.vue";

defineProps<{
    computedRecipe: ComputedRecipe;
}>();

</script>

<template>
    <Card class="p-2 text-xs">
        <template #header>
            <div>
                {{ computedRecipe.CraftingPerSec }} {{ computedRecipe.OutputItem }} per sec
            </div>
        </template>
        <hr class="w-full h-0.5 mx-auto my-2 border-0 rounded bg-green-500">
        <div class="mb-2">
            <span class="font-bold">{{ computedRecipe.NumFacilitiesNeeded >
                1 ?
                "Facilities" : "Facility" }}:</span> {{ computedRecipe.NumFacilitiesNeeded }} {{ computedRecipe.Facility
    }}{{
    computedRecipe.NumFacilitiesNeeded >
    1 ?
    "s" : "" }}
        </div>
        <div class="font-bold">
            Consumes
        </div>
        <ul class="mb-2">
            <li v-for="(val, key) in computedRecipe.ItemsConsumedPerSec">
                {{ key }}: {{ val }}/s
            </li>
        </ul>
    </Card>
</template>
