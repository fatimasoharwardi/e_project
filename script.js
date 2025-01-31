document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');

    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
            nav.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Cart functionality
    document.querySelectorAll('.cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Add to cart animation
            this.classList.add('added-to-cart');
            
            // Change icon temporarily
            const icon = this.querySelector('i');
            icon.classList.remove('fa-shopping-cart');
            icon.classList.add('fa-check');
            
            // Reset after animation
            setTimeout(() => {
                this.classList.remove('added-to-cart');
                icon.classList.remove('fa-check');
                icon.classList.add('fa-shopping-cart');
            }, 1500);
            
            // Here you can add actual cart functionality
            const productName = this.closest('.product-card').querySelector('h4').textContent;
            const price = this.closest('.product-card').querySelector('.product-price').textContent;
            
            console.log(`Added to cart: ${productName} - ${price}`);
            // Add your cart logic here
        });
    });

    // Product quick view functionality
    document.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h4').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productImage = productCard.querySelector('.product-image img').src;
            
            // Here you can implement a modal or quick view functionality
            console.log('Quick view:', { productName, productPrice, productImage });
        });
    });

    // Authentication Modal
    const authModal = document.getElementById('authModal');
    const authCard = document.querySelector('.auth-card');
    const flipBtns = document.querySelectorAll('.flip-btn');
    const closeModal = document.querySelector('.close-modal');

    // Show auth modal on first visit
    if (!localStorage.getItem('visited')) {
        setTimeout(() => {
            authModal.classList.add('active');
        }, 2000);
        localStorage.setItem('visited', 'true');
    }

    // Flip card functionality
    flipBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            authCard.classList.toggle('flipped');
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        authModal.classList.remove('active');
    });

    // Cart functionality
    const cartModal = document.getElementById('cartModal');
    const cartItems = document.querySelector('.cart-items');
    const totalAmount = document.querySelector('.total-amount');
    const closeCart = document.querySelector('.close-cart');
    let cart = [];

    function updateCart() {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price}</p>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
        totalAmount.textContent = `$${total.toFixed(2)}`;
    }

    // Add to cart functionality
    document.querySelectorAll('.cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const product = {
                id: Date.now(),
                name: productCard.querySelector('h4').textContent,
                price: productCard.querySelector('.product-price').textContent.replace('$', ''),
                image: productCard.querySelector('img').src
            };

            cart.push(product);
            updateCart();
            cartModal.classList.add('active');

            // Existing cart button animation
            this.classList.add('added-to-cart');
            const icon = this.querySelector('i');
            icon.classList.remove('fa-shopping-cart');
            icon.classList.add('fa-check');
            
            setTimeout(() => {
                this.classList.remove('added-to-cart');
                icon.classList.remove('fa-check');
                icon.classList.add('fa-shopping-cart');
            }, 1500);
        });
    });

    // Close cart
    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });

    // Remove item from cart
    cartItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const itemId = parseInt(e.target.dataset.id);
            cart = cart.filter(item => item.id !== itemId);
            updateCart();
        }
    });
});
