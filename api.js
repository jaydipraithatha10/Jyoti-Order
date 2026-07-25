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

<button onclick="addToCart(
'${id}',
'${product}',
'${weight}',
${price}
)">
Add To Cart
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

    alert("Added to Cart");

}