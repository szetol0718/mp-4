"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SingleForecastCard from "@/components/SingleForecastCard";
import { useRouter } from "next/navigation";
import type { ForecastData } from "@/types/weather";



export default function SingleForecastPage() {
  const params = useSearchParams();
  const city = params.get("city");
  const date = params.get("date");
  const [data, setData] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string>("");
  const router = useRouter();
useEffect(() => {
  if (date && new Date(date) < new Date(new Date().toDateString())) {
    router.push("/forecast/error");
  }
}, [date]);

useEffect(() => {
    if (!city) return;
  
    const fetchData = async () => {
      try {
        const res = await fetch("/api/weather", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city }),
        });
  
        const result: { success: boolean; data: ForecastData; error?: string } = await res.json();
  
        if (!result.success) throw new Error(result.error);
        setData(result.data);
      } catch {
        setError("Could not load weather.");
      }
    };
  
    fetchData();
  }, [city]);
  

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Forecast for {city}</h1>
      {error && <p className="text-red-500">{error}</p>}
      {!data && !error && <p>Loading...</p>}
      {data && <SingleForecastCard forecast={data} date={date} />}
    </main>
  );
}
