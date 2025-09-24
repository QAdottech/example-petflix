'use client'

import { useState, useEffect } from 'react'
import { Video } from '@/types/video'
import { getFeaturedVideos, filterVideosByCategory } from '@/utils/videoUtils'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import VideoCard from '@/components/VideoCard'

export default function HomePage() {
  const [featuredVideos, setFeaturedVideos] = useState<Video[]>([])
  const [reptileVideos, setReptileVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const [featuredVids, reptileVids] = await Promise.all([
          getFeaturedVideos(),
          filterVideosByCategory('reptiles'),
        ])
        setFeaturedVideos(featuredVids)
        setReptileVideos(reptileVids)
      } catch (error) {
        console.error('Error loading videos:', error)
      } finally {
        setLoading(false)
      }
    }

    loadVideos()
  }, [])

  const handleSearch = (query: string) => {
    window.location.href = `/search?q=${encodeURIComponent(query)}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onSearch={handleSearch} />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
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
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Welcome to PetFlix! 🐾
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              The ultimate destination for hilarious pet videos that will make
              your day!
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Featured Videos
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </section>

            {reptileVideos.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Reptile Adventures 🦎
                  </h2>
                  <button
                    onClick={() =>
                      (window.location.href = '/search?category=reptiles')
                    }
                    className="text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    View All Reptiles →
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {reptileVideos.slice(0, 4).map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </section>
            )}

            {featuredVideos.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🐕</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No featured videos found
                </h3>
                <p className="text-gray-600">
                  Check back later for more adorable pet content!
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
