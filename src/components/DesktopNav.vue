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
                        <RouterLink 
                            v-for="category in peopleCategories" 
                            :key="category.slug"
                            :to="`/people#${category.slug}`"
                        >
                            {{ category.title }}
                        </RouterLink>
                    </div>
                </div>
            </div>
            <div class="link-container extendible">
                <RouterLink to="/output">
                    <span>Output</span>
                </RouterLink>
                <div class="sub-menu-container">
                    <div class="sub-menu">
                        <RouterLink 
                            v-for="category in outputCategories" 
                            :key="category.slug"
                            :to="`/output#${category.slug}`"
                        >
                            {{ category.title }}
                        </RouterLink>
                    </div>
                </div>
            </div>
            <div class="link-container">
                <button @click="scrollToContact">Contact</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { scrollToSection } from '../utils/scroll';
import { useNavigationData } from '../composables/useNavigationData';

const { peopleCategories, outputCategories } = useNavigationData();

const scrollToContact = () => scrollToSection('contact-container');
</script>

<style scoped lang="scss">
@use '../styles/vars';
@use '../styles/breakpoints' as *;

.desktop-nav-menu {
    position: relative;
    display: flex;
    align-items: center;

    .links {
        position: relative;
        display: flex;
        align-items: center;
    }

    a, button {
        color: white;
        font-size: 16px;
        margin: 0 8px;
        text-decoration: none;
        position: relative;
        padding: 4px 16px;
        margin: 0;
        transition: color 0.3s ease;
        background: none;
        border: none;
        cursor: pointer;

        &:hover {
            color: vars.$accent;
        }
    }

    .link-container {
        padding-bottom: 32px;
    }

    .link-container.extendible {

        span::after {
            content: "+";
            margin-left: 4px;
            transition: content 0.3s ease;
        }

        &:hover {
            .sub-menu-container {
                opacity: 1;
                transform: scale(1);
                display: block;
            }

            a {
                color: vars.$accent;
    
                span::after {
                    content: "−";
                }
            }

        }

        .sub-menu-container {
            position: absolute;
            top: calc(100% - 32px);
            right: 16px;
            opacity: 0;
            transform: scale(0);
            transition: opacity 0.15s linear;
            z-index: 10;
            padding: 16px 0 40px 40px;
            
            &:hover {
                opacity: 1;
            }
        }
        
        .sub-menu {
            display: flex;
            background: vars.$accent;
            color: #000;

            a {
                display: block;
                color: #000;
                text-transform: uppercase;
                padding: 4px 24px;
                margin: 0;
                font-size: 14px;
                font-weight: 500;
                white-space: nowrap;
                transition: all 0.3s ease;
                position: relative;

                @media (max-width: $tablet) {
                    padding: 4px 20px;
                }

                &::before,
                &::after {
                    content: "";
                    position: absolute;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background-color: vars.$accent;
                    transition: transform 0.3s ease;
                }
                
                &::before {
                    top: 0;
                    transform: translateY(0);
                }
                
                &::after {
                    bottom: 0;
                    transform: translateY(0);
                }

                &:hover {
                    color: #000;
                    
                    &::before {
                        transform: translateY(-6px);
                    }
                    
                    &::after {
                        transform: translateY(6px);
                    }
                }
            }
        }
    }

}


@media (max-width: $mobile) {
    .desktop-nav-menu {
        display: none;
    }
}
</style>
