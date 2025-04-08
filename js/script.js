document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
    }
    
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to elements when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.timeline-item, .skill-item, .language-item').forEach(item => {
        observer.observe(item);
    });
    
    // Print CV functionality
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i> Print CV';
    printButton.classList.add('print-button');
    document.querySelector('.container').appendChild(printButton);
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    // Add print styles
    const printStyles = document.createElement('style');
    printStyles.innerHTML = `
        @media print {
            .theme-toggle, .print-button {
                display: none !important;
            }
            
            body {
                background-color: white !important;
                color: black !important;
            }
            
            section, header {
                box-shadow: none !important;
                border: 1px solid #ddd !important;
                break-inside: avoid;
            }
            
            .container {
                padding: 0 !important;
            }
        }
    `;
    document.head.appendChild(printStyles);
    
    // Add print button styles
    const buttonStyles = document.createElement('style');
    buttonStyles.innerHTML = `
        .print-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50px;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            box-shadow: 0 2px 10px var(--shadow-color);
            transition: transform 0.2s, background-color 0.3s;
            z-index: 1000;
        }
        
        .print-button:hover {
            transform: scale(1.05);
            background-color: var(--secondary-color);
        }
        
        .print-button i {
            margin-right: 8px;
        }
        
        @media (max-width: 768px) {
            .print-button {
                bottom: 10px;
                right: 10px;
                padding: 8px 15px;
                font-size: 14px;
            }
        }
    `;
    document.head.appendChild(buttonStyles);
});