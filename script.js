const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const frames = {
    start: 0,
    end: 379,
    currentIndex: 0,
};

let imagesLoaded = 0;
let images = [];

function preloadImages() {
    for (let i = 1; i <= frames.end; i++) {
        const imageUrl = `./frames/image${i}.jpg`;
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === frames.end) {
                loadFrames(frames.currentIndex);
                startAnimation();
            }
        }
        images.push(img);
    }
}

function loadFrames(index) {
    if(index >= 0 && index <= frames.end) {
        const frame = images[index];
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const scaleX = window.innerWidth / frame.width;
        const scaleY = window.innerHeight / frame.height;
        const scale = Math.max(scaleX, scaleY);

        const newWidth = frame.width * scale;
        const newHeight = frame.height * scale;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(frame, offsetX, offsetY, newWidth, newHeight);
        frames.currentIndex = index;
    }
}

function startAnimation() {
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".parent",
            start: "top top",
            end: "bottom top",
            scrub: 2,
        },
    });

    tl.to(frames, {
        currentIndex: frames.end,
        onUpdate: () => loadFrames(Math.floor(frames.currentIndex)),
    });
}

window.addEventListener('load', preloadImages);
