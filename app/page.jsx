'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Shield, Users, Pill } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse translate-y-1/2 -translate-x-1/3"></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-xl border-b-2 border-gray-200/50 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl ring-2 ring-blue-200/50 group-hover:ring-blue-300 transition-all duration-300">
                  <Activity className="h-7 w-7 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
                MediLab & Drug Store
              </h1>
            </div>
            <div className="flex space-x-4">
              <Link href="/login">
                <Button variant="outline" className="border-2 border-gray-300 text-blue-700 hover:bg-blue-50/50 hover:border-blue-400 transition-all duration-300 font-semibold rounded-xl px-6">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white ring-2 ring-blue-200/50 hover:ring-blue-300/50 transition-all duration-300 font-semibold rounded-xl px-6">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom duration-1000">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-2 border-blue-200 shadow-sm">
              ✨ Complete Healthcare Platform
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Complete Healthcare &<br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Pharmacy Management
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Streamline your medical laboratory operations and pharmacy management with our comprehensive platform designed for healthcare professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white ring-2 ring-blue-200/60 hover:ring-indigo-300/80 hover:scale-105 transition-all duration-300 px-10 py-6 text-lg rounded-xl font-bold">
                Get Started Today
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-2 border-gray-300 text-blue-700 hover:bg-blue-50/50 hover:border-blue-400 hover:scale-105 transition-all duration-300 px-10 py-6 text-lg rounded-xl font-bold">
                Access Your Account
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <Card className="group hover:border-blue-300 transition-all duration-500 border-2 border-gray-200 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden hover:-translate-y-2 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="p-8 text-center relative z-10">
              <div className="mb-6 inline-block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl ring-2 ring-blue-200/50 group-hover:ring-blue-300/50 group-hover:scale-110 transition-all duration-500">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">Admin Control</h3>
              <p className="text-gray-600 leading-relaxed">Complete system management and oversight</p>
            </CardContent>
          </Card>

          <Card className="group hover:border-purple-300 transition-all duration-500 border-2 border-gray-200 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden hover:-translate-y-2 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="p-8 text-center relative z-10">
              <div className="mb-6 inline-block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl ring-2 ring-purple-200/50 group-hover:ring-purple-300/50 group-hover:scale-110 transition-all duration-500">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">Patient Portal</h3>
              <p className="text-gray-600 leading-relaxed">Easy access to test results and prescriptions</p>
            </CardContent>
          </Card>

          <Card className="group hover:border-emerald-300 transition-all duration-500 border-2 border-gray-200 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden hover:-translate-y-2 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="p-8 text-center relative z-10">
              <div className="mb-6 inline-block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-emerald-500 to-teal-500 p-4 rounded-2xl ring-2 ring-emerald-200/50 group-hover:ring-emerald-300/50 group-hover:scale-110 transition-all duration-500">
                    <Activity className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">Lab Tech</h3>
              <p className="text-gray-600 leading-relaxed">Efficient test processing and reporting</p>
            </CardContent>
          </Card>

          <Card className="group hover:border-orange-300 transition-all duration-500 border-2 border-gray-200 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden hover:-translate-y-2 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="p-8 text-center relative z-10">
              <div className="mb-6 inline-block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-orange-500 to-red-500 p-4 rounded-2xl ring-2 ring-orange-200/50 group-hover:ring-orange-300/50 group-hover:scale-110 transition-all duration-500">
                    <Pill className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-700 transition-colors">Dispensary</h3>
              <p className="text-gray-600 leading-relaxed">Pharmacy management and drug dispensing</p>
            </CardContent>
          </Card>
        </div>

        {/* About Section */}
        <section className="mb-24 max-w-5xl mx-auto text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 border-2 border-gray-200 ring-4 ring-gray-100/50">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Why MediLab & Drug Store?
            </h3>
            <p className="text-md text-gray-500 leading-relaxed font-medium">
              We unify laboratory diagnostics, patient engagement, and pharmacy operations into a single, secure cloud platform.
              Reduce manual paperwork, improve turnaround time, and deliver a modern digital experience to patients and clinicians alike.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { label: 'Labs Digitized', value: '120+', color: 'text-blue-600', border: 'border-blue-200' },
            { label: 'Monthly Tests Processed', value: '85K+', color: 'text-purple-600', border: 'border-purple-200' },
            { label: 'Avg TAT Improvement', value: '32%', color: 'text-emerald-600', border: 'border-emerald-200' },
            { label: 'Uptime Reliability', value: '99.9%', color: 'text-orange-600', border: 'border-orange-200' },
          ].map(stat => (
            <div key={stat.label} className={`bg-white rounded-2xl border-2 ${stat.border} p-8 text-center transition-all duration-300 hover:-translate-y-1`}>
              <p className={`text-3xl font-bold ${stat.color} mb-3`}>
                {stat.value}
              </p>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Role Details Section */}
        <section className="mb-24 max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-gray-900 text-center mb-12">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Purpose-Built Workspaces
            </span>
          </h3>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Administrators',
                points: ['Role-based access', 'Audit trails', 'Operational dashboards'],
                icon: <Shield className="h-8 w-8 text-white" />,
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                title: 'Patients',
                points: ['Secure portal', 'Digital prescriptions', 'Result notifications'],
                icon: <Users className="h-8 w-8 text-white" />,
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                title: 'Lab Technicians',
                points: ['Specimen tracking', 'Automated result entry', 'QC workflows'],
                icon: <Activity className="h-8 w-8 text-white" />,
                gradient: 'from-emerald-500 to-teal-500',
              },
              {
                title: 'Dispensary',
                points: ['Inventory control', 'Expiry alerts', 'Integrated billing'],
                icon: <Pill className="h-8 w-8 text-white" />,
                gradient: 'from-orange-500 to-red-500',
              },
            ].map(role => (
              <Card key={role.title} className="group border-2 border-gray-200 bg-white/90 backdrop-blur-sm hover:border-gray-300 transition-all duration-500 rounded-2xl overflow-hidden hover:-translate-y-2 relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} rounded-xl blur-md opacity-30 group-hover:opacity-50 transition-opacity`}></div>
                      <div className={`relative bg-gradient-to-br ${role.gradient} p-3 rounded-xl ring-2 ring-gray-200 group-hover:ring-gray-300 group-hover:scale-110 transition-all duration-500`}>
                        {role.icon}
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">{role.title}</h4>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-700">
                    {role.points.map(p => (
                      <li key={p} className="flex items-start font-medium">
                        <span className={`bg-gradient-to-r ${role.gradient} bg-clip-text text-transparent mr-2 font-bold text-lg`}>•</span>
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
        <section className="mb-24 max-w-6xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl border-2 border-gray-200 ring-4 ring-gray-100/50 overflow-hidden">
            <div className="grid gap-10 md:grid-cols-2 items-center p-10 md:p-12">
              <div>
                <h3 className="text-4xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Security & Compliance First
                  </span>
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed font-medium text-lg">
                  Built with healthcare-grade security principles: encrypted data at rest and in transit, granular access controls, immutable audit logs, and automated backups.
                  Our architecture supports regional data residency and industry best practices.
                </p>
                <ul className="space-y-3 text-sm text-gray-800">
                  {['End-to-end encryption', 'Multi-factor authentication (MFA)', 'Role-based access policies', 'Tamper-evident audit trails', 'Automated daily backups'].map(item => (
                    <li key={item} className="flex items-start group">
                      <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 font-bold group-hover:scale-110 transition-transform duration-300 ring-2 ring-emerald-200/50">✓</span>
                      <span className="font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 ring-2 ring-blue-100/50">
                <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Shield className="h-6 w-6 text-blue-600" />
                  Infrastructure Highlights
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {[
                    { label: 'Scalable Cloud', value: 'Auto-scaling clusters', gradient: 'from-blue-500 to-indigo-600', ring: 'ring-blue-200' },
                    { label: 'Monitoring', value: '24/7 health checks', gradient: 'from-purple-500 to-pink-500', ring: 'ring-purple-200' },
                    { label: 'Redundancy', value: 'Multi-zone failover', gradient: 'from-emerald-500 to-teal-500', ring: 'ring-emerald-200' },
                    { label: 'Updates', value: 'Zero-downtime deploys', gradient: 'from-orange-500 to-red-500', ring: 'ring-orange-200' },
                  ].map(i => (
                    <div key={i.label} className={`bg-white rounded-xl p-4 border-2 border-gray-200 ${i.ring} ring-2 ring-opacity-50 hover:border-gray-300 transition-all duration-300`}>
                      <p className={`text-xs font-bold uppercase tracking-wide bg-gradient-to-r ${i.gradient} bg-clip-text text-transparent mb-1`}>{i.label}</p>
                      <p className="text-gray-900 font-bold text-sm">{i.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-24">
          <h3 className="text-4xl font-extrabold text-center mb-12">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Trusted by Healthcare Teams
            </span>
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
              <div key={t.name} className="group bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-2xl p-8 ring-4 ring-gray-100/50 hover:ring-blue-100/50 hover:border-blue-300 flex flex-col transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6"></div>
                <p className="text-gray-700 italic mb-6 text-lg leading-relaxed font-medium relative z-10">"{t.quote}"</p>
                <div className="mt-auto relative z-10">
                  <p className="font-bold text-gray-900 text-lg">{t.name}</p>
                  <p className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-28 max-w-5xl mx-auto">
          <h3 className="text-4xl font-extrabold text-center mb-12">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h3>
          <div className="space-y-5">
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
              <div key={item.q} className="group bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-2xl p-7 ring-4 ring-gray-100/50 hover:ring-blue-100/50 hover:border-blue-300 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h4 className="font-semibold text-black mb-3 text-lg relative z-10 group-hover:text-blue-700 transition-colors">{item.q}</h4>
                <p className="text-gray-500 text-sm leading-relaxed font-medium relative z-10">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 md:p-16 text-center text-white border-2 border-blue-500 ring-4 ring-blue-200/30 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-4xl md:text-5xl font-extrabold mb-6">Ready to Transform Your Healthcare Operations?</h3>
            <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
              Join thousands of healthcare professionals who trust our platform for their daily operations.
            </p>
            <Link href="/register">
              <Button size="lg" variant="secondary" className="bg-white text-blue-700 hover:bg-gray-100 hover:scale-105 transition-all duration-300 px-12 py-6 text-lg rounded-xl font-bold ring-4 ring-white/30">
                Start Your Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/95 backdrop-blur-xl border-t-2 border-gray-200 mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg ring-2 ring-blue-200/50">
                <Activity className="h-5 w-5 text-white" />
              </div>
            </div>
            <span className="text-gray-700 font-semibold">© 2025 MediLab & Drug Store. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}