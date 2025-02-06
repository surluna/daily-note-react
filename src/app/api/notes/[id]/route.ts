import { NextResponse } from "next/server";
import { connectToDatabase } from "#/libs/mongodb";
import { Note } from "#/libs/models/Note";
import mongoose from "mongoose";

// **处理 DELETE 请求**
export async function DELETE(
  req: Request,
  { params }: { params?: { id?: string } } // 确保 params 是可选的
) {
  try {
    await connectToDatabase();

    const id = params?.id; // ✅ 确保 params 可访问

    console.log("🚀 Attempting to delete note with ID:", id);

    if (!id) {
      return NextResponse.json(
        { message: "❌ Note ID is required" },
        { status: 400 }
      );
    }

    // **确保 `id` 是合法的 MongoDB `ObjectId`**
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "❌ Invalid note ID" },
        { status: 400 }
      );
    }

    const deletedNote = await Note.findByIdAndDelete(id);
    console.log("🗑 Deleted note:", deletedNote);

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
