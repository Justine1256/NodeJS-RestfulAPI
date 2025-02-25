async function getAllPro() {
  const response = await fetch("http://localhost:3000/products");
  const data = await response.json();
  console.log(data);
  
  let kq = "";
  let stt = 1;
  data.result.map((item) => {
    kq += `<tr>
                <td>${stt}</td>
                <td class="display-flex">
                  <img src="http://localhost:3000/images/${item.image}" alt="" style="width: 50px" />
                  <div>
                    <a>${item.name}</a>
                    <span>${item.category}</span>
                  </div>
                </td>
                <td style="color: var(--brand-color)">${item.stock}</td>
                <td>${item.price}</td>
                <td style="color: var(--brand-color)">${item.order}</td>
                <td><span>view</span></td>
                <td>
                  <a href="">Edit</a>
                  <a href="">Disable</a>
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
  const checkboxes =
    document.querySelectorAll < HTMLInputElement > 'input[name="tag"]';
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
// getSelectedTags()
/**
 * Thêm sản phẩm
 */
async function addPro() {
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;
  // const tag = getSelectedTags();
  const image = document.getElementById("image").files[0];

  const data = new FormData();
  data.append("name", name);
  data.append("description", description);
  data.append("category", category);
  data.append("price", price);
  data.append("stock", stock);
  data.append("image", image);
  data.append("ratings", 0);
  // data.append("tags", tag);
  // data.append("created_at", new Date().toISOString());

  console.log(data);
  

  const response = await fetch("http://localhost:3000/products/addpro", {
    method: "POST",
    body: data,
    headers: {
      "Accept": "multipart/form-data",
    },
  });


  const result = await response.json();
  if (!response.ok) {
    console.error('Error adding product:', result.message);
    return;
  } 
  console.log(result);
  window.location.href = "/admin_layout/public/products.html";
}
// const addProBtn = document.getElementById('addProductBtn');
// addProBtn.addEventListener("click", addPro);
