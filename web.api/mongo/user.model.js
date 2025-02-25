// kết nối Collection user
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    // id: {type: Number, required: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true}, // "required: true" là dữ liệu bắt buộc phải nhập
    gender: {type: String, required: true} 
    //role: {type: String, required: true, default: 0} // Mặc định là o, tức là user/1 là admin
}) //tạo collection mới

module.exports = mongoose.models.user || //THêm bước kiểm tra trong model có tồn tại catagory chưa, nếu chưa thì tạo mới
mongoose.model('user', usersSchema);  //Tạo catagory mới với tên đó và dựa theo catagorySchema đc định nghĩa ở trên