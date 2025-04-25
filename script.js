// Custom cursor
const cursor = document.querySelector('.cursor');
let cursorEnlarged = false;

const updateCursorPosition = (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
};

const enlargeCursor = () => {
    if (!cursorEnlarged) {
        cursor.style.width = '50px';
        cursor.style.height = '50px';
        cursorEnlarged = true;
    }
};

const resetCursor = () => {
    if (cursorEnlarged) {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursorEnlarged = false;
    }
};

document.addEventListener('mousemove', updateCursorPosition);

// Apply cursor effects to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .testimonial-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', enlargeCursor);
    el.addEventListener('mouseleave', resetCursor);
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Dropdown toggle for mobile
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// Project filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .testimonial-card, .section-title, .cta-section h2, .cta-btn.large');
    
    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            el.classList.add('fade-in-up');
        }
    });
};

// Initial check for elements in view
animateOnScroll();

// Check for elements in view on scroll
window.addEventListener('scroll', animateOnScroll);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        }
    });
});

// Header scroll effect
const header = document.querySelector('header');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        header.style.padding = '1rem 5%';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.padding = '1.5rem 5%';
        header.style.boxShadow = 'none';
    }
    
    lastScrollY = currentScrollY;
});

// Parallax effect for hero image
const heroImage = document.querySelector('.image-container img');
const decorativeElements = document.querySelectorAll('.decorative-element');

window.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) / 50;
    const moveY = (e.clientY - window.innerHeight / 2) / 50;
    
    heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
    
    decorativeElements.forEach(el => {
        const speed = el.classList.contains('star') ? 2 : 
                     el.classList.contains('circle') ? 1.5 : 1;
        
        el.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
    });
});

// Preloader animation
window.addEventListener('load', () => {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="loader">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
        </div>
    `;
    
    document.body.appendChild(preloader);
    
    // Add styles for preloader
    const style = document.createElement('style');
    style.textContent = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        
        .loader {
            display: flex;
            gap: 10px;
        }
        
        .loader .circle {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: black;
            animation: pulse 1.5s ease-in-out infinite;
        }
        
        .loader .circle:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .loader .circle:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(0.5);
                opacity: 0.5;
            }
            50% {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // Remove preloader after a delay
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1500);
});