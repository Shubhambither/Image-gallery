const c=document.querySelectorAll(".cards");
const l = document.querySelector(".lighbox");
const lightboxImg = l.querySelector(".res"); 

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

// Example usage
setFavicon("images/camera.svg", "image/x-icon");  // Use "image/x-icon" for .ico files

async function getimages(n) {
    let i = await fetch(n);
    console.log(i)
    let response = await i .text();
    let div = document.createElement("div");
    div.innerHTML = response;
    // console.log(response);
    let as = div.getElementsByTagName("a");
    // console.log(as);
    let images = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
       if (element.href.match(/\.(jpg|jpeg|png|gif|webp|svg|gif|avif)$/)) {
        const url = new URL(element.href); 
        images.push(decodeURIComponent(url.pathname));
console.log(url.pathname)
        }

    }
    images.sort((a, b) => {
    let numA = a.match(/\d+/);
    let numB = b.match(/\d+/);
    return Number(numA) - Number(numB);
});

    return images;
}

let currentIndex = 0;

window.addEventListener("DOMContentLoaded", async () => {
    const path = window.location.pathname; 
    console.log("Path",path);
    const pageName = path.split("/").pop(); 
    const folder = pageName.replace(".html", ""); 
    const folderPath = `/${folder}/`;
    let images = await getimages(folderPath);


    c.forEach((card, index) => {
        card.addEventListener("click", () => {
            console.log("card clicked");
            const img = card.querySelector("img");
            console.log(img.src);
            lightboxImg.src = images[index];
            currentIndex = index; // 🟢 Store the index
            l.classList.remove("hide");
        });
    });

    document.querySelector('.invert').addEventListener('click', () => {
        l.classList.add('hide');
    });

    // 🟢 NEXT button
    document.querySelector('.next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex];
    });

    // 🟢 BACK button
    document.querySelector('.back').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex];
    });
});
// ========== Logic for .box and .box1 ==========
const boxes = document.querySelectorAll(".box, .box1");
const boxImages = [];
let currentBoxIndex = 0;

// Collect image sources only from boxes with <img>
boxes.forEach((box) => {
    const img = box.querySelector("img");
    if (img) {
        boxImages.push(img.src);

        // Now use correct index from boxImages
        const imageIndex = boxImages.length - 1;

        box.addEventListener("click", () => {
            currentBoxIndex = imageIndex;
            lightboxImg.src = boxImages[currentBoxIndex];
            l.classList.remove("hide");
        });
    }
});


// You can reuse the same close, next, and back buttons if you want
document.querySelector('.next').addEventListener('click', () => {
    if (boxImages.length > 0 && lightboxImg.src.includes(boxImages[currentBoxIndex])) {
        currentBoxIndex = (currentBoxIndex + 1) % boxImages.length;
        lightboxImg.src = boxImages[currentBoxIndex];
    } else {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex];
    }
});

document.querySelector('.back').addEventListener('click', () => {
    if (boxImages.length > 0 && lightboxImg.src.includes(boxImages[currentBoxIndex])) {
        currentBoxIndex = (currentBoxIndex - 1 + boxImages.length) % boxImages.length;
        lightboxImg.src = boxImages[currentBoxIndex];
    } else {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex];
    }
});
const frames = document.querySelectorAll(".frame img, .frame1 img");
const frameImages = [];
let currentFrameIndex = 0;

frames.forEach((img, i) => {
  frameImages.push(img.src);

  img.addEventListener("click", () => {
    currentFrameIndex = i;
    lightboxImg.src = frameImages[currentFrameIndex];
    l.classList.remove("hide");
  });
});
function setupBoxLightbox() {
  const boxes = document.querySelectorAll(".box");
  const lightbox = document.querySelector(".lighbox");
  const lightboxImg = lightbox.querySelector(".res");
  const nextBtn = lightbox.querySelector(".next");
  const backBtn = lightbox.querySelector(".back");
  const closeBtn = lightbox.querySelector(".invert");

  // Collect image elements in exact order of .box elements
  const imageElements = [];
  let currentIndex = 0;

  boxes.forEach((box, index) => {
    const img = box.querySelector("img");
    if (img && img.src) {
      imageElements.push(img);

      // Click event for each image
      box.addEventListener("click", () => {
        currentIndex = index;
        lightboxImg.src = img.src;
        lightbox.classList.remove("hide");
      });
    }
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % imageElements.length;
    lightboxImg.src = imageElements[currentIndex].src;
  });

  backBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + imageElements.length) % imageElements.length;
    lightboxImg.src = imageElements[currentIndex].src;
  });

  closeBtn.addEventListener("click", () => {
    lightbox.classList.add("hide");
  });
}

document.addEventListener("keydown", (e) => {
  const lightbox = document.querySelector(".lighbox");
  if (lightbox.classList.contains("hide")) return;

  if (e.key === "ArrowRight") {
    document.querySelector(".next").click();
  } else if (e.key === "ArrowLeft") {
    document.querySelector(".back").click();
  } else if (e.key === "Escape") {
    document.querySelector(".invert").click();
  }
});
