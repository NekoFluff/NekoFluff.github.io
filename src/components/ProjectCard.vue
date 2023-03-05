<script setup lang="ts">
import Card from "./Card.vue";

const props = defineProps<{
    icon: string,
    link: string,
}>();

</script>

<template>
    <Card>
        <template #header>
            <i>
                {{ icon }}
            </i>
            <slot name="header"></slot>
        </template>
        <template #message>
            <slot name="message"></slot>
        </template>
        <template #actions>
            <nav>
                <RouterLink class="p-2 text-white font-bold bg-green-900 rounded-sm" :to="link">Try it out!
                </RouterLink>
            </nav>
        </template>
</Card>
</template>
