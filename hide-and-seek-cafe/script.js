// ===== SIMPLE PRELOADER =====
const preloader = document.getElementById('preloader');
const loadingBar = document.getElementById('loading-bar');

let progress = 0;
const duration = 2000; // 2 seconds
const interval = 30;
const increment = (100 / duration) * interval;

const loadingInterval = setInterval(() => {
    progress += increment;
    if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);

        // Simple fade out
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }, 200);
    }

    loadingBar.style.width = progress + '%';
}, interval);

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// --- 1. HERO CAROUSEL AUTO-ROTATION ---
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.carousel-indicator');
const totalSlides = slides.length;

function showSlide(index) {
    // Remove active class from all
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));

    // Add active class to current
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Auto-rotate every 6 seconds
setInterval(nextSlide, 6000);

// Manual indicator controls
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// --- 2. ROTATING TEXT ANIMATION ---
const rotatingText = document.getElementById('rotating-text');
const words = ['Coffee', 'Pizza', 'Burgers', 'Vibes', 'Shakes', 'Sandwiches'];
let wordIndex = 0;

function rotateText() {
    if (rotatingText) {
        rotatingText.classList.add('text-rotating');

        setTimeout(() => {
            wordIndex = (wordIndex + 1) % words.length;
            rotatingText.textContent = words[wordIndex];
        }, 300);

        setTimeout(() => {
            rotatingText.classList.remove('text-rotating');
        }, 3000);
    }
}

// Start rotation
setInterval(rotateText, 3000);

// --- 3. ANIMATIONS (MENU & SCROLL) ---

// Hero Text Animation (Char by Char Fade Up)
const heroText = document.querySelector(".hero-text");
if (heroText) {
    gsap.from(heroText, {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2
    });
}

// Menu Cards Stagger Animation (Float Up)
const cards = gsap.utils.toArray('.glass-card');
cards.forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 90%", // Trigger when card top is 90% down the viewport
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
        delay: index % 3 * 0.1, // Stagger effect
        ease: "power2.out"
    });
});

// Image Parallax (Subtle movement inside cards)
const images = document.querySelectorAll("img");
images.forEach(img => {
    gsap.to(img, {
        scrollTrigger: {
            trigger: img,
            scrub: true
        },
        y: -10, // Move image slightly up as we scroll down
        ease: "none"
    });
});

// --- SMOOTH SCROLL FOR NAVIGATION ---
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
// --- 3. MOBILE MENU LOGIC ---
const menuBtn = document.getElementById("open-menu");
const mobileMenu = document.getElementById("mobile-menu");
const closeBtn = document.getElementById("close-menu");
const mobileLinks = document.querySelectorAll(".mobile-link");

// Open Menu
if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.add("open");
        mobileMenu.classList.remove("translate-x-full");
    });
}

// Close Menu
const closeMenu = () => {
    mobileMenu.classList.remove("open");
    mobileMenu.classList.add("translate-x-full");
};

if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
}
mobileLinks.forEach(link => link.addEventListener("click", closeMenu));

// --- NAVBAR SCROLL EFFECTS ---
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id], header[id]");

// Navbar shrink on scroll
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    // Active link based on scroll position
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// --- 4. LIVE OPEN/CLOSED STATUS ---
function updateStatus() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours + minutes / 60; // Convert to decimal hours

    const openTime = 9; // 9:00 AM
    const closeTime = 23; // 11:00 PM (23:00)

    const statusDot = document.getElementById("status-dot");
    const statusText = document.getElementById("status-text");

    if (currentTime >= openTime && currentTime < closeTime) {
        // OPEN (Green)
        statusDot.classList.remove("bg-red-500");
        statusDot.classList.add("bg-green-400", "animate-pulse");
        statusText.textContent = "Open Now";
        statusText.classList.remove("text-red-400");
        statusText.classList.add("text-green-400");
    } else {
        // CLOSED (Red)
        statusDot.classList.remove("bg-green-400", "animate-pulse");
        statusDot.classList.add("bg-red-500");
        statusText.textContent = "Closed";
        statusText.classList.remove("text-green-400");
        statusText.classList.add("text-red-400");
    }
}

// Run on page load
updateStatus();

// Update every minute
setInterval(updateStatus, 60000);

// --- 5. LOCATION TAG LIVE TIME ---
const locationTime = document.getElementById('location-time');

if (locationTime) {
    function updateLocationTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata'
        });
        locationTime.textContent = timeString + ' IST';
    }

    updateLocationTime();
    setInterval(updateLocationTime, 1000);
}

// --- 7. GALLERY CAROUSEL NAVIGATION ---
const galleryCarousel = document.getElementById('gallery-carousel');
const galleryPrev = document.getElementById('gallery-prev');
const galleryNext = document.getElementById('gallery-next');
const galleryDots = document.querySelectorAll('.gallery-dot');

if (galleryCarousel && galleryPrev && galleryNext) {
    const cardWidth = 380; // Card width + gap

    function updateDots() {
        const scrollPosition = galleryCarousel.scrollLeft;
        const cardIndex = Math.round(scrollPosition / cardWidth);

        galleryDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === cardIndex);
        });
    }

    galleryPrev.addEventListener('click', () => {
        galleryCarousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });

    galleryNext.addEventListener('click', () => {
        galleryCarousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    galleryCarousel.addEventListener('scroll', updateDots);

    // Dot click handlers
    galleryDots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index);
            galleryCarousel.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
        });
    });
}

// --- 8. BACK TO TOP BUTTON ---
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// --- 9. SCROLL REVEAL ANIMATIONS ---
// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animate section headers
const sectionHeaders = document.querySelectorAll('section h2');
sectionHeaders.forEach(header => {
    gsap.from(header, {
        scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
});

// Animate section descriptions
const sectionDescs = document.querySelectorAll('section > div > p');
sectionDescs.forEach(desc => {
    gsap.from(desc, {
        scrollTrigger: {
            trigger: desc,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        ease: 'power3.out'
    });
});

// Animate glass cards with stagger
const glassCards = document.querySelectorAll('.glass-card');
glassCards.forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        delay: (index % 3) * 0.1,
        ease: 'power3.out'
    });
});

// Animate gallery cards
const galleryCards = document.querySelectorAll('.gallery-card');
galleryCards.forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        x: 50,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power3.out'
    });
});

// Animate About section image
const aboutImage = document.querySelector('#about img');
if (aboutImage) {
    gsap.from(aboutImage, {
        scrollTrigger: {
            trigger: aboutImage,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
}

// --- 10. MENU CATEGORY FILTER ---
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCards = document.querySelectorAll('.menu-card');
const menuSearch = document.getElementById('menu-search');
const clearSearchBtn = document.getElementById('clear-search');
const noResults = document.getElementById('no-results');
const menuGrid = document.getElementById('menu-grid');

let activeCategory = 'all';
let searchQuery = '';

function filterMenu() {
    let visibleCount = 0;

    menuCards.forEach(card => {
        const cardCategory = card.dataset.category;
        const cardText = card.textContent.toLowerCase();
        const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;
        const matchesSearch = searchQuery === '' || cardText.includes(searchQuery.toLowerCase());

        if (matchesCategory && matchesSearch) {
            card.classList.remove('hidden');
            card.classList.add('visible');
            card.style.display = '';
            visibleCount++;
        } else {
            card.classList.add('hidden');
            card.classList.remove('visible');
            setTimeout(() => {
                if (card.classList.contains('hidden')) {
                    card.style.display = 'none';
                }
            }, 400);
        }
    });

    // Show/hide no results message
    if (visibleCount === 0) {
        noResults.classList.remove('hidden');
        menuGrid.style.display = 'none';
    } else {
        noResults.classList.add('hidden');
        menuGrid.style.display = '';
    }
}

// Tab click handlers
menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        menuTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeCategory = tab.dataset.category;
        filterMenu();
    });
});

// Search functionality
if (menuSearch) {
    let debounceTimer;

    menuSearch.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            searchQuery = e.target.value.trim();
            filterMenu();

            // Show/hide clear button
            if (searchQuery) {
                clearSearchBtn.classList.remove('hidden');
            } else {
                clearSearchBtn.classList.add('hidden');
            }
        }, 300);
    });

    // Clear search
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            menuSearch.value = '';
            searchQuery = '';
            clearSearchBtn.classList.add('hidden');
            filterMenu();
            menuSearch.focus();
        });
    }
}

// --- REVIEW FORM FUNCTIONALITY ---
const starButtons = document.querySelectorAll('.star-btn');
const ratingInput = document.getElementById('rating-input');
const reviewForm = document.getElementById('review-form');
const formSuccess = document.getElementById('form-success');

// Star rating interaction
if (starButtons.length > 0) {
    starButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const rating = parseInt(btn.dataset.rating);
            ratingInput.value = rating;

            // Update star colors
            starButtons.forEach((star, index) => {
                if (index < rating) {
                    star.classList.remove('text-gray-600');
                    star.classList.add('text-[#d4a373]');
                } else {
                    star.classList.remove('text-[#d4a373]');
                    star.classList.add('text-gray-600');
                }
            });
        });

        // Hover effect
        btn.addEventListener('mouseenter', () => {
            const rating = parseInt(btn.dataset.rating);
            starButtons.forEach((star, index) => {
                if (index < rating) {
                    star.classList.add('text-[#d4a373]');
                }
            });
        });

        btn.addEventListener('mouseleave', () => {
            const currentRating = parseInt(ratingInput.value);
            starButtons.forEach((star, index) => {
                if (index < currentRating) {
                    star.classList.remove('text-gray-600');
                    star.classList.add('text-[#d4a373]');
                } else {
                    star.classList.remove('text-[#d4a373]');
                    star.classList.add('text-gray-600');
                }
            });
        });
    });
}

// Form submission handling
if (reviewForm) {
    reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(reviewForm);
        const submitBtn = reviewForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch(reviewForm.action, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                // Show success message
                reviewForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Show error
            submitBtn.innerHTML = '<i class="ri-error-warning-line"></i> Error - Try Again';
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    });
}