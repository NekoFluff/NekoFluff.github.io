<script setup lang="ts">
defineProps<{
    text: string;
}>();

defineEmits(['click'])

</script>

<template>
    <button class="flex flex-row p-3 text-sm bg-black text-green-400 w-full hover:bg-slate-800 rounded-md"
        @click="$emit('click', text)">
        <i>
            <slot name="icon"></slot>
        </i>
        {{ text }}

</button>
</template>
