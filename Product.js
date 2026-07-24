// -----------------------------
// Google Sheet CSV URL
// -----------------------------
const sheetURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=0&single=true&output=csv";

// -----------------------------
// Get SubCategory ID
// -----------------------------
const params = new URLSearchParams(window.location.search);
const subCategoryId = params.get("id");

// -----------------------------
// Cart Count
// -----------------------------
function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    document.getElementById("cartCount").innerText = cart.length;

}

// -----------------------------
// Load Products
// -----------------------------
async function loadProducts() {

    const response = await fetch(sheetURL);

    const data = await response.text();

    const rows = data.trim().split("\n").slice(1);

    const productGrid = document.getElementById("productGrid");

    productGrid.innerHTML = "";

    rows.forEach(row => {

        const cols = row.split(",");

        const id = cols[0]?.trim();
        const subId = cols[1]?.trim();
        const name = cols[2]?.trim();
        const weight = cols[3]?.trim();
        const price = cols[4]?.trim();
        const status = cols[5]?.trim();

        if (status !== "Active") return;

        // Filter by SubCategory
        if (subCategoryId && subId != subCategoryId) return;

        productGrid.innerHTML += `

        <div class="product-card">

            <h3>${name}</h3>

            <p><b>Weight :</b> ${weight}</p>

            <p><b>Price :</b> ₹${price}</p>

            <button onclick="addToCart('${id}','${subId}','${name}','${weight}','${price}')">
                Add to Cart
            </button>

        </div>

        `;

    });

}

// -----------------------------
// Add To Cart
// -----------------------------
function addToCart(id, subId, name, weight, price) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let index = cart.findIndex(item => item.id === id);

    if (index > -1) {

        cart[index].qty += 1;

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

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

}

// -----------------------------
// Start
// -----------------------------
loadProducts();

updateCartCount();