'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Activity,
  Shield,
  Users,
  Settings,
  BarChart3,
  Database,
  UserPlus,
  AlertTriangle,
  LayoutDashboard,
  TestTube
} from 'lucide-react'

function handleAddNewUser() {
  alert('Add New User functionality coming soon!')
}

export default function DashboardDetails() {
  return (
    <>
      {/* Welcome Section */}
      <div className='bg-blue-50 px-8 py-8'>
        <div className='flex items-center gap-4 mb-4'>
          <Shield className='h-10 w-10 text-blue-600' />
          <div>
            <h2 className='text-3xl font-bold text-gray-900'>
              Welcome to the Admin Dashboard
            </h2>
            <p className='text-gray-600'>
              Monitor system health, manage users, and review analytics. Stay
              on top of your hospital's operations and performance!
            </p>
          </div>
        </div>
        <div className='bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 p-6 rounded-xl text-white shadow flex items-center justify-between'>
          <div>
            <h3 className='text-xl font-semibold mb-1'>Hello, Admin Team!</h3>
            <p className='text-sm text-blue-100'>
              You have <span className='font-bold'>89</span> pending tests and{' '}
              <span className='font-bold'>2,156</span> drugs in stock. Keep
              your system running at peak performance.
            </p>
          </div>
          <div className='hidden md:block'>
            <LayoutDashboard className='h-16 w-16 text-white opacity-30' />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 px-8 mt-8'>
        <Card className='bg-blue-50 border-blue-200'>
          <CardContent className='p-6'>
            <p className='text-sm font-medium text-gray-700 mb-1'>
              Total Patients
            </p>
            <p className='text-2xl font-bold text-gray-900'>1,278</p>
            <p className='text-green-700 text-xs mt-1'>+12% vs last week</p>
          </CardContent>
        </Card>
        <Card className='bg-blue-50 border-blue-200'>
          <CardContent className='p-6'>
            <p className='text-sm font-medium text-gray-700 mb-1'>
              Pending Tests
            </p>
            <p className='text-2xl font-bold text-gray-900'>89</p>
            <p className='text-green-700 text-xs mt-1'>+5% vs last week</p>
          </CardContent>
        </Card>
        <Card className='bg-blue-50 border-blue-200'>
          <CardContent className='p-6'>
            <p className='text-sm font-medium text-gray-700 mb-1'>
              Total Revenue
            </p>
            <p className='text-2xl font-bold text-gray-900'>45,320</p>
            <p className='text-green-700 text-xs mt-1'>+6% vs last week</p>
          </CardContent>
        </Card>
        <Card className='bg-blue-50 border-blue-200'>
          <CardContent className='p-6'>
            <p className='text-sm font-medium text-gray-700 mb-1'>
              Drug Stock
            </p>
            <p className='text-2xl font-bold text-gray-900'>2,156</p>
            <p className='text-green-700 text-xs mt-1'>+18% vs last week</p>
          </CardContent>
        </Card>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 px-8 mb-8'>
        <div className='lg:col-span-2'>
          <Card className='mb-8'>
            <CardHeader>
              <CardTitle className='text-lg font-bold flex items-center gap-2'>
                <Activity className='h-5 w-5 text-blue-500' />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='divide-y divide-blue-50'>
                <li className='py-3 flex items-start gap-3'>
                  <Users className='h-5 w-5 text-blue-500 mt-1' />
                  <div className='flex-1'>
                    <div className='flex justify-between items-center'>
                      <p className='font-medium text-gray-900'>
                        New Patient Registered
                      </p>
                      <span className='text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded'>
                        5 min ago
                      </span>
                    </div>
                    <p className='text-xs text-gray-500'>
                      by Registration Desk
                    </p>
                  </div>
                </li>
                <li className='py-3 flex items-start gap-3'>
                  <TestTube className='h-5 w-5 text-green-500 mt-1' />
                  <div className='flex-1'>
                    <div className='flex justify-between items-center'>
                      <p className='font-medium text-gray-900'>
                        Lab Test Completed
                      </p>
                      <Button
                        size='sm'
                        className='bg-green-200 text-green-900 hover:bg-green-300'
                      >
                        View Results
                      </Button>
                    </div>
                    <p className='text-xs text-gray-500'>
                      by Dr. Smith <span className='ml-2'>7 min ago</span>
                    </p>
                  </div>
                </li>
                <li className='py-3 flex items-start gap-3'>
                  <BarChart3 className='h-5 w-5 text-yellow-500 mt-1' />
                  <div className='flex-1'>
                    <div className='flex justify-between items-center'>
                      <p className='font-medium text-gray-900'>
                        Bill Generated
                      </p>
                      <Button
                        size='sm'
                        className='bg-yellow-200 text-yellow-900 hover:bg-yellow-300'
                      >
                        View Bill
                      </Button>
                    </div>
                    <p className='text-xs text-gray-500'>
                      by Billing Dept.{' '}
                      <span className='ml-2'>10 min ago</span>
                    </p>
                  </div>
                </li>
                <li className='py-3 flex items-start gap-3'>
                  <Database className='h-5 w-5 text-red-500 mt-1' />
                  <div className='flex-1'>
                    <div className='flex justify-between items-center'>
                      <p className='font-medium text-gray-900'>
                        Medicine Stock Low
                      </p>
                      <span className='text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded'>
                        Low
                      </span>
                    </div>
                    <p className='text-xs text-gray-500'>
                      by Dispensary <span className='ml-2'>30 min ago</span>
                    </p>
                  </div>
                </li>
                <li className='py-3 flex items-start gap-3'>
                  <UserPlus className='h-5 w-5 text-blue-400 mt-1' />
                  <div className='flex-1'>
                    <div className='flex justify-between items-center'>
                      <p className='font-medium text-gray-900'>
                        New Staff Account Created
                      </p>
                      <span className='text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded'>
                        Just now
                      </span>
                    </div>
                    <p className='text-xs text-gray-500'>by Admin</p>
                  </div>
                </li>
                <li className='py-3 flex items-start gap-3'>
                  <AlertTriangle className='h-5 w-5 text-orange-500 mt-1' />
                  <div className='flex-1'>
                    <div className='flex justify-between items-center'>
                      <p className='font-medium text-gray-900'>
                        System Maintenance Scheduled
                      </p>
                      <span className='text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded'>
                        Upcoming
                      </span>
                    </div>
                    <p className='text-xs text-gray-500'>
                      by IT Dept. <span className='ml-2'>1 hr ago</span>
                    </p>
                  </div>
                </li>
                <li className='py-3 flex items-start gap-3'>
                  <Shield className='h-5 w-5 text-purple-500 mt-1' />
                  <div className='flex-1'>
                    <div className='flex justify-between items-center'>
                      <p className='font-medium text-gray-900'>
                        Security Audit Passed
                      </p>
                      <span className='text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded'>
                        Passed
                      </span>
                    </div>
                    <p className='text-xs text-gray-500'>
                      by Security Team{' '}
                      <span className='ml-2'>2 days ago</span>
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className='flex flex-col gap-8'>
          <Card className='bg-white border-blue-100'>
            <CardHeader>
              <CardTitle className='text-lg font-bold flex items-center gap-2'>
                <Settings className='h-5 w-5 text-blue-500' />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col space-y-4'>
                <Button
                  className='w-full flex items-center gap-3 bg-blue-600 text-white hover:bg-blue-700'
                  onClick={handleAddNewUser}
                >
                  <UserPlus className='h-5 w-5' />
                  Add New User
                </Button>
                <Button className='w-full flex items-center gap-3 bg-blue-500 text-white hover:bg-blue-600'>
                  <Database className='h-5 w-5' />
                  Manage Labs
                </Button>
                <Button className='w-full flex items-center gap-3 bg-blue-400 text-white hover:bg-blue-500'>
                  <BarChart3 className='h-5 w-5' />
                  View Reports
                </Button>
                <Button
                  variant='outline'
                  className='w-full flex items-center gap-3 border-blue-200 bg-white text-blue-700 hover:bg-blue-50'
                >
                  <Settings className='h-5 w-5' />
                  System Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gradient-to-br from-green-50 to-blue-50 border-green-200'>
            <CardHeader className='pb-2'>
              <CardTitle className='flex items-center gap-2 text-green-800'>
                <BarChart3 className='h-5 w-5 text-green-600' />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex items-center gap-4'>
                <span className='text-3xl font-bold text-green-600'>
                  98.5%
                </span>
                <span className='text-xs text-gray-500'>
                  Uptime (last 30 days)
                </span>
              </div>
              <div className='mt-2 text-xs text-green-700'>
                All systems operational
              </div>
              <div className='mt-2 flex gap-2'>
                <span className='inline-block bg-green-200 text-green-800 px-2 py-0.5 rounded text-xs'>
                  No Incidents
                </span>
                <span className='inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs'>
                  Backups OK
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}