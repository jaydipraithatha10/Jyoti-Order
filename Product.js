// =======================================
// Jyoti Gruh Udhyog - Product.js
// Part 1
// =======================================

// Google Sheet CSV URL
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=0&single=true&output=csv";

// Get SubCategory ID
const params = new URLSearchParams(window.location.search);
const subCategoryId = params.get("id");

// Product Grid
const productGrid = document.getElementById("productGrid");

// -------------------------------
// Get Cart
// -------------------------------
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// -------------------------------
// Save Cart
// -------------------------------
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// -------------------------------
// Update Cart Count
// -------------------------------
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

// =======================================
// Part 2 - Load Products
// =======================================

async function loadProducts() {

    const response = await fetch(sheetURL);
    const csv = await response.text();

    const rows = csv.trim().split("\n").slice(1);

    productGrid.innerHTML = "";

    rows.forEach(row => {

        const cols = row.split(",");

        const id = cols[0].trim();
        const subId = cols[1].trim();
        const name = cols[2].trim();
        const weight = cols[3].trim();
        const price = Number(cols[4].trim());
        const status = cols[5].trim();

        if (status !== "Active") return;

        if (subCategoryId && subId != subCategoryId) return;

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
                    `
                    <div class="qty-box">

                        <button class="qty-btn"
                        onclick="changeQty('${id}',-1)">
                        -
                        </button>

                        <span class="qty">${qty}</span>

                        <button class="qty-btn"
                        onclick="changeQty('${id}',1)">
                        +
                        </button>

                    </div>
                    `
                }
            </div>
        `;

        productGrid.appendChild(card);

    });

}
// =======================================
// Part 3 - Add To Cart
// =======================================

function addToCart(id, subId, name, weight, price) {

    let cart = getCart();

    const index = cart.findIndex(item => item.id == id);

    if (index >= 0) {

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

    refreshProductCard(id);

}

// =======================================
// Refresh Product Card
// =======================================

function refreshProductCard(id) {

    const cart = getCart();

    const item = cart.find(p => p.id == id);

    const box = document.getElementById("action" + id);

    if (!box) return;

    if (!item) {

        box.innerHTML = `
            <button class="add-btn"
                onclick="addToCart('${id}','','','','0')">
                Add to Cart
            </button>
        `;

        return;
    }

    box.innerHTML = `
        <div class="qty-box">

            <button class="qty-btn"
                onclick="changeQty('${id}',-1)">
                -
            </button>

            <span class="qty">${item.qty}</span>

            <button class="qty-btn"
                onclick="changeQty('${id}',1)">
                +
            </button>

        </div>
    `;

}
// =======================================
// Part 4 - Change Quantity
// =======================================

function changeQty(id, change) {

    let cart = getCart();

    const index = cart.findIndex(item => item.id == id);

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
// Part 5 - Start Page
// =======================================

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

    loadProducts();

});