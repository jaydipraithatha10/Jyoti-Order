// ===========================
// CATEGORY CSV
// ===========================

const categoryURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=2013716827&single=true&output=csv";

let allCategories = [];

// ===========================
// AUTO SLIDER
// ===========================

const banners = [
    "banner1.jpg",
    "banner2.jpg",
    "banner3.jpg"
];

let currentBanner = 0;

function startSlider(){

    const img = document.getElementById("sliderImage");

    if(!img) return;

    setInterval(()=>{

        currentBanner++;

        if(currentBanner >= banners.length){
            currentBanner = 0;
        }

        img.src = banners[currentBanner];

    },3000);

}

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