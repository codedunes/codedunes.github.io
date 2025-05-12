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

    // Add theme toggle functionality
    const createThemeToggle = () => {
        const toggleBtn = document.createElement('button');
        toggleBtn.classList.add('theme-toggle');
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        toggleBtn.title = 'Toggle dark/light mode';
        
        // Add styles for the toggle button
        const style = document.createElement('style');
        style.textContent = `
            .theme-toggle {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: var(--secondary-color);
                color: white;
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                z-index: 100;
                transition: all 0.3s ease;
            }
            .theme-toggle:hover {
                transform: scale(1.05);
                background-color: var(--accent-color);
            }
            body.dark-theme {
                --primary-color: #ecf0f1;
                --secondary-color: #3498db;
                --accent-color: #e74c3c;
                --text-color: #ecf0f1;
                --light-text: #bdc3c7;
                --background-color: #2c3e50;
                --card-background: #34495e;
                --border-color: #2c3e50;
            }
            @media print {
                .theme-toggle {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add to the DOM
        document.body.appendChild(toggleBtn);
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        // Add event listener
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            
            // Update button icon
            toggleBtn.innerHTML = isDark ? 
                '<i class="fas fa-sun"></i>' : 
                '<i class="fas fa-moon"></i>';
                
            // Save preference
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    };
    
    // Create theme toggle button
    createThemeToggle();
    
    // Add print resume button
    const createPrintButton = () => {
        const printBtn = document.createElement('button');
        printBtn.classList.add('print-btn');
        printBtn.innerHTML = '<i class="fas fa-print"></i>';
        printBtn.title = 'Print Resume';
        
        // Add styles for the print button
        const style = document.createElement('style');
        style.textContent = `
            .print-btn {
                position: fixed;
                bottom: 20px;
                right: 80px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: var(--secondary-color);
                color: white;
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                z-index: 100;
                transition: all 0.3s ease;
            }
            .print-btn:hover {
                transform: scale(1.05);
                background-color: var(--accent-color);
            }
            @media print {
                .print-btn {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add to the DOM
        document.body.appendChild(printBtn);
        
        // Add event listener
        printBtn.addEventListener('click', () => {
            window.print();
        });
    };
    
    // Create print button
    createPrintButton();
}); 