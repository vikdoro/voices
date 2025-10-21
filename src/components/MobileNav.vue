<template>
    <div class="mobile-nav">
        <img
            src="/icons/mobile-menu.svg"
            alt="Menu"
            class="hamburger-btn"
            @click="toggleMenu"
        >

        <!-- Mobile menu overlay -->
        <div 
            class="mobile-menu-overlay" 
            :class="{ 'active': isMenuOpen }"
            @click="closeMenu"
        ></div>

        <!-- Mobile menu -->
        <div class="mobile-menu" :class="{ 'active': isMenuOpen }">
            <div class="mobile-menu-header">
            <RouterLink to="/" class="logo-link" @click="handleLogoClick">
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
                <RouterLink to="/" class="mobile-nav-link" @click="handleHomeClick">Home</RouterLink>
                
                <div class="mobile-nav-section">
                    <template v-if="peopleCategories.length <= 1">
                        <RouterLink 
                            :to="peopleCategories.length === 1 ? `/people#${peopleCategories[0].slug}` : '/people'"
                            class="mobile-nav-link"
                            @click="closeMenu"
                        >
                            People
                        </RouterLink>
                    </template>
                    <template v-else>
                        <h4 @click="toggleSection('people')" :class="{ 'expanded': expandedSections.people }">
                            People
                        </h4>
                        <div class="sub-link-container" :class="{ 'expanded': expandedSections.people }">
                            <RouterLink 
                                v-for="(category, index) in peopleCategories" 
                                :key="`${category.title}-${index}`"
                                :to="`/people#${category.slug}`" 
                                class="mobile-nav-link sub-link" 
                                @click="closeMenu"
                            >
                                <span>{{ category.title }}</span>
                            </RouterLink>
                        </div>
                    </template>
                </div>
                
                <div class="mobile-nav-section">
                    <template v-if="outputCategories.length <= 1">
                        <RouterLink 
                            :to="outputCategories.length === 1 ? `/output#${outputCategories[0].slug}` : '/output'"
                            class="mobile-nav-link"
                            @click="closeMenu"
                        >
                            Output
                        </RouterLink>
                    </template>
                    <template v-else>
                        <h4 @click="toggleSection('output')" :class="{ 'expanded': expandedSections.output }">
                            Output
                        </h4>
                        <div class="sub-link-container" :class="{ 'expanded': expandedSections.output }">
                            <RouterLink 
                                v-for="(category, index) in outputCategories" 
                                :key="`${category.title}-${index}`"
                                :to="`/output#${category.slug}`" 
                                class="mobile-nav-link sub-link" 
                                @click="closeMenu"
                            >
                                {{ category.title }}
                            </RouterLink>
                        </div>
                    </template>
                </div>
                
                <button @click="scrollToContact" class="mobile-nav-link">Contact</button>
            </nav>
            <div class="mobile-menu-footer">
                <img src="/institutions/C2DH.svg" alt="Luxembourg Centre for Contemporary and Digital History" class="institution-logo">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { scrollToSection, scrollToTop } from '../utils/scroll';
import { useNavigationData } from '../composables/useNavigationData';

const route = useRoute();
const isMenuOpen = ref(false);
const expandedSections = ref({
    people: false,
    output: false
});

const { peopleCategories, outputCategories, clearHomeScrollPosition } = useNavigationData();

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

const toggleSection = (section: keyof typeof expandedSections.value) => {
    expandedSections.value[section] = !expandedSections.value[section];
};

const scrollToContact = () => {
    scrollToSection('contact');
    closeMenu();
};

const handleLogoClick = () => {
    clearHomeScrollPosition();
    closeMenu();
};

const handleHomeClick = () => {
    // If we're already on the home page, scroll to top instead of navigating
    if (route.path === '/') {
        scrollToTop();
    }
    closeMenu();
};
</script>

<style scoped lang="scss">
@use '../styles/vars' as vars;
@use '../styles/breakpoints' as *;

.mobile-nav {
    display: none;
}

.hamburger-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    z-index: 1001;
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url('../assets/background/mobile-menu-bg@1x.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: left;
    z-index: 1000;
    transition: left 0.3s ease;
    overflow-y: auto;
    opacity: 0;
}

.mobile-menu::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.27);
    z-index: -1;
}

.logo-link {
    opacity: 0;
    transition: opacity 0.3s ease;
}

.mobile-menu.active {
    left: 0;
    opacity: 1;
    display: flex;

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

.mobile-menu-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 4;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 28px;
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
        cursor: pointer;
        transition: all 0.3s ease;
    }

    h4::after {
        content: "+";
        margin-left: 4px;
        transition: all 0.3s ease;
    }

    h4.expanded::after {
        content: "−";
        transform: rotate(0deg);
    }

    a.sub-link {
        background: vars.$accent;
        color: black;
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 500;
        padding: 11px 16px;
    }
}

.mobile-nav-link {
    display: block;
    color: #fff;
    text-decoration: none;
    transition: background 0.2s;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;
    font-weight: 500;
    text-align: left;
    width: 100%;
    padding: 0;
}

.sub-link-container {
    display: none;
    flex-direction: column;
    gap: 16px;
    padding: 16px 0 8px;
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    transition: all 0.3s ease;
}

.sub-link-container.expanded {
    display: flex;
    opacity: 1;
    max-height: 800px;
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
