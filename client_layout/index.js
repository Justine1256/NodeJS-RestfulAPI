"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Hiển thị danh sách sản phẩm
 */
const alllist = document.querySelector("#alllist");
const showProductList = (data) => {
    data.forEach((element) => {
        const prod = `
      <div class="product">
        <a href="product-details.html?id=${element.id}">
          <div class="overflow-hidden">
            <img src="${element.images[0].url}" alt="" />
            <img class="tag" src="../images/hot.png" alt="" />
          </div>
          <a href="#">${element.name}</a>
          <a class="category-link" href="">${element.category}</a>
          <p>${element.price}đ</p>
          <button class="cartBtn" data="${element.id}">Thêm vào giỏ hàng</button>
        </a>
      </div>
          `;
        alllist.innerHTML += prod;
    });
};
/**
 * Hiển thị danh sách 5 sản phẩm mới nhất
 */
const newlist = document.querySelector("#newlist");
const show5newest = (data) => {
    //Sắp xếp mảng sp theo "created_at"
    const sortedData = data.sort((a, b) => {
        const aDate = new Date(parseDate(a.created_at));
        const bDate = new Date(parseDate(b.created_at));
        return bDate.getTime() - aDate.getTime();
    });
    const newest = sortedData.slice(-5);
    console.log(newest);
    newest.forEach((element) => {
        const prod = `
      <div class="product">
        <a href="product-details.html?id=${element.id}">
          <div class="overflow-hidden">
            <img src="${element.images[0].url}" alt="" />
            <img class="tag" src="../images/hot.png" alt="" />
          </div>
          <a href="#">${element.name}</a>
          <a class="category-link" href="">${element.category}</a>
          <p>${element.price}đ</p>
          <button class="cartBtn" data="${element.id}">Thêm vào giỏ hàng</button>
        </a>
      </div>
          `;
        newlist.innerHTML += prod;
    });
};
/**
 * Biến đổi kiểu date "dd/mm/yyyy" thành kiểu Date Object
 */
function parseDate(date) {
    const [day, month, year] = date.split("/").map(Number);
    return new Date(year, month - 1, day);
}
/**
 * Hiển thị danh sách danh mục ở select
 */
const showCateListMenu = (data) => {
    const list = document.querySelectorAll(".menu-cate");
    list.forEach((item) => {
        data.forEach((element) => {
            const cate = `
            <li>
            <a href="shop.html?id=${element.id}">${element.name}</a>
            </li>
            `;
            item.innerHTML += cate;
        });
    });
};
/**
 * Lấy dữ liệu bảng sản phẩm từ API và chạy hàm showProducts
 */
function getProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch("http://localhost:3000/products");
            const data = yield res.json();
            showProductList(data);
            show5newest(data);
        }
        catch (error) {
            console.log("Error fetching products:", error);
        }
    });
}
getProducts();
/**
 * Lấy dữ liệu bảng danh mục từ API và chạy hàm showCateListMenu
 */
function getCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch("http://localhost:3000/category");
            const data = yield res.json();
            showCateListMenu(data);
        }
        catch (error) {
            console.log("Error fetching categories:", error);
        }
    });
}
/**
* Lấy param id từ url
*/
const getProductId = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};
const id = getProductId("id");
/**
* Hiển thị chi tiết sản phẩm
*/
const container = document.querySelector(".product-details");
const showDetails = (data) => {
    let details = `
  <div>
      <img src="${data.images[0].url}" width="500" height="400" />
      <div class="detail-img">
        <a href="">
          <img src="../images/detail-img.jpg" width="100" height="100" />
        </a>
        <a href="">
          <img src="../images/detail-img2.jpg" width="100" height="100" />
        </a>
        <a href="">
          <img src="../images/detail-img3.jpg" width="100" height="100" />
        </a>
        <a href="">
          <img src="../images/detail-img4.jpg" width="100" height="100" />
        </a>
      </div>
    </div>
    <div class="details">
      <div>
        <h1>${data.name}</h1>
        <p class="">${data.category}</p>
        <div>
          <img src="../images/star.png" width="13" height="13" />
          <img src="../images/star.png" width="13" height="13" />
          <img src="../images/star.png" width="13" height="13" />
          <img src="../images/star.png" width="13" height="13" />
          <img src="../images/star.png" width="13" height="13" />
        </div>
        <p class="price">${data.price}</p>
        <p>${data.description}</p>
      </div>
      <div class="btn">
        <button>Mua ngay</button>
        <button>Thêm vào giỏ hàng</button>
      </div>
      <div class="prod-social">
        <a href="#" id="facebook">
          <img src="../images/facebook.png" width="13" height="13" />
          Like
        </a>
        <a href="#" id="twitter">
          <img src="../images/twitter.png" width="13" height="13" />
          Tweet
        </a>
        <a href="#" id="pinterest">
          <img src="../images/pinterest.png" width="13" height="13" />
          Save
        </a>
        <a href="#" id="instagram">
          <img src="../images/instagram.png" width="13" height="13" />
          Share
        </a>
        <a href="#" id="google-plus">
          <img src="../images/google-plus.png" width="16" height="16" />
          Share
        </a>
      </div>
    </div>
  `;
    container.innerHTML = details;
};
/**
* Lấy dữ liệu chi tiết sản phẩm theo id
*/
function getProductsDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id) {
            console.error("Product ID is not available.");
            return;
        }
        try {
            const res = yield fetch(`http://localhost:3000/products/${id}`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = yield res.json();
            console.log(data);
            showDetails(data);
        }
        catch (error) {
            console.log("Error fetching product details:", error);
        }
    });
}
getProductsDetails();
