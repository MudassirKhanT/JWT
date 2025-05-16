const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const studentModel = require("./models/student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cors());

const DB_URL = "mongodb://localhost:27017/schools";

const PORT = 4000;
mongoose
  .connect(DB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection is Ready " + "and Server is Listening on Port ", PORT);
    });
  })
  .catch((err) => {
    console.log("A error has been occurred while" + " connecting to database.");
  });

app.post("/signup", async (req, res) => {
  const { fname, lname, email, pass } = req.body;
  if (!fname || !lname || !email || !pass) {
    return res.status(400).json({ message: "All Fields Are Required" });
  }
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(pass, salt);
    const result = await studentModel.create({
      fname,
      lname,
      email,
      pass: hashedPassword,
    });
    return res.json({ id: result._id });
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  if (!email || !pass) {
    return res.status(400).json({ message: "All Fields are requried" });
  }
  try {
    const user = await studentModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const matched = bcrypt.compareSync(pass, user.pass);
    if (!matched) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: user._id, name: user.fname }, "hfhgftfjfffjfffjt", { expiresIn: "7d" });
    console.log("User logged in ");

    return res.status(201).json({ token: token });
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

const verify = (req, res, next) => {
  let token;
  if (!req.headers.authorization?.startsWith("Bearer")) {
    return res.status(403).json({ message: "Unauthorized!!" });
  } else {
    token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, "hfhgftfjfffjfffjt");
      req.userId = decoded.id;
      req.userName = decoded.name;
      next();
    } catch (err) {
      return res.status(403).json({ message: "Unauthorized!!" });
    }
  }
};

app.get("/", verify, (req, res, next) => {
  res.status(200).json({ name: req.userName });
});
