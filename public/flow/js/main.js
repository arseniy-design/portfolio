// Flow Consulting Landing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Hero Rotating Words
    const heroRotate = document.getElementById('heroRotate');
    if (heroRotate) {
        const words = ['clarity.', 'momentum.', 'leverage.', 'systems that last.'];
        let currentIndex = 0;

        // Create initial word
        function createWord(text) {
            const span = document.createElement('span');
            span.className = 'rotate-word';
            span.textContent = text;
            return span;
        }

        // Initialize first word
        const firstWord = createWord(words[0]);
        firstWord.classList.add('active');
        heroRotate.appendChild(firstWord);

        setInterval(() => {
            const current = heroRotate.querySelector('.rotate-word.active');
            if (current) {
                current.classList.remove('active');
                current.classList.add('exit');
                setTimeout(() => current.remove(), 400);
            }

            currentIndex = (currentIndex + 1) % words.length;
            const newWord = createWord(words[currentIndex]);
            heroRotate.appendChild(newWord);
            // Trigger reflow
            newWord.offsetHeight;
            newWord.classList.add('active');
        }, 2800);
    }

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth Scrolling for Navigation Links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    let scrolled = false;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 50 && !scrolled) {
            navbar.style.backgroundColor = 'rgba(30, 58, 138, 0.95)';
            scrolled = true;
        } else if (scrollTop <= 50 && scrolled) {
            navbar.style.backgroundColor = 'transparent';
            scrolled = false;
        }
    });

    // Intersection Observer for Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .client-segment, .feature-item, .stat-item');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Contact Form Handling
    const contactForm = document.getElementById('consultationForm');
    if (contactForm) {
        // Set the correct redirect URL dynamically
        const nextInput = contactForm.querySelector('input[name="_next"]');
        if (nextInput) {
            nextInput.value = window.location.origin + '/thank-you.html';
        }

        contactForm.addEventListener('submit', function(e) {
            // Get form data for validation
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Validate form
            if (!validateForm(formObject)) {
                e.preventDefault();
                return false;
            }

            // Show sending state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Let the form submit normally - it will redirect to thank-you.html
        });
    }

    // Form Validation
    function validateForm(data) {
        const requiredFields = ['name', 'email', 'service', 'organization', 'message'];
        const errors = [];

        requiredFields.forEach(field => {
            if (!data[field] || data[field].trim() === '') {
                errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
            }
        });

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (data.email && !emailRegex.test(data.email)) {
            errors.push('Please enter a valid email address');
        }

        if (errors.length > 0) {
            showNotification(errors.join('<br>'), 'error');
            return false;
        }

        return true;
    }



    // Notification System
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-family: var(--font-primary, 'Inter', sans-serif);
            line-height: 1.5;
        `;

        // Type-specific styling
        if (type === 'success') {
            notification.style.backgroundColor = '#10b981';
            notification.style.color = 'white';
        } else if (type === 'error') {
            notification.style.backgroundColor = '#ef4444';
            notification.style.color = 'white';
        } else {
            notification.style.backgroundColor = '#3b82f6';
            notification.style.color = 'white';
        }

        // Style notification content
        const notificationContent = notification.querySelector('.notification-content');
        notificationContent.style.cssText = `
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 15px;
        `;

        // Style close button
        const closeButton = notification.querySelector('.notification-close');
        closeButton.style.cssText = `
            background: none;
            border: none;
            color: inherit;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            line-height: 1;
            opacity: 0.8;
            transition: opacity 0.2s ease;
        `;

        // Add to document
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close functionality
        closeButton.addEventListener('click', () => {
            closeNotification(notification);
        });

        // Auto close after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                closeNotification(notification);
            }
        }, 5000);
    }

    function closeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Counter Animation for Stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-item h3');
        
        counters.forEach(counter => {
            const originalText = counter.textContent;
            const target = parseInt(originalText.replace(/\D/g, ''));
            const suffix = originalText.replace(/\d/g, '');
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, 40);
        });
    }

    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // Dynamic Flow Animation (removed - replaced with typographic hero)

    // Service Card Hover Effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Parallax Effect for Hero Section (simplified)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
            heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
    });

    // Add loading animation classes to CSS
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.8s ease forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .service-card,
        .client-segment,
        .feature-item,
        .stat-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        
        .notification-close:hover {
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(style);

    // Console greeting
    console.log('%cWelcome to flow! 🌊', 'color: #0891b2; font-size: 16px; font-weight: bold;');
    console.log('%cFlow Strategy • Flow Operations • Flow AI', 'color: #0891b2; font-size: 14px;');
    console.log('%cInterested in our services? Contact us at arseniygoldberg1@gmail.com', 'color: #64748b; font-size: 14px;');
});