
/* ===================================
   JYOTI GRUH UDHYOG
   SCRIPT.JS - PART 1
=================================== */

/* Google Sheet CSV URLs */
const CATEGORY_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=2013716827&single=true&output=csv";

window.onload = function () {
    loadCategories();
};

async function loadCategories() {

    const response = await fetch(CATEGORY_CSV);
    const csv = await response.text();

    console.log(csv);

}
const CATEGORY_URL="https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=2013716827&single=true&output=csv";
const CATEGORY_URL=
const SUBCATEGORY_URL="PASTE_SUBCATEGORY_CSV_URL";
const PRODUCT_URL="PASTE_PRODUCT_CSV_URL";

/* Global Variables */

let categories=[];
let subcategories=[];
let products=[];
let cart=[];

/* Loader */

function showLoader(){

const loader=document.getElementById("loader");

if(loader){
loader.style.display="flex";
}

}

function hideLoader(){

const loader=document.getElementById("loader");

if(loader){
loader.style.display="none";
}

}

/* Fetch CSV */

async function getCSV(url){

try{

showLoader();

const response=await fetch(url);

const csv=await response.text();

hideLoader();

return csv;

}
catch(error){

hideLoader();

console.log(error);

return "";

}

}

/* CSV to JSON */

function csvToJSON(csv){

const rows=csv.trim().split("\n");

const data=[];

const headers=rows[0].split(",");

for(let i=1;i<rows.length;i++){

const obj={};

const cols=rows[i].split(",");

headers.forEach((header,index)=>{

obj[header.trim()]=cols[index]
?cols[index].trim()
:"";

});

data.push(obj);

}

return data;

}
/* ===================================
   SCRIPT.JS - PART 2
=================================== */

/* Load Categories */

async function loadCategories(){

const csv=await getCSV(CATEGORY_URL);

categories=csvToJSON(csv);

let html="";

categories.forEach(item=>{

if(item.Status==="Active"){

html+=`
<div class="category-card fade-in"
onclick="openCategory('${item.Category}')">

<img src="${item.Image}"
alt="${item.Category}"
onerror="this.src='no-image.png'">

<h3>${item.Category}</h3>

</div>
`;

}

});

const grid=document.getElementById("categoryGrid");

if(grid){

grid.innerHTML=html;

}

}

/* Search */

function searchCategory(){

const search=document
.getElementById("search")
.value
.toLowerCase();

document
.querySelectorAll(".category-card")
.forEach(card=>{

const text=card.innerText.toLowerCase();

card.style.display=
text.includes(search)
?"block"
:"none";

});

}

/* Category Click */

function openCategory(category){

localStorage.setItem(
"selectedCategory",
category
);

window.location.href=
"category.html";

}

/* Auto Load */

document
.addEventListener(
"DOMContentLoaded",
()=>{

if(document.getElementById("categoryGrid")){

loadCategories();

}

});
/* ===================================
   SCRIPT.JS - PART 3
=================================== */

/* Load Subcategories */

async function loadSubcategories() {

    const csv = await getCSV(SUBCATEGORY_URL);

    subcategories = csvToJSON(csv);

    const selectedCategory = localStorage.getItem("selectedCategory");

    let html = "";

    subcategories.forEach(item => {

        if (
            item.Category === selectedCategory &&
            item.Status === "Active"
        ) {

            html += `
            <div class="category-card fade-in"
            onclick="openSubcategory('${item.Subcategory}')">

                <img src="${item.Image}"
                alt="${item.Subcategory}"
                onerror="this.src='no-image.png'">

                <h3>${item.Subcategory}</h3>

            </div>
            `;

        }

    });

    const grid = document.getElementById("subcategoryGrid");

    if (grid) {
        grid.innerHTML = html;
    }

    const title = document.getElementById("pageTitle");

    if (title) {
        title.innerText = selectedCategory;
    }

}

/* Open Subcategory */

function openSubcategory(name) {

    localStorage.setItem("selectedSubcategory", name);

    window.location.href = "products.html";

}

/* Auto Load */

document.addEventListener("DOMContentLoaded", () => {

    if (document.getElementById("subcategoryGrid")) {

        loadSubcategories();

    }

});
/* ===================================
   SCRIPT.JS - PART 4
=================================== */

/* Load Products */

async function loadProducts() {

    const csv = await getCSV(PRODUCT_URL);

    products = csvToJSON(csv);

    const category = localStorage.getItem("selectedCategory");
    const subcategory = localStorage.getItem("selectedSubcategory");

    let html = "";

    products.forEach(item => {

        if (
            item.Category === category &&
            item.Subcategory === subcategory &&
            item.Status === "Active"
        ) {

            html += `
            <div class="product-card fade-in">

                <img src="${item.Image}"
                alt="${item.Product}"
                onerror="this.src='no-image.png'">

                <h3>${item.Product}</h3>

                <p class="price">₹${item.Price}</p>

                <div class="qty-box">

                    <button onclick="changeQty('${item.ID}',-1)">−</button>

                    <span id="qty-${item.ID}">1</span>

                    <button onclick="changeQty('${item.ID}',1)">+</button>

                </div>

                <button class="add-btn"
                onclick="addToCart('${item.ID}')">

                    Add To Cart

                </button>

            </div>
            `;

        }

    });

    const box = document.getElementById("productGrid");

    if (box) {

        box.innerHTML = html;

    }

}

/* Quantity */

const qty = {};

function changeQty(id, value) {

    if (!qty[id]) qty[id] = 1;

    qty[id] += value;

    if (qty[id] < 1) qty[id] = 1;

    document.getElementById("qty-" + id).innerText = qty[id];

}

/* Add To Cart */

function addToCart(id) {

    const product = products.find(p => p.ID == id);

    if (!product) return;

    cart.push({

        ...product,

        qty: qty[id] || 1

    });

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartBar();

    alert(product.Product + " Added To Cart");

}

/* Auto Load */

document.addEventListener("DOMContentLoaded", () => {

    if (document.getElementById("productGrid")) {

        loadProducts();

    }

});
/* ===================================
   SCRIPT.JS - PART 5
=================================== */

/* Load Cart */

function loadCart() {

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    updateCartBar();

}

/* Update Cart */

function updateCartBar() {

    const count = document.getElementById("cartCount");
    const total = document.getElementById("cartTotal");

    let qty = 0;
    let amount = 0;

    cart.forEach(item => {

        qty += Number(item.qty);

        amount += Number(item.Price) * Number(item.qty);

    });

    if (count) count.innerText = qty;

    if (total) total.innerText = "₹" + amount;

}

/* Clear Cart */

function clearCart() {

    if (!confirm("Are you sure?")) return;

    cart = [];

    localStorage.removeItem("cart");

    updateCartBar();

    location.reload();

}

/* WhatsApp Order */

function sendWhatsApp() {

    if (cart.length === 0) {

        alert("Cart is Empty");

        return;

    }

    let message = "🛒 *Jyoti Gruh Udhyog Order*%0A%0A";

    let total = 0;

    cart.forEach((item, index) => {

        const subtotal =
            Number(item.Price) * Number(item.qty);

        total += subtotal;

        message +=
`${index + 1}. ${item.Product}%0AQty : ${item.qty}%0APrice : ₹${item.Price}%0ASubtotal : ₹${subtotal}%0A%0A`;

    });

    message +=
`*Total : ₹${total}*`;

    const mobile = "919712149344";

    window.open(
`https://wa.me/${mobile}?text=${message}`,
"_blank"
);

}

/* Back Button */

function goBack() {

    history.back();

}

/* Start */

document.addEventListener("DOMContentLoaded", () => {

    loadCart();

});