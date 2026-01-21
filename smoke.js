/**
 * Matrix Hacking Shockwave
 * - Fast expanding rings
 * - Rapid character switching (Real-time hacking look)
 * - White leading edge -> Blue trail
 */

const canvas = document.getElementById('smoke-canvas');
const ctx = canvas.getContext('2d');

let width, height;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    ctx.font = 'bold 16px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
}
window.addEventListener('resize', resize);
resize();

// Configuration
const config = {
    ringInterval: 30, // Frames between expansion waves (Rings)
    particlesPerRing: 60, // Density of the circle
    expansionSpeed: 8, // VERY Fast
    chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#%&@*<>[]{}', // Code chars
};

let particles = [];
let frame = 0;

class Particle {
    constructor(x, y, angle, speed) {
        this.x = x;
        this.y = y;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.life = 0;
        this.maxLife = 100; // Die after leaving screen usually
        this.char = config.chars[Math.floor(Math.random() * config.chars.length)];
        this.size = 14 + Math.random() * 6;
        this.alpha = 1.0;
        this.color = '#FFFFFF'; // Start White
    }

    update() {
        this.life++;

        // Move Fast
        this.x += this.vx;
        this.y += this.vy;

        // Simple expansion conservation? No, constant speed is more "shockwave" like.
        // Maybe slight friction?
        // this.vx *= 0.99;
        // this.vy *= 0.99;

        // Rapid Character Switch (Hacking Effect)
        // Switch every frame for maximum chaos
        this.char = config.chars[Math.floor(Math.random() * config.chars.length)];

        // Color & Alpha Logic
        // 0-10 frames: Bright White/Blue
        // 10-40 frames: Blue/Purple
        // 40+ frames: Fade out

        if (this.life < 15) {
            this.color = '#FFFFFF'; // White Hot
            this.alpha = 1.0;
        } else if (this.life < 40) {
            this.color = '#00CCFF'; // Cyan Blue
            this.alpha = 0.8;
        } else {
            this.color = '#3300FF'; // Deep Blue/Purple
            this.alpha -= 0.05; // Quick fade
        }

        if (this.alpha < 0) this.alpha = 0;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;

        // Glow effect for white hot stage
        if (this.life < 15) {
            ctx.shadowColor = '#FFFFFF';
            ctx.shadowBlur = 15;
        } else {
            ctx.shadowColor = '#00CCFF';
            ctx.shadowBlur = 5;
        }

        ctx.font = `bold ${this.size}px monospace`;
        ctx.fillText(this.char, this.x, this.y);

        ctx.shadowBlur = 0; // Reset
    }
}

function spawnRing() {
    const startRadius = 200; // Start around the robot
    const centerX = width / 2;
    const centerY = height / 2;

    for (let i = 0; i < config.particlesPerRing; i++) {
        const angle = (Math.PI * 2 * i) / config.particlesPerRing;

        // Add some noise to radius for a "thick" band
        const r = startRadius + (Math.random() - 0.5) * 40;

        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;

        // Velocity vector is pure radial
        particles.push(new Particle(x, y, angle, config.expansionSpeed));
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    // Spawn Logic
    frame++;
    if (frame % config.ringInterval === 0) {
        spawnRing();
    }

    // Update & Draw
    // Use 'screen' or 'lighter' for that digital glow overlap
    ctx.globalCompositeOperation = 'lighter';

    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();

        if (p.alpha <= 0 || p.x < -100 || p.x > width + 100 || p.y < -100 || p.y > height + 100) {
            particles.splice(i, 1);
        }
    }

    requestAnimationFrame(animate);
}

animate();
