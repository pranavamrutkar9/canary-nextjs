import { connectToDatabase } from "@/lib/mongodb";
import { Event } from "@/database";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({ secure: true });

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const contentType = req.headers.get("content-type") || "";
    let eventPayload: Record<string, unknown>;

    if (contentType.includes("application/json")) {
      eventPayload = await req.json();
    } else {
      const formData = await req.formData();
      const entries = Object.fromEntries(formData.entries());

      // Handle Cloudinary upload for image File
      const file = formData.get("image") as File | null;
      let secureUrl = entries.image as string | undefined;

      if (file && typeof file === "object" && "arrayBuffer" in file) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        const uploadRes = await new Promise<UploadApiResponse>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "canary_events" },
            (error, result) => {
              if (error || !result) {
                return reject(error || new Error("Failed to upload image"));
              }
              resolve(result);
            }
          );
          uploadStream.end(buffer);
        });

        secureUrl = uploadRes.secure_url;
      }

      eventPayload = {
        ...entries,
        image: secureUrl,
      };

      // Handle array fields if submitted as JSON strings in formData
      if (typeof eventPayload.tags === "string" && eventPayload.tags.startsWith("[")) {
        try { eventPayload.tags = JSON.parse(eventPayload.tags); } catch {}
      }
      if (typeof eventPayload.agenda === "string" && eventPayload.agenda.startsWith("[")) {
        try { eventPayload.agenda = JSON.parse(eventPayload.agenda); } catch {}
      }
    }

    const createdEvent = await Event.create(eventPayload);

    return NextResponse.json(
      { message: "Event Created Successfully", event: createdEvent },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Event Creation Failed",
        error: e instanceof Error ? e.message : "Unknown Error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const events = await Event.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ message: "Events Fetched Successfully", events}, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Failed to Fetch Events",
        error: e instanceof Error ? e.message : "Unknown Error",
      },
      { status: 500 }
    );
  }
}