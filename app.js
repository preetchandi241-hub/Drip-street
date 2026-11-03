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
      selectedCategory === "All" ||
      product.category === selectedCategory;
    const searchMatch =
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      product.color.toLowerCase().includes(search);
    return categoryMatch && searchMatch;
  });
  if (sortSelect.value === "low") {
    visibleProducts.sort((a, b) => a.price - b.price);
  } else if (sortSelect.value === "high") {
    visibleProducts.sort((a, b) => b.price - a.price);
  } else if (sortSelect.value === "name") {
    visibleProducts.sort((a, b) => a.name.localeCompare(b.name));
  }
  productGrid.innerHTML = visibleProducts.map(product => `
    <article class="product-card">
      <div class="product-image-wrap" data-open="${product.id}">
        <img class="product-image"
             src="${product.image}"
             alt="${product.name}"
             loading="lazy"
             onerror="this.style.opacity='0.2'">
        ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ""}
        <button class="quick-add" data-add="${product.id}">
          QUICK ADD +
        </button>
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
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  $("#cartCount").textContent = count;
  $("#cartItems").innerHTML = cart.length
    ? cart.map(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return "";
        return `
          <div class="cart-row">
            <img src="${product.image}" alt="${product.name}">
            <div>
              <h4>${product.name}</h4>
              <p>Size: ${item.size} · Qty: ${item.quantity}</p>
              <strong>${money(product.price * item.quantity)}</strong><br>
              <button class="remove-item"
                data-remove="${item.id}"
                data-size="${item.size}">Remove</button>
            </div>
          </div>
        `;
      }).join("")
    : '<p>Your bag is empty.</p>';
  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  $("#cartSubtotal").textContent = money(total);
}
function addToCart(id, size = "M") {
  const existing = cart.find(item =>
    item.id === id && item.size === size
  );
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id, size, quantity: 1 });
  }
  saveCart();
  openCart();
}
function removeFromCart(id, size) {
  cart = cart.filter(item =>
    !(item.id === id && item.size === size)
  );
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
function openProduct(id) {
  const product = products.find(p => p.id === id);
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
        <button class="primary-button" id="addProductButton">
          ADD TO BAG +
        </button>
      </div>
    </div>
  `;
  productModal.classList.add("open");
  overlay.classList.add("show");
  $("#addProductButton").addEventListener("click", () => {
    const size = $("#productSize").value;
    closePanels();
    addToCart(id, size);
  });
}
function openCheckout() {
  if (!cart.length) {
    alert("Your bag is empty!");
    return;
  }
  cartDrawer.classList.remove("open");
  checkoutModal.classList.add("open");
  overlay.classList.add("show");
}
function placeDemoOrder() {
  const name = $("#customerName").value.trim();
  if (!name) {
    alert("Please enter your name.");
    return;
  }
  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  const order = {
    id: "DS-" + Date.now(),
    customer: name,
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
  alert("Thank you, " + name + "! Demo order saved.");
}
// CATEGORY FILTER
$("#categories").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  selectedCategory = button.dataset.category;
  document.querySelectorAll(".category").forEach(category => {
    category.classList.toggle("active", category === button);
  });
  renderProducts();
});
// PRODUCT CLICK
productGrid.addEventListener("click", event => {
  const addButton = event.target.closest("[data-add]");

  if (addButton) {
    event.stopPropagation();
    addToCart(Number(addButton.dataset.add), "M");
    return;
  }
  const target = event.target.closest("[data-open]");
  if (target) openProduct(Number(target.dataset.open));
});
// REMOVE FROM CART
$("#cartItems").addEventListener("click", event => {
  const button = event.target.closest("[data-remove]");
  if (!button) return;
  removeFromCart(
    Number(button.dataset.remove),
    button.dataset.size
  );
});
// SEARCH AND SORT
searchInput.addEventListener("input", renderProducts);
sortSelect.addEventListener("change", renderProducts);
// BUTTONS
$("#cartToggle").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closePanels);
$("#closeProduct").addEventListener("click", closePanels);
$("#closeCheckout").addEventListener("click", closePanels);
$("#checkoutButton").addEventListener("click", openCheckout);
$("#placeOrder").addEventListener("click", placeDemoOrder);
overlay.addEventListener("click", closePanels);
$("#searchToggle").addEventListener("click", () => {
  $("#shop").scrollIntoView({ behavior: "smooth" });
  searchInput.focus();
});
$("#menuToggle").addEventListener("click", () => {
  $("#mainNav").classList.toggle("open");
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    $("#mainNav").classList.remove("open");
  });
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closePanels();
});
$("#year").textContent = new Date().getFullYear();
// START STORE
renderProducts();
updateCart();
