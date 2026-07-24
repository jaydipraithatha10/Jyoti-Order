const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=0&single=true&output=csv";

const params = new URLSearchParams(window.location.search);
const subCategoryId = params.get("id");

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cartCount").innerText = cart.reduce((t, i) => t + i.qty, 0);
}

async function loadProducts() {

    const res = await fetch(sheetURL);
    const text = await res.text();

    const rows = text.trim().split("\n").slice(1);

    const grid = document.getElementById("productGrid");
    grid.innerHTML = "";

    rows.forEach(row => {

        const cols = row.split(",");

        const id = cols[0].trim();
        const subId = cols[1].trim();
        const name = cols[2].trim();
        const weight = cols[3].trim();
        const price = cols[4].trim();
        const status = cols[5].trim();

        if (status !== "Active") return;

        if (subCategoryId && subId != subCategoryId) return;

        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <h3>${name}</h3>
            <p><b>Weight :</b> ${weight}</p>
            <p><b>Price :</b> ₹${price}</p>
        `;

        const btn = document.createElement("button");
        btn.innerText = "Add to Cart";

        btn.addEventListener("click", function () {
            addToCart(id, subId, name, weight, price);
        });

        card.appendChild(btn);

        grid.appendChild(card);

    });

}

function addToCart(id, subId, name, weight, price) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = cart.findIndex(item => item.id === id);

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

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(name + " Added to Cart");

}

loadProducts();
updateCartCount();