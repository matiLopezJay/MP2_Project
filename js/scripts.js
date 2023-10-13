let cart = [
    {
        productName: 'Hydro Boost',
        price: 80,
        image: '"assets/Cleanser/DSCF5421.JPG"'
    }
];
let cartTotal = 0;

const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartList = document.getElementById('cart-list');
const cartTotalElement = document.getElementById('cart-total');

function addToCart(productName, price) {
    const item = { productName, price };
    cart.push(item);
    cartTotal += price;
    updateCart();
}

function removeFromCart(index) {
    const removedItem = cart.splice(index, 1)[0];
    cartTotal -= removedItem.price;
    updateCart();
}

function updateCart() {
    cartList.innerHTML = ''; 
    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('cart-item');
        listItem.innerHTML = `
            <span>${item.productName} - ₱ ${item.price}</span>
            <button class="remove-from-cart" data-index="${index}">Remove</button>
        `;

        listItem.querySelector('.remove-from-cart').addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            removeFromCart(index);
        });

        cartList.appendChild(listItem);
    });

    cartTotalElement.textContent = cartTotal.toFixed(2);
}


addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const productName =  `Product ${index + 1}`;
        const price = index === 0 ? 599 : 450;

        addToCart(productName, price);
    });
});
