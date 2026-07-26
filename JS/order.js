function getCartItems() {
    try {
        const stored = JSON.parse(localStorage.getItem("loukdo-cart") || "[]");
        return Array.isArray(stored) ? stored : [];
    } catch (error) {
        return [];
    }
}

function saveCartItems(items) {
    const totalQuantity = items.reduce((sum, item) => sum + Number(item.quantity || 1), 0);
    localStorage.setItem("loukdo-cart", JSON.stringify(items));
    localStorage.setItem("loukdo-cart-count", String(totalQuantity));
}

function updateCartBadge() {
    const badge = document.getElementById("cart-count-badge");

    if (!badge) return;

    const count = getCartItems().reduce((sum, item) => sum + Number(item.quantity || 1), 0);
    badge.textContent = count;
    badge.classList.toggle("d-none", count === 0);
}

function changeQuantity(index, delta) {
    const items = getCartItems();
    const nextItems = items.filter((item, itemIndex) => itemIndex !== index);

    if (items[index]) {
        const newQuantity = Number(items[index].quantity || 1) + delta;

        if (newQuantity > 0) {
            items[index].quantity = newQuantity;
            saveCartItems(items);
            renderOrderPage();
            updateCartBadge();
            return;
        }
    }

    saveCartItems(nextItems);
    renderOrderPage();
    updateCartBadge();
}

function handleCartActions(event) {
    const button = event.target.closest("[data-action]");

    if (!button) return;

    const index = Number(button.getAttribute("data-index"));
    const action = button.getAttribute("data-action");

    if (Number.isNaN(index)) return;

    if (action === "increase") {
        changeQuantity(index, 1);
    } else if (action === "decrease") {
        changeQuantity(index, -1);
    }
}

function renderOrderPage() {
    const container = document.getElementById("cart-items-container");
    const subtotalElement = document.getElementById("cart-subtotal");
    const totalElement = document.getElementById("cart-total");

    if (!container) return;

    const items = getCartItems();

    if (items.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <h4 class="primary-color">Your cart is empty</h4>
                <p class="fw-normal">Add products from the shop to see them here.</p>
            </div>
        `;

        if (subtotalElement) subtotalElement.textContent = "$0.00";
        if (totalElement) totalElement.textContent = "$0.00";
        return;
    }

    let subtotal = 0;

    const markup = items
        .map((item, index) => {
            const lineTotal = item.price * item.quantity;
            subtotal += lineTotal;

            return `
                <div class="row align-items-center mt-3">
                    <div class="col-lg-4 col-md-5 col-12 text-center mb-3 mb-md-0">
                        <div class="img-shoppingcart mx-auto">
                            <img src="${item.image}" class="w-100 h-100 rounded-4 object-fit-cover" alt="${item.name}">
                        </div>
                    </div>

                    <div class="col-lg-8 col-md-7 col-12">
                        <div class="d-flex justify-content-between align-items-start flex-wrap">
                            <div>
                                <h3 class="primary-color">${item.name}</h3>
                                <p class="fw-normal mb-3">${item.description}</p>
                            </div>
                        </div>

                        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
                            <div class="quantity-box">
                                <button class="qty-btn" type="button" data-action="decrease" data-index="${index}">
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                                <span class="px-3">${item.quantity}</span>
                                <button class="qty-btn" type="button" data-action="increase" data-index="${index}">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </div>

                            <div class="text-lg-end">
                                <p class="mb-1 fw-normal">$${item.price.toFixed(2)} each</p>
                                <h3 class="primary-color">$${lineTotal.toFixed(2)}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        })
        .join("");

    container.innerHTML = markup;

    const shipping = 1;
    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$${(subtotal + shipping).toFixed(2)}`;
}

function initOrderPage() {
    const container = document.getElementById("cart-items-container");

    updateCartBadge();
    renderOrderPage();

    if (container) {
        container.addEventListener("click", handleCartActions);
    }
}

window.addEventListener("DOMContentLoaded", initOrderPage);


// 

 document.addEventListener('DOMContentLoaded', function() {
        const lastOrder = localStorage.getItem('loukdo-last-order');
        if (lastOrder) {
          try {
            const order = JSON.parse(lastOrder);
            const container = document.getElementById('cart-items-container');
            if (container && order.items && order.items.length > 0) {
              let subtotal = 0;
              const markup = order.items.map((item, index) => {
                const price = Number(item.price) || 0;
                const qty = Number(item.quantity) || 1;
                const lineTotal = price * qty;
                subtotal += lineTotal;
                return `
                  <div class="row align-items-center mt-3">
                    <div class="col-lg-4 col-md-5 col-12 text-center mb-3 mb-md-0">
                      <div class="img-shoppingcart mx-auto">
                        <div class="w-100 h-100 rounded-4 d-flex align-items-center justify-content-center bg-light">
                          <i class="fa-solid fa-box text-muted" style="font-size: 3rem;"></i>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-8 col-md-7 col-12">
                      <div class="d-flex justify-content-between align-items-start flex-wrap">
                        <div>
                          <h3 class="primary-color">${item.name}</h3>
                          <p class="fw-normal mb-3">Ordered Item</p>
                        </div>
                      </div>
                      <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div class="quantity-box">
                          <span class="px-3">Qty: ${qty}</span>
                        </div>
                        <div class="text-lg-end">
                          <p class="mb-1 fw-normal">$${price.toFixed(2)} each</p>
                          <h3 class="primary-color">$${lineTotal.toFixed(2)}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              }).join('');

              container.innerHTML = `
                <div class="text-center py-4 mb-3">
                  <i class="fa-solid fa-circle-check text-success" style="font-size: 3rem;"></i>
                  <h4 class="primary-color mt-3">Order Placed Successfully!</h4>
                  <p class="fw-normal">Thank you for your purchase. Your order has been confirmed.</p>
                </div>
                <hr>
                <h5 class="primary-color">Order Details</h5>
                ${markup}
              `;

              const subtotalElement = document.getElementById('cart-subtotal');
              const totalElement = document.getElementById('cart-total');
              const shippingCost = 1;
              if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
              if (totalElement) totalElement.textContent = `$${(subtotal + shippingCost).toFixed(2)}`;
            }
          } catch (e) {
            console.error('Failed to load order', e);
          }
        }
      });