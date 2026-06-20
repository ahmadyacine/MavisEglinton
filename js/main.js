document.addEventListener('DOMContentLoaded', () => {
    // 1. Current Year for Footer
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenuCloseBtn && mobileMenu) {
        const toggleMenu = () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            document.body.classList.toggle('scroll-locked');
        };

        mobileMenuBtn.addEventListener('click', toggleMenu);
        mobileMenuCloseBtn.addEventListener('click', toggleMenu);

        // Close on link click
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('scroll-locked');
            });
        });
    }

    // 3. FAQ Accordion Logic
    const faqButtons = document.querySelectorAll('.faq-button');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            const contentId = button.getAttribute('aria-controls');
            const content = document.getElementById(contentId);
            const icon = button.querySelector('svg');

            // Close all other accordions
            faqButtons.forEach(otherBtn => {
                if (otherBtn !== button) {
                    otherBtn.setAttribute('aria-expanded', 'false');
                    const otherContentId = otherBtn.getAttribute('aria-controls');
                    const otherContent = document.getElementById(otherContentId);
                    const otherIcon = otherBtn.querySelector('svg');
                    
                    if (otherContent) otherContent.classList.add('hidden');
                    if (otherIcon) otherIcon.classList.remove('rotate-180');
                }
            });

            // Toggle current
            button.setAttribute('aria-expanded', !isExpanded);
            if (content) {
                content.classList.toggle('hidden');
            }
            if (icon) {
                icon.classList.toggle('rotate-180');
            }
        });
    });

    // 4. Sticky Header Shadow (optional slight enhancement)
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('shadow-md');
            } else {
                header.classList.remove('shadow-md');
            }
        });
    }

    // 5. Hero Carousel
    const heroCarousel = document.getElementById('hero-carousel');
    const heroPrev = document.getElementById('hero-prev');
    const heroNext = document.getElementById('hero-next');
    
    if (heroCarousel && heroPrev && heroNext) {
        heroPrev.addEventListener('click', (e) => {
            e.preventDefault();
            heroCarousel.scrollBy({ left: -heroCarousel.clientWidth, behavior: 'smooth' });
        });
        heroNext.addEventListener('click', (e) => {
            e.preventDefault();
            heroCarousel.scrollBy({ left: heroCarousel.clientWidth, behavior: 'smooth' });
        });
    }
});
