import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import EventRegistration from "@/models/eventRegistration";
import Event from "@/models/eventCalendar";

export async function POST(request) {
  try {
    await dbConnect();

    const data = await request.json();
    const {
      eventId,
      firstName,
      lastName,
      email,
      phone,
      gender,
      dateOfBirth,
      address,
      city,
      district,
      province,
      zipCode,
      organization,
      educationLevel,
      dietaryRestrictions,
      termsAccepted,
      communicationConsent,
      registrationDate,
    } = data;

    // Validate required fields
    if (
      !eventId ||
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !gender ||
      !dateOfBirth ||
      !address ||
      !city ||
      !district ||
      !province ||
      !zipCode ||
      !educationLevel ||
      !termsAccepted
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    // Check if user is already registered for this event
    const existingRegistration = await EventRegistration.findOne({
      eventId,
      email,
    });

    if (existingRegistration) {
      return NextResponse.json(
        { message: "You are already registered for this event" },
        { status: 409 }
      );
    }

    // Create new registration
    const registration = new EventRegistration({
      eventId,
      firstName,
      lastName,
      email,
      phone,
      gender,
      dateOfBirth,
      address,
      city,
      district,
      province,
      zipCode,
      organization,
      educationLevel,
      dietaryRestrictions,
      termsAccepted,
      communicationConsent,
      registrationDate: registrationDate || new Date(),
      status: "registered",
    });

    await registration.save();

    // Update event registration count and add registrant info
    if (!event.registrations) {
      event.registrations = [];
    }
    event.registrations.push({
      userId: registration._id,
      registeredAt: new Date(),
    });
    await event.save();

    return NextResponse.json(
      {
        message: "Registration successful! You are now registered for this event.",
        data: registration,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: error.message || "Registration failed" },
      { status: 500 }
    );
  }
}

// GET all registrations for an event (admin only)
export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;
    const skip = (page - 1) * limit;

    if (!eventId) {
      return NextResponse.json(
        { message: "Event ID is required" },
        { status: 400 }
      );
    }

    // Get total count for pagination
    const total = await EventRegistration.countDocuments({ eventId });

    // Fetch registrations with pagination
    const registrations = await EventRegistration.find({ eventId })
      .sort({ registrationDate: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json(
      {
        message: "Registrations fetched successfully",
        data: registrations,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}

// PATCH: Update registration status (admin only)
export async function PATCH(request) {
  try {
    await dbConnect();

    const data = await request.json();
    const { registrationId, status, notes } = data;

    if (!registrationId || !status) {
      return NextResponse.json(
        { message: "Registration ID and status are required" },
        { status: 400 }
      );
    }

    const validStatuses = ["registered", "confirmed", "attended", "cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { message: "Invalid status" },
        { status: 400 }
      );
    }

    const registration = await EventRegistration.findByIdAndUpdate(
      registrationId,
      { status, notes },
      { new: true }
    );

    if (!registration) {
      return NextResponse.json(
        { message: "Registration not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Registration updated successfully",
        data: registration,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to update registration" },
      { status: 500 }
    );
  }
}

// DELETE: Cancel registration
export async function DELETE(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const registrationId = searchParams.get("id");

    if (!registrationId) {
      return NextResponse.json(
        { message: "Registration ID is required" },
        { status: 400 }
      );
    }

    const registration = await EventRegistration.findByIdAndDelete(registrationId);

    if (!registration) {
      return NextResponse.json(
        { message: "Registration not found" },
        { status: 404 }
      );
    }

    // Remove from event registrations
    await Event.findByIdAndUpdate(
      registration.eventId,
      {
        $pull: { registrations: { userId: registrationId } },
      }
    );

    return NextResponse.json(
      {
        message: "Registration cancelled successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to cancel registration" },
      { status: 500 }
    );
  }
}
