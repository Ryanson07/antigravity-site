/**
 * AntiGravity Landing Page - Main JavaScript (Optimized)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize UnicornStudio if not already (defer handled by script tag mostly)
    if (window.UnicornStudio) {
        UnicornStudio.init();
    }

    // 2. Spline 3D Model: Loaded directly via valid <iframe> tags in HTML for stability.

    // 3. Smooth scroll for anchor links
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

    // 5. Card Glow Effect (Mouse Tracking)
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

    console.log('🚀 AntiGravity AIMOTION Theme Loaded (Optimized)');
});
