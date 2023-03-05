<script setup lang="ts">
import { debounce } from "lodash";
import { computed, ref } from "vue"
import SearchResultList from "./SearchResultList.vue";


const props = defineProps<{
    options: string[]
}>();
const emit = defineEmits(["onSearchResultClick"])

let text = ref<string>("")

const handleUpdate = debounce((updatedText: string) => {
    text.value = updatedText
}, 500)

const filteredOptions = computed(() => {
    if (text.value === "") { return [] }

    return props.options.filter((option) => { return option.toLowerCase().includes(text.value.toLocaleLowerCase()) })
})

const handleSearchResultClicked = (result: string) => {
    text.value = ""
    emit('onSearchResultClick', result)
}

</script>

<template>
    <div class="m-3">

        <input :value="text"
            class="rounded-md text-black placeholder-slate-700 bg-white shadow-lg shadow-green-900 outline-none p-2 w-full"
            type="text" placeholder="Search..." @input="handleUpdate(($event.target as HTMLInputElement).value)" />
        <SearchResultList class="mt-0 w-full" :results="filteredOptions" @onSearchResultClick="handleSearchResultClicked">
        </SearchResultList>
</div>
</template>
