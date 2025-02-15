import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import AlarmIcon from "@material-ui/icons/Alarm";

function Note(props) {
  const [alarmTime, setAlarmTime] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(props.title);
  const [newContent, setNewContent] = useState(props.content);


  const handleSetAlarm = async () => {
    if (!alarmTime) return;
    try {
      const response = await fetch(`${process.env.BACKEND_BASEURL}/api/set-alarm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: props.id, time: alarmTime }),
      });
      console.log(response);
      if (response.ok) {
        alert(`Alarm set for ${alarmTime}`);
      } else {
        alert(`Failed to set alarm 🥲`);
      }
    } catch (error) {
      console.log("Error setting alarm: ", error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const response = await fetch(`${process.env.BACKEND_BASEURL}/api/notes/delete/${noteId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Note deleted successfully:", result);
      } else {
        console.error("Failed to delete note:", result.error);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const updateNote = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_BASEURL}/api/notes/update/${props.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle, content: newContent }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Note updated successfully:", result);
        setIsEditing(false); // Exit edit mode
      } else {
        console.error("Failed to update note:", result.error);
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className="note">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <button onClick={updateNote}>Save</button>
        </div>
      ) : (
        <div>
          <h1>{props.title}</h1>
          <p>{props.content}</p>
        </div>
      )}

      <input 
        type="datetime-local"
        value={alarmTime}
        onChange={(e) => setAlarmTime(e.target.value)}
      />
      <div style={{ display: 'flex', }}>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={handleSetAlarm}>
          <AlarmIcon />
        </button>
        <button onClick={() => handleDeleteNote(props.id)}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

export default Note;
