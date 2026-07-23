const subCategoryURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=35788410&single=true&output=csv";

const categoryURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=2013716827&single=true&output=csv";

let allSubCategories = [];
const categoryId = localStorage.getItem("categoryId");

document.addEventListener("DOMContentLoaded", () => {
    loadCategoryTitle();
    loadSubCategories();
});

// Category Name
async function loadCategoryTitle() {

    const res = await fetch(categoryURL);
    const csv = await res.text();

    const rows = csv.trim().split("\n").slice(1);

    rows.forEach(row => {

        const col = row.split(",");

        if (col[0].trim() === categoryId) {
            document.getElementById("categoryTitle").innerText = col[1].trim();
        }

    });

}

// Load Sub Categories
async function loadSubCategories() {

    const res = await fetch(subCategoryURL);
    const csv = await res.text();

    const rows = csv.trim().split("\n").slice(1);

    allSubCategories = [];

    rows.forEach(row => {

        const col = row.split(",");

        if (col.length < 5) return;

        if (col[1].trim() !== categoryId) return;

        if (col[4].trim().toLowerCase() !== "active") return;

        allSubCategories.push({
            id: col[0].trim(),
            name: col[2].trim(),
            image: col[3].trim()
        });

    });

    showSubCategories(allSubCategories);

}

// Show Sub Categories

function showSubCategories(data){

    const container = document.getElementById("subcategoryContainer");

    container.innerHTML = "";

    data.forEach(item => {

        container.innerHTML += `
        <div class="category-card" onclick="openProducts('${item.id}')">

            <img src="${item.image || 'logo.png'}" alt="${item.name}">

            <h3>${item.name}</h3>

        </div>
        `;

    });

}
// Search
function searchSubCategory() {

    const value = document
        .getElementById("searchSub")
        .value
        .toLowerCase();

    const filtered = allSubCategories.filter(item =>
        item.name.toLowerCase().includes(value)
    );

    showSubCategories(filtered);

}

// Open Product Page
function openProducts(id) {

    localStorage.setItem("subCategoryId", String(id).trim());

    window.location.href = "product.html";

}