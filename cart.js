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
// ===============================
// Change Quantity
// ===============================

function changeQty(index, change) {

    cart[index].qty += change;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}

// ===============================
// Remove Item
// ===============================

function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}
// ===============================
// Clear Cart
// ===============================

function clearCart() {

    if (confirm("Are you sure you want to clear the cart?")) {

        cart = [];

        localStorage.removeItem("cart");

        displayCart();

    }

}

// ===============================
// WhatsApp Order
// ===============================

function sendWhatsAppOrder() {

    if (cart.length === 0) {

        alert("Your Cart is Empty");

        return;

    }

    let message = "🛒 *Jyoti Gruh Udhyog Order*%0A%0A";

    let grandTotal = 0;

    cart.forEach((item, index) => {

        const total = item.price * item.qty;

        grandTotal += total;

        message += `${index + 1}. ${item.name}%0A`;
        message += `Weight : ${item.weight}%0A`;
        message += `Qty : ${item.qty}%0A`;
        message += `Price : ₹${item.price}%0A`;
        message += `Total : ₹${total}%0A%0A`;

    });

    message += `*Grand Total : ₹${grandTotal}*`;

    // અહીં તમારો નંબર મૂકો
    const phone = "91XXXXXXXXXX";

    window.open(
        `https://wa.me/${phone}?text=${message}`,
        "_blank"
    );

}

// ===============================
// Page Load
// ===============================

displayCart();