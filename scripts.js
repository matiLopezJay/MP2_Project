const products = [
 {
    id: 1,
    name: 'Hyrdo Boost',
    price: 80
}
];

const cart = {
    products: []
};

const productsContainer = document.getElementById ('products');
const cartItems = document.getElementById('cart-list');

products.map (product => {
    let productItem = document.createElement('div');
    productItem.className = 'product'

    let productName = document.createElement('h2');
    productName.innerText = product.name;

    let productPrice = document.createElement('h2');
    productPrice.innertText = product.price;

    let addToCartBtn = document.createElement('button');
    addToCartBtn.innerText = 'Add to Cart';
    addToCartBtn.className = 'btn btn-primary';


    addToCartBtn.addEventListener('click', () => {
        addToCart(product);
    });

    productItem.append(productName, productPrice, addToCartBtn);
    productsContainer.appendChild(productItem);
})

function addToCart(product) {
    const { price, name, id } = product;
    const checkItemIfExisting = cart.products.find(item => item.name === name);
    checkItemIfExisting ? checkItemIfExisting.quantity++ : cart.products.push({ price, name, quantity: 1});

    updateCartDisplay();
}

function deleteItemFromCart(product) {
    product.quatity--;

    if (product.quantity < 1) {
        const itemIdx = cart.products.findIndex(item => item.name === product.name);
        console.log(itemIdx);

        if (itemIdx !== -1) {
            cart.products.splice(itemIdx, -1);
            document.getElementById('cart-total').innerText = '0';
        }
    }

    updateCartDisplay();
    
}

function updateCartDisplay() {
    cartItems.innerText = '';
    let total = 0;

    cart.products.map(product => {
        const cartItem = document.createElement('li');
        const cartProduct = document.createElement('span');
        const deleteBtn = document.createElement('button')
        deleteBtn.innerHTML = 'Remove';
        deleteBtn.className = 'btn btn-danger';
        deleteBtn.style.float = 'right'
        deleteBtn.style.margin = '-4px'

        cartProduct.innerHTML =  `${product.name} - ${product.price} x ${product.quantity}`;
        cartItem.append(cartProduct, deleteBtn);
        deleteBtn.addEventListener('click', () => {
            deleteItemFromCart(product);
        });

        cartItems.appendChild(cartItem);

        total += (product.price * product.quantity);

        document.getElementById('cart-total').innerText = total;
    });

}
