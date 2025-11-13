// components/TestApi.js
import { useState } from 'react'

export default function TestApi() {
  const [apiKey, setApiKey] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const testApi = async () => {
    if (!apiKey) return
    
    setIsLoading(true)
    setResponse('')
    
    try {
      const res = await fetch(`/api/ip/random?api_key=${apiKey}`)
      const data = await res.json()
      setResponse(JSON.stringify(data, null, 2))
    } catch (error) {
      setResponse(JSON.stringify({ error: 'Failed to fetch API' }, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4">Test API</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            API Key
          </label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <button
          onClick={testApi}
          disabled={isLoading || !apiKey}
          className="bg-blue-600 text-white py-2 px-6 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Testing...' : 'Test API'}
        </button>

        {response && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Response
            </label>
            <pre className="bg-gray-100 p-4 text-sm overflow-auto max-h-60">
              {response}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
              }
