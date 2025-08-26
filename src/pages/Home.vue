<template>
	<div class="home-container">
		<section class="home-section">
			<header>
				<h1 class="intro">VOICES FROM Auschwitz</h1>
				<h1 class="subheader">
					Unlocking Collective Memory with
					<span class="no-wrap">the Multimodal Analysis</span> of
					Survivor Testimonies
				</h1>
				<button type="button" id="home-cta-button" @click="scrollToAbout">
					<div class="cta-border-top">
						<div class="cta-border-3px"></div>
						<div class="cta-border-1px"></div>
					</div>
					<svg
						class="cta-arrow"
						width="25"
						height="24"
						viewBox="0 0 25 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M6.5 12H18.8868M18.8868 12L14 7M18.8868 12L14 17"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
						/>
					</svg>
					<span>START TO UNLOCK</span>
					<div class="cta-border-bottom">
						<div class="cta-border-3px-bottom"></div>
						<div class="cta-border-1px-bottom"></div>
					</div>
				</button>
			</header>
		</section>

		<section id="about" class="about-section">
			<div class="about-content">
				<h2>About</h2>
				<p>
					Rose and Jack came from very different walks of life.
					However, at some point, their paths crossed; they were both
					deported to the Auschwitz concentration camp. Even though
					they were in the same place at the same time, later they
					invoked the past in a contrasting manner. Both Rose and Jack
					gave an oral history testimony in the 1990s, but their
					stories, as well as the non-verbal layer of their memories,
					were very different.
				</p>
				<p>
					Inspired by these differences, we compare how thousands of
					women and men survivors remembered life in Auschwitz. We use
					a multimodal approach supported by artificial intelligence;
					we investigate not only the textual content of testimonies;
					we also study the voice, the eye movement, the body posture,
					and other non-verbal gestures of survivors recalling a
					troubled past.
				</p>
			</div>
		</section>

		<section id="project-output">
			<div class="flex-center-column">
				<h2>Project Output</h2>
			</div>
			<div class="project-output-content">
				<HomeOutputItem
					v-for="item in outputItems"
					:key="item.slug"
					:title="item.title"
					:description="item.description"
					:coverImage="item.coverImage"
					:slug="item.slug"
				/>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HomeOutputItem from '../components/HomeOutputItem.vue';
import outputData from '../data/output/output.json';
import { scrollToSection } from '../utils/scroll';
import { useHashScroll } from '../composables/useHashScroll';

interface OutputItem {
	title: string;
	description: string;
	coverImage: string;
	slug: string;
}

const outputItems = ref<OutputItem[]>(outputData);

// Use the hash scroll composable
useHashScroll();

const scrollToAbout = () => scrollToSection('about');
</script>

<style scoped lang="scss">
@use '../styles/vars';
@use '../styles/breakpoints' as *;

.home-container {
    h2 {
        margin: 21px 0;

        @media (max-width: $mobile) {
            text-align: center;
        }
    }

    @media (max-width: $tablet) {
        padding: 0 24px;
    }

    @media (max-width: $mobile) {
        padding: 0 16px;
    }
}

section.home-section {
    height: calc(100vh - 127px);
    min-height: 1020px;
    display: block;
    padding: 273px 0 0 218px;

    @media (max-width: $large-desktop) {
        padding: 264px 0 0 96px;
    }

    @media (max-width: $mobile) {
        padding: 240px 16px 0;
        min-height: 880px;
    }

    h1.intro {
        margin: 0 0 32px;

        @media (max-width: $large-desktop) {
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

        @media (max-width: $large-desktop) {
            margin-bottom: 40px;
        }

        @media (max-width: $mobile) {
            margin-bottom: 40px;
        }
    }

    #home-cta-button {
        padding: 16px 32px 16px 0;
        background: transparent;
        border: none;
        transition: transform 0.3s ease;

        color: vars.$accent;
        text-decoration: none;
        font-weight: 500;
        font-size: 16px;
        display: flex;
        align-items: center;
        position: relative;
        padding: 12px 0;
        cursor: pointer;
        text-align: center;
        line-height: normal;
        text-transform: uppercase;

        .cta-border-top {
            position: absolute;
            top: 0;
            left: 0;
            width: calc(100% + 26px);
            height: 3px;
            display: flex;
            overflow: hidden;
        }

        .cta-border-3px {
            width: 100%;
            height: 3px;
            background: vars.$accent;
            flex-shrink: 0;
            transition: transform 0.5s;
        }

        .cta-border-1px {
            width: 100%;
            height: 1px;
            background: vars.$accent;
            flex-shrink: 0;
            transition: transform 0.5s;
        }

        &:hover .cta-border-3px,
        &:hover .cta-border-1px {
            transform: translateX(-100%);
        }

        .cta-border-bottom {
            position: absolute;
            bottom: 0;
            left: 0;
            width: calc(100% + 26px);
            height: 3px;
            display: flex;
            overflow: hidden;
        }

        .cta-border-1px-bottom {
            width: 100%;
            height: 1px;
            background: vars.$accent;
            flex-shrink: 0;
            transition: transform 0.5s;
            align-self: flex-end;
            transform: translateX(-100%);
        }

        .cta-border-3px-bottom {
            width: 100%;
            height: 3px;
            background: vars.$accent;
            flex-shrink: 0;
            transition: transform 0.5s;
            transform: translateX(-100%);
        }

        &:hover .cta-border-1px-bottom,
        &:hover .cta-border-3px-bottom {
            transform: translateX(0);
        }

        .cta-arrow {
            width: 25px;
            height: 24px;
            opacity: 0;
            position: absolute;
            left: 0;
            transform: translateX(-24px);
            transition: all 0.3s ease;
            color: vars.$accent;
            margin-right: 4px;
        }

        &:hover .cta-arrow {
            opacity: 1;
            transform: translateX(0);
        }

        span {
            transition: transform 0.3s ease;
        }

        &:hover span {
            transform: translateX(26px);
        }
    }
}

section#about {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 120px 0 467px;

    @media (max-width: $tablet) {
        padding: 128px 0 332px;
    }

    @media (max-width: $mobile) {
        padding: 128px 0 232px;
    }

    .about-content {
        max-width: 800px;
        background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 25%, rgba(0, 0, 0, 0.8) 75%, transparent 100%);
        margin: 0 auto;
        
        p {
            font-size: 16px;
            margin-bottom: 24px;
            color: rgba(255, 255, 255, 0.9);
            font-weight: 500;

            @media (max-width: $desktop) {
                font-size: 14px;
            }
        }
    }
}
</style>
