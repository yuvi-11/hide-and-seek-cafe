// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows cursor immediately
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with slight delay using animation keyframes (in CSS) 
    // or we can use animate() for smooth trailing
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Cursor Hover Interactions
const hoverTargets = document.querySelectorAll('a, button, .menu-card');

hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.backgroundColor = 'rgba(251, 191, 36, 0.1)';
        cursorOutline.style.borderColor = 'transparent';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.backgroundColor = 'transparent';
        cursorOutline.style.borderColor = '#fbbf24';
    });
});

// Hero Animations
const tl = gsap.timeline();

tl.to('.hero-sub', {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    delay: 0.5
})
    .to('.hero-title', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out"
    }, "-=0.5")
    .to('.hero-desc', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8")
    .to('.hero-btn', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.7)"
    }, "-=0.8");

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('py-2');
        nav.classList.remove('py-4');
    } else {
        nav.classList.add('py-4');
        nav.classList.remove('py-2');
    }
});

// Section Reveal Animations
const revealElements = document.querySelectorAll('.reveal-text');

revealElements.forEach(el => {
    gsap.fromTo(el,
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%", // Animation starts when top of element hits 85% of viewport height
                toggleActions: "play none none reverse"
            }
        }
    );
});

// Image Reveal
gsap.fromTo('.reveal-img',
    { scale: 0.9, opacity: 0 },
    {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.reveal-img',
            start: "top 80%"
        }
    }
);

// Menu Stagger Animation
gsap.from('.menu-card', {
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2, // 0.2s delay between each card
    ease: "power3.out",
    scrollTrigger: {
        trigger: '#menu',
        start: "top 75%"
    }
});

// Parallax Effect for Hero Background
gsap.to('.parallax-bg', {
    yPercent: 50,
    ease: "none",
    scrollTrigger: {
        trigger: "header",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// 3D Tilt Effect on Menu Cards
const cards = document.querySelectorAll('.menu-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5; // Max -10 to 10 deg
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});
