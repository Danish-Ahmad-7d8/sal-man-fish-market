var CART = JSON.parse(localStorage.getItem("carterCart") || "[]");

function saveCart() {
  localStorage.setItem("carterCart", JSON.stringify(CART));
  renderCartBadge();
  renderCart();
}
function renderCartBadge() {
  document.querySelectorAll("#cartCount").forEach(function(el) {
    el.textContent = CART.reduce(function(n, i) { return n + i.qty; }, 0);
  });
}
function addToCart(id) {
  var found = CART.find(function(i) { return i.id === id; });
  if (found) found.qty++;
  else CART.push({ id: id, qty: 1 });
  saveCart();
  toggleCart(true);
}
function removeFromCart(id) {
  CART = CART.filter(function(i) { return i.id !== id; });
  saveCart();
}
function renderCart() {
  var box = document.querySelector("#cartItems");
  if (!box) return;
  if (!CART.length) {
    box.innerHTML = '<div class="no-results">Your cart is empty.<br>Pick something fresh and it will show up here.</div>';
  } else {
    box.innerHTML = CART.map(function(item) {
      var p = PRODUCTS.find(function(x) { return x._id === item.id; });
      if (!p) return "";
      return '<div class="cart-item"><div><strong>' + p.name + '</strong><br><small>' + item.qty + ' x &#8377;' + Number(p.price).toLocaleString("en-IN") + ' / ' + p.unit + '</small></div><div><strong>&#8377;' + (p.price * item.qty).toLocaleString("en-IN") + '</strong><br><button class="remove-btn" onclick="removeFromCart(\'' + item.id + '\')">Remove</button></div></div>';
    }).join("");
  }
  var total = CART.reduce(function(s, i) {
    var p = PRODUCTS.find(function(x) { return x._id === i.id; });
    return s + (p ? p.price * i.qty : 0);
  }, 0);
  var el = document.querySelector("#cartTotal");
  if (el) el.textContent = "&#8377;" + total.toLocaleString("en-IN");
}
function toggleCart(forceOpen) {
  var d = document.querySelector("#cartDrawer");
  if (!d) return;
  if (forceOpen) d.classList.add("open");
  else d.classList.toggle("open");
  renderCart();
}
function checkout() {
  if (!CART.length) return alert("Your cart is empty!");
  alert("Thank you! Your order has been noted. A seller will contact you soon.");
}
document.addEventListener("DOMContentLoaded", function() {
  renderCartBadge();
  renderCart();
});
