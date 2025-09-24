'use client'

import { useState, useEffect } from 'react'

interface SlothLoadingProps {
  message?: string
}

export default function SlothLoading({
  message = 'Loading sloths...',
}: SlothLoadingProps) {
  const [dots, setDots] = useState('')
  const [currentMessage, setCurrentMessage] = useState(0)

  const messages = [
    'Hanging around...',
    'Taking it slow...',
    'Almost there...',
    'Just a moment...',
    'Sloth speed loading...',
    "Catching some Z's...",
    'Moving at sloth pace...',
    'Still loading...',
    'Almost ready...',
    'Final stretch...',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === '...') return ''
        return prev + '.'
      })
    }, 800)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length)
    }, 2000)

    return () => clearInterval(messageInterval)
  }, [messages.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Sloth */}
        <div className="mb-8">
          <div className="relative">
            {/* Sloth Body */}
            <div className="w-32 h-32 mx-auto mb-4 relative">
              {/* Main body */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full transform rotate-12"></div>

              {/* Head */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full"></div>

              {/* Eyes */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <div className="w-3 h-3 bg-black rounded-full animate-pulse"></div>
                <div
                  className="w-3 h-3 bg-black rounded-full animate-pulse"
                  style={{ animationDelay: '0.5s' }}
                ></div>
              </div>

              {/* Arms hanging down */}
              <div className="absolute top-8 -left-4 w-8 h-16 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full transform rotate-45"></div>
              <div className="absolute top-8 -right-4 w-8 h-16 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full transform -rotate-45"></div>

              {/* Legs */}
              <div className="absolute bottom-0 left-2 w-6 h-12 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full"></div>
              <div className="absolute bottom-0 right-2 w-6 h-12 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full"></div>
            </div>

            {/* Tree branch */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full"></div>

            {/* Leaves */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div
                className="w-3 h-3 bg-green-500 rounded-full animate-pulse"
                style={{ animationDelay: '0.3s' }}
              ></div>
              <div
                className="w-3 h-3 bg-green-500 rounded-full animate-pulse"
                style={{ animationDelay: '0.6s' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {messages[currentMessage]}
          </h2>

          <div className="text-lg text-gray-600">
            {message}
            {dots}
          </div>

          {/* Progress Bar */}
          <div className="w-64 mx-auto">
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-full rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="mt-8 text-sm text-gray-500 max-w-md mx-auto">
            <p className="italic">
              &ldquo;Did you know? Sloths move so slowly that algae grows on
              their fur, giving them a greenish tint!&rdquo;
            </p>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Slow-moving particles */}
          <div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-300 rounded-full animate-bounce"
            style={{ animationDuration: '4s' }}
          ></div>
          <div
            className="absolute top-1/3 right-1/4 w-1 h-1 bg-emerald-300 rounded-full animate-bounce"
            style={{ animationDuration: '6s', animationDelay: '1s' }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce"
            style={{ animationDuration: '5s', animationDelay: '2s' }}
          ></div>
          <div
            className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-emerald-400 rounded-full animate-bounce"
            style={{ animationDuration: '7s', animationDelay: '0.5s' }}
          ></div>
        </div>
      </div>
    </div>
  )
}
