import { Suspense } from "react";
import CompareForecastPage from "./ClientCompare";

export default function CompareWrapper() {
  return (
    <Suspense fallback={<p className="p-6">Loading comparison...</p>}>
      <CompareForecastPage />
    </Suspense>
  );
}
