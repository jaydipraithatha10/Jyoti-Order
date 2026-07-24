// =========================================
// Product.js
// Part 1
// =========================================

// Google Sheet Products CSV
const sheetURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=0&single=true&output=csv";

// Selected Sub Category
const subCategoryId = localStorage.getItem("subCategoryId");

// Elements
const productGrid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const itemCount = document.getElementById("itemCount");
const grandTotal = document.getElementById("grandTotal");
const bottomBar = document.getElementById("bottomBar");

// ============================
// Get Cart
// ============================

function getCart() {

    return JSON.parse(localStorage.getItem("cart")) || [];

}

// ============================
// Save Cart
// ============================

function saveCart(cart) {

    localStorage.setItem("cart", JSON.stringify(cart));

}

// ============================
// Update Bottom Bar
// ============================

function updateSummary() {

    const cart = getCart();

    let items = 0;
    let total = 0;

    cart.forEach(item => {

        items += item.qty;
        total += item.qty * item.price;

    });

    if (cartCount)
        cartCount.innerText = items;

    if (itemCount)
        itemCount.innerText = items + " Items";

    if (grandTotal)
        grandTotal.innerText = total;

    if (bottomBar) {

        if (items === 0) {

            bottomBar.style.display = "none";

        } else {

            bottomBar.style.display = "flex";

        }

    }

}
// =========================================
// Part 2
// Load Products
// =========================================

async function loadProducts() {

    try {

        const response = await fetch(sheetURL);
        const csv = await response.text();

        const rows = csv.trim().split("\n").slice(1);

        productGrid.innerHTML = "";

        rows.forEach(row => {

            const col = row.split(",");

            const id = col[0].trim();
            const subId = col[1].trim();
            const name = col[2].trim();
            const weight = col[3].trim();
            const price = Number(col[4].trim());
            const status = col[5].trim().toLowerCase();

            if (status !== "active") return;

            if (subId != subCategoryId) return;

            const cart = getCart();

            const item = cart.find(p => p.id == id);

            const qty = item ? item.qty : 0;

            const card = document.createElement("div");

            card.className = "product-card";

            card.innerHTML = `

                <h3>${name}</h3>

                <p class="weight">${weight}</p>

                <h2>₹${price}</h2>

                <div class="qty-box">

                    <button class="qty-btn"
                    onclick="changeQty('${id}','${subId}','${name}','${weight}',${price},-1)">
                    −
                    </button>

                    <span class="qty">${qty}</span>

                    <button class="qty-btn"
                    onclick="changeQty('${id}','${subId}','${name}','${weight}',${price},1)">
                    +
                    </button>

                </div>

            `;

            productGrid.appendChild(card);

        });

    } catch (error) {

        console.log(error);

    }

}