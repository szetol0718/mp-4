import dynamic from "next/dynamic";
import { Suspense } from "react";

const CompareForecastClient = dynamic(() => import("@/components/CompareForecastClient"), {
  ssr: false,
});

export default function ComparePage() {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}>
        Compare Weather Forecast
      </h1>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <CompareForecastClient />
      </Suspense>
    </main>
  );
}


