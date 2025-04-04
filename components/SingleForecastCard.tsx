import type { ForecastData, WeatherDay,WeatherHour } from "@/types/weather";
import Image from "next/image";


export default function SingleForecastCard({
  forecast,
  date,
}: {
  forecast: ForecastData;
  date: string | null;
}) {
  const day: WeatherDay | undefined = date
    ? forecast.days.find((d) => d.datetime === date)
    : forecast.days[0];

  if (!day) return <p style={{ textAlign: "center" }}>No forecast available for selected date.</p>;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", background: "#fff", padding: 24, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", color: "#333" }}>
      <h2 style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>{forecast.resolvedAddress}</h2>
      <p style={{ textAlign: "center", color: "#666", marginBottom: 12 }}>
        Forecast for <strong>{day.datetime}</strong>
      </p>

      {/* Current Summary */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
      <Image
        src={`/icons/${day.icon}.png`}
        alt={day.conditions}
        width={60}
        height={60}
        style={{ margin: "0 auto" }}
        onError={(e) => ((e.currentTarget.style.display = "none"))}
        />

        <p style={{ fontSize: 18 }}>{day.conditions}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
        <p> <strong>Temp:</strong> {day.temp}°F</p>
        <p> <strong>Feels Like:</strong> {day.feelslike}°F</p>
        <p> <strong>Humidity:</strong> {day.humidity}%</p>
        <p> <strong>Wind:</strong> {day.windspeed} mph</p>
        <p> <strong>Cloud Cover:</strong> {day.cloudcover ?? "N/A"}%</p>
        <p> <strong>Precip:</strong> {day.precipprob ?? 0}%</p>
        <p> <strong>Sunrise:</strong> {day.sunrise ?? "N/A"}</p>
        <p> <strong>Sunset:</strong> {day.sunset ?? "N/A"}</p>
      </div>

      {/* Hourly Forecast */}
      <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Hourly Forecast</h3>
      <div style={{ overflowX: "auto", whiteSpace: "nowrap", marginBottom: 24 }}>
        {day.hours?.slice(0, 12).map((h: WeatherHour, i) => (
          <div key={i} style={{ display: "inline-block", width: 80, marginRight: 8, textAlign: "center" }}>
            <div>{h.datetime.split(":")[0]}:00</div>
            <Image
                src={`/icons/${h.icon}.png`}
                alt={h.conditions}
                width={32}
                height={32}
                onError={(e) => ((e.currentTarget.style.display = "none"))}
            />

            <div>{h.temp}°</div>
          </div>
        ))}
      </div>

      {/* Weekly Forecast */}
      <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>This Week</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 12 }}>
        {forecast.days.slice(0, 7).map((d, i) => (
          <div key={i} style={{ background: "#f9f9f9", padding: 8, borderRadius: 8, textAlign: "center" }}>
            <div style={{ fontWeight: 600 }}>{d.datetime.slice(5)}</div>
            <Image
                src={`/icons/${d.icon}.png`}
                alt={d.conditions}
                width={36}
                height={36}
                onError={(e) => ((e.currentTarget.style.display = "none"))}
            />

            <div style={{ fontSize: 14 }}>{d.temp}°</div>
            <div style={{ fontSize: 12, color: "#666" }}>{d.conditions.split(",")[0]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


  