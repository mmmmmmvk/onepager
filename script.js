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