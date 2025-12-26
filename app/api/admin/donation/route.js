import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/utils/dbConnect";
import DonationPage from "@/models/DonationPage";

// GET /api/admin/donation - Get donation page content
export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "admin") {
            return NextResponse.json(
                { error: "Unauthorized. Admin access required." },
                { status: 401 }
            );
        }

        await dbConnect();

        let donationPage = await DonationPage.findOne({ isActive: true });

        // If no donation page exists create default one
        if (!donationPage) {
            donationPage = await DonationPage.create({
                impactItems: [
                    { amount: 500, description: "एक श्रमिकलाई कानूनी परामर्श" },
                    { amount: 2000, description: "तालिम कार्यक्रम सञ्चालन" },
                    { amount: 10000, description: "२० श्रमिकहरूलाई अधिकार शिक्षा" },
                ],
            });
        }

        return NextResponse.json({
            success: true,
            data: donationPage,
        });
    } catch (error) {
        console.error("Error fetching donation page:", error);
        return NextResponse.json(
            { error: "Failed to fetch donation page", details: error.message },
            { status: 500 }
        );
    }
}

// PUT /api/admin/donation - Update donation page content
export async function PUT(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "admin") {
            return NextResponse.json(
                { error: "Unauthorized. Admin access required." },
                { status: 401 }
            );
        }

        await dbConnect();

        const body = await request.json();

        let donationPage = await DonationPage.findOne({ isActive: true });

        if (donationPage) {
            // Update existing
            donationPage = await DonationPage.findByIdAndUpdate(
                donationPage._id,
                {
                    ...body,
                    updatedBy: session.user.id,
                },
                { new: true, runValidators: true }
            );
        } else {
            // Create new
            donationPage = await DonationPage.create({
                ...body,
                updatedBy: session.user.id,
            });
        }

        return NextResponse.json({
            success: true,
            message: "Donation page updated successfully",
            data: donationPage,
        });
    } catch (error) {
        console.error("Error updating donation page:", error);
        return NextResponse.json(
            { error: "Failed to update donation page", details: error.message },
            { status: 500 }
        );
    }
}
