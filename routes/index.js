const express = require("express");
const authRouter = express.Router();

// controllers
const authController = require("../controller/auth/authController");
const { isUserAuthenticated } = require("../services/jwtservices");
authRouter.post("/login", authController.userLogin);
authRouter.post("/registration", authController.userRegistration);
authRouter.put("/todo/update/:todoid", authController.updateTodo);
authRouter.delete("/todo/delete/:todoid", authController.deleteTodo);
authRouter.post("/todos/add", isUserAuthenticated, authController.addTodos);
authRouter.get("/alltodos", authController.getTodos);
authRouter.get("/todo/:todoid", authController.getTodoById);
authRouter.post("/regenerateToken", authController.regenerateToken);
module.exports = { authRouter };
