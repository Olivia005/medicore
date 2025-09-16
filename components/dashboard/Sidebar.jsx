
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FlaskConical, FileText, Package, CreditCard, Settings } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
  { label: 'Tests', href: '/dashboard/admin/laboratory', icon: FlaskConical },
  { label: 'Patient History', href: '/dashboard/admin/patient-history', icon: FileText },
  { label: 'Drug Stock', href: '/dashboard/admin/drug-stock', icon: Package },
  { label: 'Billing', href: '/dashboard/admin/billing', icon: CreditCard },
  { label: 'Administration', href: '/dashboard/admin/administration', icon: Settings }
]

export default function Sidebar () {
  const pathname = usePathname()
  return (
    <aside className='w-64 min-h-screen bg-white border-r border-blue-100 flex flex-col py-8 px-4'>
      <h2 className='text-xl font-bold text-blue-700 mb-8 '>
        Administration Panel
      </h2>
      <nav className='flex-1'>
        <ul className='space-y-2'>
          {navItems.map(item => {
            const active = pathname === item.href
            const Icon = item.icon
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                    active ? 'bg-blue-600 text-white shadow' : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  {Icon && <Icon className={`h-4 w-4 mr-2 ${active ? 'text-white' : 'text-blue-600'}`} />}
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
