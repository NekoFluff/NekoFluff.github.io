<script setup lang="ts">
import PageViewTracker from '@/components/PageViewTracker.vue';
import ProjectCard from '@/components/ProjectCard.vue';

</script>

<template>
    <div class="grid gap-4 md:grid-cols-3 xs:grid-cols-1">

        <ProjectCard link="/projects/recipes" icon="project">
            <template #header>DSP Calculator</template>
            <p>A Dyson Sphere Program miniproject. A tool that helps identify the necessary resources
                and building required in order to product some item.</p>
        </ProjectCard>
        <ProjectCard link="https://www.wahtako.com" externalLink icon="project">
            <template #header>WAH Tako</template>
            <p>A miniproject to display images from twitter with the #inArt or #いなート tag.
                The images are usually fan art of a popular Hololive VTuber Ninomae Ina'nis. </p>
        </ProjectCard>
        <ProjectCard link="/projects/expense-calculator" icon="project">
            <template #header>Expense Calculator</template>
            <p>Track and view your expenses.</p>
        </ProjectCard>
    </div>
    <PageViewTracker />
</template>
