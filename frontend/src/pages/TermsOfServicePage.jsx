import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-dark-bg">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 border border-gray-300 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-gray-400 dark:hover:border-slate-600 transition-all duration-300">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of <span className="gradient-text">Service</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Last updated: January 2025</p>

          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using BYTEXAI, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">2. Use License</h2>
              <p className="mb-3">Permission is granted to temporarily access the materials on BYTEXAI for personal, non-commercial use only. This license shall automatically terminate if you violate any of these restrictions.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">3. User Accounts</h2>
              <p className="mb-3">When you create an account, you must provide accurate information. You are responsible for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Maintaining the security of your account</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us of any unauthorized use</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">4. Content Guidelines</h2>
              <p className="mb-3">Users must not submit content that:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violates any laws or regulations</li>
                <li>Infringes on intellectual property rights</li>
                <li>Contains malicious code or viruses</li>
                <li>Is offensive, harmful, or inappropriate</li>
                <li>Impersonates others or misrepresents affiliation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">5. Intellectual Property</h2>
              <p>The service and its original content, features, and functionality are owned by BYTEXAI and are protected by international copyright, trademark, and other intellectual property laws.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">6. User Content</h2>
              <p>You retain all rights to content you submit. By posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display your content in connection with the service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">7. Termination</h2>
              <p>We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">8. Disclaimer</h2>
              <p>The service is provided "as is" without warranties of any kind. We do not guarantee that the service will be uninterrupted, secure, or error-free.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">9. Limitation of Liability</h2>
              <p>BYTEXAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">10. Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new terms on this page.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">11. Contact Information</h2>
              <p>For questions about these Terms, please contact us at:</p>
              <p className="mt-2 text-accent">legal@bytexai.com</p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default TermsOfServicePage
