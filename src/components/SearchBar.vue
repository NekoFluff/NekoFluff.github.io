<script setup lang="ts">

defineProps<{
    text: string;
}>();
defineEmits(['onUpdate'])


</script>

<template>
    <input :value="text"
        class="rounded-md text-black placeholder-slate-700 bg-purple-400 shadow-lg shadow-purple-900 outline-none m-3 p-2"
        type="text" placeholder="Search..." @input="$emit('onUpdate', ($event.target as HTMLInputElement).value)" />
</template>
