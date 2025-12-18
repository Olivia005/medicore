import { Activity, ShoppingBag, FileText, CreditCard, User, PackageCheck } from 'lucide-react'

const dispensaryNavItems = [
  { label: 'Dashboard', view: 'dashboard', icon: Activity },
  { label: 'Orders', view: 'orders', icon: ShoppingBag },
  { label: 'Buy/Order Medicine', view: 'buy-order', icon: ShoppingBag },
  { label: 'Inventory', view: 'inventory', icon: PackageCheck },
  { label: 'Billing', view: 'billing', icon: CreditCard },
  { label: 'Reports', view: 'reports', icon: FileText },
  { label: 'Profile', view: 'profile', icon: User }
]

export default function DispensarySidebar ({ activeView, setActiveView }) {
  return (
    <aside className='w-64 min-h-screen bg-white border-r border-blue-100 py-8 px-4 flex flex-col'>
      <h2 className='text-xl font-bold text-blue-700 mb-8'>Dispensary Panel</h2>
      <nav className='flex-1'>
        <ul className='space-y-2'>
          {dispensaryNavItems.map(item => {
            const active = activeView === item.view
            const Icon = item.icon
            return (
              <li key={item.view}>
                <button
                  onClick={() => setActiveView(item.view)}
                  className={`flex items-center w-full px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                    active ? 'bg-blue-600 text-white shadow' : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  <Icon className={`h-4 w-4 mr-2 ${active ? 'text-white' : 'text-blue-600'}`} />
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className='mt-auto pt-6 text-xs text-gray-400'>© 2025 MediLab</div>
    </aside>
  )
}
