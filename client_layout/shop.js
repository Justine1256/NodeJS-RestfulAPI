// shop.js

// Function to fetch all products and display them in the shop page
async function fetchAllProducts() {
  try {
    const response = await fetch("http://localhost:3000/products/");
    const data = await response.json();
    if (data.status) {
      displayProducts(data.result);
    } else {
      console.error("Failed to fetch products");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Function to display products on the shop page
function displayProducts(products) {
  const productList = document.getElementById("alllist");

  productList.innerHTML = ""; // Clear existing products
  products.forEach((product) => {
    const productItem = document.createElement('div');
    productItem.className = 'product';
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
    productList.appendChild(productItem);
  });
}

// Call the function to fetch products when the page loads
document.addEventListener("DOMContentLoaded", fetchAllProducts);
