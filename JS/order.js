let qty = 1;

function increase() {
    qty++;
    document.getElementById("qty").innerText = qty;
}

function decrease() {
    if (qty > 1) {
        qty--;
        document.getElementById("qty").innerText = qty;
    }
}