<script setup lang="ts">
defineProps<{
    text: string;
}>();

defineEmits(['onClick'])

</script>

<template>
    <button class="flex flex-row p-3 text-sm bg-black text-green-400 w-full hover:bg-gray-700"
        @click="$emit('onClick', text)">
        <i>
            <slot name="icon"></slot>
        </i>
        {{ text }}

</button>
</template>
