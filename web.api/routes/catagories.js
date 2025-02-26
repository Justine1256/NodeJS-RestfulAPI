// http://localhost:3000/categories: viết các routes và server "giao tiếp" với user
var express = require("express");
var router = express.Router();
const categoryController = require("../mongo/category.controller");

/**
 * Render giao diện
 * http://localhost:3000/categories/
 */
router.get("/", async (req, res) => {
  try {
    const result = await categoryController.getAllCategory();
    return res.status(200).json({
      status: true,
      result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(500, {
      status: false,
      message: "Lỗi khi lấy danh sách danh mục",
    });
  }
});

/**
 * Thêm danh mục
 * http://localhost:3000/categories/addcatagory
 */
router.post("/addcatagory", async (req, res) => {
  try {
    let { name } = req.body;

    // Handle URL-encoded data
    if (typeof name === "string" && name.includes("%20")) {
      name = decodeURIComponent(name);
    }

    // Validate required fields
    if (!name || typeof name !== "string") {
      return res.status(400).json({
        status: false,
        message: "Invalid category name",
      });
    }

    // Tạo danh mục mới và thêm vào mảng
    const cateNew = {
      name: name,
    };

    const newCate = await categoryController.addCatagory(cateNew);

    return res.status(200).json({
      status: true,
      data: newCate,
      message: "Thêm danh mục thành công",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(500, {
      status: false,
      message: "Lỗi khi thêm danh mục",
    });
  }
});

/**
 * Cập nhật danh mục
 * // http://localhost:3000/categories/update/1
 */
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    // Kiểm tra những fields bắt buộc
    if (!data.name) {
      return res.status(400).json({
        status: false,
        message: "Missing required fields",
      });
    }
    const newCate = await categoryController.updateCate(data, id);
    return res.status(201).json({
      status: true,
      data: newCate,
      message: "Category update successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(500, {
      status: false,
      message: `Failed to updated category: ${error.message}`,
    });
  }
});

/**
 * Xóa dữ liệu
 * http://localhost:3000/categories/delete/
 */
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await categoryController.deleteCate(id);
    return res.status(200).json({
      status: true,
      message: "Category deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Failed to update category: ", error);
    return res.status(500).json({
      status: false,
      message: `Failed to update category: ${error.message}`,
    });
  }
});

module.exports = router;
