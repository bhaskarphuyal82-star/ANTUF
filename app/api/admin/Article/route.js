import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Articles from "@/models/Articles";
import slugify from "slugify";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    console.log("Received request body:", body);

    // Validate required fields
    if (!body.title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    // Validate category
    if (!body.category) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );
    }

    // Create article data
    const articleData = {
      title: body.title.trim(),
      slug: slugify(body.title, { lower: true, strict: true }),
      featureImage: body.featureImage,
      category: body.category, // Store the category ID
      imageAlt: `${body.title.trim()} feature image`,
      sections: [],
    };

    // Create and save the article
    const article = await Articles.create(articleData);

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create article" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const articles = await Articles.find()
      .populate({
        path: "category",
        select: "name _id",
        model: "SubCategory",
      })
      .sort({ createdAt: -1 });

    console.log("Articles with populated categories:", articles);

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
