import React from "react";
import { Star, Target, Lightbulb, Bot, BarChart3, Users, CheckCircle, Rocket } from "lucide-react";
import PageLayout from "../components/PageLayout";
import Footer from "../components/Footer";

function AboutPage() {
  return (
    <PageLayout className="min-h-screen bg-blue-50 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800 text-gray-900 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-xl border border-black dark:border-slate-700">

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-center text-indigo-600 mb-10 relative">
            <span className="relative">
              About Us
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-300 to-sky-300 dark:from-indigo-500 dark:to-purple-500 rounded-full"></div>
            </span>
          </h1>

          {/* Intro */}
          <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 text-center leading-relaxed max-w-4xl mx-auto">
            BytexAI is an AI-powered digital platform designed to help students,
            developers, and innovators build, manage, and showcase real-world
            projects. Our goal is to bridge the gap between learning and practical
            implementation using modern technology.
          </p>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-12 mt-16">

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Our Vision
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our vision is to create a smart and accessible digital ecosystem
                where anyone can learn, innovate, and grow using artificial
                intelligence. We aim to empower future developers with tools
                that simplify complex ideas.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
                BytexAI focuses on innovation, creativity, and real-world impact.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Our Mission
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our mission is to provide a user-friendly platform that uses AI
                to assist developers in project planning, execution, and
                improvement. We want to make advanced technology easy and
                useful for everyone.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
                We strongly support student learning and skill development.
              </p>
            </div>

          </div>

          {/* What We Do */}
          <div className="mt-20">
            <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-8 flex items-center justify-center gap-2">
              <Lightbulb className="w-7 h-7 text-yellow-500" />
              What We Do
            </h2>

            <p className="text-gray-700 dark:text-gray-300 text-center max-w-4xl mx-auto text-lg leading-relaxed">
              BytexAI provides a centralized environment where users can explore
              ideas, develop projects, and use AI tools to improve quality and
              performance.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-12">

              <div className="bg-blue-50 dark:bg-slate-700 p-6 rounded-xl border border-blue-200 dark:border-slate-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Bot className="w-5 h-5 text-blue-500" />
                  AI Assistance
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Intelligent suggestions and automation to improve project
                  planning and development.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-slate-700 p-6 rounded-xl border border-blue-200 dark:border-slate-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-500" />
                  Project Management
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Tools to organize, track, and showcase projects in a clean
                  and structured way.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-slate-700 p-6 rounded-xl border border-blue-200 dark:border-slate-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-500" />
                  Community Support
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  A collaborative platform for developers to learn, share, and
                  grow together.
                </p>
              </div>

            </div>
          </div>

          {/* Why Choose */}
          <div className="mt-20">
            <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-8 flex items-center justify-center gap-2">
              <CheckCircle className="w-7 h-7 text-green-500" />
              Why Choose BytexAI
            </h2>

            <ul className="max-w-3xl mx-auto text-gray-800 dark:text-gray-300 text-lg space-y-3 list-disc list-inside">
              <li>Easy to use and beginner-friendly design</li>
              <li>AI-powered smart features</li>
              <li>Built for students and developers</li>
              <li>Modern and scalable architecture</li>
              <li>Ideal for academic and real-world projects</li>
            </ul>
          </div>

          {/* Future */}
          <div className="mt-20 text-center bg-gradient-to-r from-blue-50 to-sky-50 dark:from-slate-800 dark:to-slate-800 p-8 rounded-2xl border border-blue-200 dark:border-slate-700">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center justify-center gap-2">
              <Rocket className="w-7 h-7 text-orange-500" />
              Future Goals
            </h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-4xl mx-auto text-lg leading-relaxed">
              In the future, BytexAI plans to integrate advanced AI analytics,
              personalized learning paths, and government-level digital
              solutions to create greater social and technological impact.
            </p>
          </div>

        </div>
      </div>
      <Footer />
    </PageLayout>
  );
}

export default AboutPage;
