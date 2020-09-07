import express from "express";
export const router = express.Router();
import todo from "../Database/Models/todo.js";

router.get("/", async (req, res) => {
  const todos = await todo.find().lean();
  res.render("container", { todos });
});

router.post("/add", (req, res) => {
  const { content } = req.body;
  const newTodo = new todo({
    content,
  });
  newTodo.save();
  res.redirect("/todo");
});

router.get("/delete/:id", async (req, res) => {
  const newTodo = await todo.findById(req.params.id);
  if (newTodo) newTodo.remove();
  res.redirect("/todo");
});

router.get("/edit/:id", async (req, res) => {
  const newTodo = await todo.findById(req.params.id);
  res.render("container", {
    todos: [],
    inputValue: newTodo.content,
    todoID: newTodo._id,
  });
});

router.post("/update/:id", async (req, res) => {
  const newTodo = await todo.findById(req.params.id);
  const { content } = req.body;
  if (content) newTodo.content = content;
  newTodo.save();
  res.redirect("/todo");
});
