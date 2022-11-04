const TodosModel = require("../model/userModels/user.todos");
const { ErrorClass } = require("./ErrorClass");

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

const findTodo = async (params) => {
  // find method returns [] if no data found
  const todo = await TodosModel.findById({ _id: params });
  return todo;
};
const findSingleTodo = async (params) => {
  // find method returns [] if no data found
  const todo = await TodosModel.findOne({ _id: params });
  return todo;
};
const updateTodoDoc = async (id, data) => {
  // find method returns [] if no data found
  try {
    const todo = await TodosModel.findByIdAndUpdate(id, data);
    return todo;
  } catch (error) {
    console.log("usererror", error);
    return new ErrorClass(404, "User update failed");
  }
};
const deleteTodoDoc = async (id, data) => {
  // find method returns [] if no data found
  try {
    const todo = await TodosModel.findByIdAndDelete({ _id: id });
    return todo;
  } catch (error) {
    console.log("usererror", error);
    return new ErrorClass(404, "Delete failed ");
  }
};
module.exports = { findTodo, updateTodoDoc, deleteTodoDoc, findSingleTodo };
