// Wait for the DOM to be fully loaded
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
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        // Add event listener
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            
            // Update button icon
            themeToggle.innerHTML = isLight ? 
                '<i class="fas fa-sun"></i>' : 
                '<i class="fas fa-moon"></i>';
                
            // Save preference
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }
    
    // Print functionality
    const printBtn = document.querySelector('.print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }
    
    // Add animation to sections - fade in on scroll
    const animateElements = () => {
        const sections = document.querySelectorAll('.job, .edu-item, .skill-item, .about, .contact, .references-section');
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            
            // Check if element is in viewport
            if (rect.top <= window.innerHeight * 0.85 && rect.bottom >= 0) {
                section.classList.add('animate-in');
            }
        });
    };
    
    // Add animation classes to CSS
    const style = document.createElement('style');
    style.textContent = `
        .job, .edu-item, .skill-item, .about, .contact, .references-section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .left-column {
            animation: slideInLeft 1s ease forwards;
        }
        
        .right-column {
            animation: slideInRight 1s ease forwards;
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        body.light-theme {
            --dark-bg: #f5f5f5;
            --white-text: #272d3b;
            --light-bg: #ffffff;
            --primary-text: #272d3b;
            --white-bg: #ffffff;
        }
        
        body.light-theme .left-column {
            color: var(--primary-text);
        }
        
        body.light-theme .vertical-text {
            color: rgba(0, 0, 0, 0.05);
        }
        
        body.light-theme .contact-item a {
            color: var(--primary-text);
        }
        
        body.light-theme .skill-level,
        body.light-theme .language-level {
            background-color: rgba(0, 0, 0, 0.1);
        }
        
        body.light-theme .competencies span {
            background-color: rgba(0, 0, 0, 0.05);
            color: var(--primary-text);
        }
        
        @media print {
            .job, .edu-item, .skill-item, .about, .contact, .references-section {
                opacity: 1;
                transform: none;
                animation: none;
            }
            
            .left-column, .right-column {
                animation: none;
                opacity: 1;
                transform: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initial check on load
    setTimeout(animateElements, 100);
    
    // Listen for scroll
    window.addEventListener('scroll', animateElements);
}); 