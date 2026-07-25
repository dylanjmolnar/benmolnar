document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    // Slight delay for animation effect
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300); // Wait for transition
                }
            });
        });
    });

    // Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    // Image/Video Viewer Logic
    const viewer = document.getElementById('image-viewer');
    const fullImage = document.getElementById('full-image');
    const fullVideo = document.getElementById('full-video');
    const viewerCaption = document.getElementById('viewer-caption');
    const closeViewer = document.querySelector('.close-viewer');
    const galleryItemsList = document.querySelectorAll('.gallery-item');

    galleryItemsList.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const media = item.querySelector('img, video');
            if (!media) return;

            viewer.style.display = 'flex';
            // Slight delay to allow display:flex to apply before setting opacity for transition
            setTimeout(() => {
                viewer.classList.add('open');
            }, 10);
            
            const itemTitle = item.querySelector('h3') ? item.querySelector('h3').textContent : '';
            const itemCategory = item.querySelector('p') ? item.querySelector('p').textContent : '';
            
            viewerCaption.innerHTML = `<h3>${itemTitle}</h3><p style="font-size:0.9rem; color:var(--accent-color); margin-top:4px; text-transform:uppercase; letter-spacing:1px;">${itemCategory}</p>`;
            
            if (media.tagName === 'VIDEO') {
                fullImage.style.display = 'none';
                fullVideo.style.display = 'block';
                fullVideo.src = media.src;
                fullVideo.play();
            } else {
                fullVideo.style.display = 'none';
                fullVideo.pause();
                fullImage.style.display = 'block';
                fullImage.src = media.src;
            }
            
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    const closeImageModal = () => {
        viewer.classList.remove('open');
        setTimeout(() => {
            viewer.style.display = 'none';
            fullVideo.pause(); // Stop video if playing
        }, 300); // Wait for transition
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    if (closeViewer) {
        closeViewer.addEventListener('click', closeImageModal);
    }

    if (viewer) {
        viewer.addEventListener('click', (e) => {
            if (e.target === viewer) {
                closeImageModal();
            }
        });
    }
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && viewer && viewer.classList.contains('open')) {
            closeImageModal();
        }
    });
});
