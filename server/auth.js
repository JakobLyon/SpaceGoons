const express = require("express");
const admin = require("./firebase"); // Import initialized Firebase
const app = express();

app.use(express.json());

// Middleware to authenticate users
async function authenticate(req, res, next) {
  const token = req.headers.authorization?.split("Bearer ")[1]; // Extract token
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Store user info for next handlers
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

// Example protected route
app.get("/profile", authenticate, (req, res) => {
  res.json({ message: `Hello, ${req.user.email}` });
});

app.listen(3000, () => console.log("Server running on port 3000"));
