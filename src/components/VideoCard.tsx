'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Play } from 'lucide-react'
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
    <Link href={`/video/${video.id}`} className="group cursor-pointer block">
      <div className="relative aspect-video">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover rounded-lg group-hover:rounded-none transition-all duration-200"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded z-10">
          {video.duration}
        </div>
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 z-10 ${
            favorited
              ? 'bg-red-500 text-white'
              : 'bg-black bg-opacity-50 text-white hover:bg-opacity-70'
          }`}
        >
          <Heart className={`h-4 w-4 ${favorited ? 'fill-current' : ''}`} />
        </button>
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-200 drop-shadow-lg" />
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
    </Link>
  )
}
