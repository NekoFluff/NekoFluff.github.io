<script setup lang="ts">
import Card from './Card.vue';
import PageViewTracker from './PageViewTracker.vue';

</script>

<template>
    <div class="flex justify-center my-64 text-3xl text-green-500 font-extralight">
        <span class="font-bold">Hello</span>, my name is
        <div class="font-bold">&nbspAlex</div>.
    </div>
    <PageViewTracker />

    <Card>
        <template #header>
            <h1 class="text-2xl font-bold">
                Who am I?
            </h1>
        </template>
        <ul>
            <li>- A code junkie</li>
            <li>- Software engineer for RevolutionParts</li>
            <li>- ASU Graduate (4.0 / Moeur Award)</li>
            <li>- An advocator for domain based architectures and clean, well-tested, and maintainable code. It pays
                off in the long run.</li>
        </ul>
    </Card>
    <Card>
        <template #header>
            <h1 class="text-2xl font-bold">
                Programming Languages
            </h1>
        </template>
        <div class="text-lg font-bold">Recently used</div>
        <ul>
            <li>- golang</li>
            <li>- php</li>
            <li>- javascript/typescript</li>
        </ul>
        <div class="mt-4 text-lg font-bold">Rusty/Some experience</div>
        <ul>
            <li>- swift & objective-c</li>
            <li>- python</li>
            <li>- lua</li>
            <li>- c/c++</li>
            <li>- c#</li>
            <li>- java</li>
        </ul>
    </Card>
    <Card>
        <template #header>
            <h1 class="text-2xl font-bold">
                Other relevant technologies/tools
            </h1>
        </template>
        <div class="text-lg font-bold"></div>
        <ul>
            <li>- mysql/postgres</li>
            <li>- mongodb (certified)</li>
            <li>- helm</li>
            <li>- argo</li>
            <li>- tensorflow/pandas/keras</li>
        </ul>
    </Card>
    <Card>
        <template #header>
            <h1 class="text-2xl font-bold">
                Interests
            </h1>
        </template>
        <div class="text-lg font-bold"></div>
        <ul>
            <li>- machine learning (neural networks, specifically CNNs)</li>
            <li>- games (apex legends, dyson sphere program, factorio, monster hunter)</li>
            <li>- anime (sangatsu no lion, kimi no na wa, zelda BotW)</li>
        </ul>
    </Card>
    <Card>
        <template #header>
            <h1 class="text-2xl font-bold">
                Website Under Maintenance
            </h1>
        </template>

        <p>
            Currently rewriting my website using vite/vue. I'll be adding more details on what I've been up to as of
            late.
            The old react website written using create-react-app is no longer
            available.
        </p>
    </Card>
</template>
