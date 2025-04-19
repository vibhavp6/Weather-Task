"use client"

import { motion } from "framer-motion"
import { CloudSun } from "lucide-react"

export function AnimatedTitle() {
  return (
    <motion.div
      className="text-center mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div className="inline-flex items-center gap-3 mb-2" whileHover={{ scale: 1.05 }}>
        <motion.div
          animate={{
            rotate: [0, 10, 0, -10, 0],
            scale: [1, 1.1, 1, 1.1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <CloudSun className="h-10 w-10 text-cyan-400" />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
          Weather Activities
        </h1>
      </motion.div>
      <p className="text-slate-400 max-w-2xl mx-auto">
        Discover perfect activities based on your local weather conditions
      </p>
    </motion.div>
  )
}
