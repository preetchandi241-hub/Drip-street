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
  ["Oversized Graphic Tee","T-Shirts",29.99,"DRIP"],
  ["Minimal Logo Tee","T-Shirts",24.99,"DS"],
  ["Washed Black Tee","T-Shirts",27.99,"WASH"],
  ["Heavyweight Box Tee","T-Shirts",32.99,"BOX"],
  ["Back Print Tee","T-Shirts",29.99,"BACK"],
  ["Long Sleeve Logo Tee","T-Shirts",34.99,"LONG"],
  ["Essential Hoodie","Hoodies",49.99,"HOOD"],
  ["Star Print Hoodie","Hoodies",54.99,"STAR"],
  ["Crewneck Sweatshirt","Hoodies",44.99,"CREW"],
  ["Zip-Up Hoodie","Hoodies",59.99,"ZIP"],
  ["Vintage Wash Hoodie","Hoodies",64.99,"VINTAGE"],
  ["Classic Pullover Hoodie","Hoodies",49.99,"CLASSIC"],
  ["Cargo Jeans","Jeans & Trousers",59.99,"CARGO"],
  ["Baggy Jeans","Jeans & Trousers",54.99,"BAGGY"],
  ["Olive Cargo Pants","Jeans & Trousers",49.99,"OLIVE"],
  ["Relaxed Sweatpants","Jeans & Trousers",39.99,"RELAX"],
  ["Wide-Leg Denim","Jeans & Trousers",62.99,"WIDE"],
  ["Black Utility Trousers","Jeans & Trousers",57.99,"UTILITY"],
  ["Street Sneakers","Shoes",79.99,"STEP"],
  ["Retro Court Sneakers","Shoes",74.99,"COURT"],
  ["High-Top Street Shoes","Shoes",89.99,"HIGH"],
  ["Classic Cap","Accessories",19.99,"CAP"],
  ["Crossbody Bag","Accessories",34.99,"BAG"],
  ["Logo Beanie","Accessories",14.99,"KNIT"]
].map((p, i) => ({
  id: i + 1,
  name: p[0],
  category: p[1],
  price: p[2],
  art: p[3],
  image: imageUrls[i]
}));

const $ = id => document.getElementById(id);
const euro = n => "€" + n.toFixed(2);

let category = "All";
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
    <article class="product-card">
      <div class="product-art">
        <img
          src="${p.image}"
          alt="${p.name}"
          loading="lazy"
          onerror="this.style.display='none'; this.parentElement.textContent='Image unavailable';"
        >
      </div>

      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="product-category">${p.category}</p>

        <div class="product-bottom">
          <span class="price">${euro(p.price)}</span>
          <span class="rating">★ 4.8</span>
        </div>

        <button class="add-button" data-add="${p.id}">
          ADD TO CART +
        </button>
      </div>
    </article>
  `).join("");

  document.querySelectorAll("[data-add]").forEach(button => {
    button.addEventListener("click", () => {
      addToCart(Number(button.dataset.add));
    });
  });
}

function addToCart(id) {
  const item = cart.find(x => x.id === id);

  if (item) {
    item.qty++;
  } else {
    cart.push({ id, qty: 1 });
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
        <p>${euro(p.price)} each</p>
        <button data-minus="${p.id}">−</button>
        ${item.qty}
        <button data-plus="${p.id}">+</button>
        <button data-remove="${p.id}">Remove</button>
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
      changeQty(Number(button.dataset.minus), -1);
  });

  document.querySelectorAll("[data-plus]").forEach(button => {
    button.onclick = () =>
      changeQty(Number(button.dataset.plus), 1);
  });

  document.querySelectorAll("[data-remove]").forEach(button => {
    button.onclick = () => {
      cart = cart.filter(
        x => x.id !== Number(button.dataset.remove)
      );
      saveCart();
      renderCart();
    };
  });
}

function changeQty(id, change) {
  const item = cart.find(x => x.id === id);
  if (!item) return;

  item.qty += change;

  if (item.qty <= 0) {
    cart = cart.filter(x => x.id !== id);
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
        price: p.price
      };
    })
  };

  const orders = JSON.parse(
    localStorage.getItem("dripOrders") || "[]"
  );

  orders.unshift(order);

  localStorage.setItem("dripOrders", JSON.stringify(orders));

  cart = [];
  saveCart();
  renderCart();

  event.target.reset();
  $("checkout-modal").classList.add("hidden");

  alert(
    "Demo order saved! No payment was made. No real money was charged."
  );
});

renderProducts();
renderCart();
