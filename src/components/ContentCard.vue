<template>
<a :href="link" class="content-card" :class="{ 'no-link': !link }" target="_blank">
    <div v-if="imageFolder && image" class="content-card-image-container">
        <ResponsivePicture 
            :base-path="`data/${imageFolder}/images/${image.replace(/\.[^/.]+$/, '')}`"
            alt="link illustration"
            class="content-card-image"
            :dimensions="[1221, 814, 407, 738, 512, 246]"
            sizes="407px"
        />
        <div v-if="dateTag" class="image-overlay-tag" :class="{ 'highlighted-date-tag': dateTag === 'In progress' }">{{ dateTag }}</div>
    </div>
    <div class="labels-above-title">
        <div v-if="label" class="content-card-label">{{ label }}</div>
        <div v-if="location" class="content-card-location">{{ location }}</div>
    </div>
    <h3>{{ title }}</h3>
    <h4 v-if="description">{{ description }}</h4>
    <div v-if="authors" class="content-card-authors">{{ authors }}</div>
    <hr v-if="authors && organisations" />
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
import ResponsivePicture from './ResponsivePicture.vue';

const props = defineProps<OutputCardContent>();
</script>

<style scoped lang="scss">
@use '../styles/vars';
@use '../styles/breakpoints' as *;

.content-card {
    position: relative;
    z-index: 2;
    margin-bottom: 48px;
    max-width: 400px;
    width: 100%;
    color: #000;
    background-color: transparent;
    padding: 32px 0 32px 32px;

    @media (max-width: $tablet) {
        .content-card {
            max-width: 277px;
            margin-bottom: 32px;
        }
    }

    @media (max-width: $mobile) {
        .content-card {
            margin-bottom: 24px;
        }
    }

    .content-card-frame {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: transform 0.12s;
        z-index: -1;
        
        .content-card-corner-top {
            transform: rotate(180deg) scale(0.7);
            opacity: 0.5;
            transition: transform 0.15s, opacity 0.15s;
        }

        .content-card-corner-bottom {
            transform: rotate(90deg) scale(0.7);
            opacity: 0.5;
            transition: transform 0.15s, opacity 0.15s;
        }

        .fill-container {
            flex: 1 0 100%;
            height: calc(100% - 48px);
        }

        .content-card-arrow {
            transform: translateY(-3px);
            opacity: 0.5;
            transition: transform 0.15s, opacity 0.15s;
        }
    }

    .labels-above-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 4px;

        .content-card-label {
            display: inline-block;
            padding: 4px 8px;
            border: 1px solid #000;
            margin-top: 8px;
            font-size: 14px;
            font-weight: 500;
            white-space: nowrap;
        }

        .content-card-location {
            font-size: 14px;
            font-weight: 500;
        }

    }

    .content-card-organisations {
        font-size: 14px;
    }

    &.no-link {
        .content-card-arrow {
            display: none;
        }
    }


    &:not(.no-link):hover {
        .content-card-frame {
            transform: scale(0.96);
        }

        .content-card-corner-top {
            transform: rotate(180deg) scale(1);
            opacity: 1;
        }

        .content-card-corner-bottom {
            transform: rotate(90deg) scale(1);
            opacity: 1;
        }

        .content-card-arrow {
            transform: rotate(-45deg);
            opacity: 1;
        }
    }

    .content-card-image-container {
        width: 100%;
        overflow: hidden;
        position: relative;

        .image-overlay-tag {
            position: absolute;
            top: 12px;
            right: 12px;
            background-color: #000;
            color: #fff;
            padding: 8px 16px;
            font-size: 14px;
            font-weight: 500;
            
            // Style for "In progress" tag
            &.highlighted-date-tag {
                background-color: vars.$in_progress;
                color: #fff;
            }
        }
        .content-card-image {
            width: 100%;
            height: 100%;
            max-width: 400px;
            object-fit: cover;
            object-position: center;
        }
    }

    h3 {
        margin: 16px 0;
    }

    h4 {
        margin-bottom: 0;
    }

    hr {
        margin: 8px 0;
        border-top: 1px solid #000;
    }
}

</style>