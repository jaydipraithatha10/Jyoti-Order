const productURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=0&single=true&output=csv";

const subCategoryId = localStorage.getItem("subCategoryId");

alert("SubCategory ID = " + subCategoryId);

document.addEventListener("DOMContentLoaded", loadProducts);

async function loadProducts() {

    const res = await fetch(productURL);
    const csv = await res.text();

    const rows = csv.trim().split("\n").slice(1);

    const container = document.getElementById("productContainer");
    container.innerHTML = "";

    rows.forEach(row => {

        const col = row.split(",");

        if (col[1].trim() === subCategoryId &&
            col[6].trim().toLowerCase() === "active") {

            container.innerHTML += `
                <div class="product-card">
                    <img src="${col[5] ? col[5].trim() : 'logo.png'}" alt="${col[2]}">
                    <h3>${col[2]}</h3>
                    <p>${col[3]}</p>
                    <h4>₹${col[4]}</h4>
                </div>
            `;
        }

    });

    if (container.innerHTML === "") {
        container.innerHTML = "<h3>No Products Found</h3>";
    }

}