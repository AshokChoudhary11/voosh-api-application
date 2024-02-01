const mongoose = require("mongoose");

const uri = process.env.MONGOOSE_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
