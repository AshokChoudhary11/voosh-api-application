require("./database");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  sub_total: Number,
  phone_number: Number,
  user_id: String,
});

const UserSchema = new Schema({
  phone_number: {
    type: Number,
    unique: true,
  },
  password: String,
  name: String,
});

const User = mongoose.model("User", UserSchema);
const Order = mongoose.model("Order", OrderSchema);

module.exports = { User, Order };
