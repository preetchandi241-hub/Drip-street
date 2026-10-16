 const photo = id =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=85`;
const products = [
  {id:1,name:'Essential Boxy Tee',category:'T-Shirts',price:19.99,tag:'BESTSELLER',image:photo('photo-1521572163474-6864f9cf17ab'),desc:'A relaxed everyday tee with a clean shape and easy streetwear fit.'},
  {id:2,name:'Heavyweight White Tee',category:'T-Shirts',price:22.99,tag:'CORE',image:photo('photo-1503341504253-dff4815485f1'),desc:'A simple wardrobe essential made for repeat wear.'},
  {id:3,name:'Graphic Street Tee',category:'T-Shirts',price:24.99,tag:'NEW',image:photo('photo-1523381210434-271e8be1f52b'),desc:'An expressive streetwear staple for everyday outfits.'},
  {id:4,name:'Relaxed Black Tee',category:'T-Shirts',price:19.99,tag:'CORE',image:photo('photo-1562157873-818bc0726f68'),desc:'A versatile black tee with a relaxed silhouette.'},
  {id:5,name:'Vintage Wash Tee',category:'T-Shirts',price:25.99,tag:'NEW',image:photo('photo-1503342217505-b0a15ec3261c'),desc:'A casual washed look with a vintage-inspired feel.'},
  {id:6,name:'Everyday Logo Tee',category:'T-Shirts',price:21.99,tag:'CORE',image:photo('photo-1618354691373-d851c5c3a990'),desc:'Minimal logo style that works with almost anything.'},
  {id:7,name:'Classic Pullover Hoodie',category:'Hoodies',price:44.99,tag:'BESTSELLER',image:photo('photo-1556821840-3a63f95609a7'),desc:'A cosy pullover layer for cooler days and late nights.'},
  {id:8,name:'Oversized Hoodie',category:'Hoodies',price:49.99,tag:'NEW',image:photo('photo-1578681994506-b8f463449011'),desc:'An oversized silhouette made for laid-back styling.'},
  {id:9,name:'Everyday Zip Hoodie',category:'Hoodies',price:46.99,tag:'CORE',image:photo('photo-1576566588028-4147f3842f27'),desc:'An easy zip layer to throw on and head out.'},
  {id:10,name:'Street Crew Sweatshirt',category:'Hoodies',price:39.99,tag:'CORE',image:photo('photo-1554568218-0f1715e72254'),desc:'A clean crewneck for effortless everyday outfits.'},
  {id:11,name:'Minimal Pullover',category:'Hoodies',price:42.99,tag:'NEW',image:photo('photo-1620799140408-edc6dcb6d633'),desc:'Simple shape, relaxed feel and easy layering.'},
  {id:12,name:'Heavy Fleece Hoodie',category:'Hoodies',price:54.99,tag:'LIMITED',image:photo('photo-1556821840-3a63f95609a7'),desc:'A heavier layer for a cosy streetwear look.'},
  {id:13,name:'Relaxed Cargo Pants',category:'Trousers',price:39.99,tag:'BESTSELLER',image:photo('photo-1542272604-787c3835535d'),desc:'Utility-inspired trousers with a relaxed everyday fit.'},
  {id:14,name:'Straight Leg Denim',category:'Trousers',price:44.99,tag:'CORE',image:photo('photo-1541099649105-f69ad21f3246'),desc:'Classic denim designed to pair with your favourite tees.'},
  {id:15,name:'Utility Track Pants',category:'Trousers',price:34.99,tag:'NEW',image:photo('photo-1473966968600-fa801b869a1a'),desc:'Sport-inspired track pants for casual days.'},
  {id:16,name:'Relaxed Fit Jeans',category:'Trousers',price:42.99,tag:'CORE',image:photo('photo-1552902865-b72c031ac5ea'),desc:'An easy denim shape for everyday wear.'},
  {id:17,name:'Wide Leg Trousers',category:'Trousers',price:45.99,tag:'NEW',image:photo('photo-1548883354-7622d03aca27'),desc:'A wider silhouette with a modern streetwear feel.'},
  {id:18,name:'Everyday Joggers',category:'Trousers',price:32.99,tag:'CORE',image:photo('photo-1517438476312-10d79c077509'),desc:'Comfort-first joggers for off-duty outfits.'},
  {id:19,name:'Street Runner Sneakers',category:'Shoes',price:69.99,tag:'NEW',image:photo('photo-1542291026-7eec264c27ff'),desc:'Sporty everyday sneakers to finish your fit.'},
  {id:20,name:'Minimal White Sneakers',category:'Shoes',price:64.99,tag:'CORE',image:photo('photo-1600185365483-26d7a4cc7519'),desc:'Clean low-profile shoes that go with almost everything.'},
  {id:21,name:'Retro Court Sneakers',category:'Shoes',price:74.99,tag:'LIMITED',image:photo('photo-1525966222134-fcfa99b8ae77'),desc:'A retro-inspired sneaker look for daily rotation.'},
  {id:22,name:'Everyday Cap',category:'Accessories',price:17.99,tag:'CORE',image:photo('photo-1588850561407-ed78c282e89b'),desc:'A simple cap to top off your outfit.'},
  {id:23,name:'Utility Crossbody Bag',category:'Accessories',price:24.99,tag:'NEW',image:photo('photo-1553062407-98eeb64c6a62'),desc:'A practical hands-free bag for essentials on the move.'},
  {id:24,name:'Classic Bucket Hat',category:'Accessories',price:19.99,tag:'CORE',image:photo('photo-1576871337622-98d48d1cf531'),desc:'A casual bucket hat for a laid-back finish.'}
];

const $ = id => document.getElementById(id);
const money = n => new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR'
}).format(n);

let cart = JSON.parse(localStorage.getItem('dripCart') || '[]');

const saveCart = () =>
  localStorage.setItem('dripCart', JSON.stringify(cart));

function renderProducts() {
  const query = $('search').value.trim().toLowerCase();
  const category = $('category-filter').value;
  const sort = $('sort').value;

  let list = products.filter(p =>
    (category === 'All' || p.category === category) &&
    `${p.name} ${p.category} ${p.desc}`.toLowerCase().includes(query)
  );

  if (sort === 'low') list.sort((a,b) => a.price - b.price);
  if (sort === 'high') list.sort((a,b) => b.price - a.price);
  if (sort === 'name') list.sort((a,b) => a.name.localeCompare(b.name));

  $('results-count').textContent =
    `${list.length} ${list.length === 1 ? 'piece' : 'pieces'}`;
  $('no-results').hidden = list.length !== 0;

  $('product-grid').innerHTML = list.map(p => `
    <article class="product-card" data-product="${p.id}" tabindex="0">
      <div class="product-photo-wrap">
        <img class="product-photo" src="${p.image}"
          alt="${p.name}" loading="lazy">
        <span class="product-tag">${p.tag}</span>
        <button class="quick-add" data-quick="${p.id}"
          type="button" aria-label="View ${p.name}">+</button>
      </div>
      <div class="product-info">
        <div><h3>${p.name}</h3><p>${p.category}</p></div>
        <span class="product-price">${money(p.price)}</span>
      </div>
    </article>
  `).join('');
}

function renderCart() {
  const count = cart.reduce((s,i) => s + i.qty, 0);
  const total = cart.reduce((s,i) =>
    s + i.qty * products.find(p => p.id === i.id).price, 0);

  $('cart-count').textContent = count;
  $('drawer-count').textContent = `(${count})`;
  $('cart-total').textContent = money(total);
  $('checkout-total').textContent = money(total);

  $('cart-items').innerHTML = cart.length ? cart.map(i => {
    const p = products.find(p => p.id === i.id);
    return `
      <div class="cart-row">
        <img src="${p.image}" alt="${p.name}">
        <div>
          <h3>${p.name}</h3>
          <p>Size: ${i.size} · ${money(p.price)}</p>
          <div class="qty">
            <button data-qty="${p.id}" data-change="-1">−</button>
            <span>${i.qty}</span>
            <button data-qty="${p.id}" data-change="1">+</button>
          </div>
        </div>
        <button class="remove" data-remove="${p.id}">×</button>
      </div>`;
  }).join('') : '<p class="empty">Your bag is empty. Find something you love.</p>';

  $('checkout-open').disabled = !cart.length;
  $('checkout-open').style.opacity = cart.length ? '1' : '.45';
}

function openCart() {
  $('overlay').hidden = false;
  $('cart-drawer').classList.add('open');
  $('cart-drawer').setAttribute('aria-hidden', 'false');
  document.body.classList.add('locked');
}

function closeCart() {
  $('overlay').hidden = true;
  $('cart-drawer').classList.remove('open');
  $('cart-drawer').setAttribute('aria-hidden', 'true');
  document.body.classList.remove('locked');
}

function openProduct(id) {
  const p = products.find(p => p.id === Number(id));
  if (!p) return;

  $('product-detail').innerHTML = `
    <div class="detail-layout">
      <img src="${p.image}" alt="${p.name}">
      <div>
        <p class="eyebrow">${p.tag} / ${p.category}</p>
        <h2>${p.name}</h2>
        <p class="detail-price">${money(p.price)}</p>
        <p class="detail-copy">${p.desc}</p>
        <label for="product-size">Choose your size</label>
        <select id="product-size">
          <option>S</option><option selected>M</option>
          <option>L</option><option>XL</option>
        </select>
        <button class="button lime full" data-add="${p.id}" type="button">
          Add to bag — ${money(p.price)}
        </button>
      </div>
    </div>`;
  $('product-dialog').showModal();
}

function addToCart(id, size = 'M') {
  id = Number(id);
  const found = cart.find(i => i.id === id && i.size === size);
  if (found) found.qty++;
  else cart.push({ id, qty: 1, size });
  saveCart();
  renderCart();
}

document.addEventListener('click', e => {
  const quick = e.target.closest('[data-quick]');
  if (quick) {
    e.stopPropagation();
    openProduct(quick.dataset.quick);
    return;
  }

  const card = e.target.closest('[data-product]');
  if (card) {
    openProduct(card.dataset.product);
    return;
  }

  const add = e.target.closest('[data-add]');
  if (add) {
    addToCart(add.dataset.add, $('product-size').value);
    $('product-dialog').close();
    openCart();
    return;
  }

  const qty = e.target.closest('[data-qty]');
  if (qty) {
    const item = cart.find(i => i.id === Number(qty.dataset.qty));
    if (item) {
      item.qty += Number(qty.dataset.change);
      if (item.qty < 1) cart = cart.filter(i => i !== item);
      saveCart();
      renderCart();
    }
    return;
  }

  const remove = e.target.closest('[data-remove]');
  if (remove) {
    cart = cart.filter(i => i.id !== Number(remove.dataset.remove));
    saveCart();
    renderCart();
    return;
  }

  const close = e.target.closest('[data-close]');
  if (close) $(close.dataset.close).close();
});

$('product-grid').addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') &&
      e.target.matches('[data-product]')) {
    e.preventDefault();
    openProduct(e.target.dataset.product);
  }
});

$('search').addEventListener('input', renderProducts);
$('category-filter').addEventListener('change', renderProducts);
$('sort').addEventListener('change', renderProducts);
$('cart-open').addEventListener('click', openCart);
$('cart-close').addEventListener('click', closeCart);
$('continue-shopping').addEventListener('click', closeCart);
$('overlay').addEventListener('click', closeCart);

$('checkout-open').addEventListener('click', () => {
  if (!cart.length) return;
  closeCart();
  $('checkout-message').hidden = true;
  $('checkout-dialog').showModal();
});

document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('click', e => {
    if (e.target === dialog) dialog.close();
  });
});

$('checkout-form').addEventListener('submit', e => {
  e.preventDefault();
  if (!cart.length) return;

  const method = $('payment').value;
  if (!method) {
    $('checkout-message').textContent = 'Please choose a demo payment method.';
    $('checkout-message').hidden = false;
    return;
  }

  const order = {
    orderNumber: 'DS-' + Date.now().toString().slice(-8),
    name: $('customer-name').value.trim(),
    email: $('customer-email').value.trim(),
    address: $('customer-address').value.trim(),
    paymentMethod: method,
    items: cart.map(i => {
      const p = products.find(p => p.id === i.id);
      return {
        id: p.id, name: p.name, price: p.price,
        size: i.size, qty: i.qty
      };
    }),
    total: cart.reduce((s,i) =>
      s + products.find(p => p.id === i.id).price * i.qty, 0),
    paymentStatus: 'TEST — NOT PAID',
    createdAt: new Date().toISOString()
  };

  const orders = JSON.parse(localStorage.getItem('dripOrders') || '[]');
  orders.push(order);
  localStorage.setItem('dripOrders', JSON.stringify(orders));

  cart = [];
  saveCart();
  renderCart();
  $('checkout-dialog').close();

  $('confirmation-text').textContent =
    `Demo order ${order.orderNumber} saved using ${method}. ` +
    `Total: ${money(order.total)}. This is not a real purchase.`;

  $('confirmation-dialog').showModal();
  $('checkout-form').reset();
});

$('confirmation-close').addEventListener('click', () =>
  $('confirmation-dialog').close()
);

renderProducts();
renderCart();
