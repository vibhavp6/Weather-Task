"use client"

import { motion } from "framer-motion"

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-12">
      <motion.div
        className="h-16 w-16 rounded-full border-4 border-slate-700 border-t-cyan-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
    </div>
  )
}
