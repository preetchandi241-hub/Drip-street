 const products = [
  {
    id: 1, name: "Essential Oversized Tee", category: "T-Shirts",
    price: 24.99, tag: "BESTSELLER", color: "Black",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85",
    description: "A relaxed oversized T-shirt made for everyday streetwear."
  },
  {
    id: 2, name: "Classic Street Hoodie", category: "Hoodies",
    price: 49.99, tag: "POPULAR", color: "Black",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=85",
    description: "A comfortable hoodie with a clean, timeless streetwear look."
  },
  {
    id: 3, name: "Urban Graphic Tee", category: "T-Shirts",
    price: 27.99, tag: "NEW", color: "White",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=85",
    description: "A statement graphic tee for a confident everyday outfit."
  },
  {
    id: 4, name: "Relaxed Cargo Pants", category: "Pants",
    price: 44.99, tag: "TRENDING", color: "Khaki",
    image: "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=800&q=85",
    description: "Relaxed-fit cargo pants with a versatile streetwear silhouette."
  },
  {
    id: 5, name: "Minimal Zip Hoodie", category: "Hoodies",
    price: 54.99, tag: "NEW", color: "Grey",
    image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=800&q=85",
    description: "A simple zip hoodie that works with almost any outfit."
  },
  {
    id: 6, name: "Everyday White Tee", category: "T-Shirts",
    price: 19.99, tag: "", color: "White",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=85",
    description: "A clean everyday essential with an easy, relaxed fit."
  },
  {
    id: 7, name: "Streetwear Sweatpants", category: "Pants",
    price: 39.99, tag: "POPULAR", color: "Grey",
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=85",
    description: "Comfortable sweatpants designed for relaxed everyday style."
  },
  {
    id: 8, name: "Premium Black Hoodie", category: "Hoodies",
    price: 59.99, tag: "PREMIUM", color: "Black",
    image: "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?auto=format&fit=crop&w=800&q=85",
    description: "A premium-looking hoodie with a clean and versatile design."
  },
  {
    id: 9, name: "Urban Cap", category: "Accessories",
    price: 19.99, tag: "", color: "Black",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=85",
    description: "A classic cap to finish off your everyday streetwear fit."
  },
  {
    id: 10, name: "Relaxed Denim Jeans", category: "Pants",
    price: 49.99, tag: "NEW", color: "Blue",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=85",
    description: "Relaxed denim with an easy-to-style everyday shape."
  },
  {
    id: 11, name: "Street Crossbody Bag", category: "Accessories",
    price: 29.99, tag: "", color: "Black",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=85",
    description: "A practical crossbody bag for your everyday essentials."
  },
  {
    id: 12, name: "Heavy Fleece Hoodie", category: "Hoodies",
    price: 64.99, tag: "PREMIUM", color: "Cream",
    image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=800&q=85",
    description: "A relaxed fleece hoodie for a comfortable layered look."
  }
];

const $ = (selector) => document.querySelector(selector);
const productGrid = $("#productGrid");
const emptyMessage = $("#emptyMessage");
const searchInput = $("#searchInput");
const sortSelect = $("#sortSelect");
const cartDrawer = $("#cartDrawer");
const overlay = $("#overlay");
const productModal = $("#productModal");
const checkoutModal = $("#checkoutModal");

let selectedCategory = "All";
let cart = JSON.parse(localStorage.getItem("dripCart") || "[]");

function money(amount) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR"
  }).format(amount);
}

function saveCart() {
  localStorage.setItem("dripCart", JSON.stringify(cart));
  updateCart();
}

function renderProducts() {
  const search = searchInput.value.trim().toLowerCase();
  let visibleProducts = products.filter(product => {
    const categoryMatch =
      selectedCategory === "All" || product.category === selectedCategory;

    const searchMatch =
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      product.color.toLowerCase().includes(search);

    return categoryMatch && searchMatch;
  });

  switch (sortSelect.value) {
    case "low":
      visibleProducts.sort((a, b) => a.price - b.price);
      break;
    case "high":
      visibleProducts.sort((a, b) => b.price - a.price);
      break;
    case "name":
      visibleProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }
  productGrid.innerHTML = visibleProducts.map(product => `
    <article class="product-card" data-id="${product.id}">
      <div class="product-image-wrap" data-open="${product.id}">
        <img
          class="product-image"
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >
        ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ""}
        <button class="quick-add" data-add="${product.id}">QUICK ADD +</button>
      </div>
      <div class="product-info" data-open="${product.id}">
        <div>
          <h3>${product.name}</h3>
          <p>${product.category} · ${product.color}</p>
        </div>
        <span class="product-price">${money(product.price)}</span>
      </div>
    </article>
  `).join("");
  emptyMessage.hidden = visibleProducts.length > 0;
}
function updateCart() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  $("#cartCount").textContent = totalItems;

  if (cart.length === 0) {
    $("#cartItems").innerHTML =
      '<p style="color:#888;text-align:center;padding:35px 0">Your bag is empty.</p>';
  } else {
    $("#cartItems").innerHTML = cart.map(item => {
      const product = products.find(p => p.id === item.id);
      if (!product) return "";
      return `
        <div class="cart-row">
          <img src="${product.image}" alt="${product.name}">
          <div>
            <h4>${product.name}</h4>
            <p>Size: ${item.size} · Qty: ${item.quantity}</p>
            <strong>${money(product.price * item.quantity)}</strong>
            <br>
            <button class="remove-item" data-remove="${item.id}" data-size="${item.size}">
              Remove
            </button>
          </div>
        </div>
      `;
    }).join("");
  }
  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  $("#cartSubtotal").textContent = money(total);
}
function addToCart(productId, size = "M") {
  const existing = cart.find(item => item.id === productId && item.size === size);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: productId, size, quantity: 1 });
  }
  saveCart();
  openCart();
}
function removeFromCart(productId, size) {
  cart = cart.filter(item => !(item.id === productId && item.size === size));
  saveCart();
}
function openCart() {
  cartDrawer.classList.add("open");
  overlay.classList.add("show");
}
function closePanels() {
  cartDrawer.classList.remove("open");
  productModal.classList.remove("open");
  checkoutModal.classList.remove("open");
  overlay.classList.remove("show");
}
function openProduct(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  $("#productDetails").innerHTML = `
    <div class="product-detail-layout">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-detail-info">
        <p class="eyebrow">${product.category.toUpperCase()}</p>
        <h2>${product.name}</h2>
        <div class="detail-price">${money(product.price)}</div>
        <p>${product.description}</p>
        <p>Color: ${product.color}</p>
        <label for="productSize">Select size</label>
        <select id="productSize">
          <option value="S">Small (S)</option>
          <option value="M" selected>Medium (M)</option>
          <option value="L">Large (L)</option>
          <option value="XL">Extra Large (XL)</option>
        </select>
        <button class="primary-button" id="addProductButton">ADD TO BAG +</button>
      </div>
    </div>
  `;
  productModal.classList.add("open");
  overlay.classList.add("show");
  $("#addProductButton").addEventListener("click", () => {
    const size = $("#productSize").value;
    closePanels();
    addToCart(productId, size);
  });
}
function openCheckout() {
  if (cart.length === 0) {
    alert("Your bag is empty. Add a product first.");
    return;
  }
  cartDrawer.classList.remove("open");
  checkoutModal.classList.add("open");
  overlay.classList.add("show");
}
function placeDemoOrder() {
  const customerName = $("#customerName").value.trim();
  if (!customerName) {
    alert("Please enter your name.");
    $("#customerName").focus();
    return;
  }
  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  const order = {
    id: "DS-" + Date.now(),
    customer: customerName,
    payment: $("#paymentMethod").value,
    items: cart,
    total,
    date: new Date().toISOString(),
    status: "Demo order"
  };
  const orders = JSON.parse(localStorage.getItem("dripOrders") || "[]");
  orders.push(order);
  localStorage.setItem("dripOrders", JSON.stringify(orders));
  cart = [];
  saveCart();
  $("#customerName").value = "";
  closePanels();
  alert("Thank you, " + customerName + "! Your demo order has been saved.");
}
$("#categories").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  selectedCategory = button.dataset.category;
  document.querySelectorAll(".category").forEach(category => {
    category.classList.toggle("active", category === button);
  });
  renderProducts();
});
productGrid.addEventListener("click", event => {
  const addButton = event.target.closest("[data-add]");
  if (addButton) {
    event.stopPropagation();
    addToCart(Number(addButton.dataset.add), "M");
    return;
  }
  const productTarget = event.target.closest("[data-open]");
  if (productTarget) openProduct(Number(productTarget.dataset.open));
});
$("#cartItems").addEventListener("click", event => {
  const removeButton = event.target.closest("[data-remove]");
  if (!removeButton) return;
  removeFromCart(
    Number(removeButton.dataset.remove),
    removeButton.dataset.size
  );
});
searchInput.addEventListener("input", renderProducts);
sortSelect.addEventListener("change", renderProducts);
$("#cartToggle").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closePanels);
$("#closeProduct").addEventListener("click", closePanels);
$("#closeCheckout").addEventListener("click", closePanels);
$("#checkoutButton").addEventListener("click", openCheckout);
$("#placeOrder").addEventListener("click", placeDemoOrder);
overlay.addEventListener("click", closePanels);
$("#searchToggle").addEventListener("click", () => {
  searchInput.focus();
  $("#shop").scrollIntoView({ behavior: "smooth" });
});
$("#menuToggle").addEventListener("click", () => {
  $("#mainNav").classList.toggle("open");
});
document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => $("#mainNav").classList.remove("open"));
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closePanels();
});
$("#year").textContent = new Date().getFullYear();
renderProducts();
updateCart();
