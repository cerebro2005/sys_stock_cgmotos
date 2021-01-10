const { Router } = require("express");
const router = Router();

const {
    renderNoteForm,
    createNewNote,
    renderNotes,
    renderEditForm,
    updateNote,
    deleteNote
} = require("../controllers/note.controller");

//const {isAuthenticated} = require('../helpers/rutasProt')

// New Note
router.get("/notas/add",  renderNoteForm);

router.post("/notas/nueva-nota",  createNewNote);

// Get All Note
router.get("/notas",  renderNotes);

// Edit Note
router.get("/notas/edit/:id",  renderEditForm);
router.put("/notas/edit/:id",  updateNote);

// Delete Note
router.delete("/notas/delete/:id",  deleteNote);

module.exports = router;
