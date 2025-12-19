// Project Carousel Script - 4 phones in a row with fade effects
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.screenshots-carousel');
    
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.carousel-dot');
        const prevBtn = carousel.querySelector('.carousel-arrow.prev');
        const nextBtn = carousel.querySelector('.carousel-arrow.next');
        
        if (!track || slides.length === 0) return;
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationID = 0;
        let autoSlideInterval = null;
        
        // Initialize slides with fade effects
        function initSlides() {
            updateCarousel();
        }
        
        function updateCarousel() {
            // Update active classes - only middle slide is active (not blurred)
            slides.forEach((slide, index) => {
                slide.classList.remove('active');
                if (index === currentSlide) {
                    slide.classList.add('active');
                }
            });
            
            // Center the active slide by adjusting track transform
            // Get actual slide width (responsive)
            const activeSlide = slides[currentSlide];
            if (!activeSlide) return;
            
            // Get dimensions
            const slideWidth = activeSlide.offsetWidth || 280;
            const gap = 20;
            const totalSlideWidth = slideWidth + gap;
            const phoneFrame = activeSlide.querySelector('.phone-frame');
            const phoneWidth = phoneFrame ? phoneFrame.offsetWidth : 280;
            
            // Get container width (viewport width or carousel container width)
            const container = track.parentElement; // carousel-container
            const containerRect = container.getBoundingClientRect();
            const containerWidth = containerRect.width || window.innerWidth;
            
            // Calculate: center of container minus center of phone
            const containerCenter = containerWidth / 2;
            const phoneCenter = phoneWidth / 2;
            
            // Position of slide's left edge when at index 0
            const slideLeftPosition = (currentSlide * totalSlideWidth);
            
            // Transform: move track so that active slide's phone center aligns with container center
            // We need to move the track left by: (slide left position + phone center) - container center
            const transformValue = containerCenter - phoneCenter - slideLeftPosition;
            
            track.style.transform = `translateX(${transformValue}px)`;
            
            // Update dots
            if (dots.length > 0) {
                dots.forEach((dot, index) => {
                    if (index === currentSlide) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }
        
        // Auto-slide - move next slide to center one by one
        function startAutoSlide() {
            stopAutoSlide();
            autoSlideInterval = setInterval(() => {
                if (!isDragging) {
                    // Move to next slide, loop back to 0 after last slide
                    nextSlide();
                }
            }, 3000); // Auto-slide every 3 seconds
        }
        
        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        }
        
        // Mouse drag
        track.addEventListener('mousedown', dragStart);
        track.addEventListener('touchstart', dragStart, { passive: true });
        
        function dragStart(e) {
            isDragging = true;
            startPos = getPositionX(e);
            stopAutoSlide();
            track.style.cursor = 'grabbing';
            
            track.addEventListener('mousemove', drag);
            track.addEventListener('touchmove', drag, { passive: true });
            track.addEventListener('mouseup', dragEnd);
            track.addEventListener('mouseleave', dragEnd);
            track.addEventListener('touchend', dragEnd);
        }
        
        function drag(e) {
            if (!isDragging) return;
            const currentPosition = getPositionX(e);
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
        
        function dragEnd() {
            if (!isDragging) return;
            isDragging = false;
            track.style.cursor = 'grab';
            
            const movedBy = currentTranslate - prevTranslate;
            
            if (movedBy < -100) {
                nextSlide();
            } else if (movedBy > 100) {
                prevSlide();
            }
            
            prevTranslate = currentTranslate;
            currentTranslate = 0;
            
            track.removeEventListener('mousemove', drag);
            track.removeEventListener('touchmove', drag);
            track.removeEventListener('mouseup', dragEnd);
            track.removeEventListener('mouseleave', dragEnd);
            track.removeEventListener('touchend', dragEnd);
            
            startAutoSlide();
        }
        
        function getPositionX(e) {
            return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        }
        
        // Button controls
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            });
        }
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoSlide();
                currentSlide = index;
                updateCarousel();
                startAutoSlide();
            });
        });
        
        // Initialize
        initSlides();
        
        // Update on window resize to recalculate positions
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateCarousel();
            }, 250);
        });
        
        // Wait for images to load before calculating positions
        setTimeout(() => {
            updateCarousel();
            // Start auto-slide after a short delay
            setTimeout(() => {
                startAutoSlide();
            }, 2000); // Wait 2 seconds before starting auto-slide
        }, 100);
        
        // Pause auto-slide on hover
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    });
});

