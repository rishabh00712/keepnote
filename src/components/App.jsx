import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });

    if (newNote.timer) {
      setReminder(newNote.title, newNote.timer);
    }
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => index !== id);
    });
  }

  function setReminder(title, minutes) {
    const timeInMs = minutes * 60000;
    setTimeout(() => {
      alert(`Reminder: ${title}`);
    }, timeInMs);
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => (
        <Note
          key={index}
          id={index}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
