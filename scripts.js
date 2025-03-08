document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');

    // Add glass effect to navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 0.43 * window.innerHeight) {
            nav.classList.add('glass-effect');
        } else {
            nav.classList.remove('glass-effect');
        }
    });

    // Handle click events for social buttons
    document.getElementById('linkedin').addEventListener('click', function(event) {
        event.preventDefault();
        window.open('https://www.linkedin.com/in/singhalmilan92', '_blank');
    });

    document.getElementById('github').addEventListener('click', function(event) {
        event.preventDefault();
        window.open('https://github.com/milansinghal2004', '_blank');
    });

    document.getElementById('email').addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'mailto:singhalmilan92@gmail.com';
    });

    // Hover effect for project cards
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.card-overlay');
            overlay.style.transform = 'translateY(0%)';
        });

        card.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.card-overlay');
            overlay.style.transform = 'translateY(-100%)';
        });
    });
});

// Add translucent effect to navbar on scroll
window.addEventListener('scroll', function () {
    var nav = document.querySelector('nav');
    if (window.scrollY > 250) {
        nav.classList.add('translucent');
    } else {
        nav.classList.remove('translucent');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            cards.forEach(c => {
                if (c !== card) {
                    c.style.filter = 'blur(2px)';
                }
            });
        });

        card.addEventListener('mouseleave', function() {
            cards.forEach(c => {
                c.style.filter = 'blur(0)';
            });
        });
    });
});

