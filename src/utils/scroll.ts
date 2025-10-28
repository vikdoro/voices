/**
 * Utility functions for scrolling behavior
 */

/**
 * Smoothly scrolls to the top of the page
 */
export function scrollToTop(): void {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Custom smooth scroll implementation with configurable duration
 * @param start - Starting scroll position
 * @param target - Target scroll position
 * @param duration - Duration in milliseconds
 */
function smoothScrollTo(start: number, target: number, duration: number): Promise<void> {
    return new Promise((resolve) => {
        const startTime = performance.now();
        const distance = target - start;
        
        function animate(currentTime: number) {
            const elapsed = Math.max(currentTime - startTime, 0);
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-in-out)
            const easeInOut = progress < 0.5 
                ? 2 * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            
            const currentPosition = start + (distance * easeInOut);
            window.scrollTo(0, currentPosition);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        }
        
        requestAnimationFrame(animate);
    });
}

/**
 * Smoothly scrolls to an element with the specified ID, accounting for navigation height
 * @param id - The ID of the element to scroll to
 * @param duration - Duration of the scroll animation in milliseconds (default: 800)
 * @param center - Whether to center the element in the viewport (default: false)
 */
export function scrollToSection(id: string, duration?: number, center?: boolean): void {
    const element = document.getElementById(id);
    if (element) {
        // Get the element's position relative to the viewport
        const rect = element.getBoundingClientRect();
        
        // Dynamically get navigation height
        const nav = document.querySelector('nav') || document.querySelector('header');
        const navHeight = nav ? nav.getBoundingClientRect().height : 0;
        
        // Calculate the target scroll position with offset
        let targetScrollTop: number;
        
        if (center) {
            // Center the element in the viewport
            const elementHeight = rect.height;
            const viewportHeight = window.innerHeight;
            const centerOffset = (viewportHeight - elementHeight) / 2;
            targetScrollTop = window.pageYOffset + rect.top - centerOffset;
        } else {
            // Position element at top with navigation offset
            targetScrollTop = window.pageYOffset + rect.top - navHeight;
        }
        
        const startScrollTop = window.pageYOffset;
    
        if (duration === 0) {
            // Immediate scroll (no animation)
            window.scrollTo(0, targetScrollTop);
        } else if (duration) {
            // Use custom smooth scroll with configurable duration
            smoothScrollTo(startScrollTop, targetScrollTop, duration);
        } else {
            // Use default smooth scroll
            window.scrollTo({
                top: targetScrollTop,
                behavior: 'smooth'
            });
        }

    }
}

// Debounce timer for hash updates
let hashUpdateTimeout: number | null = null;

// Import JSON data to build route section map
import peopleData from '../assets/data/people/people.json';
import outputData from '../assets/data/output/output.json';
import { getCachedData } from '../composables/useDynamicData';

// Function to build route section map dynamically
async function buildRouteSectionMap(): Promise<Record<string, string[]>> {
    const [currentPeopleData, currentOutputData] = await Promise.all([
        getCachedData('people', peopleData),
        getCachedData('output', outputData)
    ]);
    
    // Extract output slugs to include in home page monitoring
    const outputSections = currentOutputData.map(item => item.slug);
    
    const map: Record<string, string[]> = {
        // Home page monitors the about, output sections, and contact sections
        '/': ['contact'],
    };
    
    // Add people sections from people.json
    const peopleSections = currentPeopleData.map(item => item.slug);
    map['/people'] = [...peopleSections, 'contact'];
    
    // Add output sections from output.json
    map['/output'] = [...outputSections, 'contact'];
    
    return map;
}

// Map of routes to sections that should be monitored for hash updates
let routeSectionMap: Record<string, string[]> = {};

// Initialize the route section map
buildRouteSectionMap().then(map => {
    routeSectionMap = map;
});

/**
 * Updates the hash in the URL based on the current scroll position
 */
export function updateHashFromScroll(): void {
    // Clear existing timeout
    if (hashUpdateTimeout) {
        clearTimeout(hashUpdateTimeout);
    }
    
    // Set new timeout to run after scroll stops
    hashUpdateTimeout = window.setTimeout(() => {
        const currentPath = window.location.pathname;
        const sectionsToMonitor = routeSectionMap[currentPath];
        
        if (!sectionsToMonitor) {
            return; // No sections to monitor for this route
        }
        
        // Check each section for this route
        for (const sectionId of sectionsToMonitor) {
            const sectionElement = document.getElementById(sectionId);
            
            if (sectionElement) {
                // Get the element's position relative to the viewport
                const rect = sectionElement.getBoundingClientRect();
                
                // Dynamically get navigation height
                const nav = document.querySelector('nav') || document.querySelector('header');
                const navHeight = nav ? nav.getBoundingClientRect().height : 0;
                
                // Calculate the target scroll position with offset
                const targetPosition = window.pageYOffset + rect.top - navHeight;
                const currentScrollY = window.pageYOffset;
                
                // Check if the section is within 100px of the target position
                // or if the page is scrolled all the way to the bottom (only for contact section)
                const isAtBottom = sectionId === 'contact' && (window.innerHeight + currentScrollY) >= document.documentElement.scrollHeight - 1;
                if (Math.abs(currentScrollY - targetPosition) <= 100 || isAtBottom) {
                    // Update URL hash to the section
                    if (window.location.hash !== `#${sectionId}`) {
                        history.replaceState(null, '', `#${sectionId}`);
                    }
                } else {
                    // Clear the hash if the section is not visible anymore
                    if (window.location.hash === `#${sectionId}`) {
                        history.replaceState(null, '', window.location.pathname + window.location.search);
                    }
                }
            }
        }
    }, 100); // 100ms delay after scroll stops
}
