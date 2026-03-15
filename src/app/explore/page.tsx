"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Business {
  id: number;
  firstName: string;
  lastName: string;
  profession: string;
  mobileNumber: string;
  email: string;
  address: string;
  description: string;
}

export default function ExplorePage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const res = await fetch("/api/listings/public");
      const data = await res.json();
      setBusinesses(data.listings || []);
    } catch (err) {
      console.error("Error fetching businesses:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBusinesses = businesses.filter(
    (b) =>
      b.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${b.firstName} ${b.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-16 px-5">
      <div className="container-narrow mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-champagne text-xs font-semibold uppercase tracking-[0.2em] font-data">
            Directory
          </span>
          <h1 className="text-slate text-3xl md:text-4xl font-bold tracking-tight mt-3">
            Explore Our{" "}
            <span className="font-drama text-champagne">Community.</span>
          </h1>
          <p className="text-slate-muted text-sm mt-3 max-w-md mx-auto">
            Browse verified professionals and businesses from the Veerashaiva
            Lingayat community.
          </p>
          <hr className="gold-line gold-line-center mt-5" />
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-muted/40 text-lg">
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by profession or name..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate/[0.08] rounded-xl text-sm text-slate placeholder:text-slate-muted/40 focus:outline-none focus:ring-2 focus:ring-champagne/20 focus:border-champagne/30 transition-all"
            />
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-champagne/30 border-t-champagne rounded-full animate-spin mx-auto" />
            <p className="text-slate-muted text-sm mt-4">
              Loading businesses...
            </p>
          </div>
        ) : filteredBusinesses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">🏪</p>
            <p className="text-slate font-semibold text-lg mb-1">
              {searchQuery ? "No results found" : "No listings yet"}
            </p>
            <p className="text-slate-muted text-sm mb-6 max-w-sm mx-auto">
              {searchQuery
                ? "Try a different search term."
                : "Be the first to list your business and connect with the community!"}
            </p>
            {!searchQuery && (
              <Link href="/get-listed" className="btn btn-primary text-sm">
                Get Listed — ₹199
              </Link>
            )}
          </div>
        ) : (
          <>
            <p className="text-slate-muted text-xs uppercase tracking-wider mb-4">
              {filteredBusinesses.length} Professional
              {filteredBusinesses.length !== 1 ? "s" : ""} found
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredBusinesses.map((business) => (
                <div
                  key={business.id}
                  className="bg-white rounded-xl border border-slate/[0.04] p-5 hover:border-champagne/15 hover:shadow-lg transition-all duration-300 group"
                >
                  {/* Top: Name + Profession */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-slate font-bold text-base tracking-tight group-hover:text-champagne-dark transition-colors">
                        {business.firstName} {business.lastName}
                      </h3>
                      <span className="inline-block mt-1 px-2.5 py-0.5 bg-champagne/10 text-champagne-dark text-[11px] font-semibold rounded-full uppercase tracking-wider">
                        {business.profession}
                      </span>
                    </div>
                    <div className="w-10 h-10 bg-champagne/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-champagne font-bold text-sm">
                        {business.firstName[0]}
                        {business.lastName[0]}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-muted text-sm leading-relaxed mb-4 line-clamp-3">
                    {business.description}
                  </p>

                  {/* Contact */}
                  <div className="space-y-2 pt-3 border-t border-slate/[0.04]">
                    <a
                      href={`tel:+91${business.mobileNumber}`}
                      className="flex items-center gap-2 text-sm text-slate-muted hover:text-champagne transition-colors no-underline"
                    >
                      <span className="text-xs">📱</span>
                      +91 {business.mobileNumber}
                    </a>
                    <a
                      href={`mailto:${business.email}`}
                      className="flex items-center gap-2 text-sm text-slate-muted hover:text-champagne transition-colors no-underline"
                    >
                      <span className="text-xs">✉️</span>
                      {business.email}
                    </a>
                    <p className="flex items-start gap-2 text-sm text-slate-muted">
                      <span className="text-xs mt-0.5">📍</span>
                      {business.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
