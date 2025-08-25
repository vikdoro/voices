<template>
    <section id="people-section">
        <header>
            <h1 class="intro">People</h1>
            <h1 class="subheader">
                Voices is a trully interdisciplinary project; historians, computer scientists, 
                engineers and psychologists work together to address a troubling past
            </h1>
        </header>
        <ContentCategory
            v-for="category in categories"
            :key="category.slug"
            :slug="category.slug"
            :title="category.title"
        >
            <ContentCard
                v-for="person in category.people"
                :key="person.name"
                :label="person.role"
                :title="person.name"
                imageFolder="people"
                :image="person.image"
                :link="person.link"
                :description="person.description"
            />
        </ContentCategory>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ContentCategory from '../components/ContentCategory.vue';
import ContentCard from '../components/ContentCard.vue';
import categoriesData from '../data/people/people.json';
import type { PeopleCategory } from '../types';
import { useHashScroll } from '../composables/useHashScroll';

const categories = ref<PeopleCategory[]>(categoriesData);

// Use the hash scroll composable
useHashScroll();

// This will run every time the People component is mounted
onMounted(() => {
  console.log('People component mounted');
});
</script>
