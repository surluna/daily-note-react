import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "#/libs/mongodb";
import { Note } from "#/libs/models/Note";
import mongoose from "mongoose";
