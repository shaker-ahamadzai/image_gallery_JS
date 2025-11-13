const fileInput = document.querySelector("#fileInput");
const gallery  = document.querySelector("#gallery");
const lightBox = document.querySelector('#lightbox');
const lightboxImg = document.querySelector("#lightboxImg");

let imags = [];

// ✅ Load saved images from localStorage when the page loads
window.addEventListener("DOMContentLoaded", () => {
    const savedImages = JSON.parse(localStorage.getItem("images")) || [];
    imags = savedImages;
    displayImage();
});

fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    if (files.length === 0) return;

    for (let file of files)
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const imageUrl = event.target.result;
                imags.push(imageUrl);
                // ✅ Save images to localStorage every time a new one is added
                localStorage.setItem("images", JSON.stringify(imags));
                displayImage();
            };
            reader.readAsDataURL(file);
        }
});

function displayImage() {
    gallery.innerHTML = '';
    imags.forEach((imageUrl, index) => {
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = `Image ${index + 1}`;
        img.onclick = () => openLightbox(imageUrl);
        gallery.appendChild(img);
    });
}

function openLightbox(imageUrl) {
    lightboxImg.src = imageUrl;
    lightBox.style.display = 'flex';
}

function closeLightbox() {
    lightBox.style.display = 'none';
}

document.querySelector("#clearGallery").addEventListener("click", () => {
    localStorage.removeItem("images");
    imags = [];
    displayImage();
});




