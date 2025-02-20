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


const scrollImg = document.getElementById('framebyframe-scroll');
const totalFrames = 299;

const videoWrapper = document.querySelector('.video-wrapper');

function preloadFrames() {
    for (let i = 0; i <= totalFrames; i++) {
        const img = new Image();
        img.src = `img/onepager_${String(i).padStart(5, '0')}.webp`;
    }
}

preloadFrames();

window.addEventListener('scroll', () => {
    const wrapperTop = videoWrapper.getBoundingClientRect().top;
    const wrapperHeight = videoWrapper.offsetHeight;
    const viewportHeight = window.innerHeight;

    if (wrapperTop < viewportHeight && wrapperTop + wrapperHeight > 0) {
        const maxScrollInSection = wrapperHeight - viewportHeight;
        const scrollPosInSection = Math.min(Math.max(-wrapperTop, 0), maxScrollInSection);
        const scrollPct = Math.min(Math.max(scrollPosInSection / maxScrollInSection, 0), 1);
        const currentFrame = Math.floor(scrollPct * totalFrames);
        scrollImg.src = `img/onepager_${String(currentFrame).padStart(5, '0')}.webp`;
    } else if (wrapperTop + wrapperHeight <= 0) {
        scrollImg.src = `img/onepager_${String(totalFrames - 1).padStart(5, '0')}.webp`;
    } else if (wrapperTop >= viewportHeight) {
        scrollImg.src = `img/onepager_00000.webp`;
    }
});



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

    window.scrollTo(0, 0); //Scroll to top when Loading the page has finished
    console.log("Page has loaded");

    loader.classList.add("loader--hidden");

    loader.addEventListener("transitionend", () => {
        document.body.removeChild(loader);

    });
});

//Restart the experience button

document.getElementById('restartBtn').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});