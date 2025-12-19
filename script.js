/**
 * PHAM QUANG HUY - PORTFOLIO
 * Main JavaScript with Three.js 3D Effects & GSAP Animations
 */

// ========================================
// Global Variables
// ========================================
let scene, camera, renderer, particles, animationFrameId;
const cursor = { x: 0, y: 0 };
const cursorElement = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

// ========================================
// Loader
// ========================================
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.classList.add('hidden');
        }
        initAnimations();
    }, 1500);
});

// ========================================
// Three.js Particle Background
// ========================================
function initThreeJS() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 50;

    // Renderer
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create a brighter, more vibrant particle system with floating orbs
    const particleCount = window.innerWidth < 768 ? 150 : 300;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Brighter, more vibrant colors
    const color1 = new THREE.Color('#818cf8'); // Bright Indigo
    const color2 = new THREE.Color('#a78bfa'); // Bright Purple
    const color3 = new THREE.Color('#22d3ee'); // Bright Cyan
    const color4 = new THREE.Color('#f472b6'); // Bright Pink

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Position - create floating orbs in a larger space
        positions[i3] = (Math.random() - 0.5) * 200;
        positions[i3 + 1] = (Math.random() - 0.5) * 200;
        positions[i3 + 2] = (Math.random() - 0.5) * 200;

        // Random bright color
        const colorChoice = Math.random();
        let particleColor;
        if (colorChoice < 0.25) {
            particleColor = color1.clone();
        } else if (colorChoice < 0.5) {
            particleColor = color2.clone();
        } else if (colorChoice < 0.75) {
            particleColor = color3.clone();
        } else {
            particleColor = color4.clone();
        }
        
        // Make colors even brighter
        particleColor.multiplyScalar(1.3);
        
        colors[i3] = particleColor.r;
        colors[i3 + 1] = particleColor.g;
        colors[i3 + 2] = particleColor.b;

        // Variable sizes for depth
        sizes[i] = Math.random() * 3 + 1;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Shader material for glowing particles
    const vertexShader = `
        attribute float size;
        varying vec3 vColor;
        void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
        }
    `;

    const fragmentShader = `
        varying vec3 vColor;
        void main() {
            float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
            float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
            gl_FragColor = vec4(vColor, alpha * 0.8);
        }
    `;

    const particlesMaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Store initial positions and velocities for floating animation
    const velocities = [];
    for (let i = 0; i < particleCount; i++) {
        velocities.push({
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02
        });
    }

    // Animation
    let time = 0;
    function animate() {
        animationFrameId = requestAnimationFrame(animate);
        time += 0.01;

        // Floating animation - particles move in smooth patterns
        const positions = particlesGeometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] += velocities[i].x + Math.sin(time + i) * 0.01;
            positions[i3 + 1] += velocities[i].y + Math.cos(time + i * 0.5) * 0.01;
            positions[i3 + 2] += velocities[i].z + Math.sin(time * 0.7 + i * 0.3) * 0.01;
            
            // Reset position if too far
            if (Math.abs(positions[i3]) > 100) velocities[i].x *= -1;
            if (Math.abs(positions[i3 + 1]) > 100) velocities[i].y *= -1;
            if (Math.abs(positions[i3 + 2]) > 100) velocities[i].z *= -1;
        }
        particlesGeometry.attributes.position.needsUpdate = true;

        // Gentle rotation
        particles.rotation.y += 0.0002;

        // Mouse interaction (subtle)
        particles.rotation.x += (cursor.y * 0.00005 - particles.rotation.x * 0.001);
        particles.rotation.y += (cursor.x * 0.00005 - particles.rotation.y * 0.001);

        renderer.render(scene, camera);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize Three.js
initThreeJS();

// ========================================
// Custom Cursor
// ========================================
document.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;

    if (cursorElement) {
        cursorElement.style.left = cursor.x + 'px';
        cursorElement.style.top = cursor.y + 'px';
    }

    if (cursorFollower) {
        setTimeout(() => {
            cursorFollower.style.left = cursor.x + 'px';
            cursorFollower.style.top = cursor.y + 'px';
        }, 100);
    }
});

// Cursor hover effects
document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorFollower) cursorFollower.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
        if (cursorFollower) cursorFollower.classList.remove('active');
    });
});

// ========================================
// Navigation
// ========================================
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

// Scroll handler
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }

    // Update active nav link
    updateActiveNavLink();
});

// Mobile menu toggle
navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu?.classList.toggle('active');
    document.body.style.overflow = mobileMenu?.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle?.classList.remove('active');
        mobileMenu?.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Smooth scroll for nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Skills Tabs
// ========================================
const skillTabs = document.querySelectorAll('.skill-tab');
const skillPanels = document.querySelectorAll('.skills-panel');

skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetPanel = tab.dataset.tab;

        // Update active tab
        skillTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Show target panel
        skillPanels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === targetPanel) {
                panel.classList.add('active');
            }
        });
    });
});

// ========================================
// Scroll Animations
// ========================================
function initAnimations() {
    const animateItems = document.querySelectorAll('.animate-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateItems.forEach(item => {
        observer.observe(item);
    });
}

// ========================================
// GSAP Animations (if available)
// ========================================
if (typeof gsap !== 'undefined') {
    // Register ScrollTrigger plugin
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Hero section animations
    gsap.fromTo('.home-badge', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5 }
    );

    gsap.fromTo('.home-title .title-line', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.7, stagger: 0.2 }
    );

    gsap.fromTo('.home-subtitle', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.1 }
    );

    gsap.fromTo('.home-role', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.3 }
    );

    gsap.fromTo('.home-description', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.5 }
    );

    gsap.fromTo('.home-actions .btn', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 1.7, stagger: 0.1 }
    );

    gsap.fromTo('.home-social .social-link', 
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.4, delay: 2, stagger: 0.1 }
    );

    // Profile animations
    gsap.fromTo('.profile-glow', 
        { opacity: 0, scale: 0.5 },
        { opacity: 0.3, scale: 1, duration: 1.2, delay: 0.5 }
    );

    gsap.fromTo('.profile-image', 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, delay: 0.8 }
    );

    gsap.fromTo('.profile-ring', 
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1 }
    );

    gsap.fromTo('.floating-badge', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, delay: 1.5, stagger: 0.2 }
    );

    // Section animations with ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
        // About section
        gsap.fromTo('#about .section-header', 
            { opacity: 0, y: 50 },
            {
                opacity: 1, 
                y: 0, 
                duration: 0.8,
                scrollTrigger: {
                    trigger: '#about',
                    start: 'top 80%'
                }
            }
        );

        gsap.fromTo('#about .about-text', 
            { opacity: 0, x: -50 },
            {
                opacity: 1, 
                x: 0, 
                duration: 0.8,
                scrollTrigger: {
                    trigger: '#about .about-grid',
                    start: 'top 80%'
                }
            }
        );

        gsap.fromTo('#about .stat-card', 
            { opacity: 0, y: 30 },
            {
                opacity: 1, 
                y: 0, 
                duration: 0.5,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: '#about .about-stats',
                    start: 'top 85%'
                }
            }
        );

        // Skills section
        gsap.fromTo('#experience .section-header', 
            { opacity: 0, y: 50 },
            {
                opacity: 1, 
                y: 0, 
                duration: 0.8,
                scrollTrigger: {
                    trigger: '#experience',
                    start: 'top 80%'
                }
            }
        );

        gsap.fromTo('#experience .skill-tab', 
            { opacity: 0, y: 20 },
            {
                opacity: 1, 
                y: 0, 
                duration: 0.4,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: '#experience .skills-tabs',
                    start: 'top 85%'
                }
            }
        );

        // Projects section
        gsap.fromTo('#projects .section-header', 
            { opacity: 0, y: 50 },
            {
                opacity: 1, 
                y: 0, 
                duration: 0.8,
                scrollTrigger: {
                    trigger: '#projects',
                    start: 'top 80%'
                }
            }
        );

        gsap.fromTo('.project-card', 
            { opacity: 0, y: 80 },
            {
                opacity: 1, 
                y: 0, 
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '#projects .projects-grid',
                    start: 'top 80%'
                }
            }
        );

        // Contact section
        gsap.fromTo('#contact .section-header', 
            { opacity: 0, y: 50 },
            {
                opacity: 1, 
                y: 0, 
                duration: 0.8,
                scrollTrigger: {
                    trigger: '#contact',
                    start: 'top 80%'
                }
            }
        );
    }
}

// ========================================
// Contact 3D Scene
// ========================================
function initContactScene() {
    const container = document.getElementById('contact-3d');
    if (!container) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Scene
    const contactScene = new THREE.Scene();

    // Camera
    const contactCamera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    contactCamera.position.z = 4;

    // Renderer
    const contactRenderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true 
    });
    contactRenderer.setSize(width, height);
    contactRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(contactRenderer.domElement);

    // Create Torus Knot
    const torusGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const torusMaterial = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    const torusKnot = new THREE.Mesh(torusGeometry, torusMaterial);
    contactScene.add(torusKnot);

    // Inner Torus Knot
    const innerTorusGeometry = new THREE.TorusKnotGeometry(0.6, 0.2, 100, 16);
    const innerTorusMaterial = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        transparent: true,
        opacity: 0.4
    });
    const innerTorusKnot = new THREE.Mesh(innerTorusGeometry, innerTorusMaterial);
    contactScene.add(innerTorusKnot);

    // Animation
    function animateContact() {
        requestAnimationFrame(animateContact);

        torusKnot.rotation.x += 0.005;
        torusKnot.rotation.y += 0.008;
        
        innerTorusKnot.rotation.x -= 0.008;
        innerTorusKnot.rotation.y -= 0.005;

        contactRenderer.render(contactScene, contactCamera);
    }

    animateContact();

    // Resize
    window.addEventListener('resize', () => {
        const newWidth = container.offsetWidth;
        const newHeight = container.offsetHeight;
        
        contactCamera.aspect = newWidth / newHeight;
        contactCamera.updateProjectionMatrix();
        contactRenderer.setSize(newWidth, newHeight);
    });
}

initContactScene();

// ========================================
// Skill Level Animation
// ========================================
function animateSkillLevels() {
    const skillLevels = document.querySelectorAll('.level-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.style.getPropertyValue('--level');
                entry.target.style.width = level;
            }
        });
    }, { threshold: 0.5 });

    skillLevels.forEach(level => {
        level.style.width = '0';
        observer.observe(level);
    });
}

animateSkillLevels();

// ========================================
// Floating Animation for Badges
// ========================================
const floatingBadges = document.querySelectorAll('.floating-badge');
floatingBadges.forEach((badge, index) => {
    badge.style.animationDelay = `${index * 0.5}s`;
});

// ========================================
// Typewriter Effect
// ========================================
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.wait = parseInt(wait, 10);
        this.wordIndex = 0;
        this.txt = '';
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        if (this.element) {
            this.element.innerHTML = `<span class="txt">${this.txt}</span>`;
        }

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize typewriter
const typewriterElement = document.querySelector('.typewriter');
if (typewriterElement) {
    const words = JSON.parse(typewriterElement.getAttribute('data-words') || '["Developer"]');
    new TypeWriter(typewriterElement, words, 2000);
}

// ========================================
// Counter Animation
// ========================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Skip text-based stats (like "4+ Years")
                if (target.classList.contains('stat-text')) {
                    observer.unobserve(target);
                    return;
                }
                
                // Check for data-count (primary) or data-value (fallback)
                const value = target.getAttribute('data-count') || target.getAttribute('data-value');
                const suffix = target.getAttribute('data-suffix') || '';
                
                if (value) {
                    animateValue(target, 0, parseInt(value), 2000, suffix);
                    observer.unobserve(target);
                }
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        // Skip text-based stats
        if (counter.classList.contains('stat-text')) return;
        
        if (counter.getAttribute('data-count') || counter.getAttribute('data-value')) {
            observer.observe(counter);
        }
    });
}

function animateValue(element, start, end, duration, suffix = '') {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + suffix;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

animateCounters();

// ========================================
// Parallax Effect
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    // Parallax for profile section
    const profileContainer = document.querySelector('.profile-container');
    if (profileContainer && window.innerWidth > 768) {
        profileContainer.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// ========================================
// Preload Images
// ========================================
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

preloadImages();

// ========================================
// Console Easter Egg
// ========================================
console.log('%c Welcome to my Portfolio! 🚀', 
    'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%c Developed by Pham Quang Huy', 
    'color: #8b5cf6; font-size: 14px;');
console.log('%c Flutter Developer | Mobile Enthusiast', 
    'color: #06b6d4; font-size: 12px;');

// ========================================
// Performance Optimization
// ========================================
// Debounce function
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

// Throttle scroll events
const debouncedScroll = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Clean up Three.js on page unload
window.addEventListener('beforeunload', () => {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    if (renderer) {
        renderer.dispose();
    }
});

