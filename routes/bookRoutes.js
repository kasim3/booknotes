// routes/bookRoutes.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all books
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM books ORDER BY read_date DESC"
    );
    res.render("books", {
      books: result.rows,
      async: true, // Enable async/await in views
    });
  } catch (err) {
    console.error(err);
    res.send("Error fetching books");
  }
});

// Add new book form
router.get("/new", (req, res) => {
  res.render("addBook", { async: true });
});

// Add new book
router.post("/", async (req, res) => {
  const { title, author, isbn, rating, notes, read_date } = req.body;
  try {
    await pool.query(
      "INSERT INTO books (title, author, isbn, rating, notes, read_date) VALUES ($1, $2, $3, $4, $5, $6)",
      [title, author, isbn, rating, notes, read_date]
    );
    res.redirect("/books");
  } catch (err) {
    console.error(err);
    res.send("Error adding book");
  }
});

// Edit book form
router.get("/edit/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books WHERE id = $1", [
      req.params.id,
    ]);
    res.render("editBook", {
      book: result.rows[0],
      async: true, // Enable async/await in views
    });
  } catch (err) {
    console.error(err);
    res.send("Error retrieving book for edit");
  }
});

// Update book
router.put("/:id", async (req, res) => {
  const { title, author, isbn, rating, notes, read_date } = req.body;
  try {
    await pool.query(
      "UPDATE books SET title=$1, author=$2, isbn=$3, rating=$4, notes=$5, read_date=$6 WHERE id=$7",
      [title, author, isbn, rating, notes, read_date, req.params.id]
    );
    res.redirect("/books");
  } catch (err) {
    console.error(err);
    res.send("Error updating book");
  }
});

// Delete book
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM books WHERE id = $1", [req.params.id]);
    res.redirect("/books");
  } catch (err) {
    console.error(err);
    res.send("Error deleting book");
  }
});

module.exports = router;
