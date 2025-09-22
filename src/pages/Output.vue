<template>
<div class="output-container">
    <section class="output-section white-background">
        <header>
            <h1 class="intro">Output</h1>
        </header>
        <ContentCategory
            v-for="category in categories"
            :key="category.slug"
            :slug="category.slug"
            :title="category.title"
        >
            <ContentCard
                v-for="item in getVisibleItems(category)"
                :key="item.title"
                :title="item.title"
                :label="item.deliveryMode"
                :link="item.link"
                imageFolder="output"
                :image="item.image"
                :missingImageText="item.missingImageText"
                :dateTag="item.dateTag"
                :location="item.location"
                :authors="item.authors"
                :organisations="item.organisations"
            />
            <div class="load-more-wrapper" v-if="canShowMore(category)">
                <CtaButton text="Show more" variant="black" @click="showMore(category)" />
            </div>
        </ContentCategory>
    </section>
</div>
</template>
 
<script setup lang="ts">
import { ref } from 'vue';
import ContentCategory from '../components/ContentCategory.vue';
import ContentCard from '../components/ContentCard.vue';
import CtaButton from '../components/CtaButton.vue';
import categoriesData from '../assets/data/output/output.json';
import type { OutputCategory } from '../types';
import { useHashScroll } from '../composables/useHashScroll';

const categories = ref<OutputCategory[]>(categoriesData);

// Track how many items are visible per category (by slug)
const visibleCounts = ref<Record<string, number>>({});

const getVisibleCount = (category: OutputCategory): number => {
    const current = visibleCounts.value[category.slug];
    return typeof current === 'number' ? current : 6;
};

const getVisibleItems = (category: OutputCategory) => {
    return category.items.slice(0, getVisibleCount(category));
};

const canShowMore = (category: OutputCategory): boolean => {
    return category.items.length > getVisibleCount(category);
};

const showMore = (category: OutputCategory): void => {
    const current = getVisibleCount(category);
    visibleCounts.value = { ...visibleCounts.value, [category.slug]: current + 6 };
};

// Use the hash scroll composable
useHashScroll();
</script>

<style scoped lang="scss">
@use '../styles/vars';
@use '../styles/breakpoints' as *;

.load-more-wrapper {
    display: flex;
    margin-top: 16px;
    width: 100%;
    transform: translateY(1px);
}

</style>