"use client";

import { useState } from "react";
import Image from "next/image";

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
        )}&term=${encodeURIComponent(term)}&limit=10`,
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
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="mb-6 text-3xl font-bold text-center">🔍 Yelp Search</h1>

      <div className="flex flex-col max-w-xl gap-3 mx-auto mb-6 sm:flex-row">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search term (e.g., restaurants)"
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (e.g., San Francisco)"
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && (
        <p className="font-semibold text-center text-red-500">{error}</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((biz) => (
          <div
            key={biz.id}
            className="overflow-hidden transition bg-white shadow-md rounded-xl hover:shadow-lg"
          >
            {biz.image_url && (
              <Image
                src={biz?.image_url || ""}
                alt={biz.name}
                width={400}
                height={250}
                className="object-cover w-full h-48"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold">{biz.name}</h2>
              <p className="text-sm text-gray-600">
                📍 {biz.location?.display_address?.join(", ")}
              </p>
              <p className="text-sm text-gray-700">⭐ {biz.rating} / 5</p>
              <p className="text-sm text-gray-700">
                💬 {biz.review_count} reviews
              </p>
              <p className="text-sm text-gray-700">
                ☎️ {biz.display_phone || "N/A"}
              </p>
              <p className="text-sm text-gray-700">
                💰 {biz.price || "Not listed"}
              </p>
              <a
                href={biz.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-blue-600 hover:underline"
              >
                View on Yelp →
              </a>
            </div>
          </div>
        ))}
      </div>

      {!loading && results.length === 0 && !error && (
        <p className="mt-10 text-center text-gray-500">
          No results found. Try a different search.
        </p>
      )}
    </div>
  );
}
