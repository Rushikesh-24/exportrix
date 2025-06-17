// app/api/check-user/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/config/dbConfig";
import User from "@/models/user.models";
import CHA from "@/models/cha.models";


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Valid MongoDB ID is required" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findById(id);
    const cha = await CHA.findById(id);

    const isCHA = !user && !!cha;

    return NextResponse.json({ success: true, isCHA });
  } catch (error) {
    console.error("Error in /api/check-user:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
