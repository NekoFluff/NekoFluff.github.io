<script setup lang="ts">
import { debounce } from "lodash";
import { computed, ref } from "vue"
import SearchResultList from "./SearchResultList.vue";


export type Option = {
    text: string;
    image: string;
};

const props = defineProps<{
    options: Option[]
}>();
const emit = defineEmits(["searchResultClick"])

let text = ref<string>("")

const handleUpdate = debounce((updatedText: string) => {
    text.value = updatedText
}, 500)

const filteredOptions = computed(() => {
    if (text.value === "") { return [] }

    return props.options.filter((option) => { return option.text.toLowerCase().includes(text.value.toLocaleLowerCase()) })
})

const handleSearchResultClicked = (result: string) => {
    text.value = ""
    emit('searchResultClick', result)
}

</script>

<template>
    <div class="mb-3">

        <input :value="text"
            class="rounded-md text-black placeholder-slate-700 bg-white shadow-lg shadow-green-900 outline-none p-2 w-full"
            type="text" placeholder="Search..." @input="handleUpdate(($event.target as HTMLInputElement).value)" />
        <SearchResultList class="mt-0 w-full" :results="filteredOptions" @searchResultClick="handleSearchResultClicked">
        </SearchResultList>
    </div>
</template>
