<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";

import axios from 'axios';
import { ref } from "vue";

let recipes = ref<Recipe[]>([])

interface Recipe {
    OutputItem: string,
    OutputItemCount: number,
    Facility: string,
    Time: number,
    Materials: MaterialMap
}

interface MaterialMap { [key: string]: number }

axios.get<Recipe[]>('https://alex-api.herokuapp.com/dsp/recipes')
    .then((resp) => {
        console.log(resp.data)
        recipes.value = resp.data
    })
    .catch((ex) => {
        console.log(ex)
    })


</script>

<template>
    <main>
        <TheWelcome />
        <div class="text-3xl mt-10" v-for="recipe of recipes">{{ recipe.OutputItem }}</div>
    </main>
</template>
