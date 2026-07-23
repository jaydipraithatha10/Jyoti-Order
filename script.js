// ===========================
// CATEGORY CSV
// ===========================

const categoryURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=2013716827&single=true&output=csv";

let allCategories = [];

// ===========================
// AUTO SLIDER
// ===========================

// ===========================
// PREMIUM HERO SLIDER
// ===========================

const banners = [
    "banner1.png",
    "banner2.png",
    "banner3.png"
];

let currentBanner = 0;
let sliderInterval;

function updateDots() {
    document.querySelectorAll(".dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentBanner);
    });
}

function showSlide(index){

    const img = document.getElementById("sliderImage");

    img.style.opacity = "0";

    setTimeout(() => {

        img.src = banners[index];

        img.onload = () => {
            img.style.opacity = "1";
        };

    }, 300);

}

function nextSlide() {

    currentBanner++;

    if (currentBanner >= banners.length)
        currentBanner = 0;

    showSlide(currentBanner);

}

function prevSlide() {

    currentBanner--;

    if (currentBanner < 0)
        currentBanner = banners.length - 1;

    showSlide(currentBanner);

}

function goToSlide(index) {

    currentBanner = index;

    showSlide(currentBanner);

}

function startSlider() {

    sliderInterval = setInterval(nextSlide, 3000);

}

function stopSlider() {

    clearInterval(sliderInterval);

}

document.addEventListener("DOMContentLoaded", () => {

    startSlider();

    loadCategories();

    const slider = document.querySelector(".slider");

    slider.addEventListener("mouseenter", stopSlider);

    slider.addEventListener("mouseleave", startSlider);

    let startX = 0;

    slider.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });

    slider.addEventListener("touchend", e => {

        let endX = e.changedTouches[0].clientX;

        if (startX - endX > 50)
            nextSlide();

        if (endX - startX > 50)
            prevSlide();

    });

});

        
// ===========================
// LOAD
// ===========================

document.addEventListener("DOMContentLoaded",()=>{

    startSlider();

    loadCategories();

});

// ===========================
// LOAD CATEGORY
// ===========================

async function loadCategories(){

    const res = await fetch(categoryURL);

    const csv = await res.text();

    const rows = csv.trim().split("\n").slice(1);

    allCategories = [];

    rows.forEach(row=>{

        const col = row.split(",");

        if(col.length < 4) return;

        if(col[3].trim().toLowerCase()!="active") return;

        allCategories.push({

            id:col[0].trim(),

            name:col[1].trim(),

            image:col[2].trim()

        });

    });

    showCategories(allCategories);

}

// ===========================
// SHOW CATEGORY
// ===========================

function showCategories(data){

    const grid=document.getElementById("categoryGrid");

    grid.innerHTML="";

    data.forEach(item=>{

        grid.innerHTML += `

        <div class="category-card"
        onclick="openCategory('${item.id}')">

            <img src="${item.image || 'logo.png'}">

            <h3>${item.name}</h3>

        </div>

        `;

    });

}

// ===========================
// SEARCH
// ===========================

function searchCategory(){

    const value=document
    .getElementById("search")
    .value
    .toLowerCase();

    const filtered=allCategories.filter(item=>

        item.name.toLowerCase().includes(value)

    );

    showCategories(filtered);

}

// ===========================
// OPEN CATEGORY
// ===========================

function openCategory(id){

    localStorage.setItem("categoryId",id);

    window.location.href="category.html";

}