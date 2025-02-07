import { NextResponse } from "next/server";
import { connectToDatabase } from "#/libs/mongodb";
import { Note } from "#/libs/models/Note";
import mongoose from "mongoose";

// **获取所有笔记**
export async function GET(req: Request) {
  await connectToDatabase();
  try {
    const notes = await Note.find({});
    return NextResponse.json({
      notes: notes.map((note) => ({
        ...note.toObject(),
        _id: note._id.toString(), // **确保 `_id` 是字符串**
      })),
    });
  } catch (error) {
    console.error("🔥 GET Error:", error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}

// **新增笔记**
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { date, content } = await req.json();

    if (!date || !content) {
      return NextResponse.json(
        { message: "❌ Missing required fields" },
        { status: 400 }
      );
    }

    const existingNote = await Note.findOne({ date });
    if (existingNote) {
      return NextResponse.json(
        { message: "❌ A note for this date already exists." },
        { status: 400 }
      );
    }

    const newNote = new Note({ date, content });
    await newNote.save();

    return NextResponse.json(
      {
        message: "✅ Note saved successfully",
        note: { ...newNote.toObject(), _id: newNote._id.toString() },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("🔥 POST Error:", error);
    return NextResponse.json(
      { message: "❌ Server error", error },
      { status: 500 }
    );
  }
}
