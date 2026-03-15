"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

type ListingStatus =
  | "PENDING_REVIEW"
  | "AWAITING_PAYMENT"
  | "APPROVED"
  | "REJECTED";

interface Application {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profession: string;
  mobileNumber: string;
  address: string;
  description: string;
  status: ListingStatus;
  adminNotes: string | null;
  createdAt: string;
}

const statusColors: Record<ListingStatus, string> = {
  PENDING_REVIEW: "bg-amber-50 text-amber-700 border-amber-200",
  AWAITING_PAYMENT: "bg-blue-50 text-blue-700 border-blue-200",
  APPROVED: "bg-green-50 text-green-700 border-green-200",
  REJECTED: "bg-red-50 text-red-700 border-red-200",
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [adminNotes, setAdminNotes] = useState<Record<number, string>>({});

  const fetchApplications = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/applications");
      if (res.status === 403) {
        router.replace("/");
        return;
      }
      const data = await res.json();
      setApplications(data.applications || []);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login?callbackUrl=/admin");
      return;
    }
    if (status === "authenticated") {
      if (session?.user?.role !== "admin") {
        router.replace("/");
        return;
      }
      fetchApplications();
    }
  }, [status, session, router, fetchApplications]);

  const handleAction = async (
    id: number,
    newStatus: string,
    notes?: string
  ) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, adminNotes: notes }),
      });

      if (res.ok) {
        fetchApplications();
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const filteredApps =
    filter === "ALL"
      ? applications
      : applications.filter((a) => a.status === filter);

  const counts = {
    ALL: applications.length,
    PENDING_REVIEW: applications.filter((a) => a.status === "PENDING_REVIEW")
      .length,
    AWAITING_PAYMENT: applications.filter(
      (a) => a.status === "AWAITING_PAYMENT"
    ).length,
    APPROVED: applications.filter((a) => a.status === "APPROVED").length,
    REJECTED: applications.filter((a) => a.status === "REJECTED").length,
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-champagne/30 border-t-champagne rounded-full animate-spin" />
      </div>
    );
  }

  if (!session || session.user.role !== "admin") return null;

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-16 px-5">
      <div className="container-narrow mx-auto">
        {/* Header */}
        <div className="mb-8">
          <span className="text-champagne text-xs font-semibold uppercase tracking-[0.2em] font-data">
            Admin Panel
          </span>
          <h1 className="text-slate text-3xl font-bold tracking-tight mt-2">
            Applications
          </h1>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(
            [
              "ALL",
              "PENDING_REVIEW",
              "AWAITING_PAYMENT",
              "APPROVED",
              "REJECTED",
            ] as const
          ).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                filter === f
                  ? "bg-champagne/15 text-champagne-dark border-champagne/30"
                  : "bg-white text-slate-muted border-slate/[0.08] hover:border-champagne/20"
              }`}
            >
              {f.replace(/_/g, " ")} ({counts[f]})
            </button>
          ))}
        </div>

        {/* Applications list */}
        {filteredApps.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-muted text-sm">No applications found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-xl border border-slate/[0.06] p-5"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-slate font-bold text-base">
                      {app.firstName} {app.lastName}
                    </h3>
                    <p className="text-slate-muted text-xs mt-0.5">
                      #{app.id} · {app.email} ·{" "}
                      {new Date(app.createdAt).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-full border uppercase tracking-wider ${
                      statusColors[app.status]
                    }`}
                  >
                    {app.status.replace(/_/g, " ")}
                  </span>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-xs">
                  <div>
                    <span className="text-slate-muted block">Profession</span>
                    <span className="text-slate font-medium">
                      {app.profession}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-muted block">Phone</span>
                    <span className="text-slate font-medium">
                      {app.mobileNumber}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-muted block">Address</span>
                    <span className="text-slate font-medium">
                      {app.address}
                    </span>
                  </div>
                </div>

                <p className="text-slate text-sm leading-relaxed mb-4 bg-ivory/50 p-3 rounded-lg">
                  {app.description}
                </p>

                {/* Admin notes input */}
                {(app.status === "PENDING_REVIEW" ||
                  app.status === "AWAITING_PAYMENT") && (
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Admin notes (optional)..."
                      value={adminNotes[app.id] || ""}
                      onChange={(e) =>
                        setAdminNotes((prev) => ({
                          ...prev,
                          [app.id]: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 bg-ivory-dim/50 border border-slate/[0.06] rounded-lg text-xs text-slate placeholder:text-slate-muted/40"
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  {app.status === "PENDING_REVIEW" && (
                    <>
                      <button
                        onClick={() =>
                          handleAction(
                            app.id,
                            "AWAITING_PAYMENT",
                            adminNotes[app.id]
                          )
                        }
                        disabled={actionLoading === app.id}
                        className="btn btn-primary text-[11px] px-4 py-2"
                      >
                        {actionLoading === app.id
                          ? "..."
                          : "✅ Approve Content"}
                      </button>
                      <button
                        onClick={() =>
                          handleAction(
                            app.id,
                            "REJECTED",
                            adminNotes[app.id] || "Application rejected"
                          )
                        }
                        disabled={actionLoading === app.id}
                        className="btn btn-outline-dark text-[11px] px-4 py-2 text-red-500 border-red-200 hover:bg-red-50"
                      >
                        ❌ Reject
                      </button>
                    </>
                  )}
                  {app.status === "AWAITING_PAYMENT" && (
                    <button
                      onClick={() =>
                        handleAction(
                          app.id,
                          "APPROVED",
                          adminNotes[app.id] || "Payment verified"
                        )
                      }
                      disabled={actionLoading === app.id}
                      className="btn btn-primary text-[11px] px-4 py-2"
                    >
                      {actionLoading === app.id
                        ? "..."
                        : "💰 Confirm Payment & Publish"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
