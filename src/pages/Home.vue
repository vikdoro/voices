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
import { ref, onMounted } from 'vue';
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

<style scoped>
</style>
