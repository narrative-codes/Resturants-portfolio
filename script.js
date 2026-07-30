// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. PAGE LOADER ---
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
            // Trigger hero animations after loader disappears
            document.querySelectorAll('.hero .hidden').forEach(el => {
                el.classList.add('show');
            });
        }, 1000);
    }, 1500); // Loader displays for 1.5s

    // --- 2. CUSTOM CURSOR ---
    const cursor = document.getElementById("custom-cursor");
    const cursorFollower = document.getElementById("custom-cursor-follower");
    
    // Check if it's not a touch device
    if(window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener("mousemove", (e) => {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
            
            // Add a slight delay to the follower
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + "px";
                cursorFollower.style.top = e.clientY + "px";
            }, 80);
        });

        // Add hover effect to interactive elements
        const hoverElements = document.querySelectorAll('a, button, .menu-card, input, select');
        hoverElements.forEach(el => {
            el.addEventListener("mouseenter", () => {
                document.body.classList.add("hovered-cursor");
            });
            el.addEventListener("mouseleave", () => {
                document.body.classList.remove("hovered-cursor");
            });
        });
    }

    // --- 3. STICKY NAVBAR & MOBILE MENU ---
    const navbar = document.getElementById("navbar");
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links li a");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
        });
    });

    // --- 4. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // --- 5. MENU FILTERING ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            menuCards.forEach(card => {
                // First fade out
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        // Small delay to allow display block to apply before animating opacity
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 400); // Matches CSS transition duration roughly
            });
        });
    });

    // --- 6. TESTIMONIAL SLIDER ---
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlideIndex = index;
    }

    function nextSlide() {
        let index = currentSlideIndex + 1;
        if (index >= slides.length) index = 0;
        showSlide(index);
    }

    // Attach click events to dots globally so HTML onclick works
    window.currentSlide = function(index) {
        showSlide(index);
        resetInterval();
    };

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Start auto slide
    slideInterval = setInterval(nextSlide, 5000);

    // --- 7. PARALLAX EFFECT FOR HERO ---
    const heroBg = document.querySelector('.hero-bg');
    window.addEventListener('scroll', () => {
        let scrollValue = window.scrollY;
        // Move background slightly slower than scroll
        heroBg.style.transform = `translateY(${scrollValue * 0.4}px) scale(1.1)`;
    });

    // --- 8. FORM SUBMISSION PREVENTION (DEMO) ---
    const form = document.getElementById('book-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Reservation Confirmed!";
            btn.style.backgroundColor = "#4caf50"; // green success
            btn.style.color = "#fff";
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = "";
                btn.style.color = "";
                form.reset();
            }, 3000);
        });
    }
});
