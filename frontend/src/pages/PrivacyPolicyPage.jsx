import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-dark-bg">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 border border-gray-300 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-gray-400 dark:hover:border-slate-600 transition-all duration-300">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Last updated: January 2025</p>

          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">1. Information We Collect</h2>
              <p className="mb-3">We collect information you provide directly to us, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Name and email address</li>
                <li>Account credentials</li>
                <li>Profile information</li>
                <li>Project submissions and content</li>
                <li>Communications with us</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">2. How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process your transactions and send related information</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze trends and usage</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">3. Information Sharing</h2>
              <p>We do not share your personal information with third parties except as described in this policy. We may share information with service providers who perform services on our behalf.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">4. Data Security</h2>
              <p>We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no internet transmission is completely secure.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">5. Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">6. Cookies</h2>
              <p>We use cookies and similar technologies to collect information and improve our services. You can control cookies through your browser settings.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">7. Changes to This Policy</h2>
              <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">8. Contact Us</h2>
              <p>If you have questions about this privacy policy, please contact us at:</p>
              <p className="mt-2 text-accent">privacy@bytexai.com</p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default PrivacyPolicyPage
