// kết nối Collection categories
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const catagoriesSchema = new Schema({
//   id: {type: Number, required: true},
  name: { type: String, required: true }, // "required: true" là dữ liệu bắt buộc phải nhập
}); //tạo collection mới

module.exports =
  mongoose.models.catagory || //THêm bước kiểm tra trong model có tồn tại catagory chưa, nếu chưa thì tạo mới
  mongoose.model("catagory", catagoriesSchema); //Tạo catagory mới với tên đó và dựa theo catagorySchema đc định nghĩa ở trên
