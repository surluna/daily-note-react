import mongoose, { Schema, models } from "mongoose";

const NoteSchema = new Schema({
  date: { type: String, required: true, unique: true },
  note: { type: String, required: true },
});

// Avoid duplication of model definitions
export const Note = models.Note || mongoose.model("Note", NoteSchema);
