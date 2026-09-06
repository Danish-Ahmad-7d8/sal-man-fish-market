window.addEventListener("salmanDataLoaded", function () {
  var category = "All", seller = "all", sort = "featured";
  var chips = document.querySelector("#eatingCategories");
  var sellerSel = document.querySelector("#sellerFilter");
  var sortSel = document.querySelector("#sortFilter");
  var grid = document.querySelector("#eatingProducts");
  if (!chips || !grid) return;

  var cats = ["All"].concat([...new Set(PRODUCTS.filter(function(p){ return p.type === "edible"; }).map(function(p){ return p.category; }))]);

  chips.innerHTML = cats.map(function(c){
    return '<button class="chip ' + (c === "All" ? "active" : "") + '" data-cat="' + c + '">' + c + "</button>";
  }).join("");

  PRODUCTS.filter(function(p){ return p.type === "edible"; }).forEach(function(p){
    var name = p.sellerName || "Unknown";
    var exists = Array.from(sellerSel.options).some(function(o){ return o.value === name; });
    if (!exists) sellerSel.insertAdjacentHTML("beforeend", '<option value="' + name + '">' + name + "</option>");
  });

  chips.addEventListener("click", function(e){
    if (!e.target.dataset.cat) return;
    category = e.target.dataset.cat;
    chips.querySelectorAll(".chip").forEach(function(x){ x.classList.remove("active"); });
    e.target.classList.add("active");
    render();
  });
  sellerSel.addEventListener("change", function(e){ seller = e.target.value; render(); });
  sortSel.addEventListener("change", function(e){ sort = e.target.value; render(); });

  function productCard(p){
    var img = p.image ? '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy">' : "";
    return '<div class="product-card"><div class="product-image ' + (p.image ? "" : "no-image") + '">' + img + '</div><div class="product-body"><div class="product-name">' + p.name + '</div><div class="product-seller">Sold by ' + (p.sellerName || "Unknown") + " &bull; " + (p.fresh || "") + '</div><div class="product-row"><div><div class="price">&#8377;' + Number(p.price).toLocaleString("en-IN") + '</div><div class="unit">per ' + p.unit + '</div></div><button class="add-btn" onclick="addToCart(\'' + p._id + '\')">Add</button></div></div></div>';
  }

  function render(){
    var arr = PRODUCTS.filter(function(p){
      return p.type === "edible" && (category === "All" || p.category === category) && (seller === "all" || p.sellerName === seller);
    });
    if (sort === "priceLow") arr.sort(function(a,b){ return a.price - b.price; });
    if (sort === "priceHigh") arr.sort(function(a,b){ return b.price - a.price; });
    grid.innerHTML = arr.length ? arr.map(productCard).join("") : '<div class="empty-state">No edible fish listed yet. Check back soon!</div>';
  }
  render();
});
