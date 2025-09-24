'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Video } from '@/types/video'
import {
  searchVideos,
  filterVideosByCategory,
  getVideos,
} from '@/utils/videoUtils'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import VideoCard from '@/components/VideoCard'

function SearchContent() {
  const searchParams = useSearchParams()
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const query = searchParams.get('q') || ''
    const category = searchParams.get('category') || 'all'

    setSearchQuery(query)
    setSelectedCategory(category)

    const loadVideos = async () => {
      try {
        setLoading(true)
        let results: Video[] = []

        if (query) {
          results = await searchVideos(query)
        } else if (category !== 'all') {
          results = await filterVideosByCategory(category)
        } else {
          results = await getVideos()
        }

        setVideos(results)
      } catch (error) {
        console.error('Error loading videos:', error)
      } finally {
        setLoading(false)
      }
    }

    loadVideos()
  }, [searchParams])

  const handleSearch = (query: string) => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (selectedCategory !== 'all') params.set('category', selectedCategory)

    window.location.href = `/search?${params.toString()}`
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    if (category !== 'all') params.set('category', category)

    window.location.href = `/search?${params.toString()}`
  }

  const categories = [
    { id: 'all', label: 'All', emoji: '🐾' },
    { id: 'dogs', label: 'Dogs', emoji: '🐕' },
    { id: 'cats', label: 'Cats', emoji: '🐱' },
    { id: 'birds', label: 'Birds', emoji: '🐦' },
    { id: 'hamsters', label: 'Hamsters', emoji: '🐹' },
    { id: 'rabbits', label: 'Rabbits', emoji: '🐰' },
    { id: 'frogs', label: 'Frogs', emoji: '🐸' },
    { id: 'reptiles', label: 'Reptiles', emoji: '🦎' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} searchQuery={searchQuery} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {searchQuery
                  ? `Search results for "${searchQuery}"`
                  : 'Browse Videos'}
              </h1>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-red-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    <span className="mr-2">{category.emoji}</span>
                    {category.label}
                  </button>
                ))}
              </div>
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
                <div className="mb-4">
                  <p className="text-gray-600">
                    {videos.length} video{videos.length !== 1 ? 's' : ''} found
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {videos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>

                {videos.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No videos found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {searchQuery
                        ? `No videos match "${searchQuery}". Try a different search term.`
                        : 'No videos available in this category.'}
                    </p>
                    <button
                      onClick={() => (window.location.href = '/search')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Browse All Videos
                    </button>
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

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50">
          <div className="animate-pulse">
            <div className="h-16 bg-gray-200"></div>
            <div className="flex">
              <div className="w-64 h-screen bg-gray-200"></div>
              <main className="flex-1 p-6">
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
              </main>
            </div>
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  )
}
