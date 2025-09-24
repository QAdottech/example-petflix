'use client'

import { useState } from 'react'
import { Search, Menu, Heart } from 'lucide-react'
import Link from 'next/link'

interface HeaderProps {
  onSearch?: (query: string) => void
  searchQuery?: string
}

export default function Header({ onSearch, searchQuery = '' }: HeaderProps) {
  const [query, setQuery] = useState(searchQuery)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(query)
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mr-4 p-2 rounded-full hover:bg-gray-100 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold text-red-600">🐾</div>
              <span className="ml-2 text-xl font-bold text-gray-900">
                PetFlix
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for funny pet videos..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <Link
              href="/favorites"
              className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <Heart className="h-5 w-5" />
              <span className="hidden sm:block">Favorites</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
