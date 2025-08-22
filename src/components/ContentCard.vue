<template>
<a :href="link" class="content-card" :class="{ 'no-link': !link }" target="_blank">
    <div v-if="imageFolder && image" class="content-card-image-container">
        <img :src="`/data/${imageFolder}/images/${image}`" alt="link illustration" class="content-card-image">
    </div>
    <div v-if="label" class="content-card-label">{{ label }}</div>
    <h3>{{ title }}</h3>
    <h4 v-if="description">{{ description }}</h4>
    <div v-if="authors" class="content-card-authors">{{ authors }}</div>
    <div v-if="organisations" class="content-card-organisations">{{ organisations }}</div>
    <div class="content-card-frame">
        <img src="/icons/content-card-corner.svg" alt="content-card-corner" class="content-card-corner-top">
        <div class="fill-container"></div>
        <div class="flex-justify-between">
            <img src="/icons/content-card-corner.svg" alt="content-card-corner" class="content-card-corner-bottom">
            <img src="/icons/content-card-arrow.svg" alt="content-card-corner" class="content-card-arrow">
        </div>
    </div>
</a>
</template>

<script setup lang="ts">
import type { OutputCardContent } from '../types';

defineProps<OutputCardContent>();
</script>

<style scoped>

</style>