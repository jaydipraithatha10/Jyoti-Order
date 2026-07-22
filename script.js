
/* ===================================
   JYOTI GRUH UDHYOG
   SCRIPT.JS - PART 1
=================================== */

/* Google Sheet CSV URLs */
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