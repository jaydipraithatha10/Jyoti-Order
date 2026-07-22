/* ===================================
   JYOTI GRUH UDHYOG
   SCRIPT.JS - PART 1
=================================== */

/* Google Sheet CSV URLs */

const CATEGORY_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=2013716827&single=true&output=csv";

const SUBCATEGORY_URL = "";
const PRODUCT_URL = "";

/* Global Variables */

let categories = [];
let subcategories = [];
let products = [];
let cart = [];

/* ==========================
   Loader
========================== */

function showLoader() {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "flex";
}

function hideLoader() {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
}

/* ==========================
   Fetch CSV
========================== */

async function getCSV(url) {

    try {

        showLoader();

        const response = await fetch(url);

        const csv = await response.text();

        hideLoader();

        return csv;

    } catch (error) {

        hideLoader();

        console.error(error);

        return "";

    }

}

/* ==========================
   CSV → JSON
========================== */

function csvToJSON(csv) {

    const rows = csv.trim().split("\n");

    const headers = rows[0].split(",");

    const data = [];

    for (let i = 1; i < rows.length; i++) {

        const obj = {};

        const cols = rows[i].split(",");

        headers.forEach((header, index) => {

            obj[header.trim()] = cols[index]
                ? cols[index].trim()
                : "";

        });

        data.push(obj);

    }

    return data;

}
