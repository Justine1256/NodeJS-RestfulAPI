// http://localhost:3000/products
var express = require("express");
var router = express.Router();
const productController = require("../mongo/product.controller");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/"); //Quy định vị trí lưu file
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //Quy định tên file theo đúng tên file của ng dùng gửi
  },
});

/**
 * Kiểm tra đúng kiểu file ảnh
 */
const checkFile = function (req, file, cb) {
  if (file.originalname.match(/\.(jpg|png|jpeg|gif|webp)$/)) {
    cb(false, "Vui lòng gửi file ảnh");
  }
  return cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: checkFile });

/**
 * Tìm kiếm sản phẩm
 * http://localhost:3000/products/search?term=[searchTerm]
 */
router.get("/search", async (req, res) => {
  try {
    const { term } = req.query;
    if (!term) {
      return res.status(400).json({
        status: false,
        message: "Missing search term",
      });
    }

    const results = await productController.findProduct(term);

    return res.status(200).json({
      status: true,
      results,
      message: "Search completed successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Error searching for products: " + error.message,
    });
  }
});

/**
 * Render giao diện
 * http://localhost:3000/products/
 */
router.get("/", async (req, res) => {
  try {
    const result = await productController.getAllProduct();
    return res.status(200).json({
      status: true,
      result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(500, {
      status: false,
      message: "Lỗi khi lấy danh sách sản phẩm",
    });
  }
});

/**
 * Lấy chi tiết sản phẩm
 * // http://localhost:3000/products/[id]
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productController.getDetailProduct(id);
    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy sản phẩm",
      });
    }
    return res.status(200).json({
      status: true,
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Lỗi lấy dữ liệu sản phẩm",
    });
  }
});

/**
 * Lấy danh sách sản phẩm theo danh mục
 * // http://localhost:3000/products/cate/[id]
 */
router.get("/cate/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const filteredProducts = await productController.filterProduct(id);
    if (!filteredProducts) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy sản phẩm",
      });
    }
    return res.status(200).json({
      status: true,
      filteredProducts,
      message: "Filter products successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Error filtering products" + error.message,
    });
  }
});

/**
 * Lấy danh sách sản phẩm theo danh mục
 * // http://localhost:3000/products/dac_trung
 */
router.get("/tags/dac_trung", async (req, res) => {
  try {
    const filteredProducts = await productController.signatureProducts();
    if (!filteredProducts) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy sản phẩm",
      });
    }
    return res.status(200).json({
      status: true,
      filteredProducts,
      message: "Filter products successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Error filtering products" + error.message,
    });
  }
});

/**
 *Lấy danh sách sản phẩm theo trang và giới hạn số lượng
 * http://localhost:3000/products//page/:currentPage
 */
router.get("/page/:currentPage", async (req, res) => {
  try {
    const { currentPage } = req.params;
    const result = await productController.showPageProducts(currentPage);
    return res.status(200).json({
      status: true,
      result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(500, {
      status: false,
      message: "Lỗi khi lấy danh sách sản phẩm",
    });
  }
});

/**
 * Thêm dữ liệu sản phẩm
 * http://localhost:3000/products/addpro
 */
router.post("/addpro", upload.single("image"), async (req, res) => {
  try {
    const data = req.body;

    // Kiểm tra những fields bắt buộc
    if (
      !data.name ||
      !data.description ||
      !data.category ||
      !data.price ||
      !data.stock
    ) {
      return res.status(400).json({
        status: false,
        message: "Missing required fields",
      });
    }

    // Format images data
    const images = req.file
      ? [
          {
            url: `/images/${req.file.filename}`,
            alt: data.description || data.name,
          },
        ]
      : [];

    // Create product data object
    const productData = {
      ...data,
      images,
      price: Number(data.price),
      stock: Number(data.stock),
      quantity: Number(data.quantity) || 0,
      ratings: Number(data.ratings) || 0,
      tags: data.tags ? data.tags.split(",") : [],
    };

    const newProduct = await productController.addProduct(productData);

    return res.status(201).json({
      status: true,
      data: newProduct,
      message: "Product added successfully",
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({
      status: false,
      message: `Failed to add product: ${error.message}`,
    });
  }
});

/**
 * Cập nhật dữ liệu sản phẩm
 * http://localhost:3000/products/updatepro/?
 */
router.put("/updatepro/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (req.file) {
      data.image = req.file.originalname;
    } else {
      delete data.image;
    }
    const result = await productController.updateProdut(data, id);
    return res.status(200).json({ status: true, result });
  } catch (error) {
    console.error("Error upadating product:", error);
    return res.status(500).json({
      status: false,
      message: `Failed to update product: ${error.message}`,
    });
  }
});

/**
 * Xóa dữ liệu
 * http://localhost:3000/products/deletepro/?
 */
router.delete("/deletepro/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productController.deleteProduct(id);
    return res.status(200).json({
      status: true,
      message: "Xóa sản phẩm thành công",
      data: result,
    });
  } catch (error) {
    console.error("Lỗi xóa sản phẩm: ", error);
    return res.status(500).json({
      status: false,
      message: `Failed to delete product: ${error.message}`,
    });
  }
});

/**
 * Xóa dữ liệu theo tên
 * http://localhost:3000/products/deletepro?term=
 */
router.delete("/deletepro", async (req, res) => {
  try {
    const { term } = req.query;
    if (!term) {
      return res.status(400).json({
        status: false,
        message: "Missing search term",
      });
    }

    const results = await productController.deleteFilteredProducts(term);

    return res.status(200).json({
      status: true,
      message: "Xóa sản phẩm thành công",
      data: results,
    });
  } catch (error) {
    console.error("Lỗi xóa sản phẩm: ", error);
    return res.status(500).json({
      status: false,
      message: `Failed to delete product: ${error.message}`,
    });
  }
});

// Catch-all route for undefined paths
router.use((req, res) => {
  return res.status(404).json({
    status: false,
    message: "Route not found. Please check the API.",
  });
});

module.exports = router;
