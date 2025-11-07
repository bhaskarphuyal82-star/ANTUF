import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Articles from "@/models/Articles";
export async function GET() {
  await dbConnect();

  try {
    const article = await Articles.find({})
      .populate("category", "name") // Populate category with name field
      .sort({ createdAt: -1 })
      .limit(6);
    return NextResponse.json(article);
  } catch (error) {
    console.log("Error from GET of articles--", error);
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
