export interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  channel: string
  views: string
  uploadTime: string
  duration: string
  category: string
  featured: boolean
}

export interface VideoData {
  videos: Video[]
}

export const categories = [
  'all',
  'dogs',
  'cats',
  'birds',
  'hamsters',
  'rabbits',
  'sloths',
] as const

export type Category = (typeof categories)[number]
