// pages/api/ip/random.js
// Simple in-memory store for API keys (use database in production)
const apiKeys = new Map()

// Pre-populate with some demo keys for testing
apiKeys.set('demo_key_123', {
  email: 'demo@example.com',
  createdAt: new Date().toISOString(),
  requests: 0
})

function generateRandomIP() {
  // Generate random IPv4 address
  const octet1 = Math.floor(Math.random() * 255) + 1
  const octet2 = Math.floor(Math.random() * 256)
  const octet3 = Math.floor(Math.random() * 256)
  const octet4 = Math.floor(Math.random() * 256)
  
  return `${octet1}.${octet2}.${octet3}.${octet4}`
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed. Use GET.',
      code: 405
    })
  }

  const { api_key } = req.query

  if (!api_key) {
    return res.status(400).json({
      success: false,
      error: 'API key is required',
      code: 400
    })
  }

  // Check if API key exists
  if (!apiKeys.has(api_key) && api_key !== 'demo_key_123') {
    return res.status(401).json({
      success: false,
      error: 'Invalid API key',
      code: 401
    })
  }

  // Update request count
  if (apiKeys.has(api_key)) {
    const keyData = apiKeys.get(api_key)
    keyData.requests++
    apiKeys.set(api_key, keyData)
  }

  // Generate random IP
  const randomIP = generateRandomIP()

  // Return success response
  res.status(200).json({
    success: true,
    ip: randomIP,
    timestamp: new Date().toISOString(),
    type: 'IPv4',
    requests: apiKeys.get(api_key)?.requests || 0
  })
}
