
// Load Header
fetch("header.html")
.then(response => response.text())
.then(data => {

    const header = document.getElementById("header");

    if(header){

        header.innerHTML = data;

    }

});

// Load Footer
fetch("footer.html")
.then(response => response.text())
.then(data => {

    const footer = document.getElementById("footer");

    if(footer){

        footer.innerHTML = data;

    }

});