// server.js
const express = require("express");
const app = express();
const bookRoutes = require("./routes/bookRoutes");
const methodOverride = require("method-override");
const axios = require("axios");
require("dotenv").config();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// Enable async/await in views
app.set("async", true);

// Helper to generate Open Library cover URLs with error handling
app.locals.coverUrl = async function (isbn, size = "M") {
  try {
    // Clean the ISBN
    isbn = isbn.replace(/[-\s]/g, "");

    // Check if cover exists
    const coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`;
    const response = await axios.get(coverUrl, { responseType: "arraybuffer" });

    // Check if the response is actually an image
    const contentType = response.headers["content-type"];
    if (
      response.status === 200 &&
      contentType &&
      contentType.includes("image")
    ) {
      return coverUrl;
    } else {
      // If not a valid image, return a default cover
      return "https://via.placeholder.com/150x200?text=No+Cover";
    }
  } catch (error) {
    console.error("Error checking cover:", error.message);
    // Return a default cover image
    return "https://via.placeholder.com/150x200?text=No+Cover";
  }
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
