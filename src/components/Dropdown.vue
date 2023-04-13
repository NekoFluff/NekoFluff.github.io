<!-- Dropdown vue component -->

<script setup lang="ts">
import { ref } from 'vue'

const showContent = ref(false)

const toggleDropdown = () => {
    showContent.value = !showContent.value
}
</script>

<template>
    <div class="dropdown">
        <button class="dropdown__button" @click="toggleDropdown">
            <slot name="button"></slot>
        </button>
        <div class="dropdown__content" v-show="showContent">
            <slot></slot>
        </div>
    </div>
</template>