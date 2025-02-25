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
 * Biến đổi kiểu date "dd/mm/yyyy" thành kiểu Date Object
 */
function parseDatee(date) {
    const [day, month, year] = date.split("/").map(Number);
    return new Date(year, month - 1, day);
}
/**
 * Lọc sản phẩm bánh/trà/sữa
 */
function threeColsFilter() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch("http://localhost:3000/products");
            const data = yield res.json();
            const sua_beo_container = document.getElementById("sua-beo");
            const banh_trung_container = document.getElementById("banh_trung");
            const tra_thom_container = document.getElementById("tra_thom");
            //Sắp xếp mảng sp theo "created_at"
            const sortedData = data.sort((a, b) => {
                const aDate = new Date(parseDatee(a.created_at));
                const bDate = new Date(parseDatee(b.created_at));
                return bDate.getTime() - aDate.getTime();
            });
            // Sữa béo
            let sua_beo = sortedData.filter((item) => {
                if (item.category == "Say Cheese THƠM BÉO" ||
                    item.category == "Say Cheese ĐẬM VỊ") {
                    return item;
                }
            });
            sua_beo.splice(3);
            sua_beo.forEach((element) => {
                const prod = `<div class="best-prod">
      <div class="product">
        <div class="overflow-hidden">
          <img src="${element.images[0].url}" alt="" />
          <img class="tag" src="../images/hot.png" alt="" />
        </div>
        <div class="bst-prod-content">
          <a href="">${element.name}</a>
           <a class="category-link" href="">${element.category}</a>
           <p>${element.price}đ</p>
         </div>
        </div>
      </div>`;
                sua_beo_container.innerHTML += prod;
            });
            // Bánh Trứng
            let banh_trung = sortedData.filter((item) => {
                if (item.category == "Bánh trứng gà non HongKong") {
                    return item;
                }
            });
            banh_trung.splice(3);
            banh_trung.forEach((element) => {
                const prod = `<div class="best-prod">
      <div class="product">
        <div class="overflow-hidden">
          <img src="${element.images[0].url}" alt="" />
          <img class="tag" src="../images/hot.png" alt="" />
        </div>
        <div class="bst-prod-content">
          <a href="">${element.name}</a>
           <a class="category-link" href="">${element.category}</a>
           <p>${element.price}đ</p>
         </div>
        </div>
      </div>`;
                banh_trung_container.innerHTML += prod;
            });
            // Trà thơm
            let tra_thom = sortedData.filter((item) => {
                if (item.category == "Say Cheese THANH MÁT") {
                    return item;
                }
            });
            tra_thom.splice(3);
            tra_thom.forEach((element) => {
                const prod = `<div class="best-prod">
      <div class="product">
        <div class="overflow-hidden">
          <img src="${element.images[0].url}" alt="" />
          <img class="tag" src="../images/hot.png" alt="" />
        </div>
        <div class="bst-prod-content">
          <a href="">${element.name}</a>
           <a class="category-link" href="">${element.category}</a>
           <p>${element.price}đ</p>
         </div>
        </div>
      </div>`;
                tra_thom_container.innerHTML += prod;
            });
            console.log(sua_beo);
            // let banh_trung: Product[] = [];
            // let tra_thom: Product[] = [];
            // sortedData.map((item: Product) => {
            //   if (
            //     item.category === "Say Cheese THƠM BÉO" ||
            //     item.category === "Say Cheese ĐẬM VỊ"
            //   ) {
            //     sua_beo.push(item);
            //   } else if (item.category === "Bánh trứng gà non HongKong") {
            //     banh_trung.push(item);
            //     console.log("top bánh trứng:" + top);
            //   } else if (item.category === "Say Cheese THANH MÁT") {
            //     tra_thom.push(item);
            //     console.log("top trà thơm:" + top);
            //   }
            // });
            // sua_beo.forEach((element: Product) => {
            //   const prod = `<div class="best-prod">
            //   <div class="product">
            //     <div class="overflow-hidden">
            //       <img src="${element.images[0].url}" alt="" />
            //       <img class="tag" src="../images/hot.png" alt="" />
            //     </div>
            //     <div class="bst-prod-content">
            //       <a href="">${element.name}</a>
            //        <a class="category-link" href="">${element.category}</a>
            //        <p>${element.price}đ</p>
            //      </div>
            //     </div>
            //   </div>`;
            //   sua_beo_container.innerHTML += prod;
            // });
            // banh_trung.forEach((element: Product) => {
            //   const prod = `<div class="best-prod">
            //       <div class="product">
            //         <div class="overflow-hidden">
            //           <img src="${element.images[0].url}" alt="" />
            //           <img class="tag" src="../images/hot.png" alt="" />
            //         </div>
            //         <div class="bst-prod-content">
            //           <a href="">${element.name}</a>
            //            <a class="category-link" href="">${element.category}</a>
            //            <p>${element.price}đ</p>
            //          </div>
            //         </div>
            //       </div>`;
            //   banh_trung_container.innerHTML += prod;
            // });
            // tra_thom.forEach((element: Product) => {
            //   const prod = `<div class="best-prod">
            //       <div class="product">
            //         <div class="overflow-hidden">
            //           <img src="${element.images[0].url}" alt="" />
            //           <img class="tag" src="../images/hot.png" alt="" />
            //         </div>
            //         <div class="bst-prod-content">
            //           <a href="">${element.name}</a>
            //            <a class="category-link" href="">${element.category}</a>
            //            <p>${element.price}đ</p>
            //          </div>
            //         </div>
            //       </div>`;
            //   tra_thom_container.innerHTML += prod;
            // });
            // const top = filteredProds.slice(-3);
            // top.forEach(
            //   (element: Product) => {
            //     const prod = `<div class="best-prod">
            //       <div class="product">
            //         <div class="overflow-hidden">
            //           <img src="${element.images[0].url}" alt="" />
            //           <img class="tag" src="../images/hot.png" alt="" />
            //         </div>
            //         <div class="bst-prod-content">
            //           <a href="">${element.name}</a>
            //            <a class="category-link" href="">${element.category}</a>
            //            <p>${element.price}đ</p>
            //          </div>
            //         </div>
            //       </div>`;
            //     container.innerHTML += prod;
            //   }
            // );
            // console.log(top);
        }
        catch (error) {
            console.log("Error fetching categories:", error);
        }
    });
}
threeColsFilter();
