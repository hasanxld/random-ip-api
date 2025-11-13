// components/Header.js
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <i className="ri-global-line text-2xl text-blue-600 mr-2"></i>
            <span className="text-xl font-bold text-gray-900">RandomIP API</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
            <a href="/documentation" className="text-gray-700 hover:text-blue-600 font-medium">Documentation</a>
            <a href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
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
              <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
              <a href="/documentation" className="text-gray-700 hover:text-blue-600 font-medium">Documentation</a>
              <a href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
                }
