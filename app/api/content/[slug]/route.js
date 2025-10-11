// Import necessary modules
import { NextResponse } from "next/server"; // Importing Next.js response handler for API routes
import dbConnect from "@/utils/dbConnect"; // Utility function to establish a database connection
import Curriculum from "@/models/Curriculum"; // Curriculum model to interact with the 'Curriculum' collection in the database

// Define the GET function to retrieve a specific curriculum or lecture by slug
export async function GET(req, context) {
  await dbConnect(); // Establish a database connection before querying

  // Await params to handle the Promise in Next.js 15+
  const params = await context.params;
  
  // Validate slug parameter - ensuring it's present and is a string
  const slug = params?.slug; // Extract the 'slug' parameter from the URL context

  // Check if the slug is missing or invalid (not a string)
  if (!slug || typeof slug !== "string") {
    // Return a 400 Bad Request response with an error message if slug is invalid or missing
    return NextResponse.json(
      { error: "Invalid or missing 'slug' parameter" },
      { status: 400 }
    );
  }

  try {
    // First, try to find a curriculum by the course slug (like "c-programming")
    let curriculum = await Curriculum.findOne({ slug });

    if (curriculum) {
      // Found a curriculum by course slug, return the full curriculum
      return NextResponse.json(curriculum);
    }

    // If no curriculum found by course slug, try to find a curriculum containing a lecture with this slug
    curriculum = await Curriculum.findOne({
      "sections.lectures.slug": slug, // Search for a lecture within sections that matches the slug
    });

    if (!curriculum) {
      return NextResponse.json(
        { error: "Curriculum or lecture not found" },
        { status: 404 }
      );
    }

    // If a curriculum is found with the matching lecture slug, search for the exact lecture
    let matchingLecture = null;

    // Loop through each section of the found curriculum
    for (const section of curriculum.sections) {
      // Find a lecture within each section that matches the slug
      const lecture = section.lectures.find((lecture) => lecture.slug === slug);
      if (lecture) {
        // If a matching lecture is found, store the lecture and break the loop
        matchingLecture = {
          ...lecture._doc, // Extract the raw lecture object from the MongoDB document
        };
        break; // Stop the loop once the lecture is found
      }
    }

    // If no matching lecture is found within any section, return a 404 error
    if (!matchingLecture) {
      return NextResponse.json(
        { message: "Lecture not found in sections." },
        { status: 404 }
      );
    }

    // Return the found lecture if a match was found
    return NextResponse.json(matchingLecture);
  } catch (err) {
    // If any errors occur during the database query or any other unexpected error, return a 500 error
    return NextResponse.json(
      { error: "Failed to fetch curriculum", details: err.message },
      { status: 500 }
    );
  }
}
