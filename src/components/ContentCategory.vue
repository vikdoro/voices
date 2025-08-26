<template>
    <div :id="slug" class="content-category">
        <h2>{{ title }}</h2>
        <div class="content-container">
        <slot />
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
    @media (max-width: $mobile) {
        h2 {
            font-size: 18px;
        }
    }
}

.content-container {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
}
</style>