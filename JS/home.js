AOS.init({
    duration: 1000,
    once: false,
    mirror: true
});

// category
const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const categories = document.querySelectorAll(".category-item");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const keyword = input.value.toLowerCase().trim();

    categories.forEach(category => {
        const title = category.querySelector("h5").textContent.toLowerCase();

        if (title.includes(keyword)) {
            category.style.display = "block";
        } else {
            category.style.display = "none";
        }
    });
});