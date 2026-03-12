document.addEventListener('DOMContentLoaded', () => {
    // Elegant active navigation highlighting based on scroll position
    const sections = document.querySelectorAll('.principle-section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const nav = document.querySelector('.global-nav');
    const galleryImages = document.querySelectorAll('.img-wrapper img');

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

    // Image modal for traditional example images.
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
        <div class="image-modal__backdrop" data-close="modal"></div>
        <div class="image-modal__dialog" role="dialog" aria-modal="true" aria-label="Expanded image">
            <button type="button" class="image-modal__close" aria-label="Close image">&times;</button>
            <img class="image-modal__img" src="" alt="">
        </div>
    `;
    document.body.appendChild(modal);

    const modalImage = modal.querySelector('.image-modal__img');
    const closeButton = modal.querySelector('.image-modal__close');

    const openModal = (img) => {
        modalImage.src = img.currentSrc || img.src;
        modalImage.alt = img.alt || 'Expanded image';
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        closeButton.focus();
    };

    const closeModal = () => {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        modalImage.src = '';
        document.body.classList.remove('modal-open');
    };

    galleryImages.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => openModal(img));
    });

    modal.addEventListener('click', (event) => {
        if (!(event.target instanceof HTMLElement)) {
            return;
        }

        // Close on any click outside the enlarged image.
        if (!event.target.closest('.image-modal__img')) {
            closeModal();
        }
    });

    closeButton.addEventListener('click', closeModal);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('is-open')) {
            closeModal();
        }
    });
});
