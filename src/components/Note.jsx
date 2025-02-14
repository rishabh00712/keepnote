import React, {useState} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import AlarmIcon from "@material-ui/icons/Alarm";

function Note(props) {
  const [alarmTime, setAlarmTime] = useState("");

  const handleSetAlarm = async() => {
    if(!alarmTime)  return;
    try{  
      const response = await fetch("http://localhost:5000/api/set-alarm", {
        method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id : props.id, time : alarmTime })
      })
      console.log(response);
      if(response){
        alert(`Alarm set for ${alarmTime}`);
      }else{
        alert(`Failed to set alarm 🥲`);
      }
    }catch(error){
      console.log("Error setting alarm: ", error);
    }
  }

  const handleDeleteNote = async (noteId) => {
    try {
        const response = await fetch(`http://localhost:5000/api/notes/delete/${noteId}`, {
            method: "DELETE",
        });

        const result = await response.json();

        if (response.ok) {
            console.log("Note deleted successfully:", result);
            // Optionally, update state or UI to remove the deleted note
        } else {
            console.error("Failed to delete note:", result.error);
        }
    } catch (error) {
        console.error("Error deleting note:", error);
    }
  };

  const updateNote = async (noteId, updatedData) => {
    try {
        const response = await fetch(`http://localhost:5000/api/notes/update/${noteId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });

        const result = await response.json();

        if (response.ok) {
            console.log("Note updated successfully:", result);
            // Optionally, update state or UI to reflect changes
        } else {
            console.error("Failed to update note:", result.error);
        }
    } catch (error) {
        console.error("Error updating note:", error);
    }
  };



  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>

      <input 
        type="datetime-local"
        value={alarmTime}
        onChange={(e)=>setAlarmTime(e.target.value)}
      />

      <button onClick={handleSetAlarm}>
        <AlarmIcon />
      </button>
      <button onClick={handleDeleteNote}>
        <DeleteIcon />
      </button>

      <button onClick={() => updateNote(props.id, { title: "New Title", content: "Updated content" })}>
        Update
      </button>

    </div>
  );
}

export default Note;
