// =====================
// MOBILE MENU TOGGLE
// =====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// =====================
// FORM SUBMISSION WITH VALIDATION
// =====================
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: contactForm.querySelector('input[type="text"]').value.trim(),
        email: contactForm.querySelector('input[type="email"]').value.trim(),
        phone: contactForm.querySelector('input[type="tel"]').value.trim(),
        product: contactForm.querySelector('select').value,
        message: contactForm.querySelector('textarea').value.trim()
    };

    // Validation
    if (!formData.name) {
        showNotification('Please enter your name', 'error');
        return;
    }

    if (!formData.email) {
        showNotification('Please enter your email address', 'error');
        return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    if (!formData.message) {
        showNotification('Please enter your message', 'error');
        return;
    }

    if (!formData.product) {
        showNotification('Please select a product', 'error');
        return;
    }

    // Log form data (in production, send to server)
    console.log('Form submitted:', formData);
    
    showNotification('✓ Thank you! Your message has been sent successfully. We will contact you soon.', 'success');
    contactForm.reset();
    
    // Add celebration animation
    addCelebrationAnimation();
});

// =====================
// NOTIFICATION SYSTEM
// =====================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add base styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '10px',
        fontSize: '1rem',
        fontWeight: '600',
        zIndex: '10000',
        animation: 'slideIn 0.4s ease-out',
        maxWidth: '400px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
    });

    // Set color and background based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #27ae60 0%, #229954 100%)';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
        notification.style.color = 'white';
    } else {
        notification.style.background = 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)';
        notification.style.color = 'white';
    }

    // Add animation styles if not already present
    if (!document.querySelector('style[data-notification]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Add to page
    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.4s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 5000);
}

// =====================
// CELEBRATION ANIMATION
// =====================
function addCelebrationAnimation() {
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = ['#667eea', '#764ba2', '#e74c3c', '#f093fb'][Math.floor(Math.random() * 4)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        // Animate confetti
        let y = 0;
        let x = 0;
        let velocityY = Math.random() * 5 + 3;
        let velocityX = (Math.random() - 0.5) * 8;
        
        const animateConfetti = () => {
            y += velocityY;
            x += velocityX;
            velocityY += 0.1; // gravity
            velocityX *= 0.99; // air resistance
            
            confetti.style.transform = `translate(${x}px, ${y}px) rotate(${y * 5}deg)`;
            confetti.style.opacity = Math.max(0, 1 - y / 500);
            
            if (y < 500) {
                requestAnimationFrame(animateConfetti);
            } else {
                confetti.remove();
            }
        };
        
        animateConfetti();
    }
}

// =====================
// SCROLL ANIMATIONS
// =====================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe animated elements
const animatedElements = document.querySelectorAll('.product-card, .feature-item, .gallery-item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// =====================
// ACTIVE NAV LINK HIGHLIGHTING
// =====================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
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

// Add active link styling if not already present
if (!document.querySelector('style[data-active-nav]')) {
    const style = document.createElement('style');
    style.setAttribute('data-active-nav', 'true');
    style.textContent = `
        .nav-link.active {
            color: #667eea !important;
        }
        
        .nav-link.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(style);
}

// =====================
// SMOOTH SCROLL ENHANCEMENT
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// =====================
// COUNTER ANIMATION
// =====================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// =====================
// KEYBOARD NAVIGATION
// =====================
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// =====================
// PREVENT UNWANTED SCROLLS
// =====================
let scrollPosition = 0;

function disableScroll() {
    scrollPosition = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
}

function enableScroll() {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPosition);
}

// =====================
// DYNAMIC YEAR IN FOOTER
// =====================
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2024', currentYear);
    }
});

// =====================
// PERFORMANCE MONITORING
// =====================
window.addEventListener('load', () => {
    // Log page load time
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`MS Brothers - Page loaded in ${pageLoadTime}ms`);
});

// =====================
// PAGE VISIBILITY API
// =====================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('User left MS Brothers website');
    } else {
        console.log('User returned to MS Brothers website');
    }
});

// =====================
// BLUR EFFECT ON SCROLL
// =====================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
    } else {
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
    }
});

// =====================
// INITIALIZATION
// =====================
console.log('🔧 MS Brothers Website - Premium Motorcycle Parts Manufacturer');
console.log('📍 Location: Rachna Town, Ferozewala');
console.log('✨ JavaScript loaded successfully!');