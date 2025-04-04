import { Suspense } from "react";
import SingleForecastPage from "./ClientPage"; // move your current component to this

export default function Wrapper() {
  return (
    <Suspense fallback={<p className="p-6">Loading forecast...</p>}>
      <SingleForecastPage />
    </Suspense>
  );
}
