const products = [
 {
    id: 1,
    name: 'Hyrdo Boost',
    price: 80,
    image: 'assets/Cleanser/DSCF5421.JPG'
},
{
    id: 2,
    name: 'Sunscreen',
    price: 50,
    image: 'assets/SunScreens/IMG_4014.JPG'
},
{
    id: 3,
    name: 'Lotion',
    price: 30
}
];

const cart = {
    products: []
};

const productsContainer = document.getElementById ('products');
const cartItems = document.getElementById('cart-list');

products.map (product => {
    let productItem = document.createElement('div');
    productItem.className = 'product';
    productItem.className = 'card col-md-4 m-3';
    productItem.style.width = '18rem';

    let productImage = document.createElement('img')
    productImage.className = 'card-img-top';
    productImage.src = product.image;

    let productName = document.createElement('h2');
    productName.innerText = product.name;

    let productPrice = document.createElement('h2');
    productPrice.innertText = product.price;

    let addToCartBtn = document.createElement('button');
    addToCartBtn.innerText = 'Add to Cart';
    addToCartBtn.className = 'btn btn-outline-dark w-50 d-grid gap-2 col-6 mx-auto mb-4';


    addToCartBtn.addEventListener('click', () => {
        addToCart(product);
    });

    productItem.append(productImage, productName, productPrice, addToCartBtn);
    productsContainer.appendChild(productItem);
})

function addToCart(product) {
    const { image, price, name, id } = product;
    const checkItemIfExisting = cart.products.find(item => item.name === name);
    checkItemIfExisting ? checkItemIfExisting.quantity++ : cart.products.push({ image, price, name, quantity: 1});

    updateCartDisplay();
}

function deleteItemFromCart(product) {
    product.quantity--;

    if (product.quantity < 1) {
        const itemIdx = cart.products.findIndex(item => item.name === product.name);
        console.log(itemIdx);

        if (itemIdx !== -1) {
            cart.products.splice(itemIdx, 1);
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
        deleteBtn.innerHTML = 'X';
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
