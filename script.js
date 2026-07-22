/* ===================================
   JYOTI GRUH UDHYOG
   SCRIPT.JS - PART 1
=================================== */

/* Google Sheet CSV URLs */

const CATEGORY_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=2013716827&single=true&output=csv";

const SUBCATEGORY_URL = "";
const PRODUCT_URL = "";

/* Global Variables */

let categories = [];
let subcategories = [];
let products = [];
let cart = [];

/* ==========================
   Loader
========================== */

function showLoader() {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "flex";
}

function hideLoader() {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
}

/* ==========================
   Fetch CSV
========================== */

async function getCSV(url) {

    try {

        showLoader();

        const response = await fetch(url);

        const csv = await response.text();

        hideLoader();

        return csv;

    } catch (error) {

        hideLoader();

        console.error(error);

        return "";

    }

}

/* ==========================
   CSV → JSON
========================== */

function csvToJSON(csv) {

    const rows = csv.trim().split("\n");

    const headers = rows[0].split(",");

    const data = [];

    for (let i = 1; i < rows.length; i++) {

        const obj = {};

        const cols = rows[i].split(",");

        headers.forEach((header, index) => {

            obj[header.trim()] = cols[index]
                ? cols[index].trim()
                : "";

        });

        data.push(obj);

    }

    return data;

}

/* ===================================
   SCRIPT.JS - PART 2
=================================== */

/* Load Categories */

async function loadCategories() {


    const csv = await getCSV(CATEGORY_URL);

    if (!csv) return;

    categories = csvToJSON(csv);

    const grid = document.getElementById("categoryGrid");

    if (!grid) return;

    let html = "";

    categories.forEach(item => {

        if (item.Status !== "Active") return;

        html += `
        <div class="category-card fade-in"
             onclick="openCategory('${item.ID}')">

            <img src="${item.Image}"
                 alt="${item.Category}"
                 onerror="this.src='no-image.png'">

            <h3>${item.Category}</h3>

        </div>
        `;

    });

    grid.innerHTML = html;

}

/* Search Category */

function searchCategory() {

    const keyword = document
        .getElementById("search")
        .value
        .toLowerCase();

    document.querySelectorAll(".category-card").forEach(card => {

        const text = card.innerText.toLowerCase();

        card.style.display =
            text.includes(keyword)
            ? ""
            : "none";

    });

}

/* Category Click */

function openCategory(id) {

    localStorage.setItem("selectedCategoryId", id);

    window.location.href = "category.html";

}

/* Auto Load */

document.addEventListener("DOMContentLoaded", () => {

    if (document.getElementById("categoryGrid")) {

        loadCategories();

    }

});
async function loadSubCategories(){

const categoryId = localStorage.getItem("categoryId");

const data = await getCSV(SUBCATEGORY_URL);

const list = csvToJSON(data);

const container = document.getElementById("subcategoryContainer");

container.innerHTML="";

list.forEach(item=>{

if(item.Status!="Active") return;

if(item.CategoryID!=categoryId) return;

container.innerHTML+=`

<div class="card" onclick="openSubCategory('${item.ID}')">

<img src="${item.Image}" alt="">

<h3>${item.SubCategory}</h3>

</div>

`;

});

}

function openSubCategory(id){

localStorage.setItem("subCategoryId",id);

window.location.href="products.html";

}