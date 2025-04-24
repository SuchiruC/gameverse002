document.addEventListener('DOMContentLoaded', function () {
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const favoriteList = document.getElementById('favorite-list');
const emptyMsg = document.getElementById('empty-msg');

function renderFavorites() {
    favoriteList.innerHTML = '';

    if (favorites.length === 0) {
        emptyMsg.style.display = 'block';
        return;
    } else {
        emptyMsg.style.display = 'none';
    }

    favorites.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <div class="item-name">${item.name}</div>
            <div class="price">Rs. ${item.price.toLocaleString()}</div>
            <div class="actions">
                <input type="number" min="1" value="1" id="qty-${index}">
                <button class="btn btn-cart">Add to Cart</button>
                <button class="btn btn-remove">Remove</button>
            </div>
        `;

        // Add event listeners AFTER innerHTML is set
        const addToCartBtn = card.querySelector('.btn-cart');
        const removeBtn = card.querySelector('.btn-remove');

        addToCartBtn.addEventListener('click', () => addToCart(index));
        removeBtn.addEventListener('click', () => removeFavorite(index));

        favoriteList.appendChild(card);
    });
}


function addToCart(index) {
    const item = favorites[index];
    const quantityInput = document.getElementById(`qty-${index}`);
    const quantity = parseInt(quantityInput.value);

    const existing = cart.find(c => c.name === item.name);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ name: item.name, price: item.price, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item.name} added to cart!`);
}

function removeFavorite(index) {
    if (confirm('Remove this item from favorites?')) {
        favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderFavorites();
    }
}

renderFavorites();
});