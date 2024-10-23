const express = require("express");
const path = require("path");

// Initialize the Express app
const app = express();

// Define the port to run the server on
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS, images) from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Set up a route to respond to HTTP requests to the homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
