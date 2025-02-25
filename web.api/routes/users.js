// http://localhost:3000/users
var express = require("express");
var router = express.Router();
const userController = require("../mongo/user.controller");

/**
 * Render giao diện
 * http://localhost:3000/users/
 */
router.get("/", async (req, res) => {
  try {
    const result = await userController.getAllUser();
    return res.status(200).json({
      status: true,
      result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(500, {
      status: false,
      message: "Lỗi khi lấy danh sách ngƯời dùng",
    });
  }
});

/**
 * Xóa người dùng
 * http://localhost:3000/users/delete/1
 */
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userController.deleteUser(id);
const result = await userController.getAllUser();

    return res.status(200).json({
      status: true,
      deletedUser,
      usersNew: result,
      message: "Xoá thành công người dùng",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Lỗi khi xóa người dùng",
    });
  }
});

/**
 * Thêm người dùng
 * http://localhost:3000/users/addusers
 */
router.post("/addusers", async (req, res) => {
  try {
    const data = req.body;

    // Kiểm tra những fields bắt buộc
    if (!data.first_name || !data.last_name || !data.email || !data.gender) {
      return res.status(400).json({
        status: false,
        message: "Missing required fields",
      });
    }

    // Create user data object
    const userNew = { ...data };

    const newUser = await userController.addUser(userNew);
    return res.status(200).json({
      status: true,
      usersNew: newUser,
      message: "User added successfully",
    });
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).json({
      status: false,
      message: `Failed to add user: ${error.message}`,
    });
  }
});

/**
 * Cập nhật người dùng
 * // http://localhost:3000/users/update/1
 */
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Kiểm tra những fields bắt buộc
    if (!data.first_name || !data.last_name || !data.email || !data.gender) {
      return res.status(400).json({
        status: false,
        message: "Missing required fields",
      });
    }

    // Create user data object
    const userNew = { ...data };

    const newUser = await userController.updateUser(userNew, id);
    return res.status(200).json({
      status: true,
      usersNew: newUser,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(500, {
      status: false,
      message: `Failed to update user: ${error.message}`,
    });
  }
});
module.exports = router;
