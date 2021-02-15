const path = require("path");
const fs = require("fs");
const Book = require("../models/book");

const p = path.join(__dirname, "..", "data", "card.json");

class Card {
  static async add(book) {
    const card = await Card.fetch();

    const idx = card.books.findIndex((c) => c.id === book.id);
    const candidate = card.books[idx];

    if (candidate) {
      candidate.count++;
      card.books[idx] = candidate;
    } else {
      book.count = 1;
      card.books.push(book);
    }

    card.price += +book.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(card), (err) => {
        if (err) reject(err);

        resolve();
      });
    });
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(p, "utf-8", (err, content) => {
        if (err) reject(err);

        resolve(JSON.parse(content));
      });
    });
  }

  static async remove(id) {
    const card = await Card.fetch();

    const idx = card.books.findIndex((c) => c.id === id);
    const book = card.books[idx];

    if (book.count === 1) {
      card.books = card.books.filter((c) => c.id !== id);
    } else {
      card.books[idx].count--;
    }

    card.price -= +book.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(card), (err) => {
        if (err) reject(err);

        resolve(card);
      });
    });
  }
}

module.exports = Card;
