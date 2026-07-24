// ==========================================
// Product.js
// Part 1
// Jyoti Gruh Udhyog
// ==========================================

// Products CSV
const sheetURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=0&single=true&output=csv";

// Selected Sub Category
const subCategoryId = localStorage.getItem("subCategoryId");

// Product Container
const productGrid = document.getElementById("productGrid");

// ===============================
// Get Cart
// ===============================

function getCart() {

    return JSON.parse(localStorage.getItem("cart")) || [];

}

// ===============================
// Save Cart
// ===============================

function saveCart(cart) {

    localStorage.setItem("cart", JSON.stringify(cart));

}

// ===============================
// Update Cart Count
// ===============================

function updateCartCount() {

    const cart = getCart();

    let total = 0;

    cart.forEach(item => {

        total += item.qty;

    });

    const count = document.getElementById("cartCount");

    if (count) {

        count.innerText = total;

    }

}

// ===============================
// Find Product Quantity
// ===============================

function getQty(id) {

    const cart = getCart();

    const item = cart.find(p => p.id == id);

    return item ? item.qty : 0;

}
// ==========================================
// Part 2
// Load Products
// ==========================================

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
            const product = col[2].trim();
            const weight = col[3].trim();
            const price = Number(col[4].trim());
            const status = col[5].trim().toLowerCase();

            if (status !== "active") return;

            if (subId != subCategoryId) return;

            const qty = getQty(id);

            const card = document.createElement("div");
            card.className = "product-card";

            card.innerHTML = `

                <h3>${product}</h3>

                <p class="weight">${weight}</p>

                <h2>₹${price}</h2>

                <div class="qty-box">

                    <button class="qty-btn"
                        onclick="changeQty('${id}','${subId}','${product}','${weight}',${price},-1)">
                        −
                    </button>

                    <span class="qty">${qty}</span>

                    <button class="qty-btn"
                        onclick="changeQty('${id}','${subId}','${product}','${weight}',${price},1)">
                        +
                    </button>

                </div>

                <button class="order-btn"
                    onclick="window.location.href='checkout.html'">

                    🛍️ Order Now

                </button>

            `;

            productGrid.appendChild(card);

        });

    } catch (err) {

        console.log("Products Error :", err);

    }

}