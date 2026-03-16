"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

function GetListedForm() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    profession: searchParams.get("profession") || "",
    mobileNumber: "",
    address: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const [hasReadTerms, setHasReadTerms] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Detect if user has scrolled to the bottom of the terms
  const handleScrollTerms = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (Math.ceil(scrollTop + clientHeight) >= scrollHeight - 10) {
      setHasReadTerms(true);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      const professionParam = searchParams.get("profession");
      const pathWithQuery = professionParam
        ? `/get-listed?profession=${encodeURIComponent(professionParam)}`
        : "/get-listed";
      router.replace(`/login?callbackUrl=${encodeURIComponent(pathWithQuery)}`);
    }
  }, [status, router, searchParams]);

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

    if (!agreedToTerms) {
      newErrors.agreement = "You must agree to the terms and conditions";
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
    formData.description.length <= 400 &&
    agreedToTerms;

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
                className={`w-full px-3 py-2.5 bg-white border rounded-lg text-sm text-slate placeholder:text-slate-muted/50 focus:outline-none focus:ring-2 focus:ring-champagne/30 focus:border-champagne transition-all ${errors.profession
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
                  placeholder=""
                  maxLength={10}
                  className={`w-full px-3 py-2.5 bg-white border rounded-r-lg text-sm text-slate placeholder:text-slate-muted/50 focus:outline-none focus:ring-2 focus:ring-champagne/30 focus:border-champagne transition-all ${errors.mobileNumber
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
                className={`w-full px-3 py-2.5 bg-white border rounded-lg text-sm text-slate placeholder:text-slate-muted/50 focus:outline-none focus:ring-2 focus:ring-champagne/30 focus:border-champagne transition-all ${errors.address
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
                className={`w-full px-3 py-2.5 bg-white border rounded-lg text-sm text-slate placeholder:text-slate-muted/50 focus:outline-none focus:ring-2 focus:ring-champagne/30 focus:border-champagne transition-all resize-none ${errors.description
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
                  className={`text-xs ${formData.description.length > 380
                      ? "text-red-500"
                      : "text-slate-muted/50"
                    }`}
                >
                  {formData.description.length}/400
                </span>
              </div>
            </div>
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="bg-white rounded-xl border border-slate/[0.06] p-5">
            <div className="flex items-start gap-3">
              <div className="flex items-center h-5">
                <input
                  id="agreedToTerms"
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => {
                    if (!hasReadTerms) {
                      setShowTerms(true);
                    } else {
                      setAgreedToTerms(e.target.checked);
                    }
                  }}
                  className="h-4 w-4 rounded border-slate-300 text-champagne focus:ring-champagne transition-all cursor-pointer"
                />
              </div>
              <div className="text-sm">
                <label 
                  htmlFor="agreedToTerms" 
                  className="font-medium text-slate cursor-pointer"
                >
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={() => setShowTerms(true)}
                    className="text-champagne hover:underline underline-offset-4 font-bold"
                  >
                    Terms and Conditions
                  </button>
                </label>
                {!hasReadTerms && (
                  <p className="text-[10px] text-slate-muted/70 mt-1 uppercase tracking-wider font-semibold">
                    (Please open and scroll through terms to enable)
                  </p>
                )}
                {errors.agreement && (
                  <p className="text-red-500 text-xs mt-1">{errors.agreement}</p>
                )}
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
            className={`w-full btn btn-primary text-sm py-3.5 ${!isFormValid || submitting
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

          <p className="text-center text-slate-muted text-[10px] uppercase tracking-wider font-bold leading-relaxed opacity-60">
            Approved listings require a ₹199 non-refundable maintenance fee.
          </p>
        </form>
      </div>

      {/* Terms and Conditions Modal */}
      {showTerms && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-obsidian/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-slate/[0.06] flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate">Terms and Conditions</h2>
              <button 
                onClick={() => setShowTerms(false)}
                className="text-slate-muted hover:text-slate transition-colors text-2xl"
              >
                &times;
              </button>
            </div>
            
            <div 
              onScroll={handleScrollTerms}
              className="p-6 overflow-y-auto text-sm text-slate-muted space-y-4 leading-relaxed scroll-smooth"
            >
              <section className="space-y-2">
                <h3 className="font-bold text-slate text-base">1. Listing Fee and Refund Policy</h3>
                <p>
                  1.1. To publish your listing on the Hindu Veerashaiva Lingayat Entrepreneur Forum, a one-time maintenance fee of <strong>₹199 (Rupees One Hundred and Ninety-Nine Only)</strong> is applicable.
                </p>
                <p>
                  1.2. <strong>Non-Refundable Policy:</strong> Under no circumstances shall this amount be refundable. Once the payment is made and the listing is processed, the fee is considered final.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-slate text-base">2. Accuracy of Information</h3>
                <p>
                  2.1. The user (Lister) is solely responsible for the accuracy and authenticity of the information provided in the listing.
                </p>
                <p>
                  2.2. The forum reserves the right to reject or remove any listing that is found to be fraudulent, misleading, or containing incorrect information without any prior notice.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-slate text-base">3. Content Moderation</h3>
                <p>
                  3.1. Listings must not contain any offensive, illegal, or discriminatory content.
                </p>
                <p>
                  3.2. Prohibited content includes but is not limited to: hate speech, copyrighted material without permission, and promotional material for illegal activities.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-slate text-base">4. Platform Rights</h3>
                <p>
                  4.1. Basava Antah Prerna reserves the right to modify, suspend, or discontinue any listing at its sole discretion if terms are violated.
                </p>
                <p>
                  4.2. We do not guarantee business leads or revenue generation through the listing; the forum serves solely as a directory to connect community professionals.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-slate text-base">5. Privacy and Data Usage</h3>
                <p>
                  5.1. By submitting your details, you consent to your business information being displayed publicly on the platform.
                </p>
                <p>
                  5.2. Personal sensitive data (like Google SSO internal tokens) is never shared, only the info you provide in the "Business Details" section is visible to public visitors.
                </p>
              </section>

              <div className="pt-4 border-t border-slate/[0.06]">
                <p className="text-xs italic text-center text-slate-muted/70">
                  By checking the agreement box on the form, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-slate/[0.06] flex items-center justify-between gap-4">
              {!hasReadTerms ? (
                <p className="text-xs text-champagne font-bold uppercase tracking-widest animate-pulse">
                  Scroll to bottom to read all terms...
                </p>
              ) : (
                <p className="text-xs text-green-600 font-bold uppercase tracking-widest flex items-center gap-1">
                  <span>✓</span> Terms Read
                </p>
              )}
              <button 
                onClick={() => setShowTerms(false)}
                className="btn btn-primary text-[10px] py-2 px-5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GetListedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-champagne/30 border-t-champagne rounded-full animate-spin" />
      </div>
    }>
      <GetListedForm />
    </Suspense>
  );
}
