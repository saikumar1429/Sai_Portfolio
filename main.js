window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 800);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // --- Lenis Smooth Scroll Initialization ---
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Synchronize Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const navToggle = document.getElementById('nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        if (navToggle && navLinks && navLinks.classList.contains('active')) {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
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


    // Apply observer to specific reveal classes
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        observer.observe(el);
    });

    // Modern Glow BG Parallax
    const glowBg = document.querySelector('.modern-glow-bg');
    if (glowBg) {
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
            glowBg.style.transform = `translate(${moveX}px, ${moveY}px)`;
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
        const interactables = document.querySelectorAll('a, button, .contact-item, input, textarea');
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

    // --- Awwwards-Style GSAP Projects Stacked Scroll ---
    const projectSection = document.querySelector('.projects-section');
    const projectCards = gsap.utils.toArray('.sticky-card');

    if (projectSection && projectCards.length > 0) {
        gsap.registerPlugin(ScrollTrigger);

        let mm = gsap.matchMedia();

        mm.add("(min-width: 1025px)", () => {
            // Initial setup for desktop
            projectCards.forEach((card, i) => {
                gsap.set(card, {
                    yPercent: i === 0 ? 0 : 100, // Cards start below except first
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                    transformPerspective: 1000
                });

                // --- Premium Hover Tilt Effect ---
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -5;
                    const rotateY = ((x - centerX) / centerX) * 5;

                    gsap.to(card, {
                        rotateX: rotateX,
                        rotateY: rotateY,
                        duration: 0.5,
                        ease: "power2.out"
                    });

                    // Subtle inner image shift
                    const img = card.querySelector('.project-image img');
                    if (img) {
                        gsap.to(img, {
                            x: (x - centerX) * 0.05,
                            y: (y - centerY) * 0.05,
                            duration: 0.5,
                            ease: "power2.out"
                        });
                    }
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        rotateX: 0,
                        rotateY: 0,
                        duration: 0.5,
                        ease: "power2.out"
                    });

                    const img = card.querySelector('.project-image img');
                    if (img) {
                        gsap.to(img, {
                            x: 0,
                            y: 0,
                            duration: 0.5,
                            ease: "power2.out"
                        });
                    }
                });
            });

            const mainTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: projectSection,
                    start: "top top",
                    end: `+=${projectCards.length * 100}%`, // Reduced from 150% for tighter scroll
                    pin: true,
                    pinSpacing: true,
                    scrub: 1, // Balanced scrub
                    anticipatePin: 1,
                    invalidateOnRefresh: true
                }
            });

            projectCards.forEach((card, i) => {
                if (i < projectCards.length - 1) {
                    const nextCard = projectCards[i + 1];

                    // --- Transition to Next Card ---
                    
                    // 1. Move ALL previous cards down further in scale and blur
                    for (let j = 0; j <= i; j++) {
                        const prevCard = projectCards[j];
                        const isDirectPrev = j === i;
                        
                        mainTimeline.to(prevCard, {
                            scale: isDirectPrev ? 0.92 : 0.85,
                            filter: isDirectPrev ? "blur(5px)" : "blur(12px)",
                            opacity: isDirectPrev ? 0.6 : 0.3,
                            rotationX: -10,
                            y: -30 * (i - j + 1), // Progressive upward shift
                            duration: 1,
                            ease: "power2.inOut"
                        }, i);
                    }

                    // 2. Slide next card UP on top
                    mainTimeline.to(nextCard, {
                        yPercent: 0,
                        duration: 1,
                        ease: "power2.inOut"
                    }, i);

                    // 3. Image parallax for next card as it enters
                    const nextImg = nextCard.querySelector('.project-image img');
                    if (nextImg) {
                        mainTimeline.fromTo(nextImg, 
                            { y: -100, scale: 1.2 },
                            { y: 0, scale: 1.1, duration: 1, ease: "none" }, 
                            i
                        );
                    }
                }
            });

            return () => {
                // Pre-cleanup if needed (matchMedia does most of it)
                gsap.set(projectCards, { clearProps: "all" });
            };
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


