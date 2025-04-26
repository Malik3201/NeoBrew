// ===== MAIN JAVASCRIPT =====

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initScrollReveal();
    initTestimonialSlider();
    initScrollToTop();
    initParticles();
    initMenuCardInteractions();
    initContactForm();
});

// ===== NAVBAR FUNCTIONALITY =====
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Change navbar style on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== SCROLL REVEAL ANIMATION =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-element');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Check on initial load
    checkReveal();
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);
}

// ===== TESTIMONIAL SLIDER =====
function initTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentIndex = 0;
    
    // Create dots if they don't exist
    if (!dotsContainer.children.length) {
        testimonialCards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    const dots = document.querySelectorAll('.dot');
    
    // Function to update active slide
    function updateSlide() {
        testimonialCards.forEach((card, index) => {
            card.classList.remove('active');
            dots[index].classList.remove('active');
        });
        
        testimonialCards[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }
    
    // Function to go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSlide();
    }
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? testimonialCards.length - 1 : currentIndex - 1;
        updateSlide();
    });
    
    // Next button click
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === testimonialCards.length - 1) ? 0 : currentIndex + 1;
        updateSlide();
    });
    
    // Auto slide every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex === testimonialCards.length - 1) ? 0 : currentIndex + 1;
        updateSlide();
    }, 5000);
}

// ===== SCROLL TO TOP BUTTON =====
function initScrollToTop() {
    const scrollToTopBtn = document.createElement('div');
    scrollToTopBtn.classList.add('scroll-to-top');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== PARTICLES BACKGROUND ANIMATION =====
function initParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('particles-container');
    document.body.appendChild(particlesContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random particle styling
    const size = Math.random() * 5 + 1;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    // Apply styles
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background-color: rgba(0, 255, 255, ${Math.random() * 0.5 + 0.1});
        border-radius: 50%;
        top: ${posY}%;
        left: ${posX}%;
        animation: float ${duration}s ease-in-out ${delay}s infinite;
        box-shadow: 0 0 ${size * 2}px rgba(0, 255, 255, 0.3);
    `;
    
    container.appendChild(particle);
}

// Add float animation to stylesheet
function addParticleAnimation() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0);
            }
            25% {
                transform: translateY(-20px) translateX(10px);
            }
            50% {
                transform: translateY(-40px) translateX(0);
            }
            75% {
                transform: translateY(-20px) translateX(-10px);
            }
            100% {
                transform: translateY(0) translateX(0);
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

// ===== MENU CARD INTERACTIONS =====
function initMenuCardInteractions() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card from flipping back
            
            // Add success class
            this.classList.add('clicked');
            this.textContent = 'Added!';
            
            // Reset after animation
            setTimeout(() => {
                this.classList.remove('clicked');
                this.textContent = 'Add to Cart';
            }, 2000);
        });
    });
}

// ===== CONTACT FORM FUNCTIONALITY =====
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.submit-btn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            submitBtn.classList.add('success');
            
            // Reset form after animation
            setTimeout(() => {
                contactForm.reset();
                submitBtn.classList.remove('success');
                
                // Show success message
                const formMessage = document.createElement('div');
                formMessage.classList.add('form-message', 'success');
                formMessage.textContent = 'Message sent successfully!';
                contactForm.appendChild(formMessage);
                
                // Remove message after 3 seconds
                setTimeout(() => {
                    formMessage.remove();
                }, 3000);
            }, 2000);
        });
    }
    
    // Add floating label functionality
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Check if input has value on load
        if (input.value.trim() !== '') {
            input.classList.add('has-value');
        }
        
        // Check on input change
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
}

// Call particle animation creation
addParticleAnimation();

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Offset for navbar
                behavior: 'smooth'
            });
        }
    });
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add page transition class to body
document.body.classList.add('page-transitions');

// Add CSS for page transitions
const pageTransitionStyle = document.createElement('style');
pageTransitionStyle.textContent = `
    .page-transitions {
        opacity: 0;
        animation: fadeIn 1s ease forwards;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(pageTransitionStyle);