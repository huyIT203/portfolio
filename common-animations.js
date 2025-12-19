/**
 * Common Animations for Skill and Project Pages
 * GSAP ScrollTrigger animations matching index.html style
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if GSAP is available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        // Fallback to IntersectionObserver if GSAP is not available
        initFallbackAnimations();
        return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize animations
    initGSAPAnimations();
});

function initGSAPAnimations() {
    // Animate all sections with scroll trigger
    gsap.utils.toArray('.project-section, .skill-section').forEach((section, index) => {
        // Section headers
        const header = section.querySelector('.section-header, .project-section-title');
        if (header) {
            gsap.fromTo(header,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }

        // Animate cards and items
        const cards = section.querySelectorAll('.feature-card, .funfact-card, .skill-detail-card, .overview-text, .tech-category, .arch-item');
        if (cards.length > 0) {
            gsap.fromTo(cards,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }

        // Animate grids
        const grids = section.querySelectorAll('.features-grid, .funfacts-grid, .tech-stack-grid, .overview-grid, .architecture-description');
        grids.forEach(grid => {
            const items = grid.querySelectorAll('.feature-card, .funfact-card, .tech-category, .arch-item');
            if (items.length > 0) {
                gsap.fromTo(items,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        stagger: 0.08,
                        scrollTrigger: {
                            trigger: grid,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }
        });
    });

    // Hero section animations for project pages
    const heroSection = document.querySelector('.project-hero');
    if (heroSection) {
        gsap.fromTo('.project-hero-content',
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.3,
                ease: 'power3.out'
            }
        );

        gsap.fromTo('.project-icon-hero',
            { opacity: 0, scale: 0.8 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                delay: 0.5,
                ease: 'back.out(1.7)'
            }
        );

        gsap.fromTo('.project-hero-title',
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.7
            }
        );

        gsap.fromTo('.project-hero-subtitle',
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.9
            }
        );

        gsap.fromTo('.project-hero-tech .tech-badge',
            { opacity: 0, scale: 0.8 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                delay: 1.1,
                stagger: 0.05
            }
        );

        gsap.fromTo('.project-hero-links .hero-link',
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: 1.3,
                stagger: 0.1
            }
        );
    }

    // Skill page hero animations
    const skillHero = document.querySelector('.skill-hero');
    if (skillHero) {
        gsap.fromTo('.skill-icon-large',
            { opacity: 0, scale: 0.8, rotation: -10 },
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.8,
                delay: 0.3,
                ease: 'back.out(1.7)'
            }
        );

        gsap.fromTo('.skill-title',
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.5
            }
        );

        gsap.fromTo('.skill-description',
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.7
            }
        );
    }
}

function initFallbackAnimations() {
    // Fallback using IntersectionObserver (same as index.html)
    const animateItems = document.querySelectorAll('.feature-card, .funfact-card, .project-section-title, .skill-detail-card, .overview-text, .tech-category');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

