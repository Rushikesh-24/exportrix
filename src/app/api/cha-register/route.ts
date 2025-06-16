import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/config/dbConfig";
import CHA from "@/models/cha.models";


export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const {
      name,
      email,
      password,
      experience,
      license,
      languages,
      serviceCapabilities,
      specialization,
      location,
    } = await req.json();

    // Validate required fields
    if (!name || !email || !password || !experience || !serviceCapabilities || !location) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 422 }
      );
    }

    // Check for existing user
    const existingUser = await CHA.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    // Create new user
    const newUser = new CHA({
      name,
      email,
      password,
      experience,
      license,
      languages,
      services: serviceCapabilities,
      specialization,
      location,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET!, {
      expiresIn: "365d",
    });

    const response = NextResponse.json(
      {
        user: newUser,
        id: newUser._id,
        name: newUser.name,
        token,
        message: "CHA Professional registered successfully",
        success: true,
      },
      { status: 201 }
    );

    // Set auth cookie
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
