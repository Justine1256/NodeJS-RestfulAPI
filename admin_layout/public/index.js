async function getAllPro() {
  const response = await fetch("http://localhost:3000/products");
  const data = await response.json();
  console.log(data); // Log the entire response for inspection

  let kq = "";
  let stt = 1;
  data.result.map((item) => {
    kq += `<tr>
                <td>${stt}</td>
                <td class="display-flex">
                  <img src="http://localhost:3000/images/${item.images[0].url}" alt="" style="width: 50px" />
                  <div style="text-align: left">
                    <a>${item.name}</a> <br>
                    <span>${item.category}</span>
                  </div>
                </td>
                <td style="color: var(--brand-color)">${item.stock}</td>
                <td>${item.price}</td>
                <td style="color: var(--brand-color)">${item.ordered}</td>
                <td><span>${item.likes}</span></td>
                <td>
                  <button class="edit-btn" onclick="showEditForm('${item._id}')">Edit</button>
                    <button class="delete-btn" onclick="deleteProduct('${item._id}')">Delete</button>

                </td>
              </tr>`;
    stt++;
  });
  const alllist = document.getElementById("alllist");
  if (alllist) {
    alllist.innerHTML = kq;
  } else {
    console.log('Không tìm thấy container với id="alllist"');
  }
}
getAllPro();

/**
 * Show dữ liệu danh mục
 */
async function getAllCate() {
  const response = await fetch("http://localhost:3000/catagories");
  const data = await response.json();
  console.log(data);
  let kq = `<option value="0">-- Select category --</option>`;
  data.result.map((item) => {
    kq += `<option value="${item._id}">${item.name}</option>`;
  });
  document.getElementById("category").innerHTML = kq;
}
// getAllCate();

/**
 * Lấy các thẻ tags được chọn
 */
const getSelectedTags = () => {
  const checkboxes = document.querySelectorAll('input[name="tag"]');
  console.log(checkboxes);

  const selectedValues = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedValues.push(checkbox.value);
    }
  });
  console.log(selectedValues);

  return selectedValues;
};
/**
 * Thêm sản phẩm
 */
async function addPro() {
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;
  const tag = getSelectedTags();
  const image = document.getElementById("image").files[0];

  // Input validation
  if (!name || !description || !category || !price || !stock) {
    console.error("All fields must be filled out.");
    return;
  }

  if (!image) {
    console.error("An image file must be selected.");
    return;
  }

  const data = new FormData();

  data.append("name", name);
  data.append("description", description);
  data.append("category", category);
  data.append("price", price);
  data.append("stock", stock);
  data.append("image", image);
  data.append("likes", 0);
  data.append("ordered", 0);
  data.append("tags", [tag]);
  data.append("created_at", new Date().toISOString());

  // Log FormData contents
  for (let [key, value] of data.entries()) {
    console.log(`${key}:`, value);
  }

  const response = await fetch("http://localhost:3000/products/addpro", {
    method: "POST",
    body: data,
    headers: {
      Accept: "multipart/form-data",
    },
  });
  const result = await response.json();
  if (!response.ok) {
    console.error("Error adding product:", result.message);
    return;
  }
  if (!response.ok) {
    console.error("Error updating product:", result.message);
    alert(`Error updating product: ${result.message}`);
    return;
  }
  console.log("Product updated successfully:", result);
  alert("Product updated successfully!");
  window.location.href = "products.html";
}
const addProBtn = document.getElementById("addProductBtn");

/**
 * Edit product
 */
async function editProduct(id) {
  try {
    const name = document.getElementById("editName").value;
    const description = document.getElementById("editDescription").value;
    const category = document.getElementById("editCategory").value;
    const price = document.getElementById("editPrice").value;
    const stock = document.getElementById("editStock").value;
    const tag = getSelectedTags();
    const image = document.getElementById("editImage").files[0];

    const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("category", category);
    data.append("price", price);
    data.append("stock", stock);
    if (image) {
      data.append("image", image);
    }
    data.append("tags", [tag]);
    data.append("created_at", new Date().toISOString());

    const response = await fetch(
      `http://localhost:3000/products/updatepro/${id}`,
      {
        method: "PUT",
        body: data,
        headers: {
          Accept: "multipart/form-data",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Error updating product:", result.message);
      alert(`Error updating product: ${result.message}`);
      return;
    }

    console.log("Product updated successfully:", result);
    alert("Product updated successfully!");
    window.location.href = "products.html"; // Uncomment this line to enable redirection after successful update


  } catch (error) {
    console.error("Error during product update:", error);
    alert("An error occurred while updating the product");
  }
}

/**
 * Delete product
 */
async function deleteProduct(id) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this product?"
  );
  if (!confirmDelete) return;

  const response = await fetch(
    `http://localhost:3000/products/deletepro/${id}`,
    {
      method: "DELETE",
    }
  );

  const result = await response.json();
  if (!response.ok) {
    console.error("Error deleting product:", result.message);
    return;
  }
  console.log(result);
  window.location.reload();
}

/**
 * Show edit form with product data
 */
async function showEditForm(id) {
  const response = await fetch(`http://localhost:3000/products/${id}`);
  const result = await response.json();

  if (!result || !result.data) {
    alert("Product not found: " + id);
    return;
  }

  const product = result.data;
  console.log(product);

  // Fill the edit form with default values if data is undefined
  document.getElementById("editName").value = product.name || "";

  document.getElementById("editDescription").value = product.description || "";
  document.getElementById("editStock").value = product.stock || 0;
  document.getElementById("editPrice").value = product.price || 0;
  // Set category select value
  const categorySelect = document.getElementById("editCategory");
  if (categorySelect) {
    categorySelect.value = product.category || "";
  }

  // Set tags with empty array as fallback
  const tags = Array.isArray(product.tags) ? product.tags : [];

  document.getElementById("editNewItem").checked = tags.includes("Món mới");
  document.getElementById("editSignature").checked = tags.includes("Đặc trưng");
  document.getElementById("editBestSeller").checked = tags.includes("Bán chạy");

  // Show the form
  const formContainer = document.getElementById("editFormContainer");
  const mainContent = document.getElementById("products-main");

  if (formContainer && mainContent) {
    formContainer.dataset.productId = id;
    mainContent.style.display = "none";
    formContainer.style.display = "block";
  }

  // Create save button
  const saveBtn = document.createElement("button");
  saveBtn.type = "button";
  saveBtn.style.float = "right";
  saveBtn.textContent = "Save Changes";
  saveBtn.onclick = () => saveEdit(id);

  // Create cancel button
  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.style.float = "right";
  cancelBtn.style.marginRight = "10px";
  cancelBtn.style.backgroundColor = "transparent";
  cancelBtn.style.color = "var(--brand-color)";
  cancelBtn.textContent = "Cancel";
  cancelBtn.onclick = cancelEdit;

  // Append buttons to form container
  formContainer.appendChild(saveBtn);
  formContainer.appendChild(cancelBtn);
}

/**
 * Save edited product
 */
async function saveEdit() {
  const formContainer = document.getElementById("editFormContainer");
  const productId = formContainer?.dataset.productId;

  if (productId) {
    await editProduct(productId);
  }
}

/**
 * Cancel editing and return to product list
 */
function cancelEdit() {
  const formContainer = document.getElementById("editFormContainer");
  const mainContent = document.getElementById("products-main");

  if (formContainer && mainContent) {
    formContainer.style.display = "none";
    mainContent.style.display = "block";
  }
}

// Attach event listeners to edit/delete buttons
document.addEventListener("DOMContentLoaded", () => {
  const editButtons = document.querySelectorAll(".edit-btn");
  const deleteButtons = document.querySelectorAll(".delete-btn");

  editButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = e.target.dataset.id;
      // Open edit modal with product data
      openEditModal(productId);
    });
  });

  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = e.target.dataset.id;
      deleteProduct(productId);
    });
  });
});
