import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { listings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { sendTelegramMessage } from "@/lib/telegram";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const listingId = parseInt(id, 10);

    if (isNaN(listingId)) {
      return NextResponse.json(
        { error: "Invalid listing ID" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { status: newStatus, adminNotes } = body;

    const validStatuses = [
      "PENDING_REVIEW",
      "AWAITING_PAYMENT",
      "APPROVED",
      "REJECTED",
    ];
    if (!validStatuses.includes(newStatus)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    // Get current listing
    const current = await db
      .select()
      .from(listings)
      .where(eq(listings.id, listingId))
      .limit(1);

    if (current.length === 0) {
      return NextResponse.json(
        { error: "Listing not found" },
        { status: 404 }
      );
    }

    // Update listing
    const updated = await db
      .update(listings)
      .set({
        status: newStatus,
        adminNotes: adminNotes || current[0].adminNotes,
        updatedAt: new Date(),
      })
      .where(eq(listings.id, listingId))
      .returning();

    // Send Telegram notification about status change
    const listing = updated[0];
    const statusMessages: Record<string, string> = {
      AWAITING_PAYMENT: `✅ <b>Content Approved</b>\n\n${listing.firstName} ${listing.lastName}'s listing has been approved. Awaiting payment.`,
      APPROVED: `💰 <b>Payment Confirmed — LIVE</b>\n\n${listing.firstName} ${listing.lastName}'s business is now listed and visible publicly!`,
      REJECTED: `❌ <b>Application Rejected</b>\n\n${listing.firstName} ${listing.lastName}'s listing was rejected.\nReason: ${adminNotes || "No reason provided"}`,
    };

    if (statusMessages[newStatus]) {
      await sendTelegramMessage(statusMessages[newStatus]);
    }

    return NextResponse.json({ listing: updated[0] });
  } catch (error) {
    console.error("Admin update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
