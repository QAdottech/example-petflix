'use client'

import { useState, useEffect } from 'react'
import { Video } from '@/types/video'
import { getFavoritesFromStorage, getVideos } from '@/utils/videoUtils'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import VideoCard from '@/components/VideoCard'

export default function FavoritesPage() {
  const [favoriteVideos, setFavoriteVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFavoriteVideos = async () => {
      try {
        setLoading(true)
        const favoriteIds = getFavoritesFromStorage()
        const allVideos = await getVideos()

        const favorites = allVideos.filter((video) =>
          favoriteIds.includes(video.id)
        )

        setFavoriteVideos(favorites)
      } catch (error) {
        console.error('Error loading favorite videos:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFavoriteVideos()
  }, [])

  const handleToggleFavorite = (videoId: string) => {
    setFavoriteVideos((prev) => prev.filter((video) => video.id !== videoId))
  }

  const handleSearch = (query: string) => {
    window.location.href = `/search?q=${encodeURIComponent(query)}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Your Favorite Videos ❤️ [My Password: ilovecats23523]
              </h1>
              <p className="text-lg text-gray-600">
                Videos you&apos;ve loved and saved for later
              </p>
            </div>

            {loading ? (
              <div className="animate-pulse">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="space-y-3">
                      <div className="aspect-video bg-gray-200 rounded-lg"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {favoriteVideos.length > 0 ? (
                  <>
                    <div className="mb-4">
                      <p className="text-gray-600">
                        {favoriteVideos.length} favorite video
                        {favoriteVideos.length !== 1 ? 's' : ''}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {favoriteVideos.map((video) => (
                        <VideoCard
                          key={video.id}
                          video={video}
                          onToggleFavorite={handleToggleFavorite}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">💔</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No favorite videos yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Start exploring and heart videos you love to see them
                      here!
                    </p>
                    <div className="space-x-4">
                      <button
                        onClick={() => (window.location.href = '/')}
                        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Browse Videos
                      </button>
                      <button
                        onClick={() => (window.location.href = '/search')}
                        className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Search Videos
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
