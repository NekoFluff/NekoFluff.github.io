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
    <div class="flex flex-row p-2 text-green-500 bg-black rounded-md ">
        <button @click="$emit('click', file)">{{ file.name }}</button>
        <button class="flex-initial ml-2 text-center rounded-md" @click="$emit('remove', file)">
            <font-awesome-icon icon=" fa-solid fa-trash" />
        </button>
    </div>
</template>