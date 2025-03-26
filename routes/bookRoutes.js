// routes/bookRoutes.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all books
router.get("/", async (req, res) => {
  try {
    let query = "SELECT * FROM books";
    const sortBy = req.query.sort;

    // Add sorting based on query parameter
    if (sortBy === "rating") {
      query += " ORDER BY rating DESC, read_date DESC";
    } else if (sortBy === "date") {
      query += " ORDER BY read_date DESC";
    } else {
      query += " ORDER BY read_date DESC"; // Default sorting
    }

    const result = await pool.query(query);
    res.render("books", { books: result.rows });
  } catch (err) {
    console.error(err);
    res.send("Error fetching books");
  }
});

// Add new book form
router.get("/new", (req, res) => {
  // Get pre-filled data from query parameters if available
  const preFilledData = {
    title: req.query.title || "",
    author: req.query.author || "",
    isbn: req.query.isbn || "",
  };
  res.render("newBook", { book: preFilledData });
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
    res.render("editBook", { book: result.rows[0] });
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

// Get single book
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      return res.redirect("/books");
    }
    res.render("book", { book: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.redirect("/books");
  }
});

module.exports = router;
