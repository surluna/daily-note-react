import { NextResponse } from "next/server";
import { connectToDatabase } from "#/libs/mongodb";
import { Note } from "#/libs/models/Note";
import mongoose from "mongoose";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const id = params.id;

    console.log("🚀 Attempting to delete note with ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "❌ Invalid note ID" },
        { status: 400 }
      );
    }

    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return NextResponse.json(
        { message: "❌ Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "✅ Note deleted successfully" });
  } catch (error) {
    console.error("🔥 Server error while deleting note:", error);
    return NextResponse.json(
      { message: "❌ Server error", error },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const id = params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "❌ Invalid note ID" },
        { status: 400 }
      );
    }

    const { content, date } = await req.json();
    if (!content || !date) {
      return NextResponse.json(
        { message: "❌ Missing required fields" },
        { status: 400 }
      );
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { content, date },
      { new: true }
    );

    if (!updatedNote) {
      return NextResponse.json(
        { message: "❌ Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "✅ Note updated successfully",
      note: { ...updatedNote.toObject(), _id: updatedNote._id.toString() },
    });
  } catch (error) {
    console.error("🔥 Server error while updating note:", error);
    return NextResponse.json(
      { message: "❌ Server error", error },
      { status: 500 }
    );
  }
}
