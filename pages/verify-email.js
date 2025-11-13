// pages/verify-email.js
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function VerifyEmail() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const { currentUser, resendVerification } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!currentUser) {
      router.push('/login')
    } else if (currentUser.emailVerified) {
      router.push('/dashboard')
    }
  }, [currentUser, router])

  const handleResendVerification = async () => {
    try {
      setLoading(true)
      setError('')
      await resendVerification()
      setMessage('Verification email sent! Check your inbox.')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  if (!currentUser) {
    return null
  }

  return (
    <>
      <Head>
        <title>Verify Email - RandomIP API</title>
      </Head>

      <Header />
      
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-mail-send-line text-2xl text-orange-600"></i>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4">Verify Your Email</h1>
            
            <p className="text-gray-600 mb-6">
              We've sent a verification email to:
            </p>
            
            <p className="text-lg font-semibold text-gray-900 mb-6">
              {currentUser.email}
            </p>

            <p className="text-gray-600 mb-8">
              Click the verification link in the email to activate your account and start using our API services.
            </p>

            {message && (
              <div className="bg-green-50 border border-green-200 p-4 mb-6">
                <p className="text-green-800 text-sm flex items-center justify-center">
                  <i className="ri-checkbox-circle-line mr-2"></i>
                  {message}
                </p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 p-4 mb-6">
                <p className="text-red-800 text-sm flex items-center justify-center">
                  <i className="ri-error-warning-line mr-2"></i>
                  {error}
                </p>
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={handleResendVerification}
                disabled={loading}
                className="w-full bg-orange-600 text-white py-3 px-4 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Sending...
                  </span>
                ) : (
                  'Resend Verification Email'
                )}
              </button>

              <button
                onClick={handleRefresh}
                className="w-full bg-gray-600 text-white py-3 px-4 hover:bg-gray-700 font-medium"
              >
                I've Verified My Email
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Didn't receive the email? Check your spam folder or try resending.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
    }
