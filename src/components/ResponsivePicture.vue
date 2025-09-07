<script lang="ts" setup>
import { computed } from 'vue'

// Import all responsive images from assets folder
const imageModules = import.meta.glob('../assets/**/*.webp', { eager: true, import: 'default' }) as Record<string, string>



const props = defineProps({
  /* basePath WITHOUT size/extension, e.g. "/img/my-photo" */
  basePath: { type: String, required: true },
  alt: { type: String, required: true },
  // people, output, 407px x 201px, 246px x 201px
  // 814 x 402px, 512 x 402px
  // 1221 x 603px, 738 x 603px
  // homepage output images 600px x 320px, 489px x 320px, 378px x 250px
  // Array of width values for responsive images
  dimensions: { 
    type: Array, 
    default: () => [320, 640, 960, 1280, 1920]
  },
  sizes: {
    type: String,
    default: '(min-width: 1024px) 60vw, 100vw'
  },
  formats: { type: Array, default: () => ['avif', 'webp', 'jpg'] },
  loading: { type: String as () => 'lazy' | 'eager', default: 'lazy' },
  decoding: { type: String as () => 'async' | 'auto' | 'sync', default: 'async' },
  fetchpriority: { type: String, default: 'auto' }
})

// Helper function to find the correct image URL from the imported modules
const findImageUrl = (basePath: string, width: number, format: string): string | null => {
  // Convert basePath to match the relative path pattern used in glob import
  // e.g., "@assets/glasses/glass-1" -> "../assets/glasses/glass-1"
  // e.g., "./assets/glasses/glass-1" -> "../assets/glasses/glass-1"
  // e.g., "glasses/glass-1" -> "../assets/glasses/glass-1"
  let normalizedBasePath = basePath.replace('@assets/', '../assets/')
  normalizedBasePath = normalizedBasePath.replace('./assets/', '../assets/')
  
  // If basePath doesn't start with any prefix, assume it's relative to assets
  if (!normalizedBasePath.startsWith('../assets/')) {
    normalizedBasePath = `../assets/${normalizedBasePath}`
  }
  
  const imageKey = `${normalizedBasePath}_w${width}.${format}`
  
  return imageModules[imageKey] || null
}

const srcsetFor = (format: string) => {
  const dimensions = props.dimensions as number[]
  const srcsetEntries: string[] = []
  
  dimensions.forEach((width: number) => {
    const imageUrl = findImageUrl(props.basePath, width, format)
    if (imageUrl) {
      srcsetEntries.push(`${imageUrl} ${width}w`)
    }
  })
  
  return srcsetEntries.join(', ')
}

// Get the best available format for the srcset
const bestFormat = computed(() => {
  const formats = props.formats as string[]
  // Try to find the first available format
  for (const format of formats) {
    const dimensions = props.dimensions as number[]
    const hasAnySize = dimensions.some(width => 
      findImageUrl(props.basePath, width, format) !== null
    )
    if (hasAnySize) {
      return format
    }
  }
  // Fallback to webp if nothing found
  return 'webp'
})

// Get the largest width for intrinsic sizing
const intrinsicDimensions = computed(() => {
  const dimensions = props.dimensions as number[]
  const maxWidth = Math.max(...dimensions)
  return { width: maxWidth }
})
</script>

<template>
    <img
    :srcset="srcsetFor(bestFormat)"
    :sizes="props.sizes"
    :alt="props.alt"
    :loading="props.loading"
    :decoding="props.decoding"
    :fetchpriority="props.fetchpriority"
    :width="intrinsicDimensions.width"
    />
  </template>
