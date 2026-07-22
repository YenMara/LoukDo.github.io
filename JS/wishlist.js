function getWishlistItems() {
  try {
    const stored = JSON.parse(localStorage.getItem("loukdo-wishlist") || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    return [];
  }
}

function saveWishlistItems(items) {
  localStorage.setItem("loukdo-wishlist", JSON.stringify(items));
}

function renderWishlist() {
  const container = document.getElementById("wishlist-items");
  const count = document.getElementById("wishlist-count");
  const items = getWishlistItems();

  if (!container) return;

  if (count) {
    count.textContent = `${items.length} item${items.length === 1 ? "" : "s"} saved`;
  }

  if (items.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <h4 class="primary-color">Your wishlist is empty</h4>
        <p class="fw-normal">Click the heart on a product to save it here.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = items
    .map(
      (item, index) => `
        <div class="col-12 col-sm-6 col-lg-3">
          <div class="product-cart rounded-4 h-100 px-2">
            <div class="top">
              <img src="${item.image}" alt="${item.name}" class="w-100 h-100 object-fit-cover rounded-top-4" />
            </div>
            <div class="bottom">
              <h4 class="mt-3">${item.name}</h4>
              <p class="fw-normal">${item.description}</p>
              <div class="d-flex justify-content-between">
                <div>
                  <i class="fa-solid fa-star fs-7 text-warning"></i>
                  <span class="fw-normal primary-color">4.5</span>
                </div>
                <h5 class="primary-color">$${item.price.toFixed(2)}</h5>
              </div>

              <div class="d-flex gap-2 flex-wrap mt-3">
                <a href="order.html" class="btn btn-outline-primary-color flex-grow-1 rounded-4 text-decoration-none primary-color fw-normal">
                  <i class="fa-solid fa-cart-shopping"></i> Add to Cart
                </a>
                <button type="button" class="btn btn-outline-secondary-color rounded-4" data-index="${index}" onclick="removeWishlistItem(${index})">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `
    )
    .join("");
}

function removeWishlistItem(index) {
  const items = getWishlistItems();
  items.splice(index, 1);
  saveWishlistItems(items);
  renderWishlist();
}

window.removeWishlistItem = removeWishlistItem;
window.addEventListener("DOMContentLoaded", renderWishlist);
