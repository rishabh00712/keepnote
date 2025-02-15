import {Note} from "../models/Note/notes.models.js";

// Controllers

const get_all_notes = (req, res) => {
    Note.find().sort({createdAt: -1}).then((result) => {
        if(result.length > 0){
            res.json({
                msg : "All notes have been fetched.", 
                content: result
            })
        }
    }).catch((err) => {
        res.json({msg : err.message})
    });
};


const add_note = async (req, res) => {
    try {
      const { title, content } = req.body;
      let note = new Note({ title, content });
      let result = await note.save();
      
      res.status(201).json({ 
        msg: "Your note was saved successfully!",
        content: result,
      });
    } catch (error) {
      console.error("Error saving note:", error);
      res.status(500).json({ msg: error.message }); 
    }
  };
  

const get_note = async (req, res) => {
    try{
        const { title, content } = req.body;
        const newNote = new Note({ title, content });

        let status = await newNote.save();
        res.json({
            msg : "Note was saved successfully", 
            content: status
        });
    }catch(error){
        res.json({msg : error.message});
    }
}


const get_note_by_id = async(req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
          return res.status(404).json({ msg: "Note not found" });
        }
        res.json(note);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const update_note = async(req, res) => {
    try{
        const id = req.params.id;
        const { title, content } = req.body;
        Note.findByIdAndUpdate(id, {title, content}, { new : true }).then((result) => {
            if(result != null){
                res.json({
                    msg : "note was updated successfully", 
                    content: result,
                })
            }else{
                res.json({msg : "note doesn't exist"});
            }
        })
    }catch(error){
        res.json({msg : error.message});
    }
};

/**
 * The function `delete_note` deletes a note by its ID and returns a success message if the note was
 * deleted successfully, or an error message if the note doesn't exist.
 * @param req - The `req` parameter typically represents the HTTP request in a Node.js application. It
 * contains information about the request made by the client, such as the request headers, parameters,
 * body, and more. In this context, `req.params.id` is used to extract the `id` parameter from the
 * @param res - The `res` parameter in the `delete_note` function is the response object that is used
 * to send a response back to the client who made the request. It is typically used to send JSON data,
 * HTML, or other types of responses to the client. In the provided code snippet, the `
 */
const delete_note = (req, res) => {
    const id = req.params.id;
    Note.findByIdAndDelete(id)
      .then((result) => {
        if (result != null) {
          res.json({ msg: "The note was successfully deleted!" });
        } else {
          res.json({ msg: "This note doesn't exist!" });
        }
      })
      .catch((error) => res.json({ msg: error.message }));
  };
  
export { get_all_notes, add_note, get_note_by_id, update_note, delete_note };
