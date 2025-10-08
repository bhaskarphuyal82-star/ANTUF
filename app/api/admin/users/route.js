import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";

// Get all users (admin only)
export async function GET(req) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ err: "Unauthorized" }, { status: 401 });
  }

  try {
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}

// Update user role (admin only)
export async function PUT(req) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ err: "Unauthorized" }, { status: 401 });
  }

  try {
    const { userId, role } = await req.json();

    if (!userId || !role || !["user", "admin"].includes(role)) {
      return NextResponse.json({ err: "Invalid data" }, { status: 400 });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return NextResponse.json({ err: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ msg: "User role updated successfully", user });
  } catch (error) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
