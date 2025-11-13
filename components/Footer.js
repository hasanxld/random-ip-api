// components/Footer.js
export default function Footer() {
  return (
    <footer className="gradient-bg text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <i className="ri-global-line text-2xl mr-2"></i>
              <span className="text-xl font-bold">RandomIP API</span>
            </div>
            <p className="text-gray-300 mb-4">
              Free and reliable Random IP API service for developers. 
              Generate random IP addresses for testing and development purposes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="ri-github-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="ri-twitter-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="ri-discord-fill text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="/documentation" className="text-gray-300 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 RandomIP API. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
