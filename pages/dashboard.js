// pages/dashboard.js
import { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ApiKeyModal from '../components/ApiKeyModal'

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [apiKeys, setApiKeys] = useState([])

  return (
    <>
      <Head>
        <title>Dashboard - RandomIP API</title>
      </Head>

      <Header />
      
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-6 py-2 hover:bg-blue-700"
              >
                <i className="ri-key-2-line mr-2"></i>
                Generate New API Key
              </button>
            </div>

            {/* API Usage Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-6 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">Total Requests</p>
                    <p className="text-2xl font-bold text-blue-900">0</p>
                  </div>
                  <i className="ri-database-2-line text-2xl text-blue-600"></i>
                </div>
              </div>

              <div className="bg-green-50 p-6 border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">Successful</p>
                    <p className="text-2xl font-bold text-green-900">0</p>
                  </div>
                  <i className="ri-checkbox-circle-line text-2xl text-green-600"></i>
                </div>
              </div>

              <div className="bg-purple-50 p-6 border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-sm font-medium">API Keys</p>
                    <p className="text-2xl font-bold text-purple-900">{apiKeys.length}</p>
                  </div>
                  <i className="ri-key-2-line text-2xl text-purple-600"></i>
                </div>
              </div>
            </div>

            {/* API Keys List */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Your API Keys</h2>
              {apiKeys.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-300">
                  <i className="ri-key-2-line text-4xl text-gray-400 mb-4"></i>
                  <p className="text-gray-500">No API keys generated yet</p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Generate your first API key
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {apiKeys.map((key, index) => (
                    <div key={index} className="border border-gray-200 p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-mono text-sm bg-gray-100 p-2">{key}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Created on {new Date().toLocaleDateString()}
                          </p>
                        </div>
                        <button className="text-red-600 hover:text-red-700">
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <ApiKeyModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerateKey={(key) => setApiKeys([...apiKeys, key])}
      />
    </>
  )
                  }
