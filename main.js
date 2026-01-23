/**
 * AIMOTION Landing Page - Premium Interactive Experience
 * v2.0 - Future Design Agency Theme
 */

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // 1. Initialize UnicornStudio
    // ========================================
    if (window.UnicornStudio) {
        UnicornStudio.init();
    }

    // ========================================
    // 2. Scroll Reveal Animation (IntersectionObserver)
    // ========================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ========================================
    // 3. Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // 4. Header Scroll Effect (Enhanced)
    // ========================================
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            header.style.background = 'rgba(3, 3, 5, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
        } else {
            header.style.background = 'linear-gradient(180deg, rgba(3,3,5,0.8) 0%, transparent 100%)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.borderBottom = 'none';
        }

        lastScroll = currentScroll;
    });

    // ========================================
    // 5. Card Glow Effect (Enhanced Mouse Tracking)
    // ========================================
    const cards = document.querySelectorAll('.grid-card');
    const gridSection = document.querySelector('.grid-section');

    if (gridSection) {
        gridSection.addEventListener('mousemove', (e) => {
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    // ========================================
    // 6. Hero Parallax Mouse Effect - DISABLED
    // ========================================
    // Parallax effect removed to keep AIMOTION logo fixed

    // ========================================
    // 7. Scroll Indicator Hide on Scroll
    // ========================================
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '0.6';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }

    // ========================================
    // 8. Magnetic Button Effect
    // ========================================
    const magneticButtons = document.querySelectorAll('.magnetic-btn');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // ========================================
    // 9. Performance: Reduce Motion Check
    // ========================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
            el.classList.add('active');
        });
    }

    // ========================================
    // 10. Dynamic Spline Responsive Scaling
    // ========================================
    function updateSplineScale() {
        const splineContainer = document.querySelector('.spline-background');
        if (!splineContainer) return;

        const width = window.innerWidth;
        let scale, containerWidth, containerHeight;

        if (width <= 480) {
            // Small mobile: larger scale to fill screen
            scale = 0.65;
            containerWidth = '200%';
            containerHeight = '200%';
        } else if (width <= 768) {
            // Mobile: proportional scale
            scale = 0.55 + (width - 480) / (768 - 480) * 0.2;
            containerWidth = '180%';
            containerHeight = '180%';
        } else if (width <= 1024) {
            // Tablet
            scale = 0.8;
            containerWidth = '160%';
            containerHeight = '160%';
        } else {
            // Desktop: use CSS default
            scale = 1;
            containerWidth = '220%';
            containerHeight = '220%';
        }

        splineContainer.style.width = containerWidth;
        splineContainer.style.height = containerHeight;
        splineContainer.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }

    // Initial call and resize listener
    updateSplineScale();
    window.addEventListener('resize', updateSplineScale);

    // ✨ AIMOTION Premium Theme Loaded v2.0
});

