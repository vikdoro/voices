<template>
	<div class="home-container">
		<section class="home-section">
			<header>
				<h1 class="intro">{{ homeContent?.intro }}</h1>
				<h1 class="subheader">
					{{ homeContent?.subheaderStart }}
					<span class="no-wrap">{{ homeContent?.subheaderMiddleNoWrapText }}</span>
					{{ homeContent?.subheaderEnd }}
				</h1>
				<CtaButton :text="homeContent?.ctaButton || 'START READING'" @click="scrollToAbout" />
			</header>
		</section>

		<section id="about" class="about-section">
            <div class="about-content">
                <p class="multiline">
                    {{ homeContent?.about.paragraph }}
                </p>
            </div>
		</section>

		<section id="project-output">
			<div class="project-output-content">
				<HomeOutputItem
					v-for="(item, index) in outputItems"
					:key="`${item.title}-${index}`"
					:title="item.title"
					:description="item.description"
					:coverImage="item.coverImage"
					:slug="item.slug"
				/>
			</div>
		</section>
        <p class="closing-text">
            {{ homeContent?.closingText }}
        </p>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import HomeOutputItem from '../components/HomeOutputItem.vue';
import CtaButton from '../components/CtaButton.vue';
import outputData from '../assets/data/output/output.json';
import homeContactData from '../assets/data/home-contact-institutions.json';
import { scrollToSection } from '../utils/scroll';
import { useHashScroll } from '../composables/useHashScroll';
import { useDynamicData } from '../composables/useDynamicData';

interface OutputItem {
	title: string;
	description: string;
	coverImage: string;
	slug: string;
}

interface HomeContent {
	intro: string;
	subheaderStart: string;
	subheaderMiddleNoWrapText: string;
	subheaderEnd: string;
	ctaButton: string;
	about: {
		paragraph1: string;
		paragraph2: string;
	};
	closingText: string;
}

const { data: outputItems } = useDynamicData<OutputItem[]>(outputData, 'output');
const { data: homeContactContent } = useDynamicData(homeContactData, 'home-contact-institutions');
const homeContent = computed(() => homeContactContent.value.home);

// Use the hash scroll composable
useHashScroll();

const scrollToAbout = () => scrollToSection('about', 1200);
</script>

<style scoped lang="scss">
@use '../styles/vars';
@use '../styles/breakpoints' as *;

.home-container {
    width: calc(100% - 48px);
    max-width: 1200px;
    margin: 0 auto;
    h2 {
        margin: 21px 0;

        @media (max-width: $mobile) {
            text-align: center;
        }
    }

    @media (max-width: $mobile) {
        width: calc(100% - 32px);
    }
}

section.home-section {
    height: calc(100vh - 127px);
    min-height: 1020px;
    display: block;
    padding: 306px 0 0 120px;


    @media (max-width: $mobile) {
        padding: 184px 16px 0;
        min-height: 880px;
    }

    h1.intro {

        @media (max-width: $desktop) {
            max-width: 480px;
            line-height: 62px;
            margin-bottom: 24px;
        }

        @media (max-width: $mobile) {
            line-height: 44px;
            margin-bottom: 16px;
        }
    }

    h1.subheader {
        max-width: 800px;
        margin: 0 0 48px;

        @media (max-width: $desktop) {
            margin-bottom: 40px;
        }

        @media (max-width: $mobile) {
            margin-bottom: 40px;
        }
    }

}

section#about {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 120px 0 max(10vh, 96px);

    .about-content {
        max-width: 915px;
        background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 25%, rgba(0, 0, 0, 0.8) 75%, transparent 100%);
        margin: 0 auto;
        
        p {
            font-size: 18px;
            margin-bottom: 24px;
            color: rgba(255, 255, 255, 0.9);
            font-weight: 500;
            line-height: 22px;

            @media (max-width: $tablet) {
                font-size: 16px;
                line-height: 22px;
            }
        }

        p.multiline {
            white-space: pre-line;
        }
    }
}

section#project-output {
    position: relative;
    padding-bottom: 132px;
    max-width: 1200px;
    margin: 0 auto;
}

.closing-text {
    max-width: 915px;
    text-align: center;
    font-size: 18px;
    line-height: 25px;
    margin: 0 auto;

    @media (max-width: $tablet) {
        font-size: 16px;
        line-height: 22px;
    }

}
</style>
