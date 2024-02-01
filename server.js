require("dotenv").config();
const express = require("express");
const { User, Order } = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("health check!");
});

app.post("/add-user", async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    if (!name || !phone || !password) {
      return res(404).json({
        status: "failed",
        message: "required field is missing !",
      });
    }
    const exsistingUser = User.find({ phone_number: phone });
    if (exsistingUser) {
      return res.json({
        status: "fail",
        message: "user already exsits with this phone number",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      phone_number: phone,
      password: hashedPassword,
    });
    res.json({ status: "success", message: "User added successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login-user", async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone_number: phone });
    if (!phone || !password) {
      return res.status(404).json({
        status: "failed",
        message: "Invalid Credentials",
      });
    }
    console.log(user);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ error: "Invalid phone number or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/get-order", async (req, res) => {
  try {
    const { user_id } = req.query;
    const orders = await Order.find({ user_id });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/add-order", async (req, res) => {
  try {
    const { user_id, sub_total, phone_number } = req.body;

    // Validate input data
    if (!user_id || !sub_total || !phone_number) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create a new order
    const order = await Order.create({ user_id, sub_total, phone_number });

    res.json({ message: "Order added successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
