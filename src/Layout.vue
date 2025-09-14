<template>
    <div class="nav-container">
        <nav>
            <RouterLink to="/" class="logo-link">
                <img src="/logo.svg" alt="Voices from Auschwitz Logo" class="logo">
            </RouterLink>
            <DesktopNav />
            <MobileNav />
        </nav>
    </div>
    <div class="view-container">
        <div class="glass-container">
            <ResponsivePicture basePath="glasses/glass-1" alt="Broken glass" class="glass-1" :dimensions="multiplyDimensions([608, 346])" sizes="608px, (min-width: 768px) 306px"/>
            <ResponsivePicture basePath="glasses/glass-2" alt="Broken glass" class="glass-2" :dimensions="multiplyDimensions([365, 152])" sizes="365px, (min-width: 768px) 152px" fetchpriority="high"/>
            <ResponsivePicture basePath="glasses/glass-3" alt="Broken glass" class="glass-3" :dimensions="multiplyDimensions([283, 169])" sizes="283px, (min-width: 768px) 169px" fetchpriority="high"/>
            <ResponsivePicture basePath="glasses/glass-4" alt="Broken glass" class="glass-4" :dimensions="multiplyDimensions([138, 100])" sizes="138px, (min-width: 768px) 100px"/>
            <ResponsivePicture basePath="glasses/glass-5" alt="Broken glass" class="glass-5" :dimensions="multiplyDimensions([449, 202])" sizes="449px, (min-width: 768px) 202px" fetchpriority="low"/>
            <ResponsivePicture basePath="glasses/glass-6" alt="Broken glass" class="glass-6" :dimensions="multiplyDimensions([259, 124])" sizes="259px, (min-width: 1028px) 124px" fetchpriority="low"/>
            <ResponsivePicture basePath="glasses/glass-7" alt="Broken glass" class="glass-7" :dimensions="multiplyDimensions([298, 178])" sizes="298px, (min-width: 768px) 178px" fetchpriority="low"/>
        </div>
        <div class="main-visual"></div>

        <main id="view">
            <RouterView />
        </main>
    </div>
    <div class="footer-visual"></div>
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
                <div id="contact-container">
                    <h2>Contact</h2>
                    <a href="mailto:univestity@uni.lu">email: univestity@uni.lu</a>
                </div>
                <hr />
            </div>
            <div class="footer-bottom">
                <div>Copyright Université du Luxembourg {{ new Date().getFullYear() }}. All rights reserved</div>
                <!-- <a href="#">Legal notice</a> -->
            </div>
        </footer>

</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import DesktopNav from './components/DesktopNav.vue';
import MobileNav from './components/MobileNav.vue';
import ResponsivePicture from './components/ResponsivePicture.vue';
import { multiplyDimensions } from './utils/utils';

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

    #contact-container {
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
