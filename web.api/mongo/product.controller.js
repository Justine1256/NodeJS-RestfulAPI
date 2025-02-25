//controllers: viết các hàm xử lý chức năng

// thực hiện theo tádc CRUD với collection products
const productModel = require("./product.model"); //Cần kết nối collection nào thì import module của collection đó vào
const categoryModel = require("./category.model"); //Cần kết nối collection nào thì import module của collection đó vào

module.exports = {
  getAllProduct,
  addProduct,
  getDetailProduct,
  updateProdut,
  deleteProduct,
  filterProduct,
  signatureProducts,
  showPageProducts,
  findProduct,deleteFilteredProducts
};

/**
 * Lấy toàn bộ dữ liệu
 */
async function getAllProduct() {
  try {
    // select * from products
    const result = await productModel.find();

    // Lấy 5 sản phẩm rẻ nhất: find() lấy toàn bộ
    const topFive = await productModel.find().limit(5).sort({ price: 1 }); // sort(1) là tăng dần; sort(-1) là giảm dần

    // select name, price from products
    const result1 = await productModel.find({}, { name: 1, price: 1 });

    // select name, price from products where price > 2000
    const result2 = await productModel.find(
      {
        price: { $gt: 2000 }, // $lt: less than || $gte: greater than or equal || $lte: less than or equal
      },
      { name: 1, price: 1 }
    );

    // select * from products where price >2000  and quantity < 50
    const result3 = await productModel.find({
      and: [{ price: { $gt: 2000 } }, { quantity: { $lt: 50 } }],
    });

    // or
    // select * from products like like '%%'
    const result4 = await productModel.find({
      name: {
        $regex: "phê đá", //find names with letter a
        $options: "i", // i for case insensitive
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Lỗi lấy dữ liệu sản phẩm");
  }
}

/**
 * Lấy chi tiết sản phẩm
 */
async function getDetailProduct(id) {
  const mongoose = require("mongoose");
  const { ObjectId } = mongoose.Types;

  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }

  try {
    const result = await productModel.findById(id);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Lỗi lấy dữ liệu sản phẩm");
  }
}

/**
 * Lấy danh sách sản phẩm theo danh mục
 */
async function filterProduct(id) {
  try {
    // Verify category exists
    const selectedCategory = await categoryModel.findById(id);
    if (!selectedCategory) {
      throw new Error(`Category not found: ${id}`);
    }

    const categoryName = selectedCategory.name;

    // Find products by category ID
    const filteredProducts = await productModel.find({
      category: categoryName,
    });

    return filteredProducts;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting products");
  }
}

/**
 * Lấy danh sách sản phẩm nổi bật
 */
async function signatureProducts() {
  try {
    // Find products by tag "Đặc trưng"
    const filteredProducts = await productModel.find({
      tags: { $in: ["Đặc trưng"] },
    });

    return filteredProducts;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting products");
  }
}

/**
 * Lấy danh sách sản phẩm theo trang và giới hạn số lượng
 */
async function showPageProducts(currentPage) {
  try {
    var productsPerPage = 10;
    var startIndex = (currentPage - 1) * productsPerPage;
    var endIndex = startIndex + productsPerPage;
    const pageProducts = (await productModel.find()).slice(
      startIndex,
      endIndex
    );
    return pageProducts;
  } catch (e) {
    console.log(error);
    throw new Error("Error getting products");
  }
}

/**
 * Tìm kiếm sản phẩm theo tên
 */
async function findProduct(searchTerm) {
  try {
    const results = await productModel.find({
      name: {
        $regex: searchTerm, // This will find any product name that contains the searchTerm
        $options: "i",
      }, // Case-insensitive search
    });
    if (results.length == 0) {
      return "No results found";
    } else {
      return results;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error finding products");
  }
}

/**
 * Tìm và xóa sản phẩm theo tên
 */
async function deleteFilteredProducts(searchTerm) {
  try {
    const filteredProducts = await productModel.findOneAndDelete({
      name: searchTerm, // This will find any product name that exactly matches the searchTerm
    });

    if (!filteredProducts) {
      return "No products found to delete";
    } else {
      return "Product deleted successfully";
    }

    return filteredProducts;
  } catch (error) {
    console.log(error);
    throw new Error("Error finding products");
  }
}
/**
 * Thêm sản phẩm
 */
async function addProduct(data) {
  try {
    const {
      name,
      description,
      category,
      price,
      quantity,
      stock,
      images,
      ratings,
      tags,
      created_at,
    } = data;

    // Verify category exists
    const categoryExists = await categoryModel.findById(category);
    if (!categoryExists) {
      throw new Error(`Category with ID ${category} not found`);
    }

    // Format images array correctly
    const formattedImages = Array.isArray(images)
      ? images
      : [
          {
            // If images is an array: returns the original images array | If images is not an array: creates a new array with one image object
            url: images,
            alt: description || name,
          },
        ];

    // create a new document
    const newPro = new productModel({
      name,
      description,
      category,
      price,
      quantity,
      stock: Number(stock),
      images: formattedImages,
      ratings,
      tags,
      created_at,
    });
    // save the document
    const result = await newPro.save();
    return result;
  } catch (error) {
    console.log(error);
    console.error("Error adding product:", error);
    throw new Error(`Failed to add product: ${error.message}`);
  }
}

/**
 * Cập nhật sản phẩm
 */
async function updateProdut(data, id) {
  try {
    const product = await productModel.findById(id);
    if (!product) {
      throw new Error(`Product not found: ${id}`);
    }
    const { name, description, image, price, quantity, category } = data;

    let categoryFind = null;
    if (category) {
      categoryFind = await categoryModel.findById(category);
    }
    let categoryUpdate = categoryFind //if user updated category (categoryFind is true) then update new category, else get old category
      ? {
          id: category.id,
          name: categoryFind.name,
        }
      : product.category;
    const result = await productModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        image,
        price,
        quantity,
        stock: Number(data.stock),
        images: [
          {
            url: data.images[0].url,
            alt: description || name,
          },
        ],
        ratings: data.ratings,
        tags: data.tags,
        created_at: data.created_at,
        category: categoryUpdate,
      },
      { new: true }
    );
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Lỗi cập nhật sản phẩm");
  }
}

/**
 * Xóa sản phẩm
 */
async function deleteProduct(id) {
  try {
    const result = await productModel.findByIdAndDelete(id);
    if (!result) {
      throw new Error(`Product not found: ${id}`);
    }
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Lỗi xóa sản phẩm");
  }
}
