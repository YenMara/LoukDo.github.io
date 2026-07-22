document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("searchForm");
    const input = document.getElementById("searchInput");
    const products = document.querySelectorAll(".product-item");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        searchProducts();
    });

    // Search while typing
    input.addEventListener("input", searchProducts);

    function searchProducts() {

        const keyword = input.value.trim().toLowerCase();

        products.forEach(product => {

            const name = product.querySelector("h4").textContent.toLowerCase();
            const description = product.querySelector("p").textContent.toLowerCase();

            if (
                name.includes(keyword) ||
                description.includes(keyword)
            ) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }
        });

    }

});

const container = document.querySelector(".row.g-4.mt-4");

function sortByRating(){

    const cards = [...document.querySelectorAll(".product-item")];

    cards.sort((a,b)=>{
        return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
    });

    cards.forEach(card=>container.appendChild(card));

}
sortByRating();


let selectedCategory = "all";
let selectedPrice = "all";
let selectedRating = 0;


const products = document.querySelectorAll(".product-item");


// CATEGORY FILTER
document.querySelectorAll(".filter-category").forEach(item => {

    item.addEventListener("click", function(e){

        e.preventDefault();

        selectedCategory = this.dataset.value;

        document.getElementById("categoryLabel").innerText = this.innerText;

        filterProducts();

    });

});


// PRICE FILTER
document.querySelectorAll(".filter-price").forEach(item => {

    item.addEventListener("click", function(e){

        e.preventDefault();

        selectedPrice = this.dataset.value;

        document.getElementById("priceLabel").innerText = this.innerText;

        filterProducts();

    });

});


// RATING FILTER
document.querySelectorAll(".filter-rating").forEach(item => {

    item.addEventListener("click", function(e){

        e.preventDefault();

        selectedRating = Number(this.dataset.value);

        document.getElementById("ratingLabel").innerText = this.innerText;

        filterProducts();

    });

});



function filterProducts(){

    products.forEach(product => {


        let category = product.dataset.category;

        let price = Number(product.dataset.price);

        let rating = Number(product.dataset.rating);



        // category check
        let categoryMatch =
        selectedCategory === "all" ||
        category === selectedCategory;



        // price check

        let priceMatch = true;


        if(selectedPrice !== "all"){


            let p = Number(selectedPrice);


            if(p === 10){
                priceMatch = price < 10;
            }

            else if(p === 25){
                priceMatch = price >=10 && price <=25;
            }

            else if(p === 50){
                priceMatch = price >25 && price <=50;
            }

            else if(p === 51){
                priceMatch = price >50;
            }


        }



        // rating check

        let ratingMatch =
        rating >= selectedRating;



        if(
            categoryMatch &&
            priceMatch &&
            ratingMatch
        ){

            product.style.display="";

        }else{

            product.style.display="none";

        }


    });

}