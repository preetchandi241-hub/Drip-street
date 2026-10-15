 const imageUrls = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=700&q=85"
];

const products = [
  ["Oversized Graphic Tee","T-Shirts",29.99],
  ["Minimal Logo Tee","T-Shirts",24.99],
  ["Washed Black Tee","T-Shirts",27.99],
  ["Heavyweight Box Tee","T-Shirts",32.99],
  ["Back Print Tee","T-Shirts",29.99],
  ["Long Sleeve Logo Tee","T-Shirts",34.99],
  ["Essential Hoodie","Hoodies",49.99],
  ["Star Print Hoodie","Hoodies",54.99],
  ["Crewneck Sweatshirt","Hoodies",44.99],
  ["Zip-Up Hoodie","Hoodies",59.99],
  ["Vintage Wash Hoodie","Hoodies",64.99],
  ["Classic Pullover Hoodie","Hoodies",49.99],
  ["Cargo Jeans","Jeans & Trousers",59.99],
  ["Baggy Jeans","Jeans & Trousers",54.99],
  ["Olive Cargo Pants","Jeans & Trousers",49.99],
  ["Relaxed Sweatpants","Jeans & Trousers",39.99],
  ["Wide-Leg Denim","Jeans & Trousers",62.99],
  ["Black Utility Trousers","Jeans & Trousers",57.99],
  ["Street Sneakers","Shoes",79.99],
  ["Retro Court Sneakers","Shoes",74.99],
  ["High-Top Street Shoes","Shoes",89.99],
  ["Classic Cap","Accessories",19.99],
  ["Crossbody Bag","Accessories",34.99],
  ["Logo Beanie","Accessories",14.99]
].map((p, i) => ({
  id: i + 1,
  name: p[0],
  category: p[1],
  price: p[2],
  image: imageUrls[i],
  description: "Discover the " + p[0] +
    " from DRIP STREET. A stylish addition to your streetwear collection."
}));

const $ = id => document.getElementById(id);
const euro = n => "€" + n.toFixed(2);

let category = "All";
let selectedProduct = null;
let cart = JSON.parse(localStorage.getItem("dripCart") || "[]");

function saveCart() {
  localStorage.setItem("dripCart", JSON.stringify(cart));
}

function renderProducts() {
  const searchText = $("search").value.toLowerCase();

  let list = products.filter(p =>
    (category === "All" || p.category === category) &&
    p.name.toLowerCase().includes(searchText)
  );

  if ($("sort").value === "low") {
    list.sort((a, b) => a.price - b.price);
  }
  if ($("sort").value === "high") {
    list.sort((a, b) => b.price - a.price);
  }
  if ($("sort").value === "name") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  $("product-count").textContent = `(${list.length})`;
  $("empty-state").hidden = list.length > 0;

  $("products").innerHTML = list.map(p => `
    <article class="product-card" data-product="${p.id}" tabindex="0">
      <div class="product-art">
        <img src="${p.image}" alt="${p.name}" loading="lazy"
          onerror="this.alt='Product image unavailable'">
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="product-category">${p.category}</p>
        <div class="product-bottom">
          <span class="price">${euro(p.price)}</span>
          <span class="rating">★ 4.8</span>
        </div>
        <button class="add-button" data-add="${p.id}" type="button">
          ADD TO CART +
        </button>
      </div>
    </article>
  `).join("");
}

function openProduct(id) {
  selectedProduct = products.find(p => p.id === id);
  if (!selectedProduct) return;

  $("detail-image").src = selectedProduct.image;
  $("detail-image").alt = selectedProduct.name;
  $("detail-category").textContent = selectedProduct.category;
  $("detail-name").textContent = selectedProduct.name;
  $("detail-price").textContent = euro(selectedProduct.price);
  $("detail-description").textContent = selectedProduct.description;
  $("detail-size").value = "M";
  $("product-modal").classList.remove("hidden");
}

$("products").addEventListener("click", event => {
  const addButton = event.target.closest("[data-add]");

  if (addButton) {
    event.stopPropagation();
    addToCart(Number(addButton.dataset.add));
    return;
  }

  const card = event.target.closest("[data-product]");
  if (card) openProduct(Number(card.dataset.product));
});

$("products").addEventListener("keydown", event => {
  if (event.key !== "Enter" && event.key !== " ") return;
  if (event.target.closest("button")) return;

  const card = event.target.closest("[data-product]");
  if (card) {
    event.preventDefault();
    openProduct(Number(card.dataset.product));
  }
});

$("product-modal-close").onclick = () => {
  $("product-modal").classList.add("hidden");
};

$("product-modal").addEventListener("click", event => {
  if (event.target.id === "product-modal") {
    $("product-modal").classList.add("hidden");
  }
});

$("detail-add").onclick = () => {
  if (!selectedProduct) return;

  const size = $("detail-size").value;
  addToCart(selectedProduct.id, size);
  $("product-modal").classList.add("hidden");
};

function addToCart(id, size = "M") {
  const item = cart.find(x => x.id === id && x.size === size);

  if (item) {
    item.qty++;
  } else {
    cart.push({ id, qty: 1, size });
  }

  saveCart();
  renderCart();
}

function renderCart() {
  $("cart-count").textContent =
    cart.reduce((n, x) => n + x.qty, 0);

  $("cart-items").innerHTML = cart.map(item => {
    const p = products.find(x => x.id === item.id);
    if (!p) return "";

    return `
      <div class="cart-line">
        <strong>${p.name}</strong>
        <p>Size: ${item.size || "M"}</p>
        <p>${euro(p.price)} each</p>
        <button data-minus="${p.id}" data-size="${item.size || "M"}">−</button>
        ${item.qty}
        <button data-plus="${p.id}" data-size="${item.size || "M"}">+</button>
        <button data-remove="${p.id}" data-size="${item.size || "M"}">Remove</button>
      </div>
    `;
  }).join("") || "<p>Your cart is empty.</p>";

  const total = cart.reduce((sum, item) => {
    const p = products.find(x => x.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);

  $("cart-total").textContent = euro(total);
  $("checkout-total").textContent = euro(total);

  document.querySelectorAll("[data-minus]").forEach(button => {
    button.onclick = () =>
      changeQty(Number(button.dataset.minus), button.dataset.size, -1);
  });

  document.querySelectorAll("[data-plus]").forEach(button => {
    button.onclick = () =>
      changeQty(Number(button.dataset.plus), button.dataset.size, 1);
  });

  document.querySelectorAll("[data-remove]").forEach(button => {
    button.onclick = () => {
      const id = Number(button.dataset.remove);
      const size = button.dataset.size;
      cart = cart.filter(x => !(x.id === id && (x.size || "M") === size));
      saveCart();
      renderCart();
    };
  });
}

function changeQty(id, size, change) {
  const item = cart.find(x => x.id === id && (x.size || "M") === size);
  if (!item) return;

  item.qty += change;

  if (item.qty <= 0) {
    cart = cart.filter(x => x !== item);
  }

  saveCart();
  renderCart();
}

function openCart() {
  $("cart-drawer").classList.add("open");
  $("backdrop").classList.remove("hidden");
}

function closeCart() {
  $("cart-drawer").classList.remove("open");
  $("backdrop").classList.add("hidden");
}

document.querySelectorAll("[data-category]").forEach(button => {
  button.onclick = () => {
    category = button.dataset.category;

    document.querySelectorAll("[data-category]").forEach(b =>
      b.classList.toggle("active", b === button)
    );

    renderProducts();
  };
});

$("search").addEventListener("input", renderProducts);
$("sort").addEventListener("change", renderProducts);
$("cart-open").onclick = openCart;
$("cart-close").onclick = closeCart;
$("backdrop").onclick = closeCart;

$("checkout-open").onclick = () => {
  if (!cart.length) {
    alert("Your cart is empty!");
    return;
  }

  closeCart();
  $("checkout-modal").classList.remove("hidden");
};

$("checkout-close").onclick = () => {
  $("checkout-modal").classList.add("hidden");
};

$("checkout-form").addEventListener("submit", event => {
  event.preventDefault();

  const form = new FormData(event.target);

  const total = cart.reduce((sum, item) => {
    const p = products.find(x => x.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);

  const order = {
    id: "DS-" + Date.now().toString().slice(-8),
    date: new Date().toLocaleString(),
    customer: form.get("name"),
    email: form.get("email"),
    address: form.get("address"),
    payment: form.get("payment"),
    paymentStatus: "TEST — NOT PAID",
    total,
    items: cart.map(item => {
      const p = products.find(x => x.id === item.id);
      return {
        name: p.name,
        qty: item.qty,
        size: item.size || "M",
        price: p.price
      };
    })
  };

  const orders = JSON.parse(localStorage.getItem("dripOrders") || "[]");
  orders.unshift(order);
  localStorage.setItem("dripOrders", JSON.stringify(orders));

  cart = [];
  saveCart();
  renderCart();
  event.target.reset();
  $("checkout-modal").classList.add("hidden");

  alert("Demo order saved. No payment was made.");
});

renderProducts();
renderCart();
