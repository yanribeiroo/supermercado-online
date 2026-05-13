/* DATABASE - GERENCIAMENTO DE DADOS COM LOCALSTORAGE */

class Database {
    constructor() {
        this.PRODUCTS_KEY = 'supermarket_products';
        this.ORDERS_KEY = 'supermarket_orders';
        this.CART_KEY = 'supermarket_cart';
        
        if (!this.getProducts().length) {
            this.initializeProducts();
        }
    }

    initializeProducts() {
        const defaultProducts = [
            { id: 1, name: 'Maçã Vermelha', category: 'Frutas', price: 5.99, description: 'Maçã fresca e vermelha', image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop', stock: 50, sales: 12 },
            { id: 2, name: 'Banana Ouro', category: 'Frutas', price: 3.50, description: 'Bananas frescas e doces', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6231b8ff?w=400&h=400&fit=crop', stock: 75, sales: 28 },
            { id: 3, name: 'Alface Crespa', category: 'Verduras', price: 4.99, description: 'Alface fresca e crocante', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop', stock: 40, sales: 15 },
            { id: 4, name: 'Tomate Caqui', category: 'Verduras', price: 6.99, description: 'Tomates suculentos e vermelhos', image: 'https://images.unsplash.com/photo-1545021581-7d378dc00f8b?w=400&h=400&fit=crop', stock: 35, sales: 19 },
            { id: 5, name: 'Leite Integral', category: 'Laticínios', price: 4.50, description: 'Leite integral fresco, 1 litro', image: 'https://images.unsplash.com/photo-1563636619-e0e99a7e0e2f?w=400&h=400&fit=crop', stock: 100, sales: 45 },
            { id: 6, name: 'Queijo Mozzarela', category: 'Laticínios', price: 12.99, description: 'Queijo mozzarela 500g', image: 'https://images.unsplash.com/photo-1589985643862-8a89bfaba121?w=400&h=400&fit=crop', stock: 25, sales: 8 },
            { id: 7, name: 'Frango Congelado', category: 'Carnes', price: 19.99, description: 'Peito de frango congelado 1kg', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=400&fit=crop', stock: 20, sales: 5 },
            { id: 8, name: 'Pão Francês', category: 'Alimentos', price: 7.99, description: 'Pão francês fresco, 6 unidades', image: 'https://images.unsplash.com/photo-1586985289688-cacf913bb194?w=400&h=400&fit=crop', stock: 60, sales: 32 },
            { id: 9, name: 'Suco Natural', category: 'Bebidas', price: 8.99, description: 'Suco natural de laranja 1L', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop', stock: 45, sales: 22 },
            { id: 10, name: 'Arroz Integral', category: 'Grãos', price: 6.99, description: 'Arroz integral 2kg', image: 'https://images.unsplash.com/photo-1537038221872-37500306bebc?w=400&h=400&fit=crop', stock: 80, sales: 18 },
            { id: 11, name: 'Feijão Preto', category: 'Grãos', price: 5.99, description: 'Feijão preto 1kg', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop', stock: 70, sales: 14 },
            { id: 12, name: 'Sabonete Líquido', category: 'Higiene', price: 4.99, description: 'Sabonete líquido 250ml', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop', stock: 90, sales: 35 }
        ];
        this.saveProducts(defaultProducts);
    }

    /* PRODUTOS */
    getProducts() {
        const products = localStorage.getItem(this.PRODUCTS_KEY);
        return products ? JSON.parse(products) : [];
    }

    saveProducts(products) {
        localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(products));
    }

    getProductById(id) {
        return this.getProducts().find(p => p.id === parseInt(id));
    }

    addProduct(product) {
        const products = this.getProducts();
        product.id = Math.max(0, ...products.map(p => p.id)) + 1;
        product.sales = 0;
        products.push(product);
        this.saveProducts(products);
        return product;
    }

    updateProduct(id, updates) {
        const products = this.getProducts();
        const index = products.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            products[index] = { ...products[index], ...updates };
            this.saveProducts(products);
            return products[index];
        }
        return null;
    }

    deleteProduct(id) {
        const products = this.getProducts().filter(p => p.id !== parseInt(id));
        this.saveProducts(products);
    }

    /* PEDIDOS */
    getOrders() {
        const orders = localStorage.getItem(this.ORDERS_KEY);
        return orders ? JSON.parse(orders) : [];
    }

    saveOrders(orders) {
        localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
    }

    getOrderById(id) {
        return this.getOrders().find(o => o.id === parseInt(id));
    }

    createOrder(orderData) {
        const orders = this.getOrders();
        
        const order = {
            id: Math.max(0, ...orders.map(o => o.id || 0)) + 1,
            customerName: orderData.customerName,
            customerPhone: orderData.customerPhone,
            customerAddress: orderData.customerAddress,
            customerComplement: orderData.customerComplement || '',
            items: orderData.items,
            subtotal: orderData.subtotal,
            deliveryFee: orderData.deliveryFee,
            total: orderData.total,
            status: 'recebido',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        orders.push(order);
        this.saveOrders(orders);

        order.items.forEach(item => {
            const product = this.getProductById(item.productId);
            if (product) {
                product.sales = (product.sales || 0) + item.quantity;
                this.updateProduct(item.productId, product);
            }
        });

        return order;
    }

    updateOrderStatus(orderId, status) {
        const order = this.getOrderById(orderId);
        if (order) {
            order.status = status;
            order.updatedAt = new Date().toISOString();
            
            const orders = this.getOrders();
            const index = orders.findIndex(o => o.id === parseInt(orderId));
            if (index !== -1) {
                orders[index] = order;
                this.saveOrders(orders);
            }
        }
        return order;
    }

    /* CARRINHO */
    getCart() {
        const cart = localStorage.getItem(this.CART_KEY);
        return cart ? JSON.parse(cart) : [];
    }

    saveCart(cart) {
        localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    }

    addToCart(product, quantity = 1) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.productId === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        this.saveCart(cart);
        return cart;
    }

    removeFromCart(productId) {
        const cart = this.getCart().filter(item => item.productId !== productId);
        this.saveCart(cart);
        return cart;
    }

    updateCartItem(productId, quantity) {
        const cart = this.getCart();
        const item = cart.find(item => item.productId === productId);
        if (item) {
            if (quantity <= 0) {
                return this.removeFromCart(productId);
            }
            item.quantity = quantity;
            this.saveCart(cart);
        }
        return cart;
    }

    clearCart() {
        localStorage.removeItem(this.CART_KEY);
        return [];
    }

    getCartTotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getCartCount() {
        const cart = this.getCart();
        return cart.reduce((count, item) => count + item.quantity, 0);
    }

    /* ESTATÍSTICAS */
    getStatistics() {
        const products = this.getProducts();
        const orders = this.getOrders();

        const totalProducts = products.length;
        const totalOrders = orders.length;
        const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
        const deliveredOrders = orders.filter(o => o.status === 'entregue').length;

        const salesByDay = this.getSalesByDay();

        const ordersByStatus = {
            recebido: orders.filter(o => o.status === 'recebido').length,
            preparando: orders.filter(o => o.status === 'preparando').length,
            entrega: orders.filter(o => o.status === 'entrega').length,
            entregue: orders.filter(o => o.status === 'entregue').length
        };

        const topProducts = products
            .sort((a, b) => (b.sales || 0) - (a.sales || 0))
            .slice(0, 10);

        return {
            totalProducts,
            totalOrders,
            totalSales,
            deliveredOrders,
            salesByDay,
            ordersByStatus,
            topProducts
        };
    }

    getSalesByDay(days = 7) {
        const orders = this.getOrders();
        const data = {};

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toLocaleDateString('pt-BR');
            data[dateStr] = 0;
        }

        orders.forEach(order => {
            const date = new Date(order.createdAt).toLocaleDateString('pt-BR');
            if (data.hasOwnProperty(date)) {
                data[date] += order.total;
            }
        });

        return data;
    }

    getTopProducts(limit = 10) {
        return this.getProducts()
            .sort((a, b) => (b.sales || 0) - (a.sales || 0))
            .slice(0, limit);
    }
}

const db = new Database();

/* DELIVERY - SISTEMA DE RASTREAMENTO */

class DeliveryTracker {
    constructor() {
        this.deliveryFee = 5.00;
        this.estimatedTime = 45;
    }

    getEstimatedDeliveryTime(order) {
        const currentStatus = order.status;
        const createdDate = new Date(order.createdAt);
        
        let estimatedMinutes = 0;
        
        switch(currentStatus) {
            case 'recebido': estimatedMinutes = 10; break;
            case 'preparando': estimatedMinutes = 25; break;
            case 'entrega': estimatedMinutes = 40; break;
            case 'entregue': estimatedMinutes = 0; break;
        }

        const deliveryDate = new Date(createdDate.getTime() + estimatedMinutes * 60000);
        return {
            minutesRemaining: estimatedMinutes,
            estimatedTime: deliveryDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            percentage: Math.min(100, ((45 - estimatedMinutes) / 45) * 100)
        };
    }

    getTrackingInfo(order) {
        const estimatedDelivery = this.getEstimatedDeliveryTime(order);
        
        return {
            orderId: order.id,
            status: order.status,
            statusLabel: this.getStatusLabel(order.status),
            customerName: order.customerName,
            address: order.customerAddress,
            phone: order.customerPhone,
            createdAt: new Date(order.createdAt),
            updatedAt: new Date(order.updatedAt),
            estimatedDelivery: estimatedDelivery.estimatedTime,
            minutesRemaining: estimatedDelivery.minutesRemaining,
            deliveryProgress: estimatedDelivery.percentage,
            items: order.items,
            total: order.total,
            timeline: this.getTimeline(order)
        };
    }

    getTimeline(order) {
        const statuses = ['recebido', 'preparando', 'entrega', 'entregue'];
        const currentIndex = statuses.indexOf(order.status);
        
        return statuses.map((status, index) => ({
            status: status,
            label: this.getStatusLabel(status),
            completed: index <= currentIndex,
            current: index === currentIndex,
            icon: this.getStatusIcon(status)
        }));
    }

    getStatusLabel(status) {
        const labels = {
            'recebido': 'Pedido Recebido',
            'preparando': 'Preparando',
            'entrega': 'Saiu para Entrega',
            'entregue': 'Entregue'
        };
        return labels[status] || status;
    }

    getStatusIcon(status) {
        const icons = {
            'recebido': '📋',
            'preparando': '📦',
            'entrega': '🚚',
            'entregue': '✅'
        };
        return icons[status] || '•';
    }

    getStatusColor(status) {
        const colors = {
            'recebido': '#004E89',
            'preparando': '#F77F00',
            'entrega': '#FF6B35',
            'entregue': '#00D084'
        };
        return colors[status] || '#999999';
    }
}

const deliveryTracker = new DeliveryTracker();

/* APP - LÓGICA PRINCIPAL DA LOJA */

class App {
    constructor() {
        this.productsGrid = document.getElementById('productsGrid');
        this.categoriesList = document.getElementById('categoriesList');
        this.searchInput = document.getElementById('searchInput');
        this.cartBtn = document.getElementById('cartBtn');
        this.cartCount = document.getElementById('cartCount');
        this.cartModal = document.getElementById('cartModal');
        this.checkoutModal = document.getElementById('checkoutModal');
        this.menuToggle = document.getElementById('menuToggle');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.notification = document.getElementById('notification');
        
        this.currentCategory = null;
        this.filteredProducts = [];

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderCategories();
        this.renderProducts();
        this.updateCartCount();
    }

    setupEventListeners() {
        this.cartBtn.addEventListener('click', () => this.openCart());
        document.getElementById('closeCart').addEventListener('click', () => this.closeCart());
        document.getElementById('continueShoppingBtn').addEventListener('click', () => this.closeCart());
        document.getElementById('checkoutBtn').addEventListener('click', () => this.openCheckout());
        document.getElementById('closeCheckout').addEventListener('click', () => this.closeCheckout());
        document.getElementById('checkoutForm').addEventListener('submit', (e) => this.handleCheckout(e));

        this.searchInput.addEventListener('input', (e) => this.handleSearch(e));

        this.menuToggle.addEventListener('click', () => this.toggleMobileMenu());
        document.querySelectorAll('.mobile-menu-link').forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        this.cartModal.addEventListener('click', (e) => {
            if (e.target === this.cartModal) this.closeCart();
        });
        this.checkoutModal.addEventListener('click', (e) => {
            if (e.target === this.checkoutModal) this.closeCheckout();
        });
    }

    renderCategories() {
        const categories = ['Todos', 'Frutas', 'Verduras', 'Laticínios', 'Carnes', 'Alimentos', 'Bebidas', 'Grãos', 'Higiene'];
        
        this.categoriesList.innerHTML = categories.map(category => `
            <button class="category-btn ${category === 'Todos' ? 'active' : ''}" data-category="${category}">
                ${category}
            </button>
        `).join('');

        this.categoriesList.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleCategoryFilter(e));
        });
    }

    renderProducts(products = null) {
        const productsToRender = products || db.getProducts();
        
        if (productsToRender.length === 0) {
            this.productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Nenhum produto encontrado</p>';
            return;
        }

        this.productsGrid.innerHTML = productsToRender.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/250x200?text=Produto'">
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <div>
                            <div class="product-price">R$ ${product.price.toFixed(2)}</div>
                            <div class="product-stock">${product.stock > 0 ? `${product.stock} em estoque` : 'Fora de estoque'}</div>
                        </div>
                        <button class="add-to-cart-btn" onclick="app.handleAddToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    handleAddToCart(productId) {
        const product = db.getProductById(productId);
        if (!product) return;

        if (product.stock === 0) {
            this.showNotification('Este produto está fora de estoque', 'error');
            return;
        }

        db.addToCart(product, 1);
        this.updateCartCount();
        this.showNotification(`${product.name} adicionado ao carrinho!`, 'success');
    }

    updateCartCount() {
        const count = db.getCartCount();
        this.cartCount.textContent = count;
    }

    openCart() {
        const cart = db.getCart();
        const cartItems = document.getElementById('cartItems');

        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <h3>Seu carrinho está vazio</h3>
                    <p>Comece adicionando alguns produtos!</p>
                </div>
            `;
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/80'">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" onclick="app.decreaseQuantity(${item.productId})">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="app.increaseQuantity(${item.productId})">+</button>
                            <button class="remove-btn" onclick="app.removeFromCart(${item.productId})">Remover</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        this.updateCartSummary();
        this.cartModal.classList.add('active');
    }

    closeCart() {
        this.cartModal.classList.remove('active');
    }

    increaseQuantity(productId) {
        const cart = db.getCart();
        const item = cart.find(i => i.productId === productId);
        if (item) {
            const product = db.getProductById(productId);
            if (item.quantity < product.stock) {
                db.updateCartItem(productId, item.quantity + 1);
                this.openCart();
            } else {
                this.showNotification('Quantidade máxima atingida', 'warning');
            }
        }
    }

    decreaseQuantity(productId) {
        const cart = db.getCart();
        const item = cart.find(i => i.productId === productId);
        if (item && item.quantity > 1) {
            db.updateCartItem(productId, item.quantity - 1);
            this.openCart();
        }
    }

    removeFromCart(productId) {
        db.removeFromCart(productId);
        this.updateCartCount();
        this.openCart();
        this.showNotification('Produto removido do carrinho', 'success');
    }

    updateCartSummary() {
        const subtotal = db.getCartTotal();
        const deliveryFee = 5.00;
        const total = subtotal + deliveryFee;

        document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
        document.getElementById('deliveryFee').textContent = `R$ ${deliveryFee.toFixed(2)}`;
        document.getElementById('total').textContent = `R$ ${total.toFixed(2)}`;
        document.getElementById('checkoutTotal').textContent = `R$ ${total.toFixed(2)}`;
    }

    openCheckout() {
        const cart = db.getCart();
        
        if (cart.length === 0) {
            this.showNotification('Adicione produtos ao carrinho primeiro', 'warning');
            return;
        }

        this.updateCartSummary();
        this.closeCart();
        this.checkoutModal.classList.add('active');
    }

    closeCheckout() {
        this.checkoutModal.classList.remove('active');
    }

    handleCheckout(e) {
        e.preventDefault();

        const cart = db.getCart();
        if (cart.length === 0) {
            this.showNotification('Carrinho vazio', 'error');
            return;
        }

        const customerName = document.getElementById('customerName').value;
        const customerPhone = document.getElementById('customerPhone').value;
        const customerAddress = document.getElementById('customerAddress').value;
        const customerComplement = document.getElementById('customerComplement').value;

        const subtotal = db.getCartTotal();
        const deliveryFee = 5.00;
        const total = subtotal + deliveryFee;

        const order = db.createOrder({
            customerName,
            customerPhone,
            customerAddress,
            customerComplement,
            items: cart,
            subtotal,
            deliveryFee,
            total
        });

        db.clearCart();
        document.getElementById('checkoutForm').reset();

        this.closeCheckout();
        this.updateCartCount();
        
        this.showNotification('✅ Pedido realizado com sucesso! ID: #' + order.id, 'success');
        
        setTimeout(() => {
            window.location.href = 'pedidos.html';
        }, 2000);
    }

    handleCategoryFilter(e) {
        const category = e.target.dataset.category;
        
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        if (category === 'Todos') {
            this.renderProducts();
        } else {
            const filtered = db.getProducts().filter(p => p.category === category);
            this.renderProducts(filtered);
        }

        this.currentCategory = category;
    }

    handleSearch(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        if (searchTerm === '') {
            this.renderProducts();
            return;
        }

        const filtered = db.getProducts().filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm) ||
            p.category.toLowerCase().includes(searchTerm)
        );

        this.renderProducts(filtered);
    }

    toggleMobileMenu() {
        this.mobileMenu.classList.toggle('active');
    }

    closeMobileMenu() {
        this.mobileMenu.classList.remove('active');
    }

    showNotification(message, type = 'success') {
        this.notification.textContent = message;
        this.notification.className = 'notification show ' + type;
        
        setTimeout(() => {
            this.notification.classList.remove('show');
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});

/* PEDIDOS - PÁGINA DE RASTREAMENTO */

class OrdersPage {
    constructor() {
        this.ordersList = document.getElementById('ordersList');
        this.emptyState = document.getElementById('emptyState');
        this.orderDetailModal = document.getElementById('orderDetailModal');
        this.notification = document.getElementById('notification');
        this.menuToggle = document.getElementById('menuToggle');
        this.mobileMenu = document.getElementById('mobileMenu');

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderOrders();
        this.startAutoRefresh();
    }

    setupEventListeners() {
        document.getElementById('closeOrderDetailModal').addEventListener('click', () => {
            this.closeOrderDetailModal();
        });

        this.menuToggle.addEventListener('click', () => this.toggleMobileMenu());
        document.querySelectorAll('.mobile-menu-link').forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        this.orderDetailModal.addEventListener('click', (e) => {
            if (e.target === this.orderDetailModal) this.closeOrderDetailModal();
        });

        setInterval(() => this.renderOrders(), 10000);
    }

    renderOrders() {
        const orders = db.getOrders();

        if (orders.length === 0) {
            this.ordersList.style.display = 'none';
            this.emptyState.style.display = 'block';
            return;
        }

        this.ordersList.style.display = 'flex';
        this.emptyState.style.display = 'none';

        const sortedOrders = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        this.ordersList.innerHTML = sortedOrders.map(order => {
            const tracking = deliveryTracker.getTrackingInfo(order);
            const statusColor = deliveryTracker.getStatusColor(order.status);
            
            return `
                <div class="order-card">
                    <div class="order-header">
                        <div>
                            <span class="order-id">Pedido #${order.id}</span>
                            <span class="order-status status-${order.status}">
                                ${tracking.statusLabel}
                            </span>
                        </div>
                        <div style="color: var(--text-secondary); font-size: 0.85rem;">
                            ${new Date(order.createdAt).toLocaleDateString('pt-BR')}
                        </div>
                    </div>

                    <div class="order-info">
                        <div class="info-item">
                            <div class="info-label">Cliente</div>
                            <div class="info-value">${order.customerName}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Telefone</div>
                            <div class="info-value">${order.customerPhone}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Endereço</div>
                            <div class="info-value">${order.customerAddress}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Itens</div>
                            <div class="info-value">${order.items.length} produto(s)</div>
                        </div>
                    </div>

                    <div style="margin: 1rem 0; padding: 1rem; background-color: var(--light-bg); border-radius: 8px;">
                        <div style="font-size: 0.9rem; margin-bottom: 0.75rem;">
                            <strong>Progresso da Entrega:</strong>
                        </div>
                        <div style="width: 100%; height: 8px; background-color: var(--border-color); border-radius: 10px; overflow: hidden;">
                            <div style="width: ${tracking.deliveryProgress}%; height: 100%; background: ${statusColor}; transition: width 0.3s ease;"></div>
                        </div>
                        <div style="font-size: 0.8rem; margin-top: 0.75rem; color: var(--text-secondary);">
                            ${tracking.minutesRemaining > 0 ? `⏱️ Tempo estimado: ${tracking.minutesRemaining}min` : '✅ Entregue'}
                        </div>
                    </div>

                    <div class="order-items">
                        <strong style="display: block; margin-bottom: 0.75rem;">Itens do Pedido:</strong>
                        ${order.items.map(item => `
                            <div class="order-item">
                                <span>${item.name} x ${item.quantity}</span>
                                <span>R$ ${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        `).join('')}
                    </div>

                    <div class="order-total">
                        Total: R$ ${order.total.toFixed(2)}
                    </div>

                    <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;" onclick="ordersPage.openOrderDetail(${order.id})">
                        Ver Detalhes
                    </button>
                </div>
            `;
        }).join('');
    }

    openOrderDetail(orderId) {
        const order = db.getOrderById(orderId);
        if (!order) return;

        const tracking = deliveryTracker.getTrackingInfo(order);

        const content = document.getElementById('orderDetailContent');
        
        const timelineHtml = tracking.timeline.map(item => `
            <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background-color: ${item.completed ? deliveryTracker.getStatusColor(item.status) : '#E0E0E0'}; color: white; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; margin-right: 1rem; font-weight: bold; flex-shrink: 0;">
                    ${item.icon}
                </div>
                <div style="flex-grow: 1;">
                    <div style="font-weight: 600; color: ${item.completed ? 'var(--text-primary)' : 'var(--text-secondary)'};">
                        ${item.label}
                    </div>
                    ${item.current ? `<div style="font-size: 0.85rem; color: var(--primary-color);">Etapa atual</div>` : ''}
                </div>
            </div>
        `).join('');

        content.innerHTML = `
            <div style="padding: 1rem 0;">
                <h3 style="margin-bottom: 1rem; color: var(--secondary-color);">
                    Status do Rastreamento
                </h3>
                ${timelineHtml}
            </div>

            <div style="padding: 1rem; background-color: var(--light-bg); border-radius: 8px; margin: 1.5rem 0;">
                <div style="margin-bottom: 1rem;">
                    <strong>Status Atual:</strong>
                    <span style="margin-left: 1rem;" class="order-status status-${order.status}">
                        ${tracking.statusLabel}
                    </span>
                </div>
                <div style="margin-bottom: 1rem;">
                    <strong>Tempo Estimado:</strong>
                    <span style="margin-left: 1rem;">
                        ${tracking.minutesRemaining > 0 ? tracking.minutesRemaining + ' minutos' : 'Entregue'}
                    </span>
                </div>
                <div>
                    <strong>Horário Estimado:</strong>
                    <span style="margin-left: 1rem;">${tracking.estimatedDelivery}</span>
                </div>
            </div>

            <div style="margin-top: 1.5rem;">
                <h3 style="margin-bottom: 1rem; color: var(--secondary-color);">
                    Informações da Entrega
                </h3>
                <div style="padding: 1rem; background-color: var(--light-bg); border-radius: 8px;">
                    <div style="margin-bottom: 0.75rem;">
                        <strong>Cliente:</strong> ${tracking.customerName}
                    </div>
                    <div style="margin-bottom: 0.75rem;">
                        <strong>Telefone:</strong> ${tracking.phone}
                    </div>
                    <div style="margin-bottom: 0.75rem;">
                        <strong>Endereço:</strong> ${tracking.address}
                    </div>
                    <div style="margin-bottom: 0.75rem;">
                        <strong>Data do Pedido:</strong> ${tracking.createdAt.toLocaleString('pt-BR')}
                    </div>
                    <div>
                        <strong>Última Atualização:</strong> ${tracking.updatedAt.toLocaleString('pt-BR')}
                    </div>
                </div>
            </div>

            <div style="margin-top: 1.5rem;">
                <h3 style="margin-bottom: 1rem; color: var(--secondary-color);">
                    Itens do Pedido
                </h3>
                <div style="padding: 1rem; background-color: var(--light-bg); border-radius: 8px;">
                    ${tracking.items.map(item => `
                        <div style="display: flex; justify-content: space-between; padding-bottom: 0.75rem; margin-bottom: 0.75rem; border-bottom: 1px solid var(--border-color);">
                            <span>${item.name} x ${item.quantity}</span>
                            <span style="font-weight: 600;">R$ ${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `).join('')}
                    <div style="display: flex; justify-content: space-between; padding-top: 0.75rem; margin-top: 0.75rem; border-top: 2px solid var(--border-color); font-weight: 700; font-size: 1.1rem; color: var(--primary-color);">
                        <span>Total:</span>
                        <span>R$ ${tracking.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `;

        this.orderDetailModal.classList.add('active');
    }

    closeOrderDetailModal() {
        this.orderDetailModal.classList.remove('active');
    }

    startAutoRefresh() {
        setInterval(() => this.renderOrders(), 10000);
    }

    toggleMobileMenu() {
        this.mobileMenu.classList.toggle('active');
    }

    closeMobileMenu() {
        this.mobileMenu.classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.ordersPage = new OrdersPage();
});

/* ADMIN - LÓGICA DO PAINEL ADMINISTRATIVO */

const ADMIN_PASSWORD = 'yanribeiro123';

function initAdminAccess() {
    const overlay = document.getElementById('adminLoginOverlay');
    const form = document.getElementById('adminLoginForm');
    const passwordInput = document.getElementById('adminPasswordInput');
    const errorMessage = document.getElementById('adminLoginError');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (passwordInput.value === ADMIN_PASSWORD) {
            overlay.classList.remove('active');
            passwordInput.value = '';
            errorMessage.textContent = '';
            window.admin = new AdminPanel();
        } else {
            errorMessage.textContent = 'Senha incorreta. Tente novamente.';
            passwordInput.focus();
        }
    });

    passwordInput.addEventListener('input', () => {
        if (errorMessage.textContent) {
            errorMessage.textContent = '';
        }
    });
}

class AdminPanel {
    constructor() {
        this.sidebar = document.getElementById('adminSidebar');
        this.menuToggle = document.getElementById('menuToggle');
        this.notification = document.getElementById('notification');
        this.currentSection = 'dashboard';
        
        this.productModal = document.getElementById('productModal');
        this.orderModal = document.getElementById('orderModal');
        
        this.productForm = document.getElementById('productForm');
        this.statusFilter = document.getElementById('statusFilter');
        
        this.editingProductId = null;
        this.currentChart = {};

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderDashboard();
        this.setupCharts();
    }

    setupEventListeners() {
        document.querySelectorAll('.admin-nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavigation(e.target.dataset.section, e.target);
            });
        });

        document.getElementById('addProductBtn').addEventListener('click', () => this.openProductModal());
        document.getElementById('closeProductModal').addEventListener('click', () => this.closeProductModal());
        this.productForm.addEventListener('submit', (e) => this.handleProductSubmit(e));

        document.getElementById('closeOrderModal').addEventListener('click', () => this.closeOrderModal());
        this.statusFilter.addEventListener('change', () => this.renderOrders());

        this.menuToggle.addEventListener('click', () => this.toggleSidebar());

        this.productModal.addEventListener('click', (e) => {
            if (e.target === this.productModal) this.closeProductModal();
        });
        this.orderModal.addEventListener('click', (e) => {
            if (e.target === this.orderModal) this.closeOrderModal();
        });
    }

    handleNavigation(section, linkElement) {
        this.currentSection = section;
        
        document.querySelectorAll('.admin-nav-link').forEach(link => {
            link.classList.remove('active');
        });
        if (linkElement) {
            linkElement.classList.add('active');
        }

        document.querySelectorAll('.admin-section').forEach(section => {
            section.classList.remove('active');
        });

        const sectionId = section + 'Section';
        document.getElementById(sectionId).classList.add('active');

        this.closeSidebar();

        if (section === 'dashboard') {
            this.renderDashboard();
        } else if (section === 'products') {
            this.renderProducts();
        } else if (section === 'orders') {
            this.renderOrders();
        } else if (section === 'reports') {
            this.renderReports();
        }
    }

    renderDashboard() {
        const stats = db.getStatistics();
        
        document.getElementById('totalProducts').textContent = stats.totalProducts;
        document.getElementById('totalOrders').textContent = stats.totalOrders;
        document.getElementById('totalSales').textContent = 'R$ ' + stats.totalSales.toFixed(2);
        document.getElementById('deliveredOrders').textContent = stats.deliveredOrders;

        this.updateCharts(stats);
    }

    setupCharts() {
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js não foi carregado');
            return;
        }

        const ctx1 = document.getElementById('salesChart');
        const ctx2 = document.getElementById('ordersChart');
        const ctx3 = document.getElementById('topProductsChart');
        const ctx4 = document.getElementById('revenueChart');

        if (ctx1) {
            this.currentChart.sales = new Chart(ctx1, {
                type: 'line',
                data: { labels: [], datasets: [{ label: 'Vendas (R$)', data: [], borderColor: '#FF6B35', backgroundColor: 'rgba(255, 107, 53, 0.1)', tension: 0.4, fill: true }] },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true, position: 'top' } }, scales: { y: { beginAtZero: true } } }
            });
        }

        if (ctx2) {
            this.currentChart.orders = new Chart(ctx2, {
                type: 'doughnut',
                data: { labels: ['Recebido', 'Preparando', 'Entrega', 'Entregue'], datasets: [{ data: [], backgroundColor: ['#004E89', '#F77F00', '#FF6B35', '#00D084'] }] },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
            });
        }

        if (ctx3) {
            this.currentChart.products = new Chart(ctx3, {
                type: 'bar',
                data: { labels: [], datasets: [{ label: 'Vendas', data: [], backgroundColor: '#FF6B35' }] },
                options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true } } }
            });
        }

        if (ctx4) {
            this.currentChart.revenue = new Chart(ctx4, {
                type: 'bar',
                data: { labels: [], datasets: [{ label: 'Faturamento (R$)', data: [], backgroundColor: '#00D084' }] },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true, position: 'top' } }, scales: { y: { beginAtZero: true } } }
            });
        }
    }

    updateCharts(stats) {
        if (this.currentChart.sales) {
            const labels = Object.keys(stats.salesByDay);
            const data = Object.values(stats.salesByDay);
            
            this.currentChart.sales.data.labels = labels;
            this.currentChart.sales.data.datasets[0].data = data;
            this.currentChart.sales.update();
        }

        if (this.currentChart.orders) {
            this.currentChart.orders.data.datasets[0].data = [
                stats.ordersByStatus.recebido,
                stats.ordersByStatus.preparando,
                stats.ordersByStatus.entrega,
                stats.ordersByStatus.entregue
            ];
            this.currentChart.orders.update();
        }

        if (this.currentChart.products) {
            const topProducts = stats.topProducts.slice(0, 5);
            this.currentChart.products.data.labels = topProducts.map(p => p.name);
            this.currentChart.products.data.datasets[0].data = topProducts.map(p => p.sales || 0);
            this.currentChart.products.update();
        }
    }

    renderProducts() {
        const products = db.getProducts();
        const tbody = document.getElementById('productsTableBody');

        tbody.innerHTML = products.map(product => `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>R$ ${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>
                    <div class="table-actions">
                        <button class="table-btn table-btn-edit" onclick="admin.editProduct(${product.id})">Editar</button>
                        <button class="table-btn table-btn-delete" onclick="admin.deleteProduct(${product.id})">Excluir</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    openProductModal(productId = null) {
        const modal = document.getElementById('productModal');
        const title = document.getElementById('productModalTitle');
        const form = document.getElementById('productForm');

        form.reset();
        this.editingProductId = null;

        if (productId) {
            const product = db.getProductById(productId);
            if (product) {
                title.textContent = 'Editar Produto';
                document.getElementById('productName').value = product.name;
                document.getElementById('productCategory').value = product.category;
                document.getElementById('productPrice').value = product.price;
                document.getElementById('productStock').value = product.stock;
                document.getElementById('productDescription').value = product.description;
                document.getElementById('productImage').value = product.image;
                this.editingProductId = productId;
            }
        } else {
            title.textContent = 'Adicionar Produto';
        }

        modal.classList.add('active');
    }

    closeProductModal() {
        document.getElementById('productModal').classList.remove('active');
    }

    handleProductSubmit(e) {
        e.preventDefault();

        const name = document.getElementById('productName').value;
        const category = document.getElementById('productCategory').value;
        const price = parseFloat(document.getElementById('productPrice').value);
        const stock = parseInt(document.getElementById('productStock').value);
        const description = document.getElementById('productDescription').value;
        const image = document.getElementById('productImage').value;

        if (this.editingProductId) {
            db.updateProduct(this.editingProductId, { name, category, price, stock, description, image });
            this.showNotification('Produto atualizado com sucesso!', 'success');
        } else {
            db.addProduct({ name, category, price, stock, description, image });
            this.showNotification('Produto adicionado com sucesso!', 'success');
        }

        this.closeProductModal();
        this.renderProducts();
    }

    editProduct(productId) {
        this.openProductModal(productId);
    }

    deleteProduct(productId) {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            db.deleteProduct(productId);
            this.showNotification('Produto excluído com sucesso!', 'success');
            this.renderProducts();
        }
    }

    renderOrders() {
        let orders = db.getOrders();
        const statusFilter = this.statusFilter.value;

        if (statusFilter) {
            orders = orders.filter(o => o.status === statusFilter);
        }

        const tbody = document.getElementById('ordersTableBody');

        if (orders.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem;">Nenhum pedido encontrado</td></tr>';
            return;
        }

        tbody.innerHTML = orders.map(order => `
            <tr>
                <td>#${order.id}</td>
                <td>${order.customerName}</td>
                <td>${new Date(order.createdAt).toLocaleDateString('pt-BR')}</td>
                <td>R$ ${order.total.toFixed(2)}</td>
                <td><span class="order-status status-${order.status}">${this.getStatusLabel(order.status)}</span></td>
                <td><div class="table-actions"><button class="table-btn table-btn-view" onclick="admin.viewOrder(${order.id})">Ver</button></div></td>
            </tr>
        `).join('');
    }

    viewOrder(orderId) {
        const order = db.getOrderById(orderId);
        if (!order) return;

        const content = document.getElementById('orderDetails');
        
        const itemsHtml = order.items.map(item => `
            <div class="order-item-row">
                <span>${item.name} x ${item.quantity}</span>
                <span>R$ ${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');

        content.innerHTML = `
            <div class="order-details-section">
                <h3>Informações do Cliente</h3>
                <div class="details-row"><span class="details-label">Nome:</span><span class="details-value">${order.customerName}</span></div>
                <div class="details-row"><span class="details-label">Telefone:</span><span class="details-value">${order.customerPhone}</span></div>
                <div class="details-row"><span class="details-label">Endereço:</span><span class="details-value">${order.customerAddress} ${order.customerComplement ? ', ' + order.customerComplement : ''}</span></div>
            </div>

            <div class="order-details-section">
                <h3>Itens do Pedido</h3>
                <div class="order-items-list">
                    ${itemsHtml}
                    <div class="order-item-row" style="border-top: 2px solid var(--border-color); margin-top: 1rem; padding-top: 1rem;">
                        <span style="font-weight: 600;">Subtotal:</span>
                        <span>R$ ${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div class="order-item-row"><span style="font-weight: 600;">Taxa de Entrega:</span><span>R$ ${order.deliveryFee.toFixed(2)}</span></div>
                    <div class="order-item-row"><span style="font-weight: 700; color: var(--primary-color); font-size: 1.1rem;">Total:</span><span style="font-weight: 700; color: var(--primary-color); font-size: 1.1rem;">R$ ${order.total.toFixed(2)}</span></div>
                </div>
            </div>

            <div class="order-details-section">
                <h3>Status do Pedido</h3>
                <div class="details-row"><span class="details-label">Status Atual:</span><span class="order-status status-${order.status}">${this.getStatusLabel(order.status)}</span></div>
                <div class="details-row"><span class="details-label">Criado em:</span><span class="details-value">${new Date(order.createdAt).toLocaleString('pt-BR')}</span></div>
            </div>

            <div class="status-update">
                <h4>Atualizar Status</h4>
                <div class="status-buttons">
                    <button class="status-btn status-btn-recebido" onclick="admin.updateOrderStatus(${order.id}, 'recebido')">Recebido</button>
                    <button class="status-btn status-btn-preparando" onclick="admin.updateOrderStatus(${order.id}, 'preparando')">Preparando</button>
                    <button class="status-btn status-btn-entrega" onclick="admin.updateOrderStatus(${order.id}, 'entrega')">Saiu para Entrega</button>
                    <button class="status-btn status-btn-entregue" onclick="admin.updateOrderStatus(${order.id}, 'entregue')">Entregue</button>
                </div>
            </div>
        `;

        document.getElementById('orderModal').classList.add('active');
    }

    updateOrderStatus(orderId, status) {
        db.updateOrderStatus(orderId, status);
        this.showNotification(`Status atualizado para: ${this.getStatusLabel(status)}`, 'success');
        this.viewOrder(orderId);
        this.renderOrders();
    }

    getStatusLabel(status) {
        const labels = {
            'recebido': 'Pedido Recebido',
            'preparando': 'Preparando',
            'entrega': 'Saiu para Entrega',
            'entregue': 'Entregue'
        };
        return labels[status] || status;
    }

    closeOrderModal() {
        document.getElementById('orderModal').classList.remove('active');
    }

    renderReports() {
        document.getElementById('generateReportBtn').addEventListener('click', () => {
            const dateFrom = document.getElementById('dateFrom').value;
            const dateTo = document.getElementById('dateTo').value;
            
            if (!dateFrom || !dateTo) {
                this.showNotification('Selecione o período', 'warning');
                return;
            }

            this.showNotification('Relatório gerado com sucesso!', 'success');
        });
    }

    toggleSidebar() {
        this.sidebar.classList.toggle('active');
    }

    closeSidebar() {
        this.sidebar.classList.remove('active');
    }

    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = 'notification show ' + type;
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('productsGrid')) {
        window.app = new App();
    }

    if (document.getElementById('ordersList')) {
        window.ordersPage = new OrdersPage();
    }

    if (document.getElementById('adminLoginOverlay')) {
        initAdminAccess();
    }
});
