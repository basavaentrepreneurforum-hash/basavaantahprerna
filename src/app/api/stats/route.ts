import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { listings } from "@/lib/db/schema";
import { eq, countDistinct, count } from "drizzle-orm";

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  try {
    const [professionalsResult, professionsResult] = await Promise.all([
      // Total approved listings (professionals)
      db
        .select({ count: count() })
        .from(listings)
        .where(eq(listings.status, "APPROVED")),

      // Count of distinct professions among approved listings
      db
        .select({ count: countDistinct(listings.profession) })
        .from(listings)
        .where(eq(listings.status, "APPROVED")),
    ]);

    const professionals = professionalsResult[0]?.count ?? 0;
    const professions = professionsResult[0]?.count ?? 0;

    return NextResponse.json({
      professionals,
      professions,
      communities: 1, // Always 1 — the Veerashaiva Lingayat community
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
