const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = [];

// REGISTER
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  const user = { email, password };
  users.push(user);

  res.json({ message: "User Registered" });
});

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ message: "Login Success" });
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));