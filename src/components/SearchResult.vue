<script setup lang="ts">
defineProps<{
    text: string;
}>();

defineEmits(['click'])

</script>

<template>
    <button class="flex flex-row p-3 text-sm bg-black text-green-400 w-full hover:bg-slate-800 rounded-md"
        @click="$emit('click', text)">
        <slot name="icon"></slot>

        <span class="ml-2">
            {{ text }}
        </span>

</button>
</template>
