// file này đc chạy đầu tiên sau khi start server
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

require('./mongo/category.model') //import các file kết nối collection model vào
require('./mongo/product.model')
require('./mongo/user.model')

//Định nghĩa router(đường dẫn)
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
var catagoriesRouter = require("./routes/catagories");
var inventorsRouter = require("./routes/inventors");
var addInventorsRouter = require("./routes/add-inventor");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors()); // Thêm middleware cors cho phép truy cập API từ nguồn khác

/**
 * Kết nối database mongo
 */
mongoose
  .connect("mongodb://localhost:27017/WEB503")
  .then(() => console.log("MongoDB: Kết nối thành công"))
  .catch((err) => console.log("MongoDB Lỗi: " + err));

app.use("/", indexRouter); //Người dùng vào đường dẫn http://localhost:3000/
app.use("/users", usersRouter); //Người dùng vào đường dẫn http://localhost:3000/users
app.use("/products", productsRouter); //Người dùng vào đường dẫn http://localhost:3000/products
app.use("/categories", catagoriesRouter); //Người dùng vào đường dẫn http://localhost:3000/categories
app.use("/inventors", inventorsRouter); //Người dùng vào đường dẫn http://localhost:3000/inventors
app.use("/add-inventor", addInventorsRouter); //Người dùng vào đường dẫn http://localhost:3000/add-inventors

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
