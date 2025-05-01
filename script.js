document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');
            
            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }
    
    // Sticky Navbar on Scroll
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Portfolio Filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'block';
                    } else if (item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Animation on Scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        animateElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementHeight = el.offsetHeight;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - elementHeight / 4) {
                el.classList.add('animate-in');
            }
        });
    }
    
    if (animateElements.length > 0) {
        window.addEventListener('scroll', checkScroll);
        checkScroll(); // Check on initial load
    }
    
    // Form Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let valid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            if (!nameInput.value.trim()) {
                valid = false;
                showError(nameInput, 'Name is required');
            } else {
                removeError(nameInput);
            }
            
            if (!emailInput.value.trim()) {
                valid = false;
                showError(emailInput, 'Email is required');
            } else if (!isValidEmail(emailInput.value)) {
                valid = false;
                showError(emailInput, 'Please enter a valid email');
            } else {
                removeError(emailInput);
            }
            
            if (!messageInput.value.trim()) {
                valid = false;
                showError(messageInput, 'Message is required');
            } else {
                removeError(messageInput);
            }
            
            if (valid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success';
                successMessage.innerText = 'Your message has been sent successfully!';
                
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
            }
        });
    }
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.innerText = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        
        input.className = 'form-control error';
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        input.className = 'form-control';
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Add active class to current page in navbar
    const currentLocation = location.pathname;
    const menuItems = document.querySelectorAll('.nav-links a');
    const menuLength = menuItems.length;
    
    for (let i = 0; i < menuLength; i++) {
        if (menuItems[i].getAttribute('href') === currentLocation || 
            (currentLocation === '/' && menuItems[i].getAttribute('href') === 'index.html') ||
            (menuItems[i].getAttribute('href') === 'index.html' && currentLocation === '/')) {
            menuItems[i].className = 'active';
        }
    }
});

// Burger menu animation
const toggleBurger = () => {
    const burger = document.querySelector('.burger');
    burger.classList.toggle('toggle');
};

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
