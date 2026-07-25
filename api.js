// ==============================
// Google Sheet CSV URLs
// ==============================

const categoryURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=2013716827&single=true&output=csv";

const subCategoryURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=35788410&single=true&output=csv";

const productURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=0&single=true&output=csv";

// ==============================
// Read CSV
// ==============================

async function fetchCSV(url) {
    const response = await fetch(url);
    return await response.text();
}

function csvToArray(csv) {
    return csv.trim().split("\n").map(row => row.split(","));
}

// ==============================
// URL Parameter
// ==============================

function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}

// ==============================
// Load Categories
// ==============================

async function loadCategories() {

    const csv = await fetchCSV(categoryURL);
    const rows = csvToArray(csv);

    const list = document.getElementById("categoryList");

    if (!list) return;

    list.innerHTML = "";

    rows.slice(1).forEach(row => {

        const id = row[0];
        const category = row[1];
        const image = row[2];
        const status = row[3];

        if (status.trim().toLowerCase() !== "active") return;

        list.innerHTML += `
        <div class="category-card"
             onclick="location.href='category.html?id=${id}'">

            <img src="${image}" alt="${category}">
            <h3>${category}</h3>

        </div>`;
    });
}

// ==============================
// Load SubCategories
// ==============================

async function loadSubCategories() {

    const list = document.getElementById("subCategoryList");

    if (!list) return;

    const categoryId = getParam("id");

    const csv = await fetchCSV(subCategoryURL);
    const rows = csvToArray(csv);

    list.innerHTML = "";

    rows.slice(1).forEach(row => {

        const id = row[0];
        const catId = row[1];
        const subCategory = row[2];
        const image = row[3];
        const status = row[4];

        if (status.trim().toLowerCase() !== "active") return;
        if (catId != categoryId) return;

        list.innerHTML += `
        <div class="category-card"
             onclick="location.href='subcategory.html?id=${id}'">

            <img src="${image}" alt="${subCategory}">
            <h3>${subCategory}</h3>

        </div>`;
    });
}

// ==============================
// Initialize
// ==============================

document.addEventListener("DOMContentLoaded", () => {
    loadCategories();
    loadSubCategories();
});