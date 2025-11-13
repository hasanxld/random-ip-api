// lib/database.js
import { ref, set, get, update, remove, push, query, orderByChild, equalTo } from 'firebase/database'
import { db } from './firebase'

// API Keys functions
export async function generateApiKey(userId, keyName = 'Default') {
  const apiKey = `rk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  const apiKeyData = {
    key: apiKey,
    userId: userId,
    name: keyName,
    createdAt: new Date().toISOString(),
    isActive: true,
    totalRequests: 0,
    lastUsed: null
  }

  try {
    await set(ref(db, `apiKeys/${apiKey}`), apiKeyData)
    return { success: true, apiKey, data: apiKeyData }
  } catch (error) {
    console.error('Error generating API key:', error)
    return { success: false, error: error.message }
  }
}

export async function validateApiKey(apiKey) {
  try {
    const snapshot = await get(ref(db, `apiKeys/${apiKey}`))
    
    if (snapshot.exists()) {
      const data = snapshot.val()
      if (data.isActive) {
        // Update last used and increment request count
        await update(ref(db, `apiKeys/${apiKey}`), {
          lastUsed: new Date().toISOString(),
          totalRequests: (data.totalRequests || 0) + 1
        })
        return { valid: true, data }
      }
    }
    return { valid: false, error: 'Invalid or inactive API key' }
  } catch (error) {
    console.error('Error validating API key:', error)
    return { valid: false, error: error.message }
  }
}

export async function getUserApiKeys(userId) {
  try {
    const apiKeysQuery = query(
      ref(db, 'apiKeys'),
      orderByChild('userId'),
      equalTo(userId)
    )
    
    const snapshot = await get(apiKeysQuery)
    const apiKeys = []
    
    snapshot.forEach((childSnapshot) => {
      apiKeys.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      })
    })
    
    return { success: true, apiKeys: apiKeys.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) }
  } catch (error) {
    console.error('Error fetching user API keys:', error)
    return { success: false, error: error.message }
  }
}

export async function deleteApiKey(apiKey) {
  try {
    await remove(ref(db, `apiKeys/${apiKey}`))
    return { success: true }
  } catch (error) {
    console.error('Error deleting API key:', error)
    return { success: false, error: error.message }
  }
}
