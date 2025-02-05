import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import axios from "axios";

function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/notes", { headers: { Authorization: localStorage.getItem("token") } })
      .then(res => setNotes(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleEdit = async (id, content) => {
    try {
      const res = await axios.put(`http://localhost:5000/notes/${id}`, { content }, { headers: { Authorization: localStorage.getItem("token") } });
      setNotes(prev => prev.map(note => note._id === id ? res.data : note));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`, { headers: { Authorization: localStorage.getItem("token") } });
      setNotes(prev => prev.filter(note => note._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <NoteForm setNotes={setNotes} />
      <div className="notes-list">
        {Array.isArray(notes) && notes.map(note => (
          <NoteCard
            key={note._id}
            note={note}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
