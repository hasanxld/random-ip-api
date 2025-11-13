// pages/api/ip/random.js
import { validateApiKey } from '../../../lib/database'

function generateRandomIP() {
  const firstOctet = Math.floor(Math.random() * 223) + 1
  const secondOctet = Math.floor(Math.random() * 256)
  const thirdOctet = Math.floor(Math.random() * 256)
  const fourthOctet = Math.floor(Math.random() * 256)
  
  return `${firstOctet}.${secondOctet}.${thirdOctet}.${fourthOctet}`
}

function generateRandomIPv6() {
  const segments = []
  for (let i = 0; i < 8; i++) {
    segments.push(Math.floor(Math.random() * 65536).toString(16))
  }
  return segments.join(':')
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed. Use GET.',
      code: 405
    })
  }

  try {
    const { api_key, type = 'ipv4' } = req.query

    if (!api_key) {
      return res.status(400).json({
        success: false,
        error: 'API key is required',
        code: 400
      })
    }

    // Validate API key
    const validation = await validateApiKey(api_key)

    if (!validation.valid) {
      return res.status(401).json({
        success: false,
        error: validation.error || 'Invalid API key',
        code: 401
      })
    }

    // Generate random IP based on type
    let ip, ipType
    if (type.toLowerCase() === 'ipv6') {
      ip = generateRandomIPv6()
      ipType = 'IPv6'
    } else {
      ip = generateRandomIP()
      ipType = 'IPv4'
    }

    // Return success response
    res.status(200).json({
      success: true,
      ip: ip,
      type: ipType,
      timestamp: new Date().toISOString(),
      requests: validation.data.totalRequests
    })

  } catch (error) {
    console.error('Error in random IP API:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 500
    })
  }
}
