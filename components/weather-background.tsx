"use client"

import { useEffect, useRef } from "react"

interface WeatherBackgroundProps {
  condition: string
}

export function WeatherBackground({ condition }: WeatherBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Animation variables
    let particles: any[] = []
    let animationFrameId: number

    // Create particles based on weather condition
    const createParticles = () => {
      particles = []

      const particleCount = condition === "rain" ? 100 : condition === "snow" ? 80 : condition === "clear" ? 50 : 30

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          color: getParticleColor(),
          speed: getParticleSpeed(),
          direction: Math.random() * 2 * Math.PI,
          opacity: Math.random() * 0.5 + 0.2,
        })
      }
    }

    const getParticleColor = () => {
      switch (condition) {
        case "clear":
          return `rgba(255, 215, 0, ${Math.random() * 0.5 + 0.2})`
        case "clouds":
          return `rgba(200, 200, 200, ${Math.random() * 0.3 + 0.1})`
        case "rain":
          return `rgba(120, 160, 255, ${Math.random() * 0.4 + 0.3})`
        case "snow":
          return `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`
        case "thunderstorm":
          return `rgba(150, 100, 255, ${Math.random() * 0.4 + 0.3})`
        default:
          return `rgba(100, 150, 255, ${Math.random() * 0.3 + 0.2})`
      }
    }

    const getParticleSpeed = () => {
      switch (condition) {
        case "rain":
          return Math.random() * 3 + 5
        case "snow":
          return Math.random() * 1 + 0.5
        case "clear":
          return Math.random() * 0.3 + 0.1
        default:
          return Math.random() * 0.5 + 0.2
      }
    }

    // Draw background gradient
    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)

      switch (condition) {
        case "clear":
          gradient.addColorStop(0, "#0f172a")
          gradient.addColorStop(1, "#1e293b")
          break
        case "clouds":
          gradient.addColorStop(0, "#0f172a")
          gradient.addColorStop(1, "#1e293b")
          break
        case "rain":
          gradient.addColorStop(0, "#0f172a")
          gradient.addColorStop(1, "#0f1a2a")
          break
        case "snow":
          gradient.addColorStop(0, "#0f172a")
          gradient.addColorStop(1, "#1a1a2e")
          break
        case "thunderstorm":
          gradient.addColorStop(0, "#0f0f1a")
          gradient.addColorStop(1, "#1a1025")
          break
        default:
          gradient.addColorStop(0, "#0f172a")
          gradient.addColorStop(1, "#1e293b")
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    // Update and draw particles
    const updateParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (condition === "rain") {
          p.y += p.speed
          if (p.y > canvas.height) {
            p.y = -10
            p.x = Math.random() * canvas.width
          }
        } else if (condition === "snow") {
          p.y += p.speed
          p.x += Math.sin(p.direction) * 0.5
          if (p.y > canvas.height) {
            p.y = -10
            p.x = Math.random() * canvas.width
          }
        } else {
          p.x += Math.cos(p.direction) * p.speed
          p.y += Math.sin(p.direction) * p.speed

          if (p.x < 0) p.x = canvas.width
          if (p.x > canvas.width) p.x = 0
          if (p.y < 0) p.y = canvas.height
          if (p.y > canvas.height) p.y = 0
        }
      }
    }

    const drawParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        ctx.beginPath()

        if (condition === "rain") {
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.x, p.y + p.speed)
          ctx.strokeStyle = p.color
          ctx.lineWidth = p.radius / 2
          ctx.stroke()
        } else if (condition === "thunderstorm" && Math.random() < 0.001) {
          // Occasional lightning flash
          ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        } else {
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.fill()
        }
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      drawBackground()
      updateParticles()
      drawParticles()

      animationFrameId = requestAnimationFrame(animate)
    }

    createParticles()
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [condition])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}
