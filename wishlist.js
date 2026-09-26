// Get wishlist items from local storage
let wishlistItems =
    JSON.parse(localStorage.getItem("wishlist")) || [];

// Get wishlist container
const wishlistContainer =
    document.getElementById("wishlist-container");

// Fetch product data
fetch("myntra.json")
    .then(response => response.json())
    .then(data => {

        // Display wishlist products
        wishlistItems.forEach(item => {

            // Find the product
            let product = data.find(element => {
                return Number(element.id) === Number(item.productId);
            });

            if (!product) {
                return;
            }

            // Create product card
            let card = document.createElement("div");

            card.classList.add("wishlist-product");

            // Display product details
            card.innerHTML = `
                <img src="${product.image}">

                <h3>${product.brand}</h3>

                <p>${product.name}</p>

                <h4>₹${product.price}</h4>

                <button class="remove">REMOVE</button>
            `;

            wishlistContainer.appendChild(card);

            // Remove product from wishlist
            card.querySelector(".remove")
                .addEventListener("click", () => {

                    wishlistItems = wishlistItems.filter(item => {
                        return item.productId !== product.id;
                    });

                    // Update local storage
                    localStorage.setItem(
                        "wishlist",
                        JSON.stringify(wishlistItems)
                    );

                    // Remove card
                    card.remove();

                });

        });

    });