<template>
    <div :id="slug" class="content-category">
        <h2>{{ title }}</h2>
        <div class="scroll-wrapper">
            <div class="content-container" ref="contentContainer">
                <slot />
            </div>
            <div class="custom-scrollbar">
                <div class="scrollbar-track">
                    <div class="scrollbar-thumb" ref="scrollThumb"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

defineProps<{
    slug: string;
    title: string;
}>();

const contentContainer = ref<HTMLElement>();
const scrollThumb = ref<HTMLElement>();

let isDragging = false;
let startX = 0;
let scrollLeft = 0;

const updateScrollbar = () => {
    if (!contentContainer.value || !scrollThumb.value) return;
    
    const container = contentContainer.value;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const scrollLeft = container.scrollLeft;
    
    if (scrollWidth <= clientWidth) {
        scrollThumb.value.style.display = 'none';
        return;
    }
    
    scrollThumb.value.style.display = 'block';
    
    const thumbWidth = (clientWidth / scrollWidth) * clientWidth;
    const thumbLeft = (scrollLeft / (scrollWidth - clientWidth)) * (clientWidth - thumbWidth);
    
    scrollThumb.value.style.width = `${thumbWidth}px`;
    scrollThumb.value.style.left = `${thumbLeft}px`;
};

const handleScroll = () => {
    updateScrollbar();
};

const handleMouseDown = (e: MouseEvent) => {
    if (!scrollThumb.value) return;
    
    isDragging = true;
    startX = e.pageX - scrollThumb.value.offsetLeft;
    scrollLeft = contentContainer.value?.scrollLeft || 0;
    
    e.preventDefault();
};

const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !contentContainer.value || !scrollThumb.value) return;
    
    e.preventDefault();
    const x = e.pageX - startX;
    const container = contentContainer.value;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const thumbWidth = scrollThumb.value.offsetWidth;
    
    const scrollLeft = (x / (clientWidth - thumbWidth)) * (scrollWidth - clientWidth);
    container.scrollLeft = scrollLeft;
};

const handleMouseUp = () => {
    isDragging = false;
};

onMounted(() => {
    if (!contentContainer.value || !scrollThumb.value) return;
    
    contentContainer.value.addEventListener('scroll', handleScroll);
    scrollThumb.value.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Initial update
    setTimeout(updateScrollbar, 100);
});

onUnmounted(() => {
    if (contentContainer.value) {
        contentContainer.value.removeEventListener('scroll', handleScroll);
    }
    if (scrollThumb.value) {
        scrollThumb.value.removeEventListener('mousedown', handleMouseDown);
    }
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
});
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

.scroll-wrapper {
    position: relative;
    overflow: hidden;
    
    /* Hide native scrollbar */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
    }
}

.content-container {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    min-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
    }
}

.custom-scrollbar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 12px;
    background: #f1f1f1;
    border-radius: 6px;
    border: 1px solid #ddd;
}

.scrollbar-track {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 6px;
}

.scrollbar-thumb {
    position: absolute;
    top: 1px;
    left: 0;
    height: 8px;
    background: #666;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    
    &:hover {
        background: #555;
    }
    
    &:active {
        background: #444;
    }
}

@media (max-width: $mobile) {
    .content-container {
        flex-wrap: nowrap;

        > * {
            flex: 1 0 100%;
        }
    }
}
</style>