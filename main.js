/**
 * AntiGravity Landing Page - Main JavaScript (Optimized)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize UnicornStudio
    if (window.UnicornStudio) {
        UnicornStudio.init();
    }

    // 2. Defer loading of Spline 3D model
    setTimeout(() => {
        const splineContainer = document.querySelector('.spline-background');
        const placeholder = document.getElementById('spline-placeholder');

        if (splineContainer) {
            const iframe = document.createElement('iframe');
            // Original "GenKub" Model Restored:
            iframe.src = 'https://my.spline.design/genkubgreetingrobot-yPPeDpU7QQxMrJN4rdyeO8Vd/';
            iframe.frameBorder = '0';
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.style.opacity = '0';
            iframe.style.transition = 'opacity 1s ease';

            iframe.onload = () => {
                if (placeholder) placeholder.remove();
                iframe.style.opacity = '1';
            };

            splineContainer.appendChild(iframe);
        }
    }, 1500);

    // 3. Smooth scroll
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

    // 4. Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%)';
            header.style.backdropFilter = 'none';
        }
    });

    // 5. Card Glow Effect
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

    // 6. Dynamic Spline Responsive Scaling
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
            // Desktop: no scale adjustment (use CSS default)
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

    // 🚀 AntiGravity AIMOTION Theme Loaded
});
