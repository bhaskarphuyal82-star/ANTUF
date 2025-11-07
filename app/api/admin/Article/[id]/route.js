import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import slugify from "slugify";
import Articles from "@/models/Articles";

export async function PUT(req, context) {
  try {
    await dbConnect();

    const body = await req.json();
    console.log("Received update data:", body);

    if (!body.title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const updateData = {
      title: body.title,
      slug: slugify(body.title, { lower: true, strict: true }),
      imageUrl: body.imageUrl,
      sections: body.sections || [],
      updatedAt: new Date(),
    };

    const article = await Articles.findByIdAndUpdate(
      context.params.id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    console.log("Updated article:", article);
    return NextResponse.json(article);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update article" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  try {
    await dbConnect();

    const article = await Articles.findByIdAndDelete(context.params.id);

    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    console.log("Deleted article:", article);
    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete article" },
      { status: 500 }
    );
  }
}
