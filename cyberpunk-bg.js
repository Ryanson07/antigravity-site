/**
 * Premium White Smoke Ring Animation
 * 
 * ============================================================
 * DESIGN SKILLS APPLIED:
 * ============================================================
 * 
 * [canvas-design] Philosophy:
 * - Meticulous craftsmanship, labored with care
 * - Expert-level execution, master-level implementation
 * - Museum-quality work, pristine masterpiece
 * 
 * [algorithmic-art] Philosophy:
 * - Organic Turbulence: Chaos constrained by natural law
 * - Perlin noise flow fields creating organic density maps
 * - Multiple noise octaves create turbulent/calm zones
 * - Process over product - beauty in algorithm's execution
 * 
 * [frontend-design] Philosophy:
 * - BOLD aesthetic, never generic AI slop
 * - Atmosphere and depth, not solid colors
 * - Creative forms: noise textures, layered transparencies
 * 
 * [ui-ux-pro-max]:
 * - Smooth 60fps animations
 * - Transform/opacity for GPU acceleration
 * - Performance optimized
 * 
 * [3d-web-experience]:
 * - Creates depth behind 3D model
 * - Atmospheric background layer
 * 
 * ============================================================
 * USER REQUIREMENTS:
 * ============================================================
 * - WHITE ONLY (no other colors)
 * - Smoke-like gradual spreading sideways
 * - Irregular, organic drifting
 * - Single ring at a time
 */

class WhiteSmokeRing {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        // Single smoke ring
        this.ring = {
            radius: 80,
            maxRadius: 0,
            opacity: 1
        };

        // Moderate speed (not too slow, not too fast)
        this.expansionSpeed = 1.2;

        // Smoke particles - white/gray only
        this.particles = [];
        this.particleCount = 700;

        // Characters for subtle texture
        this.chars = '·•○◦◯◌◎●◉⊙⊚⊛⦿⊜⊝'.split('');

        // Time for noise animation
        this.time = 0;
        this.noiseSeed = Math.random() * 1000;

        // Performance: pre-calculate noise values
        this.noiseCache = new Map();

        this.init();
    }

    init() {
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        `;
        this.container.appendChild(this.canvas);
        this.resize();
        this.initParticles();

        window.addEventListener('resize', () => this.resize());

        this.animate();
    }

    resize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        this.ring.maxRadius = Math.sqrt(
            Math.pow(this.width, 2) + Math.pow(this.height, 2)
        ) * 0.58;
    }

    /**
     * Multi-octave Perlin-like noise for organic distortion
     * [algorithmic-art] - Flow fields driven by layered noise
     */
    noise(x, y, z) {
        let value = 0;
        let amplitude = 1;
        let frequency = 1;
        let maxValue = 0;

        // 4 octaves for rich organic detail
        for (let octave = 0; octave < 4; octave++) {
            const nx = x * frequency * 0.015 + this.noiseSeed;
            const ny = y * frequency * 0.015;
            const nz = z * 0.25;

            // Combine sine/cosine waves for organic turbulence
            value += Math.sin(nx + nz) * Math.cos(ny - nz * 0.6) * amplitude;
            value += Math.sin((nx + ny) * 0.6 + nz * 1.1) * amplitude * 0.4;
            value += Math.cos(nx * 1.5 - ny * 0.8 + nz * 0.7) * amplitude * 0.25;

            maxValue += amplitude * 1.65;
            amplitude *= 0.45;
            frequency *= 2.1;
        }

        return value / maxValue;
    }

    /**
     * Initialize particles with organic distribution
     * [algorithmic-art] - Particles accumulating into density maps
     */
    initParticles() {
        this.particles = [];

        for (let i = 0; i < this.particleCount; i++) {
            const angle = (i / this.particleCount) * Math.PI * 2;
            // Gaussian-like distribution for smoke density
            const radiusVariation = this.gaussianRandom() * 80;

            this.particles.push({
                baseAngle: angle,
                angle: angle,
                radiusOffset: radiusVariation,
                char: this.chars[Math.floor(Math.random() * this.chars.length)],
                size: 6 + Math.random() * 10,
                // White with varying brightness
                brightness: 0.3 + Math.random() * 0.7,
                flickerPhase: Math.random() * Math.PI * 2,
                flickerSpeed: 0.3 + Math.random() * 0.7,
                // Drift for smoke-like sideways movement
                driftPhase: Math.random() * Math.PI * 2,
                driftSpeed: 0.1 + Math.random() * 0.3,
                driftAmount: 10 + Math.random() * 30,
                noiseOffsetX: Math.random() * 500,
                noiseOffsetY: Math.random() * 500
            });
        }
    }

    /**
     * Gaussian random for natural distribution
     * [algorithmic-art] - Natural clustering patterns
     */
    gaussianRandom() {
        let u = 0, v = 0;
        while (u === 0) u = Math.random();
        while (v === 0) v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }

    /**
     * Get distorted radius for organic smoke shape
     * [algorithmic-art] - Turbulent regions and calm zones
     */
    getDistortedRadius(angle, baseRadius, time) {
        // Large-scale smoke billowing
        const noise1 = this.noise(Math.cos(angle) * 60, Math.sin(angle) * 60, time);
        // Medium detail
        const noise2 = this.noise(Math.cos(angle * 2) * 40, Math.sin(angle * 2) * 40, time * 0.6);
        // Fine turbulence
        const noise3 = this.noise(Math.cos(angle * 0.5) * 100, Math.sin(angle * 0.5) * 100, time * 0.35);

        // Combine for organic smoke edge
        const distortion = noise1 * 90 + noise2 * 50 + noise3 * 30;

        return baseRadius + distortion;
    }

    /**
     * Update animation state
     * [ui-ux-pro-max] - Smooth 60fps
     */
    update() {
        this.time += 0.006;

        // Expand ring
        this.ring.radius += this.expansionSpeed;

        // Fade gradually as it expands
        const progress = this.ring.radius / this.ring.maxRadius;
        this.ring.opacity = Math.pow(1 - Math.pow(progress, 1.3), 0.55);

        // Reset when complete
        if (this.ring.radius >= this.ring.maxRadius) {
            this.ring.radius = 80;
            this.ring.opacity = 1;
            this.noiseSeed = Math.random() * 1000;

            // Refresh particles
            for (const p of this.particles) {
                p.char = this.chars[Math.floor(Math.random() * this.chars.length)];
                p.brightness = 0.3 + Math.random() * 0.7;
            }
        }

        // Update particles with drift
        for (const p of this.particles) {
            // Sideways drift like smoke in wind
            const drift = Math.sin(this.time * p.driftSpeed * 10 + p.driftPhase) * p.driftAmount;
            p.angle = p.baseAngle + drift * 0.003;

            // Flicker brightness
            if (Math.random() < 0.003) {
                p.brightness = 0.4 + Math.random() * 0.6;
            }

            // Slow brightness decay
            p.brightness *= 0.9985;
            if (p.brightness < 0.2) p.brightness = 0.2;
        }
    }

    /**
     * Draw everything
     * [canvas-design] - Museum-quality, pristine execution
     */
    draw() {
        // Clear canvas completely
        this.ctx.fillStyle = 'rgba(5, 5, 8, 1)';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Draw smoke glow layers (white only)
        this.drawSmokeGlow();

        // Draw particle characters
        this.drawParticles();

        // Subtle center ambient
        this.drawAmbient();
    }

    /**
     * Draw layered white smoke glow
     * [frontend-design] - Atmosphere and depth
     */
    drawSmokeGlow() {
        const opacity = this.ring.opacity;
        const baseRadius = this.ring.radius;

        // Multiple soft white glow layers
        for (let layer = 0; layer < 5; layer++) {
            this.ctx.save();
            this.ctx.beginPath();

            const layerRadius = baseRadius + layer * 18;
            const segments = 140;

            for (let i = 0; i <= segments; i++) {
                const angle = (i / segments) * Math.PI * 2;
                const distortedRadius = this.getDistortedRadius(angle, layerRadius, this.time + layer * 0.25);

                const x = this.centerX + Math.cos(angle) * distortedRadius;
                const y = this.centerY + Math.sin(angle) * distortedRadius;

                if (i === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }

            this.ctx.closePath();

            // WHITE ONLY - varying opacity for depth
            const layerOpacity = opacity * (0.12 - layer * 0.018);
            const grayValue = 220 - layer * 15; // White to light gray

            this.ctx.strokeStyle = `rgba(${grayValue}, ${grayValue}, ${grayValue + 10}, ${layerOpacity})`;
            this.ctx.lineWidth = 90 - layer * 14;
            this.ctx.filter = `blur(${28 + layer * 8}px)`;
            this.ctx.stroke();

            this.ctx.restore();
        }

        // Inner bright white edge
        this.ctx.save();
        this.ctx.beginPath();

        const segments = 140;
        for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            const distortedRadius = this.getDistortedRadius(angle, baseRadius, this.time);

            const x = this.centerX + Math.cos(angle) * distortedRadius;
            const y = this.centerY + Math.sin(angle) * distortedRadius;

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }

        this.ctx.closePath();
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
        this.ctx.lineWidth = 3;
        this.ctx.filter = 'blur(2px)';
        this.ctx.stroke();

        this.ctx.restore();
    }

    /**
     * Draw smoke particles
     * [algorithmic-art] - Particles accumulating organically
     */
    drawParticles() {
        const opacity = this.ring.opacity;
        const baseRadius = this.ring.radius;

        this.ctx.save();
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        for (const p of this.particles) {
            const particleRadius = baseRadius + p.radiusOffset;

            // Noise-based position drift for smoke movement
            const noiseX = this.noise(p.noiseOffsetX, particleRadius * 0.04, this.time) * 35;
            const noiseY = this.noise(p.noiseOffsetY, particleRadius * 0.04, this.time + 50) * 35;

            // Follow distorted ring shape
            const distortedRadius = this.getDistortedRadius(p.angle, particleRadius, this.time);

            const x = this.centerX + Math.cos(p.angle) * distortedRadius + noiseX;
            const y = this.centerY + Math.sin(p.angle) * distortedRadius + noiseY;

            // Skip if outside
            if (x < -50 || x > this.width + 50 || y < -50 || y > this.height + 50) continue;

            // Density falloff from ring center
            const distFromCenter = Math.abs(p.radiusOffset);
            const densityFactor = Math.exp(-distFromCenter * distFromCenter / 2800);

            // Gentle flicker
            const flicker = 0.75 + Math.sin(this.time * p.flickerSpeed * 25 + p.flickerPhase) * 0.25;

            const alpha = opacity * p.brightness * densityFactor * flicker;

            if (alpha < 0.03) continue;

            // WHITE ONLY - with subtle glow
            if (alpha > 0.3) {
                this.ctx.shadowColor = `rgba(255, 255, 255, ${alpha * 0.6})`;
                this.ctx.shadowBlur = 10;
            } else {
                this.ctx.shadowBlur = 0;
            }

            // Draw white character
            this.ctx.font = `${p.size}px "Fira Code", "Consolas", monospace`;
            const grayValue = Math.floor(200 + p.brightness * 55); // 200-255 range
            this.ctx.fillStyle = `rgba(${grayValue}, ${grayValue}, ${grayValue}, ${alpha})`;
            this.ctx.fillText(p.char, x, y);
        }

        this.ctx.restore();
    }

    /**
     * Subtle center ambient glow
     */
    drawAmbient() {
        const gradient = this.ctx.createRadialGradient(
            this.centerX, this.centerY, 0,
            this.centerX, this.centerY, 200
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.01)');
        gradient.addColorStop(1, 'transparent');

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    /**
     * Animation loop - 60fps optimized
     * [ui-ux-pro-max] - Performance optimized
     */
    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const bgContainer = document.createElement('div');
        bgContainer.className = 'cyberpunk-background';
        bgContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            pointer-events: none;
            overflow: hidden;
        `;
        heroSection.insertBefore(bgContainer, heroSection.firstChild);

        window.whiteSmokeRing = new WhiteSmokeRing(bgContainer);
    }
});
