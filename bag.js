// Get bag items from local storage
let bagItems =
    JSON.parse(localStorage.getItem("bag")) || [];


// Get bag container
const bagContainer =
    document.getElementById("bag-product-container");


// Fetch product data
fetch("myntra.json")
    .then(response => response.json())
    .then(data => {

        displayBag(data);

    });


// Display bag products
function displayBag(data) {

    bagContainer.innerHTML = "";


    // Check if bag is empty
    if (bagItems.length === 0) {

        bagContainer.innerHTML =
            "<h3>Your bag is empty</h3>";

        document.getElementById("total-mrp").textContent =
            "₹0";

        document.getElementById("total-amount").textContent =
            "₹0";

        return;
    }


    let total = 0;


    // Display each bag item
    bagItems.forEach((item, index) => {

        let product = data.find(element => {

            return Number(element.id) ===
                Number(item.productId);

        });


        if (!product) {
            return;
        }


        // Calculate total
        total =
            total +
            Number(product.price) *
            (item.quantity || 1);


        // Create product card
        let card =
            document.createElement("div");

        card.classList.add("bag-product");


        card.innerHTML = `
            <img
                class="bag-product-image"
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="bag-product-info">

                <h3>${product.brand}</h3>

                <p>${product.name}</p>

                <p class="bag-price">
                    ₹${product.price}
                </p>

                <div class="bag-size">
                    Size: ${item.size}
                </div>

                <div class="quantity">

                    <button class="minus">
                        −
                    </button>

                    <span>
                        ${item.quantity || 1}
                    </span>

                    <button class="plus">
                        +
                    </button>

                </div>

                <p>
                    7 days return available
                </p>

            </div>

            <div class="remove-product">
                ×
            </div>
        `;


        bagContainer.appendChild(card);


        // Get quantity elements
        let quantity =
            item.quantity || 1;

        const minus =
            card.querySelector(".minus");

        const plus =
            card.querySelector(".plus");

        const quantityText =
            card.querySelector(".quantity span");


        // Decrease quantity
        minus.addEventListener("click", () => {

            if (quantity > 1) {

                quantity--;

                item.quantity =
                    quantity;


                localStorage.setItem(
                    "bag",
                    JSON.stringify(bagItems)
                );


                displayBag(data);
            }

        });


        // Increase quantity
        plus.addEventListener("click", () => {

            quantity++;

            item.quantity =
                quantity;


            localStorage.setItem(
                "bag",
                JSON.stringify(bagItems)
            );


            displayBag(data);

        });


        // Remove product
        card
            .querySelector(".remove-product")
            .addEventListener("click", () => {

                bagItems.splice(index, 1);


                localStorage.setItem(
                    "bag",
                    JSON.stringify(bagItems)
                );


                displayBag(data);

            });

    });


    // Display total amount
    document.getElementById("total-mrp").textContent =
        "₹" + total;

    document.getElementById("total-amount").textContent =
        "₹" + (total + 23);

}


// Pincode
const pincodeInput =
    document.getElementById("pincodeInput");

const checkPincode =
    document.getElementById("checkPincode");


checkPincode.addEventListener("click", () => {

    let pincode =
        pincodeInput.value.trim();


    if (pincode === "") {

        alert("Please enter pincode");

        return;
    }


    alert(
        "Delivery available for this pincode"
    );

});


// Donation
let donation = 0;


const donationButtons =
    document.querySelectorAll(
        ".donation-buttons button"
    );


donationButtons.forEach(button => {

    button.addEventListener("click", () => {

        let amount =
            Number(
                button.textContent.replace("₹", "")
            );


        if (donation === amount) {

            donation = 0;

            button.style.backgroundColor =
                "white";

            button.style.color =
                "black";

        } else {

            donation = amount;


            donationButtons.forEach(item => {

                item.style.backgroundColor =
                    "white";

                item.style.color =
                    "black";

            });


            button.style.backgroundColor =
                "#ff3f6c";

            button.style.color =
                "white";

        }


        // Update total amount
        let mrpText =
            document.getElementById(
                "total-mrp"
            ).textContent;


        let mrp =
            Number(
                mrpText.replace("₹", "")
            );


        document.getElementById(
            "total-amount"
        ).textContent =
            "₹" + (mrp + donation + 23);

    });

});

