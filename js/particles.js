class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.5 + 0.2})`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.01;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class ParticleNetwork {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particleArray = [];
        this.mouse = {
            x: null,
            y: null,
            radius: 150
        };

        this.init();
    }

    init() {
        const particleContainer = document.querySelector('.particle-network');
        particleContainer.appendChild(this.canvas);

        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const numberOfParticles = (this.canvas.width * this.canvas.height) / 9000;

        for (let i = 0; i < numberOfParticles; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            this.particleArray.push(new Particle(x, y));
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.particleArray.length; i++) {
            const particle = this.particleArray[i];
            particle.update();
            particle.draw(this.ctx);

            // Connect particles
            for (let j = i; j < this.particleArray.length; j++) {
                const dx = this.particleArray[i].x - this.particleArray[j].x;
                const dy = this.particleArray[i].y - this.particleArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
                    this.ctx.lineWidth = 0.2;
                    this.ctx.moveTo(this.particleArray[i].x, this.particleArray[i].y);
                    this.ctx.lineTo(this.particleArray[j].x, this.particleArray[j].y);
                    this.ctx.stroke();
                }
            }

            // Remove particles that are too small
            if (particle.size <= 0.2) {
                this.particleArray.splice(i, 1);
                i--;
            }
        }

        // Add new particles to maintain density
        if (this.particleArray.length < 100) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            this.particleArray.push(new Particle(x, y));
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle network
document.addEventListener('DOMContentLoaded', () => {
    new ParticleNetwork();
}); 