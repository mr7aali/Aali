"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Added for animations

export default function YelpSearchPage() {
  const [term, setTerm] = useState("Plumbers");
  const [location, setLocation] = useState("New York City");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY =
    "lM3F1tgFtWD6h91iY8c9gKzSwEGXxW9Mk5y9wxElEBcqVK78bs8MhN2jbiEoTqVsUs8RQcpiGFGc_65Rz1fh6FR6kcfJDSYTiZbtV1RrvDLoy22aINybmRGszjD9aHYx";

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.yelp.com/v3/businesses/search?location=${encodeURIComponent(
          location
        )}&term=${encodeURIComponent(term)}&limit=50`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch Yelp data");

      const data = await response.json();
      setResults(data.businesses || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-50 to-gray-100">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-4xl font-extrabold text-center text-gray-900"
      >
        🔍 Yelp Explorer
      </motion.h1>

      {/* Search Fields */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col max-w-3xl gap-4 mx-auto mb-8 sm:flex-row sm:items-center"
      >
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search term (e.g., restaurants)"
          className="flex-1 px-5 py-3 text-gray-700 transition duration-200 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (e.g., San Francisco)"
          className="flex-1 px-5 py-3 text-gray-700 transition duration-200 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSearch}
          disabled={loading}
          className={`px-6 py-3 text-white font-semibold rounded-full shadow-md transition duration-200 ${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <span className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 12a8 8 0 1116 0 8 8 0 01-16 0z"
                />
              </svg>
              Searching...
            </span>
          ) : (
            "Search"
          )}
        </motion.button>
      </motion.div>

      {/* Error */}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 font-medium text-center text-red-500"
        >
          {error}
        </motion.p>
      )}

      {/* Results */}
      <motion.div
        className="grid gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-3 max-w-7xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {results.map((biz) => (
          <motion.div
            key={biz.id}
            className="overflow-hidden transition-transform bg-white shadow-lg rounded-2xl hover:-translate-y-1 hover:shadow-xl"
            whileHover={{ scale: 1.02 }}
          >
            {biz.image_url && (
              <Image
                src={biz.image_url}
                alt={biz.name}
                width={400}
                height={250}
                className="object-cover w-full h-56"
              />
            )}
            <div className="p-5">
              <h2 className="text-xl font-bold text-gray-900 truncate">{biz.name}</h2>
              <p className="mt-1 text-sm text-gray-500">
                📍 {biz.location?.display_address?.join(", ")}
              </p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-yellow-500">⭐ {biz.rating} / 5</span>
                <span className="ml-2 text-sm text-gray-500">
                  ({biz.review_count} reviews)
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                ☎️ {biz.display_phone || "N/A"}
              </p>
              <p className="mt-1 text-sm text-gray-500">💰 {biz.price || "Not listed"}</p>
              <p className="mt-1 text-sm text-gray-500">
                📢 Sponsored: <span className="font-medium">{biz.is_ad ? "Yes" : "No"}</span>
              </p>
              <a
                href={biz.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 font-medium text-blue-600 transition duration-200 hover:text-blue-800"
              >
                View on Yelp →
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* No Results */}
      {!loading && results.length === 0 && !error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 text-lg text-center text-gray-500"
        >
          No results found. Try a different search.
        </motion.p>
      )}
    </div>
  );
}