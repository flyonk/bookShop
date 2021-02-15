const { Router } = require("express");
const { getById } = require("../models/book");
const router = Router();
const Book = require("../models/book");

router.get("/", async (req, res) => {
  const books = await Book.getAll();
  res.render("shop", {
    isShop: true,
    title: "Shop Page :*",
    books,
  });
});

router.get("/:id/edit", async (req, res) => {
  const book = await getById(req.params.id);
  if (!req.query.allow) {
    return res.redirect("/");
  }

  res.render("book-edit", {
    title: `Редактировать: ${book.name}`,
    book,
  });
});

router.post("/edit", async (req, res) => {
  await Book.update(req.body);

  res.redirect("/shop");
});

router.get("/:id", async (req, res) => {
  const book = await Book.getById(req.params.id);
  res.render("book", {
    title: "",
    layout: "empty",
    book,
  });
});

module.exports = router;
