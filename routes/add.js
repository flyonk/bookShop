const { Router } = require("express");
const router = Router();
const Book = require("../models/Book.js");

router.get("/", (req, res) => {
  res.render("add", {
    isAdd: true,
    title: "Add Page :*",
  });
});

router.post("/addbook", (req, res) => {
  res.render("add");

  const book = new Book(req.body.bookAuthor, req.body.bookName, req.body.bookURL, req.body.bookPrice);
  book.save();
  res.redirect("/shop");
});
module.exports = router;
