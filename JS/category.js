
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("searchForm");
    const input = document.getElementById("searchInput");
    const categories = document.querySelectorAll(".category-item");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const keyword = input.value.toLowerCase();

        categories.forEach(function (item) {
            const title = item.querySelector("h5").textContent.toLowerCase();

            if (title.includes(keyword)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    });

});
