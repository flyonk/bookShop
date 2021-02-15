const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

class Book {
  constructor(bookAuthor, bookName, bookURL, bookPrice) {
    this.author = bookAuthor;
    this.name = bookName;
    this.image = bookURL;
    this.price = bookPrice;
    this.id = uuid();
  }

  toJSON() {
    return {
      author: this.author,
      name: this.name,
      image: this.image,
      price: this.price,
      id: this.id,
    };
  }

  async save() {
    const books = await Book.getAll();
    books.push(this.toJSON());

    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, "..", "data", "books.json"), JSON.stringify(books), (err) => {
        if (err) reject(err);

        resolve();
      });
    });
  }

  static async getById(id) {
    const books = await Book.getAll();
    const book = books.find((c) => c.id === id);

    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, "..", "data", "books.json"), JSON.stringify(books), (err) => {
        if (err) reject(err);

        resolve(book);
      });
    });
  }

  static async update(book) {
    const books = await Book.getAll();
    const idx = books.findIndex((c) => c.id === book.id);

    books[idx] = book;

    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, "..", "data", "books.json"), JSON.stringify(books), (err) => {
        if (err) reject(err);

        resolve();
      });
    });
  }

  static getAll() {
    const booksPath = path.join(__dirname, "..", "data", "books.json");

    return new Promise((resolve, reject) => {
      fs.readFile(booksPath, "utf-8", (err, content) => {
        if (err) reject(err);

        resolve(JSON.parse(content));
      });
    });
  }
}

module.exports = Book;
