"use client";

import { FormEvent, useEffect, useState } from "react";

const NoteForm = () => {
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState<{ date: string; note: string }[]>([]);
  const nowStr = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(nowStr);

  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const msToMidnight = tomorrow.getTime() - now.getTime();

    const timer = setTimeout(() => {
      setDate(new Date().toISOString().split("T")[0]);
    }, msToMidnight);

    return () => clearTimeout(timer);
  }, []);

  const validateForm = async () => {
    if (!content.trim()) {
      alert("Content cannot be empty.");
      return false;
    }

    try {
      const res = await fetch(`/api/notes?date=${date}`);
      const data = await res.json();
      if (data.exists) {
        alert(
          "A note for this date already exists. Please edit the existing note."
        );
        return false;
      }
      const selectedDate = new Date(date).getTime();
      const todayDate = new Date().getTime();

      if (selectedDate > todayDate) {
        alert("This day hasn't come yet.");
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error checking existing note:", error);
      alert("Failed to validate date.");
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form...");

    const isValid = await validateForm();
    if (!isValid) return;

    const newNote = { date, content }; // ✅ 确保字段匹配后端 `{ date, content }`
    console.log("📌 Sending data:", newNote);

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });

      const responseData = await res.json(); // ✅ 解析 JSON
      if (res.ok) {
        alert("✅ Note saved successfully!");
        setContent("");
        setNotes((prevNotes) => [responseData.note, ...prevNotes]);
      } else {
        console.error("❌ API Error:", responseData);
      }
    } catch (error) {
      console.error("❌ Fetch failed:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col justify-between items-center h-[400px] w-[90%] mx-auto my-10 p-4 bg-[#6f493d] border-[1.6px] border-[#402e32]"
      >
        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(new Date(e.target.value).toISOString().split("T")[0])
          }
          className="absolute left-4 top-4 text-[#402e32] bg-[#f4e5ce] text-sm border-[#402e32]"
        />

        <div className="relative w-[93%] h-[288px] text-start bg-[#f4e5ce] my-10">
          <textarea
            maxLength={400}
            onChange={(e) => setContent(e.target.value)}
            value={content}
            className="absolute w-full h-full p-2 text-base"
          />
        </div>

        <div className="absolute text-sm text-[#6f493d] bottom-16 right-12">
          {content.length}/400
        </div>

        <button
          type="button"
          onClick={() => setContent("")}
          className="absolute w-[80px] h-[24px] right-[112px] bottom-[12.8px] cursor-pointer font-semibold text-[#402e32] bg-[#f4e5ce] text-base hover:bg-[#e3be86]"
        >
          clean
        </button>
        <button
          type="submit"
          className="absolute w-[80px] right-[24px] h-[24px] bottom-[12.8px] cursor-pointer font-semibold text-[#402e32] bg-[#f4e5ce] text-base hover:bg-[#e3be86]"
        >
          submit
        </button>
      </form>
    </>
  );
};

export default NoteForm;
