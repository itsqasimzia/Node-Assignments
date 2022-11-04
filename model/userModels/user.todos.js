const mongoose = require("mongoose");
const TodosSchema = mongoose.Schema;

const todoModel = new TodosSchema({
  task: {
    type: String,
    required: [true, " task Is Required"],
    minLength: 4,
  },

  image: {
    type: String,
    required: [true, " image  Is Required"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  users: [
    {
      usertype: String,
      status: Boolean,
      _id: false,
    },
  ],
});
todoModel.set("toJSON", { getters: true });

module.exports = mongoose.model("todo", todoModel);
