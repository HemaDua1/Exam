import React, { useState } from "react";

function NoteCard({ note, onDelete, onEdit }) {
  if (!note || !note.content) {
    return null;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(note.content);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = () => {
    if (typeof onEdit === 'function') {
      onEdit(note._id, editedContent);
      setIsEditing(false);
    } else {
      console.error("onEdit is not a function");
    }
  };

  return (
    <div>
      <div className="note-card border p-4 rounded-lg shadow-md bg-white" onClick={() => setIsModalOpen(true)}>
        <h3 className="font-semibold text-lg">{note.type === "audio" ? "Audio Note" : "Text Note"}</h3>
        <p className="text-gray-600">{note.content.substring(0, 50)}...</p>
      </div>

      {isModalOpen && (
        <div className="modal fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-1/2">
            <h3 className="font-semibold text-lg">{note.type === "audio" ? "Audio Note" : "Text Note"}</h3>
            <p className="text-gray-600">{note.content}</p>
            {note.type === "audio" && <p className="text-gray-600">Transcription: {note.transcription}</p>}

            {isEditing ? (
              <div className="edit-section mt-2">
                <textarea
                  className="w-full border p-2 rounded"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-1 rounded mt-2">
                  Save
                </button>
              </div>
            ) : (
              <div className="flex justify-between mt-3">
                <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                  Edit
                </button>
                <button onClick={() => onDelete(note._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </div>
            )}
            <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white px-3 py-1 rounded mt-2">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteCard;
