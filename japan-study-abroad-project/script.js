document.addEventListener('DOMContentLoaded', () => {
    // Elegant active navigation highlighting based on scroll position
    const sections = document.querySelectorAll('.principle-section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const nav = document.querySelector('.global-nav');

    // Options for the Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Adjusted to trigger effectively as section comes into view
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to intersecting section link
                const activeId = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-links a[href="#${activeId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
                
                // Optional: Update nav background match section theme slightly (subtle)
                // const themeColor = getComputedStyle(entry.target).getPropertyValue('--theme-bg').trim();
                // nav.style.backgroundColor = themeColor + 'F2'; // Adding hex alpha for 95% opacity
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});
