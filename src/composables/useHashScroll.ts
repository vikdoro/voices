import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { scrollToSection } from '../utils/scroll';
import { homeScrollPosition } from '../homeScrollPosition';

export function useHashScroll() {
  const route = useRoute();

  onMounted(() => {
    if (route.path === '/' && homeScrollPosition.value) {
      if (homeScrollPosition.value) {
        
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
                scrollToSection(homeScrollPosition.value as string, 0);
            });
        });
        return;
      }
    }
    // Check if there's a hash in the URL
    if (route.hash) {
      const hashId = route.hash.slice(1); // Remove the #
      
      // Wait a bit for the DOM to be fully rendered
      setTimeout(() => {
        const targetElement = document.getElementById(hashId);
        
        if (targetElement) {
          // Use smooth scrolling for hash navigation
          scrollToSection(hashId);
        } else {
          console.warn(`Target element #${hashId} not found`);
        }
      }, 120); // Small delay to ensure DOM is ready
    }
  });

  // Return a function to manually scroll to a section if needed
  const scrollToHash = (hashId: string) => {
    const targetElement = document.getElementById(hashId);
    if (targetElement) {
      scrollToSection(hashId);
    } else {
      console.warn(`Target element #${hashId} not found`);
    }
  };

  return {
    scrollToHash
  };
}
