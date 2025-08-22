<template>
    <div class="nav-container">
        <nav>
            <a href="/" class="logo-link">
                <img src="/logo.svg" alt="Voices from Auschwitz Logo" class="logo">
            </a>
            <DesktopNav />
            <MobileNav />
        </nav>
    </div>
         <div class="view-container">
         <div class="main-visual">
            <div class="glass-layer">
                <img src="/glasses/glass-1.png" alt="Broken glass" class="glass-1">
                <img src="/glasses/glass-2.png" alt="Broken glass" class="glass-2">
                <img src="/glasses/glass-3.png" alt="Broken glass" class="glass-3">
                <img src="/glasses/glass-4.png" alt="Broken glass" class="glass-4">
                <img src="/glasses/glass-5.png" alt="Broken glass" class="glass-5">
                <img src="/glasses/glass-6.png" alt="Broken glass" class="glass-6">
                <img src="/glasses/glass-7.png" alt="Broken glass" class="glass-7">
            </div>
         </div>

         <main id="view">
             <slot />
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
                <div class="contact-container">
                    <h3>Contact</h3>
                    <a href="mailto:univestity@uni.lu">email: univestity@uni.lu</a>
                </div>
                <hr />
            </div>
            <div class="footer-bottom">
                <div>Copyright Université du Luxembourg {{ new Date().getFullYear() }}. All rights reserved</div>
                <a href="#">Legal notice</a>
            </div>
        </footer>

</template>

<script setup lang="ts">
import DesktopNav from './components/DesktopNav.vue';
import MobileNav from './components/MobileNav.vue';


</script>
