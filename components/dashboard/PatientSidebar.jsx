import { Activity, FileText, Pill, CreditCard, User, ShoppingBag } from 'lucide-react'

const patientNavItems = [
  { label: 'Dashboard', view: 'dashboard', icon: Activity },
  { label: 'Test Results', view: 'tests', icon: FileText },
  { label: 'Prescriptions', view: 'prescriptions', icon: Pill },
  { label: 'Billing', view: 'billing', icon: CreditCard },
  { label: 'Dispensary Store', view: 'dispensary', icon: ShoppingBag },
  { label: 'Profile', view: 'profile', icon: User }
]

export default function PatientSidebar ({ activeView, setActiveView }) {
  return (
    <aside className='w-64 min-h-screen bg-white border-r border-blue-100 py-8 px-4 hidden md:flex md:flex-col'>
      <h2 className='text-xl font-bold text-blue-700 mb-8'>Patient Portal</h2>
      <nav className='flex-1'>
        <ul className='space-y-2'>
          {patientNavItems.map(item => {
            const active = activeView === item.view
            const Icon = item.icon
            return (
              <li key={item.view}>
                <button
                  onClick={() => setActiveView(item.view)}
                  className={`w-full flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
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
