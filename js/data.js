let SELLERS = [];
let PRODUCTS = [];

async function initSanityData() {
  try {
    if (typeof sanityClient === "undefined") throw new Error("Sanity client not found");
    
    const query = `{
      "sellers": *[_type == "seller"],
      "products": *[_type == "product"]
    }`;
    
    const data = await sanityClient.fetch(query);

    SELLERS = data.sellers && data.sellers.length ? data.sellers : [];
    PRODUCTS = data.products && data.products.length ? data.products : [];
    
    console.log("Loaded data from Sanity!");
  } catch (err) {
    console.warn("Failed to load from Sanity, starting blank.", err);
    SELLERS = [];
    PRODUCTS = [];
  }

  // Dispatch custom event to initialize all other scripts
  window.dispatchEvent(new Event("salmanDataLoaded"));
}

document.addEventListener("DOMContentLoaded", initSanityData);

function getSeller(name) { return SELLERS.find((s) => s.name === name); }
function getProduct(id) { return PRODUCTS.find((p) => p._id === id); }
function assetUrl(path) {
  if (!path) return "";
  if (/^(https?:|data:|blob:|\/)/.test(path)) return path;
  return location.pathname.includes("/pages/")
    ? "../" + path.replace(/^\.\//, "")
    : path.replace(/^\.\//, "");
}
