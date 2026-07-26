// =====================================
// Jyoti Gruh Udhyog API v2
// Part 1
// =====================================

// ---------- Google Sheet URLs ----------

const categoryURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=2013716827&single=true&output=csv";

const subCategoryURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=35788410&single=true&output=csv";

const productURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=0&single=true&output=csv";


// =====================================
// Fetch CSV
// =====================================

async function fetchCSV(url){

    const response = await fetch(url);

    return await response.text();

}


// =====================================
// CSV To Array
// =====================================

function csvToArray(csv){

    return csv
    .trim()
    .split("\n")
    .map(row => row.split(","));

}


// =====================================
// URL Parameter
// =====================================

function getParam(name){

    return new URLSearchParams(location.search).get(name);

}


// =====================================
// Cart Storage
// =====================================

function getCart(){

    return JSON.parse(localStorage.getItem("cart")) || [];

}

function saveCart(cart){

    localStorage.setItem("cart", JSON.stringify(cart));

}


// =====================================
// Load Categories
// =====================================

async function loadCategories(){

    const list=document.getElementById("categoryList");

    if(!list) return;

    const csv=await fetchCSV(categoryURL);

    const rows=csvToArray(csv);

    list.innerHTML="";

    rows.slice(1).forEach(row=>{

        if(row[3].trim().toLowerCase()!="active")
            return;

        list.innerHTML += `

<div class="category-card"
onclick="location.href='category.html?id=${row[0]}'">

<img src="${row[2]}" alt="${row[1]}">

<h3>${row[1]}</h3>

</div>

`;

    });

}


// =====================================
// Load Sub Categories
// =====================================

async function loadSubCategories(){

    const categoryId=getParam("id");

    const list=document.getElementById("subCategoryList");

    if(!list) return;

    const csv=await fetchCSV(subCategoryURL);

    const rows=csvToArray(csv);

    list.innerHTML="";

    rows.slice(1).forEach(row=>{

        if(row[4].trim().toLowerCase()!="active")
            return;

        if(row[1]!=categoryId)
            return;

        list.innerHTML += `

<div class="category-card"
onclick="location.href='subcategory.html?id=${row[0]}'">

<img src="${row[3]}" alt="${row[2]}">

<h3>${row[2]}</h3>

</div>

`;

    });

}
// =====================================
// Load Products
// =====================================

async function loadProducts(){

    const subCategoryId = getParam("id");

    const list = document.getElementById("productList");

    if(!list) return;

    const csv = await fetchCSV(productURL);

    const rows = csvToArray(csv);

    list.innerHTML = "";

    rows.slice(1).forEach(row=>{

        const id = row[0];
        const subId = row[1];
        const product = row[2];
        const weight = row[3];
        const price = row[4];
        const status = row[5];

        if(status.trim().toLowerCase()!="active")
            return;

        if(subId!=subCategoryId)
            return;

        list.innerHTML += `

<div class="product-card">

<h3>${product}</h3>

<p>${weight}</p>

<h4>₹${price}</h4>

<button onclick="addToCart('${id}','${product}','${weight}',${price})">

🛒 Add To Cart

</button>

</div>

`;

    });

}

// =====================================
// Update Cart Count
// =====================================

function updateOrderButton(){

    const count = document.getElementById("orderCount");

    if(!count) return;

    const cart = getCart();

    let total = 0;

    cart.forEach(item=>{
        total += item.qty;
    });

    count.innerHTML = total;
}

    


// =====================================
// Floating Order Button
// =====================================

function updateOrderButton(){

    const btn=document.getElementById("orderNowBtn");

    const count=document.getElementById("orderCount");

    if(!btn || !count)
        return;

    const cart=getCart();

    let qty=0;

    cart.forEach(item=>{

        qty+=item.qty;

    });

    count.innerHTML=qty;

    btn.style.display=qty>0?"flex":"none";

}


// =====================================
// Add To Cart
// =====================================

function addToCart(id,name,weight,price){

    let cart=getCart();

    const item=cart.find(x=>x.id==id);

    if(item){

        item.qty++;

    }else{

        cart.push({

            id:id,

            name:name,

            weight:weight,

            price:price,

            qty:1

        });

    }

    saveCart(cart);

    updateCartCount();

    

}
// =====================================
// Remove From Cart
// =====================================

function removeFromCart(id){

    let cart = getCart();

    cart = cart.filter(item => item.id != id);

    saveCart(cart);

    updateCartCount();

    loadCart();

}


// =====================================
// Change Quantity
// =====================================

function changeQty(id,value){

    let cart = getCart();

    const item = cart.find(x => x.id == id);

    if(!item) return;

    item.qty += value;

    if(item.qty <= 0){

        cart = cart.filter(x => x.id != id);

    }

    saveCart(cart);

    updateCartCount();

    loadCart();

}


// =====================================
// Load Cart
// =====================================

function loadCart(){

    const list = document.getElementById("cartList");

    const total = document.getElementById("grandTotal");

    if(!list) return;

    const cart = getCart();

    list.innerHTML = "";

    let grandTotal = 0;

    cart.forEach(item=>{

        const itemTotal = item.price * item.qty;

        grandTotal += itemTotal;

        list.innerHTML += `

<div class="cart-item">

<h3>${item.name}</h3>

<p>${item.weight}</p>

<p>₹${item.price} × ${item.qty} = ₹${itemTotal}</p>

<div>

<button onclick="changeQty('${item.id}',-1)">-</button>

<button>${item.qty}</button>

<button onclick="changeQty('${item.id}',1)">+</button>

<button onclick="removeFromCart('${item.id}')">Remove</button>

</div>

</div>

`;

    });

    if(total){

        total.innerHTML = "₹" + grandTotal;

    }

}


// =====================================
// WhatsApp Order
// =====================================

function placeOrder(){

    const cart = getCart();

    if(cart.length == 0){

        alert("Cart is Empty");

        return;

    }

    let message = "🛒 *Jyoti Gruh Udhyog*%0A%0A";

    let totalQty = 0;

    let grandTotal = 0;

    cart.forEach((item,index)=>{

        const total = item.price * item.qty;

        totalQty += item.qty;

        grandTotal += total;

        message += `${index+1}. ${item.name} ${item.weight}%0A`;

        message += `₹${item.price} × ${item.qty} = ₹${total}%0A%0A`;

    });

    message += "--------------------%0A";
    message += `Total Qty : ${totalQty}%0A`;
    message += `Grand Total : ₹${grandTotal}`;

    window.open(
        `https://wa.me/919712149344?text=${message}`,
        "_blank"
    );

    localStorage.removeItem("cart");

    updateCartCount();

    window.location.href = "index.html";

}


// =====================================
// Auto Load
// =====================================

document.addEventListener("DOMContentLoaded",()=>{

    loadCategories();

    loadSubCategories();

    loadProducts();

    loadCart();

    updateCartCount();

});