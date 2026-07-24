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