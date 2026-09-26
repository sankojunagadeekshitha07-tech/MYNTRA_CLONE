let productId = Number(localStorage.getItem("productId"));

fetch("myntra.json")
.then(response => response.json())
.then(data => {
    let product = data.find(element => {
        return element.id === productId;
    });

    displayProductPage(product);
});

function displayProductPage(element) {

    const productsPage = document.querySelector(".productsPage");

    productsPage.innerHTML = "";

    let image = document.createElement("div");
    image.classList.add("product-image");

    image.innerHTML = `
        <img src="${element.image}" alt="${element.name}">
    `;

    let info = document.createElement("div");
    info.classList.add("product-info");

    info.innerHTML = `
        <h2>${element.brand}</h2>

        <h3 class="name">${element.name}</h3>

        <div class="rating">
            ${element.rating} ⭐ | <span>12 Ratings</span>
        </div>

        <hr>

        <h2 class="price">₹${element.price}</h2>

        <h4 class="tax">Inclusive of all taxes</h4>

        <h3>SELECT SIZE</h3>

        <div class="size">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
        </div>

        <div class="cart_wishlist">
            <div class="bag">
                <h3>🛒 ADD TO BAG</h3>
            </div>

            <div class="wishlist">
                <h3>♡ WISHLIST</h3>
            </div>
        </div>

        <div class="delivery">
            <h3>DELIVERY OPTIONS</h3>

            <div class="pincode">
                <input type="text" placeholder="Enter pincode">
                <button>CHECK</button>
            </div>

            <p>✓ Delivery available to your location</p>
        </div>

        <div class="product-highlights">

            <h3>PRODUCT DETAILS</h3>

            <p>✓ 100% Original Product</p>
            <p>✓ Easy 7 days return and exchange</p>
            <p>✓ Inclusive of all taxes</p>
            <p>✓ Cash on Delivery available</p>

        </div>
    `;

    productsPage.appendChild(image);
    productsPage.appendChild(info);

    let sizeSelected;

    let size = info.querySelector(".size");

    size.addEventListener("click", function(event) {

        let allSizes = size.querySelectorAll("div");

        allSizes.forEach(item => {
            item.style.border = "1px solid black";
            item.style.color = "black";
        });

        event.target.style.border = "1px solid rgb(231, 101, 166)";
        event.target.style.color = "rgb(231, 101, 166)";

        sizeSelected = event.target.textContent;
    });

    const bag = info.querySelector(".bag");

    bag.addEventListener("click", () => {

        if (!sizeSelected) {
            alert("Please select size");
            return;
        }

        let bagItem = {
            productId: element.id,
            size: sizeSelected
        };

        localStorage.setItem("bagItem", JSON.stringify(bagItem));

        window.location.href = "bag.html";
    });
}





