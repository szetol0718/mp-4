export async function fetchWeather(city: string) {
    const key = process.env.WEATHER_API_KEY;
    if (!key) throw new Error("Missing API key");
  
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
      city
    )}?unitGroup=us&key=${key}&contentType=json`;
  
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      cache: "no-store",
    });
  
    const contentType = res.headers.get("content-type");
    if (!res.ok || !contentType?.includes("application/json")) {
      const text = await res.text();
      console.error("Weather API raw response:", text);
      throw new Error("Weather API error");
    }
  
    return res.json();
  }
  