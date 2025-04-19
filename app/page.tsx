"use client"

import { useState, useEffect } from "react"
import { Search } from "@/components/search"
import { WeatherDisplay } from "@/components/weather-display"
import { ActivitySuggestions } from "@/components/activity-suggestions"
import { ErrorDisplay } from "@/components/error-display"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useGeolocation } from "@/hooks/use-geolocation"
import { FavoriteLocations } from "@/components/favorite-locations"
import { WeatherBackground } from "@/components/weather-background"
import { AnimatedTitle } from "@/components/animated-title"

export default function Home() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const { location: geoLocation, loading: geoLoading, error: geoError } = useGeolocation()

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("favoriteLocations")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  useEffect(() => {
    // If geolocation is available and no weather data is loaded yet, fetch weather for current location
    if (geoLocation && !weatherData && !geoError) {
      fetchWeatherByCoords(geoLocation.latitude, geoLocation.longitude)
    }
  }, [geoLocation, geoError, weatherData])

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=2bbe6edc45d1cb10a69aa522b8bc53be`,
      )

      if (!response.ok) {
        throw new Error("Failed to fetch weather data")
      }

      const data = await response.json()
      setWeatherData(data)
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching weather data")
    } finally {
      setLoading(false)
    }
  }

  const fetchWeather = async (location: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          location,
        )}&units=metric&appid=2bbe6edc45d1cb10a69aa522b8bc53be`,
      )

      if (!response.ok) {
        throw new Error("Failed to fetch weather data")
      }

      const data = await response.json()
      setWeatherData(data)
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching weather data")
    } finally {
      setLoading(false)
    }
  }

  const addToFavorites = (location: string) => {
    if (!favorites.includes(location)) {
      const newFavorites = [...favorites, location]
      setFavorites(newFavorites)
      localStorage.setItem("favoriteLocations", JSON.stringify(newFavorites))
    }
  }

  const removeFromFavorites = (location: string) => {
    const newFavorites = favorites.filter((fav) => fav !== location)
    setFavorites(newFavorites)
    localStorage.setItem("favoriteLocations", JSON.stringify(newFavorites))
  }

  const weatherCondition = weatherData?.weather?.[0]?.main?.toLowerCase() || "clear"

  return (
    <main className="min-h-screen relative overflow-hidden">
      <WeatherBackground condition={weatherCondition} />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <AnimatedTitle />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="md:col-span-1 space-y-6">
            <Search onSearch={fetchWeather} />

            <FavoriteLocations favorites={favorites} onSelect={fetchWeather} onRemove={removeFromFavorites} />
          </div>

          <div className="md:col-span-2 space-y-6">
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorDisplay message={error} />
            ) : weatherData ? (
              <>
                <WeatherDisplay
                  weatherData={weatherData}
                  onAddToFavorites={addToFavorites}
                  isFavorite={favorites.includes(weatherData.name)}
                />
                <ActivitySuggestions weatherCondition={weatherData.weather[0].main} />
              </>
            ) : (
              <div className="bg-slate-800/60 backdrop-blur-md rounded-xl p-6 shadow-lg text-center border border-slate-700">
                <p className="text-slate-300">
                  {geoLoading
                    ? "Detecting your location..."
                    : "Search for a location to see weather and activity suggestions"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
