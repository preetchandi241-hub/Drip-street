const box = document.getElementById('admin-orders');
const readOrders = () =>
  JSON.parse(localStorage.getItem('dripOrders') || '[]');

const fmt = n => new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR'
}).format(n);

function draw() {
  const orders = readOrders();

  if (!orders.length) {
    box.innerHTML =
      '<p class="empty">No demo orders yet. Place a test order in the shop first.</p>';
    return;
  }

  box.innerHTML = orders.slice().reverse().map(o => `
    <article style="border:1px solid var(--line);padding:20px;margin:14px 0;background:var(--panel);overflow-wrap:anywhere">
      <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap">
        <h3>${o.orderNumber}</h3>
        <b style="color:var(--lime)">${fmt(o.total)}</b>
      </div>
      <p>${o.name} · ${o.email}</p>
      <p>Method: ${o.paymentMethod} ·
        <b style="color:var(--lime)">${o.paymentStatus}</b>
      </p>
      <p>${new Date(o.createdAt).toLocaleString()}</p>
      <p>${o.items.map(i =>
        `${i.qty} × ${i.name} (size ${i.size})`
      ).join('<br>')}</p>
    </article>
  `).join('');
}

document.getElementById('export-orders').addEventListener('click', () => {
  const data = JSON.stringify(readOrders(), null, 2);
  const url = URL.createObjectURL(
    new Blob([data], { type: 'application/json' })
  );

  const a = document.createElement('a');
  a.href = url;
  a.download = 'drip-street-demo-orders.json';
  a.click();

  URL.revokeObjectURL(url);
});

document.getElementById('clear-orders').addEventListener('click', () => {
  if (confirm('Delete all demo orders saved in this browser?')) {
    localStorage.removeItem('dripOrders');
    draw();
  }
});

draw();
