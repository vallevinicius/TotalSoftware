// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
    
    // Detectar cor de fundo para mudar cor do cursor
    const element = document.elementFromPoint(mx, my);
    if (element) {
        const bgColor = window.getComputedStyle(element).backgroundColor;
        let isLight = true;
        
        // Verificar cor de fundo do elemento ou pai
        let currentElement = element;
        for (let i = 0; i < 5; i++) {
            if (currentElement) {
                const color = window.getComputedStyle(currentElement).backgroundColor;
                if (color && color !== 'rgba(0, 0, 0, 0)') {
                    isLight = isLightColor(color);
                    break;
                }
                currentElement = currentElement.parentElement;
            }
        }
        
        // Aplicar classe light/dark ao cursor
        if (!isLight) {
            cursor.classList.add('light');
            ring.classList.add('light');
        } else {
            cursor.classList.remove('light');
            ring.classList.remove('light');
        }
    }
});

// Função para detectar se a cor é clara ou escura
function isLightColor(color) {
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length < 3) return true;
    
    const r = parseInt(rgb[0]);
    const g = parseInt(rgb[1]);
    const b = parseInt(rgb[2]);
    
    // Calcular luminância
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
}

function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a, button, .service-item, .product-row, .client-cell, .team-card, .portfolio-card, .contact-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('expand');
        ring.classList.add('expand');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('expand');
        ring.classList.remove('expand');
    });
});

// Scroll effects
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navbar && navLinks) {
    navToggle.setAttribute('aria-expanded', 'false');

    navToggle.addEventListener('click', () => {
        const isOpen = navbar.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.textContent = isOpen ? '✕' : '☰';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                navbar.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.textContent = '☰';
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            navbar.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.textContent = '☰';
        }
    });
}

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Smooth scroll (Apenas para âncoras na mesma página, como #contato)
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});