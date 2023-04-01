<script setup lang="ts">

</script>

<template>
    <div class="shadow-lg m-3 p-3 grid grid-cols-1 gap-2 border border-green-500 text-green-500 rounded-md">

        <div class="font-bold">
            <slot name="header"></slot>
        </div>
        <slot></slot>
        <div v-if="!!$slots.actions" class="mt-5 flex justify-end pb-2">
            <slot name="actions"></slot>
        </div>

    </div>
</template>
