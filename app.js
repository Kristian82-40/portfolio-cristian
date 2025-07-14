const products = [
    {
        id: 1,
        name: 'Camiseta "Cosmic Wave"',
        price: 29.99,
        image: 'product1.png',
        category: 'camisetas',
        description: 'Sumérgete en la ola cósmica con esta camiseta de algodón premium. Diseño inspirado en los arcades de los 80, con colores vibrantes que no pasarán desapercibidos.',
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        id: 2,
        name: 'Chaqueta "Neon Sunset"',
        price: 89.99,
        image: 'product2.png',
        category: 'chaquetas',
        description: 'La chaqueta cortavientos definitiva. Estilo retro de los 90 con un esquema de color neón que captura la esencia de un atardecer en Miami. Ligera y resistente al agua.',
        sizes: ['M', 'L', 'XL']
    },
    {
        id: 3,
        name: 'Gorra "Pixel Perfect"',
        price: 24.99,
        image: 'product3.png',
        category: 'accesorios',
        description: 'Protege tus ojos con estilo. Esta gorra trucker presenta un parche bordado con un diseño pixel art. Cierre ajustable para un ajuste perfecto.',
        sizes: ['única']
    },
    {
        id: 4,
        name: 'Camiseta "Cassette Mix"',
        price: 32.50,
        image: 'product4.png',
        category: 'camisetas',
        description: 'Rinde homenaje a la era del mixtape con esta camiseta de diseño minimalista. Hecha de una mezcla de algodón suave para máxima comodidad.',
        sizes: ['S', 'M', 'L']
    },
    {
        id: 5,
        name: 'Chaqueta "Bomber Apollo"',
        price: 99.50,
        image: 'product5.png',
        category: 'chaquetas',
        description: 'Inspirada en las chaquetas de aviador clásicas, la Bomber Apollo cuenta con parches de temática espacial y un forro interior naranja brillante. Un clásico atemporal.',
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        id: 6,
        name: 'Riñonera "Synthwave"',
        price: 35.00,
        image: 'product6.png',
        category: 'accesorios',
        description: 'Lleva tus esenciales con el máximo estilo retro. Esta riñonera de lona resistente tiene múltiples compartimentos y un diseño inspirado en el arte synthwave.',
        sizes: ['única']
    }
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    // --- INICIALIZACIÓN ---
    renderAllProducts(products, 'product-catalog');
    renderFeaturedProducts();
    setupEventListeners();
    updateCartIcon();
    initializeSwiper();
    navigateToPage(window.location.hash.substring(1) || 'home');
});

// --- INICIALIZACIÓN DE SWIPER ---
function initializeSwiper() {
    const swiper = new Swiper('.swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });
}

// --- RENDERIZADO DE ELEMENTOS ---

function renderProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Añadir al Carrito</button>
            </div>
        </div>
    `;
}

function renderAllProducts(productList, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const productsHTML = productList.map(renderProductCard).join('');
    container.innerHTML = productsHTML;

    const noResults = document.getElementById('no-results');
    if (productList.length === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
    }
}

function renderFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;
    const featured = products.slice(0, 3);
    featuredContainer.innerHTML = featured.map(renderProductCard).join('');
}

function renderProductDetail(productId) {
    const product = products.find(p => p.id == productId);
    if (!product) return;
    
    const content = `
        <div class="product-image-container">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-details-info">
            <h1>${product.name}</h1>
            <p class="product-price-detail">$${product.price.toFixed(2)}</p>
            <p class="product-description">${product.description}</p>
            <div class="size-selector">
                <label>Talla:</label>
                <div class="size-options">
                    ${product.sizes.map((size, index) => `<button class="size-btn ${index === 0 ? 'selected' : ''}" data-size="${size}">${size}</button>`).join('')}
                </div>
            </div>
            <button class="cta-button add-to-cart-btn" data-id="${product.id}">Añadir al Carrito</button>
        </div>
    `;
    document.getElementById('product-detail-content').innerHTML = content;
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartFooter = document.getElementById('cart-footer');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p id="empty-cart-message">Tu carrito está vacío.</p>';
        cartFooter.classList.add('hidden');
    } else {
        cartFooter.classList.remove('hidden');
        cartItemsContainer.innerHTML = cart.map(item => {
            const product = products.find(p => p.id === item.id);
            return `
                <div class="cart-item">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="cart-item-info">
                        <h4>${product.name}</h4>
                        <p>Precio: $${product.price.toFixed(2)}</p>
                        <p>Talla: ${item.size}</p>
                        <a href="#" class="remove-item-btn" data-id="${item.cartItemId}">Quitar</a>
                    </div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" data-id="${item.cartItemId}" data-change="-1">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" data-id="${item.cartItemId}" data-change="1">+</button>
                    </div>
                </div>
            `;
        }).join('');
    }
    updateCartTotal();
}

// --- LÓGICA DEL CARRITO ---

function addToCart(productId, size) {
    const existingItem = cart.find(item => item.id === productId && item.size === size);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        const newItem = {
            id: productId,
            size: size,
            quantity: 1,
            cartItemId: Date.now() // Unique ID for the cart item instance
        };
        cart.push(newItem);
    }
    updateCartIcon();
    showCart();
}

function updateCartQuantity(cartItemId, change) {
    const item = cart.find(i => i.cartItemId == cartItemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(cartItemId);
        } else {
            renderCart();
        }
    }
    updateCartIcon();
}

function removeFromCart(cartItemId) {
    cart = cart.filter(item => item.cartItemId != cartItemId);
    updateCartIcon();
    renderCart();
}

function updateCartIcon() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const counter = document.getElementById('cart-counter');
    counter.textContent = totalItems;
    counter.style.display = totalItems > 0 ? 'flex' : 'none';
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + (product.price * item.quantity);
    }, 0);
    document.getElementById('cart-total-price').textContent = `$${total.toFixed(2)}`;
}

// --- NAVEGACIÓN Y MANEJO DE VISTAS ---

function navigateToPage(pageId) {
    if (!pageId) pageId = 'home'; // Default a home
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    const targetPage = document.getElementById(pageId);
    if(targetPage) {
        targetPage.classList.add('active');
    } else {
        document.getElementById('home').classList.add('active'); // Fallback to home
        pageId = 'home';
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.page === pageId);
    });

    window.scrollTo(0, 0);
    window.location.hash = pageId;

    // Actualizar active en nav menu
    document.querySelectorAll('header nav a').forEach(link => {
         link.classList.toggle('active', link.dataset.page === pageId);
    });
    
    // Ocultar menú móvil después de la navegación
    const navMenu = document.querySelector('header nav');
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        document.querySelector('header nav').classList.remove('active');
    }
}

function showCart() {
    renderCart();
    document.getElementById('cart-view').classList.remove('hidden');
}

function hideCart() {
    document.getElementById('cart-view').classList.add('hidden');
}

function showCheckout() {
    hideCart();
    document.getElementById('checkout-view').classList.remove('hidden');
    document.getElementById('checkout-form').classList.remove('hidden');
    document.getElementById('checkout-success').classList.add('hidden');
    document.getElementById('checkout-form').reset();
}

function hideCheckout() {
    document.getElementById('checkout-view').classList.add('hidden');
}

// --- MANEJADORES DE EVENTOS ---

function setupEventListeners() {
    document.body.addEventListener('click', e => {
        // --- Navegación ---
        if (e.target.closest('.nav-link')) {
            e.preventDefault();
            navigateToPage(e.target.closest('.nav-link').dataset.page);
        }
        
        // --- Abrir detalle de producto ---
        if (e.target.closest('.product-card')) {
             const card = e.target.closest('.product-card');
             // No abrir detalle si se hizo click en el botón de añadir al carrito
             if (!e.target.closest('.add-to-cart-btn')) {
                renderProductDetail(card.dataset.id);
                navigateToPage('product-detail');
             }
        }
        
        // --- Añadir al carrito ---
        if (e.target.closest('.add-to-cart-btn')) {
            const button = e.target.closest('.add-to-cart-btn');
            const productId = parseInt(button.dataset.id);
            const detailView = document.getElementById('product-detail-content');
            const selectedSizeEl = detailView.querySelector('.size-btn.selected');
            const size = selectedSizeEl ? selectedSizeEl.dataset.size : products.find(p=>p.id === productId).sizes[0];
            
            addToCart(productId, size);
        }

        // --- Tallas de producto ---
        if (e.target.matches('.size-btn')) {
            document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('selected'));
            e.target.classList.add('selected');
        }

        // --- Carrito ---
        if (e.target.closest('#cart-button')) showCart();
        if (e.target.closest('#close-cart-btn')) hideCart();
        if (e.target.matches('#checkout-btn')) showCheckout();
        if (e.target.closest('#close-checkout-btn')) hideCheckout();
        
        if(e.target.matches('#back-to-shop-btn')) {
            hideCheckout();
            navigateToPage('catalog');
        }
        
        if (e.target.closest('.quantity-btn')) {
            const btn = e.target.closest('.quantity-btn');
            updateCartQuantity(btn.dataset.id, parseInt(btn.dataset.change));
        }

        if (e.target.closest('.remove-item-btn')) {
            e.preventDefault();
            removeFromCart(e.target.closest('.remove-item-btn').dataset.id);
        }
        
        // --- Filtros ---
        if (e.target.matches('.filter-btn')) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            const category = e.target.dataset.category;
            const searchTerm = document.getElementById('search-bar').value;
            filterAndSearchProducts(category, searchTerm);
        }
        
        // --- Menú móvil ---
        if (e.target.closest('#mobile-menu-toggle')) {
            document.querySelector('header nav').classList.toggle('active');
        }
    });
    
    // --- Búsqueda ---
    document.getElementById('search-bar').addEventListener('input', e => {
        const searchTerm = e.target.value;
        const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
        filterAndSearchProducts(activeCategory, searchTerm);
    });

    // --- Enviar formularios (simulación) ---
    document.getElementById('contact-form').addEventListener('submit', e => {
        e.preventDefault();
        const form = e.target;
        const successMessage = document.getElementById('form-success-message');
        form.style.display = 'none';
        successMessage.classList.remove('hidden');
        setTimeout(() => {
            successMessage.classList.add('hidden');
            form.style.display = 'flex';
            form.reset();
        }, 3000);
    });

    document.getElementById('checkout-form').addEventListener('submit', e => {
        e.preventDefault();
        document.getElementById('checkout-form').classList.add('hidden');
        document.getElementById('checkout-success').classList.remove('hidden');
        cart = []; // Vaciar carrito
        updateCartIcon();
    });
}

function filterAndSearchProducts(category, searchTerm) {
    let filteredProducts = products;

    // Filtrar por categoría
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    // Filtrar por búsqueda
    if (searchTerm.trim() !== '') {
        const lowerCaseSearch = searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(lowerCaseSearch) ||
            p.description.toLowerCase().includes(lowerCaseSearch)
        );
    }
    
    renderAllProducts(filteredProducts, 'product-catalog');
}