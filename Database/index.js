import mongoose from "mongoose";
mongoose.connect("mongodb://localhost/todo", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
