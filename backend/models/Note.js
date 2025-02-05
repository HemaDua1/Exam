import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ["text", "audio"], required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Note", NoteSchema);
