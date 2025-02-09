import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "#/libs/mongodb";
import { Note } from "#/libs/models/Note";
import mongoose from "mongoose";

// Update a note
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    // Await the entire params object
    const { id } = await params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "❌ Invalid note ID format" },
        { status: 400 }
      );
    }

    // Get update data from request body
    const { date, content } = await request.json();
    
    if (!date || !content) {
      return NextResponse.json(
        { message: "❌ Missing required fields" },
        { status: 400 }
      );
    }

    // Check if another note exists with the same date (excluding current note)
    const existingNote = await Note.findOne({ 
      date, 
      _id: { $ne: id } 
    });
    
    if (existingNote) {
      return NextResponse.json(
        { message: "❌ A note for this date already exists" },
        { status: 400 }
      );
    }

    // Find and update the note
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { date, content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return NextResponse.json(
        { message: "❌ Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "✅ Note updated successfully",
      note: { ...updatedNote.toObject(), _id: updatedNote._id.toString() }
    });

  } catch (error) {
    console.error("🔥 PUT Error:", error);
    return NextResponse.json(
      { message: "❌ Server error", error },
      { status: 500 }
    );
  }
}

// Delete a note
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    // Await the entire params object
    const { id } = await params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "❌ Invalid note ID format" },
        { status: 400 }
      );
    }

    // Find and delete the note
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return NextResponse.json(
        { message: "❌ Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "✅ Note deleted successfully",
      note: { ...deletedNote.toObject(), _id: deletedNote._id.toString() }
    });

  } catch (error) {
    console.error("🔥 DELETE Error:", error);
    return NextResponse.json(
      { message: "❌ Server error", error },
      { status: 500 }
    );
  }
}