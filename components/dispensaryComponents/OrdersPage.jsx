'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search,
  Filter,
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  X,
  User,
  Calendar,
  CreditCard,
  FileText,
  Package,
  Pill,
  AlertCircle,
  CheckSquare
} from 'lucide-react'

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterOrderType, setFilterOrderType] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showDetailsPanel, setShowDetailsPanel] = useState(false)

  // Sample orders data
  const [orders, setOrders] = useState([
    {
      orderId: 'ORD-101',
      patientName: 'John Doe',
      orderType: 'Prescription',
      orderDate: '2025-01-15',
      orderTime: '10:30 AM',
      total: 850,
      paymentMethod: 'UPI',
      paymentStatus: 'Paid',
      status: 'pending',
      doctorName: 'Dr. Johnson',
      prescriptionId: 'PRX-2025-001',
      medicines: [
        { name: 'Amoxicillin 500mg', quantity: 15, price: 450, instructions: 'Take 3 times daily after meals' },
        { name: 'Paracetamol 650mg', quantity: 10, price: 150, instructions: 'Take as needed for fever' },
        { name: 'Vitamin D3', quantity: 30, price: 250, instructions: 'Take 1 tablet daily' }
      ],
      notes: 'Patient has penicillin allergy - verify alternative antibiotics'
    },
    {
      orderId: 'ORD-102',
      patientName: 'Sarah Williams',
      orderType: 'Walk-in',
      orderDate: '2025-01-15',
      orderTime: '11:00 AM',
      total: 320,
      paymentMethod: 'Cash',
      paymentStatus: 'Paid',
      status: 'completed',
      medicines: [
        { name: 'Cough Syrup', quantity: 1, price: 120, instructions: 'Take 2 teaspoons 3 times daily' },
        { name: 'Aspirin 75mg', quantity: 20, price: 200, instructions: 'Take 1 tablet daily' }
      ]
    },
    {
      orderId: 'ORD-103',
      patientName: 'Michael Brown',
      orderType: 'Prescription',
      orderDate: '2025-01-15',
      orderTime: '09:15 AM',
      total: 1250,
      paymentMethod: 'Card',
      paymentStatus: 'Paid',
      status: 'pending',
      doctorName: 'Dr. Smith',
      prescriptionId: 'PRX-2025-002',
      medicines: [
        { name: 'Insulin Pens', quantity: 5, price: 1000, instructions: 'Inject as directed by doctor' },
        { name: 'Blood Glucose Strips', quantity: 50, price: 250, instructions: 'Test blood sugar regularly' }
      ],
      notes: 'Urgent - Diabetic patient'
    },
    {
      orderId: 'ORD-104',
      patientName: 'Emily Davis',
      orderType: 'Walk-in',
      orderDate: '2025-01-15',
      orderTime: '02:30 PM',
      total: 450,
      paymentMethod: 'UPI',
      paymentStatus: 'Pending',
      status: 'pending',
      medicines: [
        { name: 'Multivitamin Tablets', quantity: 60, price: 350, instructions: 'Take 1 tablet daily' },
        { name: 'Omega-3 Capsules', quantity: 30, price: 100, instructions: 'Take 1 capsule daily' }
      ]
    },
    {
      orderId: 'ORD-105',
      patientName: 'Robert Johnson',
      orderType: 'Prescription',
      orderDate: '2025-01-14',
      orderTime: '04:00 PM',
      total: 680,
      paymentMethod: 'Cash',
      paymentStatus: 'Paid',
      status: 'completed',
      doctorName: 'Dr. Wilson',
      prescriptionId: 'PRX-2025-003',
      medicines: [
        { name: 'Blood Pressure Medicine', quantity: 30, price: 480, instructions: 'Take 1 tablet morning' },
        { name: 'Aspirin 75mg', quantity: 20, price: 200, instructions: 'Take 1 tablet daily' }
      ]
    },
    {
      orderId: 'ORD-106',
      patientName: 'Jennifer Martinez',
      orderType: 'Prescription',
      orderDate: '2025-01-14',
      orderTime: '11:30 AM',
      total: 920,
      paymentMethod: 'Card',
      paymentStatus: 'Paid',
      status: 'cancelled',
      doctorName: 'Dr. Brown',
      prescriptionId: 'PRX-2025-004',
      medicines: [
        { name: 'Antibiotic Course', quantity: 10, price: 600, instructions: 'Take as prescribed' },
        { name: 'Probiotic Capsules', quantity: 20, price: 320, instructions: 'Take with antibiotics' }
      ],
      cancelReason: 'Patient requested cancellation - changed medication'
    },
    {
      orderId: 'ORD-107',
      patientName: 'David Wilson',
      orderType: 'Walk-in',
      orderDate: '2025-01-15',
      orderTime: '03:45 PM',
      total: 280,
      paymentMethod: 'UPI',
      paymentStatus: 'Paid',
      status: 'completed',
      medicines: [
        { name: 'Pain Relief Gel', quantity: 1, price: 180, instructions: 'Apply to affected area' },
        { name: 'Bandage Roll', quantity: 2, price: 100, instructions: 'Use as needed' }
      ]
    },
    {
      orderId: 'ORD-108',
      patientName: 'Lisa Anderson',
      orderType: 'Prescription',
      orderDate: '2025-01-15',
      orderTime: '12:15 PM',
      total: 1500,
      paymentMethod: 'Insurance',
      paymentStatus: 'Processing',
      status: 'pending',
      doctorName: 'Dr. Taylor',
      prescriptionId: 'PRX-2025-005',
      medicines: [
        { name: 'Thyroid Medication', quantity: 90, price: 1200, instructions: 'Take 1 tablet morning empty stomach' },
        { name: 'Calcium Supplements', quantity: 60, price: 300, instructions: 'Take 1 tablet with dinner' }
      ],
      notes: 'Insurance claim pending'
    }
  ])

  const getStatusBadge = (status) => {
    const badges = {
      pending: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        border: 'border-yellow-300',
        icon: Clock
      },
      completed: {
        bg: 'bg-green-100',
        text: 'text-green-700',
        border: 'border-green-300',
        icon: CheckCircle
      },
      cancelled: {
        bg: 'bg-red-100',
        text: 'text-red-700',
        border: 'border-red-300',
        icon: XCircle
      }
    }

    const badge = badges[status]
    const Icon = badge.icon

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}>
        <Icon className='h-3.5 w-3.5' />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const getPaymentStatusBadge = (status) => {
    const badges = {
      Paid: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
      Pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' },
      Processing: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
      Failed: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' }
    }

    const badge = badges[status] || badges.Pending

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}>
        {status}
      </span>
    )
  }

  const getOrderTypeBadge = (type) => {
    const badges = {
      Prescription: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
      'Walk-in': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' }
    }

    const badge = badges[type]

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}>
        {type}
      </span>
    )
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.patientName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus
    const matchesOrderType = filterOrderType === 'all' || order.orderType === filterOrderType
    
    return matchesSearch && matchesStatus && matchesOrderType
  })

  const handleMarkCompleted = (orderId) => {
    setOrders(orders.map(order => 
      order.orderId === orderId ? { ...order, status: 'completed' } : order
    ))
    if (selectedOrder && selectedOrder.orderId === orderId) {
      setSelectedOrder({ ...selectedOrder, status: 'completed' })
    }
  }

  const handleMarkCancelled = (orderId) => {
    const reason = prompt('Enter cancellation reason:')
    if (reason) {
      setOrders(orders.map(order => 
        order.orderId === orderId ? { ...order, status: 'cancelled', cancelReason: reason } : order
      ))
      if (selectedOrder && selectedOrder.orderId === orderId) {
        setSelectedOrder({ ...selectedOrder, status: 'cancelled', cancelReason: reason })
      }
    }
  }

  const stats = {
    today: orders.filter(o => o.orderDate === '2025-01-15').length,
    pending: orders.filter(o => o.status === 'pending').length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-white p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-orange-100 rounded-xl'>
              <ShoppingCart className='h-8 w-8 text-orange-600' />
            </div>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>Orders Management</h1>
              <p className='text-gray-600'>Manage medicine orders for patients and walk-in customers</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
          <div className='bg-white border-2 border-orange-200 rounded-xl p-4 hover:border-orange-400 hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-lg'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-gray-600'>Today\'s Orders</p>
                <p className='text-2xl font-bold text-orange-600'>{stats.today}</p>
              </div>
              <Calendar className='h-8 w-8 text-orange-600' />
            </div>
          </div>

          <div className='bg-white border-2 border-yellow-200 rounded-xl p-4 hover:border-yellow-400 hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-lg'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-gray-600'>Pending Orders</p>
                <p className='text-2xl font-bold text-yellow-600'>{stats.pending}</p>
              </div>
              <Clock className='h-8 w-8 text-yellow-600' />
            </div>
          </div>

          <div className='bg-white border-2 border-green-200 rounded-xl p-4 hover:border-green-400 hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-lg'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-gray-600'>Completed Orders</p>
                <p className='text-2xl font-bold text-green-600'>{stats.completed}</p>
              </div>
              <CheckCircle className='h-8 w-8 text-green-600' />
            </div>
          </div>

          <div className='bg-white border-2 border-red-200 rounded-xl p-4 hover:border-red-400 hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-lg'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-gray-600'>Cancelled Orders</p>
                <p className='text-2xl font-bold text-red-600'>{stats.cancelled}</p>
              </div>
              <XCircle className='h-8 w-8 text-red-600' />
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className='bg-white border-2 border-gray-200 rounded-xl p-6 mb-6'>
          <div className='flex items-center gap-2 mb-4'>
            <Filter className='h-5 w-5 text-orange-600' />
            <h3 className='text-lg font-bold text-gray-900'>Filters & Search</h3>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {/* Search */}
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
              <Input
                placeholder='Search by Order ID or Patient Name...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 border-gray-300'
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className='px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium'
            >
              <option value='all'>All Status</option>
              <option value='pending'>Pending</option>
              <option value='completed'>Completed</option>
              <option value='cancelled'>Cancelled</option>
            </select>

            {/* Order Type Filter */}
            <select
              value={filterOrderType}
              onChange={(e) => setFilterOrderType(e.target.value)}
              className='px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium'
            >
              <option value='all'>All Order Types</option>
              <option value='Prescription'>Prescription</option>
              <option value='Walk-in'>Walk-in</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className='bg-white border-2 border-gray-200 rounded-xl overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='bg-orange-50 border-b-2 border-orange-200'>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Order ID</th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Patient Name</th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Order Type</th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Total</th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Payment</th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Status</th>
                  <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {filteredOrders.map((order) => (
                  <tr 
                    key={order.orderId} 
                    className={`hover:bg-orange-50 transition-colors ${
                      order.status === 'cancelled' ? 'bg-red-50' : ''
                    }`}
                  >
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center gap-2'>
                        <ShoppingCart className='h-4 w-4 text-orange-600' />
                        <span className='font-mono font-semibold text-orange-600'>{order.orderId}</span>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center gap-2'>
                        <User className='h-4 w-4 text-gray-400' />
                        <span className='font-semibold text-gray-900'>{order.patientName}</span>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {getOrderTypeBadge(order.orderType)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className='text-lg font-bold text-gray-900'>₹{order.total}</span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='space-y-1'>
                        <div className='flex items-center gap-1 text-sm text-gray-600'>
                          <CreditCard className='h-3 w-3' />
                          <span>{order.paymentMethod}</span>
                        </div>
                        {getPaymentStatusBadge(order.paymentStatus)}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {getStatusBadge(order.status)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center gap-2'>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() => {
                            setSelectedOrder(order)
                            setShowDetailsPanel(true)
                          }}
                          className='border-gray-300 text-gray-600 hover:bg-gray-50'
                        >
                          <Eye className='h-3.5 w-3.5 mr-1' />
                          View
                        </Button>
                        {order.status === 'pending' && (
                          <Button
                            size='sm'
                            className='bg-orange-600 hover:bg-orange-700 text-white'
                            onClick={() => {
                              setSelectedOrder(order)
                              setShowDetailsPanel(true)
                            }}
                          >
                            <Package className='h-3.5 w-3.5 mr-1' />
                            Prepare
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className='text-center py-12'>
              <ShoppingCart className='h-16 w-16 text-gray-400 mx-auto mb-4' />
              <h3 className='text-xl font-bold text-gray-900 mb-2'>No Orders Found</h3>
              <p className='text-gray-600'>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Side Panel */}
      {showDetailsPanel && selectedOrder && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-end'>
          <div className='bg-white h-full w-full max-w-2xl overflow-y-auto shadow-2xl'>
            {/* Panel Header */}
            <div className='sticky top-0 bg-orange-600 text-white p-6 border-b-2 border-orange-700'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-white/20 rounded-lg'>
                    <FileText className='h-6 w-6' />
                  </div>
                  <div>
                    <h3 className='text-xl font-bold'>Order Details</h3>
                    <p className='text-sm text-orange-100'>{selectedOrder.orderId}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowDetailsPanel(false)
                    setSelectedOrder(null)
                  }}
                  className='text-white hover:text-orange-100 transition-colors'
                >
                  <X className='h-6 w-6' />
                </button>
              </div>
            </div>

            <div className='p-6 space-y-6'>
              {/* Patient & Order Info */}
              <div>
                <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                  <User className='h-5 w-5 text-orange-600' />
                  Patient Information
                </h4>
                <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2'>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-600'>Patient Name:</span>
                    <span className='font-semibold text-gray-900'>{selectedOrder.patientName}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-600'>Order Type:</span>
                    {getOrderTypeBadge(selectedOrder.orderType)}
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-600'>Order Date:</span>
                    <span className='font-semibold text-gray-900'>{selectedOrder.orderDate} at {selectedOrder.orderTime}</span>
                  </div>
                  {selectedOrder.doctorName && (
                    <>
                      <div className='flex justify-between'>
                        <span className='text-sm text-gray-600'>Doctor:</span>
                        <span className='font-semibold text-gray-900'>{selectedOrder.doctorName}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-sm text-gray-600'>Prescription ID:</span>
                        <span className='font-mono font-semibold text-purple-600'>{selectedOrder.prescriptionId}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Medicines List */}
              <div>
                <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                  <Pill className='h-5 w-5 text-orange-600' />
                  Medicines List ({selectedOrder.medicines.length} items)
                </h4>
                <div className='space-y-3'>
                  {selectedOrder.medicines.map((medicine, index) => (
                    <div key={index} className='bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-all'>
                      <div className='flex justify-between items-start mb-2'>
                        <div className='flex-1'>
                          <h5 className='font-bold text-gray-900'>{medicine.name}</h5>
                          <p className='text-sm text-gray-600 mt-1'>{medicine.instructions}</p>
                        </div>
                        <div className='text-right ml-4'>
                          <p className='text-lg font-bold text-orange-600'>₹{medicine.price}</p>
                          <p className='text-xs text-gray-600'>Qty: {medicine.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prescription View */}
              {selectedOrder.prescriptionId && (
                <div>
                  <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                    <FileText className='h-5 w-5 text-orange-600' />
                    Doctor Prescription
                  </h4>
                  <div className='bg-purple-50 border border-purple-200 rounded-lg p-4'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='font-semibold text-gray-900'>Prescription {selectedOrder.prescriptionId}</p>
                        <p className='text-sm text-gray-600'>Prescribed by {selectedOrder.doctorName}</p>
                      </div>
                      <Button size='sm' variant='outline' className='border-purple-300 text-purple-600 hover:bg-purple-50'>
                        <Eye className='h-3.5 w-3.5 mr-1' />
                        View Full Prescription
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Status */}
              <div>
                <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                  <CreditCard className='h-5 w-5 text-orange-600' />
                  Payment Status
                </h4>
                <div className='bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-600'>Payment Method:</span>
                    <span className='font-semibold text-gray-900'>{selectedOrder.paymentMethod}</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-600'>Payment Status:</span>
                    {getPaymentStatusBadge(selectedOrder.paymentStatus)}
                  </div>
                  <div className='flex justify-between items-center pt-2 border-t border-gray-300'>
                    <span className='text-lg font-bold text-gray-900'>Total Amount:</span>
                    <span className='text-2xl font-bold text-orange-600'>₹{selectedOrder.total}</span>
                  </div>
                </div>
              </div>

              {/* Order Status */}
              <div>
                <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                  <Package className='h-5 w-5 text-orange-600' />
                  Order Status
                </h4>
                <div className='bg-gray-50 border border-gray-200 rounded-lg p-4'>
                  <div className='flex justify-between items-center mb-4'>
                    <span className='text-sm text-gray-600'>Current Status:</span>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                  
                  {selectedOrder.status === 'cancelled' && selectedOrder.cancelReason && (
                    <div className='p-3 bg-red-50 border border-red-200 rounded-lg'>
                      <p className='text-sm font-semibold text-red-900'>Cancellation Reason:</p>
                      <p className='text-sm text-red-700 mt-1'>{selectedOrder.cancelReason}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div>
                  <h4 className='font-bold text-gray-900 mb-3 flex items-center gap-2'>
                    <AlertCircle className='h-5 w-5 text-orange-600' />
                    Important Notes
                  </h4>
                  <div className='p-4 bg-amber-50 border border-amber-200 rounded-lg'>
                    <p className='text-sm text-gray-700'>{selectedOrder.notes}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {selectedOrder.status === 'pending' && (
                <div className='flex gap-3 pt-4 border-t-2 border-gray-200'>
                  <Button
                    onClick={() => handleMarkCompleted(selectedOrder.orderId)}
                    className='flex-1 bg-green-600 hover:bg-green-700 text-white'
                  >
                    <CheckSquare className='h-4 w-4 mr-2' />
                    Mark as Completed
                  </Button>
                  <Button
                    onClick={() => handleMarkCancelled(selectedOrder.orderId)}
                    variant='outline'
                    className='flex-1 border-red-300 text-red-600 hover:bg-red-50'
                  >
                    <XCircle className='h-4 w-4 mr-2' />
                    Cancel Order
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
