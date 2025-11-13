// pages/dashboard.js
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'
import { getUserApiKeys, generateApiKey, deleteApiKey } from '../lib/database'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [keyName, setKeyName] = useState('')
  const { currentUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!currentUser) {
      router.push('/login')
    } else if (!currentUser.emailVerified) {
      router.push('/verify-email')
    } else {
      fetchApiKeys()
    }
  }, [currentUser, router])

  const fetchApiKeys = async () => {
    if (!currentUser) return
    
    setLoading(true)
    try {
      const result = await getUserApiKeys(currentUser.uid)
      if (result.success) {
        setApiKeys(result.apiKeys)
      }
    } catch (error) {
      console.error('Error fetching API keys:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateKey = async () => {
    if (!currentUser || !keyName.trim()) return
    
    setGenerating(true)
    try {
      const result = await generateApiKey(currentUser.uid, keyName.trim())
      if (result.success) {
        setKeyName('')
        fetchApiKeys() // Refresh the list
      } else {
        alert('Error generating API key: ' + result.error)
      }
    } catch (error) {
      console.error('Error generating API key:', error)
      alert('Error generating API key')
    } finally {
      setGenerating(false)
    }
  }

  const handleDeleteKey = async (apiKey) => {
    if (!confirm('Are you sure you want to delete this API key?')) return
    
    try {
      const result = await deleteApiKey(apiKey)
      if (result.success) {
        fetchApiKeys() // Refresh the list
      } else {
        alert('Error deleting API key: ' + result.error)
      }
    } catch (error) {
      console.error('Error deleting API key:', error)
      alert('Error deleting API key')
    }
  }

  if (!currentUser || !currentUser.emailVerified) {
    return null
  }

  const totalRequests = apiKeys.reduce((sum, key) => sum + (key.totalRequests || 0), 0)
  const activeKeys = apiKeys.filter(key => key.isActive).length

  return (
    <>
      <Head>
        <title>Dashboard - RandomIP API</title>
      </Head>

      <Header />
      
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="bg-white border border-gray-200 p-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {currentUser.displayName || currentUser.email}!
            </h1>
            <p className="text-gray-600">
              Manage your API keys and monitor your usage.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Requests</p>
                  <p className="text-2xl font-bold text-blue-900">{totalRequests.toLocaleString()}</p>
                </div>
                <i className="ri-database-2-line text-2xl text-blue-600"></i>
              </div>
            </div>

            <div className="bg-green-50 p-6 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Active API Keys</p>
                  <p className="text-2xl font-bold text-green-900">{activeKeys}</p>
                </div>
                <i className="ri-key-2-line text-2xl text-green-600"></i>
              </div>
            </div>

            <div className="bg-purple-50 p-6 border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Total Keys</p>
                  <p className="text-2xl font-bold text-purple-900">{apiKeys.length}</p>
                </div>
                <i className="ri-shield-keyhole-line text-2xl text-purple-600"></i>
              </div>
            </div>
          </div>

          {/* Generate New Key */}
          <div className="bg-white border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Generate New API Key</h2>
            <div className="flex gap-4">
              <input
                type="text"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                placeholder="Enter a name for this key (e.g., Production, Development)"
                className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleGenerateKey}
                disabled={generating || !keyName.trim()}
                className="bg-blue-600 text-white px-6 py-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generating ? 'Generating...' : 'Generate Key'}
              </button>
            </div>
          </div>

          {/* API Keys List */}
          <div className="bg-white border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Your API Keys</h2>
            
            {loading ? (
              <div className="text-center py-12">
                <i className="ri-loader-4-line animate-spin text-2xl text-blue-600 mb-4"></i>
                <p className="text-gray-600">Loading API keys...</p>
              </div>
            ) : apiKeys.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-300">
                <i className="ri-key-2-line text-4xl text-gray-400 mb-4"></i>
                <p className="text-gray-500 mb-2">No API keys generated yet</p>
                <p className="text-gray-400 text-sm">
                  Generate your first API key to start using our service
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {apiKeys.map((apiKeyData) => (
                  <div key={apiKeyData.key} className="border border-gray-200 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <code className="
