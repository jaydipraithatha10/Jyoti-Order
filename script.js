const categoryURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=2013716827&single=true&output=csv";

document.addEventListener("DOMContentLoaded", () => {

    if(document.getElementById("categoryGrid")){
        loadCategories();
    }

});

let allCategories = [];

/* ===========================
   LOAD CATEGORIES
=========================== */

async function loadCategories(){

    const res = await fetch(categoryURL);
    const csv = await res.text();

    const rows = csv.trim().split("\n").slice(1);

    const grid = document.getElementById("categoryGrid");

    grid.innerHTML="";

    allCategories=[];

    rows.forEach(row=>{

        const col=row.split(",");

        const id=col[0];
        const name=col[1];
        const image=col[2];
        const status=col[3];

        if(status.trim()!="Active") return;

        allCategories.push({
            id,
            name,
            image
        });

    });

    showCategories(allCategories);

}

/* ===========================
   SHOW CATEGORIES
=========================== */

function showCategories(data){

    const grid=document.getElementById("categoryGrid");

    grid.innerHTML="";

    data.forEach(item=>{

        grid.innerHTML+=`

        <div class="category-card"
        onclick="openCategory('${item.id}')">

            <img src="${item.image}"
            alt="${item.name}">

            <h3>${item.name}</h3>

        </div>

        `;

    });

}

/* ===========================
   SEARCH
=========================== */

function searchCategory(){

    const value=document
    .getElementById("search")
    .value
    .toLowerCase();

    const filtered=allCategories.filter(item=>

        item.name.toLowerCase().includes(value)

    );

    showCategories(filtered);

}

/* ===========================
   OPEN CATEGORY
=========================== */

function openCategory(id){

    localStorage.setItem("categoryId",id);

    window.location.href="category.html";

}