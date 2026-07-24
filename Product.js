// ================================
// Product Page
// ================================

const sheetURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=0&single=true&output=csv";

const params = new URLSearchParams(window.location.search);
const subCategoryId = params.get("id");

// ================================
// Cart Count
// ================================

function updateCartCount(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item=>{
        total += item.qty;
    });

    document.getElementById("cartCount").innerText = total;

}

// ================================
// Load Products
// ================================

async function loadProducts() {

    const response = await fetch(sheetURL);
    const csv = await response.text();

    const rows = csv.trim().split("\n").slice(1);

    const productGrid = document.getElementById("productGrid");
    productGrid.innerHTML = "";

    rows.forEach(row => {

        const cols = row.split(",");

        const id = cols[0].trim();
        const subId = cols[1].trim();
        const name = cols[2].trim();
        const weight = cols[3].trim();
        const price = cols[4].trim();
        const status = cols[5].trim();

        // માત્ર Active Products
        if (status !== "Active") return;

        // SubCategory Filter
        if (subCategoryId && subId != subCategoryId) return;

        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <h3>${name}</h3>

            <p><b>Weight :</b> ${weight}</p>

            <p><b>Price :</b> ₹${price}</p>

            <button class="add-btn">Add to Cart</button>
        `;

        const btn = card.querySelector(".add-btn");

        btn.addEventListener("click", function () {
            addToCart(id, subId, name, weight, price);
        });

        productGrid.appendChild(card);

    });

}
// ================================
// Add To Cart
// ================================

function addToCart(id, subId, name, weight, price) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === id);

    if (existing) {

        existing.qty += 1;

    } else {

        cart.push({
            id: id,
            subCategoryId: subId,
            name: name,
            weight: weight,
            price: parseFloat(price),
            qty: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    // Optional: Message
    // alert(name + " Added to Cart");

}