import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "#/libs/mongodb";
import { Note } from "#/libs/models/Note";

// **更新笔记**
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  const { id } = params;
  const { date, content } = await req.json();

  if (!date || !content) {
    return NextResponse.json({ message: "❌ 缺少必填字段" }, { status: 400 });
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { date, content },
      { new: true }
    );

    if (!updatedNote) {
      return NextResponse.json({ message: "❌ 笔记未找到" }, { status: 404 });
    }

    return NextResponse.json({
      message: "✅ 笔记更新成功",
      note: { ...updatedNote.toObject(), _id: updatedNote._id.toString() },
    });
  } catch (error) {
    console.error("🔥 更新错误:", error);
    return NextResponse.json(
      { message: "❌ 服务器错误", error },
      { status: 500 }
    );
  }
}

// **删除笔记**
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  const { id } = params;

  try {
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return NextResponse.json({ message: "❌ 笔记未找到" }, { status: 404 });
    }

    return NextResponse.json({ message: "✅ 笔记删除成功" });
  } catch (error) {
    console.error("🔥 删除错误:", error);
    return NextResponse.json(
      { message: "❌ 服务器错误", error },
      { status: 500 }
    );
  }
}
