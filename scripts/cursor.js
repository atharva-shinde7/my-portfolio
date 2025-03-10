// Custom cursor animation
document.addEventListener('DOMContentLoaded', () => {
    // Create cursor elements
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorOutline.className = 'cursor-dot-outline';
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    // Add active class after a brief delay
    setTimeout(() => {
        cursorDot.classList.add('active');
        cursorOutline.classList.add('active');
    }, 500);

    // Variables for smooth animation
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    // Mouse move event listener with smooth animation
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth animation loop
    function animate() {
        // Smooth transition effect
        let distX = mouseX - posX;
        let distY = mouseY - posY;

        posX += distX * 0.2;
        posY += distY * 0.2;

        // Apply transforms
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;

        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;

        requestAnimationFrame(animate);
    }
    animate();

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorDot.style.background = 'linear-gradient(45deg, #ff00ea, #00ff95)';
            cursorOutline.style.borderColor = 'rgba(255, 0, 234, 0.5)';
        });

        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorDot.style.background = 'linear-gradient(45deg, #00ff95, #00d9ff)';
            cursorOutline.style.borderColor = 'rgba(0, 255, 149, 0.5)';
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });

    // Show cursor when entering window
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });
}); 