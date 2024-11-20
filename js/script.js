const galleryItems = document.querySelectorAll('.gallery-item img');
const fullscreenViewer = document.getElementById('fullscreenViewer');
const fullscreenImage = document.getElementById('fullscreenImage');
const imageCounter = document.getElementById('imageCounter');
const closeButton = document.getElementById('closeButton');
const zoomButton = document.getElementById('zoomButton');
const downloadButton = document.getElementById('downloadButton');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const shareFacebook = document.getElementById('shareFacebook');
const shareWhatsapp = document.getElementById('shareWhatsapp');
const shareInstagram = document.getElementById('shareInstagram');

let currentIndex = 0;
let isZoomed = false;

// Open fullscreen viewer
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = index;
        openFullscreenViewer(item.src, index + 1);
    });
});

// Close the fullscreen viewer
closeButton.addEventListener('click', () => {
    fullscreenViewer.classList.remove('active');
    resetZoom();
});

// Navigate to the previous image
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateFullscreenImage();
});

// Navigate to the next image
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateFullscreenImage();
});

// Toggle zoom on button click
zoomButton.addEventListener('click', toggleZoom);

// Toggle zoom on image click
fullscreenImage.addEventListener('click', toggleZoom);

// Share on Facebook
shareFacebook.addEventListener('click', () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullscreenImage.src)}`;
    window.open(facebookUrl, '_blank');
});

// Share on WhatsApp
shareWhatsapp.addEventListener('click', () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent('Check out this image: ' + fullscreenImage.src)}`;
    window.open(whatsappUrl, '_blank');
});

// Share on Instagram (Direct URL sharing not supported)
shareInstagram.addEventListener('click', () => {
    alert('Instagram does not support direct URL sharing. You can download the image and upload it manually.');
});

// Download the current image
downloadButton.addEventListener('click', downloadCurrentImage);

function openFullscreenViewer(src, index) {
    fullscreenImage.src = src;
    imageCounter.textContent = `${index} / ${galleryItems.length}`;
    downloadButton.setAttribute('download', `image-${index}.jpg`);
    downloadButton.setAttribute('href', src);
    fullscreenViewer.classList.add('active');
    resetZoom();
}

function updateFullscreenImage() {
    const currentImage = galleryItems[currentIndex];
    fullscreenImage.src = currentImage.src;
    imageCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
    downloadButton.setAttribute('download', `image-${currentIndex + 1}.jpg`);
    downloadButton.setAttribute('href', currentImage.src);
    resetZoom();
}

function toggleZoom() {
    isZoomed = !isZoomed;
    if (isZoomed) {
        fullscreenImage.classList.add('zoomed');
    } else {
        fullscreenImage.classList.remove('zoomed');
    }
}

function resetZoom() {
    isZoomed = false;
    fullscreenImage.classList.remove('zoomed');
}

function downloadCurrentImage() {
    const anchor = document.createElement('a');
    anchor.href = fullscreenImage.src;
    anchor.download = `image-${currentIndex + 1}.jpg`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}

