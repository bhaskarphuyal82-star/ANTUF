import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Articles from "@/models/Articles";

export async function GET(req, context) {
  await dbConnect();

  try {
    const params = await context.params;
    const articles = await Articles.findOne({
      _id: params.id,
    });
    console.log("data gotten from curr course model----", articles);
    return NextResponse.json(articles);
  } catch (error) {
    console.log("error from GET of edit course---", error);
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
