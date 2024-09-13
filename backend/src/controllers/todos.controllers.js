// Archivo: controllers/todoController.js
import { database } from "../db/database.js";

// Obtener todos los todos del usuario
export const getAllTodosCtrl = (req, res) => {
  const user = req.user.id;
  const todos = database.todos.filter((tarea) => tarea.owner === user);

  res.json({ todos });
};

// Agregar una nueva tarea
export const addTodoCtrl = (req, res) => {
  const { title, completed } = req.body;
  const user = req.user.id;
  const newTodo = {
    id: database.todos.length + 1,
    title,
    completed,
    owner: user,
  };
  database.todos.push(newTodo);
  res.json({ message: "Todo creado exitosamente", todo: newTodo });
};

// Actualizar una tarea  existente
export const updateTodoCtrl = (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const user = req.user.id;

  const todoIndex = database.todos.findIndex(
    (tarea) => tarea.id === parseInt(id) && tarea.owner === user
  );
  if (todoIndex === -1) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }

  database.todos[todoIndex] = {
    ...database.todos[todoIndex],
    title,
    completed,
  };

  res.json({ message: "Tarea actualizada exitosamente", todo: database.todos[todoIndex] });
};

// Eliminar una tarea
export const deleteTodoCtrl = (req, res) => {
  const { id } = req.params;
  const user = req.user.id;

  const todoIndex = database.todos.findIndex(
    (tarea) => tarea.id === parseInt(id) && tarea.owner === user
  );
  if (todoIndex === -1) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }

  database.todos.splice(todoIndex, 1);
  res.json({ message: "Tarea eliminada exitosamente" });
};
