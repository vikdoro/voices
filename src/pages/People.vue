<template>
    <section id="people-section" class="white-background">
        <header>
            <h1 class="intro">People</h1>
        </header>
        <ContentCategory
            v-for="(category, index) in categories"
            :key="`${category.title}-${index}`"
            :slug="category.slug"
            :title="category.title"
        >
            <template v-if="typeof category.people?.[0] === 'string'">
                <ul class="people-simple-list">
                    <li v-for="(person, index) in category.people as string[]" :key="`s-${index}`">{{ person }}</li>
                </ul>
            </template>
            <template v-else>
                <ContentCard
                    v-for="(person, index) in category.people"
                    :key="`${(person as PeopleItem).name}-${index}`"
                    fixed-image-height
                    :label="(person as PeopleItem).role"
                    :title="(person as PeopleItem).name"
                    imageFolder="people"
                    :image="(person as PeopleItem).image"
                    :link="(person as PeopleItem).link"
                    :description="(person as PeopleItem).description"
                />
            </template>
        </ContentCategory>
    </section>
</template>

<script setup lang="ts">
import ContentCategory from '../components/ContentCategory.vue';
import ContentCard from '../components/ContentCard.vue';
import categoriesData from '../assets/data/people/people.json';
import type { PeopleCategory, PeopleItem } from '../types';
import { useHashScroll } from '../composables/useHashScroll';
import { useDynamicData } from '../composables/useDynamicData';

const { data: categories } = useDynamicData<PeopleCategory[]>(categoriesData, 'people');

// Use the hash scroll composable
useHashScroll();

</script>
<style scoped lang="scss">
@use '../styles/vars';
@use '../styles/breakpoints' as *;

.people-simple-list {
    font-size: 17px;
    line-height: 22px;
    margin: 8px 0 0;
    padding-left: 0;
    li {
        margin-bottom: 6px;
        list-style-type: none;
        padding-left: 0;
    }
}

</style>