import { NextResponse } from "next/server"

// This would normally be in .env.local
const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get("location")
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")

  let url: string

  if (lat && lon) {
    url = `${BASE_URL}?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
  } else if (location) {
    url = `${BASE_URL}?q=${location}&units=imperial&appid=${API_KEY}`
  } else {
    return NextResponse.json({ error: "Location parameter is required" }, { status: 400 })
  }

  try {
    const response = await fetch(url)

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { error: errorData.message || "Failed to fetch weather data" },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}
