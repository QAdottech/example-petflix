'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Home, Search, Heart, Play } from 'lucide-react'
import { Video } from '@/types/video'
import {
  addToFavorites,
  removeFromFavorites,
  isFavorite,
} from '@/utils/videoUtils'

interface VideoCardProps {
  video: Video
  onToggleFavorite?: (videoId: string) => void
}

export default function VideoCard({ video, onToggleFavorite }: VideoCardProps) {
  const [favorited, setFavorited] = useState(false)

  useEffect(() => {
    setFavorited(isFavorite(video.id))
  }, [video.id])

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (favorited) {
      removeFromFavorites(video.id)
      setFavorited(false)
    } else {
      addToFavorites(video.id)
      setFavorited(true)
    }

    if (onToggleFavorite) {
      onToggleFavorite(video.id)
    }
  }

  return (
    <div className="group cursor-pointer">
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full aspect-video object-cover rounded-lg group-hover:rounded-none transition-all duration-200"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
          {video.duration}
        </div>
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 ${
            favorited
              ? 'bg-red-500 text-white'
              : 'bg-black bg-opacity-50 text-white hover:bg-opacity-70'
          }`}
        >
          <Heart className={`h-4 w-4 ${favorited ? 'fill-current' : ''}`} />
        </button>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
          <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-200" />
        </div>
      </div>

      <div className="mt-3">
        <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
          {video.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{video.channel}</p>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <span>{video.views} views</span>
          <span className="mx-1">•</span>
          <span>{video.uploadTime}</span>
        </div>
      </div>
    </div>
  )
}
