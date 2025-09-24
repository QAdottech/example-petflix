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
