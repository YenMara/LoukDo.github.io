const brandForm = document.getElementById("brandSearchForm");
const brandInput = document.getElementById("brandSearchInput");
const brands = document.querySelectorAll(".brand-item");


brandForm.addEventListener("submit", function(e){

    e.preventDefault();

    searchBrand();

});


brandInput.addEventListener("input", searchBrand);



function searchBrand(){

    let keyword = brandInput.value
        .toLowerCase()
        .trim();


    brands.forEach(brand => {


        let name = brand
        .querySelector("h4")
        .textContent
        .toLowerCase();


        let description = brand
        .querySelector("p")
        .textContent
        .toLowerCase();



        if(
            name.includes(keyword) ||
            description.includes(keyword)
        ){

            brand.style.display="";

        }else{

            brand.style.display="none";

        }


    });

}