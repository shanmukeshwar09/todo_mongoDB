import mongoose from "mongoose";
const todo = mongoose.Schema({
  content: {
    type: String,
    required: "Todo is required",
  },
});

export default mongoose.model("todo", todo, "todo");
