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

<style scoped lang="scss">
@use '../styles/vars';
@use '../styles/breakpoints' as *;


.alternating-flex-layout {
        display: flex;
        flex-direction: row;
    }
    
    .alternating-flex-layout:nth-child(even) {
        flex-direction: row-reverse;
    }
    
    @media (max-width: $tablet) {
        .alternating-flex-layout,
        .alternating-flex-layout:nth-child(even) {
            flex-direction: column;
        }
    }

.home-output-image-gradient-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, transparent 100%);
    pointer-events: none;
}

.home-output-item-description-container {
    flex: 1 1 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 40px;
    position: relative;

    @media (max-width: $tablet) {
        flex: 1 1 50%;
        max-width: 100%;
    }
}

.home-output-item {
    text-decoration: none;
    color: inherit;
    margin-top: 0;
    position: relative;
    transition: all 0.3s ease;
    overflow: hidden;

    h3.image-overlay-title {
        position: absolute;
        top: 0;
        left: 0;
        color: white;
        opacity: 0.4;
        margin: 0 2px;
        font-size: 40px;
        font-weight: 450;
        text-transform: uppercase;
        z-index: 1;
    }

}

.home-output-item::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: #D9D9D9;
    transition: transform 0.2s linear;
    transform: translateY(2px);
}

.home-output-item:hover::after {
    transform: translateY(0);
}



.home-output-item .long-arrow {
    width: 24px;
    height: 24px;
    position: absolute;
    right: 18px;
    bottom: 12px;
}

.home-output-image {
    display: block;
    width: 100%;
}

.home-output-item-description-text {
    font-size: 16px;
    font-weight: 500;
    margin: 0;
}

@media (max-width: $tablet) {
    .home-output-item-description-text {
        font-size: 16px;
    }
}

@media (max-width: $mobile) {
    .home-output-item-description-text {
        font-size: 14px;
    }
}

</style>