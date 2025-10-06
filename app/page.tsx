'use client'

import { useState } from 'react'
import LoginForm from './components/LoginForm'
import BackgroundPattern from './components/BackgroundPattern'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true)
    // Simuleer login proces
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Login attempt:', { email, password })
    setIsLoading(false)
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      <BackgroundPattern />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Logo en titel */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="mx-auto h-16 w-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4 animate-float">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welkom bij De Gierbloemen
            </h1>
            <p className="text-gray-600">
              Meld je aan om verder te gaan
            </p>
          </div>

          {/* Login form */}
          <div className="animate-slide-in-left">
            <LoginForm onLogin={handleLogin} isLoading={isLoading} />
          </div>

          {/* Footer */}
          <div className="mt-8 text-center animate-fade-in-up">
            <p className="text-sm text-gray-500">
              © 2024 De Gierbloemen. Alle rechten voorbehouden.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
