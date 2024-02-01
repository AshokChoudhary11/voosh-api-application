require("dotenv").config();
const express = require("express");
const { User, Order } = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { protect } = require("./middleware/protect");

const app = express();

app.use(express.json());

app.get("/health-check", (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "status is up and running !🎉",
  });
});

app.post("/add-user", async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      phone_number: phone,
      password: hashedPassword,
    });
    res.json({ message: "User added successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login-user", async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone_number: phone });
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

app.get("/get-order", protect, async (req, res) => {
  try {
    const { user_id } = req.user;
    const orders = await Order.find({ user_id });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/add-order", protect, async (req, res) => {
  try {
    const { sub_total, phone_number } = req.body;
    const { user_id } = req.user;

    // Validate input data
    if (!sub_total || !phone_number) {
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
