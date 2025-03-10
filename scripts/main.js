// Typing animation text array - different from static description
const typingTexts = [
    "Building the Future with AI",
    "Exploring Quantum Realms",
    "Innovating with Technology",
    "Merging AI & Quantum Computing",
    "Creating Next-Gen Solutions"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;
let newTextDelay = 2000;

const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

// Custom cursor glow effect
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

document.addEventListener('mouseenter', () => {
    cursorGlow.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
});

function type() {
    const currentText = typingTexts[textIndex];

    if (isDeleting) {
        typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    // Adjust typing speed
    let typeSpeed = isDeleting ? typingDelay / 2 : typingDelay;

    // If word is complete
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = newTextDelay;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Timeline animation
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, newTextDelay);
    animateTimeline();
});

// Cursor blinking animation
cursorSpan.classList.add('typing');

// Contact form handling
const contactForm = document.querySelector('.contact-form');
const submitBtn = contactForm.querySelector('.submit-btn');

// API URL - Replace RENDER_URL with your actual Render.com URL
const RENDER_URL = 'https://my-portfolio-l0ge.onrender.com'; // Replace this with your actual Render URL
const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api/contact'
    : `${RENDER_URL}/api/contact`;

// Contact form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Form submitted');

    // Change button state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    console.log('Form data:', formData);

    try {
        console.log('Sending request to server...');
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(formData)
        });

        console.log('Response received:', response);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response data:', data);

        if (data.success) {
            alert('Message sent successfully! I will get back to you soon.');
            contactForm.reset();
        } else {
            throw new Error(data.message || 'Failed to send message');
        }
    } catch (error) {
        console.error('Detailed error:', error);
        alert('Failed to send message. Please try again later. Error: ' + error.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
}); 