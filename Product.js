// ================================
// Product Page
// ================================

const sheetURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=0&single=true&output=csv";

const params = new URLSearchParams(window.location.search);
const subCategoryId = params.get("id");

// ================================
// Cart Count
// ================================

function updateCartCount(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item=>{
        total += item.qty;
    });

    document.getElementById("cartCount").innerText = total;

}
