"use client";

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Users, FileText, Calendar, Download, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import PatientSidebar from '@/components/dashboard/PatientSidebar';
import Tests from '@/components/patientComponents/Tests';
import Prescriptions from '@/components/patientComponents/Prescriptions';
import BillingPage from '@/components/patientComponents/BillingPage';
import DispensaryStore from '@/components/patientComponents/DispensaryStore';

import ProfilePage from '@/components/patientComponents/ProfilePage';

export default function PatientDashboard () {
  const [activeView, setActiveView] = useState('dashboard')

  // Render content based on active view
  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardContent />
      case 'tests':
        return <Tests />
      case 'prescriptions':
        return <Prescriptions />
      case 'billing':
        return <BillingPage />
      case 'dispensary':
        return <DispensaryStore />
      case 'profile':
        return <ProfilePage />
      default:
        return <DashboardContent />
    }
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-white">
      {/* Fixed Sidebar */}
      <PatientSidebar activeView={activeView} setActiveView={setActiveView} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">{renderContent()}</main>
    </div>
  )
}

// Dashboard Content Component
function DashboardContent() {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-white border-b border-blue-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">MediLab & Drug Store</h1>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium ml-4">
            Patient Portal
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
            <Calendar className="w-4 h-4 mr-2" />
            Book Appointment
          </Button>
          <Link href="/login">
            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
              Logout
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-10 w-10 text-blue-600" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Welcome back, John!</h2>
              <p className="text-gray-600">Access your medical records and test results</p>
            </div>
          </div>
        </div>

  {/* Quick Stats */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Tests</p>
                  <p className="text-2xl font-bold text-orange-600">2</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed Tests</p>
                  <p className="text-2xl font-bold text-green-600">15</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Prescriptions</p>
                  <p className="text-2xl font-bold text-blue-600">3</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Medicine Purchases</p>
                  <p className="text-2xl font-bold text-purple-600">27</p>
                </div>
                <Activity className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Test Results */}
          <div className="lg:col-span-2">
            <Card className="border border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span>Recent Test Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Blood Test - Complete</p>
                        <p className="text-sm text-gray-600">January 15, 2025</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">X-Ray - Chest</p>
                        <p className="text-sm text-gray-600">January 10, 2025</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="font-medium text-gray-900">Urine Analysis - Pending</p>
                        <p className="text-sm text-gray-600">January 12, 2025</p>
                      </div>
                    </div>
                    <span className="text-sm text-orange-600 font-medium">Processing</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Info */}
          <div className="space-y-6">
            <Card className="border border-blue-200">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule New Test
                </Button>
                <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                  <FileText className="w-4 h-4 mr-2" />
                  View All Records
                </Button>
                <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                  <Download className="w-4 h-4 mr-2" />
                  Download Reports
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-blue-200">
              <CardHeader>
                <CardTitle>Current Prescriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="font-medium text-gray-900">Amoxicillin 500mg</p>
                    <p className="text-sm text-gray-600">Take twice daily - 5 days left</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="font-medium text-gray-900">Vitamin D3</p>
                    <p className="text-sm text-gray-600">Once daily - Refill available</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}