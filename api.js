// =====================================
// Jyoti Gruh Udhyog API
// Part 1
// =====================================

// ---------- Google Sheet URLs ----------

const categoryURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=2013716827&single=true&output=csv";

const subCategoryURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=35788410&single=true&output=csv";

const productURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=0&single=true&output=csv";


// ---------- Fetch CSV ----------

async function fetchCSV(url){

    const response = await fetch(url);

    return await response.text();

}


// ---------- CSV To Array ----------

function csvToArray(csv){

    return csv
    .trim()
    .split("\n")
    .map(row=>row.split(","));

}


// ---------- URL Parameter ----------

function getParam(name){

    return new URLSearchParams(location.search).get(name);

}


// ---------- Load Categories ----------

async function loadCategories(){

    const csv=await fetchCSV(categoryURL);

    const rows=csvToArray(csv);

    const list=document.getElementById("categoryList");

    if(!list) return;

    list.innerHTML="";

    rows.slice(1).forEach(row=>{

        const id=row[0];

        const category=row[1];

        const image=row[2];

        const status=row[3];

        if(status.trim().toLowerCase()!="active")
            return;

        list.innerHTML+=`

<div class="category-card"
onclick="location.href='category.html?id=${id}'">

<img src="${image}" alt="${category}">

<h3>${category}</h3>

</div>

`;

    });

}


// ---------- Load Sub Categories ----------

async function loadSubCategories(){

    const categoryId=getParam("id");

    const csv=await fetchCSV(subCategoryURL);

    const rows=csvToArray(csv);

    const list=document.getElementById("subCategoryList");

    if(!list) return;

    list.innerHTML="";

    rows.slice(1).forEach(row=>{

        const id=row[0];

        const catId=row[1];

        const sub=row[2];

        const image=row[3];

        const status=row[4];

        if(status.trim().toLowerCase()!="active")
            return;

        if(catId!=categoryId)
            return;

        list.innerHTML+=`

<div class="category-card"
onclick="location.href='subcategory.html?id=${id}'">

<img src="${image}" alt="${sub}">

<h3>${sub}</h3>

</div>

`;

    });

}
// =====================================
// Load Products
// =====================================

async function loadProducts(){

    const subCategoryId = getParam("id");

    const csv = await fetchCSV(productURL);

    const rows = csvToArray(csv);

    const list = document.getElementById("productList");

    if(!list) return;

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

<button onclick="addToCart(...)">
🛒 Add To Cart
</button>

</div>

`;

    });

}


// =====================================
// Cart
// =====================================

function getCart(){

    return JSON.parse(localStorage.getItem("cart")) || [];

}


function saveCart(cart){

    localStorage.setItem("cart",JSON.stringify(cart));

}

function updateCartCount(){

    const cart = getCart();

    const badge = document.getElementById("cartCount");

    if(!badge) return;

    let count = 0;

    cart.forEach(item => {

        count += item.qty;

    });

    badge.innerHTML = count;

}
function addToCart(id,name,weight,price){

    let cart = getCart();

    const item = cart.find(x=>x.id==id);

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

alert("Added to Cart");

}
// =====================================
// Cart Functions
// =====================================

function removeFromCart(id){

    let cart=getCart();

    cart=cart.filter(item=>item.id!=id);

    saveCart(cart);

    location.reload();

}

function changeQty(id,value){

    let cart=getCart();

    const item=cart.find(x=>x.id==id);

    if(!item) return;

    item.qty+=value;

    if(item.qty<=0){

        removeFromCart(id);

        return;

    }

    saveCart(cart);

    location.reload();

}


// =====================================
// Load Cart
// =====================================

function loadCart(){

    const cart=getCart();

    const list=document.getElementById("cartList");

    const total=document.getElementById("grandTotal");

    if(!list) return;

    list.innerHTML="";

    let grandTotal=0;

    cart.forEach(item=>{

        const itemTotal=item.price*item.qty;

        grandTotal+=itemTotal;

        list.innerHTML+=`

<div class="cart-item">

<h3>${item.name}</h3>

<p>${item.weight}</p>

<p>₹${item.price} × ${item.qty} = ₹${itemTotal}</p>

<div>

<button onclick="changeQty('${item.id}',-1)">-</button>

<button>${item.qty}</button>

<button onclick="changeQty('${item.id}',1)">+</button>

<button onclick="removeFromCart('${item.id}')">
Remove
</button>

</div>

</div>

`;

    });

    if(total){

        total.innerHTML="₹"+grandTotal;

    }

}


// =====================================
// WhatsApp Order
// =====================================

function placeOrder(){

    const cart=getCart();

    if(cart.length==0){

        alert("Cart is Empty");

        return;

    }

    let message="🛒 *Jyoti Gruh Udhyog*%0A%0A";

    message+="*Order Details*%0A%0A";

    let totalQty=0;

    let grandTotal=0;

    cart.forEach((item,index)=>{

        const total=item.price*item.qty;

        totalQty+=item.qty;

        grandTotal+=total;

        message+=
`${index+1}. ${item.name} ${item.weight}%0A`;

        message+=
`₹${item.price} × ${item.qty} = ₹${total}%0A%0A`;

    });

    message+="--------------------%0A";

    message+=`Total Qty : ${totalQty}%0A`;

    message+=`Grand Total : ₹${grandTotal}%0A`;

    message+="--------------------";

    const phone="919712149344";

    window.open(
`https://wa.me/${phone}?text=${message}`,
"_blank"
);

    localStorage.removeItem("cart");

    window.location.href="index.html";

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