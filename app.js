// PRODUCTS DATA
const products = [
  // HOODIES
  {id:1,name:"Gothic Washed Zip Hoodie",category:"Hoodies",price:49.99,tag:"NEW",image:"images/gothic-hoodie.png",desc:"Original gothic streetwear zip hoodie."},
  {id:2,name:"Signature Black Hoodie",category:"Hoodies",price:39.99,tag:"BESTSELLER",image:"images/black-hoodie.png",desc:"Minimal black oversized hoodie."},
  {id:3,name:"Tribal Graphic Hoodie",category:"Hoodies",price:44.99,tag:"NEW",image:"images/tribal-hoodie.png",desc:"Bold original tribal graphic design."},
  {id:4,name:"Dark Art Hoodie",category:"Hoodies",price:54.99,tag:"LIMITED",image:"images/dark-art-hoodie.png",desc:"Statement hoodie with original dark artwork."},
  {id:13,name:"Vintage Grey Hoodie",category:"Hoodies",price:42.99,tag:"NEW",image:"images/vintage-grey-hoodie.png",desc:"Vintage washed oversized grey hoodie."},
  {id:14,name:"Urban Shadow Hoodie",category:"Hoodies",price:47.99,tag:"POPULAR",image:"images/urban-shadow-hoodie.png",desc:"Black hoodie with urban-inspired graphics."},
  {id:15,name:"Minimal Cream Hoodie",category:"Hoodies",price:44.99,tag:"CORE",image:"images/cream-hoodie.png",desc:"Clean and comfortable cream oversized hoodie."},
  {id:16,name:"Red Flame Hoodie",category:"Hoodies",price:49.99,tag:"LIMITED",image:"images/red-flame-hoodie.png",desc:"Bold red flame graphic streetwear hoodie."},
  // T-SHIRTS
  {id:5,name:"Essential Oversized Tee",category:"T-Shirts",price:19.99,tag:"CORE",image:"images/oversized-tee.png",desc:"Everyday oversized black T-shirt."},
  {id:6,name:"White Graphic Tee",category:"T-Shirts",price:24.99,tag:"NEW",image:"images/white-graphic-tee.png",desc:"White tee with original streetwear artwork."},
  {id:7,name:"Classic White Tee",category:"T-Shirts",price:19.99,tag:"CORE",image:"images/classic-white-tee.png",desc:"Clean everyday white T-shirt."},
  {id:8,name:"Grey Graphic Tee",category:"T-Shirts",price:22.99,tag:"NEW",image:"images/grey-graphic-tee.png",desc:"Grey graphic streetwear T-shirt."},
  {id:17,name:"Vintage Black Tee",category:"T-Shirts",price:21.99,tag:"POPULAR",image:"images/vintage-black-tee.png",desc:"Vintage washed black oversized T-shirt."},
  {id:18,name:"Angel Graphic Tee",category:"T-Shirts",price:25.99,tag:"NEW",image:"images/angel-tee.png",desc:"Original angel-inspired graphic T-shirt."},
  {id:19,name:"Oversized Brown Tee",category:"T-Shirts",price:22.99,tag:"CORE",image:"images/brown-tee.png",desc:"Relaxed oversized brown everyday T-shirt."},
  {id:20,name:"Skull Print Tee",category:"T-Shirts",price:26.99,tag:"LIMITED",image:"images/skull-tee.png",desc:"Dark skull artwork streetwear T-shirt."},
  // TROUSERS
  {id:9,name:"Black Cargo Pants",category:"Trousers",price:39.99,tag:"POPULAR",image:"images/black-cargo.png",desc:"Relaxed fit black cargo pants."},
  {id:10,name:"Blue Denim Jeans",category:"Trousers",price:44.99,tag:"CORE",image:"images/blue-jeans.png",desc:"Classic relaxed fit blue denim jeans."},
  {id:21,name:"Grey Baggy Jeans",category:"Trousers",price:46.99,tag:"NEW",image:"images/grey-baggy-jeans.png",desc:"Relaxed fit grey baggy denim jeans."},
  {id:22,name:"Black Parachute Pants",category:"Trousers",price:42.99,tag:"POPULAR",image:"images/parachute-pants.png",desc:"Modern relaxed fit black parachute trousers."},
  // SHOES AND ACCESSORIES
  {id:11,name:"Street Sneakers",category:"Shoes",price:59.99,tag:"NEW",image:"images/sneakers.png",desc:"Original black and white street sneakers."},
  {id:23,name:"Retro White Sneakers",category:"Shoes",price:64.99,tag:"NEW",image:"images/white-sneakers.png",desc:"Clean retro-inspired everyday sneakers."},
  {id:12,name:"DRIP Street Cap",category:"Accessories",price:19.99,tag:"CORE",image:"images/black-cap.png",desc:"Black cap with an original DRIP STREET design."},
  {id:24,name:"Street Crossbody Bag",category:"Accessories",price:29.99,tag:"POPULAR",image:"images/crossbody-bag.png",desc:"Practical black streetwear crossbody bag."}
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
if (yearSpan) yearSpan.textContent = new Date().getFullYear();
// Render Products Function
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
        <img src="${product.image}" alt="${product.name}" class="product-image">
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
// Add to Cart
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
// Update Cart UI
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
      <img src="${item.image}" alt="${item.name}">
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
// Remove from Cart
window.removeFromCart = function(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
};
// Drawer Toggles
function openCart() {
  cartDrawer.classList.add("open");
  overlay.classList.add("show");
}
function closeCartDrawer() {
  cartDrawer.classList.remove("open");
  overlay.classList.remove("show");
}
cartToggle.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartDrawer);
overlay.addEventListener("click", closeCartDrawer);
// Category Filters
categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    renderProducts();
  });
});
// Search and Sort
searchInput.addEventListener("input", renderProducts);
sortSelect.addEventListener("change", renderProducts);
// Mobile Menu Toggle
menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});
// Initial Render
renderProducts();
