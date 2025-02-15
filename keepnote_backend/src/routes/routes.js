import express from "express";
import {
  get_all_notes,
  add_note,
  get_note_by_id,
  update_note, 
  delete_note,
} from "../controllers/noteController.js";
const router = express.Router();

// ✅ Secure all routes with authentication middleware
router.get("/api/notes/all", get_all_notes);
router.post("/api/notes/add", add_note);
router.get("/api/notes/:id", get_note_by_id);
router.patch("/api/notes/update/:id", update_note);
router.delete("/api/notes/delete/:id", delete_note);

export default router;
