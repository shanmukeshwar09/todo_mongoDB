import express from "express";
import bodyparser from "body-parser";
import exhbs from "express-handlebars";
import path from "path";
import methodOverride from "method-override";
import "./Database/index.js";
import { router } from "./routes/router.js";
import todo from "./Database/Models/todo.js";
const __dirname = path.resolve();

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("views"));

const handlebars = exhbs.create({
  defaultLayout: "root",
  layoutsDir: path.join(__dirname, "/views/layouts"),
  partialsDir: path.join(__dirname, "/views/partials"),
  extname: "hbs",
});

app.set("views", path.join(__dirname, "views/layouts"));

app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");

app.get("/", async (req, res) => {
  const todos = await todo.find().lean();
  res.render("container", { todos });
});

app.use("/todo", router);

app.get("*", (req, res) => res.send("You lost in space"));

app.listen(8000);
