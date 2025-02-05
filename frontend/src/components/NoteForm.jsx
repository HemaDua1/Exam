import React, { useState } from "react";
import axios from "axios";

function NoteForm({ setNotes }) {
  const [content, setContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/notes", { content, type: "text" }, { headers: { Authorization: localStorage.getItem("token") } });
    setNotes(prev => [res.data, ...prev]);
    setContent("");
  };

  const handleAudioSubmit = async (transcription) => {
    const res = await axios.post("http://localhost:5000/notes", { content: transcription, type: "audio" }, { headers: { Authorization: localStorage.getItem("token") } });
    setNotes(prev => [res.data, ...prev]);
  };

  const startRecording = () => {
    setIsRecording(true);
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcription = event.results[0][0].transcript;
      handleAudioSubmit(transcription);
      setIsRecording(false);
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setIsRecording(false);
    };

    recognition.start();
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
      <button type="submit">Add Note</button>
      <button type="button" onClick={startRecording} disabled={isRecording}>
        {isRecording ? "Recording..." : "Record Audio Note"}
      </button>
    </form>
  );
}

export default NoteForm;
