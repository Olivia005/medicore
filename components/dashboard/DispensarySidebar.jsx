import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Activity, ShoppingBag, FileText, CreditCard, User, PackageCheck } from 'lucide-react'

const dispensaryNavItems = [
  { label: 'Dashboard', href: '/dashboard/dispensary', icon: Activity },
  { label: 'Orders', href: '/dashboard/dispensary/orders', icon: ShoppingBag },
  { label: 'Buy/Order Medicine', href: '/dashboard/dispensary/buy', icon: ShoppingBag },
  { label: 'Inventory', href: '/dashboard/dispensary/inventory', icon: PackageCheck },
  { label: 'Billing', href: '/dashboard/dispensary/billing', icon: CreditCard },
  { label: 'Reports', href: '/dashboard/dispensary/reports', icon: FileText },
  { label: 'Profile', href: '/dashboard/dispensary/profile', icon: User }
]

export default function DispensarySidebar () {
  const pathname = usePathname()
  return (
    <aside className='w-64 min-h-screen bg-white border-r border-blue-100 py-8 px-4 hidden md:flex md:flex-col'>
      <h2 className='text-xl font-bold text-blue-700 mb-8'>Dispensary Panel</h2>
      <nav className='flex-1'>
        <ul className='space-y-2'>
          {dispensaryNavItems.map(item => {
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
                  <Icon className={`h-4 w-4 mr-2 ${active ? 'text-white' : 'text-blue-600'}`} />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className='mt-auto pt-6 text-xs text-gray-400'>© 2025 MediLab</div>
    </aside>
  )
}
