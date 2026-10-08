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

  cart.forEach(function(product) {

    const productElement = document.createElement("div");

    productElement.innerHTML = `
      <h3>${product.name}</h3>
      <p>Variant: ${product.variant}</p>
      <p>€${product.price.toFixed(2)}</p>
    `;

    cartContainer.appendChild(productElement);

    total += product.price;
  });

  totalElement.textContent = total.toFixed(2);
}


// Run displayCart when the page loads.
displayCart();
