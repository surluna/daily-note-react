import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "#/libs/mongodb";
import { Note } from "#/libs/models/Note";
import mongoose from "mongoose";

// 声明参数类型
type RouteParams = {
  params: {
    id: string;
  };
};

// PUT 请求处理
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "❌ Invalid note ID" },
        { status: 400 }
      );
    }

    const { content, date } = await request.json();
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
    console.error("🔥 PUT Error:", error);
    return NextResponse.json(
      { message: "❌ Server error", error },
      { status: 500 }
    );
  }
}

// DELETE 请求处理
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    const { id } = params;

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
    console.error("🔥 DELETE Error:", error);
    return NextResponse.json(
      { message: "❌ Server error", error },
      { status: 500 }
    );
  }
}
