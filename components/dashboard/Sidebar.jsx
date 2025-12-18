'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FlaskConical, FileText, Package, CreditCard, Settings } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard, view: 'dashboard' },
  { label: 'Tests', href: '/dashboard/admin/laboratoryTests', icon: FlaskConical, view: 'tests' },
  { label: 'Patient History', href: '/dashboard/admin/patient-history', icon: FileText, view: 'patient-history' },
  { label: 'Drug Stock', href: '/dashboard/admin/drug-stock', icon: Package, view: 'drug-stock' },
  { label: 'Billing', href: '/dashboard/admin/billing', icon: CreditCard, view: 'billing' },
  { label: 'Administration', href: '/dashboard/admin/administration', icon: Settings, view: 'administration' }
]

export default function Sidebar ({ activeView, setActiveView }) {
  const pathname = usePathname()

  return (
    <aside className='w-64 bg-white border-r border-blue-100 min-h-screen py-8 px-4 hidden md:flex md:flex-col'>
      <div className='mb-8'>
        <h2 className='text-xl font-bold text-blue-700'>
          Admin Panel
        </h2>
        <p className='text-xs text-gray-500 mt-1'>
          MediCore System
        </p>
      </div>
      <nav className='space-y-1 flex-1'>
        {navItems.map(item => {
          const active = activeView === item.view
          const Icon = item.icon
          return (
            <button
              key={item.view}
              onClick={() => setActiveView(item.view)}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition
                ${active
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-blue-50'}
              `}
            >
              <Icon className={`h-5 w-5 mr-3 ${active ? 'text-white' : 'text-blue-600'}`} />
              {item.label}
            </button>
          )
        })}
      </nav>
      <div className='mt-auto pt-6 text-xs text-gray-400 text-center'>
        © 2025 MediCore
      </div>
    </aside>
  )
}
