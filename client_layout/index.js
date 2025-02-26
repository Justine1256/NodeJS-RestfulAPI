// index.js

// Function to fetch products for the index page
async function fetchFeaturedProducts() {
  try {
    const response = await fetch(
      "http://localhost:3000/products/tags/dac_trung"
    );
    const data = await response.json();
    if (data.status) {
      displayFeaturedProducts(data.filteredProducts);
    } else {
      console.error("Failed to fetch featured products");
    }
  } catch (error) {
    console.error("Error fetching featured products:", error);
  }
}

// Function to display featured products on the index page
function displayFeaturedProducts(products) {
  const featuredSection = document.getElementById("featured-products");
  featuredSection.innerHTML = ""; // Clear existing products
  if (Array.isArray(products)) {
    products.slice(0, 5).forEach((product) => {
      const productItem = document.createElement("div");
      productItem.className = "product";
      productItem.innerHTML = `
          <a href="product-details.html?id=${product.id}">
            <div class="overflow-hidden">
              <img src="http://localhost:3000/images/${product.images[0].url}" alt="" />
              <img class="tag" src="../images/hot.png" alt="" />
            </div>
            <a href="#">${product.name}</a>
            <a class="category-link" href="">${product.category}</a>
            <p>${product.price}đ</p>
            <button class="cartBtn" onclick="addProductToCart(${product.id})">Thêm vào giỏ hàng</button>
          </a>
        </div>`;
      featuredSection.appendChild(productItem);
    });
  } else {
    console.error("No featured products available");
  }
}

// Function to filter and display products by category
async function filterAndDisplayProducts() {
  try {
    const response1 = await fetch(
      "http://localhost:3000/products/cate/679b2a3830a3864da98d9318"
    );

    const products1 = await response1.json();
    console.log("Products for Sữa Béo:", products1);

    displayProductsInSection(products1.filteredProducts, "sua-beo");


    const response2 = await fetch(
      "http://localhost:3000/products/cate/679b2a3830a3864da98d9319"
    );

    const products2 = await response2.json();
    console.log("Products for Bánh Trứng Gà Non:", products2);

    displayProductsInSection(products2.filteredProducts, "banh_trung");

    const response3 = await fetch(
      "http://localhost:3000/products/cate/679b2a3830a3864da98d9317"
    );

    const products3 = await response3.json();
    console.log("Products for Trà Thơm:", products3);

    displayProductsInSection(products3.filteredProducts, "tra_thom");
  } catch (error) {
    console.error("Error filtering products:", error);
  }
}

// Function to display products in a specific section
function displayProductsInSection(products, sectionId) {
  const section = document.getElementById(sectionId);
  if (Array.isArray(products) && products.length > 0) {
    products.slice(0, 3).forEach((product) => {
      const productItem = document.createElement("div");
      productItem.innerHTML = `
          <a href="product-details.html?id=${product.id}">
      <div class="best-prod" role="article">
      <div class="product">
        <div class="overflow-hidden">
          <img src="http://localhost:3000/images/${product.images[0].url}" alt="${product.images[0].alt}" />
          <img class="tag" src="../images/hot.png" alt="Hot product tag" />
        </div>
        <div class="bst-prod-content">
          <a href="product-details.html?id=${product.id}">${product.name}</a>
           <a class="category-link" href="">${product.category}</a>
           <div style="display:flex; align-items: center; justify-content: space-between;">
            <p>${product.price}đ</p>
            <button class="cartBtn" onclick="addProductToCart(${product.id})"><i class="bi bi-cart-fill"></i></button>
           </div>
         </div>
        </div>
      </div>
       </a>`; 
      section.appendChild(productItem);
    });
  } else {
    section.innerHTML = "<p>No products available in this category.</p>";
  }
}

// Call the function to fetch featured products when the page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchFeaturedProducts();
  filterAndDisplayProducts(); // Call to filter and display products by category
});
