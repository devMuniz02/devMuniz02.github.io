document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initHamburgerMenu();
    initSmoothScrolling();
    initProjectFilters();
    initLightbox();
    initFormValidation();
    
    // Existing button functionality
    const button = document.querySelector('button[onclick="showAlert()"]');
    if (button) {
        button.addEventListener('click', function() {
            alert('Button was clicked!');
        });
    }
});

// Step 3: Navigation Menu Toggle
function toggleMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
}

function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', toggleMenu);
        
        // Close menu when clicking on nav links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        // Close menu on Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Step 3: Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for header height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Step 4: Project Filtering
function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });
    
    // Filter project cards with animation
    projectCards.forEach(card => {
        const cardCategory = card.dataset.category;
        
        if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden');
            setTimeout(() => {
                card.style.display = 'block';
            }, 10);
        } else {
            card.classList.add('hidden');
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.filter;
            filterProjects(category);
        });
    });
}

// Step 4: Lightbox Effect
function openLightbox(imageSrc, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    if (lightbox && lightboxImage) {
        lightboxImage.src = imageSrc;
        lightboxCaption.textContent = caption || '';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

function initLightbox() {
    const projectImages = document.querySelectorAll('.project-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightbox = document.getElementById('lightbox');
    
    // Add click listeners to project images
    projectImages.forEach(image => {
        image.addEventListener('click', function() {
            const caption = this.alt || this.closest('.project-card').querySelector('h3').textContent;
            openLightbox(this.src, caption);
        });
    });
    
    // Close lightbox events
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// Step 5: Form Validation
function validateField(field, validationRules) {
    const value = field.value.trim();
    const errorElement = document.getElementById(field.id + '-error');
    
    // Clear previous states
    field.classList.remove('error', 'success');
    if (errorElement) {
        errorElement.textContent = '';
    }
    
    // Run validation rules
    for (let rule of validationRules) {
        if (!rule.test(value)) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = rule.message;
            }
            return false;
        }
    }
    
    // If all validations pass
    field.classList.add('success');
    return true;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormFeedback(type, message) {
    const feedback = document.getElementById('form-feedback');
    
    if (feedback) {
        feedback.className = `form-feedback ${type}`;
        feedback.textContent = message;
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        if (type === 'success') {
            setTimeout(() => {
                feedback.style.display = 'none';
            }, 5000);
        }
    }
}

function initFormValidation() {
    const form = document.getElementById('contact-form');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    
    if (!form) return;
    
    // Validation rules
    const nameValidation = [
        {
            test: (value) => value.length >= 2,
            message: 'Name must be at least 2 characters long.'
        },
        {
            test: (value) => /^[a-zA-Z\s'-]+$/.test(value),
            message: 'Name can only contain letters, spaces, hyphens, and apostrophes.'
        }
    ];
    
    const emailValidation = [
        {
            test: (value) => value.length > 0,
            message: 'Email is required.'
        },
        {
            test: (value) => validateEmail(value),
            message: 'Please enter a valid email address.'
        }
    ];
    
    const messageValidation = [
        {
            test: (value) => value.length >= 10,
            message: 'Message must be at least 10 characters long.'
        },
        {
            test: (value) => value.length <= 500,
            message: 'Message must be less than 500 characters.'
        }
    ];
    
    // Real-time validation
    if (nameField) {
        nameField.addEventListener('blur', () => validateField(nameField, nameValidation));
        nameField.addEventListener('input', () => {
            if (nameField.classList.contains('error')) {
                validateField(nameField, nameValidation);
            }
        });
    }
    
    if (emailField) {
        emailField.addEventListener('blur', () => validateField(emailField, emailValidation));
        emailField.addEventListener('input', () => {
            if (emailField.classList.contains('error')) {
                validateField(emailField, emailValidation);
            }
        });
    }
    
    if (messageField) {
        messageField.addEventListener('blur', () => validateField(messageField, messageValidation));
        messageField.addEventListener('input', () => {
            if (messageField.classList.contains('error')) {
                validateField(messageField, messageValidation);
            }
        });
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateField(nameField, nameValidation);
        const isEmailValid = validateField(emailField, emailValidation);
        const isMessageValid = validateField(messageField, messageValidation);
        
        if (isNameValid && isEmailValid && isMessageValid) {
            // Simulate form submission
            showFormFeedback('success', 'Thank you for your message! I\'ll get back to you soon.');
            form.reset();
            
            // Remove success classes after reset
            setTimeout(() => {
                nameField.classList.remove('success');
                emailField.classList.remove('success');
                messageField.classList.remove('success');
            }, 100);
        } else {
            showFormFeedback('error', 'Please correct the errors above before submitting.');
        }
    });
}

// Global function for the onclick attribute
function showAlert() {
    alert('Button was clicked!');
}

// Export functions for external use
window.toggleMenu = toggleMenu;
window.filterProjects = filterProjects;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;