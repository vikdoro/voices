<template>
    <div class="nav-container">
        <nav>
            <RouterLink to="/" class="logo-link" @click="handleLogoClick">
                <img src="/logo.svg" alt="Voices from Auschwitz Logo" class="logo">
            </RouterLink>
            <DesktopNav @click="clearHomeScrollPosition" />
            <MobileNav @click="clearHomeScrollPosition" />
        </nav>
    </div>
    <div class="view-container">
        <div class="glass-container">
            <ResponsivePicture basePath="glasses/glass-1" alt="Broken glass" id="glass-1" :dimensions="multiplyDimensions([608, 346])" sizes="608px, (min-width: 768px) 306px" fetchpriority="high"/>
            <ResponsivePicture basePath="glasses/glass-2" alt="Broken glass" id="glass-2" :dimensions="multiplyDimensions([365, 152])" sizes="365px, (min-width: 768px) 152px" fetchpriority="high"/>
            <ResponsivePicture basePath="glasses/glass-3" alt="Broken glass" id="glass-3" :dimensions="multiplyDimensions([283, 169])" sizes="283px, (min-width: 768px) 169px" fetchpriority="high"/>
            <ResponsivePicture basePath="glasses/glass-4" alt="Broken glass" id="glass-4" :dimensions="multiplyDimensions([138, 100])" sizes="138px, (min-width: 768px) 100px" fetchpriority="high"/>
            <ResponsivePicture basePath="glasses/glass-5" alt="Broken glass" id="glass-5" :dimensions="multiplyDimensions([449, 202])" sizes="449px, (min-width: 768px) 202px" fetchpriority="low"/>
            <ResponsivePicture basePath="glasses/glass-6" alt="Broken glass" id="glass-6" :dimensions="multiplyDimensions([259, 124])" sizes="259px, (min-width: 1028px) 124px" fetchpriority="low"/>
            <ResponsivePicture basePath="glasses/glass-7" alt="Broken glass" id="glass-7" :dimensions="multiplyDimensions([298, 178])" sizes="298px, (min-width: 768px) 178px" fetchpriority="low"/>
        </div>
        <div class="main-visual"></div>

        <main id="view">
            <RouterView />
        </main>
    </div>
    <footer>
        <div class="footer-section">
            <h2>Participating institutions</h2>
            <div class="logo-container-left-aligned">
                <img src="/institutions/C2DH.svg" alt="Luxembourg Centre for Contemporary and Digital History" class="institution-logo">
                <img src="/institutions/Freie_Berlin_logo.svg" alt="Freie Universität Berlin" class="institution-logo">
                <img src="/institutions/List-logo.svg" alt="Luxembourg Institute of Science and Technology" class="institution-logo">
                <img src="/institutions/USC.svg" alt="USC" class="institution-logo">
                <img src="/institutions/USC_Viterbi.svg" alt="USC Viterbi" class="institution-logo">
                <img src="/institutions/Selma_Stern.svg" alt="Selma Stern Zentrum" class="institution-logo">
                </div>
            </div>
            <div class="footer-section">
                <h2>Funded by</h2>
                <div class="logo-container-left-aligned">
                    <img src="/institutions/FNR.svg" alt="FNR" class="institution-logo">
                    <img src="/institutions/DFG.svg" alt="DFG" class="institution-logo">

            </div>
        </div>
        <div class="footer-section">
            <div id="contact">
                <h2>Contact</h2>
                <a href="mailto:univestity@uni.lu">email: univestity@uni.lu</a>
            </div>
            <hr />
        </div>
        <div class="footer-bottom">
            <div>Copyright Université du Luxembourg {{ new Date().getFullYear() }}. All rights reserved</div>
        </div>
    </footer>

</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import { onMounted, onBeforeUnmount, watch } from 'vue';
import DesktopNav from './components/DesktopNav.vue';
import MobileNav from './components/MobileNav.vue';
import ResponsivePicture from './components/ResponsivePicture.vue';
import { multiplyDimensions } from './utils/utils';
import { updateHashFromScroll } from './utils/scroll';
import { useNavigationData } from './composables/useNavigationData';

const route = useRoute();
const { clearHomeScrollPosition } = useNavigationData();

// Manage body classes based on current route
const updateBodyClass = () => {
  const body = document.body;
  
  // Remove existing page classes
  body.classList.remove('page-home', 'page-people', 'page-output');
  
  // Add current page class
  if (route.name === 'home') {
    body.classList.add('page-home');
  } else if (route.name === 'people') {
    body.classList.add('page-people');
  } else if (route.name === 'output') {
    body.classList.add('page-output');
  }
};

// Watch for route changes to update body class
watch(() => route.name, updateBodyClass, { immediate: true });

let isTicking = false;
let handleScrollRef: ((this: Window, ev: Event) => any) | null = null;
let handleResizeRef: ((this: Window, ev: Event) => any) | null = null;

type GlassConfig = {
    x: number; // target X offset in px (negative moves left)
    y?: number; // optional target Y offset in px
    range: number; // scroll range in px to reach target
};

const glassConfig: Record<string, GlassConfig> = {
    'glass-1': { x: -70, y: 90, range: 2000 },
    'glass-2': { x: -45, y: -65, range: 1500 },
    'glass-3': { x: -25, y: -50, range: 750 },
    'glass-4': { x: -225, y: 75, range: 4000 },
    'glass-5': { x: 0, y: 350, range: 4000 },
    'glass-6': { x: -15, y: 300, range: 6200 },
    'glass-7': { x: 15, y: 1200, range: 4000 },
};

const glassElementIds = Object.keys(glassConfig);

const handleLogoClick = (event: Event) => {
    // Clear the home scroll position
    clearHomeScrollPosition();
    
    // Check if we're already on the home page
    if (route.path === '/') {
        event.preventDefault();
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    // If not on home page, let the router handle navigation normally
};

const getGlassElements = (): HTMLElement[] => {
    return glassElementIds
        .map(id => document.getElementById(id) as HTMLElement | null)
        .filter((el): el is HTMLElement => !!el);
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const applyTransforms = (scrollY: number) => {
    const elements = getGlassElements();
    for (const el of elements) {
        const cfg = glassConfig[el.id];
        const progress = Math.min(1, Math.max(0, scrollY / cfg.range));
        const eased = easeOutCubic(progress);
        const tx = cfg.x * eased;
        const ty = (cfg.y ?? 0) * eased;
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    }
};

const updateOverflowBehavior = () => {
    const glassContainer = document.querySelector('.glass-container') as HTMLElement;
    const viewContainer = document.querySelector('.view-container') as HTMLElement;
    
    if (!glassContainer || !viewContainer) return;
    
    const viewportWidth = window.innerWidth;
    const viewContainerWidth = viewContainer.offsetWidth;
    const availableSpace = viewportWidth - viewContainerWidth;
    
    // If there's enough space (300px buffer as you suggested), allow overflow
    // Otherwise, clip to prevent horizontal scroll
    if (availableSpace > 0 ) {
        glassContainer.classList.add('no-overflow-clip');
    } else {
        glassContainer.classList.remove('no-overflow-clip');
    }
};

onMounted(() => {
    const elements = getGlassElements();
    for (const el of elements) {
        el.style.willChange = 'transform';
    }

    // Initial position based on current scroll
    applyTransforms(window.scrollY || window.pageYOffset || 0);

    // Initial overflow behavior check
    updateOverflowBehavior();

    handleScrollRef = () => {
        if (!isTicking) {
            isTicking = true;
            requestAnimationFrame(() => {
                const y = window.scrollY || window.pageYOffset || 0;
                applyTransforms(y);
                updateHashFromScroll();
                isTicking = false;
            });
        }
    };

    handleResizeRef = () => {
        updateOverflowBehavior();
    };

    window.addEventListener('scroll', handleScrollRef, { passive: true });
    window.addEventListener('resize', handleResizeRef, { passive: true });
});

onBeforeUnmount(() => {
    if (handleScrollRef) {
        window.removeEventListener('scroll', handleScrollRef as EventListener);
    }
    if (handleResizeRef) {
        window.removeEventListener('resize', handleResizeRef as EventListener);
    }
});

</script>

<style scoped lang="scss">
@use './styles/vars';
@use './styles/breakpoints' as *;

footer {
    width: calc(100% - 48px);
    max-width: 1200px;
    margin: 0 auto;
    background-image: url('/assets/background/footer-bg.png');
    background-position: bottom center;
    background-repeat: repeat-x;
    background-size: 1920px 720px;

    h2 {
        margin: 0 0 24px 0;

        @media (max-width: $mobile) {
            font-size: 18px;
        }
    }

    .footer-section {
        max-width: 1600px;
        margin: 0 auto;

        &:not(:first-child) {
            margin-top: 56px;
        }

        .logo-container-left-aligned {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 48px;

            > * {
                flex: 0 0 auto;
            }
        }
    }

    .footer-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 200px 0 24px;
        font-size: 12px;

        a {
            text-decoration: underline;
        }
    }

    #contact {
        display: flex;
        flex-direction: column;
        margin-top: 280px;

        @media (max-width: $tablet) {
            margin-top: 200px;
        }

        @media (max-width: $mobile) {
            margin-top: 150px;
        }

        a {
            color: white;
            text-decoration: none;
            transition: color 0.3s ease;
        }
    }
}


</style>
