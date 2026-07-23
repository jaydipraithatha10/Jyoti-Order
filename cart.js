let cart = JSON.parse(localStorage.getItem("cart")) || [];

displayCart();

function displayCart() {

    const container = document.getElementById("cartContainer");
    const total = document.getElementById("totalPrice");

    container.innerHTML = "";

    let grandTotal = 0;

    if (cart.length === 0) {
        container.innerHTML = "<h3 style='text-align:center'>Cart is Empty</h3>";
        total.innerText = "0";
        return;
    }

    cart.forEach((item, index) => {

        if (!item.qty) item.qty = 1;

        const amount = item.qty * Number(item.price);

        grandTotal += amount;

        container.innerHTML += `
        <div class="category-card">

            <img src="${item.image || 'logo.png'}">

            <h3>${item.name}</h3>

            <p>${item.weight}</p>

            <h2>₹${item.price}</h2>

            <div style="display:flex;justify-content:center;gap:10px;margin-top:10px;">

                <button onclick="decreaseQty(${index})">-</button>

                <b>${item.qty}</b>

                <button onclick="increaseQty(${index})">+</button>

            </div>

            <button
            style="margin-top:10px;background:red;color:#fff;border:none;padding:8px 15px;border-radius:5px;"
            onclick="removeItem(${index})">

            Remove

            </button>

        </div>
        `;

    });

    total.innerText = grandTotal;

    localStorage.setItem("cart", JSON.stringify(cart));

}

function increaseQty(index){

    cart[index].qty++;

    displayCart();

}

function decreaseQty(index){

    if(cart[index].qty>1){

        cart[index].qty--;

    }

    displayCart();

}

function removeItem(index){

    cart.splice(index,1);

    displayCart();

}

function sendWhatsApp(){

    let message="*Jyoti Gruh Udhyog Order*%0A%0A";

    let total=0;

    cart.forEach(item=>{

        const amount=item.qty*Number(item.price);

        total+=amount;

        message +=
`${item.name}
${item.weight}
Qty : ${item.qty}
₹${item.price}
Subtotal : ₹${amount}

`;

        message += "%0A";

    });

    message += "*Total : ₹"+total+"*";

    window.open(
    "https://wa.me/919712149344?text="+message,
    "_blank");

}