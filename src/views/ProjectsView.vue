<script setup lang="ts">
import ProjectCard from '@/components/ProjectCard.vue';


</script>

<template>
    <div class="grid grid-cols-3 gap-4">

        <ProjectCard link="/projects/recipes" icon="project">
            <template #header>DSP Calculator</template>
            <p>A Dyson Sphere Program miniproject. This is a tool that helps identify the necessary resources
                and building required in order to product some item.</p>
        </ProjectCard>
        <ProjectCard link="https://www.wahtako.com" externalLink icon="project">
            <template #header>WAH Tako</template>
            <p>A miniproject to display images from twitter with the #inArt or #いなート tag.
                The images are usually fan art of a popular Hololive VTuber Ninomae Ina'nis. </p>
        </ProjectCard>
    </div>
</template>
