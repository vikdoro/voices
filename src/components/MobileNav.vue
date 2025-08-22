<template>
    <div class="mobile-nav">
        <!-- Hamburger button -->
        <img
            src="/icons/mobile-menu.svg"
            alt="hamburger"
            class="hamburger-btn"
            @click="toggleMenu"
        >
        <!-- <button 
            class="hamburger-btn" 
            @click="toggleMenu"
            :class="{ 'active': isMenuOpen }"
            aria-label="Toggle navigation menu"
        >
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
        </button> -->

        <!-- Mobile menu overlay -->
        <div 
            class="mobile-menu-overlay" 
            :class="{ 'active': isMenuOpen }"
            @click="closeMenu"
        ></div>

        <!-- Mobile menu -->
        <div class="mobile-menu" :class="{ 'active': isMenuOpen }">
            <div class="mobile-menu-header">
                <h3>Menu</h3>
                <button class="close-btn" @click="closeMenu" aria-label="Close menu">
                    <span>&times;</span>
                </button>
            </div>
            
            <nav class="mobile-nav-links">
                <a href="/" class="mobile-nav-link" @click="closeMenu">Home</a>
                
                <div class="mobile-nav-section">
                    <h4>People</h4>
                    <a href="/people#team-members" class="mobile-nav-link sub-link" @click="closeMenu">Team members</a>
                    <a href="/people#scientific-advisory-board" class="mobile-nav-link sub-link" @click="closeMenu">Scientific Advisory Board</a>
                </div>
                
                <div class="mobile-nav-section">
                    <h4>Output</h4>
                    <a href="/output#publications" class="mobile-nav-link sub-link" @click="closeMenu">Publications</a>
                    <a href="/output#talks-workshops" class="mobile-nav-link sub-link" @click="closeMenu">Talks & Presentations & Workshops</a>
                    <a href="/output#podcasts-webinars" class="mobile-nav-link sub-link" @click="closeMenu">Podcasts & Webinars</a>
                    <a href="/output#digital-memorial" class="mobile-nav-link sub-link" @click="closeMenu">Digital Memorial</a>
                </div>
                
                <a href="/about" class="mobile-nav-link" @click="closeMenu">Contact</a>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
    // Prevent body scroll when menu is open
    if (isMenuOpen.value) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
};

const closeMenu = () => {
    isMenuOpen.value = false;
    document.body.style.overflow = '';
};
</script>

<style scoped>
.mobile-nav {
    display: none;
}

.hamburger-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 4px;
    z-index: 1001;
}

.hamburger-line {
    width: 24px;
    height: 2px;
    background: #fff;
    transition: all 0.3s ease;
    transform-origin: center;
}

.hamburger-btn.active .hamburger-line:nth-child(1) {
    transform: rotate(45deg) translate(6px, 6px);
}

.hamburger-btn.active .hamburger-line:nth-child(2) {
    opacity: 0;
}

.hamburger-btn.active .hamburger-line:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -6px);
}

.mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 999;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.mobile-menu-overlay.active {
    opacity: 1;
    visibility: visible;
}

.mobile-menu {
    position: fixed;
    top: 0;
    right: -300px;
    width: 300px;
    height: 100vh;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
    z-index: 1000;
    transition: right 0.3s ease;
    overflow-y: auto;
}

.mobile-menu.active {
    right: 0;
}

.mobile-menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-menu-header h3 {
    color: #fff;
    margin: 0;
    font-size: 1.2rem;
}

.close-btn {
    background: none;
    border: none;
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.mobile-nav-links {
    padding: 1rem 0;
}

.mobile-nav-link {
    display: block;
    color: #fff;
    text-decoration: none;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: background 0.2s;
}

.mobile-nav-link:hover {
    background: rgba(255, 255, 255, 0.1);
}

.mobile-nav-section {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.mobile-nav-section h4 {
    color: #fff;
    margin: 0;
    padding: 1rem 1.5rem 0.5rem;
    font-size: 1rem;
    opacity: 0.8;
}

.sub-link {
    padding-left: 2.5rem;
    font-size: 0.9rem;
    opacity: 0.9;
}

/* Show mobile nav on small screens */
@media (max-width: 768px) {
    .mobile-nav {
        display: block;
    }
}
</style>
