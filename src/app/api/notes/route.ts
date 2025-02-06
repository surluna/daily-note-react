import { NextResponse } from "next/server";
import { connectToDatabase } from "#/libs/mongodb";
import { Note } from "#/libs/models/Note";

export async function GET(req: Request) {
  await connectToDatabase();

  const url = new URL(req.url);
  const date = url.searchParams.get("date");
  if (!date) {
    return NextResponse.json({ error: "Date is required" }, { status: 400 });
  }

  const existingNote = await Note.findOne({ date });

  return NextResponse.json({ exists: !!existingNote });
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { date, note } = await req.json();

    const newNote = new Note({ date, note });
    await newNote.save();

    return NextResponse.json(
      { message: "Notes saved successfully", note: newNote },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "server error", error },
      { status: 500 }
    );
  }
}
