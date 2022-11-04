const TodosModel = require("../model/userModels/user.todos");
const { ErrorClass } = require("./ErrorClass");

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

const findTodo = async (params) => {
  const todo = await TodosModel.findById({ _id: params });
  return todo;
};
const findSingleTodo = async (params) => {
  const todo = await TodosModel.findOne({ _id: params });
  return todo;
};
const updateTodoDoc = async (id, data) => {
  try {
    const todo = await TodosModel.findByIdAndUpdate(id, data);
    return todo;
  } catch (error) {
    console.log("usererror", error);
    return new ErrorClass(404, "Todo update failed");
  }
};
const deleteTodoDoc = async (id, data) => {
  try {
    const todo = await TodosModel.findByIdAndDelete({ _id: id });
    return todo;
  } catch (error) {
    return new ErrorClass(404, "Delete failed ");
  }
};
module.exports = { findTodo, updateTodoDoc, deleteTodoDoc, findSingleTodo };
