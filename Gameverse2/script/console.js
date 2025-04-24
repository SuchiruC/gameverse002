document.addEventListener('DOMContentLoaded', function () {
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

document.querySelectorAll('.btn-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.product-card');
        const name = card.dataset.name;
        const price = parseInt(card.dataset.price);
        const quantity = parseInt(card.querySelector('input[type="number"]').value);

        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${name} added to cart!`);
    });
});

document.querySelectorAll('.btn-fav').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.product-card');
        const name = card.dataset.name;
        const price = parseInt(card.dataset.price);

        if (!favorites.some(item => item.name === name)) {
            favorites.push({ name, price });
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert(`${name} added to favorites!`);
        } else {
            alert(`${name} is already in favorites.`);
        }
    });
});
});