<script setup lang="ts">

</script>

<template>
    <div class="shadow-lg m-3 p-3 flex flex-col border border-green-500 text-green-500 rounded-md">

        <div class="flex flex-col">
            <div class="font-bold">
                <slot name="header"></slot>
            </div>
            <slot></slot>
            <div v-if="!!$slots.actions" class="mt-5 flex justify-end">
                <slot name="actions"></slot>
            </div>
        </div>

    </div>
</template>
