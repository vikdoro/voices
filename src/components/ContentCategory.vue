<template>
    <div :id="slug" class="content-category">
        <h2>{{ title }}</h2>
        <div class="scroll-wrapper">
            <div class="content-container">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    slug: string;
    title: string;
}>();
</script>

<style scoped lang="scss">
@use '../styles/vars';
@use '../styles/breakpoints' as *;

.content-category {
    h2 {
        margin: 0 0 24px;
    }
    @media (max-width: $mobile) {
        h2 {
            font-size: 18px;
        }
    }
    padding-top: 56px;
    border-bottom: 3px solid black;
}

.scroll-wrapper {
    position: relative;
    overflow: hidden;
}

.content-container {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    min-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
}
</style>