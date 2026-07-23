
const subCategoryURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=35788410&single=true&output=csv";

const categoryURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=2013716827&single=true&output=csv";

let allSubCategories = [];

const categoryId = localStorage.getItem("categoryId");

document.addEventListener("DOMContentLoaded", () => {

    loadCategoryTitle();

    loadSubCategories();

});

/* ===========================
   CATEGORY TITLE
=========================== */

async function loadCategoryTitle(){

    const res = await fetch(categoryURL);

    const csv = await res.text();

    const rows = csv.trim().split("\n").slice(1);

    rows.forEach(row=>{

        const col = row.split(",");

        if(col[0] == categoryId){

            document.getElementById("categoryTitle").innerText = col[1];

        }

    });

}

/* ===========================
   LOAD SUB CATEGORY
=========================== */

async function loadSubCategories(){

    const res = await fetch(subCategoryURL);

    const csv = await res.text();

    const rows = csv.trim().split("\n").slice(1);

    allSubCategories = [];

    rows.forEach(row=>{

        const col = row.split(",");

        if(col[1] != categoryId) return;

        if(col[4].trim() != "Active") return;

        allSubCategories.push({

            id:col[0],

            name:col[2],

            image:col[3]

        });

    });

    showSubCategories(allSubCategories);

}

/* ===========================
   SHOW SUB CATEGORY
=========================== */

function showSubCategories(data){

    const container =
    document.getElementById("subcategoryContainer");

    container.innerHTML = "";

    data.forEach(item=>{

        container.innerHTML += `

        <div class="category-card"
        onclick="openProducts('${item.id}')">

            <img src="${item.image}">

            <h3>${item.name}</h3>

        </div>

        `;

    });

}

/* ===========================
   SEARCH
=========================== */

function searchSubCategory(){

    const value =
    document.getElementById("searchSub")
    .value
    .toLowerCase();

    const filtered =
    allSubCategories.filter(item=>

    item.name.toLowerCase().includes(value)

    );

    showSubCategories(filtered);

}

/* ===========================
   OPEN PRODUCTS
=========================== */

function openProducts(id){

    localStorage.setItem("subCategoryId",id);

    window.location.href = "product.html";

}