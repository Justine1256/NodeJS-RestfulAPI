// http://localhost:3000/
var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

// method: get, post, put, delete

/* GET home page. */
router.get("/", function (req, res, next) {
  //view Giao diện
  res.render("index", { title: "Hello Express", message: "this is message" });
});

const sinhvien = [
  { id: 1, name: "Nguyen Van A", age: 20 },
  { id: 2, name: "Nguyen Van B", age: 22 },
  { id: 3, name: "Nguyen Van C", age: 21 },
];



// http://localhost:3000/sinhvien/2 : kieu du lieu param: la kieu du lieu bat buộc phải có đc client gửi lên url sau đó request lên server (param cx v)
router.get("/sinhvien/:id", (req, res) => {
  try {
    //Lay du lieu parameter
    // const id = req.params.id;
    const { id } = req.params;
    const sv = sinhvien.find((item) => item.id === parseInt(id)); //find requested id
    return res.send(`<h1>Ten sinh vien: ${sv.name}</h1>
                    <h2>Tuoi sinh vien: ${sv.age}</h2>`);
  } catch (error) {
    console.log(error);
  }
});

// http://localhost:3000/sinhvien?age=20
// query: kiểu dữ liệu khách hàng gửi lên, có thể có hoặc ko
router.get("/sinhvien", (req, res) => {
  try {
    const { age } = req.query;
    const sv = sinhvien.find((item) => item.age == parseInt(age));
    return res.send(`<h1>Ten sinh vien: ${sv.name}</h1>
                    <h2>Tuoi sinh vien: ${sv.age}</h2>`);
  } catch (error) {
    console.log(error);
  }
});




module.exports = router;
