// kết nối Collection products
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productsSchema = new Schema({
  // id: {type: Number, required: true},
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  images: [
    {
      url: { type: String, required: true },
      alt: { type: String, required: false },
    },
  ],
  tags: { type: Array, required: false },
  likes: { type: Number, required: false }, // "required: true" là dữ liệu bắt buộc phải nhập
  ordered: { type: Number, required: false }, // "required: true" là dữ liệu bắt buộc phải nhập
  created_at: { type: String, required: false },
}); //tạo collection mới

module.exports =
  mongoose.models.product || //THêm bước kiểm tra trong model có tồn tại catagory chưa, nếu chưa thì tạo mới
  mongoose.model("product", productsSchema); //Tạo catagory mới với tên đó và dựa theo catagorySchema đc định nghĩa ở trên
