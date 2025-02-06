"use client";
import { useState, useEffect } from "react";
import NoteList from "@/components/NoteList";

interface Note {
  _id: string;
  date: string;
  content: string;
}

const Dashboard = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/notes");
      if (!res.ok) throw new Error("Failed to fetch notes");

      const data = await res.json();
      setNotes(data.notes);
    } catch (error) {
      console.error("❌ Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="pb-16">
      <h1 className=" font-semibold text-center text-[#6f493d] text-4xl pb-16">
        Notes Dashboard
      </h1>
      {loading ? (
        <p>Loading notes...</p>
      ) : (
        <NoteList items={notes} onNotesChange={fetchNotes} />
      )}
    </div>
  );
};

export default Dashboard;
