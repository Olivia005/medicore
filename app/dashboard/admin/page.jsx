'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Activity, Settings } from 'lucide-react'
import Link from 'next/link'
import Sidebar from '@/components/dashboard/Sidebar'


import DashboardDetails from '@/components/adminComponents/dashboardDetails'
import LabTests from '@/components/adminComponents/LabTests'
import PatientHistory from '@/components/adminComponents/PatientHistory'
import DrugStock from '@/components/adminComponents/DrugStock'
import Billing from '@/components/adminComponents/Billing'
import Administration from '@/components/adminComponents/Administration'

export default function AdminDashboard () {
  const [activeView, setActiveView] = useState('dashboard')

  // Render content based on active view
  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardDetails />
      case 'tests':
        return <LabTests />
      case 'patient-history':
        return <PatientHistory />
      case 'drug-stock':
        return <DrugStock />
      case 'billing':
        return <Billing />
      case 'administration':
        return <Administration />
      default:
        return <DashboardDetails />
    }
  }

  return (
    <div className='min-h-screen flex bg-gradient-to-br from-blue-50 to-white'>
      {/* Fixed Sidebar */}
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      {/* Main Content Area */}
      <main className='flex-1 flex flex-col'>
        {/* Top Bar */}
        <div className='bg-white shadow-md border-b border-blue-100 px-8 py-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <span className='text-2xl font-bold text-black flex items-center gap-2'>
              <Activity className='h-8 w-8 text-blue-600' />
              MediLab & Drug Store
            </span>
            <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold ml-2'>
              Admin
            </span>
          </div>
          <div className='flex items-center gap-3'>
            <Button
              variant='outline'
              className='border-blue-200 text-blue-600 hover:bg-blue-50 flex items-center gap-2'
            >
              <Settings className='w-4 h-4' />
              Settings
            </Button>
            <Link href='/login'>
              <Button
                variant='outline'
                className='border-red-200 text-red-600 hover:bg-red-50 flex items-center gap-2'
              >
                Logout
              </Button>
            </Link>
          </div>
        </div>

        {/* Dynamic Content Rendering */}
        <div className='flex-1 overflow-y-auto'>
          {renderContent()}
        </div>
      </main>
    </div>
  )
}
