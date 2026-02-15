document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animate Bento Items
    const bentoItems = document.querySelectorAll('.bento-item');
    bentoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.1}s`;
        observer.observe(item);
    });

    // Animate Sections
    const sections = document.querySelectorAll('.section-header, .highlights-section > div');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.8s ease';
        observer.observe(section);
    });

    // Add click event for "View Full Album" (Simulation)
    const viewButton = document.querySelector('button');
    if(viewButton) {
        viewButton.addEventListener('click', () => {
            // In a real scenario, this might open a modal or navigate to Google Photos
            window.open('https://photos.app.goo.gl/Er7jy8RZ31cDpApi9', '_blank');
        });
    }
});
