<template>
    <div class="nav-menu">
        <div class="links">
            <div class="link-container">
                <a href="/">Home</a>
            </div>
            <div class="link-container extendible">
                <a href="/people">
                    <span>People</span>
                </a>
                <div class="sub-menu-container">
                    <div class="sub-menu">
                        <RouterLink to="/people#team-members">Team members</RouterLink>
                        <RouterLink to="/people#scientific-advisory-board">Scientific Advisory Board</RouterLink>
                    </div>
                </div>
            </div>
            <div class="link-container extendible">
                <a href="/output">
                    <span>Output</span>
                </a>
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
                <a href="/about">Contact</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
</style>
