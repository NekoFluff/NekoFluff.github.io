<script setup lang="ts">

defineProps<{
    header: string
}>()

</script>

<template>
    <div class="mb-3 p-2 pb-4 border border-b-4 border-green-500 text-green-500 rounded-md">
        <h2 class="text-lg ml-1 mb-3 mx-2">
            {{ header }}
        </h2>
        <slot></slot>
    </div>
</template>
