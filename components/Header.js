// components/Header.js
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { currentUser, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      setIsUserMenuOpen(false)
    } catch (error) {
      console.error('Failed to log out:', error)
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <i className="ri-global-line text-2xl text-blue-600 mr-2"></i>
              <span className="text-xl font-bold text-gray-900">RandomIP API</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
            <Link href="/documentation" className="text-gray-700 hover:text-blue-600 font-medium">Documentation</Link>
            
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : currentUser.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium">{currentUser.displayName || currentUser.email}</span>
                  <i className={`ri-arrow-down-s-line ${isUserMenuOpen ? 'rotate-180' : ''} transition-transform`}></i>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg py-1">
                    <Link 
                      href="/dashboard" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <i className="ri-dashboard-line mr-2"></i>
                      Dashboard
                    </Link>
                    {!currentUser.emailVerified && (
                      <Link 
                        href="/verify-email" 
                        className="block px-4 py-2 text-orange-600 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <i className="ri-mail-warning-line mr-2"></i>
                        Verify Email
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <i className="ri-logout-box-line mr-2"></i>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium">Sign In</Link>
                <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 font-medium">
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            {currentUser && (
              <Link href="/dashboard" className="text-gray-700">
                <i className="ri-dashboard-line text-xl"></i>
              </Link>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-2xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/documentation" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Documentation</Link>
              
              {currentUser ? (
                <>
                  <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                  {!currentUser.emailVerified && (
                    <Link href="/verify-email" className="text-orange-600 hover:text-orange-700 font-medium" onClick={() => setIsMenuOpen(false)}>
                      Verify Email
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-left text-gray-700 hover:text-blue-600 font-medium"
                  >
                    Sign Out
                  </button>
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-sm text-gray-600">Signed in as</p>
                    <p className="font-medium">{currentUser.displayName || currentUser.email}</p>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                  <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 text-center hover:bg-blue-700 font-medium" onClick={() => setIsMenuOpen(false)}>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
    }
