<script setup lang="ts">

</script>

<template>
    <div class="shadow-lg m-3 p-3 flex flex-col gap-2 border border-green-500 text-green-500 rounded-md">

        <div class="font-bold">
            <slot name="header"></slot>
        </div>
        <div class="flex-grow">
            <slot></slot>
        </div>
        <div v-if="!!$slots.actions" class="mt-5 flex justify-end pb-2">
            <slot name="actions"></slot>
        </div>

    </div>
</template>
