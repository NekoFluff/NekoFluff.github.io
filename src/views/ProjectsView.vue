<script setup lang="ts">
import ProjectCard from '@/components/ProjectCard.vue';


</script>

<template>
    <div class="grid grid-cols-4 gap-4">

        <ProjectCard link="/projects/recipes" icon="project">
            <template #header>DSP Calculator</template>
            <p>A Dyson Sphere Program miniproject. This is a tool that helps identify the necessary resources
                and
                building required in order to product some item.</p>
        </ProjectCard>
    </div>
</template>
