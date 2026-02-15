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
    const viewButton = document.querySelector('.highlights-section button');
    if (viewButton) {
        viewButton.addEventListener('click', () => {
            // In a real scenario, this might open a modal or navigate to Google Photos
            window.open('https://photos.app.goo.gl/Er7jy8RZ31cDpApi9', '_blank');
        });
    }

    // --- Fun Features: Confetti ---
    const celebrateBtn = document.getElementById('celebrateBtn');
    if (celebrateBtn) {
        celebrateBtn.addEventListener('click', (e) => {
            // Button animation feedback
            celebrateBtn.style.transform = 'scale(0.9)';
            setTimeout(() => celebrateBtn.style.transform = 'scale(1)', 100);

            // Create confetti
            createConfetti(50);
        });
    }

    function createConfetti(amount) {
        const colors = ['#98FFB3', '#FF8C00', '#FFD700', '#FF6B6B', '#4ECDC4'];

        for (let i = 0; i < amount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');

            // Random properties
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100; // 0 to 100vw
            const size = Math.random() * 8 + 6; // 6px to 14px
            const animDuration = Math.random() * 3 + 2; // 2s to 5s

            confetti.style.backgroundColor = color;
            confetti.style.left = left + 'vw';
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            confetti.style.animationDuration = animDuration + 's';
            confetti.style.zIndex = '9999'; // Ensure it's on top

            // Shapes (Square or Circle)
            if (Math.random() > 0.5) confetti.style.borderRadius = '50%';

            document.body.appendChild(confetti);

            // Cleanup
            setTimeout(() => {
                confetti.remove();
            }, animDuration * 1000);
        }
    }

    // --- Voting Logic ---
    let votes = {
        liverpool: parseInt(localStorage.getItem('vote_liverpool')) || 120, // Starting with some example votes for fun
        manchester: parseInt(localStorage.getItem('vote_manchester')) || 115
    };

    function updateVoteUI() {
        // Update text
        const liverpoolEl = document.getElementById('count-liverpool');
        const manchesterEl = document.getElementById('count-manchester');

        if (liverpoolEl) liverpoolEl.innerText = votes.liverpool;
        if (manchesterEl) manchesterEl.innerText = votes.manchester;

        // Update progress bars
        const total = votes.liverpool + votes.manchester;
        const liverpoolPct = (votes.liverpool / total) * 100;
        const manchesterPct = (votes.manchester / total) * 100;

        const barLiverpool = document.getElementById('bar-liverpool');
        const barManchester = document.getElementById('bar-manchester');

        if (barLiverpool && barManchester) {
            barLiverpool.style.width = liverpoolPct + '%';
            barManchester.style.width = manchesterPct + '%';
        }
    }

    // Expose vote function to global scope for HTML onclick
    window.vote = function (team) {
        votes[team]++;
        localStorage.setItem('vote_' + team, votes[team]);

        updateVoteUI();

        // Pop effect
        const card = document.querySelector(`.vote-card.${team}`);
        card.style.transform = 'scale(0.95)';
        setTimeout(() => card.style.transform = 'translateY(-10px) scale(1.02)', 100);

        // Mini confetti for vote
        createConfetti(15);
    };

    // Initialize
    updateVoteUI();
});
