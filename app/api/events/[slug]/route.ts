import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Event } from "@/database";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

/**
 * Fetches an event by its slug and returns a JSON response.
 *
 * @param params - A promise that resolves to the route parameters object containing `slug`.
 * @returns A JSON response containing the matching `event` on success; on failure a JSON object with a `message` and, when available, an `error` field describing the problem.
 */
export async function GET(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    // Validate that the slug parameter is present and valid
    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { message: "Invalid or missing event slug parameter." },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Query the Event model by slug
    const event = await Event.findOne({ slug });

    // Handle case where no event matches the provided slug
    if (!event) {
      return NextResponse.json(
        { message: `Event matching slug '${slug}' was not found.` },
        { status: 404 }
      );
    }

    // Return successfully fetched event
    return NextResponse.json(
      { message: "Event fetched successfully", event },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error fetching event by slug:", error);
    return NextResponse.json(
      {
        message: "An error occurred while fetching event details.",
        error: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
}
