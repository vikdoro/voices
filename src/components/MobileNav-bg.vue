<template>
    <div class="mobile-nav">
        <!-- Hamburger button -->
        <img
            src="/icons/mobile-menu.svg"
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
            <RouterLink to="/" class="logo-link">
                <img src="/logo.svg" alt="Voices from Auschwitz Logo" class="logo">
            </RouterLink>
                <button class="close-btn" @click="closeMenu" aria-label="Close menu">
                    <img
                        src="/icons/mobile-menu-close.svg"
                        class="hamburger-btn"
                    >
                </button>
            </div>
            
            <nav class="mobile-nav-links">
                <RouterLink to="/" class="mobile-nav-link" @click="closeMenu">Home</RouterLink>
                
                <div class="mobile-nav-section">
                    <h4>People</h4>
                    <!-- <a href="/people#team-members" class="mobile-nav-link sub-link" @click="closeMenu">Team members</a>
                    <a href="/people#scientific-advisory-board" class="mobile-nav-link sub-link" @click="closeMenu">Scientific Advisory Board</a> -->
                </div>
                
                <div class="mobile-nav-section">
                    <h4>Output</h4>
                    <!-- <a href="/output#publications" class="mobile-nav-link sub-link" @click="closeMenu">Publications</a>
                    <a href="/output#talks-workshops" class="mobile-nav-link sub-link" @click="closeMenu">Talks & Presentations & Workshops</a>
                    <a href="/output#podcasts-webinars" class="mobile-nav-link sub-link" @click="closeMenu">Podcasts & Webinars</a>
                    <a href="/output#digital-memorial" class="mobile-nav-link sub-link" @click="closeMenu">Digital Memorial</a> -->
                </div>
                
                <RouterLink to="/about" class="mobile-nav-link" @click="closeMenu">Contact</RouterLink>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
    // Prevent body scroll when menu is open
    if (isMenuOpen.value) {
        document.body.style.overflow = 'hidden';
        document.body.classList.add('mobile-menu-open');
    } else {
        document.body.style.overflow = '';
        document.body.classList.remove('mobile-menu-open');
    }
};

const closeMenu = () => {
    isMenuOpen.value = false;
    document.body.style.overflow = '';
    document.body.classList.remove('mobile-menu-open');
};
</script>

<style scoped lang="scss">
.mobile-nav {
    display: none;
}

.hamburger-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
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
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
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
    left: 100vw;
    width: 100vw;   
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.95);
    z-index: 1000;
    transition: left 0.3s ease;
    overflow-y: auto;
}

.logo-link {
    opacity: 0;
    transition: opacity 0.3s ease;
}

.mobile-menu.active {
    left: 0;

    .logo-link {
        opacity: 1;
    }
}

.mobile-menu-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 16px 16px 0;
}

.mobile-menu-header h3 {
    color: #fff;
    margin: 0;
}

.close-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
}

nav.mobile-nav-links {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    font-weight: 500;
    gap: 16px;
    padding-left: 32px;

    a {
        font-size: 24px;
    }

    h4 {
        font-size: 24px;
        font-weight: 500;
    }
}

.mobile-nav-link {
    display: block;
    color: #fff;
    text-decoration: none;
    transition: background 0.2s;
}


.mobile-nav-section h4 {
    color: #fff;
    margin: 0;
}

/* Show mobile nav on small screens */
@media (max-width: 768px) {
    .mobile-nav {
        display: block;
    }
}
</style>
