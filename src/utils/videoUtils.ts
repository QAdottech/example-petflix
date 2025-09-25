import { Video } from '@/types/video'

export const getVideos = async (): Promise<Video[]> => {
  const data = await import('@/data/videos.json')
  return data.default.videos
}

export const getFeaturedVideos = async (): Promise<Video[]> => {
  const videos = await getVideos()
  return videos.filter((video) => video.featured)
}

export const searchVideos = async (query: string): Promise<Video[]> => {
  const videos = await getVideos()
  const lowercaseQuery = query.toLowerCase()

  return videos.filter(
    (video) =>
      video.title.toLowerCase().includes(lowercaseQuery) ||
      video.description.toLowerCase().includes(lowercaseQuery) ||
      video.channel.toLowerCase().includes(lowercaseQuery)
  )
}

export const filterVideosByCategory = async (
  category: string
): Promise<Video[]> => {
  const videos = await getVideos()

  if (category === 'all') {
    return videos
  }

  return videos.filter((video) => video.category === category)
}

export const filterVideosByCategoryWithSlothDelay = async (
  category: string
): Promise<Video[]> => {
  const videos = await getVideos()

  if (category === 'all') {
    return videos
  }

  // Add extra delay for sloths category to make it load slowly
  if (category === 'sloths') {
    await new Promise((resolve) => setTimeout(resolve, 3500)) // 3.5 second delay
  }

  return videos.filter((video) => video.category === category)
}

export const getFavoritesFromStorage = (): string[] => {
  if (typeof window === 'undefined') return []

  try {
    const favorites = localStorage.getItem('petflix-favorites')
    return favorites ? JSON.parse(favorites) : []
  } catch {
    return []
  }
}

export const addToFavorites = (videoId: string): void => {
  if (typeof window === 'undefined') return

  try {
    const favorites = getFavoritesFromStorage()
    if (!favorites.includes(videoId)) {
      favorites.push(videoId)
      localStorage.setItem('petflix-favorites', JSON.stringify(favorites))
    }
  } catch {
    // Handle error silently
  }
}

export const removeFromFavorites = (videoId: string): void => {
  if (typeof window === 'undefined') return

  try {
    const favorites = getFavoritesFromStorage()
    const updatedFavorites = favorites.filter((id) => id !== videoId)
    localStorage.setItem('petflix-favorites', JSON.stringify(updatedFavorites))
  } catch {
    // Handle error silently
  }
}

export const isFavorite = (videoId: string): boolean => {
  const favorites = getFavoritesFromStorage()
  return favorites.includes(videoId)
}

export const getTrendingVideos = async (
  limit: number = 8
): Promise<Video[]> => {
  const videos = await getVideos()

  // Parse view counts and calculate trending score
  const videosWithScores = videos.map((video) => {
    // Convert view count string to number (e.g., "2.3M" -> 2300000)
    const views = parseViews(video.views)

    // Calculate trending score based on views and recency
    const trendingScore = calculateTrendingScore(views, video.uploadTime)

    return {
      ...video,
      trendingScore,
    }
  })

  // Sort by trending score and return top videos
  return videosWithScores
    .sort((a, b) => b.trendingScore - a.trendingScore)
    .slice(0, limit)
}

// Helper function to parse view count strings
const parseViews = (viewsString: string): number => {
  const views = viewsString.toLowerCase()
  const number = parseFloat(views.replace(/[^\d.]/g, ''))

  if (views.includes('m')) {
    return number * 1000000
  } else if (views.includes('k')) {
    return number * 1000
  }

  return number
}

// Helper function to calculate trending score
const calculateTrendingScore = (views: number, uploadTime: string): number => {
  // Parse upload time to get days ago
  const daysAgo = parseUploadTime(uploadTime)

  // Trending score = views / (days + 1) to favor recent videos
  // This gives higher scores to videos with more views that are more recent
  return views / (daysAgo + 1)
}

// Helper function to parse upload time strings
const parseUploadTime = (uploadTime: string): number => {
  const time = uploadTime.toLowerCase()

  if (time.includes('day')) {
    const days = parseInt(time.match(/\d+/)?.[0] || '0')
    return days
  } else if (time.includes('week')) {
    const weeks = parseInt(time.match(/\d+/)?.[0] || '0')
    return weeks * 7
  } else if (time.includes('hour')) {
    const hours = parseInt(time.match(/\d+/)?.[0] || '0')
    return hours / 24
  }

  return 0
}
