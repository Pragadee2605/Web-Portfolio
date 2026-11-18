(function() {
    'use strict';

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

        let current = '';
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 120)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.startsWith('#') && href.slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    if (navToggle && navMenu) {
        const closeMenu = () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Open navigation menu');
        };

        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navMenu.classList.toggle('active');
            navToggle.classList.toggle('active', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
            navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && navbar && !navbar.contains(e.target)) {
                closeMenu();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
                navToggle.focus();
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') {
                e.preventDefault();
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = navbar ? navbar.offsetHeight : 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

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

    const yearElement = document.getElementById('footer-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    const startDate = new Date(2025, 2, 1);
    const totalDuration = document.getElementById('total-duration');
    const fullTimeDuration = document.getElementById('fulltime-duration');

    function updateExperienceDuration() {
        const now = new Date();
        const startLabel = startDate.toLocaleString('en-US', { month: 'short', year: 'numeric' });
        const monthsWorked = (now.getFullYear() - startDate.getFullYear()) * 12
            + now.getMonth() - startDate.getMonth();
        const years = Math.floor(monthsWorked / 12);
        const months = monthsWorked % 12;
        const duration = [
            years ? `${years} yr${years === 1 ? '' : 's'}` : '',
            months || !years ? `${months} mo${months === 1 ? '' : 's'}` : ''
        ].filter(Boolean).join(' ');

        if (totalDuration) {
            totalDuration.textContent = duration;
        }
        if (fullTimeDuration) {
            fullTimeDuration.textContent = `${startLabel} - Present · ${duration}`;
        }
    }

    updateExperienceDuration();
    setInterval(updateExperienceDuration, 86400000);

})();
