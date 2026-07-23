// ===========================
// Google Sheet CSV URL
// ===========================

const subCategoryURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=35788410&single=true&output=csv";

// ===========================
// Get Category ID
// ===========================

const categoryId = localStorage.getItem("categoryId");

// ===========================
// Load Sub Categories
// ===========================

async function loadSubCategories() {

    try {

        const response = await fetch(subCategoryURL);
        const csv = await response.text();

        const rows = csv.trim().split("\n").slice(1);

        const grid = document.getElementById("subCategoryGrid");

        grid.innerHTML = "";

        rows.forEach(row => {

            const col = row.split(",");

            const id = col[0]?.trim();
            const catId = col[1]?.trim();
            const name = col[2]?.trim();
            const image = col[3]?.trim().replace(/"/g, "");
            const status = col[4]?.trim().toLowerCase();

            if (catId !== categoryId) return;

            if (status !== "active") return;

            grid.innerHTML += `
                <div class="card" onclick="openProducts('${id}','${name}')">

                    <img src="${image}" alt="${name}">

                    <div class="content">

                        <h2>${name}</h2>

                        <button>Explore →</button>

                    </div>

                </div>
            `;

        });

    } catch (error) {

        console.error("Error Loading Sub Categories:", error);

    }

}

// ===========================
// Open Products
// ===========================

function openProducts(id, name) {

    localStorage.setItem("subCategoryId", id);
    localStorage.setItem("subCategoryName", name);

    window.location.href = "products.html";

}

// ===========================
// Page Load
// ===========================

document.addEventListener("DOMContentLoaded", loadSubCategories);