"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function LoginContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/get-listed";

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-champagne/30 border-t-champagne rounded-full animate-spin" />
      </div>
    );
  }

  if (session) return null;

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-5">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.05)_0%,transparent_60%)]" />

      <div className="relative z-10 w-full max-w-sm">
        {/* Card */}
        <div className="bg-obsidian-lighter border border-champagne/10 rounded-xl p-8 text-center">
          {/* Logo */}
          <div className="mb-6">
            <span className="text-champagne text-xl font-bold tracking-tight">
              Basava
            </span>
            <span className="text-ivory text-xl font-light tracking-tight ml-1">
              Antah Prerna
            </span>
          </div>

          <hr className="gold-line gold-line-center" />

          <h1 className="text-ivory text-2xl font-bold tracking-tight mt-6 mb-2">
            Welcome Back
          </h1>
          <p className="text-ivory/40 text-sm mb-8 leading-relaxed">
            Sign in with your Google account to list your business or manage
            your profile.
          </p>

          {/* Google Sign In Button */}
          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-slate px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:shadow-md cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          <p className="text-ivory/20 text-xs mt-6 leading-relaxed">
            By signing in, you agree to our terms of service and privacy policy.
            Your Google account data is used only for authentication.
          </p>
        </div>

        {/* Security note */}
        <p className="text-center text-ivory/15 text-xs mt-4">
          🔒 Secured with industry-standard Google OAuth 2.0
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-obsidian flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-champagne/30 border-t-champagne rounded-full animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
