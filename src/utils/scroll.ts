/**
 * Utility functions for scrolling behavior
 */

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
 */
export function scrollToSection(id: string, duration?: number): void {
    const element = document.getElementById(id);

    if (element) {
        // Get the element's position relative to the viewport
        const rect = element.getBoundingClientRect();
        
        // Dynamically get navigation height
        const nav = document.querySelector('nav') || document.querySelector('header');
        const navHeight = nav ? nav.getBoundingClientRect().height : 0;
        
        // Calculate the target scroll position with offset
        const targetScrollTop = window.pageYOffset + rect.top - navHeight;
        const startScrollTop = window.pageYOffset;
    
        if (duration) {
            // Use custom smooth scroll with configurable duration
            smoothScrollTo(startScrollTop, targetScrollTop, duration).then(() => {
                // Update URL after scroll completes
                history.pushState(null, '', `#${id}`);
            });
        } else {
            // Use default smooth scroll
            window.scrollTo({
                top: targetScrollTop,
                behavior: 'smooth'
            });
            history.pushState(null, '', `#${id}`);
        }

    }
}