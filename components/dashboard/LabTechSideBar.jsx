import Link from 'next/link'
import { usePathname } from 'next/navigation'

const labtechNavItems = [
  { label: 'Dashboard', href: '/dashboard/labtech' },
  { label: 'Laboratory Tests', href: '/dashboard/labtech/laboratory' },
  { label: 'Radiology Tests', href: '/dashboard/labtech/radiology' },
  { label: 'Pathology Tests', href: '/dashboard/labtech/pathology' },
  { label: 'Billing', href: '/dashboard/labtech/billing' }
]

export default function LabTechSidebar () {
  const pathname = usePathname()
  return (
    <aside className='w-64 min-h-screen bg-white border-r border-blue-100 flex flex-col py-8 px-4'>
      <h2 className='text-xl font-bold text-gray-900 mb-8'>
    LabTech Panel of MediCore
      </h2>
      <nav className='flex-1'>
        <ul className='space-y-2'>
          {labtechNavItems.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
