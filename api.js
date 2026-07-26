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