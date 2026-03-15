import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { listings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { sendTelegramMessage } from "@/lib/telegram";

export async function POST(req: Request) {
  try {
    // Verify webhook secret
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get("secret");

    if (secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Handle callback queries (inline button presses)
    if (body.callback_query) {
      const callbackData = body.callback_query.data as string;
      const chatId = body.callback_query.from.id.toString();
      const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

      // Verify it's from the admin
      if (chatId !== adminChatId) {
        return NextResponse.json({ ok: true });
      }

      // Parse action
      const [action, idStr] = callbackData.split("_");
      const listingId = parseInt(idStr, 10);

      if (isNaN(listingId)) {
        return NextResponse.json({ ok: true });
      }

      let newStatus: string;
      let message: string;

      switch (action) {
        case "approve":
          newStatus = "AWAITING_PAYMENT";
          message = "✅ Content approved! User can now proceed to payment.";
          break;
        case "reject":
          newStatus = "REJECTED";
          message = "❌ Application rejected.";
          break;
        case "confirmpay":
          newStatus = "APPROVED";
          message = "💰 Payment confirmed! Listing is now LIVE.";
          break;
        default:
          return NextResponse.json({ ok: true });
      }

      // Update listing in database
      const updated = await db
        .update(listings)
        .set({
          status: newStatus,
          adminNotes:
            action === "approve"
              ? "Content approved via Telegram"
              : action === "reject"
              ? "Rejected via Telegram"
              : "Payment confirmed via Telegram",
          updatedAt: new Date(),
        })
        .where(eq(listings.id, listingId))
        .returning();

      if (updated.length > 0) {
        // If approved content, send new message with payment confirm button
        if (action === "approve") {
          await sendTelegramMessage(
            `${message}\n\n<b>${updated[0].firstName} ${updated[0].lastName}</b> — ${updated[0].profession}\n\nWhen payment is received, tap below:`,
            [
              [
                {
                  text: "💰 Confirm Payment",
                  callback_data: `confirmpay_${listingId}`,
                },
              ],
            ]
          );
        } else {
          await sendTelegramMessage(
            `${message}\n\n<b>${updated[0].firstName} ${updated[0].lastName}</b> — ${updated[0].profession}`
          );
        }
      }

      // Answer callback query to remove loading state
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      await fetch(
        `https://api.telegram.org/bot${botToken}/answerCallbackQuery`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            callback_query_id: body.callback_query.id,
            text: message,
          }),
        }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram webhook error:", error);
    return NextResponse.json({ ok: true }); // Always return 200 to Telegram
  }
}
