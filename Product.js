alert("SubCategoryID = " + subCategoryId);
const PRODUCT_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=0&single=true&output=csv";

let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const subCategoryId = localStorage.getItem("subCategoryId");

document.addEventListener("DOMContentLoaded", loadProducts);

async function loadProducts() {

    try {

        const response = await fetch(PRODUCT_CSV);
        const csv = await response.text();

alert(csv);
        const rows = csv.trim().split("\n");

        rows.shift();

        products = [];

        rows.forEach(row => {

            const col = row.split(",");

            if (col.length < 7) return;

            const item = {
                id: col[0].trim(),
                subCategoryId: col[1].trim(),
                product: col[2].trim(),
                weight: col[3].trim(),
                price: col[4].trim(),
                image: col[5].trim(),
                status: col[6].trim()
            };

            if (
                item.subCategoryId === subCategoryId &&
                item.status.toLowerCase() === "active"
            ) {
                products.push(item);
            }

        });

alert("Products = " + products.length);
        showProducts(products);

    } catch (e) {

        alert("Products Load Error");

        console.log(e);

    }

}

function showProducts(list) {

    const container = document.getElementById("productContainer");

    if (list.length === 0) {

        container.innerHTML =
        "<h3 style='text-align:center;'>No Products Found</h3>";

        return;

    }

    container.innerHTML = "";

    list.forEach(item => {

        container.innerHTML += `

        <div class="category-card">

            <img src="${item.image || "logo.png"}">

            <h3>${item.product}</h3>

            <p>${item.weight}</p>

            <h2>₹${item.price}</h2>

            <button class="shop-btn"
            onclick="addToCart('${item.id}')">

            Add To Cart

            </button>

        </div>

        `;

    });

}

function searchProducts(){

    const value = document
    .getElementById("searchProduct")
    .value
    .toLowerCase();

    const filtered = products.filter(item =>
        item.product.toLowerCase().includes(value)
    );

    showProducts(filtered);

}

function addToCart(id){

    const product = products.find(x => x.id == id);

    if(!product) return;

    const index = cart.findIndex(x => x.id == id);

    if(index >= 0){

        cart[index].qty = (cart[index].qty || 1) + 1;

    }else{

        product.qty = 1;

        cart.push(product);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product Added Successfully ✅");

}