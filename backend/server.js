const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./User");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/employee_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/register", async (req, res) => {

  const { firstName, lastName, username, email, password } = req.body;

  try {
    // Check email
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send("User with this email already exists");
    }

    // Check username
    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      return res.status(400).send("Username already taken");
    }

    const newUser = new User({ firstName, lastName, username, email, password });
    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (err) {
    res.status(400).send("Error: " + err);
  }
});

app.post("/login", async (req, res) => {

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email, password: password });

    if (!user) {
      return res.status(400).send("Invalid credentials");
    }

    res.send("Login successful");
  } catch (err) {
    res.status(500).send("Server error: " + err);
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).send("Server error: " + err);
  }
});

// Delete a user
app.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("User deleted");
  } catch (err) {
    res.status(500).send("Server error: " + err);
  }
});

// Update a user
app.put("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.send("User updated");
  } catch (err) {
    res.status(500).send("Server error: " + err);
  }
});

app.get("/leaderboard", async (req, res) => {
  const users = await User.find().sort({ points: -1 }).limit(10);
  res.json(users);
});

app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).send("User not found");
  }
});

app.get("/leaderboard", async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 }).limit(10);
    res.json(users);
  } catch (err) {
    res.status(500).send("Error fetching leaderboard");
  }
});

app.post("/reward/:id", async (req, res) => {
  try {
    const { title, message, points } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");

    user.rewards.push({
      title,
      message,
      points,
      date: new Date(),
    });

    user.points += points;
    await user.save();

    res.send("Reward added successfully");
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});


app.put("/users/:id/points", async (req, res) => {
    console.log(req);
  const { points } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { points: points },
      { new: true }
    );
    res.send(user);
  } catch (error) {
    res.status(400).send("Error updating points: " + error);
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
