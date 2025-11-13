// pages/index.js
import { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ApiKeyModal from '../components/ApiKeyModal'
import TestApi from '../components/TestApi'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [apiKey, setApiKey] = useState('')

  return (
    <>
      <Head>
        <title>RandomIP API - Free Random IP Address API</title>
        <meta name="description" content="Free Random IP API service for developers. Generate random IP addresses for testing and development." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Free Random IP API
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Generate random IP addresses instantly with our reliable API service
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-blue-600 px-8 py-3 font-semibold hover:bg-blue-50 block sm:inline-block"
              >
                <i className="ri-key-2-line mr-2"></i>
                Get Free API Key
              </button>
              <a
                href="/documentation"
                className="border-2 border-white text-white px-8 py-3 font-semibold hover:bg-white hover:text-blue-600 transition-colors block sm:inline-block"
              >
                <i className="ri-book-line mr-2"></i>
                View Documentation
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Our API?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Powerful features designed for developers and businesses
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <i className="ri-zap-line text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                <p className="text-gray-600">
                  Get responses in milliseconds with our optimized API infrastructure
                </p>
              </div>

              <div className="bg-white p-6 border border-gray-200">
                <div className="w-12 h-12 bg-green-100 text-green-600 flex items-center justify-center mb-4">
                  <i className="ri-shield-check-line text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Reliable & Secure</h3>
                <p className="text-gray-600">
                  99.9% uptime guarantee with secure API key authentication
                </p>
              </div>

              <div className="bg-white p-6 border border-gray-200">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                  <i className="ri-code-s-slash-line text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Developer Friendly</h3>
                <p className="text-gray-600">
                  Clean documentation and support for all programming languages
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* API Test Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Test the API
              </h2>
              <p className="text-lg text-gray-600">
                Try our API instantly with your API key
              </p>
            </div>
            <TestApi />
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers using our Random IP API
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-8 py-3 font-semibold hover:bg-blue-700"
            >
              Get Your Free API Key Now
            </button>
          </div>
        </section>
      </main>

      <Footer />

      <ApiKeyModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerateKey={(key) => setApiKey(key)}
      />
    </>
  )
}
