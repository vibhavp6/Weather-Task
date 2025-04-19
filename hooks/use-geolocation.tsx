"use client"

import { useState, useEffect } from "react"

interface GeolocationPosition {
  latitude: number
  longitude: number
}

interface UseGeolocationReturn {
  location: GeolocationPosition | null
  error: string | null
  loading: boolean
}

export function useGeolocation(): UseGeolocationReturn {
  const [location, setLocation] = useState<GeolocationPosition | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setLoading(false)
      },
      (error) => {
        setError(error.message)
        setLoading(false)
      },
    )
  }, [])

  return { location, error, loading }
}
