// import { parseDate } from "../index";
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  images: { url: any }[];
}
/**
 * Biến đổi kiểu date "dd/mm/yyyy" thành kiểu Date Object
 */
function parseDatee(date: string) {
  const [day, month, year] = date.split("/").map(Number);
  return new Date(year, month - 1, day);
}
/**
 * Lọc sản phẩm bánh/trà/sữa
 */
async function threeColsFilter() {
  try {
    const res = await fetch("http://localhost:3000/products");
    const data = await res.json();
    const sua_beo_container = document.getElementById("sua-beo") as HTMLElement;
    const banh_trung_container = document.getElementById(
      "banh_trung"
    ) as HTMLElement;
    const tra_thom_container = document.getElementById(
      "tra_thom"
    ) as HTMLElement;

    //Sắp xếp mảng sp theo "created_at"
    const sortedData = data.sort(
      (a: { created_at: string }, b: { created_at: string }) => {
        const aDate: Date = new Date(parseDatee(a.created_at));
        const bDate: Date = new Date(parseDatee(b.created_at));
        return bDate.getTime() - aDate.getTime();
      }
    );
    // Sữa béo
    let sua_beo: Product[] = sortedData.filter((item: Product) => {
      if (
        item.category == "Say Cheese THƠM BÉO" ||
        item.category == "Say Cheese ĐẬM VỊ"
      ) {
        return item;
      }
    });
    sua_beo.splice(3);
    sua_beo.forEach((element: Product) => {
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
    let banh_trung: Product[] = sortedData.filter((item: Product) => {
      if (
        item.category == "Bánh trứng gà non HongKong"
      ) {
        return item;
      }
    });
    banh_trung.splice(3);
    banh_trung.forEach((element: Product) => {
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
    let tra_thom: Product[] = sortedData.filter((item: Product) => {
      if (
        item.category == "Say Cheese THANH MÁT"
      ) {
        return item;
      }
    });
    tra_thom.splice(3);
    tra_thom.forEach((element: Product) => {
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
  } catch (error) {
    console.log("Error fetching categories:", error);
  }
}
threeColsFilter();
