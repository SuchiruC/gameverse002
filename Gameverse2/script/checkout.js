document.addEventListener('DOMContentLoaded', function () {
const tableBody = document.querySelector('#checkout-table tbody');
const totalEl = document.getElementById('checkout-total');
const table = document.getElementById('checkout-table');
const emptyMsg = document.getElementById('empty-msg');
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = 0;

function renderOrder() {
    if (cart.length === 0) {
        emptyMsg.style.display = 'block';
        table.style.display = 'none';
        return;
    }

    table.style.display = 'table';
    emptyMsg.style.display = 'none';

    cart.forEach(item => {
        let lineTotal = item.quantity * item.price;
        total += lineTotal;
        let row = `<tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>Rs. ${item.price.toLocaleString()}</td>
            <td>Rs. ${lineTotal.toLocaleString()}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });

    totalEl.textContent = `Rs. ${total.toLocaleString()}`;
}

document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);

    alert("✅ Thank you for your purchase!\n📦 Your order will be delivered by: " + deliveryDate.toDateString());

    localStorage.removeItem('cart');
    window.location.href = 'order.html';
});

renderOrder();
});