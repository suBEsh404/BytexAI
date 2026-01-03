import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-dark-bg">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 border border-gray-300 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-gray-400 dark:hover:border-slate-600 transition-all duration-300">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Cookie <span className="gradient-text">Policy</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Last updated: January 2025</p>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">1. What Are Cookies</h2>
              <p>Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">2. Types of Cookies We Use</h2>

              <div className="space-y-4 ml-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Essential Cookies</h3>
                  <p>Required for the website to function properly. These include authentication and security cookies.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Performance Cookies</h3>
                  <p>Help us understand how visitors interact with our website by collecting anonymous information.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Functionality Cookies</h3>
                  <p>Remember your preferences and settings to provide enhanced features.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Analytics Cookies</h3>
                  <p>Help us analyze website traffic and improve our services.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">3. How We Use Cookies</h2>
              <p className="mb-3">We use cookies to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Keep you signed in</li>
                <li>Remember your preferences</li>
                <li>Understand how you use our service</li>
                <li>Improve website performance</li>
                <li>Provide personalized content</li>
                <li>Analyze user behavior and trends</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">4. Third-Party Cookies</h2>
              <p>We may use third-party services that set cookies on your device. These include analytics providers and social media platforms. These third parties have their own privacy policies.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">5. Managing Cookies</h2>
              <p className="mb-3">You can control and manage cookies in several ways:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Browser settings: Most browsers allow you to refuse or delete cookies</li>
                <li>Opt-out tools: Use browser extensions to block tracking cookies</li>
                <li>Privacy settings: Adjust your preferences in your account settings</li>
              </ul>
              <p className="mt-3 text-yellow-600 dark:text-yellow-400">Note: Disabling cookies may affect website functionality.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">6. Cookie Duration</h2>
              <p className="mb-3">We use both session and persistent cookies:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent cookies:</strong> Remain on your device for a set period or until manually deleted</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">7. Updates to This Policy</h2>
              <p>We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">8. Contact Us</h2>
              <p>If you have questions about our use of cookies, please contact us at:</p>
              <p className="mt-2 text-accent">cookies@bytexai.com</p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default CookiePolicyPage
