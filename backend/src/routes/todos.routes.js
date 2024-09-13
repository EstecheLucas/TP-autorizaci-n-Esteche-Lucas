import { Router } from "express";
import {
  getAllTodosCtrl,
  addTodoCtrl,
  updateTodoCtrl,
  deleteTodoCtrl
} from "../controllers/todos.controllers.js"; // Asegúrate de que esta ruta sea correcta
import validarJwt from "../middlewares/validar-jwt.js";

const todosRouter = Router();

todosRouter.get("/", validarJwt, getAllTodosCtrl);
todosRouter.post("/add", validarJwt, addTodoCtrl);
todosRouter.put("/update/:id", validarJwt, updateTodoCtrl);
todosRouter.delete("/delete/:id", validarJwt, deleteTodoCtrl);

export { todosRouter };
