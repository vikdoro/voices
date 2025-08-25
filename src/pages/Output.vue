<template>
<div class="output-container">
    <section class="output-section">
        <header>
            <h1 class="intro">Output</h1>
            <h1 class="subheader">
                Our core objective is to produce high quality scientific output 
                that contributes to the history of the Holocaust and to the multimodal
                study of the human past.
            </h1>
        </header>
        <ContentCategory
            v-for="category in categories"
            :key="category.slug"
            :slug="category.slug"
            :title="category.title"
        >
        <ContentCard
                v-for="item in category.items"
                :key="item.title"
                :label="item.type"
                :title="item.title"
                imageFolder="output"
                :image="item.image"
                :link="item.link"
                :authors="item.authors"
                :organisations="item.organisations"
            />
        </ContentCategory>
    </section>
</div>
</template>
 
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ContentCategory from '../components/ContentCategory.vue';
import ContentCard from '../components/ContentCard.vue';
import categoriesData from '../data/output/output.json';
import type { OutputCategory } from '../types';
import { scrollToSection } from '../utils/scroll';
import { useHashScroll } from '../composables/useHashScroll';

const categories = ref<OutputCategory[]>(categoriesData);

// Use the hash scroll composable
useHashScroll();

// This will run every time the Output component is mounted
onMounted(() => {
  console.log('Output component mounted');
});
</script>

<style scoped>
</style>