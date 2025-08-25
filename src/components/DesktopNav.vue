<template>
    <div class="desktop-nav-menu">
        <div class="links">
            <div class="link-container">
                <RouterLink to="/">Home</RouterLink>
            </div>
            <div class="link-container extendible">
                <RouterLink to="/people">
                    <span>People</span>
                </RouterLink>
                <div class="sub-menu-container">
                    <div class="sub-menu">
                        <RouterLink to="/people#team-members">Team members</RouterLink>
                        <RouterLink to="/people#scientific-advisory-board">Scientific Advisory Board</RouterLink>
                    </div>
                </div>
            </div>
            <div class="link-container extendible">
                <RouterLink to="/output">
                    <span>Output</span>
                </RouterLink>
                <div class="sub-menu-container">
                    <div class="sub-menu">
                        <RouterLink to="/output#publications">Publications</RouterLink>
                        <RouterLink to="/output#talks-workshops">Talks & Presentations & Workshops</RouterLink>
                        <RouterLink to="/output#podcasts-webinars">Podcasts & Webinars</RouterLink>
                        <RouterLink to="/output#digital-memorial">Digital Memorial</RouterLink>
                    </div>
                </div>
            </div>
            <div class="link-container">
                <RouterLink to="/about">Contact</RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped lang="scss">
@use '../styles/breakpoints' as *;

@media (max-width: $mobile) {
    .desktop-nav-menu {
        display: none;
    }
}
</style>
