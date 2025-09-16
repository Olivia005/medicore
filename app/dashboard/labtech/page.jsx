'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Activity,
  Stethoscope,
  TestTube,
  Clock,
  CheckCircle,
  AlertCircle,
  Users
} from 'lucide-react'
import Link from 'next/link'
import LabTechSideBar from '@/components/dashboard/LabTechSideBar'

export default function LabTechDashboard () {
  return (
    <div className='min-h-screen flex bg-gradient-to-br from-blue-50 to-white'>
      {/* Sidebar */}
      <LabTechSideBar />
      {/* Main Content */}
      <main className='flex-1'>
        {/* Top Bar */}
        <div className='bg-white shadow-sm border-b border-blue-100 px-8 py-4 flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Activity className='h-8 w-8 text-blue-600' />
            <h1 className='text-2xl font-bold text-gray-900'>
              MediLab & Drug Store
            </h1>
            <span className='bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium ml-4'>
              Lab Technician
            </span>
          </div>
          <div className='flex items-center space-x-4'>
            <Button
              variant='outline'
              className='border-blue-200 text-blue-600 hover:bg-blue-50'
            >
              <TestTube className='w-4 h-4 mr-2' />
              New Test
            </Button>
            <Link href='/login'>
              <Button
                variant='outline'
                className='border-red-200 text-red-600 hover:bg-red-50'
              >
                Logout
              </Button>
            </Link>
          </div>
        </div>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          {/* Welcome Section */}
          <div className='mb-8'>
            <div className='flex flex-col md:flex-row md:items-center gap-2 bg-gradient-to-r from-blue-500 via-blue-300 to-blue-100 rounded-xl p-6 shadow-sm'>
              <Stethoscope className='h-10 w-10 text-blue-100' />
              <div>
                <h1 className='text-2xl font-bold text-white mb-1'>
                  Welcome Back, Priyasha Das
                </h1>
                <p className='text-sm text-blue-100'>
                  We're glad to see you again! How can we assist you today?
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
            <Card className='border-blue-100 hover:shadow-lg transition-shadow'>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-600'>
                      Pending Tests
                    </p>
                    <p className='text-2xl font-bold text-orange-600'>24</p>
                  </div>
                  <Clock className='h-8 w-8 text-orange-600' />
                </div>
              </CardContent>
            </Card>

            <Card className='border-blue-100 hover:shadow-lg transition-shadow'>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-600'>
                      In Progress
                    </p>
                    <p className='text-2xl font-bold text-blue-600'>12</p>
                  </div>
                  <TestTube className='h-8 w-8 text-blue-600' />
                </div>
              </CardContent>
            </Card>

            <Card className='border-blue-100 hover:shadow-lg transition-shadow'>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-600'>
                      Completed Today
                    </p>
                    <p className='text-2xl font-bold text-green-600'>38</p>
                  </div>
                  <CheckCircle className='h-8 w-8 text-green-600' />
                </div>
              </CardContent>
            </Card>

            <Card className='border-blue-100 hover:shadow-lg transition-shadow'>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-600'>
                      Urgent Tests
                    </p>
                    <p className='text-2xl font-bold text-red-600'>3</p>
                  </div>
                  <AlertCircle className='h-8 w-8 text-red-600' />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Test Queue */}
            <div className='lg:col-span-2'>
              <Card className='border-blue-100'>
                <CardHeader>
                  <CardTitle className='flex items-center space-x-2'>
                    <TestTube className='h-5 w-5 text-blue-600' />
                    <span>Test Queue</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg'>
                      <div className='flex items-center space-x-3'>
                        <AlertCircle className='h-5 w-5 text-red-600' />
                        <div>
                          <p className='font-medium text-gray-900'>
                            Blood Culture - Patient ID: 1001
                          </p>
                          <p className='text-sm text-red-600'>
                            URGENT - Due in 2 hours
                          </p>
                        </div>
                      </div>
                      <Button size='sm' className='bg-red-600 hover:bg-red-700'>
                        Start Test
                      </Button>
                    </div>

                    <div className='flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg'>
                      <div className='flex items-center space-x-3'>
                        <Clock className='h-5 w-5 text-orange-600' />
                        <div>
                          <p className='font-medium text-gray-900'>
                            Complete Blood Count - Patient ID: 1002
                          </p>
                          <p className='text-sm text-gray-600'>
                            Scheduled for 2:00 PM
                          </p>
                        </div>
                      </div>
                      <Button
                        size='sm'
                        variant='outline'
                        className='border-orange-200 text-orange-600 hover:bg-orange-50'
                      >
                        Start Test
                      </Button>
                    </div>

                    <div className='flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg'>
                      <div className='flex items-center space-x-3'>
                        <TestTube className='h-5 w-5 text-blue-600' />
                        <div>
                          <p className='font-medium text-gray-900'>
                            Urine Analysis - Patient ID: 1003
                          </p>
                          <p className='text-sm text-gray-600'>
                            In Progress - 45% complete
                          </p>
                        </div>
                      </div>
                      <Button
                        size='sm'
                        variant='outline'
                        className='border-blue-200 text-blue-600 hover:bg-blue-50'
                      >
                        Continue
                      </Button>
                    </div>

                    <div className='flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg'>
                      <div className='flex items-center space-x-3'>
                        <CheckCircle className='h-5 w-5 text-green-600' />
                        <div>
                          <p className='font-medium text-gray-900'>
                            Lipid Panel - Patient ID: 1004
                          </p>
                          <p className='text-sm text-gray-600'>
                            Ready for review
                          </p>
                        </div>
                      </div>
                      <Button
                        size='sm'
                        variant='outline'
                        className='border-green-200 text-green-600 hover:bg-green-50'
                      >
                        Review
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Equipment */}
            <div className='space-y-6'>
              <Card className='border-blue-100'>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <Button className='w-full bg-blue-600 hover:bg-blue-700'>
                    <TestTube className='w-4 h-4 mr-2' />
                    Start New Test
                  </Button>
                  <Button
                    variant='outline'
                    className='w-full border-blue-200 text-blue-600 hover:bg-blue-50'
                  >
                    <Users className='w-4 h-4 mr-2' />
                    Patient List
                  </Button>
                  <Button
                    variant='outline'
                    className='w-full border-blue-200 text-blue-600 hover:bg-blue-50'
                  >
                    <CheckCircle className='w-4 h-4 mr-2' />
                    Quality Control
                  </Button>
                </CardContent>
              </Card>

              <Card className='border-blue-100'>
                <CardHeader>
                  <CardTitle>Equipment Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    <div className='flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg'>
                      <div>
                        <p className='font-medium text-gray-900'>Analyzer A1</p>
                        <p className='text-sm text-green-600'>Online - Ready</p>
                      </div>
                      <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                    </div>
                    <div className='flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg'>
                      <div>
                        <p className='font-medium text-gray-900'>
                          Centrifuge B2
                        </p>
                        <p className='text-sm text-green-600'>Online - Ready</p>
                      </div>
                      <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                    </div>
                    <div className='flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg'>
                      <div>
                        <p className='font-medium text-gray-900'>
                          Microscope C3
                        </p>
                        <p className='text-sm text-yellow-600'>
                          Maintenance Due
                        </p>
                      </div>
                      <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
