import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { listings } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const allApplications = await db
      .select()
      .from(listings)
      .orderBy(desc(listings.createdAt));

    return NextResponse.json({ applications: allApplications });
  } catch (error) {
    console.error("Admin applications error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
