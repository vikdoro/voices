<script lang="ts" setup>
import { computed } from 'vue'

// Import all responsive images from assets folder
const imageModules = import.meta.glob('../assets/**/*.{webp,png,jpg,jpeg,svg}', { eager: true, import: 'default' }) as Record<string, string>

const props = defineProps({
  basePath: { type: String, required: true },
  /* image filename with extension, e.g. "folder/images/my-photo.jpg" - will be processed to remove extension */
  image: { type: String, default: null },
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
    default: '(min-width: 1028px) 60vw, 100vw'
  },
  formats: { type: Array, default: () => ['avif', 'webp', 'jpg'] },
  loading: { type: String as () => 'lazy' | 'eager', default: 'lazy' },
  decoding: { type: String as () => 'async' | 'auto' | 'sync', default: 'async' },
  fetchpriority: { type: String, default: 'auto' }
})

// Check if the image prop is a web URL
const isWebUrl = computed(() => {
  if (!props.image) return false
  
  // Check if the string contains https:// or http://
  const hasHttpProtocol = props.image.includes('https://') || props.image.includes('http://')
  
  if (hasHttpProtocol) {
    // Extract the URL part starting from https:// or http://
    const httpsIndex = props.image.indexOf('https://')
    const httpIndex = props.image.indexOf('http://')
    
    let cleanUrl: string
    if (httpsIndex !== -1) {
      cleanUrl = props.image.substring(httpsIndex)
    } else if (httpIndex !== -1) {
      cleanUrl = props.image.substring(httpIndex)
    } else {
      return false
    }
    
    try {
      const url = new URL(cleanUrl)
      // Check if it's a valid URL and not a local file path
      return url.protocol === 'http:' || url.protocol === 'https:'
    } catch {
      return false
    }
  }
  
  return false
})

// Convert Google Drive sharing links to direct view URLs
const convertGoogleDriveUrl = (url: string): string => {
  // Google Drive sharing link pattern: https://drive.google.com/file/d/FILE_ID/view?usp=drive_link
  const match = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)\//)
  if (match) {
    const fileId = match[1]
    // Try the newer format that works better for embedding
    return `https://lh3.googleusercontent.com/d/${fileId}`
  }
  return url
}

// Extract clean URL from props.image if it contains https:// or http://
const extractCleanUrl = (imageString: string): string => {
  const httpsIndex = imageString.indexOf('https://')
  const httpIndex = imageString.indexOf('http://')
  
  if (httpsIndex !== -1) {
    return imageString.substring(httpsIndex)
  } else if (httpIndex !== -1) {
    return imageString.substring(httpIndex)
  }
  
  return imageString
}

// Get the processed image URL (converts Google Drive URLs if needed)
const processedImageUrl = computed(() => {
  if (isWebUrl.value) {
    const cleanUrl = extractCleanUrl(props.image)
    return convertGoogleDriveUrl(cleanUrl)
  }
  return props.image
})

// Helper function to process the base path and image filename
const processedBasePath = computed(() => {
  if (props.image && !isWebUrl.value) {
    // If image prop is provided and not a web URL, combine basePath with image (removing extension)
    const imageWithoutExt = props.image.replace(/\.[^/.]+$/, '')
    return `${props.basePath}/${imageWithoutExt}`
  }
  return props.basePath
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
  // If using a web URL, don't generate srcset
  if (isWebUrl.value) return ''
  
  const dimensions = props.dimensions as number[]
  const srcsetEntries: string[] = []
  
  dimensions.forEach((width: number) => {
    const imageUrl = findImageUrl(processedBasePath.value, width, format)
    if (imageUrl) {
      srcsetEntries.push(`${imageUrl} ${width}w`)
    }
  })
  
  return srcsetEntries.join(', ')
}

// Get the best available format for the srcset
const bestFormat = computed(() => {
  // If using a web URL, return empty string
  if (isWebUrl.value) return ''
  
  const formats = props.formats as string[]
  // Try to find the first available format
  for (const format of formats) {
    const dimensions = props.dimensions as number[]
    const hasAnySize = dimensions.some(width => 
      findImageUrl(processedBasePath.value, width, format) !== null
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
  // If using a web URL, return default dimensions
  if (isWebUrl.value) {
    return { width: 400 } // Default width for web URLs
  }
  
  const dimensions = props.dimensions as number[]
  const maxWidth = Math.max(...dimensions)
  return { width: maxWidth }
})

// Get fallback src for older browsers
const fallbackSrc = computed(() => {
  // If image is a web URL, use the processed URL (with Google Drive conversion if needed)
  if (isWebUrl.value) {
    return processedImageUrl.value
  }
  
  if (props.image) {
    // If image prop is provided, try to find it in the imported modules
    const imageKey = `../assets/${props.basePath}/${props.image}`
    const foundImage = imageModules[imageKey]
    if (foundImage) {
      return foundImage
    }
    // If the exact image file doesn't exist, fall back to the largest responsive image
  }
  // Use the largest available responsive image as fallback
  const dimensions = props.dimensions as number[]
  const maxWidth = Math.max(...dimensions)
  return findImageUrl(processedBasePath.value, maxWidth, bestFormat.value) || undefined
})

</script>

<template>
    <img
    :src="fallbackSrc"
    :srcset="srcsetFor(bestFormat)"
    :sizes="props.sizes"
    :alt="props.alt"
    :loading="props.loading"
    :decoding="props.decoding"
    :fetchpriority="props.fetchpriority"
    :width="intrinsicDimensions.width"
    />
</template>
