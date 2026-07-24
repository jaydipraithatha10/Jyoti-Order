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