// Modern Portfolio JavaScript

(function() {
    'use strict';

    // ============ Navbar Scroll Effect ============
    const navbar = document.querySelector('.modern-navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // ============ Mobile Navigation Toggle ============
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // ============ Smooth Scroll for Navigation ============
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============ Particles.js Configuration ============
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#6C63FF'
                },
                shape: {
                    type: 'circle',
                },
                opacity: {
                    value: 0.5,
                    random: false,
                },
                size: {
                    value: 3,
                    random: true,
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#6C63FF',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // ============ Typing Animation ============
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const texts = [
            'Java Full-Stack Developer',
            'Python Full-Stack Developer',
            'Android Application Developer',
            'Flutter Developer',
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500; // Pause before next word
            }

            setTimeout(type, typingSpeed);
        }

        type();
    }

    // ============ AOS Animation Initialization ============
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 100
        });
    }

    // ============ Skills Progress Animation ============
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = progress + '%';
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // ============ Scroll to Top Button ============
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============ Contact Form Handling ============
    // Form submission is handled by FormSubmit.co - let it work naturally
    // No JavaScript interference needed

    // ============ Lightbox Configuration ============
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'albumLabel': 'Certificate %1 of %2'
        });
    }

    // ============ Scroll Reveal Animation ============
    const revealElements = document.querySelectorAll('.timeline-item, .cert-card, .project-card');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        revealObserver.observe(el);
    });

    // ============ Add Hover Effect to Cards ============
    const cards = document.querySelectorAll('.skill-card, .project-card, .cert-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
    });

    // ============ Preloader (Optional) ============
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // ============ Prevent Default Link Behavior ============
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });

    // ============ Dynamic Year for Footer ============
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
    }

    // ============ Calculate Work Duration Automatically ============
    function calculateDuration(startDate, endDate = null) {
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : new Date();
        
        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        
        if (months < 0) {
            years--;
            months += 12;
        }
        
        let durationText = '';
        if (years > 0) {
            durationText += years + (years === 1 ? ' yr ' : ' yrs ');
        }
        if (months > 0 || years === 0) {
            durationText += months + (months === 1 ? ' mo' : ' mos');
        }
        
        return durationText.trim();
    }

    function formatDateRange(startDate, endDate = null) {
        const start = new Date(startDate);
        const startMonth = start.toLocaleString('en-US', { month: 'short', year: 'numeric' });
        
        if (endDate) {
            const end = new Date(endDate);
            const endMonth = end.toLocaleString('en-US', { month: 'short', year: 'numeric' });
            return `${startMonth} - ${endMonth}`;
        } else {
            return `${startMonth} - Present`;
        }
    }

    // Update total duration at Zensar (from internship start to present)
    const totalDuration = document.getElementById('total-duration');
    if (totalDuration) {
        const duration = calculateDuration('2025-03-01'); // Started March 2025
        totalDuration.textContent = duration;
        
        // Update every day
        setInterval(() => {
            totalDuration.textContent = calculateDuration('2025-03-01');
        }, 86400000);
    }

    // Update full-time position duration (started Oct 2025)
    const fullTimeDuration = document.getElementById('fulltime-duration');
    if (fullTimeDuration) {
        const dateRange = formatDateRange('2025-10-01');
        const duration = calculateDuration('2025-10-01');
        fullTimeDuration.textContent = `${dateRange} · ${duration}`;
        
        // Update every day
        setInterval(() => {
            const dateRange = formatDateRange('2025-10-01');
            const duration = calculateDuration('2025-10-01');
            fullTimeDuration.textContent = `${dateRange} · ${duration}`;
        }, 86400000);
    }

})();
