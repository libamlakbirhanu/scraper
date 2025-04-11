"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import JobCard from "@/components/ui/job-card";
import { JobData } from "@/lib/types";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!url) {
        throw new Error("Please enter a valid URL");
      }

      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch job data");
      }

      const data = await response.json();
      setJobData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gradient-to-b from-gray-50 to-gray-100"
      } transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <h1
              className={`text-5xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              } bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-transparent`}
            >
              Job Posting Scraper
            </h1>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <svg
                className={`w-6 h-6 ${
                  isDarkMode ? "text-yellow-400" : "text-gray-600"
                } transition-colors duration-200`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isDarkMode ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 1.536l-.103.129C15.09 6.973 13.633 5 11.5 5A6.58 6.58 0 006 11.5c1.633 0 3.09 1.973 3.365 3.366l.129-.103m0 0a4.501 4.501 0 01.244 1.243M9 10.5H3m12 0h3m-4.5 0H15"
                  />
                )}
              </svg>
            </button>
          </div>
          <p
            className={`text-lg ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            } max-w-2xl mx-auto`}
          >
            Extract job posting details from any URL with a single click
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <Input
              type="url"
              placeholder="https://example.com/job-posting"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={`w-full transition-all duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              required
              disabled={loading}
              aria-label="Enter job posting URL"
            />
            <Button
              type="submit"
              className={`absolute right-0 top-0 h-full px-6 transition-all duration-200 ${
                loading || !url ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading || !url}
            >
              {loading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <span className="group-hover:scale-105 transition-transform duration-200">
                  Scrape
                </span>
              )}
            </Button>
          </div>

          {error && (
            <div
              className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 ${
                isDarkMode ? "text-red-400" : "text-red-600"
              }`}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          {loading ? (
            <Loader isDarkMode={isDarkMode} />
          ) : (
            jobData && <JobCard jobData={jobData} isDarkMode={isDarkMode} />
          )}
        </form>
      </div>
    </main>
  );
}
