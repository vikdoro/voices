/**
 * Utility functions for scrolling behavior
 */

/**
 * Smoothly scrolls to an element with the specified ID, accounting for navigation height
 * @param id - The ID of the element to scroll to
 * @param smooth - Whether to use smooth scrolling (default: true)
 */
export function scrollToSection(id: string, smooth: boolean = true): void {
    const element = document.getElementById(id);

    if (element) {
        // Get the element's position relative to the viewport
        const rect = element.getBoundingClientRect();
        
        // Dynamically get navigation height
        const nav = document.querySelector('nav') || document.querySelector('header');
        const navHeight = nav ? nav.getBoundingClientRect().height : 0;
        
        // Calculate the target scroll position with offset
        const targetScrollTop = window.pageYOffset + rect.top - navHeight;
        
        // Mark as programmatic scroll
        (window as any).isProgrammaticScroll = true;

        
        // Smooth scroll to the calculated position
        window.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth'
        });
        
        // Update URL without triggering scroll
        history.pushState(null, '', `#${id}`);
    }
}