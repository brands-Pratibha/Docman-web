document.addEventListener('DOMContentLoaded', () => {
    // Search Interactivity
    const searchBtn = document.querySelector('.search-btn');
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.querySelector('.search-input');

    if (searchBtn && searchContainer && searchInput) {
        searchBtn.addEventListener('click', (e) => {
            searchContainer.classList.toggle('active');
            if (searchContainer.classList.contains('active')) {
                searchInput.focus();
            }
        });
    }

    // Language Selector Interactivity
    const langSelector = document.querySelector('.lang-selector');
    const langContainer = document.querySelector('.lang-container');
    const langOptions = document.querySelectorAll('.lang-dropdown li');
    const currentLangSpan = document.querySelector('.lang-selector span');

    if (langSelector && langContainer) {
        langSelector.addEventListener('click', (e) => {
            e.stopPropagation();
            langContainer.classList.toggle('active');
        });

        langOptions.forEach(option => {
            option.addEventListener('click', () => {
                const selectedLang = option.textContent;
                if (currentLangSpan) {
                    currentLangSpan.textContent = selectedLang;
                }
                langContainer.classList.remove('active');
            });
        });
    }

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('section, .product-card, .solution-card, .quality-card');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    // Add reveal class to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (langContainer && !langContainer.contains(e.target)) {
            langContainer.classList.remove('active');
        }

        if (searchContainer && !searchContainer.contains(e.target)) {
            if (searchInput.value === '') {
                searchContainer.classList.remove('active');
            }
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-links a, .footer-col a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Products Carousel Navigation
    const carouselLeftArrow = document.querySelector('.carousel-arrow-left');
    const carouselRightArrow = document.querySelector('.carousel-arrow-right');
    const productsScrollWrapper = document.querySelector('.products-scroll-wrapper');

    if (carouselLeftArrow && carouselRightArrow && productsScrollWrapper) {
        const scrollAmount = 384; // Card width (360px) + gap (24px)

        carouselLeftArrow.addEventListener('click', () => {
            productsScrollWrapper.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        carouselRightArrow.addEventListener('click', () => {
            productsScrollWrapper.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Update arrow visibility based on scroll position
        const updateArrowVisibility = () => {
            const scrollLeft = productsScrollWrapper.scrollLeft;
            const maxScrollLeft = productsScrollWrapper.scrollWidth - productsScrollWrapper.clientWidth;

            carouselLeftArrow.style.opacity = scrollLeft <= 0 ? '0.4' : '1';
            carouselLeftArrow.style.pointerEvents = scrollLeft <= 0 ? 'none' : 'auto';

            carouselRightArrow.style.opacity = scrollLeft >= maxScrollLeft - 1 ? '0.4' : '1';
            carouselRightArrow.style.pointerEvents = scrollLeft >= maxScrollLeft - 1 ? 'none' : 'auto';
        };

        productsScrollWrapper.addEventListener('scroll', updateArrowVisibility);
        updateArrowVisibility(); // Initial check
    }
});

