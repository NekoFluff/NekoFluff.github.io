<script setup lang="ts">

</script>

<template>
    <div class="rounded-md text-black bg-green-500 shadow-lg m-3 p-3 flex flex-col">

        <div class="flex flex-col">
            <div class="font-bold">
                <slot name="header">HEADER</slot>
            </div>
            <slot name="message">MESSAGE</slot>
            <div class="mt-5 flex justify-end">

                <slot name="actions">ACTIONS</slot>
            </div>
        </div>

</div>
</template>
