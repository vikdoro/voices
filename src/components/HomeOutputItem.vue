<template>
    <a :href="`/output#${slug}`" class="home-output-item alternating-flex-layout">
        <div class="relative flex-fill-half">
            <img :src="`../data/output/images/${coverImage}`" class="home-output-image" :alt="title">
            <div class="home-output-image-gradient-overlay"></div>
            <h3 class="image-overlay-title">{{ title }}</h3>
        </div>
        <div class="home-output-item-description-container">
            <p class="home-output-item-description-text">{{ description }}</p>
            <img src="/icons/long_arrow.svg" alt="arrow button" class="long-arrow">
        </div>
    </a>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string;
    description: string;
    coverImage: string;
    slug: string;
}>();
</script>