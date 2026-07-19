// Remove Preloader after load
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1500);
});

// Custom Cursor Logic
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

// Add hover effect to interactive elements
document.querySelectorAll('a, button, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileNav = document.getElementById('mobileNav');
const mobileClose = document.getElementById('mobileClose');

function openMobileNav() {
    mobileNav.classList.add('open');
}

function closeMobileNav() {
    mobileNav.classList.remove('open');
}

if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileNav);
}

// Scroll Reveal Animation
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

function revealElement() {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;
    
    reveals.forEach(reveal => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', revealElement);
revealElement(); // Trigger on load

// Stats Counter Animation
const stats = document.querySelectorAll('.stat-number');
let hasCounted = false;

function countStats() {
    if (hasCounted) return;
    
    const statsSection = document.querySelector('.stats-bar');
    if (!statsSection) return;

    const sectionPos = statsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight;

    if (sectionPos < screenPos) {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-count');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.innerText = target.toLocaleString();
                }
            };
            updateCounter();
        });
        hasCounted = true;
    }
}
window.addEventListener('scroll', countStats);

// Gallery Filter
function filterGallery(category, btn) {
    // update active button
    document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    
    // filter items
    document.querySelectorAll('.gallery-item').forEach(item => {
        if(category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            setTimeout(() => { item.style.opacity = '1'; }, 50);
        } else {
            item.style.opacity = '0';
            setTimeout(() => { item.style.display = 'none'; }, 300);
        }
    });
}

