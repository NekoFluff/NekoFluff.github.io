<script setup lang="ts">


// emit
const emit = defineEmits<{
    (e: 'add-file', file: File): void
}>()

const onFileChange = (e: Event) => {
    // store multiple files
    const files = (e.target as HTMLInputElement).files

    if (files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            emit('add-file', file);

            // clear file input
            (e.target as HTMLInputElement).value = '';

        };
    }
}

</script>

<template>
    <form enctype="multipart/form-data">
        <input type="file" @change="onFileChange">
    </form>
</template>
