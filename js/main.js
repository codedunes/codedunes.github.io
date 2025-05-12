// Modern Resume JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Update year in footer
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        // Add event listener
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            
            // Update button icon
            themeToggle.innerHTML = isDark ? 
                '<i class="fas fa-sun"></i>' : 
                '<i class="fas fa-moon"></i>';
                
            // Save preference
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
    
    // Simple print functionality
    const printButton = document.querySelector('.print-button');
    
    if (printButton) {
        printButton.addEventListener('click', () => {
            window.print();
        });
    }
    
    // Scroll animations using Intersection Observer
    const animateOnScroll = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        const elements = document.querySelectorAll('.timeline-item, .skill-card, .language-item, .about-section, .tag, .education-section, .reference');
        elements.forEach(el => {
            el.classList.add('animate-element');
            observer.observe(el);
        });
    };
    
    // Stagger animation for skills and timeline items
    const staggerAnimations = () => {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const skillCards = document.querySelectorAll('.skill-card');
        
        timelineItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
        
        skillCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    };
    
    // Add animation styles
    const addAnimationStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .animate-element {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .timeline-item, .skill-card {
                animation-name: fadeInUp;
                animation-duration: 0.6s;
                animation-fill-mode: both;
                animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            
            .tag {
                animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
                animation-delay: 0.5s;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes popIn {
                from {
                    opacity: 0;
                    transform: scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            .hero::before {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.2) 0%, transparent 30%),
                                 radial-gradient(circle at 80% 20%, rgba(249, 115, 22, 0.2) 0%, transparent 30%);
                z-index: -1;
            }
            
            /* Dark Theme Styles */
            body.dark-theme {
                --primary: #60a5fa;
                --primary-light: #93c5fd;
                --primary-dark: #2563eb;
                --secondary: #fb923c;
                --dark: #f8fafc;
                --text: #e2e8f0;
                --light-text: #94a3b8;
                --light-bg: #0f172a;
                --white: #1e293b;
                --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1);
            }
            
            body.dark-theme .hero {
                background: linear-gradient(135deg, #1e3a8a, #1d4ed8);
            }
            
            body.dark-theme .timeline::before {
                background-color: rgba(96, 165, 250, 0.3);
            }
            
            body.dark-theme .skill-card,
            body.dark-theme .language-item,
            body.dark-theme .about-section,
            body.dark-theme .education-section,
            body.dark-theme .references-section,
            body.dark-theme .profile-placeholder {
                background-color: #1e293b;
                color: #e2e8f0;
            }
            
            body.dark-theme .section-title,
            body.dark-theme .job-title,
            body.dark-theme .skill-card-title,
            body.dark-theme .edu-degree,
            body.dark-theme .reference h4,
            body.dark-theme .language-name {
                color: #f8fafc;
            }
            
            body.dark-theme .company,
            body.dark-theme .edu-school,
            body.dark-theme .skill-level,
            body.dark-theme .ref-title,
            body.dark-theme .skill-name::before,
            body.dark-theme .ref-email,
            body.dark-theme .skill-card-title i {
                color: var(--primary-light);
            }
            
            body.dark-theme .tag {
                background-color: #334155;
                color: #93c5fd;
            }
            
            body.dark-theme .language-level-bar {
                background-color: #334155;
            }
            
            @media print {
                .animate-element {
                    opacity: 1 !important;
                    transform: none !important;
                    animation: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    // Run animations
    addAnimationStyles();
    animateOnScroll();
    staggerAnimations();
    
    // Add scroll-to-top functionality when the user scrolls down
    const addScrollTopButton = () => {
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.classList.add('action-btn', 'scroll-top');
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollTopBtn.title = 'Scroll to top';
        scrollTopBtn.style.display = 'none';
        
        document.querySelector('.action-buttons').appendChild(scrollTopBtn);
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                scrollTopBtn.style.display = 'flex';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    
    addScrollTopButton();
}); 