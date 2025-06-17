import { connectDB } from "@/config/dbConfig";
import CHA from "@/models/cha.models";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const recommended = await CHA.find()
      .lean();

    return NextResponse.json({ success: true, data: recommended }, { status: 200 });
  } catch (error) {
    console.error("[RECOMMENDED_CHA_ERROR]", error);
    return NextResponse.json({ success: false, error: "Failed to fetch recommended CHAs" }, { status: 500 });
  }
}
