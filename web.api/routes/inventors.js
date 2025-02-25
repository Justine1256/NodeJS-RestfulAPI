// http://localhost:3000/products
var express = require("express");
var router = express.Router();

const inventors = [
  { id: 1, first: "Albert", last: "Einstein", year: 1879, passed: 1955 },
  { id: 2, first: "Isaac", last: "Newton", year: 1643, passed: 1727 },
  { id: 3, first: "Galileo", last: "Galilei", year: 1564, passed: 1642 },
  { id: 4, first: "Marie", last: "Curie", year: 1867, passed: 1934 },
  { id: 5, first: "Johannes", last: "Kepler", year: 1571, passed: 1630 },
  { id: 6, first: "Nicolaus", last: "Corpernicus", year: 1473, passed: 1543 },
];

// http://localhost:3000/inventors
router.get("/", (req, res) => {
  const inventorList = inventors.map((item) => ({
    id: item.id,
    fullname: `${item.first.toUpperCase()} ${item.last.toUpperCase()}`,
    year: item.year,
    passed: item.passed,
  }));
  res.render("inventors", {
    title: "Danh sách nhà khoa học",
    inventorsList: inventorList,
  });
});

// http://localhost:3000/inventors/1
router.get("/:id", (req, res) => {
  let id = req.params.id;
  let inventor = inventors.find((e) => e.id == id);
  info = `<h2>
    Thông tin chi tiết nhà khoa học:
    Full name: ${inventor.first} ${inventor.last}, Year: ${inventor.year}, Passed: ${inventor.passed}
    </h2>`;
  res.send(info);
});

// http://localhost:3000/inventor
router.post("/", (req, res) => {
  let newInventor = req.body;
  newInventor.id = inventors.length + 1;
  inventors.push(newInventor);
  res.redirect("/inventors");
});

module.exports = router;
