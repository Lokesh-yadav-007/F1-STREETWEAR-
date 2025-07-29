// CART LOGIC
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

document.addEventListener("DOMContentLoaded", () => {
  const cartList = document.getElementById("cartItems");
  const subtotalSpan = document.getElementById("subtotal");

  if (cartList && subtotalSpan) {
    cartList.innerHTML = "";
    let subtotal = 0;
    cart.forEach((item) => {
      subtotal += item.price;
      const li = document.createElement("li");
      li.innerText = `${item.name} - Rs. ${item.price}`;
      cartList.appendChild(li);
    });
    subtotalSpan.innerText = subtotal;
  }

  const searchInput = document.getElementById("searchBox");
  const emptyState = document.getElementById("emptyState");

  if (searchInput && emptyState) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      if (query && !"f1 black tee".includes(query)) {
        emptyState.style.display = "block";
      } else {
        emptyState.style.display = "none";
      }
    });
  }
});

// GOOGLE SHEETS INTEGRATION
function submitToGoogleSheet(data) {
  fetch("https://script.google.com/macros/s/AKfycbxFqDw8R-CNSNCGQtLb2BV8SOuJ26NrnAUhb3lH44rZotO3lU3kCcJ0EAHTMXpUDKxx/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

// FORM SUBMIT
function handleSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("name")?.value || "N/A";
  const email = document.getElementById("email")?.value || "";
  const password = document.getElementById("password")?.value || "";

  const data = { name, email, password };
  submitToGoogleSheet(data);
  alert("Form submitted!");
}
