// pages/api/generate-key.js
import { v4 as uuidv4 } from 'uuid'

// In a real application, you would use a database
// For this demo, we'll use a simple in-memory store
const apiKeys = new Map()

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email) {
    return res.status(400).json({ success: false, error: 'Email is required' })
  }

  // Generate unique API key
  const apiKey = `rk_${uuidv4().replace(/-/g, '')}`

  // Store API key with email and creation date
  apiKeys.set(apiKey, {
    email,
    createdAt: new Date().toISOString(),
    requests: 0
  })

  // In production, you would:
  // 1. Save to database
  // 2. Send confirmation email
  // 3. Implement rate limiting

  res.status(200).json({
    success: true,
    apiKey,
    message: 'API key generated successfully'
  })
}
