<script setup lang="ts">

const props = defineProps<{
    targetId: string;
    text: string;
    callback: () => void;
}>();

const scrollToElement = () => {
    const el = document.getElementById(props.targetId);

    if (el) {
        el.scrollIntoView({ block: 'center', behavior: 'smooth' });
        props.callback()
    }
}

</script>

<template>
    <button class="hover:bg-gray-800" @click="scrollToElement()">
        {{ props.text }}
    </button>
    <slot></slot>
</template>
