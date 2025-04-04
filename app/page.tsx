"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const citySuggestions = {
  US: ["Boston", "New York", "Los Angeles", "Chicago", "Miami"],
  Europe: ["London", "Paris", "Berlin", "Rome", "Madrid"],
  Asia: ["Tokyo", "Seoul", "Bangkok", "Beijing", "Hong Kong"],
  Other: ["Toronto", "Sydney", "Cairo", "Cape Town"],
};

export default function HomePage() {
  const router = useRouter();
  const [city1, setCity1] = useState("");
  const [city2, setCity2] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const base = city1 && city2 && city1 !== city2
      ? `/forecast/compare?city=${encodeURIComponent(city1)}&compare=${encodeURIComponent(city2)}`
      : `/forecast/single?city=${encodeURIComponent(city1)}`;
    const full = date ? `${base}&date=${date}` : base;
    router.push(full);
  };

  const fillCity = (value: string, slot: "city1" | "city2") => {
    slot === "city1" ? setCity1(value) : setCity2(value);
  };

  return (
    <main className="min-h-screen bg-blue-50 p-6 text-gray-800">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-center mb-6">🌤️ Weather Forecast</h1>
            

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">City</label>
            <input
              type="text"
              value={city1}
              onChange={(e) => setCity1(e.target.value)}
              required
              placeholder="e.g. Boston"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Compare With (optional)</label>
            <input
              type="text"
              value={city2}
              onChange={(e) => setCity2(e.target.value)}
              placeholder="e.g. Tokyo"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Specific Date (optional)</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700"
          >
            Get Forecast
          </button>
        </form>

        <div className="mt-8 text-sm text-gray-600 italic">
          Enter just one city to see full details including hourly forecast and a weekly outlook.
          Click a city to auto-fill. First click fills “City”, second fills “Compare With”.
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">Quick Suggestions</h2>
          {Object.entries(citySuggestions).map(([region, cities]) => (
            <div key={region} className="mb-3">
              <p className="font-medium mb-1">{region}</p>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => fillCity(city, city1 ? "city2" : "city1")}
                    className="bg-blue-100 hover:bg-blue-200 text-sm px-3 py-1 rounded"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}


