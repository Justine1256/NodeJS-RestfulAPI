//controllers: viết các hàm xử lý chức năng

// thực hiện theo tádc CRUD với collection users
const userModel = require("./user.model"); //Cần kết nối collection nào thì import module của collection đó vào
const bcrypt = require("bcrypt");
//jsonwebtoken
module.exports = { getAllUser, addUser, updateUser, deleteUser };

// Lấy toàn bộ dữ liệu
async function getAllUser() {
  try {
    const result = await userModel.find();
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Lỗi lấy dữ liệu");
  }
}

/**
 * Thêm user mới
 */
// async function  addUser (data) {
//   try {
//     const {name, email, password, role} = data;
//     let user = await userModel.findOne({email: email});
//     if (user) {
//       throw new Error("Email đã tồn tại");
//     }
//     const salt = bcryptjs.genSaltSync(10);
//     const hashPassword = bcryptjs.hashSync(password, salt);
//     user = new userModel({name, email, hashPassword, role});
//     const result = await user.save();
//   } catch (error) {
//     console.log(error);
//     throw new Error("Lỗi thêm dữ liệu");
//   }
// }
async function addUser(data) {
  try {
    const { first_name, last_name, email, gender } = data;
    let user = await userModel.findOne({ email: email });
    if (user) {
      throw new Error("Email đã tồn tại");
    }
    user = new userModel({ first_name, last_name, email, gender });
    const result = await user.save();
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Lỗi thêm dữ liệu: " + error.message);
  }
}

/**
 * Cập nhật người dùng
 */
async function updateUser(data, id) {
  try {
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error(`User not found: ${id}`);
    }
    const { first_name, last_name, email, gender } = data;

    const result = await userModel.findByIdAndUpdate(
      id,
      { first_name, last_name, email, gender },
      { new: true }
    );
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Lỗi cập nhật dữ liệu: " + error.message);
  }
}

/**
 * Xóa người dùng
 */
async function deleteUser(_id) {
  try {
    const result = await userModel.findByIdAndDelete(_id);
    if (!result) {
      throw new Error(`User not found: ${_id}`);
    }
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting user" + error.message);
  }
}

/**
 * Đăng nhập user
 */
async function login(data) {
  try {
    const { email, password } = data;
    let user = await userModel.findOne(email);
    if (!user) {
      throw new Error("Email has not been registered");
    }

    let checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      throw new Error("Password is incorrect");
    }

    //user._doc
    delete user._doc.password;
    user = { ...user, _doc };
    return user;
    //token => key secret => .env (khi có sử dụng token cho user)
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting user" + error.message);
  }
}
