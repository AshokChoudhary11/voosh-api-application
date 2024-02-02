require("./database");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  sub_total: {
    type: Number,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
    min: [1000000000, "Phone number must be at least 10 digits"], // Minimum length
    max: 9999999999, // Maximum length
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v.toString()); // Custom validator for exact length of 10 digits
      },
      message: "Phone number must be exactly 10 digits",
    },
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference
  },
});

const UserSchema = new Schema({
  phone_number: {
    type: Number,
    unique: true,
    required: true,
    min: [1000000000, "Phone number must be at least 10 digits"], // Minimum length
    max: 9999999999, // Maximum length
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v.toString()); // Custom validator for exact length of 10 digits
      },
      message: "Phone number must be exactly 10 digits",
    },
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
});

const User = mongoose.model("User", UserSchema);
const Order = mongoose.model("Order", OrderSchema);

module.exports = { User, Order };
