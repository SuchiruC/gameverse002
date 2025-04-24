document.addEventListener('DOMContentLoaded', function () {
const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const table = document.getElementById('cart-table');
        const tbody = table.querySelector('tbody');
        const totalEl = document.getElementById('cart-total');
        const emptyMsg = document.getElementById('empty-msg');
        const buyNowBtn = document.getElementById('buy-now');

        function renderCart() {
            tbody.innerHTML = '';
            let total = 0;

            if (cart.length === 0) {
                table.style.display = 'none';
                totalEl.style.display = 'none';
                buyNowBtn.style.display = 'none';
                emptyMsg.style.display = 'block';
                return;
            }

            table.style.display = '';
            totalEl.style.display = '';
            buyNowBtn.style.display = '';
            emptyMsg.style.display = 'none';

            cart.forEach((item, index) => {
                const subtotal = item.quantity * item.price;
                total += subtotal;

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.price.toLocaleString()}</td>
                    <td><input type="number" value="${item.quantity}" min="1" data-index="${index}"></td>
                    <td>${subtotal.toLocaleString()}</td>
                    <td><button class="remove-btn" data-index="${index}">Remove</button></td>
                `;
                tbody.appendChild(row);
            });

            totalEl.textContent = `Total: Rs. ${total.toLocaleString()}`;
        }

        tbody.addEventListener('input', (e) => {
            if (e.target.type === 'number') {
                const index = e.target.dataset.index;
                const newQty = parseInt(e.target.value);
                cart[index].quantity = newQty > 0 ? newQty : 1;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            }
        });

        tbody.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-btn')) {
                const index = e.target.dataset.index;
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            }
        });

        buyNowBtn.addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });
        renderCart();
    });