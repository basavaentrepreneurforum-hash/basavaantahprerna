import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { listings, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import {
  sanitizeInput,
  isValidMobileNumber,
  isValidDescription,
  isValidProfession,
  isValidAddress,
} from "@/lib/utils/sanitize";
import { notifyNewListing } from "@/lib/telegram";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { profession, mobileNumber, address, description } = body;

    // Validate required fields
    if (!profession || !mobileNumber || !address || !description) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedProfession = sanitizeInput(profession);
    const sanitizedMobile = sanitizeInput(mobileNumber).replace(/\s/g, "");
    const sanitizedAddress = sanitizeInput(address);
    const sanitizedDescription = sanitizeInput(description);

    // Validate
    if (!isValidProfession(sanitizedProfession)) {
      return NextResponse.json(
        { error: "Invalid profession" },
        { status: 400 }
      );
    }
    if (!isValidMobileNumber(sanitizedMobile)) {
      return NextResponse.json(
        { error: "Invalid mobile number. Must be a 10-digit Indian number." },
        { status: 400 }
      );
    }
    if (!isValidAddress(sanitizedAddress)) {
      return NextResponse.json(
        { error: "Invalid address" },
        { status: 400 }
      );
    }
    if (!isValidDescription(sanitizedDescription)) {
      return NextResponse.json(
        { error: "Description must be between 1-400 characters" },
        { status: 400 }
      );
    }

    // Ensure user exists in DB (upsert)
    const existingUsers = await db
      .select()
      .from(users)
      .where(eq(users.email, session.user.email))
      .limit(1);

    let userId: number;
    if (existingUsers.length === 0) {
      const inserted = await db
        .insert(users)
        .values({
          googleId: session.user.googleId || session.user.id,
          email: session.user.email,
          firstName: session.user.firstName || "",
          lastName: session.user.lastName || "",
          image: session.user.image || null,
          role: session.user.role || "user",
        })
        .returning({ id: users.id });
      userId = inserted[0].id;
    } else {
      userId = existingUsers[0].id;
    }

    // Check if user already has an active listing
    const existingListings = await db
      .select()
      .from(listings)
      .where(eq(listings.userId, userId))
      .limit(1);

    if (existingListings.length > 0) {
      return NextResponse.json(
        {
          error: "You already have a listing submission. Check your profile for status.",
          listing: existingListings[0],
        },
        { status: 409 }
      );
    }

    // Create listing
    const newListing = await db
      .insert(listings)
      .values({
        userId,
        firstName: session.user.firstName || "",
        lastName: session.user.lastName || "",
        email: session.user.email,
        dateOfBirth: body.dateOfBirth || null,
        profession: sanitizedProfession,
        mobileNumber: sanitizedMobile,
        address: sanitizedAddress,
        description: sanitizedDescription,
        status: "PENDING_REVIEW",
      })
      .returning();

    // Notify admin via Telegram
    await notifyNewListing({
      id: newListing[0].id,
      firstName: newListing[0].firstName,
      lastName: newListing[0].lastName,
      profession: newListing[0].profession,
      mobileNumber: newListing[0].mobileNumber,
      email: newListing[0].email,
    });

    return NextResponse.json(
      { message: "Listing submitted successfully", listing: newListing[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's listing(s)
    const userRecords = await db
      .select()
      .from(users)
      .where(eq(users.email, session.user.email))
      .limit(1);

    if (userRecords.length === 0) {
      return NextResponse.json({ listings: [] });
    }

    const userListings = await db
      .select()
      .from(listings)
      .where(eq(listings.userId, userRecords[0].id));

    return NextResponse.json({ listings: userListings });
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
