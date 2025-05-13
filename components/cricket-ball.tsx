"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

type Position = {
  top?: string
  left?: string
  right?: string
  bottom?: string
}

export function CricketBall({
  position,
  delay = 0,
  theme = "dark",
}: { position: Position; delay?: number; theme?: string }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [delay])

  if (!isVisible) return null

  return (
    <motion.div
      className={`absolute w-12 h-12 rounded-full z-0 ${theme === "dark" ? "bg-red-600 opacity-30" : "bg-red-500 opacity-20"}`}
      style={{
        ...position,
        backgroundImage:
          theme === "dark"
            ? `radial-gradient(circle at 30% 30%, #ef4444 0%, #b91c1c 100%)`
            : `radial-gradient(circle at 30% 30%, #f87171 0%, #dc2626 100%)`,
      }}
      initial={{ scale: 0 }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 360],
        scale: [0, 1, 0.9, 1],
      }}
      transition={{
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `linear-gradient(135deg, transparent 0%, transparent 45%, ${theme === "dark" ? "#ffffff" : "#f8fafc"} 45%, ${theme === "dark" ? "#ffffff" : "#f8fafc"} 55%, transparent 55%, transparent 100%)`,
        }}
        animate={{ rotate: [0, 360] }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </motion.div>
  )
}
