"use client"

import type React from "react"
import { useState } from "react"
import { SearchIcon, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

interface SearchProps {
  onSearch: (location: string) => void
}

export function Search({ onSearch }: SearchProps) {
  const [location, setLocation] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (location.trim()) {
      onSearch(location.trim())
    }
  }

  return (
    <motion.div
      className="bg-slate-800/60 backdrop-blur-md rounded-xl p-4 shadow-lg border border-slate-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-semibold mb-3 text-white flex items-center">
        <MapPin className="h-4 w-4 mr-2 text-cyan-400" />
        Search Location
      </h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter city name..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
          required
        />
        <Button type="submit" size="icon" className="bg-cyan-500 hover:bg-cyan-600 text-white">
          <SearchIcon className="h-4 w-4" />
        </Button>
      </form>
    </motion.div>
  )
}
