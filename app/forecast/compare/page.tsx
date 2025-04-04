"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CompareForecastCard from "@/components/CompareForecastCard";
import { useRouter } from "next/navigation";
import type { ForecastData } from "@/types/weather";



export default function CompareForecastPage() {
  const params = useSearchParams();
  const city1 = params.get("city");
  const city2 = params.get("compare");
  const date = params.get("date");
  const [data1, setData1] = useState<ForecastData | null>(null);
  const [data2, setData2] = useState<ForecastData | null>(null);  
  const [error, setError] = useState("");
  const router = useRouter();
useEffect(() => {
  if (date && new Date(date) < new Date(new Date().toDateString())) {
    router.push("/forecast/error");
  }
}, [date]);

    const fetchCity = async (city: string, setData: (data: ForecastData) => void) => {
        const res = await fetch("/api/weather", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city }),
        });
      
        const result: { success: boolean; data: ForecastData; error?: string } = await res.json();
      
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error(result.error || "Failed to fetch forecast.");
        }
      };
      

    useEffect(() => {
        if (city1 && city2) {
          Promise.all([
            fetchCity(city1, setData1),
            fetchCity(city2, setData2),
          ]).catch(() => setError("Could not load both forecasts."));
        }
      }, [city1, city2, router]); // 
      

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Comparing: {city1} vs {city2}</h1>
      {error && <p className="text-red-500">{error}</p>}
      {!data1 || !data2 ? (
        <p>Loading...</p>
      ) : (
        <CompareForecastCard city1={city1!} data1={data1} city2={city2!} data2={data2} date={date} />
      )}
    </main>
  );
}
