<script setup lang="ts">
import Card from "./Card.vue";
import type { ComputedRecipe } from "./ComputedRecipeOutput.vue";
import Divider from "./Divider.vue";

defineProps<{
    computedRecipe: ComputedRecipe;
}>();

const scrollToElement = (id: string) =>  {
  const el = document.getElementById(id);

  if (el) {
    el.scrollIntoView();
  }
}

</script>

<template>
    <Card class="p-2 text-xs" :id="computedRecipe.OutputItem">
        <template #header>
            <div>
                {{ computedRecipe.CraftingPerSec }} {{ computedRecipe.OutputItem }} per sec
            </div>
        </template>
        <Divider class="my-2"/>
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
            Consumes
        </div>
        <ul class="mb-2">
            <li v-for="(val, key) in computedRecipe.ItemsConsumedPerSec">
                <button class="hover:bg-gray-800" @click="scrollToElement(key as string)">{{ key }}</button>: {{ val }}/s
            </li>
        </ul>
        <div v-if="computedRecipe.UsedFor !== ''">
            <span class="font-bold">For</span>: {{ computedRecipe.UsedFor }}
        </div>

    </Card>
</template>
