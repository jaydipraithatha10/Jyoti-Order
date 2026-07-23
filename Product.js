
const productURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=0&single=true&output=csv";

const subCategoryId = localStorage.getItem("subCategoryId");

let allProducts = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
});

async function loadProducts() {

    const res = await fetch(productURL);
    const csv = await res.text();

    const rows = csv.trim().split("\n").slice(1);

    allProducts = [];

    rows.forEach(row => {

        const col = row.split(",");

        if (col[1] != subCategoryId) return;
        if (col[6].trim() != "Active") return;

        allProducts.push({
            id: col[0],
            name: col[2],
            weight: col[3],
            price: col[4],
            image: col[5]
        });

    });

    showProducts(allProducts);

}

function showProducts(data){

    const container = document.getElementById("productContainer");

    container.innerHTML="";

    data.forEach(item=>{

        container.innerHTML += `

        <div class="category-card">

            <img src="${item.image || 'logo.png'}">

            <h3>${item.name}</h3>

            <p>${item.weight}</p>

            <h2>₹${item.price}</h2>

            <button class="shop-btn"
            onclick="addToCart('${item.id}')">

            Add to Cart

            </button>

        </div>

        `;

    });

}

function searchProducts(){

    const value=document
    .getElementById("searchProduct")
    .value
    .toLowerCase();

    const filtered=allProducts.filter(item=>

    item.name.toLowerCase().includes(value)

    );

    showProducts(filtered);

}

function addToCart(id){

    const product=allProducts.find(x=>x.id==id);

    cart.push(product);

    localStorage.setItem("cart",JSON.stringify(cart));

    alert("Product Added To Cart ✅");

}