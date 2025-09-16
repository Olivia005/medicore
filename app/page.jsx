'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Shield, Users, Pill } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">MediLab & Drug Store</h1>
            </div>
            <div className="flex space-x-4">
              <Link href="/login">
                <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 mt-18">
            Complete Healthcare & Pharmacy Management
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Streamline your medical laboratory operations and pharmacy management with our comprehensive platform designed for healthcare professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
                Get Started Today
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg">
                Access Your Account
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="hover:shadow-lg transition-shadow duration-300 border-blue-100">
            <CardContent className="p-6 text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Admin Control</h3>
              <p className="text-gray-600">Complete system management and oversight</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-blue-100">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Patient Portal</h3>
              <p className="text-gray-600">Easy access to test results and prescriptions</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-blue-100">
            <CardContent className="p-6 text-center">
              <Activity className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lab Tech</h3>
              <p className="text-gray-600">Efficient test processing and reporting</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-blue-100">
            <CardContent className="p-6 text-center">
              <Pill className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Dispensary</h3>
              <p className="text-gray-600">Pharmacy management and drug dispensing</p>
            </CardContent>
          </Card>
        </div>

        {/* About Section */}
        <section className="mb-20 max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Why MediLab & Drug Store?</h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            We unify laboratory diagnostics, patient engagement, and pharmacy operations into a single, secure cloud platform.
            Reduce manual paperwork, improve turnaround time, and deliver a modern digital experience to patients and clinicians alike.
          </p>
        </section>

        {/* Stats Section */}
        <section className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { label: 'Labs Digitized', value: '120+' },
            { label: 'Monthly Tests Processed', value: '85K+' },
            { label: 'Avg TAT Improvement', value: '32%' },
            { label: 'Uptime Reliability', value: '99.9%' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm text-center">
              <p className="text-3xl font-extrabold text-blue-700 mb-1">{stat.value}</p>
              <p className="text-sm font-medium tracking-wide text-gray-600 uppercase">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Role Details Section */}
        <section className="mb-20 max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-10">Purpose-Built Workspaces</h3>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Administrators',
                points: ['Role-based access', 'Audit trails', 'Operational dashboards'],
                icon: <Shield className="h-8 w-8 text-blue-600" />,
              },
              {
                title: 'Patients',
                points: ['Secure portal', 'Digital prescriptions', 'Result notifications'],
                icon: <Users className="h-8 w-8 text-blue-600" />,
              },
              {
                title: 'Lab Technicians',
                points: ['Specimen tracking', 'Automated result entry', 'QC workflows'],
                icon: <Activity className="h-8 w-8 text-blue-600" />,
              },
              {
                title: 'Dispensary',
                points: ['Inventory control', 'Expiry alerts', 'Integrated billing'],
                icon: <Pill className="h-8 w-8 text-blue-600" />,
              },
            ].map(role => (
              <Card key={role.title} className="border-blue-100 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    {role.icon}
                    <h4 className="text-lg font-semibold text-gray-900">{role.title}</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {role.points.map(p => (
                      <li key={p} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Security & Compliance */}
        <section className="mb-20 max-w-6xl mx-auto grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Security & Compliance First</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Built with healthcare-grade security principles: encrypted data at rest and in transit, granular access controls, immutable audit logs, and automated backups.
              Our architecture supports regional data residency and industry best practices.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              {['End-to-end encryption', 'Multi-factor authentication (MFA)', 'Role-based access policies', 'Tamper-evident audit trails', 'Automated daily backups'].map(item => (
                <li key={item} className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-blue-100 rounded-xl p-8 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Infrastructure Highlights</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { label: 'Scalable Cloud', value: 'Auto-scaling clusters' },
                { label: 'Monitoring', value: '24/7 health checks' },
                { label: 'Redundancy', value: 'Multi-zone failover' },
                { label: 'Updates', value: 'Zero-downtime deploys' },
              ].map(i => (
                <div key={i.label} className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-blue-700">{i.label}</p>
                  <p className="text-gray-800 font-semibold">{i.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-10">Trusted by Healthcare Teams</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                quote: 'Turnaround time dropped dramatically and our team productivity surged.',
                name: 'Dr. Amina Yusuf',
                role: 'Chief Pathologist',
              },
              {
                quote: 'Inventory accuracy and expiry tracking alone saved us thousands monthly.',
                name: 'Samuel Lee',
                role: 'Pharmacy Director',
              },
              {
                quote: 'Patients love the portal—fewer calls and faster result access.',
                name: 'Grace Owusu',
                role: 'Operations Lead',
              },
            ].map(t => (
              <div key={t.name} className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm flex flex-col">
                <p className="text-gray-700 italic mb-4">“{t.quote}”</p>
                <div className="mt-auto">
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-24 max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-10">Frequently Asked Questions</h3>
          <div className="space-y-6">
            {[
              {
                q: 'How long does onboarding take?',
                a: 'Most teams go live within 5–10 business days including data import and staff training.'
              },
              {
                q: 'Can we integrate existing LIS or pharmacy systems?',
                a: 'Yes. We offer REST APIs and secure data exchange options for common LIS and ERP platforms.'
              },
              {
                q: 'Is patient data encrypted?',
                a: 'All sensitive data is encrypted in transit (TLS 1.2+) and at rest using industry-standard encryption.'
              },
              {
                q: 'Do you support multi-location operations?',
                a: 'Multi-site inventory, role controls, and consolidated reporting are built-in.'
              },
            ].map(item => (
              <div key={item.q} className="bg-white border border-blue-100 rounded-xl p-5 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">{item.q}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-blue-700 to-cyan-700 rounded-xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Healthcare Operations?</h3>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare professionals who trust our platform for their daily operations.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 text-lg">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-blue-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center space-x-2">
            <Activity className="h-6 w-6 text-blue-600" />
            <span className="text-gray-600">© 2025 MediLab & Drug Store. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}