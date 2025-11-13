// components/ApiKeyModal.js
import { useState } from 'react'

export default function ApiKeyModal({ isOpen, onClose, onGenerateKey }) {
  const [email, setEmail] = useState('')
  const [generatedKey, setGeneratedKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerateKey = async () => {
    if (!email) return
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/generate-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      
      const data = await response.json()
      if (data.success) {
        setGeneratedKey(data.apiKey)
        onGenerateKey(data.apiKey)
      }
    } catch (error) {
      console.error('Error generating API key:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Get Your Free API Key</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {!generatedKey ? (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleGenerateKey}
              disabled={isLoading || !email}
              className="w-full bg-blue-600 text-white py-2 px-4 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating...' : 'Generate API Key'}
            </button>
          </>
        ) : (
          <div>
            <div className="bg-green-50 border border-green-200 p-4 mb-4">
              <p className="text-green-800 text-sm mb-2">Your API Key has been generated successfully!</p>
              <div className="bg-gray-100 p-3 font-mono text-sm break-all">
                {generatedKey}
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 p-3 mb-4">
              <p className="text-yellow-800 text-sm">
                <i className="ri-alert-line mr-1"></i>
                Save this key securely. You won't be able to see it again.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-blue-600 text-white py-2 px-4 hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
    }
