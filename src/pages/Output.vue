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
                :title="item.title"
                :label="item.deliveryMode"
                :link="item.link"
                imageFolder="output"
                :image="item.image"
                :dateTag="item.dateTag"
                :location="item.location"
                :authors="item.authors"
                :organisations="item.organisations"
            />
        </ContentCategory>
    </section>
</div>
</template>
 
<script setup lang="ts">
import { ref } from 'vue';
import ContentCategory from '../components/ContentCategory.vue';
import ContentCard from '../components/ContentCard.vue';
import categoriesData from '../assets/data/output/output.json';
import type { OutputCategory } from '../types';
import { useHashScroll } from '../composables/useHashScroll';

const categories = ref<OutputCategory[]>(categoriesData);

// Use the hash scroll composable
useHashScroll();
</script>

<style scoped lang="scss">
@use '../styles/vars';
@use '../styles/breakpoints' as *;

section.output-section {
    background: white;
    margin-left: 150px;
    width: calc(100% - 150px);
    color: black;
    padding: 24px 32px;
    margin-top: 150px;

    @media (max-width: $tablet) {
        width: calc(100% - 80px);
        margin-left: 80px;
        padding: 20px 24px;
    }

    @media (max-width: $mobile) {
        width: calc(100% - 16px);
        margin-left: 16px;
        padding: 16px 20px;
    }

    h1.subheader {
        margin-bottom: 96px;
    }

}    
</style>