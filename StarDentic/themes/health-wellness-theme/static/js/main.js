// Complete JavaScript for Health & Wellness Theme

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initFAQ();
    initSmoothScrolling();
    initForms();
    initTestimonialSlider();
    initLazyLoading();
    initSearch();
    initScrollAnimations();
    initScrollToTop();
    initDropdownMenus();
    initTOC();
    initContactMap();
    
    // Initialize sticky header
    window.addEventListener('scroll', handleScroll);
});

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navigation = document.querySelector('.main-navigation');
    
    if (menuToggle && navigation) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navigation.classList.toggle('mobile-active');
            
            // Animate hamburger menu
            const spans = this.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (this.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navigation.contains(e.target)) {
                menuToggle.classList.remove('active');
                navigation.classList.remove('mobile-active');
                
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
    }
}

// Dropdown Menus
function initDropdownMenus() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        // Mobile dropdown behavior
        if (window.innerWidth <= 768) {
            dropdown.addEventListener('click', function(e) {
                e.preventDefault();
                this.classList.toggle('active');
            });
        }
    });
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Handling
function initForms() {
    // Appointment Forms
    const appointmentForms = document.querySelectorAll('.appointment-form form, .quick-booking-form');
    appointmentForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAppointmentSubmission(this);
        });
    });
    
    // Contact Form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactSubmission(this);
        });
    }
    
    // Newsletter Forms
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSubmission(this);
        });
    });
    
    // Search Forms
    const searchForms = document.querySelectorAll('.search-form');
    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSearch(this);
        });
    });
    
    // Form validation
    initFormValidation();
}

// Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }
    }
    
    // Update field appearance
    if (isValid) {
        field.classList.remove('error');
        removeErrorMessage(field);
    } else {
        field.classList.add('error');
        showErrorMessage(field, errorMessage);
    }
    
    return isValid;
}

function showErrorMessage(field, message) {
    removeErrorMessage(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function removeErrorMessage(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Handle Appointment Form Submission
function handleAppointmentSubmission(form) {
    if (!validateForm(form)) return;
    
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Booking...';
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate API call (replace with actual endpoint)
    fetch('/api/appointments', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        showNotification('Appointment booked successfully! We will contact you soon.', 'success');
        form.reset();
    })
    .catch(error => {
        showNotification('Sorry, there was an error booking your appointment. Please try again.', 'error');
    })
    .finally(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    });
}

// Handle Contact Form Submission
function handleContactSubmission(form) {
    if (!validateForm(form)) return;
    
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate API call
    fetch('/api/contact', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        showNotification('Message sent successfully! We will get back to you soon.', 'success');
        form.reset();
    })
    .catch(error => {
        showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
    })
    .finally(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    });
}

// Handle Newsletter Subscription
function handleNewsletterSubmission(form) {
    const email = form.querySelector('input[type="email"]').value;
    
    if (validateEmail(email)) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
    } else {
        showNotification('Please enter a valid email address.', 'error');
    }
}

// Handle Search
function handleSearch(form) {
    const query = form.querySelector('input[name="q"]').value;
    
    if (query.trim()) {
        // Redirect to search results page
        window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
}

// Validate entire form
function validateForm(form) {
    const requiredFields = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Testimonial Slider
function initTestimonialSlider() {
    const sliders = document.querySelectorAll('.testimonials-slider');
    
    sliders.forEach(slider => {
        const cards = slider.querySelectorAll('.testimonial-card');
        if (cards.length <= 1) return;
        
        let currentIndex = 0;
        
        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        
        cards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        slider.parentNode.appendChild(dotsContainer);
        
        function goToSlide(index) {
            cards[currentIndex].style.display = 'none';
            document.querySelector('.slider-dot.active').classList.remove('active');
            
            currentIndex = index;
            cards[currentIndex].style.display = 'block';
            dotsContainer.children[currentIndex].classList.add('active');
        }
        
        // Hide all cards except first
        cards.forEach((card, index) => {
            if (index !== 0) card.style.display = 'none';
        });
        
        // Auto-rotate
        setInterval(() => {
            const nextIndex = (currentIndex + 1) % cards.length;
            goToSlide(nextIndex);
        }, 5000);
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Search Functionality
function initSearch() {
    const searchInputs = document.querySelectorAll('.search-form input[type="search"]');
    
    searchInputs.forEach(input => {
        let searchTimeout;
        
        input.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value;
            
            if (query.length > 2) {
                searchTimeout = setTimeout(() => {
                    showSearchSuggestions(query, this);
                }, 300);
            } else {
                hideSearchSuggestions(this);
            }
        });
        
        // Hide suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!input.contains(e.target)) {
                hideSearchSuggestions(input);
            }
        });
    });
}

// Show Search Suggestions
function showSearchSuggestions(query, input) {
    // Sample suggestions - replace with actual search API
    const suggestions = [
        'Dental Cleaning',
        'Teeth Whitening',
        'Root Canal',
        'Dental Implants',
        'Orthodontics',
        'Pediatric Dentistry'
    ].filter(item => item.toLowerCase().includes(query.toLowerCase()));
    
    if (suggestions.length === 0) return;
    
    hideSearchSuggestions(input);
    
    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.className = 'search-suggestions';
    
    suggestions.forEach(suggestion => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        suggestionItem.textContent = suggestion;
        suggestionItem.addEventListener('click', () => {
            input.value = suggestion;
            hideSearchSuggestions(input);
            input.closest('form').dispatchEvent(new Event('submit'));
        });
        suggestionsDiv.appendChild(suggestionItem);
    });
    
    input.parentNode.style.position = 'relative';
    input.parentNode.appendChild(suggestionsDiv);
}

// Hide Search Suggestions
function hideSearchSuggestions(input) {
    const existingSuggestions = input.parentNode.querySelector('.search-suggestions');
    if (existingSuggestions) {
        existingSuggestions.remove();
    }
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .team-card, .news-card, .post-card, .feature-card');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => observer.observe(el));
    }
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(scrollToTopBtn);
}

// Table of Contents
function initTOC() {
    const tocContainer = document.querySelector('.toc-content');
    const contentArea = document.querySelector('.post-content, .service-article');
    
    if (tocContainer && contentArea) {
        const headings = contentArea.querySelectorAll('h2, h3, h4');
        
        if (headings.length > 0) {
            const tocList = document.createElement('ul');
            
            headings.forEach((heading, index) => {
                // Add ID to heading if it doesn't have one
                if (!heading.id) {
                    heading.id = `heading-${index}`;
                }
                
                const tocItem = document.createElement('li');
                const tocLink = document.createElement('a');
                tocLink.href = `#${heading.id}`;
                tocLink.textContent = heading.textContent;
                tocLink.className = `toc-${heading.tagName.toLowerCase()}`;
                
                tocItem.appendChild(tocLink);
                tocList.appendChild(tocItem);
            });
            
            tocContainer.appendChild(tocList);
        } else {
            // Hide TOC if no headings
            tocContainer.closest('.sidebar-widget').style.display = 'none';
        }
    }
}

// Contact Map Integration
function initContactMap() {
    const mapContainer = document.querySelector('.map-placeholder');
    if (mapContainer) {
        // Add click handler for better mobile experience
        mapContainer.addEventListener('click', function() {
            // Enable map interaction on click for mobile
            this.style.pointerEvents = 'auto';
        });
    }
}

// Sticky Header on Scroll
function handleScroll() {
    const header = document.querySelector('.main-header');
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        if (scrollToTopBtn) scrollToTopBtn.classList.add('visible');
    } else {
        header.classList.remove('scrolled');
        if (scrollToTopBtn) scrollToTopBtn.classList.remove('visible');
    }
}

// Utility Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        border-radius: 5px;
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Add CSS for animations and components
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .main-header.scrolled {
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        background: rgba(255,255,255,0.95);
        backdrop-filter: blur(10px);
    }
    
    .mobile-menu-toggle span {
        transition: all 0.3s ease;
    }
    
    .main-navigation.mobile-active {
        display: block !important;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        padding: 20px;
    }
    
    @media (max-width: 768px) {
        .main-navigation {
            display: none;
        }
        
        .main-navigation.mobile-active .nav-menu {
            flex-direction: column;
            gap: 0;
        }
        
        .main-navigation.mobile-active .nav-menu li {
            margin: 0;
            border-bottom: 1px solid #eee;
        }
        
        .main-navigation.mobile-active .nav-menu a {
            display: block;
            padding: 15px 0;
        }
    }
    
    .search-suggestions {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #ddd;
        border-top: none;
        border-radius: 0 0 5px 5px;
        max-height: 200px;
        overflow-y: auto;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    .suggestion-item {
        padding: 10px 15px;
        cursor: pointer;
        border-bottom: 1px solid #eee;
        transition: background 0.3s ease;
    }
    
    .suggestion-item:hover {
        background: #f8f9fa;
    }
    
    .suggestion-item:last-child {
        border-bottom: none;
    }
    
    .slider-dots {
        text-align: center;
        margin-top: 30px;
    }
    
    .slider-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: none;
        background: #ddd;
        margin: 0 5px;
        cursor: pointer;
        transition: background 0.3s ease;
    }
    
    .slider-dot.active {
        background: #007bff;
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: 15px;
        padding: 0;
        font-size: 1rem;
    }
    
    .field-error {
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 5px;
    }
    
    .form-group input.error,
    .form-group textarea.error,
    .form-group select.error {
        border-color: #dc3545;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
    
    .toc-h2 { font-weight: 600; }
    .toc-h3 { padding-left: 15px; font-size: 0.9rem; }
    .toc-h4 { padding-left: 30px; font-size: 0.85rem; }
`;
document.head.appendChild(style);

// Initialize theme switcher (optional)
function initThemeSwitcher() {
    const themeSwitcher = document.querySelector('.theme-switcher');
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Replace direct scroll event with debounced version
window.removeEventListener('scroll', handleScroll);
window.addEventListener('scroll', debounce(handleScroll, 10));