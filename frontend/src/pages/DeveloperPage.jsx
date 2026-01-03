import React from "react";
import PageLayout from "../components/PageLayout";
import Footer from "../components/Footer";

function DeveloperPage() {
  return (
    <PageLayout className="min-h-screen bg-blue-50 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800 text-gray-900 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-xl border border-black dark:border-slate-700">

          {/* Page Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-center text-indigo-600 mb-10">
            Developer Page
          </h1>

          {/* Developer Intro */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
              BytexAI Team
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
              Full Stack Developer | AI Project Builder
            </p>
          </div>

          {/* About Developer */}
          <div className="mt-8 max-w-4xl mx-auto text-center">
            <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
              We are passionate software developer focused on building modern,
              scalable, and user-friendly web applications. we enjoy working
              with artificial intelligence and full-stack technologies to
              create impactful digital solutions.
            </p>
          </div>

          {/* Skills & Interests */}
          <div className="grid md:grid-cols-2 gap-12 mt-16">

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                🛠 Technical Skills
              </h3>
              <ul className="text-gray-800 dark:text-gray-300 text-lg list-disc list-inside space-y-2">
                <li>React.js & Modern JavaScript</li>
                <li>Node.js & Express</li>
                <li>MongoDB & Database Design</li>
                <li>Tailwind CSS & UI Design</li>
                <li>AI Integration & APIs</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                🎯 Interests & Goals
              </h3>
              <p className="text-gray-800 dark:text-gray-300 text-lg leading-relaxed">
                our goal is to continuously improve our technical skills and
                contribute to meaningful projects that solve real-world
                problems.we are especially interested in AI-driven applications,
                cybersecurity, and government-useful digital systems.
              </p>
            </div>

          </div>

          {/* Project Motivation */}
          <div className="mt-20 text-center">
            <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
              💡 Why we Built BytexAI
            </h3>
            <p className="text-gray-800 dark:text-gray-300 max-w-4xl mx-auto text-lg leading-relaxed">
              BytexAI was created as a learning-focused and innovation-driven
              platform to help students and developers showcase projects,
              explore AI concepts, and gain practical experience. This project
              reflects interest in combining education with intelligent
              technology.
            </p>
          </div>

          {/* Contact */}
          <div className="mt-20">
            <h3 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-6">
              📫 Contact Information
            </h3>

            <div className="text-center text-lg text-gray-800 dark:text-gray-300 space-y-2">
              <p>Email: bytexai@email.com</p>
              <p>GitHub: github.com/yourusername</p>
              <p>LinkedIn: linkedin.com/in/yourprofile</p>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </PageLayout>
  );
}

export default DeveloperPage;
