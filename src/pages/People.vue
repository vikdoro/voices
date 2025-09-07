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
import { ref } from 'vue';
import ContentCategory from '../components/ContentCategory.vue';
import ContentCard from '../components/ContentCard.vue';
import categoriesData from '../assets/data/people/people.json';
import type { PeopleCategory } from '../types';
import { useHashScroll } from '../composables/useHashScroll';

const categories = ref<PeopleCategory[]>(categoriesData);

// Use the hash scroll composable
useHashScroll();

</script>
<style scoped lang="scss">
@use '../styles/vars';
@use '../styles/breakpoints' as *;

section#people-section {
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