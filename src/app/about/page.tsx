'use client'
import { BookOpen, Target, Users, Building2, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 via-white to-emerald-50">
     

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-600 via-blue-600 to-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">About GoLake Lab</h1>
            <p className="text-xl text-sky-100 max-w-3xl mx-auto">
              Advancing knowledge and governance for sustainable small lake management
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* About the Project */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-slate-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-sky-100 to-emerald-100 rounded-xl">
                <BookOpen className="size-8 text-sky-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">About the Project</h2>
                <p className="text-lg text-slate-600">Understanding GoLake Lab's mission and impact</p>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-slate-700 text-lg leading-relaxed mb-6">
                The Governance Leadership, Advocacy for Knowledge Enhancement Laboratory (GoLAKE Lab) is a transformative initiative dedicated to advancing the sustainable management of small lakes in the Philippines. Our platform serves as a comprehensive knowledge hub, bringing together research, data, and expertise to support evidence-based decision-making and effective lake governance.
              </p>
              <p className="text-slate-700 text-lg leading-relaxed">
                By creating a centralized repository of hydrological, ecological, governance, and socio-economic data, we empower stakeholders—from policymakers and researchers to local government units and community members—with the tools and insights needed to protect and preserve these vital freshwater ecosystems for future generations.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Project Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Project Overview</h2>
            <p className="text-lg text-slate-600">Our core focus areas and capabilities</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl border border-sky-200 hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg text-slate-900 mb-2">Capacity Building</h3>
              <p className="text-slate-600 text-sm">
                Train planners, policymakers, LGUs, and researchers to conduct lake studies and utilize decision support systems (DSS).
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200 hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg text-slate-900 mb-2">Centralized Repository</h3>
              <p className="text-slate-600 text-sm">
                Consolidate hydrological, ecological, governance, and socio-economic datasets for easy access and analysis.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg text-slate-900 mb-2">Evidence-Based Policy</h3>
              <p className="text-slate-600 text-sm">
                Collaborate with experts and laboratories to support adaptive management and informed decision-making.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl border border-teal-200 hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg text-slate-900 mb-2">Monitoring & Collaboration</h3>
              <p className="text-slate-600 text-sm">
                Work with DOST-PCAARRD-supported labs and small lake governance specialists to enhance governance effectiveness.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Research Objectives */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-slate-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-sky-100 rounded-xl">
                <Target className="size-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Research Objectives</h2>
                <p className="text-lg text-slate-600">Our goals for advancing small lake science and governance</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-l-4 border-sky-500 pl-6 py-2">
                <h3 className="font-bold text-lg text-slate-900 mb-2">1. Enhance Scientific Understanding</h3>
                <p className="text-slate-700">
                  Conduct comprehensive research on the ecological, hydrological, and biogeochemical processes of small lakes to better understand their unique characteristics and vulnerabilities.
                </p>
              </div>

              <div className="border-l-4 border-emerald-500 pl-6 py-2">
                <h3 className="font-bold text-lg text-slate-900 mb-2">2. Support Evidence-Based Governance</h3>
                <p className="text-slate-700">
                  Provide policymakers and local government units with accessible, high-quality data and analytical tools to inform sustainable lake management strategies.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6 py-2">
                <h3 className="font-bold text-lg text-slate-900 mb-2">3. Build Institutional Capacity</h3>
                <p className="text-slate-700">
                  Develop training programs and resources that empower stakeholders to conduct independent lake assessments and implement effective conservation measures.
                </p>
              </div>

              <div className="border-l-4 border-teal-500 pl-6 py-2">
                <h3 className="font-bold text-lg text-slate-900 mb-2">4. Foster Community Engagement</h3>
                <p className="text-slate-700">
                  Engage local communities, academic institutions, and civil society organizations in collaborative research and conservation initiatives for small lakes.
                </p>
              </div>

              <div className="border-l-4 border-cyan-500 pl-6 py-2">
                <h3 className="font-bold text-lg text-slate-900 mb-2">5. Promote Adaptive Management</h3>
                <p className="text-slate-700">
                  Establish monitoring frameworks and feedback mechanisms that enable adaptive, responsive management practices in the face of environmental change.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Research Team */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-slate-200">
            <div className="flex items-start gap-4 mb-8">
              <div className="p-3 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-xl">
                <Users className="size-8 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Research Team</h2>
                <p className="text-lg text-slate-600">Dedicated experts driving lake conservation forward</p>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-slate-700 text-lg leading-relaxed mb-8">
                Our multidisciplinary team brings together expertise in environmental science, public policy, hydrology, ecology, and community development. Working collaboratively across departments and institutions, we combine rigorous scientific research with practical governance solutions to address the complex challenges facing small lakes today.
              </p>

              <div className="bg-gradient-to-br from-sky-50 to-emerald-50 rounded-xl p-6 border border-sky-200">
                <h3 className="font-bold text-lg text-slate-900 mb-3">Core Expertise Areas</h3>
                <ul className="grid md:grid-cols-2 gap-3 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-sky-600 mt-1">✓</span>
                    <span>Environmental Governance & Policy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-600 mt-1">✓</span>
                    <span>Limnology & Aquatic Ecology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-600 mt-1">✓</span>
                    <span>Hydrological Modeling & Analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-600 mt-1">✓</span>
                    <span>Biodiversity Assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-600 mt-1">✓</span>
                    <span>Socio-Economic Research</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-600 mt-1">✓</span>
                    <span>Geographic Information Systems (GIS)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-600 mt-1">✓</span>
                    <span>Water Quality Monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-600 mt-1">✓</span>
                    <span>Community-Based Resource Management</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Partner Institutions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-slate-200">
            <div className="flex items-start gap-4 mb-8">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-xl">
                <Building2 className="size-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Partner Institutions</h2>
                <p className="text-lg text-slate-600">Collaborating for greater impact</p>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-slate-700 text-lg leading-relaxed mb-8">
                GoLake Lab operates through strategic partnerships with leading academic institutions, government agencies, research laboratories, and civil society organizations. These collaborations strengthen our capacity to conduct cutting-edge research, deliver effective training programs, and influence policy development for sustainable lake management.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-sky-50 to-white rounded-xl p-6 border border-slate-200">
                  <h3 className="font-bold text-lg text-slate-900 mb-3">Academic Partners</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 mt-1">•</span>
                      <span>University of the Philippines Los Baños (UPLB)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 mt-1">•</span>
                      <span>College of Public Affairs and Development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 mt-1">•</span>
                      <span>DOST-PCAARRD Supported Laboratories</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl p-6 border border-slate-200">
                  <h3 className="font-bold text-lg text-slate-900 mb-3">Government Agencies</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">•</span>
                      <span>Local Government Units (LGUs)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">•</span>
                      <span>Department of Science and Technology (DOST)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">•</span>
                      <span>Environmental Management Bureaus</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-slate-200">
                  <h3 className="font-bold text-lg text-slate-900 mb-3">Research Networks</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Small Lake Governance Specialists</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Environmental Science Research Communities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Regional Water Management Networks</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-white rounded-xl p-6 border border-slate-200">
                  <h3 className="font-bold text-lg text-slate-900 mb-3">Community Organizations</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 mt-1">•</span>
                      <span>Lake Conservation Advocacy Groups</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 mt-1">•</span>
                      <span>Environmental NGOs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 mt-1">•</span>
                      <span>Community-Based Organizations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Contact Us */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-slate-200">
            <div className="flex items-start gap-4 mb-8">
              <div className="p-3 bg-gradient-to-br from-sky-100 to-blue-100 rounded-xl">
                <Mail className="size-8 text-sky-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Contact Us</h2>
                <p className="text-lg text-slate-600">Get in touch with our team</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div>
                <div className="bg-gradient-to-br from-sky-50 to-emerald-50 rounded-xl p-6 border border-sky-200 mb-6">
                  <h3 className="font-bold text-lg text-slate-900 mb-4">Organization</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Building2 className="size-5 text-sky-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-900">College of Public Affairs and Development</p>
                        <p className="text-slate-700 text-sm">University of the Philippines Los Baños</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="size-5 text-emerald-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-slate-700">College, Los Baños</p>
                        <p className="text-slate-700">Laguna 4031, Philippines</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="size-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-slate-700">+63 (49) 536-2357</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="size-5 text-teal-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-slate-700">cpad@up.edu.ph</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="font-bold text-lg text-slate-900 mb-2">For Inquiries</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Whether you're a researcher, policymaker, student, or community member interested in small lake conservation, we welcome your questions and collaboration opportunities. Please use the contact form to reach out to us.
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="Brief subject of your inquiry"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-sky-600 to-emerald-600 text-white rounded-lg hover:from-sky-700 hover:to-emerald-700 transition-all font-medium shadow-lg shadow-sky-200"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

    </div>
  );
}
