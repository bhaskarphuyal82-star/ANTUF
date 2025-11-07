import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";

import Slider from "@/models/slider";

export async function GET() {
  await dbConnect();

  try {
    const sliders = await Slider.find({}).sort({ createdAt: -1 });
    console.log("Sliders:", sliders); // Fixed console.log typo too

    return NextResponse.json(sliders);
  } catch (error) {
    console.error("Error fetching sliders:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}