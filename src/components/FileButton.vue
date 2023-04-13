<script setup lang="ts">

// file as prop
import { defineProps } from 'vue'
defineProps<{
    file: File
}>()

// emit
defineEmits<{
    'click': File
    'remove': File
}>()

</script>

<template>
    <div class="flex flex-row">
        <button @click="$emit('click', file)">{{ file.name }}</button>
        <button @click="$emit('remove', file)">Remove</button>
    </div>
</template>