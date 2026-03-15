/**
 * Send a Telegram message with optional inline keyboard buttons.
 */
export async function sendTelegramMessage(
  text: string,
  inlineKeyboard?: { text: string; callback_data: string }[][]
) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

  if (!token || !chatId) {
    console.warn("Telegram not configured — skipping notification");
    return;
  }

  const body: Record<string, unknown> = {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
  };

  if (inlineKeyboard) {
    body.reply_markup = { inline_keyboard: inlineKeyboard };
  }

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      console.error("Telegram API error:", await res.text());
    }
  } catch (err) {
    console.error("Telegram send error:", err);
  }
}

/**
 * Notify admin of a new listing submission via Telegram.
 */
export async function notifyNewListing(listing: {
  id: number;
  firstName: string;
  lastName: string;
  profession: string;
  mobileNumber: string;
  email: string;
}) {
  const message =
    `🆕 <b>New Listing Submission</b>\n\n` +
    `<b>Name:</b> ${listing.firstName} ${listing.lastName}\n` +
    `<b>Profession:</b> ${listing.profession}\n` +
    `<b>Phone:</b> ${listing.mobileNumber}\n` +
    `<b>Email:</b> ${listing.email}\n` +
    `<b>ID:</b> #${listing.id}`;

  await sendTelegramMessage(message, [
    [
      {
        text: "✅ Approve Content",
        callback_data: `approve_${listing.id}`,
      },
      {
        text: "❌ Reject",
        callback_data: `reject_${listing.id}`,
      },
    ],
  ]);
}
