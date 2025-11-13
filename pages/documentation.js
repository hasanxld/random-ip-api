// pages/documentation.js
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Documentation() {
  return (
    <>
      <Head>
        <title>Documentation - RandomIP API</title>
        <meta name="description" content="RandomIP API documentation and usage examples" />
      </Head>

      <Header />
      
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 p-8">
            <h1 className="text-3xl font-bold mb-8">API Documentation</h1>

            {/* API Endpoint */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">API Endpoint</h2>
              <div className="bg-gray-100 p-4 font-mono text-sm">
                GET /api/ip/random?api_key=YOUR_API_KEY
              </div>
            </div>

            {/* Authentication */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
              <p className="text-gray-600 mb-4">
                All API requests require an API key. Include your API key as a query parameter:
              </p>
              <div className="bg-gray-100 p-4 font-mono text-sm mb-4">
                ?api_key=your_api_key_here
              </div>
              <div className="bg-yellow-50 border border-yellow-200 p-4">
                <p className="text-yellow-800 text-sm">
                  <i className="ri-alert-line mr-2"></i>
                  Keep your API key secure and never expose it in client-side code.
                </p>
              </div>
            </div>

            {/* Response Format */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Response Format</h2>
              <p className="text-gray-600 mb-4">
                Successful responses are returned in JSON format:
              </p>
              <pre className="bg-gray-100 p-4 text-sm overflow-auto">
{`{
  "success": true,
  "ip": "192.168.1.1",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "type": "IPv4"
}`}
              </pre>
            </div>

            {/* Error Responses */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Error Responses</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-red-600 mb-2">Invalid API Key</h3>
                  <pre className="bg-gray-100 p-4 text-sm overflow-auto">
{`{
  "success": false,
  "error": "Invalid API key",
  "code": 401
}`}
                  </pre>
                </div>
                <div>
                  <h3 className="font-semibold text-red-600 mb-2">Missing API Key</h3>
                  <pre className="bg-gray-100 p-4 text-sm overflow-auto">
{`{
  "success": false,
  "error": "API key is required",
  "code": 400
}`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Code Examples */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Code Examples</h2>
              
              <div className="space-y-6">
                {/* JavaScript */}
                <div>
                  <h3 className="font-semibold mb-2">JavaScript (Fetch)</h3>
                  <pre className="bg-gray-100 p-4 text-sm overflow-auto">
{`fetch('/api/ip/random?api_key=YOUR_API_KEY')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`}
                  </pre>
                </div>

                {/* Python */}
                <div>
                  <h3 className="font-semibold mb-2">Python</h3>
                  <pre className="bg-gray-100 p-4 text-sm overflow-auto">
{`import requests

response = requests.get(
    'https://yourdomain.com/api/ip/random',
    params={'api_key': 'YOUR_API_KEY'}
)
data = response.json()
print(data)`}
                  </pre>
                </div>

                {/* Node.js */}
                <div>
                  <h3 className="font-semibold mb-2">Node.js</h3>
                  <pre className="bg-gray-100 p-4 text-sm overflow-auto">
{`const https = require('https');

const options = {
  hostname: 'yourdomain.com',
  path: '/api/ip/random?api_key=YOUR_API_KEY',
  method: 'GET'
};

const req = https.request(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(JSON.parse(data)));
});

req.end();`}
                  </pre>
                </div>

                {/* cURL */}
                <div>
                  <h3 className="font-semibold mb-2">cURL</h3>
                  <pre className="bg-gray-100 p-4 text-sm overflow-auto">
{`curl -X GET "https://yourdomain.com/api/ip/random?api_key=YOUR_API_KEY"`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
                }
