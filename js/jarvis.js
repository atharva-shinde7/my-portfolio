class JarvisChat {
    constructor() {
        this.messages = [];
        this.chatPopup = document.querySelector('.chat-popup');
        this.chatMessages = document.querySelector('.chat-messages');
        this.chatInput = document.querySelector('.chat-input');
        this.aiButton = document.querySelector('.ai-button');
        this.closeButton = document.querySelector('.close-chat');
        this.clearButton = document.querySelector('.clear-chat');
        this.sendButton = document.querySelector('.send-message');

        this.responses = {
            greetings: ['Hello!', 'Hi there!', 'Greetings!'],
            about: [
                "Atharva is a passionate Quantum Thinker and AI Innovator.",
                "He started his programming journey at age 13 and has been fascinated by technology ever since.",
                "His main interests include Quantum Physics, Artificial Intelligence, and Ethical Hacking."
            ],
            projects: [
                "Atharva has worked on several impressive projects, including:",
                "- Jarvis AI: An advanced AI assistant",
                "- Quantum Mechanics Simulations",
                "Check out his GitHub for more!"
            ],
            skills: [
                "Atharva's key skills include:",
                "- Programming: JavaScript, Python, C++",
                "- AI/ML Development",
                "- Quantum Computing",
                "- Ethical Hacking"
            ],
            achievements: [
                "Some notable achievements:",
                "- Selected for Scaler Young Innovators Internship",
                "- Multiple certifications in AI and programming",
                "- Active contributions to advanced AI research"
            ]
        };

        this.init();
    }

    init() {
        // Initialize chat popup functionality
        this.aiButton.addEventListener('click', () => this.toggleChat());
        this.closeButton.addEventListener('click', () => this.toggleChat());
        this.clearButton.addEventListener('click', () => this.clearChat());

        // Initialize chat input handlers
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && this.chatInput.value.trim() !== '') {
                this.handleUserInput(this.chatInput.value.trim());
                this.chatInput.value = '';
            }
        });

        this.sendButton.addEventListener('click', () => {
            if (this.chatInput.value.trim() !== '') {
                this.handleUserInput(this.chatInput.value.trim());
                this.chatInput.value = '';
            }
        });

        // Add welcome message
        setTimeout(() => {
            this.addMessage("Hello! I'm Atharva's AI assistant. How can I help you?", 'jarvis');
        }, 500);
    }

    clearChat() {
        // Add fade-out animation to all messages
        const messages = this.chatMessages.querySelectorAll('.message');
        messages.forEach(message => {
            message.style.animation = 'fadeOut 0.3s ease forwards';
        });

        // Clear messages after animation
        setTimeout(() => {
            this.chatMessages.innerHTML = '';
            this.messages = [];
            // Add welcome message again
            this.addMessage("Chat cleared. How else can I help you?", 'jarvis');
        }, 300);
    }

    toggleChat() {
        this.chatPopup.classList.toggle('active');
        if (this.chatPopup.classList.contains('active')) {
            this.chatInput.focus();
        }
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.innerHTML = `
            <div class="message-content">
                <span class="sender">${sender === 'jarvis' ? 'Jarvis' : 'You'}</span>
                <p>${text}</p>
            </div>
        `;
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    async handleUserInput(input) {
        this.addMessage(input, 'user');

        // Simulate thinking
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = this.generateResponse(input.toLowerCase());
        this.addMessage(response, 'jarvis');
    }

    generateResponse(input) {
        // Check for greetings
        if (input.match(/\b(hi|hello|hey|greetings)\b/)) {
            return this.getRandomResponse('greetings');
        }

        // Check for questions about Atharva
        if (input.includes('who') && (input.includes('atharva') || input.includes('you'))) {
            return this.getRandomResponse('about');
        }

        // Check for projects
        if (input.includes('project')) {
            return this.responses.projects.join('\n');
        }

        // Check for skills
        if (input.includes('skill') || input.includes('know') || input.includes('can')) {
            return this.responses.skills.join('\n');
        }

        // Check for achievements
        if (input.includes('achieve') || input.includes('certification') || input.includes('award')) {
            return this.responses.achievements.join('\n');
        }

        // Default response
        return "I can tell you about Atharva's projects, skills, achievements, or background. What would you like to know?";
    }

    getRandomResponse(category) {
        const responses = this.responses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Initialize Jarvis Chat
document.addEventListener('DOMContentLoaded', () => {
    new JarvisChat();
}); 