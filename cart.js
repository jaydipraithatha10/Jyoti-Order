// ===============================
// Load Cart
// ===============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {

    const container = document.getElementById("cartContainer");
    const totalElement = document.getElementById("grandTotal");

    container.innerHTML = "";

    let grandTotal = 0;

    if (cart.length === 0) {

        container.innerHTML = `
            <h2 style="text-align:center;margin-top:40px;color:#666;">
                Your Cart is Empty
            </h2>
        `;

        totalElement.innerText = "0";
        return;
    }

    cart.forEach((item,index)=>{

        const total = item.price * item.qty;

        grandTotal += total;

        container.innerHTML += `

        <div class="cart-item">

            <h3>${item.name}</h3>

            <p><b>Weight :</b> ${item.weight}</p>

            <p><b>Price :</b> ₹${item.price}</p>

            <p><b>Total :</b> ₹${total}</p>

            <div class="qty-box">

                <button class="qty-btn" onclick="changeQty(${index},-1)">-</button>

                <span class="qty">${item.qty}</span>

                <button class="qty-btn" onclick="changeQty(${index},1)">+</button>

            </div>

            <br>

            <button
            style="
            background:red;
            color:white;
            border:none;
            padding:10px 15px;
            border-radius:8px;
            cursor:pointer;"
            onclick="removeItem(${index})">
            Remove
            </button>

        </div>

        `;

    });

    totalElement.innerText = grandTotal;

}