//Scroll-triggered Text animations

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

//Sticky + Horizontal scrolling

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

//Frame by Frame scrolling

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

//Parallax animation

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

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader")

    window.scrollTo(0, 0); // Scroll to top when Loading the page has finished
    console.log("Page has loaded");

    loader.classList.add("loader--hidden");

    loader.addEventListener("transitionend", () => {
        document.body.removeChild(loader);

    });
});

//Video format debugging

function isBrowserCompatibleWithWebM() {
    const video = document.createElement('video');
    return video.canPlayType('video/webm; codecs="vp9"') !== "";
}

const videoElement = document.getElementById('video-content');

if (isBrowserCompatibleWithWebM()) {
    const webmSrc = document.createElement('source');
    webmSrc.src = 'https://mmmmmmvk.s3.eu-north-1.amazonaws.com/3d-vp9-chrome.webm';
    webmSrc.type = 'video/webm;';
    webmSrc.alt = 'Video animation';
    videoElement.appendChild(webmSrc);
} else {
    const mp4Src = document.createElement('source');
    mp4Src.src = 'https://mmmmmmvk.s3.eu-north-1.amazonaws.com/3d-hevc-safari.mp4';
    mp4Src.type = 'video/mp4;';
    mp4Src.alt = 'Video animation';
    videoElement.appendChild(mp4Src); 
}