import mongoose from "mongoose";
import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Note = mongoose.model('Note', noteSchema);