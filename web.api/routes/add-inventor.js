// http://localhost:3000/products
var express = require("express");
var router = express.Router();
// const bodyParser = require("body-parser");
// router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.render("add-inventor", { title: "Add Inventor" });
});


module.exports = router;
