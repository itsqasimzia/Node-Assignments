const mongoose = require("mongoose");
const UserSchema = mongoose.Schema;

// function helloName(name) {
//   console.log(name);
//   return name;
// }

const userModel = new UserSchema({
  fullname: {
    type: String,
    required: [true, " Name Is Required"],
    minLength: 4,
    maxLength: 20,
  },
  email: {
    type: String,
    required: true,
    // get: helloName,
  },
  password: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    required: true,
  },
});
// userModel.set("toJSON", { getters: true });

module.exports = mongoose.model("user", userModel);
