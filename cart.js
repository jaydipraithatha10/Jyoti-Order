// Load Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const grandTotal = document.getElementById("grandTotal");

// Display Cart
function displayCart() {

    cartItems.innerHTML = "";

    let total = 0;

    if(cart.length === 0){

        cartItems.innerHTML = "<h3>Your Cart is Empty</h3>";
        grandTotal.innerText = "0";
        return;

    }

    cart.forEach((item,index)=>{

        const subTotal = Number(item.price) * Number(item.qty);

        total += subTotal;

        cartItems.innerHTML += `

        <div class="cart-card">

            <h3>${item.name}</h3>

            <p>Weight : ${item.weight}</p>

            <p>Price : ₹${item.price}</p>

            <div class="qty-box">

                <button class="qty-btn" onclick="changeQty(${index},-1)">−</button>

                <strong>${item.qty}</strong>

                <button class="qty-btn" onclick="changeQty(${index},1)">+</button>

            </div>

            <p><b>Subtotal : ₹${subTotal}</b></p>

        </div>

        `;

    });

    grandTotal.innerText = total;

}

// Quantity Change
function changeQty(index,value){

    cart[index].qty += value;

    if(cart[index].qty<=0){

        cart.splice(index,1);

    }

    localStorage.setItem("cart",JSON.stringify(cart));

    displayCart();

}

// Clear Cart
document.getElementById("clearCart").onclick=function(){

    if(confirm("Clear Cart?")){

        localStorage.removeItem("cart");

        cart=[];

        displayCart();

    }

};

// WhatsApp Order
document.getElementById("whatsappBtn").onclick=function(){

    if(cart.length===0){

        alert("Cart is Empty");

        return;

    }

    let message="*Jyoti Gruh Udhyog Order*%0A%0A";

    let total=0;

    cart.forEach((item,i)=>{

        const subTotal=item.price*item.qty;

        total+=subTotal;

        message+=`${i+1}. ${item.name}%0A`;
        message+=`Weight : ${item.weight}%0A`;
        message+=`Qty : ${item.qty}%0A`;
        message+=`Price : ₹${item.price}%0A`;
        message+=`Subtotal : ₹${subTotal}%0A%0A`;

    });

    message+=`*Total : ₹${total}*`;

    window.open("https://wa.me/919712149344?text="+message,"_blank");

    localStorage.removeItem("cart");

    cart=[];

    displayCart();

};

displayCart();