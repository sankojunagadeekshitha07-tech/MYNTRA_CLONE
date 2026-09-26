// Display search products
function display(products) {

    const productsContainer =
        document.getElementById("products-container");

    productsContainer.innerHTML = "";

    products.forEach(element => {

        let card = document.createElement("div");

        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${element.image}" alt="${element.name}">
            <h3>${element.brand}</h3>
            <p>${element.name}</p>
            <h4>₹${element.price}</h4>
            <span>⭐ ${element.rating}</span>

            <button class="wishlist-btn">♡</button>
        `;

        // Open product details
        card.addEventListener("click", () => {

            localStorage.setItem(
                "productId",
                element.id
            );

            window.location.href = "products.html";

        });

        productsContainer.appendChild(card);
    });
}


// Searching the products
const mainContent =
    document.getElementById("mainContent");

const search =
    document.getElementById("search");

const productsSection =
    document.querySelector(".products");

search.addEventListener("input", (event) => {

    let searchText =
        event.target.value.toLowerCase();

    if (searchText === "") {

        mainContent.style.display = "block";
        productsSection.style.display = "none";

        return;
    }

    let filteredProducts =
        allProducts.filter(element =>
            element.brand.toLowerCase().includes(searchText) ||
            element.name.toLowerCase().includes(searchText)
        );

    mainContent.style.display = "none";
    productsSection.style.display = "block";

    display(filteredProducts);

});


// Fetching the data from JSON
let allProducts = [];

fetch("myntra.json")
    .then(response => response.json())
    .then(data => {

        allProducts = data;

        display(allProducts);

        // Hide products initially
        productsSection.style.display = "none";

    })
    .catch(error => console.log(error));


// Storing images of banner
let banner_img = [
    "myntra_offer.png",
    "banner2.png",
    "banner3.png",
    "banner4.png",
    "banner5.png"
];

let current_img = 0;

const sliderImage =
    document.getElementById("sliderImage");


// Sliding process of banner
setInterval(() => {

    current_img++;

    if (current_img === banner_img.length) {
        current_img = 0;
    }

    sliderImage.src =
        banner_img[current_img];

}, 1500);


// Category cards
const categories =
    document.querySelectorAll(".categories .card");

categories.forEach(card => {

    card.addEventListener("click", () => {

        let category =
            card.querySelector("h3").textContent.trim();

        let filteredProduct =
            allProducts.filter(element => {

                return element.category
                    .trim()
                    .toLowerCase() ===
                    category.toLowerCase();

            });

        mainContent.style.display = "none";

        productsSection.style.display = "block";

        display(filteredProduct);

    });

});


// Bag icon
const bagIcon =
    document.querySelector(".bag-icon");

bagIcon.addEventListener("click", () => {

    window.location.href = "bag.html";

});


// Login icon
const loginIcon =
    document.querySelector(".login-icon");

loginIcon.addEventListener("click", () => {

    window.location.href = "login.html";

});


// Wishlist icon
const wishlistIcon =
    document.querySelector(".wishlist-icon");

wishlistIcon.addEventListener("click", () => {

    window.location.href = "wishlist.html";

});


// Wishlist button
let wishlistBtn =
    card.querySelector(".wishlist-btn");

wishlistBtn.addEventListener("click", (event) => {

    event.stopPropagation();

    let wishlistItems =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    let wishlistItem = {
        productId: element.id
    };

    wishlistItems.push(wishlistItem);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlistItems)
    );

    wishlistBtn.textContent = "♥";

});








