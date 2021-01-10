const noteCtrl = {};
const Note =require('../models/note')

noteCtrl.renderNoteForm = (req, res) =>{
    res.render('notes/new-note')
}

//AGREGAR
noteCtrl.createNewNote = async(req, res)=>{
    const { title, description } = req.body;
    const newNote = new Note({ title, description });
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('msg_exito', 'Nota agregada correctamente')
    res.redirect('/notas')
}

//MOSTRAR TODOS
noteCtrl.renderNotes = async(req, res)=>{
    const notas = await Note.find({user: req.user.id}).sort({createdAt: 'desc'});
    res.render('notes/all-notes', { notas })
}

//BUSCA PARA MODIFICAR
noteCtrl.renderEditForm = async(req, res)=>{
    const note = await Note.findById(req.params.id)
    if (note.user != req.user.id){
        req.flash('msg_error', 'No estas Autorizado a ver esos Datos ')
        return res.redirect('/notas')
    }
    res.render('notes/edit-note', { note })
}

// MODIFICA
noteCtrl.updateNote = async(req, res)=>{
    /* console.log(req.body) */
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description })
    req.flash('msg_exito', 'Nota actualizada correctamente')
    res.redirect('/notas')
}

// BORRA
noteCtrl.deleteNote = async(req, res)=>{
    /* console.log(req.params.id) */
    await Note.findByIdAndDelete(req.params.id)
    req.flash('msg_exito', 'Nota eliminada correctamente')
    res.redirect('/notas')
}

module.exports = noteCtrl