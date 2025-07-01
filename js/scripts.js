document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (navbar) { // Check if navbar exists before trying to add/remove class
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Create particles (only for home page)
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // Animate statistics (only on pages with stats)
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        if (stats.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const stat = entry.target;
                        const target = parseInt(stat.textContent);
                        let current = 0;
                        const increment = target / 50;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            stat.textContent = Math.floor(current) + (stat.textContent.includes('%') ? '%' : '+');
                        }, 50);
                        observer.unobserve(stat);
                    }
                });
            });

            stats.forEach(stat => observer.observe(stat));
        }
    }
    animateStats(); // Call it on DOMContentLoaded

    // Form submission handler
    document.addEventListener('submit', function(e) {
        if (e.target.tagName === 'FORM') {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            // You can add more sophisticated form handling here, like sending data to a server
        }
    });

    // Smooth scrolling for anchor links (if any)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop(); // Gets the current HTML file name
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Update page indicator based on current page
    const pageIndicator = document.getElementById('page-indicator');
    const animatedWord = pageIndicator.querySelector('.animated-word');
    const pageTitleMap = {
        'index.html': 'Home',
        'about.html': 'About Us',
        'services.html': 'Services',
        'projects.html': 'Projects',
        'careers.html': 'Careers',
        'contact.html': 'Contact'
    };

    animatedWord.textContent = pageTitleMap[currentPage] || 'Page';
});

