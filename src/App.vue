<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
</script>

<template>
    <header class="w-full">
        <NavBar></NavBar>
    </header>

<RouterView />
</template>
