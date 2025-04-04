import type { WeatherFactorKey, ForecastData } from "@/types/weather";
import { weatherFactors } from "@/types/weather";
import Image from "next/image";


type CompareForecastCardProps = {
  city1: string;
  city2: string;
  data1: ForecastData;
  data2: ForecastData;
  date: string | null;
};

export default function CompareForecastCard({
  city1,
  city2,
  data1,
  data2,
  date,
}: CompareForecastCardProps) {
  const day1 = date ? data1.days.find(d => d.datetime === date) : data1.days[0];
  const day2 = date ? data2.days.find(d => d.datetime === date) : data2.days[0];

  if (!day1 || !day2) {
    return <p style={{ textAlign: "center", color: "#555" }}>No forecast data available for the selected date.</p>;
  }

  const renderBar = (value: number, max: number, color: string) => {
    const width = `${(value / max) * 100}%`;
    return (
      <div style={{ width: "100%", height: "1rem", background: "#eee", borderRadius: 6, overflow: "hidden" }}>
        <div style={{ width, height: "100%", background: color, transition: "width 0.3s ease" }} />
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 24 }}>
      {[{ city: city1, day: day1, color: "#3b82f6" }, { city: city2, day: day2, color: "#f87171" }].map(({ city, day, color }) => (
        <div key={city} style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", textAlign: "center" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>{city}</h3>
          <p style={{ fontSize: 14, color: "#666", marginBottom: 8 }}>{day.datetime}</p>
          <Image
                src={`/icons/${day.icon}.png`}
                alt={day.conditions}
                width={48}
                height={48}
                style={{ margin: "0 auto" }}
                onError={(e) => ((e.currentTarget.style.display = "none"))}
        />
          <p style={{ fontStyle: "italic", fontSize: 14, marginBottom: 16 }}>{day.conditions}</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14, textAlign: "left" }}>
            {weatherFactors.map(({ key, label, max }) => {
              const value = day[key as WeatherFactorKey] ?? 0;
              return (
                <div key={key}>
                  <p style={{ marginBottom: 4 }}>
                    {label}: <strong>{value}</strong>
                  </p>
                  {renderBar(Number(value), max, color)}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
