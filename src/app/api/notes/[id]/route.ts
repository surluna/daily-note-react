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
// **处理 PUT 请求（更新笔记）**
export async function PUT(
  req: Request,
  { params }: { params?: { id?: string } }
) {
  try {
    await connectToDatabase();

    const id = params?.id; // ✅ 获取笔记 ID
    if (!id) {
      return NextResponse.json(
        { message: "❌ Note ID is required" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "❌ Invalid note ID" },
        { status: 400 }
      );
    }

    const { content, date } = await req.json(); // ✅ 获取 `content` & `date`

    if (!content || !date) {
      return NextResponse.json(
        { message: "❌ Missing required fields" },
        { status: 400 }
      );
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { content, date },
      { new: true } // ✅ 返回更新后的笔记
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
