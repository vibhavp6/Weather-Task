"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

interface FavoriteLocationsProps {
  favorites: string[]
  onSelect: (location: string) => void
  onRemove: (location: string) => void
}

export function FavoriteLocations({ favorites, onSelect, onRemove }: FavoriteLocationsProps) {
  if (favorites.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-white">Favorite Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {favorites.map((location) => (
              <motion.li
                key={location}
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="ghost"
                  className="text-left justify-start px-2 h-8 hover:bg-slate-700 text-slate-300 hover:text-white w-full"
                  onClick={() => onSelect(location)}
                >
                  {location}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-slate-400 hover:text-white hover:bg-slate-700"
                  onClick={() => onRemove(location)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}
