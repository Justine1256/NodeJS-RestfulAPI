//controllers: viết các hàm xử lý chức năng

// thực hiện theo tádc CRUD với collection catagories
const categoryModel = require("./category.model");
const catagoryModel = require("./category.model"); //Cần kết nối collection nào thì import module của collection đó vào

module.exports = { getAllCategory, addCatagory, updateCate, deleteCate };

/**
 * Lấy toàn bộ dữ liệu
 */
async function getAllCategory() {
  try {
    const result = await catagoryModel.find();
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Lỗi lấy dữ liệu danh mục");
  }
}

/**
 * Thêm danh mục
 */
async function addCatagory(data) {
  try {
    const { name } = data;

    if (!name || typeof name !== "string") {
      throw new Error("Invalid category name");
    }

    // Check if category already exists
    const existingCategory = await getAllCategory();
    const categoryExists = existingCategory.some(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );

    if (categoryExists) {
      return res.status(400).json({
        status: false,
        message: "Category already exists",
      });
    }

    // create a new document
    const newCate = new categoryModel({
      name,
    });

    // save the document
    const result = await newCate.save();
    return result;
  } catch (error) {
    console.log(error);
    console.error("Error adding category:", error);
    throw new Error(`Failed to add category: ${error.message}`);
  }
}

/**
 * Cập nhật danh mục
 */
async function updateCate(data, id) {
  try {
    const category = await categoryModel.findById(id);
    if (!category) {
      throw new Error(`Category not found: ${id}`);
    }
    const { name } = data;

    const result = await categoryModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Lỗi cập nhật danh mục");
  }
}

/**
 * Xóa danh mục
 */
async function deleteCate(_id) {
  try {
    const result = await categoryModel.findByIdAndDelete(_id);
    if (!result) {
      throw new Error(`Category not found: ${_id}`);
    }
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Lỗi xóa danh mục");
  }
}
