window.addEventListener("DOMContentLoaded", async () => {
    const l = document.querySelector(".lighbox");
    const lightboxImg = l.querySelector(".res");
    const invert = document.querySelector(".invert");
    const nextBtn = document.querySelector(".next");
    const backBtn = document.querySelector(".back");

    const path = window.location.pathname;
    const pageName = path.split("/").pop();
    const folder = pageName.replace(".html", "");

    let lightboxSources = [];
    let currentIndex = 0;

    // 🔁 Get JSON images
    async function getImagesFromJSON(folder) {
        try {
            const response = await fetch("images.json");
            const data = await response.json();
            return data[folder] || [];
        } catch (err) {
            console.error("JSON load error:", err);
            return [];
        }
    }

    // 🔁 Add images from .cards (Marvel)
    const jsonImages = await getImagesFromJSON(folder);
    const cards = document.querySelectorAll(".cards");
    if (jsonImages.length && cards.length) {
        lightboxSources = jsonImages;
        cards.forEach((card, index) => {
            card.addEventListener("click", () => {
                currentIndex = index;
                lightboxImg.src = lightboxSources[currentIndex];
                l.classList.remove("hide");
            });
        });
    }

    // 🔁 Add images from .box, .box1, .frame, .frame1
    const otherSelectors = ".box img, .box1 img, .frame img, .frame1 img";
    document.querySelectorAll(otherSelectors).forEach((img, i) => {
        lightboxSources.push(img.src);
        img.addEventListener("click", () => {
            currentIndex = lightboxSources.indexOf(img.src);
            lightboxImg.src = lightboxSources[currentIndex];
            l.classList.remove("hide");
        });
    });

    // 🔁 Lightbox controls
    invert.addEventListener("click", () => {
        l.classList.add("hide");
    });

    nextBtn.addEventListener("click", () => {
        if (lightboxSources.length === 0) return;
        currentIndex = (currentIndex + 1) % lightboxSources.length;
        lightboxImg.src = lightboxSources[currentIndex];
    });

    backBtn.addEventListener("click", () => {
        if (lightboxSources.length === 0) return;
        currentIndex = (currentIndex - 1 + lightboxSources.length) % lightboxSources.length;
        lightboxImg.src = lightboxSources[currentIndex];
    });

    // 🔁 Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
        if (l.classList.contains("hide")) return;
        if (e.key === "ArrowRight") nextBtn.click();
        else if (e.key === "ArrowLeft") backBtn.click();
        else if (e.key === "Escape") invert.click();
    });

    function setFavicon(url, type = "images/png") {
    let link = document.querySelector("link[rel~='icon']");
    
    if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
    }

    link.href = url;
    link.type = type;
}
    // ✅ Optional: favicon setup
    setFavicon("images/camera.svg", "image/x-icon");
});
