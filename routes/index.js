const express = require("express");
const authRouter = express.Router();

// controllers
const authController = require("../controller/auth/authController");
const { isUserAuthenticated } = require("../services/jwtservices");

// routes
authRouter.post("/login", authController.userLogin);
authRouter.post("/registration", authController.userRegistration);
authRouter.put(
  "/todo/update/:todoid",
  isUserAuthenticated,
  authController.updateTodo
);
authRouter.delete(
  "/todo/delete/:todoid",
  isUserAuthenticated,
  authController.deleteTodo
);
authRouter.post("/todos/add", isUserAuthenticated, authController.addTodos);
authRouter.get("/alltodos", isUserAuthenticated, authController.getTodos);
authRouter.get(
  "/todo/:todoid",
  isUserAuthenticated,
  authController.getTodoById
);
authRouter.post(
  "/regenerateToken",
  isUserAuthenticated,
  authController.regenerateToken
);
module.exports = { authRouter };
