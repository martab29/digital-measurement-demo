// Get the current cart from the browser.
// If no cart exists yet, create an empty array.
let cart = JSON.parse(localStorage.getItem("cart")) || [];
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");

  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

// ADD PRODUCT TO CART
function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Product added to cart.");
}


// REMOVE PRODUCT FROM CART
function removeFromCart(index) {

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  displayCart();
}


// DISPLAY CART
function displayCart() {

  const cartContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");

  if (!cartContainer || !totalElement) {
    return;
  }

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalElement.textContent = "0.00";
    return;
  }

  cartContainer.innerHTML = "";

  let total = 0;

  cart.forEach(function(product, index) {

    const productElement = document.createElement("div");

    productElement.innerHTML = `
      <h3>${product.name}</h3>
      <p>Variant: ${product.variant}</p>
      <p>€${product.price.toFixed(2)}</p>

      <button type="button" onclick="removeFromCart(${index})">
        Remove
      </button>
    `;

    cartContainer.appendChild(productElement);

    total += product.price;
  });

  totalElement.textContent = total.toFixed(2);
}


// DISPLAY CHECKOUT
function displayCheckout() {

  const checkoutContainer = document.getElementById("checkout-items");
  const checkoutTotal = document.getElementById("checkout-total");

  if (!checkoutContainer || !checkoutTotal) {
    return;
  }

  if (cart.length === 0) {

    checkoutContainer.innerHTML = "<p>Your cart is empty.</p>";
    checkoutTotal.textContent = "0.00";

    const form = document.getElementById("checkout-form");

    if (form) {
      form.style.display = "none";
    }

    return;
  }

  checkoutContainer.innerHTML = "";

  let total = 0;

  cart.forEach(function(product) {

    const productElement = document.createElement("div");

    productElement.innerHTML = `
      <p>
        ${product.name} (${product.variant}) — €${product.price.toFixed(2)}
      </p>
    `;

    checkoutContainer.appendChild(productElement);

    total += product.price;
  });

  checkoutTotal.textContent = total.toFixed(2);
}


// CHECKOUT FORM
const checkoutForm = document.getElementById("checkout-form");

if (checkoutForm) {

  checkoutForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const total = cart.reduce(function(sum, product) {
      return sum + product.price;
    }, 0);

    const order = {
      transactionId: "ORDER-" + Date.now(),
      items: cart,
      total: total
    };

    // Save completed order.
    localStorage.setItem("lastOrder", JSON.stringify(order));

    // Empty cart.
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));

    // Open confirmation page.
    window.location.href = "purchase.html";

  });
}


// DISPLAY PURCHASE
function displayPurchase() {

  const orderIdElement = document.getElementById("order-id");
  const purchaseContainer = document.getElementById("purchase-items");
  const purchaseTotal = document.getElementById("purchase-total");

  if (!orderIdElement || !purchaseContainer || !purchaseTotal) {
    return;
  }

  const order = JSON.parse(localStorage.getItem("lastOrder"));

  if (!order) {
    purchaseContainer.innerHTML = "<p>No recent order found.</p>";
    purchaseTotal.textContent = "0.00";
    return;
  }

  orderIdElement.textContent = order.transactionId;

  purchaseContainer.innerHTML = "";

  order.items.forEach(function(product) {

    const productElement = document.createElement("div");

    productElement.innerHTML = `
      <p>
        ${product.name} (${product.variant}) — €${product.price.toFixed(2)}
      </p>
    `;

    purchaseContainer.appendChild(productElement);

  });

  purchaseTotal.textContent = order.total.toFixed(2);
}


// RUN FUNCTIONS
displayCart();
displayCheckout();
displayPurchase();
updateCartCount();
