import { fetchWeather } from "@/lib/fetchWeather";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { city } = await req.json();
    console.log("City:", city);
    const data = await fetchWeather(city);
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Error in API:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch weather" }, { status: 500 });
  }
}

