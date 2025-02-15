import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { ThemeProvider } from "./ThemeContext";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
      axios
        .get("http://localhost:5000/api/notes/all")
        .then((response) => {
          setNotes(response.data.content);
        })
        .catch((error) => {
          console.error("Error fetching notes:", error);
        })
  }, []);

  return (
    <ThemeProvider>
      <Dashboard notes={notes}/>
    </ThemeProvider>
  );
}

const Dashboard = ({ notes }) => (
  <div>
    <Header />
    <CreateArea />
    {notes.map((note) => (
      <Note key={note._id} id={note._id} title={note.title} content={note.content} />
    ))}
    <Footer />
  </div>
);

export default App;
