// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section, header');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Function to handle scroll animation
    function handleScroll() {
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }

    // Run once on load
    setTimeout(handleScroll, 100);

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Update year in footer
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2023', currentYear);
    }

    // Add hover effects to job items
    const jobs = document.querySelectorAll('.job');
    jobs.forEach(job => {
        job.addEventListener('mouseenter', () => {
            const skills = job.querySelector('.skills-used');
            if (skills) {
                skills.style.transform = 'translateY(-5px)';
                skills.style.transition = 'transform 0.3s ease';
            }
        });
        
        job.addEventListener('mouseleave', () => {
            const skills = job.querySelector('.skills-used');
            if (skills) {
                skills.style.transform = 'translateY(0)';
            }
        });
    });
    
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
    
    // Print Button Functionality
    const printButton = document.querySelector('.print-button');
    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print();
        });
    }
}); 