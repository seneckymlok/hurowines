// ================================
// HURO Winery - Production JavaScript
// Optimized for Performance & Quality
// ================================

// === NAVBAR SCROLL EFFECT ===
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (navbar && !navbar.classList.contains('scrolled')) {
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    }, { passive: true });
}

// === MOBILE MENU TOGGLE ===
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// === SMOOTH SCROLL FOR ANCHOR LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Only prevent default if it's not just "#"
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// === INTERSECTION OBSERVER FOR FADE-UP ANIMATIONS ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after animation to improve performance
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-up elements
const fadeElements = document.querySelectorAll('.fade-up, .fade-up-delay, .fade-up-delay-2, .fade-up-delay-3');
fadeElements.forEach(el => fadeObserver.observe(el));

// === NEWSLETTER FORM SUBMISSION ===
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitButton = newsletterForm.querySelector('button[type="submit"]');
        const email = emailInput.value.trim();

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Disable button during submission
        submitButton.disabled = true;
        submitButton.textContent = 'Subscribing...';

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            alert('Thank you for subscribing! We will contact you at: ' + email);
            newsletterForm.reset();
            submitButton.disabled = false;
            submitButton.textContent = 'Subscribe';
        }, 1000);
    });
}

// === WINE FILTER FUNCTIONALITY (for wines.html) ===
const filterBtns = document.querySelectorAll('.filter-btn');
const wineCardsFilter = document.querySelectorAll('[data-category]');
const wineSections = document.querySelectorAll('[data-wine-category]');

if (filterBtns.length > 0 && wineCardsFilter.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Scroll to top of wine sections smoothly
            const firstSection = document.querySelector('.wines-catalogue-section');
            if (firstSection && filterValue !== 'all') {
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = firstSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }

            // Handle "All" filter
            if (filterValue === 'all') {
                // Show all sections with fade-in animation
                wineSections.forEach((section, index) => {
                    section.style.opacity = '0';
                    section.style.display = 'block';
                    setTimeout(() => {
                        section.style.transition = 'opacity 0.5s ease';
                        section.style.opacity = '1';
                    }, index * 100);
                });

                // Show all wine cards
                wineCardsFilter.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 50);
                });
            } else {
                // Filter by specific category

                // Show/hide sections based on category
                wineSections.forEach(section => {
                    const sectionCategory = section.getAttribute('data-wine-category');

                    if (sectionCategory === filterValue) {
                        section.style.opacity = '0';
                        section.style.display = 'block';
                        setTimeout(() => {
                            section.style.transition = 'opacity 0.5s ease';
                            section.style.opacity = '1';
                        }, 100);
                    } else {
                        section.style.opacity = '0';
                        setTimeout(() => {
                            section.style.display = 'none';
                        }, 300);
                    }
                });

                // Filter wine cards with staggered animation
                let visibleIndex = 0;
                wineCardsFilter.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (cardCategory === filterValue) {
                        // Show matching cards with delay
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        card.style.display = 'flex';

                        setTimeout(() => {
                            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, visibleIndex * 100);

                        visibleIndex++;
                    } else {
                        // Hide non-matching cards
                        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            }
        });
    });
}

// === VIDEO PLACEHOLDER CLICK ===
const videoPlaceholder = document.querySelector('.video-placeholder');
if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', () => {
        // Replace with actual video embed or modal
        alert('Video functionality - integrate your video player here');
    });
}

// === LAZY LOADING IMAGES ===
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// === PERFORMANCE: Debounce Scroll Events ===
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

// === ACCESSIBILITY: Focus trap for mobile menu ===
if (navMenu) {
    const focusableElements = navMenu.querySelectorAll('a, button');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    navMenu.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && navMenu.classList.contains('active')) {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }

        // Close menu with Escape key
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
            hamburger.focus();
        }
    });
}

// === CONSOLE WELCOME MESSAGE ===
console.log('%cHURO Winery', 'font-size: 24px; font-weight: bold; color: #1a237e; font-family: Playfair Display, serif;');
console.log('%cPremium wines with royal heritage', 'font-size: 14px; color: #B8860B;');
console.log('%cWebsite crafted with attention to detail', 'font-size: 12px; color: #666;');

// === ERROR HANDLING ===
window.addEventListener('error', (e) => {
    console.error('Error occurred:', e.message);
});

// === PAGE LOAD OPTIMIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    // Remove any preloader if present
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});
const blogFilterBtns = document.querySelectorAll('.blog-filter-btn');
const blogCards = document.querySelectorAll('.blog-card');
const featuredArticle = document.querySelector('.featured-article-section');

if (blogFilterBtns.length > 0) {
    blogFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            blogFilterBtns.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-blog-filter');

            // Smooth scroll to blog grid
            const blogGridSection = document.querySelector('.blog-grid-section');
            if (blogGridSection && filterValue !== 'all') {
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const filterHeight = document.querySelector('.blog-filter-section')?.offsetHeight || 0;
                const targetPosition = blogGridSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight - filterHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }

            // Filter featured article
            if (featuredArticle) {
                const featuredCategory = featuredArticle.getAttribute('data-blog-category');

                if (filterValue === 'all' || filterValue === featuredCategory) {
                    featuredArticle.style.display = 'block';
                    setTimeout(() => {
                        featuredArticle.style.opacity = '1';
                        featuredArticle.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    featuredArticle.style.opacity = '0';
                    featuredArticle.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        featuredArticle.style.display = 'none';
                    }, 300);
                }
            }

            // Filter blog cards with staggered animation
            let visibleIndex = 0;

            if (filterValue === 'all') {
                // Show all cards
                blogCards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.display = 'flex';

                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 50);
                });
            } else {
                // Filter by category
                blogCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-blog-category');

                    if (cardCategory === filterValue) {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        card.style.display = 'flex';

                        setTimeout(() => {
                            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, visibleIndex * 80);

                        visibleIndex++;
                    } else {
                        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            }
        });
    });
}
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Clear previous errors
        document.querySelectorAll('.form-error').forEach(error => {
            error.classList.remove('active');
        });

        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value.trim(),
            consent: document.getElementById('consent').checked,
            newsletter: document.getElementById('newsletter').checked
        };

        // Validation
        let isValid = true;

        // Name validation
        if (formData.name.length < 2) {
            showError('nameError', 'Please enter your full name');
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }

        // Subject validation
        if (!formData.subject) {
            showError('subjectError', 'Please select a subject');
            isValid = false;
        }

        // Message validation
        if (formData.message.length < 10) {
            showError('messageError', 'Please enter a message (minimum 10 characters)');
            isValid = false;
        }

        // Consent validation
        if (!formData.consent) {
            alert('Please accept the Privacy Policy to continue');
            isValid = false;
        }

        if (!isValid) return;

        // Disable submit button
        const submitBtn = contactForm.querySelector('.form-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            const successMsg = document.getElementById('formSuccess');
            successMsg.classList.add('active');

            // Reset form
            contactForm.reset();

            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMsg.classList.remove('active');
            }, 5000);

            // Scroll to success message
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1500);
    });
}

function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('active');
    }
}

// === FAQ ACCORDION FUNCTIONALITY ===
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const isExpanded = question.getAttribute('aria-expanded') === 'true';
        const answerId = question.getAttribute('aria-controls');
        const answer = document.getElementById(answerId);

        // Close all other FAQs
        faqQuestions.forEach(q => {
            if (q !== question) {
                q.setAttribute('aria-expanded', 'false');
                const otherAnswerId = q.getAttribute('aria-controls');
                const otherAnswer = document.getElementById(otherAnswerId);
                if (otherAnswer) {
                    otherAnswer.classList.remove('active');
                }
            }
        });

        // Toggle current FAQ
        if (isExpanded) {
            question.setAttribute('aria-expanded', 'false');
            answer.classList.remove('active');
        } else {
            question.setAttribute('aria-expanded', 'true');
            answer.classList.add('active');
        }
    });
});

// === FORM INPUT ANIMATIONS ===
const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');

formInputs.forEach(input => {
    // Add focus class to parent on focus
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    // Remove focus class on blur
    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');

        // Clear error on input
        const errorId = input.id + 'Error';
        const errorElement = document.getElementById(errorId);
        if (errorElement && input.value.trim() !== '') {
            errorElement.classList.remove('active');
        }
    });
})