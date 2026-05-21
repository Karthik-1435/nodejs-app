const http = require('http');
const url = require('url');

// Product database with REAL images
const products = [
  {
    id: 1,
    name: "Ducati Panigale V4",
    price: 24999,
    category: "Superbike",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=500",
    description: "V4 engine, 214 HP, aerodynamics package",
    topSpeed: "299 km/h",
    weight: "198 kg"
  },
  {
    id: 2,
    name: "Yamaha R1",
    price: 17999,
    category: "Sport",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500",
    description: "Crossplane crankshaft, 200 HP",
    topSpeed: "186 mph",
    weight: "202 kg"
  },
  {
    id: 3,
    name: "Kawasaki Ninja H2",
    price: 32999,
    category: "Hyperbike",
    image: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=500",
    description: "Supercharged, 310 HP, track-ready",
    topSpeed: "249 mph",
    weight: "238 kg"
  },
  {
    id: 4,
    name: "BMW S1000RR",
    price: 18999,
    category: "Superbike",
    image: "https://images.unsplash.com/photo-1599819811279-d5ad9ccf8387?w=500",
    description: "ShiftCam engine, 205 HP, dynamic damping",
    topSpeed: "188 mph",
    weight: "197 kg"
  },
  {
    id: 5,
    name: "Suzuki Hayabusa",
    price: 15999,
    category: "Hyperbike",
    image: "https://images.unsplash.com/photo-1624281678097-8e2f4f482c8c?w=500",
    description: "1340cc, legendary top speed",
    topSpeed: "186 mph",
    weight: "264 kg"
  },
  {
    id: 6,
    name: "Aprilia RSV4",
    price: 20999,
    category: "Superbike",
    image: "https://images.unsplash.com/photo-1624281680719-9fe9684e5b07?w=500",
    description: "V4 engine, 217 HP, MotoGP derived",
    topSpeed: "190 mph",
    weight: "202 kg"
  },
  {
    id: 7,
    name: "Honda CBR1000RR-R",
    price: 23999,
    category: "Superbike",
    image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=500",
    description: "Fireblade SP, 215 HP, aerodynamics",
    topSpeed: "186 mph",
    weight: "201 kg"
  },
  {
    id: 8,
    name: "Triumph Speed Triple",
    price: 13999,
    category: "Naked",
    image: "https://images.unsplash.com/photo-1582834206864-2d9d6556f58b?w=500",
    description: "1160cc triple engine, 180 HP",
    topSpeed: "165 mph",
    weight: "198 kg"
  }
];

// Cart storage (in-memory)
let cart = [];

// Generate unique HTML/CSS/JS with REAL images
function getHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🏍️ Elite Racing Bikes | Premium Motorcycles</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #0a0a0a;
            color: #fff;
        }

        /* Header */
        .header {
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(10px);
            position: sticky;
            top: 0;
            z-index: 1000;
            border-bottom: 2px solid #e63946;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 30px;
        }

        .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
        }

        .logo {
            font-size: 1.8rem;
            font-weight: 800;
            background: linear-gradient(135deg, #e63946, #ff6b6b);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            letter-spacing: -1px;
        }

        .logo span {
            font-size: 2rem;
        }

        .cart-icon {
            position: relative;
            cursor: pointer;
            font-size: 1.8rem;
            background: rgba(230, 57, 70, 0.2);
            padding: 10px 20px;
            border-radius: 50px;
            transition: all 0.3s;
            border: 1px solid rgba(230, 57, 70, 0.3);
        }

        .cart-icon:hover {
            background: rgba(230, 57, 70, 0.4);
            transform: scale(1.05);
            border-color: #e63946;
        }

        .cart-count {
            position: absolute;
            top: -8px;
            right: -8px;
            background: #e63946;
            color: white;
            border-radius: 50%;
            width: 26px;
            height: 26px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
            animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }

        /* Hero Section */
        .hero {
            background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
            padding: 80px 0;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: -50%;
            width: 200%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(230,57,70,0.1), transparent);
            animation: shine 3s infinite;
        }

        @keyframes shine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }

        .hero h1 {
            font-size: 4rem;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #e63946, #ff6b6b, #ffb6b6);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            font-weight: 800;
        }

        .hero p {
            font-size: 1.2rem;
            color: #ccc;
        }

        /* Filter Bar */
        .filter-bar {
            padding: 30px 0;
            text-align: center;
        }

        .filter-btn {
            background: #1a1a1a;
            border: 1px solid #333;
            padding: 10px 25px;
            margin: 0 8px;
            color: #fff;
            cursor: pointer;
            border-radius: 50px;
            transition: all 0.3s;
            font-weight: 500;
        }

        .filter-btn:hover, .filter-btn.active {
            background: #e63946;
            border-color: #e63946;
            transform: translateY(-2px);
        }

        /* Products Grid */
        .products-section {
            padding: 40px 0 80px;
        }

        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 30px;
        }

        .product-card {
            background: #141414;
            border-radius: 20px;
            overflow: hidden;
            transition: all 0.4s;
            cursor: pointer;
            border: 1px solid #222;
        }

        .product-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(230, 57, 70, 0.3);
            border-color: #e63946;
        }

        .product-image {
            width: 100%;
            height: 250px;
            object-fit: cover;
            transition: transform 0.4s;
        }

        .product-card:hover .product-image {
            transform: scale(1.05);
        }

        .product-info {
            padding: 20px;
        }

        .product-name {
            font-size: 1.4rem;
            font-weight: bold;
            margin-bottom: 8px;
            color: #fff;
        }

        .product-category {
            color: #e63946;
            font-size: 0.85rem;
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }

        .product-desc {
            color: #999;
            font-size: 0.9rem;
            margin: 10px 0;
            line-height: 1.4;
        }

        .product-specs {
            display: flex;
            justify-content: space-between;
            margin: 15px 0;
            padding: 10px 0;
            border-top: 1px solid #222;
            border-bottom: 1px solid #222;
            font-size: 0.85rem;
            color: #bbb;
        }

        .product-specs span {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .product-price {
            font-size: 1.8rem;
            font-weight: bold;
            color: #e63946;
            margin: 15px 0;
        }

        .product-price small {
            font-size: 0.9rem;
            color: #666;
        }

        .add-to-cart {
            width: 100%;
            padding: 14px;
            background: linear-gradient(135deg, #e63946, #c1121f);
            border: none;
            color: white;
            font-weight: bold;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 1rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .add-to-cart:hover {
            transform: scale(1.02);
            box-shadow: 0 5px 20px rgba(230, 57, 70, 0.5);
        }

        /* Modal */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 2000;
            justify-content: center;
            align-items: center;
        }

        .modal-content {
            background: #141414;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            padding: 30px;
            border: 2px solid #e63946;
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #333;
        }

        .modal-header h2 {
            color: #e63946;
        }

        .close-modal {
            font-size: 2rem;
            cursor: pointer;
            color: #e63946;
            transition: transform 0.2s;
        }

        .close-modal:hover {
            transform: rotate(90deg);
        }

        .cart-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px solid #222;
        }

        .cart-item-info h4 {
            margin-bottom: 5px;
        }

        .cart-item-info p {
            color: #e63946;
            font-size: 0.9rem;
        }

        .cart-item-actions {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .cart-item-actions button {
            background: #333;
            border: none;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .cart-item-actions button:hover {
            background: #e63946;
        }

        .cart-total {
            margin-top: 20px;
            padding-top: 20px;
            font-size: 1.5rem;
            font-weight: bold;
            text-align: right;
            border-top: 2px solid #e63946;
        }

        .checkout-btn {
            width: 100%;
            padding: 15px;
            background: #2ecc71;
            border: none;
            color: white;
            font-weight: bold;
            border-radius: 10px;
            margin-top: 20px;
            cursor: pointer;
            font-size: 1.1rem;
            transition: all 0.3s;
        }

        .checkout-btn:hover {
            background: #27ae60;
            transform: scale(1.02);
        }

        .empty-cart {
            text-align: center;
            color: #999;
            padding: 40px;
        }

        /* Toast */
        .toast {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #2ecc71;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 3000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            font-weight: bold;
        }

        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        @media (max-width: 768px) {
            .hero h1 { font-size: 2rem; }
            .products-grid { grid-template-columns: 1fr; }
            .filter-btn { margin: 5px; padding: 8px 15px; font-size: 12px; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="container">
            <div class="nav">
                <div class="logo">
                    <span>🏍️</span> ELITE RACING
                </div>
                <div class="cart-icon" onclick="openCart()">
                    🛒 <span class="cart-count" id="cartCount">0</span>
                </div>
            </div>
        </div>
    </div>

    <div class="hero">
        <div class="container">
            <h1>Unleash The Beast Within</h1>
            <p>Experience the pinnacle of engineering | World's fastest racing machines</p>
        </div>
    </div>

    <div class="container">
        <div class="filter-bar">
            <button class="filter-btn active" onclick="filterProducts('all')">All Bikes</button>
            <button class="filter-btn" onclick="filterProducts('Superbike')">Superbikes</button>
            <button class="filter-btn" onclick="filterProducts('Hyperbike')">Hyperbikes</button>
            <button class="filter-btn" onclick="filterProducts('Sport')">Sport</button>
            <button class="filter-btn" onclick="filterProducts('Naked')">Naked</button>
        </div>
    </div>

    <div class="products-section">
        <div class="container">
            <div class="products-grid" id="productsGrid"></div>
        </div>
    </div>

    <div id="cartModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>🛒 Your Garage</h2>
                <span class="close-modal" onclick="closeCart()">&times;</span>
            </div>
            <div id="cartItems"></div>
        </div>
    </div>

    <script>
        let products = ${JSON.stringify(products)};
        let cart = [];
        let currentFilter = 'all';

        function renderProducts() {
            const grid = document.getElementById('productsGrid');
            let filteredProducts = currentFilter === 'all' 
                ? products 
                : products.filter(p => p.category === currentFilter);
            
            grid.innerHTML = filteredProducts.map(p => \`
                <div class="product-card">
                    <img src="\${p.image}" alt="\${p.name}" class="product-image" loading="lazy">
                    <div class="product-info">
                        <div class="product-name">\${p.name}</div>
                        <div class="product-category">\${p.category}</div>
                        <div class="product-desc">\${p.description}</div>
                        <div class="product-specs">
                            <span>🏁 \${p.topSpeed}</span>
                            <span>⚡ \${p.weight}</span>
                        </div>
                        <div class="product-price">$\${p.price.toLocaleString()} <small>USD</small></div>
                        <button class="add-to-cart" onclick="addToCart(\${p.id})">Add to Cart</button>
                    </div>
                </div>
            \`).join('');
        }

        function filterProducts(category) {
            currentFilter = category;
            renderProducts();
            
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.textContent.includes(category === 'all' ? 'All' : category)) {
                    btn.classList.add('active');
                }
            });
        }

        function updateCartUI() {
            const count = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.getElementById('cartCount').innerText = count;
        }

        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existing = cart.find(item => item.id === productId);
            
            if (existing) {
                existing.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            
            updateCartUI();
            showToast(\`✓ \${product.name} added to garage!\`);
            saveCart();
        }

        function openCart() {
            const modal = document.getElementById('cartModal');
            const cartItemsDiv = document.getElementById('cartItems');
            
            if (cart.length === 0) {
                cartItemsDiv.innerHTML = '<div class="empty-cart">🏍️ Your garage is empty<br>Add some racing beasts!</div>';
            } else {
                cartItemsDiv.innerHTML = cart.map(item => \`
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <h4>\${item.name}</h4>
                            <p>$\${item.price.toLocaleString()} x \${item.quantity}</p>
                        </div>
                        <div class="cart-item-actions">
                            <strong>$\${(item.price * item.quantity).toLocaleString()}</strong>
                            <button onclick="updateQuantity(\${item.id}, \${item.quantity - 1})">-</button>
                            <span>\${item.quantity}</span>
                            <button onclick="updateQuantity(\${item.id}, \${item.quantity + 1})">+</button>
                            <button onclick="removeFromCart(\${item.id})" style="background:#e63946;">🗑️</button>
                        </div>
                    </div>
                \`).join('');
                
                const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                cartItemsDiv.innerHTML += \`
                    <div class="cart-total">Total: $\${total.toLocaleString()} USD</div>
                    <button class="checkout-btn" onclick="checkout()">🏁 Checkout Now</button>
                \`;
            }
            
            modal.style.display = 'flex';
        }

        function updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                removeFromCart(productId);
            } else {
                const item = cart.find(i => i.id === productId);
                if (item) {
                    item.quantity = newQuantity;
                    updateCartUI();
                    saveCart();
                    openCart();
                }
            }
        }

        function closeCart() {
            document.getElementById('cartModal').style.display = 'none';
        }

        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartUI();
            saveCart();
            openCart();
            showToast('Item removed from garage');
        }

        function checkout() {
            if (cart.length === 0) {
                showToast('Your garage is empty!');
                return;
            }
            alert('🏆 Order Confirmed! 🏆\\n\\nThank you for choosing Elite Racing Bikes.\\nOur team will contact you within 24 hours.');
            cart = [];
            updateCartUI();
            saveCart();
            closeCart();
            showToast('🎉 Order placed successfully!');
        }

        function saveCart() {
            localStorage.setItem('racingBikeCart', JSON.stringify(cart));
        }

        function loadCart() {
            const saved = localStorage.getItem('racingBikeCart');
            if (saved) {
                cart = JSON.parse(saved);
                updateCartUI();
            }
        }

        function showToast(message) {
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.innerHTML = message;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2500);
        }

        // Close modal on outside click
        window.onclick = function(event) {
            const modal = document.getElementById('cartModal');
            if (event.target === modal) closeCart();
        }

        renderProducts();
        loadCart();
    </script>
</body>
</html>`;
}

// Create HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Handle API endpoints
  if (pathname === '/api/products') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
    return;
  }
  
  if (pathname === '/api/cart' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(cart));
    return;
  }

  if (pathname === '/api/cart' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { productId, action } = JSON.parse(body);
        const product = products.find(p => p.id === productId);
        if (product) {
          const existing = cart.find(item => item.id === productId);
          if (action === 'add') {
            if (existing) existing.quantity++;
            else cart.push({ ...product, quantity: 1 });
          } else if (action === 'remove') {
            const index = cart.findIndex(item => item.id === productId);
            if (index !== -1) cart.splice(index, 1);
          }
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, cart }));
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid request' }));
      }
    });
    return;
  }

  // Serve HTML page for all other routes
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(getHTML());
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🏍️ Elite Racing Bikes Store running on http://localhost:${PORT}`);
  console.log(`🔥 Ready for production with REAL bike images!`);
});
