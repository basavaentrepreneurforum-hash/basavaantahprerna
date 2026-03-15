"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function GetListedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    profession: "",
    mobileNumber: "",
    address: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login?callbackUrl=/get-listed");
    }
  }, [status, router]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.profession.trim()) {
      newErrors.profession = "Profession is required";
    }

    const mobile = formData.mobileNumber.replace(/\s/g, "");
    if (!mobile) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(mobile)) {
      newErrors.mobileNumber =
        "Enter a valid 10-digit Indian mobile number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length > 400) {
      newErrors.description = "Description must not exceed 400 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "Something went wrong");
        return;
      }

      // Success — redirect to profile to see status
      router.push("/profile");
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const isFormValid =
    formData.profession.trim() &&
    formData.mobileNumber.trim() &&
    formData.address.trim() &&
    formData.description.trim() &&
    formData.description.length <= 400;

  if (status === "loading") {
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
            Get Listed
          </span>
          <h1 className="text-slate text-3xl font-bold tracking-tight mt-3">
            List Your Business
          </h1>
          <p className="text-slate-muted text-sm mt-2 max-w-md mx-auto">
            Fill in your details below. After review, you&apos;ll receive
            payment instructions to publish your listing.
          </p>
          <hr className="gold-line gold-line-center mt-5" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Read-only SSO fields */}
          <div className="bg-white rounded-xl border border-slate/[0.06] p-5 space-y-4">
            <p className="text-xs text-slate-muted uppercase tracking-wider font-semibold mb-3">
              From your Google Account
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-muted mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={session.user.firstName || ""}
                  disabled
                  className="w-full px-3 py-2.5 bg-ivory-dim/50 border border-slate/[0.06] rounded-lg text-sm text-slate-muted cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-muted mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={session.user.lastName || ""}
                  disabled
                  className="w-full px-3 py-2.5 bg-ivory-dim/50 border border-slate/[0.06] rounded-lg text-sm text-slate-muted cursor-not-allowed"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-muted mb-1">
                Email
              </label>
              <input
                type="email"
                value={session.user.email || ""}
                disabled
                className="w-full px-3 py-2.5 bg-ivory-dim/50 border border-slate/[0.06] rounded-lg text-sm text-slate-muted cursor-not-allowed"
              />
            </div>
          </div>

          {/* Editable fields */}
          <div className="bg-white rounded-xl border border-slate/[0.06] p-5 space-y-4">
            <p className="text-xs text-slate-muted uppercase tracking-wider font-semibold mb-3">
              Business Details
            </p>

            {/* Profession */}
            <div>
              <label className="block text-xs text-slate font-medium mb-1">
                Profession <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                placeholder="e.g., Lawyer, Doctor, Saree Seller"
                maxLength={100}
                className={`w-full px-3 py-2.5 bg-white border rounded-lg text-sm text-slate placeholder:text-slate-muted/50 focus:outline-none focus:ring-2 focus:ring-champagne/30 focus:border-champagne transition-all ${
                  errors.profession
                    ? "border-red-400"
                    : "border-slate/[0.1]"
                }`}
              />
              {errors.profession && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.profession}
                </p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs text-slate font-medium mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-slate-muted bg-ivory-dim/50 border border-r-0 border-slate/[0.1] rounded-l-lg">
                  +91
                </span>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="9876543210"
                  maxLength={10}
                  className={`w-full px-3 py-2.5 bg-white border rounded-r-lg text-sm text-slate placeholder:text-slate-muted/50 focus:outline-none focus:ring-2 focus:ring-champagne/30 focus:border-champagne transition-all ${
                    errors.mobileNumber
                      ? "border-red-400"
                      : "border-slate/[0.1]"
                  }`}
                />
              </div>
              {errors.mobileNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.mobileNumber}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs text-slate font-medium mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Your business address"
                maxLength={500}
                className={`w-full px-3 py-2.5 bg-white border rounded-lg text-sm text-slate placeholder:text-slate-muted/50 focus:outline-none focus:ring-2 focus:ring-champagne/30 focus:border-champagne transition-all ${
                  errors.address
                    ? "border-red-400"
                    : "border-slate/[0.1]"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.address}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs text-slate font-medium mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell visitors about your business, expertise, and what you offer..."
                maxLength={400}
                rows={4}
                className={`w-full px-3 py-2.5 bg-white border rounded-lg text-sm text-slate placeholder:text-slate-muted/50 focus:outline-none focus:ring-2 focus:ring-champagne/30 focus:border-champagne transition-all resize-none ${
                  errors.description
                    ? "border-red-400"
                    : "border-slate/[0.1]"
                }`}
              />
              <div className="flex justify-between mt-1">
                {errors.description ? (
                  <p className="text-red-500 text-xs">
                    {errors.description}
                  </p>
                ) : (
                  <span />
                )}
                <span
                  className={`text-xs ${
                    formData.description.length > 380
                      ? "text-red-500"
                      : "text-slate-muted/50"
                  }`}
                >
                  {formData.description.length}/400
                </span>
              </div>
            </div>
          </div>

          {/* Submit error */}
          {submitError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
              {submitError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!isFormValid || submitting}
            className={`w-full btn btn-primary text-sm py-3.5 ${
              !isFormValid || submitting
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-obsidian/20 border-t-obsidian rounded-full animate-spin" />
                Submitting...
              </span>
            ) : (
              "Submit for Review"
            )}
          </button>

          <p className="text-center text-slate-muted text-xs leading-relaxed">
            After submission, your application will be reviewed. Once approved,
            you&apos;ll be asked to pay ₹199 to publish your listing.
          </p>
        </form>
      </div>
    </div>
  );
}
