// ===== UTILITY FUNCTIONS =====

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navbar scroll effect
function initNavbarScrollEffect() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll progress indicator
function initScrollProgress() {
    window.addEventListener('scroll', () => {
        const scrollProgress = document.querySelector('.scroll-progress');
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====

// Intersection Observer for fade-in animations
function initFadeInAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Animate skill bars when they come into view
function initSkillBarAnimations() {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
        });
    }, { threshold: 0.5 });

    // Observe skill categories for animation
    document.querySelectorAll('.skill-category').forEach(category => {
        skillObserver.observe(category);
    });
}

// ===== ACTIVE NAVIGATION HIGHLIGHTING =====

function initActiveNavigation() {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== INTERACTIVE HOVER EFFECTS =====

function initHoverEffects() {
    // Add hover effects to cards
    document.querySelectorAll('.project-card, .skill-category, .stat-card, .publication-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===== RESUME DOWNLOAD FUNCTIONALITY =====

function downloadResume() {
    // Create a temporary link element
    const link = document.createElement('a');
    
    // Set the href to your actual resume file path
    link.href = 'assets/documents/Jyotsana_Parkhedkar_Resume.pdf';
    link.download = 'Jyotsana_Parkhedkar_Resume.pdf';
    
    // Check if the file exists, if not show alert
    fetch(link.href)
        .then(response => {
            if (response.ok) {
                // File exists, proceed with download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                // File doesn't exist, show alert
                alert('Resume file not found. Please add your resume PDF to the assets/documents/ folder and update the file path.');
            }
        })
        .catch(() => {
            // Error fetching file, show alert with instructions
            alert('Resume download functionality:\n\n1. Add your resume PDF to: assets/documents/Jyotsana_Parkhedkar_Resume.pdf\n2. The download will work automatically once the file is added.\n\nFor now, please contact me directly at jyotsanaparkhedkar266@gmail.com');
        });
}

// ===== MOBILE MENU FUNCTIONALITY =====

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle hamburger icon
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// ===== TYPING EFFECT FOR HERO SUBTITLE =====

function initTypingEffect() {
    const subtitle = document.querySelector('.hero-content .subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.opacity = '1';
        
        let index = 0;
        const typeSpeed = 100;
        
        function typeWriter() {
            if (index < text.length) {
                subtitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, typeSpeed);
            }
        }
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }
}

// ===== CONTACT FORM HANDLING (if you add a contact form later) =====

function initContactForm() {
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message (you can replace this with actual form handling)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
}

// ===== SCROLL TO TOP FUNCTIONALITY =====

function initScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--gradient);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1.2rem;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.transform = 'translateY(0)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.transform = 'translateY(10px)';
        }
    });
    
    // Scroll to top when clicked
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== PERFORMANCE OPTIMIZATION =====

function initLazyLoading() {
    // Lazy load images when they come into view
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== THEME SWITCHING (Optional) =====

function initThemeToggle() {
    const themeToggle = document.querySelector('#theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }
}

// ===== ANALYTICS TRACKING =====

function trackPageView() {
    // Add your analytics tracking code here
    // Example: Google Analytics, Facebook Pixel, etc.
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
}

function trackUserInteractions() {
    // Track button clicks
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const buttonText = e.target.textContent || e.target.innerText;
            console.log(`Button clicked: ${buttonText}`);
            
            // Add your analytics tracking here
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'Button',
                    event_label: buttonText
                });
            }
        });
    });
    
    // Track external links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const linkUrl = e.target.href;
            console.log(`External link clicked: ${linkUrl}`);
            
            // Add your analytics tracking here
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'External Link',
                    event_label: linkUrl
                });
            }
        });
    });
}

// ===== INITIALIZATION =====

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio website loaded successfully!');
    
    // Core functionality
    initSmoothScrolling();
    initNavbarScrollEffect();
    initScrollProgress();
    initFadeInAnimations();
    initSkillBarAnimations();
    initActiveNavigation();
    initHoverEffects();
    initMobileMenu();
    
    // Enhanced features
    initScrollToTop();
    initLazyLoading();
    initThemeToggle();
    
    // Analytics
    trackPageView();
    trackUserInteractions();
    
    // Optional: Add typing effect to hero subtitle
    // initTypingEffect();
    
    // Contact form (if you add one later)
    initContactForm();
});

// Handle window resize
window.addEventListener('resize', function() {
    // Recalculate any position-dependent elements
    console.log('Window resized');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
        trackPageView();
    }
});

// ===== EXPORT FUNCTIONS (if using modules) =====

// Uncomment if you're using ES6 modules
/*
export {
    downloadResume,
    initSmoothScrolling,
    initNavbarScrollEffect,
    initScrollProgress,
    initFadeInAnimations,
    initSkillBarAnimations
};
*/