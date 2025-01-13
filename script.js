const observerSettings = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add ('visible');
        } else {
            entry.target.classList.remove ('visible');
        }
    });
}, observerSettings);

document.querySelectorAll('.animate-element').forEach((element) => {
    observer.observe(element);
});

const stickyContainer = document.querySelector('.sticky-container');
const gallery = document.querySelector('.gallery');

let isScrollingH = true;
const galleryItems = document.querySelectorAll('.gallery-item');
const totalGalleryWidth = (galleryItems.length * 300) + ((galleryItems.length - 1) * 32);
const maxScroll = totalGalleryWidth - window.innerWidth + 64;

function updateGalleryPosition () {
    const containerRect = stickyContainer.getBoundingClientRect();
    const scrollPct = Math.max(0, -containerRect.top) / (window.innerHeight * 2);

    if (scrollPct <= 0.5) {
        const translateX = Math.min(maxScroll, scrollPct * 2 * maxScroll);
        gallery.style.transform = `translateX(-${translateX}px)`;
        isScrollingH = true;
    } else {
        isScrollingH = false;
    }
}

window.addEventListener('scroll', updateGalleryPosition);
window.addEventListener('resize', updateGalleryPosition);

updateGalleryPosition();

const videoWrapper = document.querySelector('.video-wrapper');
const video = document.querySelector('video');

video.pause();

video.addEventListener('loadedmetadata', () => {
    const handleVideoScroll = () => {
        const rect = videoWrapper.getBoundingClientRect();
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;

        let scrollprogress;

        if (rect.top <= 0 && rect.bottom >= viewportHeight) {
            scrollProgress = -rect.top / (sectionHeight - viewportHeight);
        } else if (rect.top > 0) {
            scrollProgress = 0;
        } else {
            scrollProgress = 1;
        }

        scrollProgress = Math.max(0, Math.min(1, scrollProgress));
        video.currentTime = video.duration * scrollProgress;
    };

    window.addEventListener('scroll', handleVideoScroll);
    handleVideoScroll();
});

video.preload = 'auto';

const parallaxSection = document.querySelector('.parallax');
const layers = document.querySelectorAll('.parallax-layer');

window.addEventListener('scroll',() => {
    const scrolled = window.scrollY;
    const sectionTop = parallaxSection.offsetTop;
    const sectionBottom = sectionTop + parallaxSection.offsetHeight;

    if (scrolled + window.innerHeight > sectionTop && scrolled < sectionBottom) {

        const relScroll = scrolled - sectionTop;

        layers.forEach((layer, index ) => {
            
        const speed = (4 - index) * 0.2;
        const yOffset = relScroll * speed;

        layer.style.transform = `translateY(${yOffset}px)`;

    });
    }
})