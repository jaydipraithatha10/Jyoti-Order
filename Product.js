// =======================================
// Product.js - Part 1
// Jyoti Gruh Udhyog
// =======================================

// Google Sheet Products CSV
const sheetURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=0&single=true&output=csv";

// Get SubCategory ID from localStorage
const subCategoryId = localStorage.getItem("subCategoryId");

// Product Grid
const productGrid = document.getElementById("productGrid");

// ==========================
// Get Cart
// ==========================

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// ==========================
// Save Cart
// ==========================

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ==========================
// Update Cart Count
// ==========================

function updateCartCount() {

    const cart = getCart();

    let total = 0;

    cart.forEach(item => {
        total += item.qty;
    });

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.innerText = total;
    }

}
// =======================================
// Part 2 - Load Products
// =======================================

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

            if (subId !== subCategoryId) return;

            const cart = getCart();
            const item = cart.find(p => p.id == id);
            const qty = item ? item.qty : 0;

            const card = document.createElement("div");
            card.className = "product-card";

            card.innerHTML = `

                <h3>${name}</h3>

                <p><b>Weight :</b> ${weight}</p>

                <p><b>Price :</b> ₹${price}</p>

                <div id="action${id}">

                    ${
                        qty === 0

                        ?

                        `<button class="add-btn"
                        onclick="addToCart('${id}','${subId}','${name}','${weight}','${price}')">
                        Add to Cart
                        </button>`

                        :

                        `<div class="qty-box">

                            <button class="qty-btn"
                            onclick="changeQty('${id}',-1)">-</button>

                            <span>${qty}</span>

                            <button class="qty-btn"
                            onclick="changeQty('${id}',1)">+</button>

                        </div>`
                    }

                </div>

            `;

            productGrid.appendChild(card);

        });

    } catch (error) {

        console.log(error);

    }

}
// =======================================
// Part 3 - Add To Cart & Refresh
// =======================================

function addToCart(id, subId, name, weight, price) {

    let cart = getCart();

    const index = cart.findIndex(item => item.id === id);

    if (index !== -1) {

        cart[index].qty++;

    } else {

        cart.push({
            id: id,
            subCategoryId: subId,
            name: name,
            weight: weight,
            price: Number(price),
            qty: 1
        });

    }

    saveCart(cart);

    updateCartCount();

    loadProducts();

}

// =======================================
// Refresh Product Card
// =======================================

function refreshProductCard(id) {

    loadProducts();

}
// =======================================
// Part 4 - Change Quantity
// =======================================

function changeQty(id, change) {

    let cart = getCart();

    const index = cart.findIndex(item => item.id === id);

    if (index === -1) return;

    cart[index].qty += change;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    saveCart(cart);

    updateCartCount();

    loadProducts();

}

// =======================================
// Remove Product
// =======================================

function removeFromCart(id) {

    let cart = getCart();

    cart = cart.filter(item => item.id !== id);

    saveCart(cart);

    updateCartCount();

    loadProducts();

}
// =======================================
// Part 5 - Page Load
// =======================================

document.addEventListener("DOMContentLoaded", function () {

    updateCartCount();

    loadProducts();

});