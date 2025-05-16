const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    fname: String,

    lname: String,

    email: String,

    pass: String,
  },
  { timestamps: true }
);

const studentModel = mongoose.model("students", studentSchema);
module.exports = studentModel;
