"use client"

import { useState } from "react"
import { Lightbulb, RefreshCw, ThumbsUp, ThumbsDown, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

interface ActivitySuggestionsProps {
  weatherCondition: string
}

interface Activity {
  id: number
  text: string
}

export function ActivitySuggestions({ weatherCondition }: ActivitySuggestionsProps) {
  const [activities, setActivities] = useState<Activity[]>(() => {
    return getActivitiesByWeather(weatherCondition)
  })

  const [likedActivities, setLikedActivities] = useState<number[]>([])
  const [dislikedActivities, setDislikedActivities] = useState<number[]>([])
  const [copied, setCopied] = useState<number | null>(null)

  function getActivitiesByWeather(condition: string): Activity[] {
    const conditionLower = condition.toLowerCase()

    const activitySets = {
      clear: [
        "Go for a scenic hike in a nearby nature trail",
        "Have a picnic in the park with friends",
        "Set up a backyard movie night under the stars",
        "Go stargazing away from city lights",
        "Take a bike ride around your neighborhood",
        "Visit a local farmers market",
        "Go kayaking or paddleboarding if near water",
        "Plant some flowers or start a garden",
      ],
      clouds: [
        "Visit a local museum or art gallery",
        "Try a new coffee shop and read a book",
        "Go for a photography walk - cloudy days have great lighting",
        "Take a scenic drive to enjoy the landscape",
        "Visit a botanical garden or greenhouse",
        "Go window shopping at a local mall",
        "Take a cooking class or try a new recipe at home",
        "Visit a local brewery or winery",
      ],
      rain: [
        "Have a movie marathon with comfort food",
        "Visit an indoor arcade or bowling alley",
        "Try a new baking recipe",
        "Start a DIY craft project",
        "Visit a cozy bookstore or library",
        "Have a board game night with friends",
        "Take a relaxing bath with a good book",
        "Visit an indoor pool or spa",
      ],
      snow: [
        "Build a snowman or have a snowball fight",
        "Go sledding at a local hill",
        "Make hot chocolate and watch the snow fall",
        "Try snowshoeing or cross-country skiing",
        "Bake cookies or bread to warm up the house",
        "Take photos of the winter wonderland",
        "Have an indoor picnic by the window",
        "Build a blanket fort and watch movies",
      ],
      thunderstorm: [
        "Have a candlelit dinner at home",
        "Write in a journal or start a creative writing project",
        "Do a jigsaw puzzle or play a board game",
        "Take a nap while listening to the rain",
        "Organize a closet or drawer you've been putting off",
        "Make a playlist of your favorite songs",
        "Call an old friend for a catch-up",
        "Try meditation or yoga indoors",
      ],
      mist: [
        "Visit a cozy café with a view",
        "Go for a mysterious forest walk",
        "Take moody photographs in the mist",
        "Visit a local greenhouse or indoor garden",
        "Go to a spa or have a self-care day at home",
        "Visit a historic site or castle (they look amazing in mist)",
        "Have a tea tasting session at home",
        "Write poetry inspired by the atmospheric weather",
      ],
      default: [
        "Try a new restaurant in your area",
        "Start a new book you've been wanting to read",
        "Call a friend you haven't spoken to in a while",
        "Reorganize a space in your home",
        "Learn a new skill on YouTube",
        "Plan your next vacation or day trip",
        "Try a new workout routine",
        "Visit a local attraction you've never been to",
      ],
    }

    let selectedActivities

    if (conditionLower.includes("clear")) {
      selectedActivities = activitySets.clear
    } else if (conditionLower.includes("cloud")) {
      selectedActivities = activitySets.clouds
    } else if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) {
      selectedActivities = activitySets.rain
    } else if (conditionLower.includes("snow")) {
      selectedActivities = activitySets.snow
    } else if (conditionLower.includes("thunderstorm")) {
      selectedActivities = activitySets.thunderstorm
    } else if (conditionLower.includes("mist") || conditionLower.includes("fog") || conditionLower.includes("haze")) {
      selectedActivities = activitySets.mist
    } else {
      selectedActivities = activitySets.default
    }

    // Get 4 random activities
    const shuffled = [...selectedActivities].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, 4)

    return selected.map((text, index) => ({
      id: index + 1,
      text,
    }))
  }

  const refreshActivities = () => {
    setActivities(getActivitiesByWeather(weatherCondition))
    setLikedActivities([])
    setDislikedActivities([])
  }

  const likeActivity = (id: number) => {
    if (likedActivities.includes(id)) {
      setLikedActivities(likedActivities.filter((actId) => actId !== id))
    } else {
      setLikedActivities([...likedActivities, id])
      setDislikedActivities(dislikedActivities.filter((actId) => actId !== id))
    }
  }

  const dislikeActivity = (id: number) => {
    if (dislikedActivities.includes(id)) {
      setDislikedActivities(dislikedActivities.filter((actId) => actId !== id))
    } else {
      setDislikedActivities([...dislikedActivities, id])
      setLikedActivities(likedActivities.filter((actId) => actId !== id))
    }
  }

  const shareActivity = (activity: Activity) => {
    const text = `Weather activity suggestion: ${activity.text}`

    if (navigator.share) {
      navigator
        .share({
          title: "Activity Suggestion",
          text: text,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(activity.id)
          setTimeout(() => setCopied(null), 2000)
        })
        .catch((err) => console.error("Failed to copy: ", err))
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-white">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <span>Suggested Activities</span>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={refreshActivities}
              className="h-8 px-2 text-slate-300 hover:text-white hover:bg-slate-700"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
            {activities.map((activity) => (
              <motion.div
                key={activity.id}
                variants={item}
                className={`p-3 rounded-lg border transition-all ${
                  likedActivities.includes(activity.id)
                    ? "border-green-700 bg-green-900/20"
                    : dislikedActivities.includes(activity.id)
                      ? "border-red-700 bg-red-900/20 opacity-60"
                      : "border-slate-700 bg-slate-800/30"
                }`}
              >
                <p className="text-slate-300">{activity.text}</p>
                <div className="flex justify-end gap-1 mt-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
                    onClick={() => likeActivity(activity.id)}
                  >
                    <ThumbsUp
                      className={`h-4 w-4 ${likedActivities.includes(activity.id) ? "fill-green-500 text-green-500" : ""}`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
                    onClick={() => dislikeActivity(activity.id)}
                  >
                    <ThumbsDown
                      className={`h-4 w-4 ${dislikedActivities.includes(activity.id) ? "fill-red-500 text-red-500" : ""}`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
                    onClick={() => shareActivity(activity)}
                  >
                    {copied === activity.id ? <span className="text-xs">Copied!</span> : <Share className="h-4 w-4" />}
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
        <CardFooter className="text-xs text-slate-400">
          Activities are suggested based on the current weather conditions.
        </CardFooter>
      </Card>
    </motion.div>
  )
}
