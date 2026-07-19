
localStorage.removeItem("jyotiCart");
let cart = JSON.parse(localStorage.getItem("jyotiCart")) || [];

function saveCart() {
    localStorage.setItem("jyotiCart", JSON.stringify(cart));
}

function addToCart(id, name, price, weight) {

    let item = cart.find(p => p.id === id);

    if (item) {
        item.qty++;
    } else {
        cart.push({
            id,
            name,
            price,
            weight,
            qty: 1
        });
    }

    saveCart();
}

function removeFromCart(id) {

    let item = cart.find(p => p.id === id);

    if (!item) return;

    item.qty--;

    if (item.qty <= 0) {
        cart = cart.filter(p => p.id !== id);
    }

    saveCart();
}

function getQty(id) {

    let item = cart.find(p => p.id === id);

    return item ? item.qty : 0;
}

function getTotalItems() {
    return cart.reduce((a, b) => a + b.qty, 0);
}

function getTotalAmount() {
    return cart.reduce((a, b) => a + (b.qty * b.price), 0);
}

function clearCart() {
    cart = [];
    saveCart();
}