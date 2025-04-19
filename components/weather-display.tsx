"use client"

import { useState } from "react"
import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  CloudFog,
  CloudLightning,
  Wind,
  Thermometer,
  Droplets,
  Star,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

interface WeatherData {
  name: string
  main: {
    temp: number
    feels_like: number
    humidity: number
  }
  weather: Array<{
    main: string
    description: string
  }>
  wind: {
    speed: number
  }
  sys: {
    country: string
  }
}

interface WeatherDisplayProps {
  weatherData: WeatherData
  onAddToFavorites: (location: string) => void
  isFavorite: boolean
}

export function WeatherDisplay({ weatherData, onAddToFavorites, isFavorite }: WeatherDisplayProps) {
  const [copied, setCopied] = useState(false)

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="h-16 w-16 text-yellow-400" />
      case "clouds":
        return <Cloud className="h-16 w-16 text-gray-400" />
      case "rain":
      case "drizzle":
        return <CloudRain className="h-16 w-16 text-blue-400" />
      case "snow":
        return <CloudSnow className="h-16 w-16 text-sky-200" />
      case "mist":
      case "fog":
      case "haze":
        return <CloudFog className="h-16 w-16 text-gray-300" />
      case "thunderstorm":
        return <CloudLightning className="h-16 w-16 text-purple-500" />
      default:
        return <Wind className="h-16 w-16 text-gray-400" />
    }
  }

  const getBackgroundClass = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return "from-yellow-900/20 to-orange-900/20 border-yellow-700/30"
      case "clouds":
        return "from-gray-900/20 to-slate-900/20 border-gray-700/30"
      case "rain":
      case "drizzle":
        return "from-blue-900/20 to-indigo-900/20 border-blue-700/30"
      case "snow":
        return "from-sky-900/20 to-blue-900/20 border-sky-700/30"
      case "thunderstorm":
        return "from-purple-900/20 to-indigo-900/20 border-purple-700/30"
      default:
        return "from-slate-900/20 to-gray-900/20 border-slate-700/30"
    }
  }

  const shareWeather = () => {
    const text = `Current weather in ${weatherData.name}: ${Math.round(weatherData.main.temp)}°C, ${weatherData.weather[0].description}`

    if (navigator.share) {
      navigator
        .share({
          title: "Weather Update",
          text: text,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
        .catch((err) => console.error("Failed to copy: ", err))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card
        className={`overflow-hidden bg-gradient-to-br backdrop-blur-md ${getBackgroundClass(weatherData.weather[0].main)} border`}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold text-white">
                {weatherData.name}, {weatherData.sys.country}
              </CardTitle>
              <p className="text-sm text-slate-300 mt-1">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onAddToFavorites(weatherData.name)}
                disabled={isFavorite}
                title={isFavorite ? "Already in favorites" : "Add to favorites"}
                className="border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300"
              >
                <Star className={`h-4 w-4 ${isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={shareWeather}
                title="Share weather"
                className="border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300"
              >
                {copied ? "Copied!" : <Share2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut" }}
              >
                {getWeatherIcon(weatherData.weather[0].main)}
              </motion.div>
              <div>
                <h3 className="text-4xl font-bold text-white">{Math.round(weatherData.main.temp)}°C</h3>
                <p className="text-slate-300 capitalize">{weatherData.weather[0].description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4 md:mt-0">
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-rose-500" />
                <span className="text-sm text-slate-300">Feels like: {Math.round(weatherData.main.feels_like)}°C</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-slate-300">Humidity: {weatherData.main.humidity}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-300">Wind: {Math.round(weatherData.wind.speed)} m/s</span>
              </div>
              <div>
                <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                  {weatherData.weather[0].main}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
