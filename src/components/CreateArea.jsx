import React, { useState, useRef } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

const words = [
  "Attend meeting",
  "Analyze report",
  "Arrange files",
  "Answer emails",
  "Book tickets",
  "Book hotel",
  "Book appointment",
  "Brainstorm ideas",
  "Buy groceries",
  "Buy stationery",
  "Buy gifts",
  "Budget expenses",
  "Call client",
  "Call manager",
  "Call parents",
  "Check emails",
  "Check schedule",
  "Clean desk",
  "Clean room",
  "Code project",
  "Code review",
  "Cook dinner",
  "Cook lunch",
  "Cook breakfast",
  "Debug program",
  "Debug errors",
  "Decide priority",
  "Design UI",
  "Develop website",
  "Develop API",
  "Discuss project",
  "Discuss tasks",
  "Draft document",
  "Draft email",
  "Edit document",
  "Edit presentation",
  "Email report",
  "Email update",
  "Evaluate tasks",
  "Evaluate project",
  "Exercise daily",
  "Exercise routine",
  "Fix bug",
  "Fix code issue",
  "Follow up",
  "Follow instructions",
  "Focus on tasks",
  "Focus on learning",
  "Gather information",
  "Gather resources",
  "Grocery shopping",
  "Grocery list",
  "Handle issue",
  "Handle complaints",
  "Homework assignment",
  "Homework submission",
  "Improve skills",
  "Improve code",
  "Install software",
  "Install updates",
  "Join meeting",
  "Join webinar",
  "Join online class",
  "Journal daily",
  "Keep track",
  "Keep notes",
  "Keep schedule",
  "Keep workspace clean",
  "Learn JavaScript",
  "Learn Python",
  "Learn new skill",
  "List priorities",
  "List expenses",
  "Laundry time",
  "Laundry schedule",
  "Laundry day",
  "Manage projects",
  "Manage deadlines",
  "Manage time",
  "Meeting notes",
  "Meeting preparation",
  "Monitor progress",
  "Monitor budget",
  "Note ideas",
  "Note important points",
  "Organize workspace",
  "Organize files",
  "Organize meeting",
  "Optimize workflow",
  "Optimize productivity",
  "Pay bills",
  "Bill payment",
  "Plan week",
  "Plan weekend",
  "Plan project",
  "Prepare report",
  "Prepare slides",
  "Prepare meeting",
  "Present proposal",
  "Prioritize tasks",
  "Question assumptions",
  "Question solutions",
  "Read book",
  "Read article",
  "Read documentation",
  "Refactor code",
  "Register event",
  "Research topic",
  "Research new trends",
  "Review code",
  "Review performance",
  "Schedule meeting",
  "Schedule tasks",
  "Schedule calls",
  "Send email",
  "Send feedback",
  "Send invoices",
  "Share updates",
  "Study algorithms",
  "Study math",
  "Study programming",
  "Submit assignment",
  "Submit project",
  "Test software",
  "Test application",
  "Track expenses",
  "Track progress",
  "Track orders",
  "Update documents",
  "Update software",
  "Upgrade system",
  "Upgrade knowledge",
  "Verify accounts",
  "Verify tasks",
  "Verify payments",
  "Workout session",
  "Workout plan",
  "Workout daily",
  "Write blog",
  "Write notes",
  "Write report",
  "Watch tutorial",
  "Watch course",
  "Xerox documents",
  "Xerox papers",
  "Yield results",
  "Zoom call",
  "Zoom meeting",
];

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({ title: "", content: "" });
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const textAreaRef = useRef(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));

    if (name === "title") {
      const filteredWords = words.filter((word) =>
        word.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(value ? filteredWords : []);
      setSelectedIndex(-1);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowDown" && suggestions.length > 0) {
      setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (event.key === "ArrowUp" && suggestions.length > 0) {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (event.key === "Enter" && selectedIndex >= 0) {
      event.preventDefault();
      selectSuggestion(suggestions[selectedIndex]);
    }
  }

  function selectSuggestion(word) {
    setNote((prevNote) => ({ ...prevNote, title: word }));
    setSuggestions([]);
    setSelectedIndex(-1);
    textAreaRef.current.focus(); // Move focus to textarea
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({ title: "", content: "" });
    setSuggestions([]);
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <div>
            <input
              name="title"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={note.title}
              placeholder="Title"
              required
            />
            {suggestions.length > 0 && (
              <div className="suggestions">
                {suggestions.map((word, index) => (
                  <div
                    key={index}
                    onClick={() => selectSuggestion(word)}
                    className={`suggestion-item ${
                      index === selectedIndex ? "selected" : ""
                    }`}
                  >
                    {word}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <textarea
          ref={textAreaRef} // Reference for focusing
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          spellCheck="true"
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>

      <style>
        {`
          .suggestions {
            padding: 10px;
            border: 1px solid #ccc;
            max-width: 250px;
            position: absolute;
            background: white;
            border-radius: 8px;
            box-shadow: 2px 4px 14px gray;
            display: ${suggestions.length ? "block" : "none"};
          }
          .suggestion-item {
            padding: 8px;
            cursor: pointer;
          }
          .suggestion-item:hover, .suggestion-item.selected {
            background-color: #f0f0f0;
          }
        `}
      </style>
    </div>
  );
}

export default CreateArea;
