let selectedProduct = null;

function openProduct(id) {
  selectedProduct = products.find(p => p.id === id);
  if (!selectedProduct) return;

  $("detail-image").src = selectedProduct.image;
  $("detail-image").alt = selectedProduct.name;
  $("detail-name").textContent = selectedProduct.name;
  $("detail-category").textContent = selectedProduct.category;
  $("detail-price").textContent = euro(selectedProduct.price);
  $("detail-description").textContent =
    "Discover the " + selectedProduct.name +
    " from DRIP STREET. A stylish addition to your streetwear collection.";

  $("product-modal").classList.remove("hidden");
}

$("products").addEventListener("click", event => {
  if (event.target.closest("[data-add]")) return;

  const card = event.target.closest(".product-card");
  if (!card) return;

  const addButton = card.querySelector("[data-add]");
  if (addButton) openProduct(Number(addButton.dataset.add));
});

$("product-modal-close").onclick = () => {
  $("product-modal").classList.add("hidden");
};

$("detail-add").onclick = () => {
  if (!selectedProduct) return;

  addToCart(selectedProduct.id);
  $("product-modal").classList.add("hidden");
};

$("product-modal").addEventListener("click", event => {
  if (event.target.id === "product-modal") {
    $("product-modal").classList.add("hidden");
  }
});
