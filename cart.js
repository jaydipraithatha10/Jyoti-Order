
// Global Cart

let cart = JSON.parse(localStorage.getItem("jyotiCart")) || [];

function saveCart() {
    localStorage.setItem("jyotiCart", JSON.stringify(cart));
}

function addToCart(name, price, weight) {

    let item = cart.find(p => p.name === name);

    if (item) {
        item.qty++;
    } else {
        cart.push({
            name: name,
            price: price,
            weight: weight,
            qty: 1
        });
    }

    saveCart();
}

function removeFromCart(name) {

    let item = cart.find(p => p.name === name);

    if (!item) return;

    item.qty--;

    if (item.qty <= 0) {
        cart = cart.filter(p => p.name !== name);
    }

    saveCart();
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