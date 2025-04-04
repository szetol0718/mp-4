import CompareForecastClient from "@/components/CompareForecastClient";

export default function ComparePage() {
  return (
    <div>
      <h1 style={{ textAlign: "center", fontWeight: "bold", fontSize: 24 }}>
        Compare Weather Forecast
      </h1>
      <CompareForecastClient />
    </div>
  );
}


