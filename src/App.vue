<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import SocialMediaBar from "./components/SocialMediaBar.vue";
</script>

<template>
    <header>
        <NavBar></NavBar>
    </header>
    <RouterView />
    <footer class="sticky bottom-0">
        <SocialMediaBar />
    </footer>
</template>
