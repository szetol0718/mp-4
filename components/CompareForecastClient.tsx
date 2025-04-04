"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CompareForecastCard from "./CompareForecastCard";
import type { ForecastData } from "@/types/weather";

export default function CompareForecastClient() {
  const params = useSearchParams();
  const city1 = params.get("city");
  const city2 = params.get("compare");
  const date = params.get("date");

  const [data1, setData1] = useState<ForecastData | null>(null);
  const [data2, setData2] = useState<ForecastData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCity = async (city: string, setData: (data: ForecastData) => void) => {
      const res = await fetch("/api/weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city }),
      });
      const result = await res.json();
      if (result.success) {
        setData(result.data);
      } else {
        throw new Error(result.error || "Failed to fetch forecast");
      }
    };

    if (city1 && city2) {
      Promise.all([
        fetchCity(city1, setData1),
        fetchCity(city2, setData2),
      ]).catch(() => setError("Failed to load both forecasts."));
    }
  }, [city1, city2]);

  if (!city1 || !city2) {
    return <p style={{ textAlign: "center" }}>Please enter two cities to compare.</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  }

  if (!data1 || !data2) {
    return <p style={{ textAlign: "center" }}>Loading forecast data...</p>;
  }

  return (
    <CompareForecastCard
      city1={city1}
      city2={city2}
      data1={data1}
      data2={data2}
      date={date}
    />
  );
}

