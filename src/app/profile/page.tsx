"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

type ListingStatus =
  | "PENDING_REVIEW"
  | "AWAITING_PAYMENT"
  | "APPROVED"
  | "REJECTED";

interface Listing {
  id: number;
  firstName: string;
  lastName: string;
  profession: string;
  mobileNumber: string;
  email: string;
  address: string;
  description: string;
  status: ListingStatus;
  adminNotes: string | null;
  createdAt: string;
}

const statusConfig: Record<
  ListingStatus,
  { label: string; color: string; bg: string; icon: string }
> = {
  PENDING_REVIEW: {
    label: "Pending Review",
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-200",
    icon: "⏳",
  },
  AWAITING_PAYMENT: {
    label: "Awaiting Payment",
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-200",
    icon: "💳",
  },
  APPROVED: {
    label: "Listed & Live",
    color: "text-green-600",
    bg: "bg-green-50 border-green-200",
    icon: "✅",
  },
  REJECTED: {
    label: "Rejected",
    color: "text-red-600",
    bg: "bg-red-50 border-red-200",
    icon: "❌",
  },
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchListing = useCallback(async () => {
    try {
      const res = await fetch("/api/listings");
      const data = await res.json();
      if (data.listings && data.listings.length > 0) {
        setListing(data.listings[0]);
      }
    } catch (err) {
      console.error("Error fetching listing:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login?callbackUrl=/profile");
      return;
    }
    if (status === "authenticated") {
      fetchListing();
    }
  }, [status, router, fetchListing]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-champagne/30 border-t-champagne rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-16 px-5">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-champagne text-xs font-semibold uppercase tracking-[0.2em] font-data">
            My Profile
          </span>
          <h1 className="text-slate text-3xl font-bold tracking-tight mt-3">
            Application Status
          </h1>
          <hr className="gold-line gold-line-center mt-5" />
        </div>

        {/* User info */}
        <div className="bg-white rounded-xl border border-slate/[0.06] p-5 mb-5 flex items-center gap-4">
          {session.user.image && (
            <img
              src={session.user.image}
              alt=""
              className="w-12 h-12 rounded-full border-2 border-champagne/20"
            />
          )}
          <div>
            <p className="text-slate font-semibold text-sm">
              {session.user.firstName} {session.user.lastName || ""}
            </p>
            <p className="text-slate-muted text-xs">{session.user.email}</p>
          </div>
        </div>

        {!listing ? (
          <div className="bg-white rounded-xl border border-slate/[0.06] p-8 text-center">
            <p className="text-3xl mb-3">📋</p>
            <p className="text-slate font-semibold mb-1">
              No listing found
            </p>
            <p className="text-slate-muted text-sm mb-5">
              You haven&apos;t submitted a listing yet.
            </p>
            <button
              onClick={() => router.push("/get-listed")}
              className="btn btn-primary text-sm"
            >
              Get Listed — ₹199
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Status card */}
            <div
              className={`rounded-xl border p-5 ${
                statusConfig[listing.status as ListingStatus]?.bg ||
                "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {statusConfig[listing.status as ListingStatus]?.icon}
                </span>
                <div>
                  <p
                    className={`font-bold text-sm ${
                      statusConfig[listing.status as ListingStatus]?.color
                    }`}
                  >
                    {statusConfig[listing.status as ListingStatus]?.label}
                  </p>
                  <p className="text-sm text-slate-muted mt-0.5">
                    {listing.status === "PENDING_REVIEW" &&
                      "Your application is being reviewed by our team. We'll update you soon."}
                    {listing.status === "AWAITING_PAYMENT" &&
                      "Your application has been approved! Complete payment to publish your listing."}
                    {listing.status === "APPROVED" &&
                      "Your business is live and visible to all visitors."}
                    {listing.status === "REJECTED" &&
                      "Unfortunately, your application was not approved."}
                  </p>
                </div>
              </div>

              {/* Admin notes */}
              {listing.adminNotes && (
                <div className="mt-3 pt-3 border-t border-current/10">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-muted mb-1">
                    Admin Notes
                  </p>
                  <p className="text-sm text-slate">{listing.adminNotes}</p>
                </div>
              )}
            </div>

            {/* Payment QR — show only when AWAITING_PAYMENT */}
            {listing.status === "AWAITING_PAYMENT" && (
              <div className="bg-white rounded-xl border border-champagne/20 p-6 text-center">
                <h3 className="text-slate font-bold text-lg mb-2">
                  Complete Payment
                </h3>
                <p className="text-slate-muted text-sm mb-5">
                  Scan the QR code below to pay{" "}
                  <span className="font-bold text-champagne">₹199</span> via
                  UPI
                </p>

                {/* QR Code placeholder — will be replaced with actual UPI QR */}
                <div className="w-48 h-48 mx-auto bg-ivory-dim border-2 border-dashed border-champagne/30 rounded-xl flex items-center justify-center mb-4">
                  <div className="text-center">
                    <span className="text-4xl">📱</span>
                    <p className="text-xs text-slate-muted mt-2">
                      UPI QR Code
                    </p>
                    <p className="text-[10px] text-slate-muted/50 mt-1">
                      (To be configured)
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-muted leading-relaxed">
                  After payment, the admin will verify your transaction and
                  publish your listing. This usually takes 1-2 business days.
                </p>
              </div>
            )}

            {/* Progress timeline */}
            <div className="bg-white rounded-xl border border-slate/[0.06] p-5">
              <p className="text-xs text-slate-muted uppercase tracking-wider font-semibold mb-4">
                Progress
              </p>
              <div className="space-y-4">
                {[
                  { step: "Submitted" },
                  { step: "Content Reviewed" },
                  { step: "Payment Completed" },
                  { step: "Business Listed" },
                ].map((item, i) => {
                  let currentIdx = -1;
                  if (listing.status === "PENDING_REVIEW") currentIdx = 0;
                  if (listing.status === "AWAITING_PAYMENT") currentIdx = 1;
                  if (listing.status === "APPROVED") currentIdx = 3;

                  const isComplete = i <= currentIdx;
                  const isCurrent = i === currentIdx || (listing.status === "APPROVED" && i === 3);
                  const isRejected = listing.status === "REJECTED" && i === 0;

                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          isRejected
                            ? "bg-red-100 text-red-600"
                            : isComplete
                            ? "bg-champagne/20 text-champagne-dark"
                            : isCurrent
                            ? "bg-champagne/10 text-champagne border border-champagne/30"
                            : "bg-ivory-dim text-slate-muted/40"
                        }`}
                      >
                        {isComplete ? "✓" : i + 1}
                      </div>
                      <span
                        className={`text-sm ${
                          isComplete
                            ? "text-slate font-medium"
                            : "text-slate-muted/50"
                        }`}
                      >
                        {item.step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Listing details */}
            <div className="bg-white rounded-xl border border-slate/[0.06] p-5">
              <p className="text-xs text-slate-muted uppercase tracking-wider font-semibold mb-3">
                Your Listing Details
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-muted">Profession</span>
                  <span className="text-slate font-medium">
                    {listing.profession}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-muted">Phone</span>
                  <span className="text-slate font-medium">
                    {listing.mobileNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-muted">Address</span>
                  <span className="text-slate font-medium text-right max-w-[60%]">
                    {listing.address}
                  </span>
                </div>
                <div>
                  <span className="text-slate-muted block mb-1">
                    Description
                  </span>
                  <p className="text-slate text-sm leading-relaxed">
                    {listing.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
