// Initialize AOS (Animate On Scroll) library
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with custom settings
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        delay: 100
    });

    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Enhanced card interactions
    initializeCardInteractions();
    
    // Add loading animation
    addLoadingAnimation();
    
    // Initialize button click effects
    initializeButtonEffects();
    
    // Add parallax effect to header
    initializeParallaxEffect();
    
    // Add typing animation to title
    initializeTypingAnimation();
});

// Card interaction enhancements
function initializeCardInteractions() {
    const cards = document.querySelectorAll('.task-card');
    
    cards.forEach((card, index) => {
        // Add stagger animation delay
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            
            // Add glow effect
            this.style.boxShadow = `
                0 20px 40px rgba(45, 90, 39, 0.2),
                0 0 20px rgba(127, 176, 105, 0.3)
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 20px rgba(45, 90, 39, 0.1)';
        });
        
        // Add click ripple effect
        card.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
}

// Create ripple effect on click
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(127, 176, 105, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add CSS for ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Loading animation
function addLoadingAnimation() {
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        body.style.opacity = '1';
    }, 100);
}

// Button click effects
function initializeButtonEffects() {
    const buttons = document.querySelectorAll('.btn, .freelance-link');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Create sparkle effect for download buttons
            if (this.classList.contains('btn-secondary') || this.href.includes('.pdf') || this.href.includes('.docx')) {
                createSparkleEffect(e, this);
            }
        });
        
        // Enhanced hover effects
        button.addEventListener('mouseenter', function() {
            if (this.classList.contains('btn-primary')) {
                this.style.background = 'linear-gradient(135deg, #4a7c59, #7fb069)';
            } else if (this.classList.contains('btn-secondary')) {
                this.style.background = 'linear-gradient(135deg, #a7c957, #7fb069)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (this.classList.contains('btn-primary')) {
                this.style.background = '';
            } else if (this.classList.contains('btn-secondary')) {
                this.style.background = '';
            }
        });
    });
}

// Create sparkle effect for special buttons
function createSparkleEffect(event, element) {
    const sparkles = 6;
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < sparkles; i++) {
        const sparkle = document.createElement('div');
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        sparkle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: #ffd700;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: sparkle 0.8s ease-out forwards;
        `;
        
        // Random direction for each sparkle
        const angle = (360 / sparkles) * i;
        const distance = 30 + Math.random() * 20;
        sparkle.style.setProperty('--angle', `${angle}deg`);
        sparkle.style.setProperty('--distance', `${distance}px`);
        
        element.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 800);
    }
}

// Add sparkle animation CSS
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(
                calc(cos(var(--angle)) * var(--distance)),
                calc(sin(var(--angle)) * var(--distance))
            ) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Parallax effect for header
function initializeParallaxEffect() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (header) {
            header.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Typing animation for main title
function initializeTypingAnimation() {
    const title = document.querySelector('.main-title');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    title.style.borderRight = '3px solid white';
    title.style.animation = 'blink 1s infinite';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                title.style.borderRight = 'none';
                title.style.animation = 'none';
            }, 1000);
        }
    };
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// Add blinking cursor animation
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    @keyframes blink {
        0%, 50% { border-color: white; }
        51%, 100% { border-color: transparent; }
    }
`;
document.head.appendChild(cursorStyle);

// Smooth scroll to sections (if needed for future navigation)
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add floating animation to task icons
function addFloatingAnimation() {
    const icons = document.querySelectorAll('.task-icon');
    
    icons.forEach((icon, index) => {
        icon.style.animation = `float 3s ease-in-out infinite`;
        icon.style.animationDelay = `${index * 0.5}s`;
    });
}

// Initialize floating animation after page load
window.addEventListener('load', () => {
    addFloatingAnimation();
});

// Add intersection observer for enhanced animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all task cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.task-card');
    cards.forEach(card => {
        observer.observe(card);
    });
});

// Add enhanced animation styles
const enhancedAnimationStyle = document.createElement('style');
enhancedAnimationStyle.textContent = `
    .animate-in {
        animation: slideInUp 0.8s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-8px);
        }
    }
`;
document.head.appendChild(enhancedAnimationStyle);

// Add performance optimization
function optimizePerformance() {
    // Debounce scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        // Update parallax and other scroll-based effects here
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
}

// Initialize performance optimizations
optimizePerformance();

// Add error handling for missing elements
function safeQuerySelector(selector, callback) {
    const element = document.querySelector(selector);
    if (element && typeof callback === 'function') {
        callback(element);
    }
}

// Console welcome message
console.log(`
🌿 Welcome to the Professional Portfolio Website!
✨ Built with natural colors and smooth animations
🚀 Optimized for performance and accessibility
`);

// Export functions for potential future use
window.portfolioWebsite = {
    smoothScrollTo,
    createRippleEffect,
    createSparkleEffect
};

