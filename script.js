const categoryURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=2013716827&single=true&output=csv";

let allCategories = [];

document.addEventListener("DOMContentLoaded", loadCategories);

async function loadCategories() {

    const res = await fetch(categoryURL);
    const csv = await res.text();

    const rows = csv.trim().split("\n").slice(1);

    allCategories = [];

    rows.forEach(row => {

        const col = row.split(",");

        allCategories.push({
            id: col[0].trim(),
            name: col[1].trim(),
            image: col[2] ? col[2].trim() : "",
            status: col[3] ? col[3].trim() : "Active"
        });

    });

    showCategories(allCategories);
}

function showCategories(data) {

    const grid = document.getElementById("categoryGrid");

    grid.innerHTML = "";

    data.forEach(item => {

        if (item.status.toLowerCase() !== "active") return;

        grid.innerHTML += `
        <div class="category-card" onclick="openCategory('${item.id}')">

            <img src="${item.image || 'logo.png'}" alt="${item.name}">

            <h3>${item.name}</h3>

        </div>
        `;
    });
}

function searchCategory() {

    const value = document.getElementById("search").value.toLowerCase();

    const filtered = allCategories.filter(item =>
        item.name.toLowerCase().includes(value)
    );

    showCategories(filtered);
}

function openCategory(id) {

    localStorage.setItem("categoryId", id);

    window.location.href = "category.html";
}