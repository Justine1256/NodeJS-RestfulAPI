const list = document.getElementById("alllist");
let categories = [];

// Fetch categories from the server
async function fetchCategories() {
  try {
    const res = await fetch("http://localhost:3000/categories");
    const data = await res.json();
    categories = data.result;
    showCateList(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

// Display categories in the table
const showCateList = (data) => {
  list.innerHTML = ""; // Clear the list before appending new data
  data.forEach((element) => {
    const prod = `
      <tr>
        <td>${element._id}</td>
        <td>${element.name}</td>
        <td class="action-icons">
          <button class="edit-btn" onclick="showEditCateForm('${element._id}')">Edit</button>
          <button class="delete-btn" onclick="deleteCate('${element._id}')">Delete</button>
        </td>
      </tr>
    `;
    list.innerHTML += prod;
  });
};

// Add a new category
async function postCategory() {
  const newCateName = prompt("Add category name");
  if (!newCateName) return alert("Category name cannot be empty.");

  const newCate = { name: newCateName };
  try {
    const res = await fetch("http://localhost:3000/categories/addcatagory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCate),
    });
    const data = await res.json();
    alert(data.message);
    fetchCategories(); // Refresh the category list
  } catch (error) {
    console.error("Error adding category:", error);
  }
}

// Delete a category
const deleteCate = async (id) => {
  if (confirm("Are you sure you want to delete this category?")) {
    try {
      await fetch(`http://localhost:3000/categories/delete/${id}`, {
        method: "DELETE",
      });
      fetchCategories(); // Refresh the category list
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  }
};

// Show edit form
const showEditCateForm = (id) => {
  const category = categories.find((c) => c._id === id);
  if (!category) return alert("Category not found.");

  document.getElementById("editName").value = category.name;
  document.getElementById("category-main").style.display = "none"; // Hide the category table
  document.getElementById("editFormContainer").style.display = "flex"; // Show the edit form

  const formContainer = document.getElementById("editFormContainer");

  formContainer.dataset.cateId = id; // Set the category ID
  const previousBtns = document.querySelectorAll("#editFormContainer > button");

  if (previousBtns.length !== 0) {
    previousBtns.forEach(btn => btn.remove());
  }
  // Create save button
  const saveBtn = document.createElement("button");
  saveBtn.type = "button";
  saveBtn.style.float = "right";
  saveBtn.textContent = "Save Changes";
  saveBtn.onclick = saveEditCate;

  // Create cancel button
  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.style.float = "right";
  cancelBtn.style.marginRight = "10px";
  cancelBtn.style.backgroundColor = "transparent";
  cancelBtn.style.color = "var(--brand-color)";
  cancelBtn.textContent = "Cancel";
  cancelBtn.onclick = cancelEditCate;

  // Append buttons to form container
  formContainer.appendChild(saveBtn);
  formContainer.appendChild(cancelBtn);
};

// Save edited category
const saveEditCate = async () => {
  const id = document.getElementById("editFormContainer").dataset.cateId;
  const name = document.getElementById("editName").value;

  try {
    await fetch(`http://localhost:3000/categories/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    fetchCategories(); // Refresh the category list
    document.getElementById("editFormContainer").style.display = "none";
    document.getElementById("category-main").style.display = "block"; // Show the category table again
  } catch (error) {
    console.error("Error updating category:", error);
  }
};

// Cancel edit
const cancelEditCate = () => {
  document.getElementById("editFormContainer").style.display = "none";
  document.getElementById("category-main").style.display = "block"; // Show the category table again
};

// Initial fetch of categories
fetchCategories();
