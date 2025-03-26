// server.js
const express = require("express");
const app = express();
const bookRoutes = require("./routes/bookRoutes");
const methodOverride = require("method-override");
require("dotenv").config();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// Enable async/await in views
app.set("async", true);

// Helper to generate Open Library cover URLs
app.locals.coverUrl = function (identifier, size = "L", type = "isbn") {
  // Use either ISBN or ID for the cover URL from the Open Library Covers API
  return `https://covers.openlibrary.org/b/${type}/${identifier}-${size}.jpg`;
};

// Routes
app.use("/books", bookRoutes);

// Home Route
app.get("/", (req, res) => {
  res.redirect("/books");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
