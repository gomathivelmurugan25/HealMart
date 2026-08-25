// ==========================================
// HEALMART - COMPLETE JAVASCRIPT
// ==========================================


// ==========================================
// 1. CART DATA
// ==========================================

let cart = JSON.parse(localStorage.getItem("healMartCart")) || [];


// ==========================================
// 2. CREATE CART PANEL
// ==========================================

const cartPanel = document.createElement("div");

cartPanel.id = "cart-panel";

cartPanel.innerHTML = `
    <div class="cart-header">
        <h2>Your Cart</h2>
        <button id="close-cart">&times;</button>
    </div>

    <div id="cart-items"></div>

    <div class="cart-footer">
        <div class="cart-total">
            <span>Total</span>
            <strong id="cart-total">₹0</strong>
        </div>

        <button id="checkout-button">
            Proceed to Checkout
        </button>
    </div>
`;

document.body.appendChild(cartPanel);


// ==========================================
// 3. CREATE CART OVERLAY
// ==========================================

const cartOverlay = document.createElement("div");

cartOverlay.id = "cart-overlay";

document.body.appendChild(cartOverlay);


// ==========================================
// 4. CART BUTTON
// ==========================================

const cartButton = document.getElementById("cart-button");

cartButton.addEventListener("click", () => {
    openCart();
});


// ==========================================
// 5. CLOSE CART
// ==========================================

document.getElementById("close-cart").addEventListener("click", () => {
    closeCart();
});

cartOverlay.addEventListener("click", () => {
    closeCart();
});


// ==========================================
// 6. OPEN CART
// ==========================================

function openCart() {
    cartPanel.classList.add("active");
    cartOverlay.classList.add("active");

    displayCart();
}


// ==========================================
// 7. CLOSE CART
// ==========================================

function closeCart() {
    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");
}


// ==========================================
// 8. ADD PRODUCT TO CART
// ==========================================

const cartButtons = document.querySelectorAll(".add-to-cart");

cartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const productName = button.dataset.product;
        const productPrice = Number(button.dataset.price);

        const existingProduct = cart.find(
            item => item.name === productName
        );

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });

        }

        saveCart();
        updateCartCount();

        // Small visual feedback
        const originalText = button.textContent;

        button.textContent = "Added ✓";

        setTimeout(() => {
            button.textContent = originalText;
        }, 1000);

    });

});


// ==========================================
// 9. SAVE CART
// ==========================================

function saveCart() {

    localStorage.setItem(
        "healMartCart",
        JSON.stringify(cart)
    );

}


// ==========================================
// 10. UPDATE CART COUNT
// ==========================================

function updateCartCount() {

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const cartCount = document.getElementById("cart-count");

    cartCount.textContent = totalItems;

}


// ==========================================
// 11. DISPLAY CART
// ==========================================

function displayCart() {

    const cartItems = document.getElementById("cart-items");

    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add some healthcare essentials to get started.</p>
            </div>
        `;

        cartTotal.textContent = "₹0";

        return;
    }


    let total = 0;


    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `
            <div class="cart-item-info">

                <h3>${item.name}</h3>

                <p>₹${item.price} each</p>

            </div>


            <div class="cart-item-actions">

                <button class="quantity-button"
                    onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span>${item.quantity}</span>

                <button class="quantity-button"
                    onclick="increaseQuantity(${index})">
                    +
                </button>

                <button class="remove-button"
                    onclick="removeItem(${index})">
                    Remove
                </button>

            </div>


            <strong class="item-total">
                ₹${itemTotal}
            </strong>
        `;


        cartItems.appendChild(cartItem);

    });


    cartTotal.textContent = "₹" + total;

}


// ==========================================
// 12. INCREASE QUANTITY
// ==========================================

function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();

    updateCartCount();

    displayCart();

}


// ==========================================
// 13. DECREASE QUANTITY
// ==========================================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    saveCart();

    updateCartCount();

    displayCart();

}


// ==========================================
// 14. REMOVE PRODUCT
// ==========================================

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    updateCartCount();

    displayCart();

}


// ==========================================
// 15. CHECKOUT
// ==========================================

document.getElementById("checkout-button").addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;
        }


        alert(
            "Thank you for choosing HEALMART! 🏥\n\n" +
            "Your order enquiry has been received."
        );


        cart = [];

        saveCart();

        updateCartCount();

        displayCart();

    }
);


// ==========================================
// 16. ENQUIRY FORM
// ==========================================

const enquiryForm = document.querySelector(".order-form");

enquiryForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const product = document.getElementById("product").value;

    const quantity = document.getElementById("quantity").value;


    // Name validation

    if (name.length < 3) {

        alert("Please enter a valid name.");

        return;

    }


    // Email validation

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        alert("Please enter a valid email address.");

        return;

    }


    // Phone validation

    const phonePattern = /^[0-9]{10}$/;


    if (!phonePattern.test(phone)) {

        alert("Please enter a valid 10-digit phone number.");

        return;

    }


    // Product validation

    if (product === "") {

        alert("Please select a product.");

        return;

    }


    // Quantity validation

    if (quantity === "" || Number(quantity) < 1) {

        alert("Please enter a valid quantity.");

        return;

    }


    // Success message

    alert(
        "Enquiry submitted successfully! ✓\n\n" +
        "Thank you, " + name + "!"
    );


    enquiryForm.reset();

});


// ==========================================
// 17. CATEGORY FILTERING
// ==========================================

const categoryLinks =
    document.querySelectorAll(".category-card a");


categoryLinks.forEach(link => {

    link.addEventListener("click", function(event) {

        event.preventDefault();


        const categoryName =
            this.parentElement
                .querySelector("h3")
                .textContent
                .toLowerCase();


        const productCards =
            document.querySelectorAll(".product-card");


        productCards.forEach(card => {

            const productName =
                card.querySelector("h3")
                    .textContent
                    .toLowerCase();


            let showProduct = false;


            if (categoryName === "first aid") {

                showProduct =
                    productName.includes("first aid");

            }


            else if (categoryName === "health monitoring") {

                showProduct =
                    productName.includes("thermometer") ||
                    productName.includes("oximeter");

            }


            else if (categoryName === "protection") {

                showProduct =
                    productName.includes("gloves");

            }


            else if (categoryName === "patient care") {

                showProduct =
                    productName.includes("pillow") ||
                    productName.includes("hot");

            }


            else if (categoryName === "hygiene") {

                showProduct =
                    productName.includes("gloves");

            }


            else if (categoryName === "home care") {

                showProduct =
                    productName.includes("hot") ||
                    productName.includes("pillow");

            }


            card.style.display =
                showProduct ? "block" : "none";

        });


        document.getElementById("products")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});


// ==========================================
// 18. NAVIGATION - SHOW ALL PRODUCTS
// ==========================================

const productsNav =
    document.querySelector('a[href="#products"]');


productsNav.addEventListener("click", () => {

    const productCards =
        document.querySelectorAll(".product-card");


    productCards.forEach(card => {

        card.style.display = "block";

    });

});


// ==========================================
// 19. INITIALIZE
// ==========================================

updateCartCount();