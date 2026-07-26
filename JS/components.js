function getBasePath() {
    const loc = window.location.pathname;
    const pagesIndex = loc.indexOf('/pages/');
    if (pagesIndex !== -1) {
        return loc.substring(0, pagesIndex + 1);
    }
    return loc.substring(0, loc.lastIndexOf('/') + 1);
}

async function loadComponent(id, file) {
    const element = document.getElementById(id);

    if (!element) return;

    const base = getBasePath();
    const url = base + file.replace(/^\//, '');
    const response = await fetch(url);
    let data = await response.text();

    data = data.replace(/(href|src)="\/(?!\/)/g, '$1="' + base);

    element.innerHTML = data;
}

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

function getProductFromTrigger(trigger) {
    const card = trigger.closest(".product-cart, .cart-brand, .review-cart");

    const fallbackName = (trigger.textContent || "Product").replace(/\s+/g, " ").trim() || "Product";

    if (!card) {
        return {
            name: fallbackName.replace(/^Add to Cart/i, "Product"),
            description: "Handmade product",
            price: 0,
            image: getBasePath() + "images/Clothes.jpg",
            quantity: 1
        };
    }

    const name = card.querySelector("h4, h3, .product-title, .card-title")?.textContent?.trim() || fallbackName;
    const description = card.querySelector("p")?.textContent?.trim() || "Handmade product";
    const priceText = card.querySelector("h5, .price, .fw-bold")?.textContent?.trim() || "0";
    const price = Number.parseFloat((priceText.match(/[\d.]+/) || [0])[0]) || 0;
    const image = card.querySelector("img")?.getAttribute("src") || getBasePath() + "images/Clothes.jpg";

    return {
        name,
        description,
        price,
        image,
        quantity: 1
    };
}

function handleAddToCartClick(event) {
    const trigger = event.target.closest("button, a");

    if (!trigger) return;

    const label = trigger.textContent?.trim().toLowerCase() || "";

    if (!label.includes("add to cart")) return;

    event.preventDefault();

    const product = getProductFromTrigger(trigger);
    const items = getCartItems();
    const existingItem = items.find((item) => item.name.toLowerCase() === product.name.toLowerCase());

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        items.push({ ...product, quantity: 1 });
    }

    saveCartItems(items);
    updateCartBadge();
}

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

function handleWishlistClick(event) {
    const trigger = event.target.closest("button, a");

    if (!trigger) return;

    const card = trigger.closest(".product-cart, .cart-brand, .review-cart");
    const hasHeartIcon = trigger.querySelector("i.fa-heart") || trigger.classList.contains("wishlist-toggle");
    const isWishlistLink = trigger.getAttribute("href")?.includes("wishlist") || trigger.textContent?.toLowerCase().includes("wishlist");

    if (!card || (!hasHeartIcon && !isWishlistLink)) return;

    event.preventDefault();

    const product = getProductFromTrigger(trigger);
    const items = getWishlistItems();
    const existingItem = items.find((item) => item.name.toLowerCase() === product.name.toLowerCase());

    if (!existingItem) {
        items.push({ ...product });
        saveWishlistItems(items);
    }

    const targetHref = trigger.getAttribute("href") || "pages/wishlist.html";
    window.location.href = targetHref;
}

async function initComponents() {
    await loadComponent("navbar", "component/navbar.html");
    await loadComponent("footer", "component/footer.html");

    updateCartBadge();
    document.addEventListener("click", handleAddToCartClick);
    document.addEventListener("click", handleWishlistClick);
}

initComponents();