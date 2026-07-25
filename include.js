// ===============================
// Load Header
// ===============================

async function loadHeader() {

    const response = await fetch("header.html");

    const html = await response.text();

    document.getElementById("header").innerHTML = html;

}

// ===============================
// Load Footer
// ===============================

async function loadFooter() {

    const response = await fetch("footer.html");

    const html = await response.text();

    document.getElementById("footer").innerHTML = html;

}

// ===============================
// Initialize
// ===============================

async function initLayout() {

    await loadHeader();

    await loadFooter();

}

document.addEventListener("DOMContentLoaded", initLayout);