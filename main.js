document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.background = 'rgba(5, 5, 5, 0.8)';
            navbar.style.borderBottom = '1px solid var(--glass-border)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.background = 'rgba(5, 5, 5, 0.5)';
            navbar.style.borderBottom = 'none';
        }
    });

    // Typing Effect Logic
    const typingText = document.getElementById('typing-text');
    const roles = ['AI Engineer', 'Machine Learning Developer', 'Generative AI Enthusiast'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    if (typingText) type();

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, observerOptions);

    // AI Chatbot Logic
    const chatToggle = document.getElementById('chat-toggle');
    const closeChat = document.getElementById('close-chat');
    const chatWindow = document.getElementById('chat-window');
    const sendBtn = document.getElementById('send-msg');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    if (chatToggle && chatWindow) {
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
        });

        closeChat.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });

        const sendMessage = () => {
            const text = userInput.value.trim();
            if (text) {
                // Add user message
                const userMsg = document.createElement('div');
                userMsg.className = 'message user';
                userMsg.textContent = text;
                chatMessages.appendChild(userMsg);
                userInput.value = '';
                chatMessages.scrollTop = chatMessages.scrollHeight;

                // Simple simulated response
                setTimeout(() => {
                    const aiMsg = document.createElement('div');
                    aiMsg.className = 'message ai';
                    aiMsg.textContent = "I'm a demo assistant for this portfolio. Sai can integrate me with a real LLM backend like LangChain or OpenAI soon!";
                    chatMessages.appendChild(aiMsg);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }
        };

        sendBtn.addEventListener('click', sendMessage);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    // Apply observer to specific reveal classes
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        observer.observe(el);
    });

    // 3D Tilt Hover Effect for Cards
    const tiltElements = document.querySelectorAll('.js-tilt');

    // Parallax logic for Skills Grid
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            skillsContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
    }

    const hireScroll = document.getElementById('hire-me-scroll');
    if (hireScroll) {
        hireScroll.addEventListener('click', (e) => {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Contact Grid Particles
    const contactCanvas = document.getElementById('contact-particles');
    if (contactCanvas) {
        const cCtx = contactCanvas.getContext('2d');
        contactCanvas.width = contactCanvas.offsetWidth;
        contactCanvas.height = contactCanvas.offsetHeight;

        let cParticles = [];
        for (let i = 0; i < 50; i++) {
            cParticles.push({
                x: Math.random() * contactCanvas.width,
                y: Math.random() * contactCanvas.height,
                size: Math.random() * 2 + 1,
                speedY: Math.random() * -1 - 0.5,
                opacity: Math.random() * 0.5 + 0.1
            });
        }

        function animateContactParticles() {
            cCtx.clearRect(0, 0, contactCanvas.width, contactCanvas.height);
            cParticles.forEach(p => {
                cCtx.fillStyle = `rgba(0, 217, 255, ${p.opacity})`;
                cCtx.beginPath();
                cCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                cCtx.fill();
                p.y += p.speedY;
                if (p.y < 0) {
                    p.y = contactCanvas.height;
                    p.x = Math.random() * contactCanvas.width;
                }
            });
            requestAnimationFrame(animateContactParticles);
        }
        animateContactParticles();

        window.addEventListener('resize', () => {
            contactCanvas.width = contactCanvas.offsetWidth;
            contactCanvas.height = contactCanvas.offsetHeight;
        });
    }

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // max rotation 10deg
            const rotateY = ((x - centerX) / centerX) * 10;

            el.style.transform = `perspective(1000px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            el.style.transition = 'none';
            // Update glare effect if we added one, optional
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) scale(1) rotateX(0) rotateY(0)';
            el.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    });

    // Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (cursorDot && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;

            // Add a slight delay for the follower
            setTimeout(() => {
                cursorFollower.style.left = `${e.clientX}px`;
                cursorFollower.style.top = `${e.clientY}px`;
            }, 50);
        });

        // Add hover effects for interactive elements
        const interactables = document.querySelectorAll('a, button, .js-tilt, .contact-item, input, textarea');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

    // Revolving Orbits Background Canvas
    (() => {
        const canvas = document.getElementById('bg-canvas');
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        // System Configuration
        const systemProps = {
            orbitCount: 6,         // Number of concentric rings
            baseRadius: 60,        // Starting distance from center
            gapSpacing: 90,        // Distance between orbits
            particlesPerOrbit: 10, // Objects revolving per ring
            coreGlow: '#06b6d4',   // Cyan core
            ringColor: 'rgba(124, 58, 237, 0.12)', // Faint purple rings
            spinOffset: 0
        };

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            init();
        }

        class PlanetParticle {
            constructor(orbitIndex) {
                this.orbitIndex = orbitIndex;
                this.baseRadius = systemProps.baseRadius + (orbitIndex * systemProps.gapSpacing);
                if (width > 1200) this.baseRadius *= 1.1;

                this.angle = Math.random() * Math.PI * 2;
                this.speed = (Math.random() * 0.0015 + 0.0008) / (orbitIndex + 1);
                if (Math.random() > 0.5) this.speed *= -1;

                this.size = Math.random() * 2 + 1;

                // 3D parameters: different tilt and phase for each orbit
                this.tilt = (Math.random() - 0.5) * 0.8; // Vertical tilt
                this.zPhase = Math.random() * Math.PI * 2;

                const hue = Math.random() > 0.5 ? 260 : 190;
                this.color = `hsl(${hue}, 80%, 70%)`;
            }

            update() {
                this.angle += this.speed;
            }

            draw() {
                let cx = width / 2;
                let cy = height / 2;

                if (window.mouseX) {
                    cx += (window.mouseX - width / 2) * 0.04;
                    cy += (window.mouseY - height / 2) * 0.04;
                }

                // 3D calculation
                const xBase = Math.cos(this.angle) * this.baseRadius;
                const zBase = Math.sin(this.angle) * this.baseRadius;

                // Perspective and Tilt
                const x = cx + xBase;
                const y = cy + zBase * this.tilt; // Compressed Y for tilt effect

                // Scale size based on "depth" (zBase could be used for fake perspective)
                const zScale = 1 + (zBase / this.baseRadius) * 0.3;
                const visualSize = this.size * zScale;

                ctx.beginPath();
                ctx.arc(x, y, visualSize, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = 0.4 + (zScale - 0.7) * 0.6; // Fade particles in back
                ctx.shadowBlur = 8 * zScale;
                ctx.shadowColor = this.color;
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1.0;
            }
        }

        function init() {
            particles = [];
            for (let i = 0; i < systemProps.orbitCount; i++) {
                for (let j = 0; j < systemProps.particlesPerOrbit; j++) {
                    particles.push(new PlanetParticle(i));
                }
            }
        }

        function drawRings() {
            let cx = width / 2;
            let cy = height / 2;

            if (window.mouseX) {
                cx += (window.mouseX - width / 2) * 0.04;
                cy += (window.mouseY - height / 2) * 0.04;
            }

            for (let i = 0; i < systemProps.orbitCount; i++) {
                let r = systemProps.baseRadius + (i * systemProps.gapSpacing);
                if (width > 1200) r *= 1.1;

                ctx.beginPath();
                ctx.ellipse(cx, cy, r, r * 0.3, (i * 15) * Math.PI / 180, 0, Math.PI * 2);
                ctx.strokeStyle = systemProps.ringColor;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Draw core glow
            let cx = width / 2;
            let cy = height / 2;
            if (window.mouseX) {
                cx += (window.mouseX - width / 2) * 0.04;
                cy += (window.mouseY - height / 2) * 0.04;
            }

            const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 150);
            grad.addColorStop(0, 'rgba(6, 182, 212, 0.15)');
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(cx, cy, 150, 0, Math.PI * 2);
            ctx.fill();

            drawRings();

            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }

        resize();
        animate();
        window.addEventListener('resize', resize);
    })();

    // Projects Stacked Scroll Effect
    const projectCards = document.querySelectorAll('.sticky-card');

    if (projectCards.length > 0) {
        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;

            projectCards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const topDist = rect.top;

                // sticky top defined as 15vh in CSS
                const stickPoint = windowHeight * 0.15;

                if (topDist <= stickPoint + 20) {
                    const nextCard = projectCards[index + 1];
                    if (nextCard) {
                        const nextRect = nextCard.getBoundingClientRect();
                        const distToNext = nextRect.top - topDist;

                        const startOverlap = windowHeight * 0.7;
                        if (distToNext < startOverlap) {
                            let progress = 1 - (distToNext / startOverlap);
                            progress = Math.max(0, Math.min(1, progress));

                            const scale = 1 - (progress * 0.05); // down to 0.95
                            const blur = progress * 5; // blur to 5px
                            const opacity = 1 - (progress * 0.4);

                            card.style.transform = `scale(${scale})`;
                            card.style.filter = `blur(${blur}px)`;
                            card.style.opacity = `${opacity}`;
                        } else {
                            card.style.transform = `scale(1)`;
                            card.style.filter = `blur(0px)`;
                            card.style.opacity = `1`;
                        }
                    } else {
                        card.style.transform = `scale(1)`;
                        card.style.filter = `blur(0px)`;
                        card.style.opacity = `1`;
                    }
                } else {
                    card.style.transform = `scale(1)`;
                    card.style.filter = `blur(0px)`;
                    card.style.opacity = `1`;
                }
            });
        });
    }
    // --- EmailJS Integration ---
    // Initialize EmailJS with Public Key
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS Public Key
    (function () {
        if (typeof emailjs !== 'undefined') {
            emailjs.init('lAPPMWG6NA8MwA7hW');
        }
    })();

    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // UI Feedback: Start sending
            submitBtn.classList.add('sending');
            submitBtn.disabled = true;
            formStatus.className = 'form-status';
            formStatus.textContent = '';
            formStatus.style.display = 'none';

            // EmailJS sendForm
            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs
            emailjs.sendForm('service_guln0rb', 'template_177ngrm', this)
                .then(() => {
                    // Success State
                    formStatus.textContent = 'Message sent successfully. I will get back to you soon.';
                    formStatus.classList.add('success');
                    contactForm.reset();

                    // Reset button after a delay
                    setTimeout(() => {
                        submitBtn.classList.remove('sending');
                        submitBtn.disabled = false;
                    }, 2000);
                }, (error) => {
                    // Error State
                    console.error('EmailJS Error:', error);
                    formStatus.textContent = 'Failed to send message. Please try again.';
                    formStatus.classList.add('error');

                    submitBtn.classList.remove('sending');
                    submitBtn.disabled = false;
                });
        });
    }


    // Mobile Navbar Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
});


