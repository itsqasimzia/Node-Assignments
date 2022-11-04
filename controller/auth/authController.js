const UserModel = require("../../model/userModels/auth.registration");
const TodosModel = require("../../model/userModels/user.todos");
const { ErrorClass } = require("../../services/ErrorClass");

const {
  generateHash,
  compareHash,
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
} = require("../../services/jwtservices");
const {
  findTodo,
  updateTodoDoc,
  deleteTodoDoc,
  findSingleTodo,
} = require("../../services/todoservices");
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send({ err: "missing field" });
  }

  const findUser = await UserModel.findOne({ email });
  if (!findUser) {
    return res.status(404).send({ error: true, message: "user not found" });
  }
  const comparePassword = await compareHash(findUser?.password, password);

  if (!comparePassword) {
    return res.status(400).send({ message: "password doesnt match " });
  }

  const { ACCESS_TOKEN, REFRESH_TOKEN } = generateTokens(findUser);

  if (findUser && comparePassword) {
    return res.status(200).send({
      error: false,
      message: "user loged in successfully",
      user: findUser,
      JWT: {
        access_token: ACCESS_TOKEN,
        refreshtoken: REFRESH_TOKEN,
      },
    });
  }
};

const userRegistration = async (req, res) => {
  const { fullname, email, password, userRole } = req.body;
  if (!fullname || !email || !password || !userRole) {
    return res.status(400).send({ err: "missing field" });
  }
  const findUser = await UserModel.find({ email });
  if (findUser.length) {
    return res.status(403).send({ message: "user already exists" });
  }

  const hashPassword = await generateHash(password);

  const userModel = new UserModel({
    fullname,
    email,
    password: hashPassword,
    userRole,
  });
  const user = await userModel.save();
  res.status(201).send({ message: "user saved successfully", user: user });
};
const addTodos = async (req, res, next) => {
  const { task, image, users, userId } = req.body;

  const { authorization } = req.headers;

  const userToken = authorization && authorization.split(" ")[1];

  if (!task || !image || !users.length) {
    return res.status(402).send("missing fields");
  }

  const isAuthorized = verifyAccessToken(userToken);
  if (isAuthorized.error) {
    return res.status(401).send({ message: isAuthorized.error, error: true });
  }
  const todo = new TodosModel({
    task,
    image,
    userId: "635e543e73948f18d9adfae9",
    users,
  });

  try {
    const addedTodo = await todo.save();
    res.status(201).send({ message: "successfuly added", addedTodo });
  } catch (err) {
    next(new ErrorClass(400, "very very bad request"));
    // let errorsAre = {};

    // for (const [id, value] of Object.entries(err.errors)) {
    //   errorsAre[id] = value.message;
    // }
    // res.status(500).send(errorsAre);
    // console.log(err);
  }
};
const getTodos = async (req, res, next) => {
  try {
    const addedTodo = await TodosModel.find({});
    res.status(200).send({ todos: addedTodo });
  } catch (err) {
    res.status(500).send("server error");
  }
};

const getTodoById = async (req, res) => {
  const { todoid } = req.params;
  const todo = await findSingleTodo(todoid);

  res.status(200).send(todo);
};
const updateTodo = async (req, res, next) => {
  const { todoid } = req.params;
  const todo = await findTodo(todoid);
  if (!todo) {
    return new ErrorClass(404, "todo data is not found");
  }

  const updatedTodo = updateTodoDoc(todoid, req.body);
  res.status(200).send({ error: false, message: "Todo updated success fully" });
};
const deleteTodo = async (req, res, next) => {
  const { todoid } = req.params;
  const todo = await findTodo(todoid);
  if (!todo) {
    return new ErrorClass(404, "todo data is not found");
  }
  const deletedTodo = await deleteTodoDoc(todoid);
  res.status(200).send({ error: false, message: "Todo deleted successfully" });
};

const regenerateToken = (req, res) => {
  const { access_token, refresh_token } = req.body;

  const isVerifiedAccesToken = verifyAccessToken(access_token);
  const isVerifyRefreshToken = verifyRefreshToken(refresh_token);

  if (!isVerifiedAccesToken?.error && !isVerifyRefreshToken?.error) {
    const { access_token, refresh_token } =
      generateTokens(isVerifiedAccesToken);
    return res.status(201).send({ access_token, refresh_token });
  }
  res.status(500).send("internal server error");
};

module.exports = {
  userLogin,
  userRegistration,
  addTodos,
  getTodos,
  regenerateToken,
  updateTodo,
  deleteTodo,
  getTodoById,
};
