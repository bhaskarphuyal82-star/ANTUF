import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";

export async function POST(req) {
  try {
    await dbConnect();

    const { email, secretKey } = await req.json();

    // Simple secret key check (you should change this)
    if (secretKey !== 'make-admin-secret-2024') {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Update to admin
    user.role = 'admin';
    user.isAdmin = true;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "User updated to admin",
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
        isAdmin: user.isAdmin,
      }
    });

  } catch (error) {
    console.error("Error setting admin role:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
