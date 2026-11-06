const products = [
  // HOODIES (8)
  {id:1,name:"Gothic Script Zip Hoodie",category:"Hoodies",price:49.99,tag:"NEW",image:"images/Hoodie1.webp",desc:"Original gothic streetwear zip hoodie."},
  {id:2,name:"Feral Black Zip Hoodie",category:"Hoodies",price:39.99,tag:"BESTSELLER",image:"images/Hoodie 2.webp",desc:"Minimal black oversized hoodie."},
  {id:3,name:"Feral Pink Zip Hoodie",category:"Hoodies",price:44.99,tag:"NEW",image:"images/Hoodie 3.webp",desc:"Bold original tribal graphic design."},
  {id:4,name:"Dark Angel Art Hoodie",category:"Hoodies",price:54.99,tag:"LIMITED",image:"images/Hoodie 4.webp",desc:"Statement hoodie with original dark artwork."},
  {id:13,name:"Vintage Acid Wash Hoodie",category:"Hoodies",price:42.99,tag:"NEW",image:"images/Hoodie 5.webp",desc:"Vintage washed oversized grey hoodie."},
  {id:14,name:"Urban Flame Panel Hoodie",category:"Hoodies",price:47.99,tag:"POPULAR",image:"images/Hoodie 6.webp",desc:"Black hoodie with urban-inspired graphics."},
  {id:15,name:"Grillz Graphic Hoodie",category:"Hoodies",price:44.99,tag:"CORE",image:"images/Hoodie 7.webp",desc:"Clean and comfortable cream oversized hoodie."},
  {id:16,name:"Eternal Angel Hoodie",category:"Hoodies",price:49.99,tag:"LIMITED",image:"images/Hoodie 8.webp",desc:"Bold red flame graphic streetwear hoodie."},
  
  // T-SHIRTS (8)
  {id:5,name:"Nightmare Dark Graphic Tee",category:"T-Shirts",price:19.99,tag:"CORE",image:"images/t-shirt 1.webp",desc:"Everyday oversized dark washed T-shirt."},
  {id:6,name:"Rock Guitar Graphic Tee",category:"T-Shirts",price:24.99,tag:"NEW",image:"images/t-shirt 2.webp",desc:"White tee with original streetwear artwork."},
  {id:7,name:"Stand Graphic Back Tee",category:"T-Shirts",price:19.99,tag:"CORE",image:"images/t-shirt 3.webp",desc:"Clean everyday white T-shirt."},
  {id:8,name:"Ed Hardy Red Graphic Jersey",category:"T-Shirts",price:22.99,tag:"NEW",image:"images/t-shirt 4.webp",desc:"Grey graphic streetwear T-shirt."},
  {id:17,name:"Red Panther Black Tee",category:"T-Shirts",price:21.99,tag:"POPULAR",image:"images/t-shirt 5.webp",desc:"Vintage washed black oversized T-shirt."},
  {id:18,name:"White Balaclava Chain Tee",category:"T-Shirts",price:25.99,tag:"NEW",image:"images/t-shirt 6.webp",desc:"Statement black tee with balaclava graphic."},
  {id:19,name:"Abstract Rose Acid Tee",category:"T-Shirts",price:22.99,tag:"CORE",image:"images/t-shirt 7.webp",desc:"Washed dark tee with abstract graphic."},
  {id:20,name:"Electric Guitar Flame Tee",category:"T-Shirts",price:26.99,tag:"LIMITED",image:"images/t-shirt 8.webp",desc:"Dark electric guitar artwork streetwear T-shirt."},
  
  // TROUSERS (4)
  {id:9,name:"Dragon Print Dark Denim Jeans",category:"Trousers",price:39.99,tag:"POPULAR",image:"images/Trousers 1.webp",desc:"Relaxed fit black cargo pants."},
  {id:10,name:"Script Graphic Parachute Pants",category:"Trousers",price:44.99,tag:"CORE",image:"images/Trousers 2.webp",desc:"Classic relaxed fit blue denim jeans."},
  {id:21,name:"Ed Hardy Dragon Sweatpants",category:"Trousers",price:46.99,tag:"NEW",image:"images/Trousers 3.webp",desc:"Relaxed fit grey baggy denim jeans."},
  {id:22,name:"Red Snake Graphic Joggers",category:"Trousers",price:42.99,tag:"POPULAR",image:"images/Trousers 4.webp",desc:"Modern relaxed fit black parachute trousers."},
  
  // SHOES AND ACCESSORIES (4)
  {id:11,name:"Nike Shox TL All Black",category:"Shoes",price:59.99,tag:"NEW",image:"images/Shoes 1.webp",desc:"All-black Nike Shox sneakers."},
  {id:23,name:"Nike Shox TL Black & Red",category:"Shoes",price:64.99,tag:"NEW",image:"images/Shoes 2.webp",desc:"Nike Shox sneakers with red accents."},
  {id:12,name:"Lacoste Silver Steel Bracelet",category:"Accessories",price:19.99,tag:"CORE",image:"images/Accessories 1.webp",desc:"Silver Lacoste steel link bracelet."},
  {id:24,name:"Lacoste Black Steel Bracelet",category:"Accessories",price:29.99,tag:"POPULAR",image:"images/Accessories 2.webp",desc:"Black Lacoste steel link bracelet."}
];

let cart = [];
let currentCategory = "All";

// DOM Elements
const productGrid = document.getElementById("productGrid");
const emptyMessage = document.getElementById("emptyMessage");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const categoryButtons = document.querySelectorAll("#categories .category");
const cartToggle = document.getElementById("cartToggle");
const closeCart = document.getElementById("closeCart");
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartSubtotal = document.getElementById("cartSubtotal");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const yearSpan = document.getElementById("year");

// Checkout Elements
const checkoutButton = document.getElementById("checkoutButton");
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckout = document.getElementById("closeCheckout");
const placeOrderButton = document.getElementById("placeOrder");
const customerNameInput = document.getElementById("customerName");
const paymentMethodSelect = document.getElementById("paymentMethod");

if (yearSpan) yearSpan.textContent = new Date().getFullYear();

function renderProducts() {
  let filtered = products.filter(product => {
    const matchesCategory = currentCategory === "All" || product.category === currentCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchInput.value.toLowerCase().trim());
    return matchesCategory && matchesSearch;
  });

  const sortValue = sortSelect.value;
  if (sortValue === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortValue === "high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortValue === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  productGrid.innerHTML = "";

  if (filtered.length === 0) {
    emptyMessage.hidden = false;
    return;
  }

  emptyMessage.hidden = true;

  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-image-wrap">
        <span class="product-tag">${product.tag}</span>
        <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=600&q=80'">
        <button class="quick-add" onclick="addToCart(${product.id})">ADD TO BAG</button>
      </div>
      <div class="product-info">
        <div>
          <h3>${product.name}</h3>
          <p>${product.category}</p>
        </div>
        <div class="product-price">€${product.price.toFixed(2)}</div>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

window.addToCart = function(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  
  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
  openCart();
};

function updateCartUI() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    const row = document.createElement("div");
    row.className = "cart-row";
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=200&q=80'">
      <div>
        <h4>${item.name}</h4>
        <p>€${item.price.toFixed(2)} x ${item.qty}</p>
        <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
      <div style="font-weight: bold;">€${(item.price * item.qty).toFixed(2)}</div>
    `;
    cartItemsContainer.appendChild(row);
  });

  cartCount.textContent = count;
  cartSubtotal.textContent = `€${total.toFixed(2)}`;
}

window.removeFromCart = function(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
};

function openCart() {
  cartDrawer.classList.add("open");
  overlay.classList.add("show");
}

function closeCartDrawer() {
  cartDrawer.classList.remove("open");
  overlay.classList.remove("show");
}

function openCheckout() {
  if (cart.length === 0) {
    alert("Your shopping bag is empty! Add products first.");
    return;
  }
  closeCartDrawer();
  checkoutModal.classList.add("open");
  overlay.classList.add("show");
}

function closeCheckoutModal() {
  checkoutModal.classList.remove("open");
  overlay.classList.remove("show");
}

function handlePlaceOrder() {
  const customerName = customerNameInput.value.trim() || "Customer";
  const selectedMethod = paymentMethodSelect.value;

  alert(`Thank you, ${customerName}!\n\nYour demo order has been placed successfully using ${selectedMethod}.\n(This is a school project demo - no payment was charged).`);

  cart = [];
  updateCartUI();
  customerNameInput.value = "";
  closeCheckoutModal();
}

cartToggle.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartDrawer);
overlay.addEventListener("click", () => {
  closeCartDrawer();
  closeCheckoutModal();
});

checkoutButton.addEventListener("click", openCheckout);
closeCheckout.addEventListener("click", closeCheckoutModal);
placeOrderButton.addEventListener("click", handlePlaceOrder);

categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    renderProducts();
  });
});

searchInput.addEventListener("input", renderProducts);
sortSelect.addEventListener("change", renderProducts);

menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

renderProducts();
