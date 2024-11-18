const galleryItems = document.querySelectorAll(".gallery-item");
const viewer = document.querySelector(".image-viewer");
const viewerImage = document.querySelector(".viewer-image");
const imageNumber = document.querySelector(".image-number");
const closeBtn = document.querySelector(".close-btn");
const zoomBtn = document.querySelector(".zoom-btn");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const shareBtn = document.querySelector(".share-btn");
const shareMenu = document.querySelector(".share-menu");
const downloadBtn = document.querySelector(".download-btn");

let currentIndex = 0;
let isZoomed = false;

// Open Viewer
galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        currentIndex = index;
        showImage();
        viewer.style.display = "flex";
    });
});

// Close Viewer
closeBtn.addEventListener("click", () => {
    viewer.style.display = "none";
});

// Show Image
function showImage() {
    const selectedItem = galleryItems[currentIndex].querySelector("img");
    viewerImage.src = selectedItem.src;
    imageNumber.textContent = `${currentIndex + 1}/${galleryItems.length}`;
    downloadBtn.href = selectedItem.src;
}

// Next and Previous
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    showImage();
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    showImage();
});

// Zoom
zoomBtn.addEventListener("click", () => {
    isZoomed = !isZoomed;
    viewerImage.style.transform = isZoomed ? "scale(1.5)" : "scale(1)";
    viewerImage.style.transition = "transform 0.3s";
});

// Share Dropdown
shareBtn.addEventListener("click", () => {
    shareMenu.style.display = shareMenu.style.display === "block" ? "none" : "block";
});
