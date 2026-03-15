import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { listings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const profession = searchParams.get("profession");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 50);
    const offset = (page - 1) * limit;

    // Only return approved listings
    let query = db
      .select({
        id: listings.id,
        firstName: listings.firstName,
        lastName: listings.lastName,
        profession: listings.profession,
        mobileNumber: listings.mobileNumber,
        email: listings.email,
        address: listings.address,
        description: listings.description,
      })
      .from(listings)
      .where(eq(listings.status, "APPROVED"))
      .limit(limit)
      .offset(offset);

    if (profession) {
      query = db
        .select({
          id: listings.id,
          firstName: listings.firstName,
          lastName: listings.lastName,
          profession: listings.profession,
          mobileNumber: listings.mobileNumber,
          email: listings.email,
          address: listings.address,
          description: listings.description,
        })
        .from(listings)
        .where(eq(listings.status, "APPROVED"))
        .limit(limit)
        .offset(offset);
      // Note: profession filtering with LIKE would need raw SQL or ilike from drizzle
    }

    const results = await query;

    return NextResponse.json({
      listings: results,
      page,
      limit,
    });
  } catch (error) {
    console.error("Error fetching public listings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
