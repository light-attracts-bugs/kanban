import mongoose from "mongoose";
import { dbContext } from "../db/DbContext"
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Task = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    creatorEmail: { type: String, required: true },
    listId: { type: ObjectId, ref: "List", required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Task