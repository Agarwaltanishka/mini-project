// Sample product data
const products = [
    { id: 1, name: 'Pencil', category: 'Writing', price: 1.99 },
    { id: 2, name: 'Notebook', category: 'Writing', price: 4.99 },
    { id: 3, name: 'Markers', category: 'Art', price: 3.49 },
    { id: 4, name: 'Scissors', category: 'Tools', price: 2.99 },
    // Add more products here
];

// Initialize an empty shopping cart
const cart = [];

// Function to add a product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            // If the product is already in the cart, increase its quantity
            existingItem.quantity++;
        } else {
            // If it's not in the cart, add it with a quantity of 1
            product.quantity = 1;
            cart.push(product);
        }
        updateCart();
    }
}

// Function to remove one item from the cart
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        const item = cart[itemIndex];
        if (item.quantity > 1) {
            // If the item has a quantity greater than 1, reduce the quantity by 1
            item.quantity--;
        } else {
            // If the item has a quantity of 1, remove it from the cart
            cart.splice(itemIndex, 1);
        }
        updateCart();
    }
}

// Function to update the cart in the HTML and show total price
function updateCart() {
    const cartList = document.getElementById('cart-items');
    const totalPriceDisplay = document.getElementById('total-price'); // New element to display total price
    cartList.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${item.name} - ₹${item.price} x ${item.quantity}</span>
            <button onclick="addToCart(${item.id})">Add</button>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartList.appendChild(listItem);

        totalPrice += item.price * item.quantity; // Calculate total price
    });

    totalPriceDisplay.textContent = `Total Price: ₹${totalPrice.toFixed(2)}`; // Display total price
}

// Function to display products
function displayProducts(productList = products) {
    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = '';

    productList.forEach(product => {
        const productElement = document.createElement('article');
        productElement.className = 'product';

        productElement.innerHTML = `
            <img src="pencil.jpg" alt="${product.image}">
            <h2>${product.name}</h2>
            <p>${product.category}</p>
            <p>Price: ₹${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productsContainer.appendChild(productElement);
    });
}

// Function to handle form submission and filter products by the search query
function handleSearch(event) {
    event.preventDefault();
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.toLowerCase();

    if (!searchTerm) {
        // If the search input is empty, display all products
        displayProducts();
    } else {
        // Filter products based on the search query
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    }
}

// Attach event listener to the search form
document.getElementById('search-form').addEventListener('submit', handleSearch);

// Display products when the page loads
displayProducts();
