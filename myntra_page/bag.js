let bagItem = JSON.parse(localStorage.getItem("bagItem"));

const bagContainer = document.getElementById("bag-product-container");

if (!bagItem) {
    bagContainer.innerHTML = "<h3>Your bag is empty</h3>";
}
else {

    fetch("myntra.json")
        .then(response => response.json())
        .then(data => {

            let product = data.find(element => {
                return element.id === bagItem.productId;
            });

            displayBagProduct(product);
        });
}


function displayBagProduct(element) {

    let card = document.createElement("div");
    card.classList.add("bag-product");

    card.innerHTML = `
        <img class="bag-product-image"
             src="${element.image}"
             alt="${element.name}">

        <div class="bag-product-info">

            <h3>${element.brand}</h3>

            <p>${element.name}</p>

            <p class="bag-price">₹${element.price}</p>

            <div class="bag-size">
                Size: ${bagItem.size}
            </div>

            <p>7 days return available</p>

        </div>

        <div class="remove-product">×</div>
    `;

    bagContainer.appendChild(card);

    let remove = card.querySelector(".remove-product");

    remove.addEventListener("click", () => {

    localStorage.removeItem("bagItem");

    card.remove();

    document.getElementById("total-mrp").textContent = "₹0";
    document.getElementById("total-amount").textContent = "₹0";

});

    document.getElementById("total-mrp").textContent =
        "₹" + element.price;

    document.getElementById("total-amount").textContent =
        "₹" + (element.price + 23);
}

