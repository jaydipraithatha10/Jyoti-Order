const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vStfoYZJzDES0lAav3gzVi4hHMrr-g-vu6oHbAecwVN7-j5ZfyZCE4wy5qE8oaH0fSw14Y97pHMmUrU/pub?gid=0&single=true&output=csv";

const subCategoryId = localStorage.getItem("subCategoryId");

console.log("Selected SubCategory ID:", subCategoryId);

async function loadProducts() {

    try {

        const response = await fetch(csvUrl);
        const csv = await response.text();

        const rows = csv.trim().split(/\r?\n/).slice(1);

        const container = document.getElementById("productGrid");

        container.innerHTML = "";

        rows.forEach(row => {

            const cols = row.split(",");

            const id = cols[0]?.trim();
            const subId = cols[1]?.trim();
            const product = cols[2]?.trim();
            const weight = cols[3]?.trim();
            const price = cols[4]?.trim();
            const status = cols[5]?.trim().toLowerCase();

            console.log(id, subId, product, status);

            if (subId != subCategoryId) return;
            if (status != "active") return;

            container.innerHTML += `
                <div class="product-card">

                    <h3>${product}</h3>

                    <p>${weight}</p>

                    <h4>₹${price}</h4>

                    <button class="cart-btn"
                        data-id="${id}"
                        data-name="${product}"
                        data-weight="${weight}"
                        data-price="${price}">
                        Add to Cart
                    </button>

                </div>
            `;

        });

        document.querySelectorAll(".cart-btn").forEach(btn => {

            btn.addEventListener("click", function () {

                let cart = JSON.parse(localStorage.getItem("cart")) || [];

                cart.push({
                    id: this.dataset.id,
                    name: this.dataset.name,
                    weight: this.dataset.weight,
                    price: this.dataset.price,
                    qty: 1
                });

                localStorage.setItem("cart", JSON.stringify(cart));

                alert("Product Added Successfully");

            });

        });

        if (container.innerHTML === "") {
            container.innerHTML = "<h3>No Products Found</h3>";
        }

    } catch (error) {

        console.error(error);

    }

}

loadProducts();