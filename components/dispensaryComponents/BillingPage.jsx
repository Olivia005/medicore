'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search,
  Filter,
  FileText,
  DollarSign,
  CreditCard,
  Clock,
  RefreshCw,
  Eye,
  Download,
  Printer,
  X,
  CheckCircle,
  AlertCircle,
  Calendar,
  User,
  Phone,
  Package,
  Pill,
  TrendingUp,
  TrendingDown,
  Wallet,
  Smartphone,
  Shield,
  Tag,
  BarChart3
} from 'lucide-react'

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPaymentMode, setFilterPaymentMode] = useState('all')
  const [dateFilter, setDateFilter] = useState('today')
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)

  // Sample billing data
  const [billings] = useState([
    {
      id: 1,
      billId: 'BILL-2025-001',
      orderId: 'ORD-2025-045',
      patientName: 'Rajesh Kumar',
      patientPhone: '9876543210',
      date: '2025-12-19',
      time: '09:30 AM',
      amount: 450.50,
      paymentMode: 'Cash',
      status: 'Paid',
      items: [
        { name: 'Paracetamol 500mg', brand: 'Calpol', quantity: 2, price: 5.50 },
        { name: 'Cough Syrup', brand: 'Benadryl', quantity: 1, price: 45.00 },
        { name: 'Vitamin D3', brand: 'HealthVit', quantity: 1, price: 25.00 }
      ],
      discount: 10.00,
      tax: 18.50,
      subtotal: 442.00
    },
    {
      id: 2,
      billId: 'BILL-2025-002',
      orderId: 'ORD-2025-046',
      patientName: 'Priya Sharma',
      patientPhone: '9876543211',
      date: '2025-12-19',
      time: '10:15 AM',
      amount: 850.75,
      paymentMode: 'UPI',
      status: 'Paid',
      items: [
        { name: 'Amoxicillin 250mg', brand: 'Moxikind', quantity: 2, price: 12.00 },
        { name: 'Ibuprofen 400mg', brand: 'Brufen', quantity: 3, price: 8.75 }
      ],
      discount: 0,
      tax: 35.75,
      subtotal: 815.00
    },
    {
      id: 3,
      billId: 'BILL-2025-003',
      orderId: 'ORD-2025-047',
      patientName: 'Amit Patel',
      patientPhone: '9876543212',
      date: '2025-12-19',
      time: '11:00 AM',
      amount: 1250.00,
      paymentMode: 'Card',
      status: 'Pending',
      items: [
        { name: 'Metformin 500mg', brand: 'Glycomet', quantity: 2, price: 15.00 },
        { name: 'Aspirin 75mg', brand: 'Disprin', quantity: 3, price: 6.25 }
      ],
      discount: 50.00,
      tax: 52.00,
      subtotal: 1248.00
    },
    {
      id: 4,
      billId: 'BILL-2025-004',
      orderId: 'ORD-2025-048',
      patientName: 'Sneha Reddy',
      patientPhone: '9876543213',
      date: '2025-12-19',
      time: '12:30 PM',
      amount: 350.00,
      paymentMode: 'Cash',
      status: 'Refunded',
      items: [
        { name: 'Cetirizine 10mg', brand: 'Alerid', quantity: 2, price: 4.50 }
      ],
      discount: 0,
      tax: 14.50,
      subtotal: 335.50
    },
    {
      id: 5,
      billId: 'BILL-2025-005',
      orderId: 'ORD-2025-049',
      patientName: 'Vikram Singh',
      patientPhone: '9876543214',
      date: '2025-12-18',
      time: '02:45 PM',
      amount: 675.25,
      paymentMode: 'Insurance',
      status: 'Paid',
      items: [
        { name: 'Paracetamol 500mg', brand: 'Calpol', quantity: 3, price: 5.50 },
        { name: 'Vitamin D3', brand: 'HealthVit', quantity: 2, price: 25.00 }
      ],
      discount: 25.00,
      tax: 28.25,
      subtotal: 672.00
    },
    {
      id: 6,
      billId: 'BILL-2025-006',
      orderId: 'ORD-2025-050',
      patientName: 'Anita Desai',
      patientPhone: '9876543215',
      date: '2025-12-18',
      time: '04:00 PM',
      amount: 980.00,
      paymentMode: 'UPI',
      status: 'Paid',
      items: [
        { name: 'Cough Syrup', brand: 'Benadryl', quantity: 2, price: 45.00 },
        { name: 'Amoxicillin 250mg', brand: 'Moxikind', quantity: 1, price: 12.00 }
      ],
      discount: 15.00,
      tax: 41.00,
      subtotal: 954.00
    },
    {
      id: 7,
      billId: 'BILL-2025-007',
      orderId: 'ORD-2025-051',
      patientName: 'Rahul Mehta',
      patientPhone: '9876543216',
      date: '2025-12-17',
      time: '09:00 AM',
      amount: 550.50,
      paymentMode: 'Card',
      status: 'Pending',
      items: [
        { name: 'Ibuprofen 400mg', brand: 'Brufen', quantity: 4, price: 8.75 }
      ],
      discount: 0,
      tax: 22.50,
      subtotal: 528.00
    },
    {
      id: 8,
      billId: 'BILL-2025-008',
      orderId: 'ORD-2025-052',
      patientName: 'Kavita Joshi',
      patientPhone: '9876543217',
      date: '2025-12-17',
      time: '11:30 AM',
      amount: 425.75,
      paymentMode: 'Cash',
      status: 'Paid',
      items: [
        { name: 'Aspirin 75mg', brand: 'Disprin', quantity: 2, price: 6.25 },
        { name: 'Vitamin D3', brand: 'HealthVit', quantity: 1, price: 25.00 }
      ],
      discount: 5.00,
      tax: 17.75,
      subtotal: 413.00
    }
  ])

  // Calculate stats based on date filter
  const getFilteredBillings = () => {
    const today = new Date().toISOString().split('T')[0]
    return billings.filter(bill => {
      if (dateFilter === 'today') {
        return bill.date === today
      } else if (dateFilter === 'week') {
        const billDate = new Date(bill.date)
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        return billDate >= weekAgo
      } else if (dateFilter === 'month') {
        const billDate = new Date(bill.date)
        const monthAgo = new Date()
        monthAgo.setMonth(monthAgo.getMonth() - 1)
        return billDate >= monthAgo
      }
      return true
    })
  }

  const filteredByDate = getFilteredBillings()

  const stats = {
    totalSales: filteredByDate.filter(b => b.status === 'Paid').reduce((sum, b) => sum + b.amount, 0),
    todaysCollection: filteredByDate.filter(b => b.date === new Date().toISOString().split('T')[0] && b.status === 'Paid').reduce((sum, b) => sum + b.amount, 0),
    pendingPayments: filteredByDate.filter(b => b.status === 'Pending').reduce((sum, b) => sum + b.amount, 0),
    refunds: filteredByDate.filter(b => b.status === 'Refunded').reduce((sum, b) => sum + b.amount, 0)
  }

  // Filter billings
  const filteredBillings = filteredByDate.filter(bill => {
    const matchesSearch = bill.billId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.patientPhone.includes(searchTerm)
    const matchesStatus = filterStatus === 'all' || bill.status === filterStatus
    const matchesPaymentMode = filterPaymentMode === 'all' || bill.paymentMode === filterPaymentMode
    return matchesSearch && matchesStatus && matchesPaymentMode
  })

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Paid':
        return <span className='px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1 w-fit'>
          <CheckCircle className='h-3 w-3' />
          Paid
        </span>
      case 'Pending':
        return <span className='px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold flex items-center gap-1 w-fit'>
          <Clock className='h-3 w-3' />
          Pending
        </span>
      case 'Refunded':
        return <span className='px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold flex items-center gap-1 w-fit'>
          <RefreshCw className='h-3 w-3' />
          Refunded
        </span>
      default:
        return null
    }
  }

  // Get payment mode icon
  const getPaymentModeIcon = (mode) => {
    switch (mode) {
      case 'Cash':
        return <Wallet className='h-4 w-4' />
      case 'UPI':
        return <Smartphone className='h-4 w-4' />
      case 'Card':
        return <CreditCard className='h-4 w-4' />
      case 'Insurance':
        return <Shield className='h-4 w-4' />
      default:
        return <DollarSign className='h-4 w-4' />
    }
  }

  // View invoice
  const viewInvoice = (bill) => {
    setSelectedInvoice(bill)
    setShowInvoiceModal(true)
  }

  return (
    <div className='p-8'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3'>
          <FileText className='h-10 w-10 text-green-600' />
          Billing & Payments
        </h1>
        <p className='text-gray-600'>Pharmacy billing management system</p>
      </div>

      {/* Date Filter Pills */}
      <div className='mb-6 flex gap-3'>
        <button
          onClick={() => setDateFilter('today')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            dateFilter === 'today'
              ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Today
        </button>
        <button
          onClick={() => setDateFilter('week')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            dateFilter === 'week'
              ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          This Week
        </button>
        <button
          onClick={() => setDateFilter('month')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            dateFilter === 'month'
              ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          This Month
        </button>
        <button
          onClick={() => setDateFilter('all')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            dateFilter === 'all'
              ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Time
        </button>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
        <div className='bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-6 shadow-lg'>
          <div className='flex items-center justify-between mb-3'>
            <DollarSign className='h-10 w-10 text-green-600' />
            <TrendingUp className='h-6 w-6 text-green-400' />
          </div>
          <p className='text-green-700 font-semibold mb-1'>Total Sales</p>
          <p className='text-4xl font-bold text-green-900'>₹{stats.totalSales.toFixed(2)}</p>
          <p className='text-xs text-green-600 mt-2'>{dateFilter === 'today' ? 'Today' : dateFilter === 'week' ? 'This week' : dateFilter === 'month' ? 'This month' : 'All time'}</p>
        </div>

        <div className='bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6 shadow-lg'>
          <div className='flex items-center justify-between mb-3'>
            <Wallet className='h-10 w-10 text-blue-600' />
            <BarChart3 className='h-6 w-6 text-blue-400' />
          </div>
          <p className='text-blue-700 font-semibold mb-1'>Today's Collection</p>
          <p className='text-4xl font-bold text-blue-900'>₹{stats.todaysCollection.toFixed(2)}</p>
          <p className='text-xs text-blue-600 mt-2'>Current day earnings</p>
        </div>

        <div className='bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-xl p-6 shadow-lg'>
          <div className='flex items-center justify-between mb-3'>
            <Clock className='h-10 w-10 text-orange-600' />
            <AlertCircle className='h-6 w-6 text-orange-400' />
          </div>
          <p className='text-orange-700 font-semibold mb-1'>Pending Payments</p>
          <p className='text-4xl font-bold text-orange-900'>₹{stats.pendingPayments.toFixed(2)}</p>
          <p className='text-xs text-orange-600 mt-2'>Awaiting payment</p>
        </div>

        <div className='bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-xl p-6 shadow-lg'>
          <div className='flex items-center justify-between mb-3'>
            <RefreshCw className='h-10 w-10 text-red-600' />
            <TrendingDown className='h-6 w-6 text-red-400' />
          </div>
          <p className='text-red-700 font-semibold mb-1'>Refunds</p>
          <p className='text-4xl font-bold text-red-900'>₹{stats.refunds.toFixed(2)}</p>
          <p className='text-xs text-red-600 mt-2'>Total refunded</p>
        </div>
      </div>

      {/* Filters */}
      <div className='bg-white border-2 border-gray-200 rounded-xl p-6 mb-6 shadow-md'>
        <div className='flex flex-col md:flex-row gap-4 items-end'>
          {/* Search */}
          <div className='flex-1'>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Search</label>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
              <Input
                type='text'
                placeholder='Search by Bill ID, Order ID, Patient name or phone...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 h-12'
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className='w-full md:w-48'>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className='w-full h-12 px-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none'
            >
              <option value='all'>All Status</option>
              <option value='Paid'>Paid</option>
              <option value='Pending'>Pending</option>
              <option value='Refunded'>Refunded</option>
            </select>
          </div>

          {/* Payment Mode Filter */}
          <div className='w-full md:w-48'>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Payment Mode</label>
            <select
              value={filterPaymentMode}
              onChange={(e) => setFilterPaymentMode(e.target.value)}
              className='w-full h-12 px-4 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none'
            >
              <option value='all'>All Modes</option>
              <option value='Cash'>Cash</option>
              <option value='UPI'>UPI</option>
              <option value='Card'>Card</option>
              <option value='Insurance'>Insurance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Billing Table */}
      <div className='bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-md'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gradient-to-r from-green-600 to-green-700 text-white'>
              <tr>
                <th className='px-6 py-4 text-left text-sm font-bold'>Bill ID</th>
                <th className='px-6 py-4 text-left text-sm font-bold'>Order ID</th>
                <th className='px-6 py-4 text-left text-sm font-bold'>Patient</th>
                <th className='px-6 py-4 text-left text-sm font-bold'>Date & Time</th>
                <th className='px-6 py-4 text-right text-sm font-bold'>Amount</th>
                <th className='px-6 py-4 text-center text-sm font-bold'>Payment Mode</th>
                <th className='px-6 py-4 text-left text-sm font-bold'>Status</th>
                <th className='px-6 py-4 text-center text-sm font-bold'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredBillings.length === 0 ? (
                <tr>
                  <td colSpan='8' className='px-6 py-12 text-center'>
                    <FileText className='h-16 w-16 text-gray-300 mx-auto mb-4' />
                    <p className='text-gray-500 font-semibold'>No billing records found</p>
                    <p className='text-sm text-gray-400'>Try adjusting your search or filters</p>
                  </td>
                </tr>
              ) : (
                filteredBillings.map((bill) => (
                  <tr key={bill.id} className='hover:bg-green-50 transition-colors'>
                    <td className='px-6 py-4'>
                      <span className='font-mono font-bold text-green-700'>{bill.billId}</span>
                    </td>
                    <td className='px-6 py-4'>
                      <span className='font-mono text-sm text-gray-600'>{bill.orderId}</span>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <div className='p-2 bg-blue-100 rounded-lg'>
                          <User className='h-5 w-5 text-blue-600' />
                        </div>
                        <div>
                          <p className='font-bold text-gray-900'>{bill.patientName}</p>
                          <p className='text-xs text-gray-500 flex items-center gap-1'>
                            <Phone className='h-3 w-3' />
                            {bill.patientPhone}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-2'>
                        <Calendar className='h-4 w-4 text-gray-400' />
                        <div>
                          <p className='font-semibold text-gray-900 text-sm'>{bill.date}</p>
                          <p className='text-xs text-gray-500'>{bill.time}</p>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <span className='text-xl font-bold text-gray-900'>₹{bill.amount.toFixed(2)}</span>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center justify-center gap-2'>
                        <span className='px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold flex items-center gap-2'>
                          {getPaymentModeIcon(bill.paymentMode)}
                          {bill.paymentMode}
                        </span>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      {getStatusBadge(bill.status)}
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center justify-center gap-2'>
                        <Button
                          onClick={() => viewInvoice(bill)}
                          size='sm'
                          className='bg-green-600 hover:bg-green-700 text-white'
                        >
                          <Eye className='h-4 w-4 mr-1' />
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      {showInvoiceModal && selectedInvoice && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl'>
            {/* Invoice Header */}
            <div className='bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-xl'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-white/20 rounded-lg'>
                    <FileText className='h-8 w-8' />
                  </div>
                  <div>
                    <h3 className='text-2xl font-bold'>Invoice Details</h3>
                    <p className='text-sm text-green-100'>{selectedInvoice.billId}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowInvoiceModal(false)
                    setSelectedInvoice(null)
                  }}
                  className='text-white hover:text-green-100'
                >
                  <X className='h-6 w-6' />
                </button>
              </div>
            </div>

            <div className='p-8' id='invoice-content'>
              {/* Store & Patient Details */}
              <div className='grid grid-cols-2 gap-6 border-b-2 border-gray-200 pb-6 mb-6'>
                {/* Store Details */}
                <div>
                  <h4 className='text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2'>
                    <Package className='h-6 w-6 text-green-600' />
                    MEDICORE
                  </h4>
                  <p className='text-gray-600 font-semibold mb-1'>Medical Store & Pharmacy</p>
                  <p className='text-sm text-gray-500'>123 Healthcare Street</p>
                  <p className='text-sm text-gray-500'>Medical District, City - 400001</p>
                  <p className='text-sm text-gray-500'>Phone: +91 1234567890</p>
                  <p className='text-sm text-gray-500'>Email: sales@medicore.com</p>
                  <p className='text-sm text-gray-500 mt-2'>GSTIN: 27XXXXX1234X1ZX</p>
                  <p className='text-sm text-gray-500'>Drug License: DL-12345</p>
                </div>

                {/* Patient Details */}
                <div className='text-right'>
                  <div className='bg-green-100 text-green-900 px-4 py-2 rounded-lg inline-block mb-3'>
                    <p className='text-sm font-semibold'>Bill Number</p>
                    <p className='text-lg font-bold'>{selectedInvoice.billId}</p>
                  </div>
                  <p className='text-sm text-gray-600 mb-1'>Date: {selectedInvoice.date}</p>
                  <p className='text-sm text-gray-600 mb-1'>Time: {selectedInvoice.time}</p>
                  <p className='text-sm text-gray-600 mb-4'>Order ID: {selectedInvoice.orderId}</p>
                  
                  <div className='bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-left mt-4'>
                    <h5 className='font-bold text-blue-900 mb-2 flex items-center gap-2'>
                      <User className='h-4 w-4' />
                      Patient Details
                    </h5>
                    <p className='text-sm text-blue-800 font-semibold'>{selectedInvoice.patientName}</p>
                    <p className='text-sm text-blue-700 flex items-center gap-1'>
                      <Phone className='h-3 w-3' />
                      {selectedInvoice.patientPhone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Medicine Breakdown Table */}
              <div className='mb-6'>
                <h5 className='font-bold text-gray-900 mb-4 text-lg flex items-center gap-2'>
                  <Pill className='h-5 w-5 text-green-600' />
                  Medicine Breakdown
                </h5>
                <table className='w-full border-2 border-gray-200 rounded-lg overflow-hidden'>
                  <thead className='bg-gray-100'>
                    <tr>
                      <th className='px-4 py-3 text-left text-sm font-bold text-gray-700'>Item</th>
                      <th className='px-4 py-3 text-center text-sm font-bold text-gray-700'>Qty</th>
                      <th className='px-4 py-3 text-right text-sm font-bold text-gray-700'>Price</th>
                      <th className='px-4 py-3 text-right text-sm font-bold text-gray-700'>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.items.map((item, index) => (
                      <tr key={index} className='border-t border-gray-200'>
                        <td className='px-4 py-3'>
                          <p className='font-semibold text-gray-900'>{item.name}</p>
                          <p className='text-sm text-gray-600'>{item.brand}</p>
                        </td>
                        <td className='px-4 py-3 text-center font-semibold text-lg'>{item.quantity}</td>
                        <td className='px-4 py-3 text-right'>₹{item.price.toFixed(2)}</td>
                        <td className='px-4 py-3 text-right font-semibold'>₹{(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals Section */}
              <div className='bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-xl p-6 mb-6'>
                <div className='space-y-3'>
                  <div className='flex justify-between text-gray-700'>
                    <span className='flex items-center gap-2'>
                      <Package className='h-4 w-4' />
                      Subtotal:
                    </span>
                    <span className='font-semibold'>₹{selectedInvoice.subtotal.toFixed(2)}</span>
                  </div>
                  
                  {selectedInvoice.discount > 0 && (
                    <div className='flex justify-between text-green-700'>
                      <span className='flex items-center gap-2'>
                        <Tag className='h-4 w-4' />
                        Discount:
                      </span>
                      <span className='font-semibold'>- ₹{selectedInvoice.discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className='flex justify-between text-gray-700'>
                    <span className='flex items-center gap-2'>
                      <FileText className='h-4 w-4' />
                      GST (5%):
                    </span>
                    <span className='font-semibold'>₹{selectedInvoice.tax.toFixed(2)}</span>
                  </div>
                  
                  <div className='border-t-2 border-green-300 pt-3 flex justify-between text-2xl font-bold text-green-900'>
                    <span className='flex items-center gap-2'>
                      <DollarSign className='h-7 w-7' />
                      Total Amount:
                    </span>
                    <span className='drop-shadow-lg'>₹{selectedInvoice.amount.toFixed(2)}</span>
                  </div>

                  <div className='flex justify-between text-sm pt-2 border-t border-green-200'>
                    <span className='text-gray-600'>Payment Mode:</span>
                    <span className='font-semibold text-purple-700 flex items-center gap-2'>
                      {getPaymentModeIcon(selectedInvoice.paymentMode)}
                      {selectedInvoice.paymentMode}
                    </span>
                  </div>

                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Payment Status:</span>
                    {getStatusBadge(selectedInvoice.status)}
                  </div>
                </div>

                {selectedInvoice.discount > 0 && (
                  <div className='mt-4 p-3 bg-green-100 border border-green-300 rounded-lg'>
                    <p className='text-sm text-green-800 font-semibold flex items-center gap-2'>
                      <Tag className='h-4 w-4' />
                      You saved ₹{selectedInvoice.discount.toFixed(2)} on this purchase!
                    </p>
                  </div>
                )}
              </div>

              {/* Footer Notes */}
              <div className='border-t-2 border-gray-200 pt-6 space-y-4'>
                <div className='text-center'>
                  <p className='font-bold text-gray-900 mb-2'>Thank you for your purchase!</p>
                  <p className='text-sm text-gray-600'>For any queries, contact us at support@medicore.com</p>
                </div>

                <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
                  <p className='text-xs text-blue-900 font-semibold mb-2'>Important Notes:</p>
                  <ul className='text-xs text-blue-800 space-y-1'>
                    <li>• No returns without proper authorization</li>
                    <li>• Please check expiry dates before use</li>
                    <li>• Keep prescription for future reference</li>
                    <li>• Store medicines in cool & dry place</li>
                  </ul>
                </div>

                <div className='text-center text-xs text-gray-500 pt-4 border-t border-gray-200'>
                  <p className='font-semibold mb-1'>Computer Generated Invoice - No Signature Required</p>
                  <p>This is a digitally generated invoice from MEDICORE Pharmacy Management System</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-3 p-6 bg-gray-50 rounded-b-xl border-t-2 border-gray-200'>
              <Button
                onClick={() => window.print()}
                className='flex-1 bg-blue-600 hover:bg-blue-700 text-white h-12'
              >
                <Printer className='h-5 w-5 mr-2' />
                Print Invoice
              </Button>
              <Button
                onClick={() => {
                  alert('Download functionality would be implemented here')
                }}
                className='flex-1 bg-green-600 hover:bg-green-700 text-white h-12'
              >
                <Download className='h-5 w-5 mr-2' />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
