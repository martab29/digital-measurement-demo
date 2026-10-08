// Get the current cart from the browser.
// If no cart exists yet, create an empty array.
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Add a product to the cart.
function addToCart(product) {

  cart.push(product);

  // Save the updated cart in the browser.
  localStorage.setItem("cart", JSON.stringify(cart));

  alert(product.name + " was added to your cart.");
}


// Remove a product from the cart.
function removeFromCart(index) {

  cart.splice(index, 1);

  // Save the updated cart.
  localStorage.setItem("cart", JSON.stringify(cart));

  // Refresh the cart displayed on the page.
  displayCart();
}


// Display the cart on cart.html.
function displayCart() {

  const cartContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");

  // If we are not on the cart page, stop here.
  if (!cartContainer || !totalElement) {
    return;
  }

  // Empty cart.
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


// Run displayCart when the page loads.
displayCart();
// Display the order summary on checkout.html.
function displayCheckout() {

  const checkoutContainer = document.getElementById("checkout-items");
  const checkoutTotal = document.getElementById("checkout-total");

  if (!checkoutContainer || !checkoutTotal) {
    return;
  }

  // Do not allow checkout with an empty cart.
  if (cart.length === 0) {
    checkoutContainer.innerHTML = "<p>Your cart is empty.</p>";
    checkoutTotal.textContent = "0.00";

    const form = document.getElementById("checkout-form");

    if (form) {
      form.style.display = "none";
    }

    return;
  }

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


// Complete the order.
const checkoutForm = document.getElementById("checkout-form");

if (checkoutForm) {

  checkoutForm.addEventListener("submit", function(event) {

    // Prevent the browser from submitting the form normally.
    event.preventDefault();

    const total = cart.reduce(function(sum, product) {
      return sum + product.price;
    }, 0);

    // Create a simple unique transaction ID for this demo.
    const order = {
      transactionId: "ORDER-" + Date.now(),
      items: cart,
      total: total
    };

    // Save the completed order so purchase.html can access it.
    localStorage.setItem("lastOrder", JSON.stringify(order));

    // Empty the cart after the purchase.
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));

    // Go to the confirmation page.
    window.location.href = "purchase.html";

  });

}


// Display the completed order on purchase.html.
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
    return;
  }

  orderIdElement.textContent = order.transactionId;

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


displayCheckout();
// Display the order summary on checkout.html.
function displayCheckout() {

  const checkoutContainer = document.getElementById("checkout-items");
  const checkoutTotal = document.getElementById("checkout-total");

  if (!checkoutContainer || !checkoutTotal) {
    return;
  }

  // Do not allow checkout with an empty cart.
  if (cart.length === 0) {
    checkoutContainer.innerHTML = "<p>Your cart is empty.</p>";
    checkoutTotal.textContent = "0.00";

    const form = document.getElementById("checkout-form");

    if (form) {
      form.style.display = "none";
    }

    return;
  }

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


// Complete the order.
const checkoutForm = document.getElementById("checkout-form");

if (checkoutForm) {

  checkoutForm.addEventListener("submit", function(event) {

    // Prevent the browser from submitting the form normally.
    event.preventDefault();

    const total = cart.reduce(function(sum, product) {
      return sum + product.price;
    }, 0);

    // Create a simple unique transaction ID for this demo.
    const order = {
      transactionId: "ORDER-" + Date.now(),
      items: cart,
      total: total
    };

    // Save the completed order so purchase.html can access it.
    localStorage.setItem("lastOrder", JSON.stringify(order));

    // Empty the cart after the purchase.
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));

    // Go to the confirmation page.
    window.location.href = "purchase.html";

  });

}


// Display the completed order on purchase.html.
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
    return;
  }

  orderIdElement.textContent = order.transactionId;

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


displayCheckout();


// Display the order summary on checkout.html.
function displayCheckout() {

  const checkoutContainer = document.getElementById("checkout-items");
  const checkoutTotal = document.getElementById("checkout-total");

  if (!checkoutContainer || !checkoutTotal) {
    return;
  }

  // Do not allow checkout with an empty cart.
  if (cart.length === 0) {
    checkoutContainer.innerHTML = "<p>Your cart is empty.</p>";
    checkoutTotal.textContent = "0.00";

    const form = document.getElementById("checkout-form");

    if (form) {
      form.style.display = "none";
    }

    return;
  }

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


// Complete the order.
const checkoutForm = document.getElementById("checkout-form");

if (checkoutForm) {

  checkoutForm.addEventListener("submit", function(event) {

    // Prevent the browser from submitting the form normally.
    event.preventDefault();

    const total = cart.reduce(function(sum, product) {
      return sum + product.price;
    }, 0);

    // Create a simple unique transaction ID for this demo.
    const order = {
      transactionId: "ORDER-" + Date.now(),
      items: cart,
      total: total
    };

    // Save the completed order so purchase.html can access it.
    localStorage.setItem("lastOrder", JSON.stringify(order));

    // Empty the cart after the purchase.
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));

    // Go to the confirmation page.
    window.location.href = "purchase.html";

  });

}


// Display the completed order on purchase.html.
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
    return;
  }

  orderIdElement.textContent = order.transactionId;

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


displayCheckout();
displayPurchase();
